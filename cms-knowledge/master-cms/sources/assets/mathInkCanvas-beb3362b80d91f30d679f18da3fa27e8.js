// 손글씨 수식 드로잉 캔버스 클래스 (의존성 없음, 마우스/터치/펜). (components/math/MathInkCanvas.vue 재작성)
// OCR 인식률 위해 흰 배경 + 검정 펜 고정. container 에 캔버스+버튼을 생성한다.
(function () {
  "use strict";
  const WIDTH = 520;
  const HEIGHT = 280; // 두 줄 손글씨 공간 확보
  const PEN_WIDTH = 3;

  class MathInkCanvas {
    constructor(container) {
      this.strokes = [];
      this.drawing = false;

      const wrap = document.createElement("div");
      wrap.className = "ink-canvas";
      const canvas = document.createElement("canvas");
      canvas.className = "ink-canvas__board";
      canvas.width = WIDTH;
      canvas.height = HEIGHT;
      const actions = document.createElement("div");
      actions.className = "ink-canvas__actions";
      const undoBtn = document.createElement("button");
      undoBtn.type = "button";
      undoBtn.className = "ink-canvas__btn";
      undoBtn.textContent = "한 획 지우기";
      const clearBtn = document.createElement("button");
      clearBtn.type = "button";
      clearBtn.className = "ink-canvas__btn";
      clearBtn.textContent = "전체 지우기";
      actions.append(undoBtn, clearBtn);
      wrap.append(canvas, actions);
      container.appendChild(wrap);

      this.canvas = canvas;
      this.undoBtn = undoBtn;
      this.clearBtn = clearBtn;

      canvas.addEventListener("pointerdown", (e) => this._onDown(e));
      canvas.addEventListener("pointermove", (e) => this._onMove(e));
      canvas.addEventListener("pointerup", () => this._onUp());
      canvas.addEventListener("pointercancel", () => this._onUp());
      canvas.addEventListener("pointerleave", () => this._onUp());
      undoBtn.addEventListener("click", () => this.undo());
      clearBtn.addEventListener("click", () => this.clear());

      this._syncButtons();
      this._redraw();
    }

    _ctx() {
      return this.canvas.getContext("2d");
    }

    _syncButtons() {
      const empty = this.strokes.length === 0;
      this.undoBtn.disabled = empty;
      this.clearBtn.disabled = empty;
    }

    _redraw() {
      const c = this._ctx();
      if (!c) return;
      c.fillStyle = "#fff";
      c.fillRect(0, 0, WIDTH, HEIGHT);
      c.strokeStyle = "#000";
      c.lineWidth = PEN_WIDTH;
      c.lineCap = "round";
      c.lineJoin = "round";
      for (const stroke of this.strokes) {
        if (stroke.length < 2) {
          c.beginPath();
          c.arc(stroke[0].x, stroke[0].y, PEN_WIDTH / 2, 0, Math.PI * 2);
          c.fillStyle = "#000";
          c.fill();
          c.fillStyle = "#fff";
          continue;
        }
        c.beginPath();
        c.moveTo(stroke[0].x, stroke[0].y);
        for (const p of stroke.slice(1)) c.lineTo(p.x, p.y);
        c.stroke();
      }
    }

    _toPoint(ev) {
      const rect = this.canvas.getBoundingClientRect();
      return {
        x: ((ev.clientX - rect.left) / rect.width) * WIDTH,
        y: ((ev.clientY - rect.top) / rect.height) * HEIGHT,
      };
    }

    _onDown(ev) {
      ev.preventDefault();
      this.canvas.setPointerCapture(ev.pointerId);
      this.drawing = true;
      this.strokes.push([this._toPoint(ev)]);
      this._syncButtons();
    }

    _onMove(ev) {
      if (!this.drawing) return;
      const stroke = this.strokes[this.strokes.length - 1];
      stroke.push(this._toPoint(ev));
      const c = this._ctx();
      if (!c || stroke.length < 2) return;
      const prev = stroke[stroke.length - 2];
      const cur = stroke[stroke.length - 1];
      c.strokeStyle = "#000";
      c.lineWidth = PEN_WIDTH;
      c.lineCap = "round";
      c.beginPath();
      c.moveTo(prev.x, prev.y);
      c.lineTo(cur.x, cur.y);
      c.stroke();
    }

    _onUp() {
      if (!this.drawing) return;
      this.drawing = false;
      this._redraw();
    }

    undo() {
      this.strokes.pop();
      this._syncButtons();
      this._redraw();
    }

    clear() {
      this.strokes = [];
      this._syncButtons();
      this._redraw();
    }

    get isEmpty() {
      return this.strokes.length === 0;
    }

    // PNG Blob 추출(OCR 전송용)
    toBlob() {
      return new Promise((resolve) => {
        this.canvas.toBlob((b) => resolve(b), "image/png");
      });
    }

    // 줄 단위 PNG Blob 배열: 스트로크를 Y축 공백으로 클러스터링해 줄별 이미지 생성.
    // 한 줄이면 전체 캔버스 1장(기존 동작과 동일한 강등).
    async toLineBlobs() {
      const clusters = window.InkSeg.clusterStrokesIntoLines(this.strokes);
      if (clusters.length <= 1) {
        const b = await this.toBlob();
        return b ? [b] : [];
      }

      const PAD = 16;
      const blobs = [];
      for (const cluster of clusters) {
        let minX = Infinity;
        let minY = Infinity;
        let maxX = -Infinity;
        let maxY = -Infinity;
        for (const stroke of cluster) {
          for (const p of stroke) {
            if (p.x < minX) minX = p.x;
            if (p.x > maxX) maxX = p.x;
            if (p.y < minY) minY = p.y;
            if (p.y > maxY) maxY = p.y;
          }
        }
        const w = Math.ceil(maxX - minX + PAD * 2);
        const h = Math.ceil(maxY - minY + PAD * 2);
        const offsetX = minX - PAD;
        const offsetY = minY - PAD;

        const off = document.createElement("canvas");
        off.width = w;
        off.height = h;
        const c = off.getContext("2d");
        c.fillStyle = "#fff";
        c.fillRect(0, 0, w, h);
        c.strokeStyle = "#000";
        c.lineWidth = PEN_WIDTH;
        c.lineCap = "round";
        c.lineJoin = "round";
        for (const stroke of cluster) {
          if (stroke.length < 2) {
            c.beginPath();
            c.arc(stroke[0].x - offsetX, stroke[0].y - offsetY, PEN_WIDTH / 2, 0, Math.PI * 2);
            c.fillStyle = "#000";
            c.fill();
            c.fillStyle = "#fff";
            continue;
          }
          c.beginPath();
          c.moveTo(stroke[0].x - offsetX, stroke[0].y - offsetY);
          for (const p of stroke.slice(1)) c.lineTo(p.x - offsetX, p.y - offsetY);
          c.stroke();
        }

        const blob = await new Promise((res) => off.toBlob(res, "image/png"));
        if (blob) blobs.push(blob);
      }
      return blobs;
    }
  }

  window.MathInkCanvas = MathInkCanvas;
})();
