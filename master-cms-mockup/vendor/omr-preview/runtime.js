(() => {
  // master-cms-mockup/vendor/omr-preview/source/-EIimQu0.js
  function e(e10) {
    let t8 = /* @__PURE__ */ Object.create(null);
    for (let n4 of e10.split(`,`)) t8[n4] = 1;
    return (e11) => e11 in t8;
  }
  var t = {};
  var n = [];
  var r = () => {
  };
  var i = () => false;
  var a = (e10) => e10.charCodeAt(0) === 111 && e10.charCodeAt(1) === 110 && (e10.charCodeAt(2) > 122 || e10.charCodeAt(2) < 97);
  var o = (e10) => e10.startsWith(`onUpdate:`);
  var s = Object.assign;
  var c = (e10, t8) => {
    let n4 = e10.indexOf(t8);
    n4 > -1 && e10.splice(n4, 1);
  };
  var l = Object.prototype.hasOwnProperty;
  var u = (e10, t8) => l.call(e10, t8);
  var d = Array.isArray;
  var f = (e10) => S(e10) === `[object Map]`;
  var p = (e10) => S(e10) === `[object Set]`;
  var m = (e10) => S(e10) === `[object Date]`;
  var g = (e10) => typeof e10 == `function`;
  var _ = (e10) => typeof e10 == `string`;
  var v = (e10) => typeof e10 == `symbol`;
  var y = (e10) => typeof e10 == `object` && !!e10;
  var b = (e10) => (y(e10) || g(e10)) && g(e10.then) && g(e10.catch);
  var x = Object.prototype.toString;
  var S = (e10) => x.call(e10);
  var C = (e10) => S(e10).slice(8, -1);
  var w = (e10) => S(e10) === `[object Object]`;
  var T = (e10) => _(e10) && e10 !== `NaN` && e10[0] !== `-` && `` + parseInt(e10, 10) === e10;
  var E = e(`,key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted`);
  var D = (e10) => {
    let t8 = /* @__PURE__ */ Object.create(null);
    return ((n4) => t8[n4] || (t8[n4] = e10(n4)));
  };
  var ee = /-\w/g;
  var O = D((e10) => e10.replace(ee, (e11) => e11.slice(1).toUpperCase()));
  var te = /\B([A-Z])/g;
  var k = D((e10) => e10.replace(te, `-$1`).toLowerCase());
  var ne = D((e10) => e10.charAt(0).toUpperCase() + e10.slice(1));
  var re = D((e10) => e10 ? `on${ne(e10)}` : ``);
  var A = (e10, t8) => !Object.is(e10, t8);
  var j = (e10, ...t8) => {
    for (let n4 = 0; n4 < e10.length; n4++) e10[n4](...t8);
  };
  var ie = (e10, t8, n4, r5 = false) => {
    Object.defineProperty(e10, t8, { configurable: true, enumerable: false, writable: r5, value: n4 });
  };
  var ae = (e10) => {
    let t8 = parseFloat(e10);
    return isNaN(t8) ? e10 : t8;
  };
  var oe = (e10) => {
    let t8 = _(e10) ? Number(e10) : NaN;
    return isNaN(t8) ? e10 : t8;
  };
  var se;
  var ce = () => se ||= typeof globalThis < `u` ? globalThis : typeof self < `u` ? self : typeof window < `u` ? window : typeof global < `u` ? global : {};
  function le(e10) {
    if (d(e10)) {
      let t8 = {};
      for (let n4 = 0; n4 < e10.length; n4++) {
        let r5 = e10[n4], i5 = _(r5) ? pe(r5) : le(r5);
        if (i5) for (let e11 in i5) t8[e11] = i5[e11];
      }
      return t8;
    }
    if (_(e10) || y(e10)) return e10;
  }
  var ue = /;(?![^(]*\))/g;
  var de = /:([^]+)/;
  var fe = /\/\*[^]*?\*\//g;
  function pe(e10) {
    let t8 = {};
    return e10.replace(fe, ``).split(ue).forEach((e11) => {
      if (e11) {
        let n4 = e11.split(de);
        n4.length > 1 && (t8[n4[0].trim()] = n4[1].trim());
      }
    }), t8;
  }
  function me(e10) {
    let t8 = ``;
    if (_(e10)) t8 = e10;
    else if (d(e10)) for (let n4 = 0; n4 < e10.length; n4++) {
      let r5 = me(e10[n4]);
      r5 && (t8 += r5 + ` `);
    }
    else if (y(e10)) for (let n4 in e10) e10[n4] && (t8 += n4 + ` `);
    return t8.trim();
  }
  var he = `itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly`;
  var ge = e(he);
  he + ``;
  function _e(e10) {
    return !!e10 || e10 === ``;
  }
  function ve(e10, t8) {
    if (e10.length !== t8.length) return false;
    let n4 = true;
    for (let r5 = 0; n4 && r5 < e10.length; r5++) n4 = ye(e10[r5], t8[r5]);
    return n4;
  }
  function ye(e10, t8) {
    if (e10 === t8) return true;
    let n4 = m(e10), r5 = m(t8);
    if (n4 || r5) return n4 && r5 ? e10.getTime() === t8.getTime() : false;
    if (n4 = v(e10), r5 = v(t8), n4 || r5) return e10 === t8;
    if (n4 = d(e10), r5 = d(t8), n4 || r5) return n4 && r5 ? ve(e10, t8) : false;
    if (n4 = y(e10), r5 = y(t8), n4 || r5) {
      if (!n4 || !r5 || Object.keys(e10).length !== Object.keys(t8).length) return false;
      for (let n5 in e10) {
        let r6 = e10.hasOwnProperty(n5), i5 = t8.hasOwnProperty(n5);
        if (r6 && !i5 || !r6 && i5 || !ye(e10[n5], t8[n5])) return false;
      }
    }
    return String(e10) === String(t8);
  }
  function be(e10, t8) {
    return e10.findIndex((e11) => ye(e11, t8));
  }
  var xe = (e10) => !!(e10 && e10.__v_isRef === true);
  var Se = (e10) => _(e10) ? e10 : e10 == null ? `` : d(e10) || y(e10) && (e10.toString === x || !g(e10.toString)) ? xe(e10) ? Se(e10.value) : JSON.stringify(e10, Ce, 2) : String(e10);
  var Ce = (e10, t8) => xe(t8) ? Ce(e10, t8.value) : f(t8) ? { [`Map(${t8.size})`]: [...t8.entries()].reduce((e11, [t9, n4], r5) => (e11[we(t9, r5) + ` =>`] = n4, e11), {}) } : p(t8) ? { [`Set(${t8.size})`]: [...t8.values()].map((e11) => we(e11)) } : v(t8) ? we(t8) : y(t8) && !d(t8) && !w(t8) ? String(t8) : t8;
  var we = (e10, t8 = ``) => v(e10) ? `Symbol(${e10.description ?? t8})` : e10;
  var M;
  var Te = class {
    constructor(e10 = false) {
      this.detached = e10, this._active = true, this._on = 0, this.effects = [], this.cleanups = [], this._isPaused = false, this._warnOnRun = true, this.__v_skip = true, !e10 && M && (M.active ? (this.parent = M, this.index = (M.scopes || (M.scopes = [])).push(this) - 1) : (this._active = false, this._warnOnRun = false));
    }
    get active() {
      return this._active;
    }
    pause() {
      if (this._active) {
        this._isPaused = true;
        let e10, t8;
        if (this.scopes) {
          let n4 = this.scopes.slice();
          for (e10 = 0, t8 = n4.length; e10 < t8; e10++) n4[e10].pause();
        }
        for (e10 = 0, t8 = this.effects.length; e10 < t8; e10++) this.effects[e10].pause();
      }
    }
    resume() {
      if (this._active && this._isPaused) {
        this._isPaused = false;
        let e10, t8;
        if (this.scopes) {
          let n5 = this.scopes.slice();
          for (e10 = 0, t8 = n5.length; e10 < t8; e10++) n5[e10].resume();
        }
        let n4 = this.effects.slice();
        for (e10 = 0, t8 = n4.length; e10 < t8; e10++) n4[e10].resume();
      }
    }
    run(e10) {
      if (this._active) {
        let t8 = M;
        try {
          return M = this, e10();
        } finally {
          M = t8;
        }
      }
    }
    on() {
      ++this._on === 1 && (this.prevScope = M, M = this);
    }
    off() {
      if (this._on > 0 && --this._on === 0) {
        if (M === this) M = this.prevScope;
        else {
          let e10 = M;
          for (; e10; ) {
            if (e10.prevScope === this) {
              e10.prevScope = this.prevScope;
              break;
            }
            e10 = e10.prevScope;
          }
        }
        this.prevScope = void 0;
      }
    }
    stop(e10) {
      if (this._active) {
        this._active = false;
        let t8, n4;
        for (t8 = 0, n4 = this.effects.length; t8 < n4; t8++) this.effects[t8].stop();
        for (this.effects.length = 0, t8 = 0, n4 = this.cleanups.length; t8 < n4; t8++) this.cleanups[t8]();
        if (this.cleanups.length = 0, this.scopes) {
          let e11 = this.scopes.slice();
          for (t8 = 0, n4 = e11.length; t8 < n4; t8++) e11[t8].stop(true);
          this.scopes.length = 0;
        }
        if (!this.detached && this.parent && !e10) {
          let e11 = this.parent.scopes.pop();
          e11 && e11 !== this && (this.parent.scopes[this.index] = e11, e11.index = this.index);
        }
        this.parent = void 0;
      }
    }
  };
  function De() {
    return M;
  }
  var N;
  var ke = /* @__PURE__ */ new WeakSet();
  var Ae = class {
    constructor(e10) {
      this.fn = e10, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, M && (M.active ? M.effects.push(this) : this.flags &= -2);
    }
    pause() {
      this.flags |= 64;
    }
    resume() {
      this.flags & 64 && (this.flags &= -65, ke.has(this) && (ke.delete(this), this.trigger()));
    }
    notify() {
      this.flags & 2 && !(this.flags & 32) || this.flags & 8 || Pe(this);
    }
    run() {
      if (!(this.flags & 1)) return this.fn();
      this.flags |= 2, Ke(this), Le(this);
      let e10 = N, t8 = P;
      N = this, P = true;
      try {
        return this.fn();
      } finally {
        Re(this), N = e10, P = t8, this.flags &= -3;
      }
    }
    stop() {
      if (this.flags & 1) {
        for (let e10 = this.deps; e10; e10 = e10.nextDep) Ve(e10);
        this.deps = this.depsTail = void 0, Ke(this), this.onStop && this.onStop(), this.flags &= -2;
      }
    }
    trigger() {
      this.flags & 64 ? ke.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
    }
    runIfDirty() {
      ze(this) && this.run();
    }
    get dirty() {
      return ze(this);
    }
  };
  var je = 0;
  var Me;
  var Ne;
  function Pe(e10, t8 = false) {
    if (e10.flags |= 8, t8) {
      e10.next = Ne, Ne = e10;
      return;
    }
    e10.next = Me, Me = e10;
  }
  function Fe() {
    je++;
  }
  function Ie() {
    if (--je > 0) return;
    if (Ne) {
      let e11 = Ne;
      for (Ne = void 0; e11; ) {
        let t8 = e11.next;
        e11.next = void 0, e11.flags &= -9, e11 = t8;
      }
    }
    let e10;
    for (; Me; ) {
      let t8 = Me;
      for (Me = void 0; t8; ) {
        let n4 = t8.next;
        if (t8.next = void 0, t8.flags &= -9, t8.flags & 1) try {
          t8.trigger();
        } catch (t9) {
          e10 ||= t9;
        }
        t8 = n4;
      }
    }
    if (e10) throw e10;
  }
  function Le(e10) {
    for (let t8 = e10.deps; t8; t8 = t8.nextDep) t8.version = -1, t8.prevActiveLink = t8.dep.activeLink, t8.dep.activeLink = t8;
  }
  function Re(e10) {
    let t8, n4 = e10.depsTail, r5 = n4;
    for (; r5; ) {
      let e11 = r5.prevDep;
      r5.version === -1 ? (r5 === n4 && (n4 = e11), Ve(r5), He(r5)) : t8 = r5, r5.dep.activeLink = r5.prevActiveLink, r5.prevActiveLink = void 0, r5 = e11;
    }
    e10.deps = t8, e10.depsTail = n4;
  }
  function ze(e10) {
    for (let t8 = e10.deps; t8; t8 = t8.nextDep) if (t8.dep.version !== t8.version || t8.dep.computed && (Be(t8.dep.computed) || t8.dep.version !== t8.version)) return true;
    return !!e10._dirty;
  }
  function Be(e10) {
    if (e10.flags & 4 && !(e10.flags & 16) || (e10.flags &= -17, e10.globalVersion === qe) || (e10.globalVersion = qe, !e10.isSSR && e10.flags & 128 && (!e10.deps && !e10._dirty || !ze(e10)))) return;
    e10.flags |= 2;
    let t8 = e10.dep, n4 = N, r5 = P;
    N = e10, P = true;
    try {
      Le(e10);
      let n5 = e10.fn(e10._value);
      (t8.version === 0 || A(n5, e10._value)) && (e10.flags |= 128, e10._value = n5, t8.version++);
    } catch (e11) {
      throw t8.version++, e11;
    } finally {
      N = n4, P = r5, Re(e10), e10.flags &= -3;
    }
  }
  function Ve(e10, t8 = false) {
    let { dep: n4, prevSub: r5, nextSub: i5 } = e10;
    if (r5 && (r5.nextSub = i5, e10.prevSub = void 0), i5 && (i5.prevSub = r5, e10.nextSub = void 0), n4.subs === e10 && (n4.subs = r5, !r5 && n4.computed)) {
      n4.computed.flags &= -5;
      for (let e11 = n4.computed.deps; e11; e11 = e11.nextDep) Ve(e11, true);
    }
    !t8 && !--n4.sc && n4.map && n4.map.delete(n4.key);
  }
  function He(e10) {
    let { prevDep: t8, nextDep: n4 } = e10;
    t8 && (t8.nextDep = n4, e10.prevDep = void 0), n4 && (n4.prevDep = t8, e10.nextDep = void 0);
  }
  var P = true;
  var Ue = [];
  function We() {
    Ue.push(P), P = false;
  }
  function Ge() {
    let e10 = Ue.pop();
    P = e10 === void 0 || e10;
  }
  function Ke(e10) {
    let { cleanup: t8 } = e10;
    if (e10.cleanup = void 0, t8) {
      let e11 = N;
      N = void 0;
      try {
        t8();
      } finally {
        N = e11;
      }
    }
  }
  var qe = 0;
  var Je = class {
    constructor(e10, t8) {
      this.sub = e10, this.dep = t8, this.version = t8.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
    }
  };
  var Ye = class {
    constructor(e10) {
      this.computed = e10, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, this.__v_skip = true;
    }
    track(e10) {
      if (!N || !P || N === this.computed) return;
      let t8 = this.activeLink;
      if (t8 === void 0 || t8.sub !== N) t8 = this.activeLink = new Je(N, this), N.deps ? (t8.prevDep = N.depsTail, N.depsTail.nextDep = t8, N.depsTail = t8) : N.deps = N.depsTail = t8, Xe(t8);
      else if (t8.version === -1 && (t8.version = this.version, t8.nextDep)) {
        let e11 = t8.nextDep;
        e11.prevDep = t8.prevDep, t8.prevDep && (t8.prevDep.nextDep = e11), t8.prevDep = N.depsTail, t8.nextDep = void 0, N.depsTail.nextDep = t8, N.depsTail = t8, N.deps === t8 && (N.deps = e11);
      }
      return t8;
    }
    trigger(e10) {
      this.version++, qe++, this.notify(e10);
    }
    notify(e10) {
      Fe();
      try {
        for (let e11 = this.subs; e11; e11 = e11.prevSub) e11.sub.notify() && e11.sub.dep.notify();
      } finally {
        Ie();
      }
    }
  };
  function Xe(e10) {
    if (e10.dep.sc++, e10.sub.flags & 4) {
      let t8 = e10.dep.computed;
      if (t8 && !e10.dep.subs) {
        t8.flags |= 20;
        for (let e11 = t8.deps; e11; e11 = e11.nextDep) Xe(e11);
      }
      let n4 = e10.dep.subs;
      n4 !== e10 && (e10.prevSub = n4, n4 && (n4.nextSub = e10)), e10.dep.subs = e10;
    }
  }
  var Ze = /* @__PURE__ */ new WeakMap();
  var Qe = Symbol(``);
  var $e = Symbol(``);
  var et = Symbol(``);
  function F(e10, t8, n4) {
    if (P && N) {
      let t9 = Ze.get(e10);
      t9 || Ze.set(e10, t9 = /* @__PURE__ */ new Map());
      let r5 = t9.get(n4);
      r5 || (t9.set(n4, r5 = new Ye()), r5.map = t9, r5.key = n4), r5.track();
    }
  }
  function tt(e10, t8, n4, r5, i5, a5) {
    let o5 = Ze.get(e10);
    if (!o5) {
      qe++;
      return;
    }
    let s6 = (e11) => {
      e11 && e11.trigger();
    };
    if (Fe(), t8 === `clear`) o5.forEach(s6);
    else {
      let i6 = d(e10), a6 = i6 && T(n4);
      if (i6 && n4 === `length`) {
        let e11 = Number(r5);
        o5.forEach((t9, n5) => {
          (n5 === `length` || n5 === et || !v(n5) && n5 >= e11) && s6(t9);
        });
      } else switch ((n4 !== void 0 || o5.has(void 0)) && s6(o5.get(n4)), a6 && s6(o5.get(et)), t8) {
        case `add`:
          i6 ? a6 && s6(o5.get(`length`)) : (s6(o5.get(Qe)), f(e10) && s6(o5.get($e)));
          break;
        case `delete`:
          i6 || (s6(o5.get(Qe)), f(e10) && s6(o5.get($e)));
          break;
        case `set`:
          f(e10) && s6(o5.get(Qe));
      }
    }
    Ie();
  }
  function rt(e10) {
    let t8 = L(e10);
    return t8 === e10 ? t8 : (F(t8, `iterate`, et), I(e10) ? t8 : t8.map(R));
  }
  function it(e10) {
    return F(e10 = L(e10), `iterate`, et), e10;
  }
  function at(e10, t8) {
    return Vt(e10) ? Wt(Bt(e10) ? R(t8) : t8) : R(t8);
  }
  var ot = { __proto__: null, [Symbol.iterator]() {
    return st(this, Symbol.iterator, (e10) => at(this, e10));
  }, concat(...e10) {
    return rt(this).concat(...e10.map((e11) => d(e11) ? rt(e11) : e11));
  }, entries() {
    return st(this, `entries`, (e10) => (e10[1] = at(this, e10[1]), e10));
  }, every(e10, t8) {
    return lt(this, `every`, e10, t8, void 0, arguments);
  }, filter(e10, t8) {
    return lt(this, `filter`, e10, t8, (e11) => e11.map((e12) => at(this, e12)), arguments);
  }, find(e10, t8) {
    return lt(this, `find`, e10, t8, (e11) => at(this, e11), arguments);
  }, findIndex(e10, t8) {
    return lt(this, `findIndex`, e10, t8, void 0, arguments);
  }, findLast(e10, t8) {
    return lt(this, `findLast`, e10, t8, (e11) => at(this, e11), arguments);
  }, findLastIndex(e10, t8) {
    return lt(this, `findLastIndex`, e10, t8, void 0, arguments);
  }, forEach(e10, t8) {
    return lt(this, `forEach`, e10, t8, void 0, arguments);
  }, includes(...e10) {
    return dt(this, `includes`, e10);
  }, indexOf(...e10) {
    return dt(this, `indexOf`, e10);
  }, join(e10) {
    return rt(this).join(e10);
  }, lastIndexOf(...e10) {
    return dt(this, `lastIndexOf`, e10);
  }, map(e10, t8) {
    return lt(this, `map`, e10, t8, void 0, arguments);
  }, pop() {
    return ft(this, `pop`);
  }, push(...e10) {
    return ft(this, `push`, e10);
  }, reduce(e10, ...t8) {
    return ut(this, `reduce`, e10, t8);
  }, reduceRight(e10, ...t8) {
    return ut(this, `reduceRight`, e10, t8);
  }, shift() {
    return ft(this, `shift`);
  }, some(e10, t8) {
    return lt(this, `some`, e10, t8, void 0, arguments);
  }, splice(...e10) {
    return ft(this, `splice`, e10);
  }, toReversed() {
    return rt(this).toReversed();
  }, toSorted(e10) {
    return rt(this).toSorted(e10);
  }, toSpliced(...e10) {
    return rt(this).toSpliced(...e10);
  }, unshift(...e10) {
    return ft(this, `unshift`, e10);
  }, values() {
    return st(this, `values`, (e10) => at(this, e10));
  } };
  function st(e10, t8, n4) {
    let r5 = it(e10), i5 = r5[t8]();
    return r5 !== e10 && !I(e10) && (i5._next = i5.next, i5.next = () => {
      let e11 = i5._next();
      return e11.done || (e11.value = n4(e11.value)), e11;
    }), i5;
  }
  var ct = Array.prototype;
  function lt(e10, t8, n4, r5, i5, a5) {
    let o5 = it(e10), s6 = o5 !== e10 && !I(e10), c4 = o5[t8];
    if (c4 !== ct[t8]) {
      let t9 = c4.apply(e10, a5);
      return s6 ? R(t9) : t9;
    }
    let l4 = n4;
    o5 !== e10 && (s6 ? l4 = function(t9, r6) {
      return n4.call(this, at(e10, t9), r6, e10);
    } : n4.length > 2 && (l4 = function(t9, r6) {
      return n4.call(this, t9, r6, e10);
    }));
    let u4 = c4.call(o5, l4, r5);
    return s6 && i5 ? i5(u4) : u4;
  }
  function ut(e10, t8, n4, r5) {
    let i5 = it(e10), a5 = i5 !== e10 && !I(e10), o5 = n4, s6 = false;
    i5 !== e10 && (a5 ? (s6 = r5.length === 0, o5 = function(t9, r6, i6) {
      return s6 && (s6 = false, t9 = at(e10, t9)), n4.call(this, t9, at(e10, r6), i6, e10);
    }) : n4.length > 3 && (o5 = function(t9, r6, i6) {
      return n4.call(this, t9, r6, i6, e10);
    }));
    let c4 = i5[t8](o5, ...r5);
    return s6 ? at(e10, c4) : c4;
  }
  function dt(e10, t8, n4) {
    let r5 = L(e10);
    F(r5, `iterate`, et);
    let i5 = r5[t8](...n4);
    return (i5 === -1 || i5 === false) && Ht(n4[0]) ? (n4[0] = L(n4[0]), r5[t8](...n4)) : i5;
  }
  function ft(e10, t8, n4 = []) {
    We(), Fe();
    let r5 = L(e10)[t8].apply(e10, n4);
    return Ie(), Ge(), r5;
  }
  var pt = e(`__proto__,__v_isRef,__isVue`);
  var mt = new Set(Object.getOwnPropertyNames(Symbol).filter((e10) => e10 !== `arguments` && e10 !== `caller`).map((e10) => Symbol[e10]).filter(v));
  function ht(e10) {
    v(e10) || (e10 = String(e10));
    let t8 = L(this);
    return F(t8, `has`, e10), t8.hasOwnProperty(e10);
  }
  var gt = class {
    constructor(e10 = false, t8 = false) {
      this._isReadonly = e10, this._isShallow = t8;
    }
    get(e10, t8, n4) {
      if (t8 === `__v_skip`) return e10.__v_skip;
      let r5 = this._isReadonly, i5 = this._isShallow;
      if (t8 === `__v_isReactive`) return !r5;
      if (t8 === `__v_isReadonly`) return r5;
      if (t8 === `__v_isShallow`) return i5;
      if (t8 === `__v_raw`) return n4 === (r5 ? i5 ? Pt : Nt : i5 ? Mt : jt).get(e10) || Object.getPrototypeOf(e10) === Object.getPrototypeOf(n4) ? e10 : void 0;
      let a5 = d(e10);
      if (!r5) {
        let e11;
        if (a5 && (e11 = ot[t8])) return e11;
        if (t8 === `hasOwnProperty`) return ht;
      }
      let o5 = Reflect.get(e10, t8, z(e10) ? e10 : n4);
      if ((v(t8) ? mt.has(t8) : pt(t8)) || (r5 || F(e10, `get`, t8), i5)) return o5;
      if (z(o5)) {
        let e11 = a5 && T(t8) ? o5 : o5.value;
        return r5 && y(e11) ? Rt(e11) : e11;
      }
      return y(o5) ? r5 ? Rt(o5) : It(o5) : o5;
    }
  };
  var _t = class extends gt {
    constructor(e10 = false) {
      super(false, e10);
    }
    set(e10, t8, n4, r5) {
      let i5 = e10[t8], a5 = d(e10) && T(t8);
      if (!this._isShallow) {
        let e11 = Vt(i5);
        if (!I(n4) && !Vt(n4) && (i5 = L(i5), n4 = L(n4)), !a5 && z(i5) && !z(n4)) return e11 || (i5.value = n4), true;
      }
      let o5 = a5 ? Number(t8) < e10.length : u(e10, t8), s6 = Reflect.set(e10, t8, n4, z(e10) ? e10 : r5);
      return e10 === L(r5) && s6 && (o5 ? A(n4, i5) && tt(e10, `set`, t8, n4, i5) : tt(e10, `add`, t8, n4)), s6;
    }
    deleteProperty(e10, t8) {
      let n4 = u(e10, t8), r5 = e10[t8], i5 = Reflect.deleteProperty(e10, t8);
      return i5 && n4 && tt(e10, `delete`, t8, void 0, r5), i5;
    }
    has(e10, t8) {
      let n4 = Reflect.has(e10, t8);
      return (!v(t8) || !mt.has(t8)) && F(e10, `has`, t8), n4;
    }
    ownKeys(e10) {
      return F(e10, `iterate`, d(e10) ? `length` : Qe), Reflect.ownKeys(e10);
    }
  };
  var vt = class extends gt {
    constructor(e10 = false) {
      super(true, e10);
    }
    set(e10, t8) {
      return true;
    }
    deleteProperty(e10, t8) {
      return true;
    }
  };
  var yt = new _t();
  var bt = new vt();
  var xt = new _t(true);
  var St = (e10) => e10;
  var Ct = (e10) => Reflect.getPrototypeOf(e10);
  function wt(e10, t8, n4) {
    return function(...r5) {
      let i5 = this.__v_raw, a5 = L(i5), o5 = f(a5), c4 = e10 === `entries` || e10 === Symbol.iterator && o5, l4 = e10 === `keys` && o5, u4 = i5[e10](...r5), d5 = n4 ? St : t8 ? Wt : R;
      return !t8 && F(a5, `iterate`, l4 ? $e : Qe), s(Object.create(u4), { next() {
        let { value: e11, done: t9 } = u4.next();
        return t9 ? { value: e11, done: t9 } : { value: c4 ? [d5(e11[0]), d5(e11[1])] : d5(e11), done: t9 };
      } });
    };
  }
  function Tt(e10) {
    return function(...t8) {
      return e10 === `delete` ? false : e10 === `clear` ? void 0 : this;
    };
  }
  function Et(e10, t8) {
    let n4 = { get(n5) {
      let r5 = this.__v_raw, i5 = L(r5), a5 = L(n5);
      e10 || (A(n5, a5) && F(i5, `get`, n5), F(i5, `get`, a5));
      let { has: o5 } = Ct(i5), s6 = t8 ? St : e10 ? Wt : R;
      if (o5.call(i5, n5)) return s6(r5.get(n5));
      if (o5.call(i5, a5)) return s6(r5.get(a5));
      r5 !== i5 && r5.get(n5);
    }, get size() {
      let t9 = this.__v_raw;
      return !e10 && F(L(t9), `iterate`, Qe), t9.size;
    }, has(t9) {
      let n5 = this.__v_raw, r5 = L(n5), i5 = L(t9);
      return e10 || (A(t9, i5) && F(r5, `has`, t9), F(r5, `has`, i5)), t9 === i5 ? n5.has(t9) : n5.has(t9) || n5.has(i5);
    }, forEach(n5, r5) {
      let i5 = this, a5 = i5.__v_raw, o5 = L(a5), s6 = t8 ? St : e10 ? Wt : R;
      return !e10 && F(o5, `iterate`, Qe), a5.forEach((e11, t9) => n5.call(r5, s6(e11), s6(t9), i5));
    } };
    return s(n4, e10 ? { add: Tt(`add`), set: Tt(`set`), delete: Tt(`delete`), clear: Tt(`clear`) } : { add(e11) {
      let n5 = L(this), r5 = Ct(n5), i5 = L(e11), a5 = !t8 && !I(e11) && !Vt(e11) ? i5 : e11;
      return r5.has.call(n5, a5) || A(e11, a5) && r5.has.call(n5, e11) || A(i5, a5) && r5.has.call(n5, i5) || (n5.add(a5), tt(n5, `add`, a5, a5)), this;
    }, set(e11, n5) {
      !t8 && !I(n5) && !Vt(n5) && (n5 = L(n5));
      let r5 = L(this), { has: i5, get: a5 } = Ct(r5), o5 = i5.call(r5, e11);
      o5 ||= (e11 = L(e11), i5.call(r5, e11));
      let s6 = a5.call(r5, e11);
      return r5.set(e11, n5), o5 ? A(n5, s6) && tt(r5, `set`, e11, n5, s6) : tt(r5, `add`, e11, n5), this;
    }, delete(e11) {
      let t9 = L(this), { has: n5, get: r5 } = Ct(t9), i5 = n5.call(t9, e11);
      i5 ||= (e11 = L(e11), n5.call(t9, e11));
      let a5 = r5 ? r5.call(t9, e11) : void 0, o5 = t9.delete(e11);
      return i5 && tt(t9, `delete`, e11, void 0, a5), o5;
    }, clear() {
      let e11 = L(this), t9 = e11.size !== 0, n5 = e11.clear();
      return t9 && tt(e11, `clear`, void 0, void 0, void 0), n5;
    } }), [`keys`, `values`, `entries`, Symbol.iterator].forEach((r5) => {
      n4[r5] = wt(r5, e10, t8);
    }), n4;
  }
  function Dt(e10, t8) {
    let n4 = Et(e10, t8);
    return (t9, r5, i5) => r5 === `__v_isReactive` ? !e10 : r5 === `__v_isReadonly` ? e10 : r5 === `__v_raw` ? t9 : Reflect.get(u(n4, r5) && r5 in t9 ? n4 : t9, r5, i5);
  }
  var Ot = { get: Dt(false, false) };
  var kt = { get: Dt(false, true) };
  var At = { get: Dt(true, false) };
  var jt = /* @__PURE__ */ new WeakMap();
  var Mt = /* @__PURE__ */ new WeakMap();
  var Nt = /* @__PURE__ */ new WeakMap();
  var Pt = /* @__PURE__ */ new WeakMap();
  function Ft(e10) {
    switch (e10) {
      case `Object`:
      case `Array`:
        return 1;
      case `Map`:
      case `Set`:
      case `WeakMap`:
      case `WeakSet`:
        return 2;
      default:
        return 0;
    }
  }
  function It(e10) {
    return Vt(e10) ? e10 : zt(e10, false, yt, Ot, jt);
  }
  function Lt(e10) {
    return zt(e10, false, xt, kt, Mt);
  }
  function Rt(e10) {
    return zt(e10, true, bt, At, Nt);
  }
  function zt(e10, t8, n4, r5, i5) {
    if (!y(e10) || e10.__v_raw && !(t8 && e10.__v_isReactive) || e10.__v_skip || !Object.isExtensible(e10)) return e10;
    let a5 = i5.get(e10);
    if (a5) return a5;
    let o5 = Ft(C(e10));
    if (o5 === 0) return e10;
    let s6 = new Proxy(e10, o5 === 2 ? r5 : n4);
    return i5.set(e10, s6), s6;
  }
  function Bt(e10) {
    return Vt(e10) ? Bt(e10.__v_raw) : !!(e10 && e10.__v_isReactive);
  }
  function Vt(e10) {
    return !!(e10 && e10.__v_isReadonly);
  }
  function I(e10) {
    return !!(e10 && e10.__v_isShallow);
  }
  function Ht(e10) {
    return e10 ? !!e10.__v_raw : false;
  }
  function L(e10) {
    let t8 = e10 && e10.__v_raw;
    return t8 ? L(t8) : e10;
  }
  function Ut(e10) {
    return !u(e10, `__v_skip`) && Object.isExtensible(e10) && ie(e10, `__v_skip`, true), e10;
  }
  var R = (e10) => y(e10) ? It(e10) : e10;
  var Wt = (e10) => y(e10) ? Rt(e10) : e10;
  function z(e10) {
    return e10 ? e10.__v_isRef === true : false;
  }
  function Gt(e10) {
    return qt(e10, false);
  }
  function qt(e10, t8) {
    return z(e10) ? e10 : new Jt(e10, t8);
  }
  var Jt = class {
    constructor(e10, t8) {
      this.dep = new Ye(), this.__v_isRef = true, this.__v_isShallow = false, this._rawValue = t8 ? e10 : L(e10), this._value = t8 ? e10 : R(e10), this.__v_isShallow = t8;
    }
    get value() {
      return this.dep.track(), this._value;
    }
    set value(e10) {
      let t8 = this._rawValue, n4 = this.__v_isShallow || I(e10) || Vt(e10);
      e10 = n4 ? e10 : L(e10), A(e10, t8) && (this._rawValue = e10, this._value = n4 ? e10 : R(e10), this.dep.trigger());
    }
  };
  function Yt(e10) {
    return z(e10) ? e10.value : e10;
  }
  var Zt = { get: (e10, t8, n4) => t8 === `__v_raw` ? e10 : Yt(Reflect.get(e10, t8, n4)), set: (e10, t8, n4, r5) => {
    let i5 = e10[t8];
    return z(i5) && !z(n4) ? (i5.value = n4, true) : Reflect.set(e10, t8, n4, r5);
  } };
  function Qt(e10) {
    return Bt(e10) ? e10 : new Proxy(e10, Zt);
  }
  var $t = class {
    constructor(e10) {
      this.__v_isRef = true, this._value = void 0;
      let t8 = this.dep = new Ye(), { get: n4, set: r5 } = e10(t8.track.bind(t8), t8.trigger.bind(t8));
      this._get = n4, this._set = r5;
    }
    get value() {
      return this._value = this._get();
    }
    set value(e10) {
      this._set(e10);
    }
  };
  function en(e10) {
    return new $t(e10);
  }
  var sn = class {
    constructor(e10, t8, n4) {
      this.fn = e10, this.setter = t8, this._value = void 0, this.dep = new Ye(this), this.__v_isRef = true, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = qe - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !t8, this.isSSR = n4;
    }
    notify() {
      if (this.flags |= 16, !(this.flags & 8) && N !== this) return Pe(this, true), true;
    }
    get value() {
      let e10 = this.dep.track();
      return Be(this), e10 && (e10.version = this.dep.version), this._value;
    }
    set value(e10) {
      this.setter && this.setter(e10);
    }
  };
  function cn(e10, t8, n4 = false) {
    let r5, i5;
    return g(e10) ? r5 = e10 : (r5 = e10.get, i5 = e10.set), new sn(r5, i5, n4);
  }
  var ln = {};
  var un = /* @__PURE__ */ new WeakMap();
  var dn = void 0;
  function fn(e10, t8 = false, n4 = dn) {
    if (n4) {
      let t9 = un.get(n4);
      t9 || un.set(n4, t9 = []), t9.push(e10);
    }
  }
  function pn(e10, n4, i5 = t) {
    let { immediate: a5, deep: o5, once: s6, scheduler: l4, augmentJob: u4, call: f6 } = i5, p4 = (e11) => o5 ? e11 : I(e11) || o5 === false || o5 === 0 ? mn(e11, 1) : mn(e11), m5, h5, _6, v7, y7 = false, b6 = false;
    if (z(e10) ? (h5 = () => e10.value, y7 = I(e10)) : Bt(e10) ? (h5 = () => p4(e10), y7 = true) : d(e10) ? (b6 = true, y7 = e10.some((e11) => Bt(e11) || I(e11)), h5 = () => e10.map((e11) => {
      if (z(e11)) return e11.value;
      if (Bt(e11)) return p4(e11);
      if (g(e11)) return f6 ? f6(e11, 2) : e11();
    })) : h5 = g(e10) ? n4 ? f6 ? () => f6(e10, 2) : e10 : () => {
      if (_6) {
        We();
        try {
          _6();
        } finally {
          Ge();
        }
      }
      let t8 = dn;
      dn = m5;
      try {
        return f6 ? f6(e10, 3, [v7]) : e10(v7);
      } finally {
        dn = t8;
      }
    } : r, n4 && o5) {
      let e11 = h5, t8 = o5 === true ? 1 / 0 : o5;
      h5 = () => mn(e11(), t8);
    }
    let x5 = De(), S5 = () => {
      m5.stop(), x5 && x5.active && c(x5.effects, m5);
    };
    if (s6 && n4) {
      let e11 = n4;
      n4 = (...t8) => {
        let n5 = e11(...t8);
        return S5(), n5;
      };
    }
    let C4 = b6 ? Array(e10.length).fill(ln) : ln, w3 = (e11) => {
      if (!(!(m5.flags & 1) || !m5.dirty && !e11)) {
        if (n4) {
          let t8 = m5.run();
          if (e11 || o5 || y7 || (b6 ? t8.some((e12, t9) => A(e12, C4[t9])) : A(t8, C4))) {
            _6 && _6();
            let e12 = dn;
            dn = m5;
            try {
              let e13 = [t8, C4 === ln ? void 0 : b6 && C4[0] === ln ? [] : C4, v7];
              C4 = t8, f6 ? f6(n4, 3, e13) : n4(...e13);
            } finally {
              dn = e12;
            }
          }
        } else m5.run();
      }
    };
    return u4 && u4(w3), m5 = new Ae(h5), m5.scheduler = l4 ? () => l4(w3, false) : w3, v7 = (e11) => fn(e11, false, m5), _6 = m5.onStop = () => {
      let e11 = un.get(m5);
      if (e11) {
        if (f6) f6(e11, 4);
        else for (let t8 of e11) t8();
        un.delete(m5);
      }
    }, n4 ? a5 ? w3(true) : C4 = m5.run() : l4 ? l4(w3.bind(null, true), true) : m5.run(), S5.pause = m5.pause.bind(m5), S5.resume = m5.resume.bind(m5), S5.stop = S5, S5;
  }
  function mn(e10, t8 = 1 / 0, n4) {
    if (t8 <= 0 || !y(e10) || e10.__v_skip || (n4 ||= /* @__PURE__ */ new Map(), (n4.get(e10) || 0) >= t8)) return e10;
    if (n4.set(e10, t8), t8--, z(e10)) mn(e10.value, t8, n4);
    else if (d(e10)) for (let r5 = 0; r5 < e10.length; r5++) mn(e10[r5], t8, n4);
    else if (p(e10) || f(e10)) e10.forEach((e11) => {
      mn(e11, t8, n4);
    });
    else if (w(e10)) {
      for (let r5 in e10) mn(e10[r5], t8, n4);
      for (let r5 of Object.getOwnPropertySymbols(e10)) Object.prototype.propertyIsEnumerable.call(e10, r5) && mn(e10[r5], t8, n4);
    }
    return e10;
  }
  function hn(e10, t8, n4, r5) {
    try {
      return r5 ? e10(...r5) : e10();
    } catch (e11) {
      gn(e11, t8, n4);
    }
  }
  function B(e10, t8, n4, r5) {
    if (g(e10)) {
      let i5 = hn(e10, t8, n4, r5);
      return i5 && b(i5) && i5.catch((e11) => {
        gn(e11, t8, n4);
      }), i5;
    }
    if (d(e10)) {
      let i5 = [];
      for (let a5 = 0; a5 < e10.length; a5++) i5.push(B(e10[a5], t8, n4, r5));
      return i5;
    }
  }
  function gn(e10, n4, r5, i5 = true) {
    let a5 = n4 ? n4.vnode : null, { errorHandler: o5, throwUnhandledErrorInProduction: s6 } = n4 && n4.appContext.config || t;
    if (n4) {
      let t8 = n4.parent, i6 = n4.proxy, a6 = `https://vuejs.org/error-reference/#runtime-${r5}`;
      for (; t8; ) {
        let n5 = t8.ec;
        if (n5) {
          for (let t9 = 0; t9 < n5.length; t9++) if (n5[t9](e10, i6, a6) === false) return;
        }
        t8 = t8.parent;
      }
      if (o5) {
        We(), hn(o5, null, 10, [e10, i6, a6]), Ge();
        return;
      }
    }
    _n(e10, r5, a5, i5, s6);
  }
  function _n(e10, t8, n4, r5 = true, i5 = false) {
    if (i5) throw e10;
    console.error(e10);
  }
  var V = [];
  var vn = -1;
  var yn = [];
  var bn = null;
  var xn = 0;
  var Sn = Promise.resolve();
  var Cn = null;
  function wn(e10) {
    let t8 = Cn || Sn;
    return e10 ? t8.then(this ? e10.bind(this) : e10) : t8;
  }
  function Tn(e10) {
    let t8 = vn + 1, n4 = V.length;
    for (; t8 < n4; ) {
      let r5 = t8 + n4 >>> 1, i5 = V[r5], a5 = jn(i5);
      a5 < e10 || a5 === e10 && i5.flags & 2 ? t8 = r5 + 1 : n4 = r5;
    }
    return t8;
  }
  function En(e10) {
    if (!(e10.flags & 1)) {
      let t8 = jn(e10), n4 = V[V.length - 1];
      !n4 || !(e10.flags & 2) && t8 >= jn(n4) ? V.push(e10) : V.splice(Tn(t8), 0, e10), e10.flags |= 1, Dn();
    }
  }
  function Dn() {
    Cn ||= Sn.then(Mn);
  }
  function On(e10) {
    if (!d(e10)) bn && e10.id === -1 ? bn.splice(xn + 1, 0, e10) : e10.flags & 1 || (yn.push(e10), e10.flags |= 1);
    else for (let t8 = 0; t8 < e10.length; t8++) yn.push(e10[t8]);
    Dn();
  }
  function kn(e10, t8, n4 = vn + 1) {
    for (; n4 < V.length; n4++) {
      let t9 = V[n4];
      if (t9 && t9.flags & 2) {
        if (e10 && t9.id !== e10.uid) continue;
        V.splice(n4, 1), n4--, t9.flags & 4 && (t9.flags &= -2), t9(), t9.flags & 4 || (t9.flags &= -2);
      }
    }
  }
  function An(e10) {
    if (yn.length) {
      let e11 = [...new Set(yn)].sort((e12, t8) => jn(e12) - jn(t8));
      if (yn.length = 0, bn) {
        for (let t8 = 0; t8 < e11.length; t8++) bn.push(e11[t8]);
        return;
      }
      for (bn = e11, xn = 0; xn < bn.length; xn++) {
        let e12 = bn[xn];
        e12.flags & 4 && (e12.flags &= -2), e12.flags & 8 || e12(), e12.flags &= -2;
      }
      bn = null, xn = 0;
    }
  }
  var jn = (e10) => e10.id == null ? e10.flags & 2 ? -1 : 1 / 0 : e10.id;
  function Mn(e10) {
    try {
      for (vn = 0; vn < V.length; vn++) {
        let e11 = V[vn];
        e11 && !(e11.flags & 8) && (e11.flags & 4 && (e11.flags &= -2), hn(e11, e11.i, e11.i ? 15 : 14), e11.flags & 4 || (e11.flags &= -2));
      }
    } finally {
      for (; vn < V.length; vn++) {
        let e11 = V[vn];
        e11 && (e11.flags &= -2);
      }
      vn = -1, V.length = 0, An(e10), Cn = null, (V.length || yn.length) && Mn(e10);
    }
  }
  var H = null;
  var Nn = null;
  function Pn(e10) {
    let t8 = H;
    return H = e10, Nn = e10 && e10.type.__scopeId || null, t8;
  }
  function Fn(e10, t8 = H, n4) {
    if (!t8 || e10._n) return e10;
    let r5 = (...n5) => {
      r5._d && ao(-1);
      let i5 = Pn(t8), a5 = to.length, o5;
      try {
        o5 = e10(...n5);
      } finally {
        for (let e11 = to.length; e11 > a5; e11--) ro();
        Pn(i5), r5._d && ao(1);
      }
      return o5;
    };
    return r5._n = true, r5._c = true, r5._d = true, r5;
  }
  function In(e10, n4) {
    if (H === null) return e10;
    let r5 = Bo(H), i5 = e10.dirs ||= [];
    for (let e11 = 0; e11 < n4.length; e11++) {
      let [a5, o5, s6, c4 = t] = n4[e11];
      a5 && (g(a5) && (a5 = { mounted: a5, updated: a5 }), a5.deep && mn(o5), i5.push({ dir: a5, instance: r5, value: o5, oldValue: void 0, arg: s6, modifiers: c4 }));
    }
    return e10;
  }
  function Ln(e10, t8, n4, r5) {
    let i5 = e10.dirs, a5 = t8 && t8.dirs;
    for (let o5 = 0; o5 < i5.length; o5++) {
      let s6 = i5[o5];
      a5 && (s6.oldValue = a5[o5].value);
      let c4 = s6.dir[r5];
      c4 && (We(), B(c4, n4, 8, [e10.el, s6, e10, t8]), Ge());
    }
  }
  function Rn(e10, t8) {
    if ($) {
      let n4 = $.provides, r5 = $.parent && $.parent.provides;
      r5 === n4 && (n4 = $.provides = Object.create(r5)), n4[e10] = t8;
    }
  }
  function zn(e10, t8, n4 = false) {
    let r5 = Do();
    if (r5 || Xi) {
      let i5 = Xi ? Xi._context.provides : r5 ? r5.parent == null || r5.ce ? r5.vnode.appContext && r5.vnode.appContext.provides : r5.parent.provides : void 0;
      if (i5 && e10 in i5) return i5[e10];
      if (arguments.length > 1) return n4 && g(t8) ? t8.call(r5 && r5.proxy) : t8;
    }
  }
  var Vn = Symbol.for(`v-scx`);
  var Hn = () => zn(Vn);
  function Wn(e10, t8) {
    return Kn(e10, null, { flush: `sync` });
  }
  function Gn(e10, t8, n4) {
    return Kn(e10, t8, n4);
  }
  function Kn(e10, n4, i5 = t) {
    let { immediate: a5, deep: o5, flush: c4, once: l4 } = i5, u4 = s({}, i5), d5 = n4 && a5 || !n4 && c4 !== `post`, f6;
    if (No) {
      if (c4 === `sync`) {
        let e11 = Hn();
        f6 = e11.__watcherHandles ||= [];
      } else if (!d5) {
        let e11 = () => {
        };
        return e11.stop = r, e11.resume = r, e11.pause = r, e11;
      }
    }
    let p4 = $;
    u4.call = (e11, t8, n5) => B(e11, p4, t8, n5);
    let m5 = false;
    c4 === `post` ? u4.scheduler = (e11) => {
      K(e11, p4 && p4.suspense);
    } : c4 !== `sync` && (m5 = true, u4.scheduler = (e11, t8) => {
      t8 ? e11() : En(e11);
    }), u4.augmentJob = (e11) => {
      n4 && (e11.flags |= 4), m5 && (e11.flags |= 2, p4 && (e11.id = p4.uid, e11.i = p4));
    };
    let h5 = pn(e10, n4, u4);
    return No && (f6 ? f6.push(h5) : d5 && h5()), h5;
  }
  function qn(e10, t8, n4) {
    let r5 = this.proxy, i5 = _(e10) ? e10.includes(`.`) ? Jn(r5, e10) : () => r5[e10] : e10.bind(r5, r5), a5;
    g(t8) ? a5 = t8 : (a5 = t8.handler, n4 = t8);
    let o5 = Ao(this), s6 = Kn(i5, a5.bind(r5), n4);
    return o5(), s6;
  }
  function Jn(e10, t8) {
    let n4 = t8.split(`.`);
    return () => {
      let t9 = e10;
      for (let e11 = 0; e11 < n4.length && t9; e11++) t9 = t9[n4[e11]];
      return t9;
    };
  }
  var Yn = /* @__PURE__ */ new WeakMap();
  var Xn = Symbol(`_vte`);
  var Zn = (e10) => e10.__isTeleport;
  var Qn = (e10) => e10 && (e10.disabled || e10.disabled === ``);
  var $n = (e10) => e10 && (e10.defer || e10.defer === ``);
  var er = (e10) => typeof SVGElement < `u` && e10 instanceof SVGElement;
  var tr = (e10) => typeof MathMLElement == `function` && e10 instanceof MathMLElement;
  var nr = (e10, t8) => {
    let n4 = e10 && e10.to;
    return _(n4) ? t8 ? t8(n4) : null : n4;
  };
  var rr = { name: `Teleport`, __isTeleport: true, process(e10, t8, n4, r5, i5, a5, o5, s6, c4, l4) {
    let { mc: u4, pc: d5, pbc: f6, o: { insert: p4, querySelector: m5, createText: h5, createComment: g6, parentNode: _6 } } = l4, v7 = Qn(t8.props), { dynamicChildren: y7 } = t8, b6 = (e11, t9, n5) => {
      e11.shapeFlag & 16 && u4(e11.children, t9, n5, i5, a5, o5, s6, c4);
    }, x5 = (e11 = t8) => {
      let n5 = Qn(e11.props), r6 = e11.target = nr(e11.props, m5), a6 = cr(r6, e11, h5, p4);
      r6 && (o5 !== `svg` && er(r6) ? o5 = `svg` : o5 !== `mathml` && tr(r6) && (o5 = `mathml`), i5 && i5.isCE && (i5.ce._teleportTargets || (i5.ce._teleportTargets = /* @__PURE__ */ new Set())).add(r6), n5 || (b6(e11, r6, a6), sr(e11, false)));
    }, S5 = (e11) => {
      let t9 = () => {
        if (Yn.get(e11) === t9) {
          if (Yn.delete(e11), Qn(e11.props)) {
            let t10 = _6(e11.el) || n4;
            b6(e11, t10, e11.anchor), sr(e11, true);
          }
          x5(e11);
        }
      };
      Yn.set(e11, t9), K(t9, a5);
    };
    if (e10 == null) {
      let e11 = t8.el = h5(``), i6 = t8.anchor = h5(``);
      if (p4(e11, n4, r5), p4(i6, n4, r5), $n(t8.props) || a5 && a5.pendingBranch) {
        S5(t8);
        return;
      }
      v7 && (b6(t8, n4, i6), sr(t8, true)), x5();
    } else {
      t8.el = e10.el;
      let r6 = t8.anchor = e10.anchor, u5 = Yn.get(e10);
      if (u5) {
        u5.flags |= 8, Yn.delete(e10), S5(t8);
        return;
      }
      t8.targetStart = e10.targetStart;
      let p5 = t8.target = e10.target, h6 = t8.targetAnchor = e10.targetAnchor, g7 = Qn(e10.props), _7 = g7 ? n4 : p5, b7 = g7 ? r6 : h6;
      if (o5 === `svg` || er(p5) ? o5 = `svg` : (o5 === `mathml` || tr(p5)) && (o5 = `mathml`), y7 ? (f6(e10.dynamicChildren, y7, _7, i5, a5, o5, s6), Fa(e10, t8, true)) : c4 || d5(e10, t8, _7, b7, i5, a5, o5, s6, false), v7) g7 ? t8.props && e10.props && t8.props.to !== e10.props.to && (t8.props.to = e10.props.to) : ir(t8, n4, r6, l4, 1);
      else if ((t8.props && t8.props.to) !== (e10.props && e10.props.to)) {
        let e11 = nr(t8.props, m5);
        e11 && (t8.target = e11, ir(t8, e11, null, l4, 0));
      } else g7 && ir(t8, p5, h6, l4, 1);
      sr(t8, v7);
    }
  }, remove(e10, t8, n4, { um: r5, o: { remove: i5 } }, a5) {
    let { shapeFlag: o5, children: s6, anchor: c4, targetStart: l4, targetAnchor: u4, target: d5, props: f6 } = e10, p4 = Qn(f6), m5 = a5 || !p4, h5 = Yn.get(e10);
    if (h5 && (h5.flags |= 8, Yn.delete(e10)), d5 && (i5(l4), i5(u4)), a5 && i5(c4), !h5 && (p4 || d5) && o5 & 16) for (let e11 = 0; e11 < s6.length; e11++) {
      let i6 = s6[e11];
      r5(i6, t8, n4, m5, !!i6.dynamicChildren);
    }
  }, move: ir, hydrate: ar };
  function ir(e10, t8, n4, { o: { insert: r5 }, m: i5 }, a5 = 2) {
    a5 === 0 && r5(e10.targetAnchor, t8, n4);
    let { el: o5, anchor: s6, shapeFlag: c4, children: l4, props: u4 } = e10, d5 = a5 === 2;
    if (d5 && r5(o5, t8, n4), !Yn.has(e10) && (!d5 || Qn(u4)) && c4 & 16) for (let e11 = 0; e11 < l4.length; e11++) i5(l4[e11], t8, n4, 2);
    d5 && r5(s6, t8, n4);
  }
  function ar(e10, t8, n4, r5, i5, a5, { o: { nextSibling: o5, parentNode: s6, querySelector: c4, insert: l4, createText: u4 } }, d5) {
    function f6(e11, n5) {
      let r6 = n5;
      for (; r6; ) {
        if (r6 && r6.nodeType === 8) {
          if (r6.data === `teleport start anchor`) t8.targetStart = r6;
          else if (r6.data === `teleport anchor`) {
            t8.targetAnchor = r6, e11._lpa = t8.targetAnchor && o5(t8.targetAnchor);
            break;
          }
        }
        r6 = o5(r6);
      }
    }
    function p4(e11, t9) {
      t9.anchor = d5(o5(e11), t9, s6(e11), n4, r5, i5, a5);
    }
    let m5 = t8.target = nr(t8.props, c4), h5 = Qn(t8.props);
    if (m5) {
      let c5 = m5._lpa || m5.firstChild;
      t8.shapeFlag & 16 && (h5 ? (p4(e10, t8), f6(m5, c5), t8.targetAnchor || cr(m5, t8, u4, l4, s6(e10) === m5 ? e10 : null)) : (t8.anchor = o5(e10), f6(m5, c5), t8.targetAnchor || cr(m5, t8, u4, l4), d5(c5 && o5(c5), t8, m5, n4, r5, i5, a5))), sr(t8, h5);
    } else h5 && t8.shapeFlag & 16 && (p4(e10, t8), t8.targetStart = e10, t8.targetAnchor = o5(e10));
    return t8.anchor && o5(t8.anchor);
  }
  var or = rr;
  function sr(e10, t8) {
    let n4 = e10.ctx;
    if (n4 && n4.ut) {
      let r5, i5;
      for (t8 ? (r5 = e10.el, i5 = e10.anchor) : (r5 = e10.targetStart, i5 = e10.targetAnchor); r5 && r5 !== i5; ) r5.nodeType === 1 && r5.setAttribute(`data-v-owner`, n4.uid), r5 = r5.nextSibling;
      n4.ut();
    }
  }
  function cr(e10, t8, n4, r5, i5 = null) {
    let a5 = t8.targetStart = n4(``), o5 = t8.targetAnchor = n4(``);
    return a5[Xn] = o5, e10 && (r5(a5, e10, i5), r5(o5, e10, i5)), o5;
  }
  var U = Symbol(`_leaveCb`);
  var lr = Symbol(`_enterCb`);
  function ur() {
    let e10 = { isMounted: false, isLeaving: false, isUnmounting: false, leavingVNodes: /* @__PURE__ */ new Map() };
    return si(() => {
      e10.isMounted = true;
    }), ui(() => {
      e10.isUnmounting = true;
    }), e10;
  }
  var W = [Function, Array];
  var dr = { mode: String, appear: Boolean, persisted: Boolean, onBeforeEnter: W, onEnter: W, onAfterEnter: W, onEnterCancelled: W, onBeforeLeave: W, onLeave: W, onAfterLeave: W, onLeaveCancelled: W, onBeforeAppear: W, onAppear: W, onAfterAppear: W, onAppearCancelled: W };
  var fr = (e10) => {
    let t8 = e10.subTree;
    return t8.component ? fr(t8.component) : t8;
  };
  var pr = { name: `BaseTransition`, props: dr, setup(e10, { slots: t8 }) {
    let n4 = Do(), r5 = ur();
    return () => {
      let i5 = t8.default && xr(t8.default(), true), a5 = i5 && i5.length ? mr(i5) : n4.subTree ? bo() : void 0;
      if (!a5) return;
      let o5 = L(e10), { mode: s6 } = o5;
      if (r5.isLeaving) return vr(a5);
      let c4 = yr(a5);
      if (!c4) return vr(a5);
      let l4 = _r(c4, o5, r5, n4, (e11) => l4 = e11);
      c4.type !== J && br(c4, l4);
      let u4 = n4.subTree && yr(n4.subTree);
      if (u4 && u4.type !== J && !uo(u4, c4) && fr(n4).type !== J) {
        let e11 = _r(u4, o5, r5, n4);
        if (br(u4, e11), s6 === `out-in` && c4.type !== J) return r5.isLeaving = true, e11.afterLeave = () => {
          r5.isLeaving = false, n4.job.flags & 8 || n4.update(), delete e11.afterLeave, u4 = void 0;
        }, vr(a5);
        s6 === `in-out` && c4.type !== J ? e11.delayLeave = (e12, t9, n5) => {
          let i6 = gr(r5, u4);
          i6[String(u4.key)] = u4, e12[U] = () => {
            t9(), e12[U] = void 0, delete l4.delayedLeave, u4 = void 0;
          }, l4.delayedLeave = () => {
            n5(), delete l4.delayedLeave, u4 = void 0;
          };
        } : u4 = void 0;
      } else u4 &&= void 0;
      return a5;
    };
  } };
  function mr(e10) {
    let t8 = e10[0];
    if (e10.length > 1) {
      for (let n4 of e10) if (n4.type !== J) {
        t8 = n4;
        break;
      }
    }
    return t8;
  }
  var hr = pr;
  function gr(e10, t8) {
    let { leavingVNodes: n4 } = e10, r5 = n4.get(t8.type);
    return r5 || (r5 = /* @__PURE__ */ Object.create(null), n4.set(t8.type, r5)), r5;
  }
  function _r(e10, t8, n4, r5, i5) {
    let { appear: a5, mode: o5, persisted: s6 = false, onBeforeEnter: c4, onEnter: l4, onAfterEnter: u4, onEnterCancelled: f6, onBeforeLeave: p4, onLeave: m5, onAfterLeave: h5, onLeaveCancelled: g6, onBeforeAppear: _6, onAppear: v7, onAfterAppear: y7, onAppearCancelled: b6 } = t8, x5 = String(e10.key), S5 = gr(n4, e10), C4 = (e11, t9) => {
      e11 && B(e11, r5, 9, t9);
    }, w3 = (e11, t9) => {
      let n5 = t9[1];
      C4(e11, t9), d(e11) ? e11.every((e12) => e12.length <= 1) && n5() : e11.length <= 1 && n5();
    }, T3 = { mode: o5, persisted: s6, beforeEnter(t9) {
      let r6 = c4;
      if (!n4.isMounted) {
        if (a5) r6 = _6 || c4;
        else return;
      }
      t9[U] && t9[U](true);
      let i6 = S5[x5];
      i6 && uo(e10, i6) && i6.el[U] && i6.el[U](), C4(r6, [t9]);
    }, enter(t9) {
      if (S5[x5] === e10) return;
      let r6 = l4, i6 = u4, o6 = f6;
      if (!n4.isMounted) {
        if (a5) r6 = v7 || l4, i6 = y7 || u4, o6 = b6 || f6;
        else return;
      }
      let s7 = false;
      t9[lr] = (e11) => {
        s7 || (s7 = true, C4(e11 ? o6 : i6, [t9]), T3.delayedLeave && T3.delayedLeave(), t9[lr] = void 0);
      };
      let c5 = t9[lr].bind(null, false);
      r6 ? w3(r6, [t9, c5]) : c5();
    }, leave(t9, r6) {
      let i6 = String(e10.key);
      if (t9[lr] && t9[lr](true), n4.isUnmounting) return r6();
      C4(p4, [t9]);
      let a6 = false;
      t9[U] = (n5) => {
        a6 || (a6 = true, r6(), C4(n5 ? g6 : h5, [t9]), t9[U] = void 0, S5[i6] === e10 && delete S5[i6]);
      };
      let o6 = t9[U].bind(null, false);
      S5[i6] = e10, m5 ? w3(m5, [t9, o6]) : o6();
    }, clone(e11) {
      let a6 = _r(e11, t8, n4, r5, i5);
      return i5 && i5(a6), a6;
    } };
    return T3;
  }
  function vr(e10) {
    if (Yr(e10)) return e10 = _o(e10), e10.children = null, e10;
  }
  function yr(e10) {
    if (!Yr(e10)) return Zn(e10.type) && e10.children ? mr(e10.children) : e10;
    if (e10.component) return e10.component.subTree;
    let { shapeFlag: t8, children: n4 } = e10;
    if (n4) {
      if (t8 & 16) return n4[0];
      if (t8 & 32 && g(n4.default)) return n4.default();
    }
  }
  function br(e10, t8) {
    if (e10.shapeFlag & 6 && e10.component) {
      e10.transition = t8;
      let n4 = e10.component.subTree;
      br(Zn(n4.type) && yr(n4) || n4, t8);
    } else e10.shapeFlag & 128 ? (e10.ssContent.transition = t8.clone(e10.ssContent), e10.ssFallback.transition = t8.clone(e10.ssFallback)) : e10.transition = t8;
  }
  function xr(e10, t8 = false, n4) {
    let r5 = [], i5 = 0;
    for (let a5 = 0; a5 < e10.length; a5++) {
      let o5 = e10[a5], s6 = n4 == null ? o5.key : String(n4) + String(o5.key == null ? a5 : o5.key);
      o5.type === q ? (o5.patchFlag & 128 && i5++, r5 = r5.concat(xr(o5.children, t8, s6))) : (t8 || o5.type !== J) && r5.push(s6 == null ? o5 : _o(o5, { key: s6 }));
    }
    if (i5 > 1) for (let e11 = 0; e11 < r5.length; e11++) r5[e11].patchFlag = -2;
    return r5;
  }
  function Sr(e10, t8) {
    return g(e10) ? s({ name: e10.name }, t8, { setup: e10 }) : e10;
  }
  function wr(e10) {
    e10.ids = [e10.ids[0] + e10.ids[2]++ + `-`, 0, 0];
  }
  function Tr(e10, t8) {
    let n4;
    return !!((n4 = Object.getOwnPropertyDescriptor(e10, t8)) && !n4.configurable);
  }
  var Er = /* @__PURE__ */ new WeakMap();
  function Dr(e10, n4, r5, a5, o5 = false) {
    if (d(e10)) {
      e10.forEach((e11, t8) => Dr(e11, n4 && (d(n4) ? n4[t8] : n4), r5, a5, o5));
      return;
    }
    if (Kr(a5) && !o5) {
      a5.shapeFlag & 512 && a5.type.__asyncResolved && a5.component.subTree.component && Dr(e10, n4, r5, a5.component.subTree);
      return;
    }
    let s6 = a5.shapeFlag & 4 ? Bo(a5.component) : a5.el, l4 = o5 ? null : s6, { i: f6, r: p4 } = e10, m5 = n4 && n4.r, h5 = f6.refs === t ? f6.refs = {} : f6.refs, v7 = f6.setupState, y7 = L(v7), b6 = v7 === t ? i : (e11) => !Tr(h5, e11) && u(y7, e11), x5 = (e11, t8) => !(t8 && Tr(h5, t8));
    if (m5 != null && m5 !== p4) {
      if (Or(n4), _(m5)) h5[m5] = null, b6(m5) && (v7[m5] = null);
      else if (z(m5)) {
        let e11 = n4;
        x5(m5, e11.k) && (m5.value = null), e11.k && (h5[e11.k] = null);
      }
    }
    if (g(p4)) hn(p4, f6, 12, [l4, h5]);
    else {
      let t8 = _(p4), n5 = z(p4);
      if (t8 || n5) {
        let i5 = () => {
          if (e10.f) {
            let n6 = t8 ? b6(p4) ? v7[p4] : h5[p4] : x5(p4) || !e10.k ? p4.value : h5[e10.k];
            if (o5) d(n6) && c(n6, s6);
            else if (d(n6)) n6.includes(s6) || n6.push(s6);
            else if (t8) h5[p4] = [s6], b6(p4) && (v7[p4] = h5[p4]);
            else {
              let t9 = [s6];
              x5(p4, e10.k) && (p4.value = t9), e10.k && (h5[e10.k] = t9);
            }
          } else t8 ? (h5[p4] = l4, b6(p4) && (v7[p4] = l4)) : n5 && (x5(p4, e10.k) && (p4.value = l4), e10.k && (h5[e10.k] = l4));
        };
        if (l4) {
          let t9 = () => {
            i5(), Er.delete(e10);
          };
          t9.id = -1, Er.set(e10, t9), K(t9, r5);
        } else Or(e10), i5();
      }
    }
  }
  function Or(e10) {
    let t8 = Er.get(e10);
    t8 && (t8.flags |= 8, Er.delete(e10));
  }
  ce().requestIdleCallback, ce().cancelIdleCallback;
  var Kr = (e10) => !!e10.type.__asyncLoader;
  var Yr = (e10) => e10.type.__isKeepAlive;
  function Qr(e10, t8) {
    ei(e10, `a`, t8);
  }
  function $r(e10, t8) {
    ei(e10, `da`, t8);
  }
  function ei(e10, t8, n4 = $) {
    let r5 = e10.__wdc ||= () => {
      let t9 = n4;
      for (; t9; ) {
        if (t9.isDeactivated) return;
        t9 = t9.parent;
      }
      return e10();
    };
    if (ii(t8, r5, n4), n4) {
      let e11 = n4.parent;
      for (; e11 && e11.parent; ) Yr(e11.parent.vnode) && ti(r5, t8, n4, e11), e11 = e11.parent;
    }
  }
  function ti(e10, t8, n4, r5) {
    let i5 = ii(t8, e10, r5, true);
    di(() => {
      c(r5[t8], i5);
    }, n4);
  }
  function ii(e10, t8, n4 = $, r5 = false) {
    if (n4) {
      let i5 = n4[e10] || (n4[e10] = []), a5 = t8.__weh ||= (...r6) => {
        We();
        let i6 = Ao(n4), a6 = B(t8, n4, e10, r6);
        return i6(), Ge(), a6;
      };
      return r5 ? i5.unshift(a5) : i5.push(a5), a5;
    }
  }
  var ai = (e10) => (t8, n4 = $) => {
    (!No || e10 === `sp`) && ii(e10, (...e11) => t8(...e11), n4);
  };
  var oi = ai(`bm`);
  var si = ai(`m`);
  var ci = ai(`bu`);
  var li = ai(`u`);
  var ui = ai(`bum`);
  var di = ai(`um`);
  var fi = ai(`sp`);
  var pi = ai(`rtg`);
  var mi = ai(`rtc`);
  function hi(e10, t8 = $) {
    ii(`ec`, e10, t8);
  }
  var vi = Symbol.for(`v-ndc`);
  function Si(e10, t8, n4, r5) {
    let i5, a5 = n4 && n4[r5], o5 = d(e10);
    if (o5 || _(e10)) {
      let n5 = o5 && Bt(e10), r6 = false, s6 = false;
      n5 && (r6 = !I(e10), s6 = Vt(e10), e10 = it(e10)), i5 = Array(e10.length);
      for (let n6 = 0, o6 = e10.length; n6 < o6; n6++) i5[n6] = t8(r6 ? s6 ? Wt(R(e10[n6])) : R(e10[n6]) : e10[n6], n6, void 0, a5 && a5[n6]);
    } else if (typeof e10 == `number`) {
      i5 = Array(e10);
      for (let n5 = 0; n5 < e10; n5++) i5[n5] = t8(n5 + 1, n5, void 0, a5 && a5[n5]);
    } else if (y(e10)) {
      if (e10[Symbol.iterator]) i5 = Array.from(e10, (e11, n5) => t8(e11, n5, void 0, a5 && a5[n5]));
      else {
        let n5 = Object.keys(e10);
        i5 = Array(n5.length);
        for (let r6 = 0, o6 = n5.length; r6 < o6; r6++) {
          let o7 = n5[r6];
          i5[r6] = t8(e10[o7], o7, r6, a5 && a5[r6]);
        }
      }
    } else i5 = [];
    return n4 && (n4[r5] = i5), i5;
  }
  function wi(e10, t8, n4, r5, i5, a5) {
    if (n4 ??= {}, H.ce || H.parent && Kr(H.parent) && H.parent.ce) {
      let e11 = a5 != null && n4.key == null ? s({}, n4, { key: a5 }) : n4, i6 = Object.keys(e11).length > 0;
      return t8 !== "default" && (e11.name = t8), no(), co(q, null, [X(`slot`, e11, r5 && r5())], i6 ? -2 : 64);
    }
    let o5 = e10[t8];
    o5 && o5._c && (o5._d = false);
    let c4 = to.length;
    no();
    let l4;
    try {
      let i6 = o5 && Ti(o5(n4)), s6 = n4.key || a5 || i6 && i6.key;
      l4 = co(q, { key: (s6 && !v(s6) ? s6 : `_${t8}`) + (!i6 && r5 ? `_fb` : ``) }, i6 || (r5 ? r5() : []), i6 && e10._ === 1 ? 64 : -2);
    } catch (e11) {
      for (let e12 = to.length; e12 > c4; e12--) ro();
      throw e11;
    } finally {
      o5 && o5._c && (o5._d = true);
    }
    return !i5 && l4.scopeId && (l4.slotScopeIds = [l4.scopeId + `-s`]), l4;
  }
  function Ti(e10) {
    return e10.some((e11) => !lo(e11) || !(e11.type === J || e11.type === q && !Ti(e11.children))) ? e10 : null;
  }
  var Ei = (e10) => e10 ? Mo(e10) ? Bo(e10) : Ei(e10.parent) : null;
  var Di = s(/* @__PURE__ */ Object.create(null), { $: (e10) => e10, $el: (e10) => e10.vnode.el, $data: (e10) => e10.data, $props: (e10) => e10.props, $attrs: (e10) => e10.attrs, $slots: (e10) => e10.slots, $refs: (e10) => e10.refs, $parent: (e10) => Ei(e10.parent), $root: (e10) => Ei(e10.root), $host: (e10) => e10.ce, $emit: (e10) => e10.emit, $options: (e10) => Ri(e10), $forceUpdate: (e10) => e10.f ||= () => {
    En(e10.update);
  }, $nextTick: (e10) => e10.n ||= wn.bind(e10.proxy), $watch: (e10) => qn.bind(e10) });
  var Oi = (e10, n4) => e10 !== t && !e10.__isScriptSetup && u(e10, n4);
  var ki = { get({ _: e10 }, n4) {
    if (n4 === `__v_skip`) return true;
    let { ctx: r5, setupState: i5, data: a5, props: o5, accessCache: s6, type: c4, appContext: l4 } = e10;
    if (n4[0] !== `$`) {
      let e11 = s6[n4];
      if (e11 !== void 0) switch (e11) {
        case 1:
          return i5[n4];
        case 2:
          return a5[n4];
        case 4:
          return r5[n4];
        case 3:
          return o5[n4];
      }
      else if (Oi(i5, n4)) return s6[n4] = 1, i5[n4];
      else if (a5 !== t && u(a5, n4)) return s6[n4] = 2, a5[n4];
      else if (u(o5, n4)) return s6[n4] = 3, o5[n4];
      else if (r5 !== t && u(r5, n4)) return s6[n4] = 4, r5[n4];
      else Ni && (s6[n4] = 0);
    }
    let d5 = Di[n4], f6, p4;
    if (d5) return n4 === `$attrs` && F(e10.attrs, `get`, ``), d5(e10);
    if ((f6 = c4.__cssModules) && (f6 = f6[n4])) return f6;
    if (r5 !== t && u(r5, n4)) return s6[n4] = 4, r5[n4];
    if (p4 = l4.config.globalProperties, u(p4, n4)) return p4[n4];
  }, set({ _: e10 }, n4, r5) {
    let { data: i5, setupState: a5, ctx: o5 } = e10;
    return Oi(a5, n4) ? (a5[n4] = r5, true) : i5 !== t && u(i5, n4) ? (i5[n4] = r5, true) : u(e10.props, n4) || n4[0] === `$` && n4.slice(1) in e10 ? false : (o5[n4] = r5, true);
  }, has({ _: { data: e10, setupState: n4, accessCache: r5, ctx: i5, appContext: a5, props: o5, type: s6 } }, c4) {
    let l4;
    return !!(r5[c4] || e10 !== t && c4[0] !== `$` && u(e10, c4) || Oi(n4, c4) || u(o5, c4) || u(i5, c4) || u(Di, c4) || u(a5.config.globalProperties, c4) || (l4 = s6.__cssModules) && l4[c4]);
  }, defineProperty(e10, t8, n4) {
    return n4.get == null ? u(n4, `value`) && this.set(e10, t8, n4.value, null) : e10._.accessCache[t8] = 0, Reflect.defineProperty(e10, t8, n4);
  } };
  function Ai(e10) {
    return d(e10) ? e10.reduce((e11, t8) => (e11[t8] = null, e11), {}) : e10;
  }
  function ji(e10, t8) {
    return !e10 || !t8 ? e10 || t8 : d(e10) && d(t8) ? e10.concat(t8) : s({}, Ai(e10), Ai(t8));
  }
  var Ni = true;
  function Pi(e10) {
    let t8 = Ri(e10), n4 = e10.proxy, i5 = e10.ctx;
    Ni = false, t8.beforeCreate && Ii(t8.beforeCreate, e10, `bc`);
    let { data: a5, computed: o5, methods: s6, watch: c4, provide: l4, inject: u4, created: f6, beforeMount: p4, mounted: m5, beforeUpdate: h5, updated: _6, activated: v7, deactivated: b6, beforeDestroy: x5, beforeUnmount: S5, destroyed: C4, unmounted: w3, render: T3, renderTracked: E3, renderTriggered: D5, errorCaptured: ee4, serverPrefetch: O5, expose: te4, inheritAttrs: k6, components: ne4, directives: re4, filters: A6 } = t8;
    if (u4 && Fi(u4, i5, null), s6) for (let e11 in s6) {
      let t9 = s6[e11];
      g(t9) && (i5[e11] = t9.bind(n4));
    }
    if (a5) {
      let t9 = a5.call(n4, n4);
      y(t9) && (e10.data = It(t9));
    }
    if (Ni = true, o5) for (let e11 in o5) {
      let t9 = o5[e11], a6 = Uo({ get: g(t9) ? t9.bind(n4, n4) : g(t9.get) ? t9.get.bind(n4, n4) : r, set: !g(t9) && g(t9.set) ? t9.set.bind(n4) : r });
      Object.defineProperty(i5, e11, { enumerable: true, configurable: true, get: () => a6.value, set: (e12) => a6.value = e12 });
    }
    if (c4) for (let e11 in c4) Li(c4[e11], i5, n4, e11);
    if (l4) {
      let e11 = g(l4) ? l4.call(n4) : l4;
      Reflect.ownKeys(e11).forEach((t9) => {
        Rn(t9, e11[t9]);
      });
    }
    f6 && Ii(f6, e10, `c`);
    function j6(e11, t9) {
      d(t9) ? t9.forEach((t10) => e11(t10.bind(n4))) : t9 && e11(t9.bind(n4));
    }
    if (j6(oi, p4), j6(si, m5), j6(ci, h5), j6(li, _6), j6(Qr, v7), j6($r, b6), j6(hi, ee4), j6(mi, E3), j6(pi, D5), j6(ui, S5), j6(di, w3), j6(fi, O5), d(te4)) {
      if (te4.length) {
        let t9 = e10.exposed ||= {};
        te4.forEach((e11) => {
          Object.defineProperty(t9, e11, { get: () => n4[e11], set: (t10) => n4[e11] = t10, enumerable: true });
        });
      } else e10.exposed ||= {};
    }
    T3 && e10.render === r && (e10.render = T3), k6 != null && (e10.inheritAttrs = k6), ne4 && (e10.components = ne4), re4 && (e10.directives = re4), O5 && wr(e10);
  }
  function Fi(e10, t8, n4 = r) {
    d(e10) && (e10 = Ui(e10));
    for (let n5 in e10) {
      let r5 = e10[n5], i5;
      i5 = y(r5) ? `default` in r5 ? zn(r5.from || n5, r5.default, true) : zn(r5.from || n5) : zn(r5), z(i5) ? Object.defineProperty(t8, n5, { enumerable: true, configurable: true, get: () => i5.value, set: (e11) => i5.value = e11 }) : t8[n5] = i5;
    }
  }
  function Ii(e10, t8, n4) {
    B(d(e10) ? e10.map((e11) => e11.bind(t8.proxy)) : e10.bind(t8.proxy), t8, n4);
  }
  function Li(e10, t8, n4, r5) {
    let i5 = r5.includes(`.`) ? Jn(n4, r5) : () => n4[r5];
    if (_(e10)) {
      let n5 = t8[e10];
      g(n5) && Gn(i5, n5);
    } else if (g(e10)) Gn(i5, e10.bind(n4));
    else if (y(e10)) {
      if (d(e10)) e10.forEach((e11) => Li(e11, t8, n4, r5));
      else {
        let r6 = g(e10.handler) ? e10.handler.bind(n4) : t8[e10.handler];
        g(r6) && Gn(i5, r6, e10);
      }
    }
  }
  function Ri(e10) {
    let t8 = e10.type, { mixins: n4, extends: r5 } = t8, { mixins: i5, optionsCache: a5, config: { optionMergeStrategies: o5 } } = e10.appContext, s6 = a5.get(t8), c4;
    return s6 ? c4 = s6 : !i5.length && !n4 && !r5 ? c4 = t8 : (c4 = {}, i5.length && i5.forEach((e11) => zi(c4, e11, o5, true)), zi(c4, t8, o5)), y(t8) && a5.set(t8, c4), c4;
  }
  function zi(e10, t8, n4, r5 = false) {
    let { mixins: i5, extends: a5 } = t8;
    a5 && zi(e10, a5, n4, true), i5 && i5.forEach((t9) => zi(e10, t9, n4, true));
    for (let i6 in t8) if (!(r5 && i6 === `expose`)) {
      let r6 = Bi[i6] || n4 && n4[i6];
      e10[i6] = r6 ? r6(e10[i6], t8[i6]) : t8[i6];
    }
    return e10;
  }
  var Bi = { data: Vi, props: Gi, emits: Gi, methods: Wi, computed: Wi, beforeCreate: G, created: G, beforeMount: G, mounted: G, beforeUpdate: G, updated: G, beforeDestroy: G, beforeUnmount: G, destroyed: G, unmounted: G, activated: G, deactivated: G, errorCaptured: G, serverPrefetch: G, components: Wi, directives: Wi, watch: Ki, provide: Vi, inject: Hi };
  function Vi(e10, t8) {
    return t8 ? e10 ? function() {
      return s(g(e10) ? e10.call(this, this) : e10, g(t8) ? t8.call(this, this) : t8);
    } : t8 : e10;
  }
  function Hi(e10, t8) {
    return Wi(Ui(e10), Ui(t8));
  }
  function Ui(e10) {
    if (d(e10)) {
      let t8 = {};
      for (let n4 = 0; n4 < e10.length; n4++) t8[e10[n4]] = e10[n4];
      return t8;
    }
    return e10;
  }
  function G(e10, t8) {
    return e10 ? [...new Set([].concat(e10, t8))] : t8;
  }
  function Wi(e10, t8) {
    return e10 ? s(/* @__PURE__ */ Object.create(null), e10, t8) : t8;
  }
  function Gi(e10, t8) {
    return e10 ? d(e10) && d(t8) ? [.../* @__PURE__ */ new Set([...e10, ...t8])] : s(/* @__PURE__ */ Object.create(null), Ai(e10), Ai(t8 ?? {})) : t8;
  }
  function Ki(e10, t8) {
    if (!e10) return t8;
    if (!t8) return e10;
    let n4 = s(/* @__PURE__ */ Object.create(null), e10);
    for (let r5 in t8) n4[r5] = G(e10[r5], t8[r5]);
    return n4;
  }
  function qi() {
    return { app: null, config: { isNativeTag: i, performance: false, globalProperties: {}, optionMergeStrategies: {}, errorHandler: void 0, warnHandler: void 0, compilerOptions: {} }, mixins: [], components: {}, directives: {}, provides: /* @__PURE__ */ Object.create(null), optionsCache: /* @__PURE__ */ new WeakMap(), propsCache: /* @__PURE__ */ new WeakMap(), emitsCache: /* @__PURE__ */ new WeakMap() };
  }
  var Ji = 0;
  function Yi(e10, t8) {
    return function(n4, r5 = null) {
      g(n4) || (n4 = s({}, n4)), r5 != null && !y(r5) && (r5 = null);
      let i5 = qi(), a5 = /* @__PURE__ */ new WeakSet(), o5 = [], c4 = false, l4 = i5.app = { _uid: Ji++, _component: n4, _props: r5, _container: null, _context: i5, _instance: null, version: Go, get config() {
        return i5.config;
      }, set config(e11) {
      }, use(e11, ...t9) {
        return a5.has(e11) || (e11 && g(e11.install) ? (a5.add(e11), e11.install(l4, ...t9)) : g(e11) && (a5.add(e11), e11(l4, ...t9))), l4;
      }, mixin(e11) {
        return i5.mixins.includes(e11) || i5.mixins.push(e11), l4;
      }, component(e11, t9) {
        return t9 ? (i5.components[e11] = t9, l4) : i5.components[e11];
      }, directive(e11, t9) {
        return t9 ? (i5.directives[e11] = t9, l4) : i5.directives[e11];
      }, mount(a6, o6, s6) {
        if (!c4) {
          let u4 = l4._ceVNode || X(n4, r5);
          return u4.appContext = i5, s6 === true ? s6 = `svg` : s6 === false && (s6 = void 0), o6 && t8 ? t8(u4, a6) : e10(u4, a6, s6), c4 = true, l4._container = a6, a6.__vue_app__ = l4, Bo(u4.component);
        }
      }, onUnmount(e11) {
        o5.push(e11);
      }, unmount() {
        c4 && (B(o5, l4._instance, 16), e10(null, l4._container), delete l4._container.__vue_app__);
      }, provide(e11, t9) {
        return i5.provides[e11] = t9, l4;
      }, runWithContext(e11) {
        let t9 = Xi;
        Xi = l4;
        try {
          return e11();
        } finally {
          Xi = t9;
        }
      } };
      return l4;
    };
  }
  var Xi = null;
  function Zi(e10, n4, r5 = t) {
    let i5 = Do(), a5 = O(n4), o5 = k(n4), s6 = Qi(e10, a5), c4 = en((s7, c5) => {
      let l4, u4 = t, d5;
      return Wn(() => {
        let t8 = e10[a5];
        A(l4, t8) && (l4 = t8, c5());
      }), { get() {
        return s7(), r5.get ? r5.get(l4) : l4;
      }, set(e11) {
        let s8 = r5.set ? r5.set(e11) : e11;
        if (!A(s8, l4) && !(u4 !== t && A(e11, u4))) return;
        let f6 = i5.vnode.props, p4 = !!(f6 && (n4 in f6 || a5 in f6 || o5 in f6) && (`onUpdate:${n4}` in f6 || `onUpdate:${a5}` in f6 || `onUpdate:${o5}` in f6));
        p4 || (l4 = e11, c5()), i5.emit(`update:${n4}`, s8), A(e11, u4) && (A(e11, s8) && !A(s8, d5) || p4 && u4 !== t && !A(s8, l4)) && c5(), u4 = e11, d5 = s8;
      } };
    });
    return c4[Symbol.iterator] = () => {
      let e11 = 0;
      return { next() {
        return e11 < 2 ? { value: e11++ ? s6 || t : c4, done: false } : { done: true };
      } };
    }, c4;
  }
  var Qi = (e10, t8) => t8 === `modelValue` || t8 === `model-value` ? e10.modelModifiers : e10[`${t8}Modifiers`] || e10[`${O(t8)}Modifiers`] || e10[`${k(t8)}Modifiers`];
  function $i(e10, n4, ...r5) {
    if (e10.isUnmounted) return;
    let i5 = e10.vnode.props || t, a5 = r5, o5 = n4.startsWith(`update:`), s6 = o5 && Qi(i5, n4.slice(7));
    s6 && (s6.trim && (a5 = r5.map((e11) => _(e11) ? e11.trim() : e11)), s6.number && (a5 = r5.map(ae)));
    let c4, l4 = i5[c4 = re(n4)] || i5[c4 = re(O(n4))];
    !l4 && o5 && (l4 = i5[c4 = re(k(n4))]), l4 && B(l4, e10, 6, a5);
    let u4 = i5[c4 + `Once`];
    if (u4) {
      if (!e10.emitted) e10.emitted = {};
      else if (e10.emitted[c4]) return;
      e10.emitted[c4] = true, B(u4, e10, 6, a5);
    }
  }
  var ea = /* @__PURE__ */ new WeakMap();
  function ta(e10, t8, n4 = false) {
    let r5 = n4 ? ea : t8.emitsCache, i5 = r5.get(e10);
    if (i5 !== void 0) return i5;
    let a5 = e10.emits, o5 = {}, c4 = false;
    if (!g(e10)) {
      let r6 = (e11) => {
        let n5 = ta(e11, t8, true);
        n5 && (c4 = true, s(o5, n5));
      };
      !n4 && t8.mixins.length && t8.mixins.forEach(r6), e10.extends && r6(e10.extends), e10.mixins && e10.mixins.forEach(r6);
    }
    return !a5 && !c4 ? (y(e10) && r5.set(e10, null), null) : (d(a5) ? a5.forEach((e11) => o5[e11] = null) : s(o5, a5), y(e10) && r5.set(e10, o5), o5);
  }
  function na(e10, t8) {
    return !e10 || !a(t8) ? false : (t8 = t8.slice(2), t8 = t8 === `Once` ? t8 : t8.replace(/Once$/, ``), u(e10, t8[0].toLowerCase() + t8.slice(1)) || u(e10, k(t8)) || u(e10, t8));
  }
  function ra(e10) {
    let { type: t8, vnode: n4, proxy: r5, withProxy: i5, propsOptions: [a5], slots: s6, attrs: c4, emit: l4, render: u4, renderCache: d5, props: f6, data: p4, setupState: m5, ctx: h5, inheritAttrs: g6 } = e10, _6 = Pn(e10), v7, y7;
    try {
      if (n4.shapeFlag & 4) {
        let e11 = i5 || r5, t9 = e11;
        v7 = Z(u4.call(t9, e11, d5, f6, m5, p4, h5)), y7 = c4;
      } else {
        let e11 = t8;
        v7 = Z(e11.length > 1 ? e11(f6, { attrs: c4, slots: s6, emit: l4 }) : e11(f6, null)), y7 = t8.props ? c4 : aa(c4);
      }
    } catch (t9) {
      to.length = 0, gn(t9, e10, 1), v7 = X(J);
    }
    let b6 = v7;
    if (y7 && g6 !== false) {
      let e11 = Object.keys(y7), { shapeFlag: t9 } = b6;
      e11.length && t9 & 7 && (a5 && e11.some(o) && (y7 = oa(y7, a5)), b6 = _o(b6, y7, false, true));
    }
    return n4.dirs && (b6 = _o(b6, null, false, true), b6.dirs = b6.dirs ? b6.dirs.concat(n4.dirs) : n4.dirs), n4.transition && br(Zn(b6.type) && yr(b6) || b6, n4.transition), v7 = b6, Pn(_6), v7;
  }
  var aa = (e10) => {
    let t8;
    for (let n4 in e10) (n4 === `class` || n4 === `style` || a(n4)) && ((t8 ||= {})[n4] = e10[n4]);
    return t8;
  };
  var oa = (e10, t8) => {
    let n4 = {};
    for (let r5 in e10) (!o(r5) || !(r5.slice(9) in t8)) && (n4[r5] = e10[r5]);
    return n4;
  };
  function sa(e10, t8, n4) {
    let { props: r5, children: i5, component: a5 } = e10, { props: o5, children: s6, patchFlag: c4 } = t8, l4 = a5.emitsOptions;
    if (t8.dirs || t8.transition) return true;
    if (n4 && c4 >= 0) {
      if (c4 & 1024) return true;
      if (c4 & 16) return r5 ? ca(r5, o5, l4) : !!o5;
      if (c4 & 8) {
        let e11 = t8.dynamicProps;
        for (let t9 = 0; t9 < e11.length; t9++) {
          let n5 = e11[t9];
          if (la(o5, r5, n5) && !na(l4, n5)) return true;
        }
      }
    } else return (i5 || s6) && (!s6 || !s6.$stable) ? true : r5 === o5 ? false : r5 ? !o5 || ca(r5, o5, l4) : !!o5;
    return false;
  }
  function ca(e10, t8, n4) {
    let r5 = Object.keys(t8);
    if (r5.length !== Object.keys(e10).length) return true;
    for (let i5 = 0; i5 < r5.length; i5++) {
      let a5 = r5[i5];
      if (la(t8, e10, a5) && !na(n4, a5)) return true;
    }
    return false;
  }
  function la(e10, t8, n4) {
    let r5 = e10[n4], i5 = t8[n4];
    return n4 === `style` && y(r5) && y(i5) ? !ye(r5, i5) : r5 !== i5;
  }
  function ua({ vnode: e10, parent: t8, suspense: n4 }, r5) {
    for (; t8; ) {
      let n5 = t8.subTree;
      if (n5.suspense && n5.suspense.activeBranch === e10 && (n5.suspense.vnode.el = n5.el = r5, e10 = n5), n5 === e10) (e10 = t8.vnode).el = r5, t8 = t8.parent;
      else break;
    }
    n4 && n4.activeBranch === e10 && (n4.vnode.el = r5);
  }
  var da = {};
  var fa = () => Object.create(da);
  var pa = (e10) => Object.getPrototypeOf(e10) === da;
  function ma(e10, t8, n4, r5 = false) {
    let i5 = {}, a5 = fa();
    e10.propsDefaults = /* @__PURE__ */ Object.create(null), ga(e10, t8, i5, a5);
    for (let t9 in e10.propsOptions[0]) t9 in i5 || (i5[t9] = void 0);
    e10.props = n4 ? r5 ? i5 : Lt(i5) : e10.type.props ? i5 : a5, e10.attrs = a5;
  }
  function ha(e10, t8, n4, r5) {
    let { props: i5, attrs: a5, vnode: { patchFlag: o5 } } = e10, s6 = L(i5), [c4] = e10.propsOptions, l4 = false;
    if ((r5 || o5 > 0) && !(o5 & 16)) {
      if (o5 & 8) {
        let n5 = e10.vnode.dynamicProps;
        for (let r6 = 0; r6 < n5.length; r6++) {
          let o6 = n5[r6];
          if (na(e10.emitsOptions, o6)) continue;
          let d5 = t8[o6];
          if (c4) {
            if (u(a5, o6)) d5 !== a5[o6] && (a5[o6] = d5, l4 = true);
            else {
              let t9 = O(o6);
              i5[t9] = _a(c4, s6, t9, d5, e10, false);
            }
          } else d5 !== a5[o6] && (a5[o6] = d5, l4 = true);
        }
      }
    } else {
      ga(e10, t8, i5, a5) && (l4 = true);
      let r6;
      for (let a6 in s6) (!t8 || !u(t8, a6) && ((r6 = k(a6)) === a6 || !u(t8, r6))) && (c4 ? n4 && (n4[a6] !== void 0 || n4[r6] !== void 0) && (i5[a6] = _a(c4, s6, a6, void 0, e10, true)) : delete i5[a6]);
      if (a5 !== s6) for (let e11 in a5) (!t8 || !u(t8, e11)) && (delete a5[e11], l4 = true);
    }
    l4 && tt(e10.attrs, `set`, ``);
  }
  function ga(e10, n4, r5, i5) {
    let [a5, o5] = e10.propsOptions, s6 = false, c4;
    if (n4) for (let t8 in n4) {
      if (E(t8)) continue;
      let l4 = n4[t8], d5;
      a5 && u(a5, d5 = O(t8)) ? !o5 || !o5.includes(d5) ? r5[d5] = l4 : (c4 ||= {})[d5] = l4 : na(e10.emitsOptions, t8) || (!(t8 in i5) || l4 !== i5[t8]) && (i5[t8] = l4, s6 = true);
    }
    if (o5) {
      let n5 = L(r5), i6 = c4 || t;
      for (let t8 = 0; t8 < o5.length; t8++) {
        let s7 = o5[t8];
        r5[s7] = _a(a5, n5, s7, i6[s7], e10, !u(i6, s7));
      }
    }
    return s6;
  }
  function _a(e10, t8, n4, r5, i5, a5) {
    let o5 = e10[n4];
    if (o5 != null) {
      let e11 = u(o5, `default`);
      if (e11 && r5 === void 0) {
        let e12 = o5.default;
        if (o5.type !== Function && !o5.skipFactory && g(e12)) {
          let { propsDefaults: a6 } = i5;
          if (n4 in a6) r5 = a6[n4];
          else {
            let o6 = Ao(i5);
            r5 = a6[n4] = e12.call(null, t8), o6();
          }
        } else r5 = e12;
        i5.ce && i5.ce._setProp(n4, r5);
      }
      o5[0] && (a5 && !e11 ? r5 = false : o5[1] && (r5 === `` || r5 === k(n4)) && (r5 = true));
    }
    return r5;
  }
  var va = /* @__PURE__ */ new WeakMap();
  function ya(e10, r5, i5 = false) {
    let a5 = i5 ? va : r5.propsCache, o5 = a5.get(e10);
    if (o5) return o5;
    let c4 = e10.props, l4 = {}, f6 = [], p4 = false;
    if (!g(e10)) {
      let t8 = (e11) => {
        p4 = true;
        let [t9, n4] = ya(e11, r5, true);
        s(l4, t9), n4 && f6.push(...n4);
      };
      !i5 && r5.mixins.length && r5.mixins.forEach(t8), e10.extends && t8(e10.extends), e10.mixins && e10.mixins.forEach(t8);
    }
    if (!c4 && !p4) return y(e10) && a5.set(e10, n), n;
    if (d(c4)) for (let e11 = 0; e11 < c4.length; e11++) {
      let n4 = O(c4[e11]);
      ba(n4) && (l4[n4] = t);
    }
    else if (c4) for (let e11 in c4) {
      let t8 = O(e11);
      if (ba(t8)) {
        let n4 = c4[e11], r6 = l4[t8] = d(n4) || g(n4) ? { type: n4 } : s({}, n4), i6 = r6.type, a6 = false, o6 = true;
        if (d(i6)) for (let e12 = 0; e12 < i6.length; ++e12) {
          let t9 = i6[e12], n5 = g(t9) && t9.name;
          if (n5 === `Boolean`) {
            a6 = true;
            break;
          }
          n5 === `String` && (o6 = false);
        }
        else a6 = g(i6) && i6.name === `Boolean`;
        r6[0] = a6, r6[1] = o6, (a6 || u(r6, `default`)) && f6.push(t8);
      }
    }
    let m5 = [l4, f6];
    return y(e10) && a5.set(e10, m5), m5;
  }
  function ba(e10) {
    return e10[0] !== `$` && !E(e10);
  }
  var xa = (e10) => e10 === `_` || e10 === `_ctx` || e10 === `$stable`;
  var Sa = (e10) => d(e10) ? e10.map(Z) : [Z(e10)];
  var Ca = (e10, t8, n4) => {
    if (t8._n) return t8;
    let r5 = Fn((...e11) => Sa(t8(...e11)), n4);
    return r5._c = false, r5;
  };
  var wa = (e10, t8, n4) => {
    let r5 = e10._ctx;
    for (let n5 in e10) {
      if (xa(n5)) continue;
      let i5 = e10[n5];
      if (g(i5)) t8[n5] = Ca(n5, i5, r5);
      else if (i5 != null) {
        let e11 = Sa(i5);
        t8[n5] = () => e11;
      }
    }
  };
  var Ta = (e10, t8) => {
    let n4 = Sa(t8);
    e10.slots.default = () => n4;
  };
  var Ea = (e10, t8, n4) => {
    for (let r5 in t8) (n4 || !xa(r5)) && (e10[r5] = t8[r5]);
  };
  var Da = (e10, t8, n4) => {
    let r5 = e10.slots = fa();
    if (e10.vnode.shapeFlag & 32) {
      let e11 = t8._;
      e11 ? (Ea(r5, t8, n4), n4 && ie(r5, `_`, e11, true)) : wa(t8, r5);
    } else t8 && Ta(e10, t8);
  };
  var Oa = (e10, n4, r5) => {
    let { vnode: i5, slots: a5 } = e10, o5 = true, s6 = t;
    if (i5.shapeFlag & 32) {
      let e11 = n4._;
      e11 ? r5 && e11 === 1 ? o5 = false : Ea(a5, n4, r5) : (o5 = !n4.$stable, wa(n4, a5)), s6 = n4;
    } else n4 && (Ta(e10, n4), s6 = { default: 1 });
    if (o5) for (let e11 in a5) !xa(e11) && s6[e11] == null && delete a5[e11];
  };
  var K = Xa;
  function ka(e10) {
    return ja(e10);
  }
  function ja(e10, i5) {
    let a5 = ce();
    a5.__VUE__ = true;
    let { insert: o5, remove: s6, patchProp: c4, createElement: l4, createText: u4, createComment: d5, setText: f6, setElementText: p4, parentNode: m5, nextSibling: h5, setScopeId: g6 = r, insertStaticContent: _6 } = e10, v7 = (e11, t8, n4, r5 = null, i6 = null, a6 = null, o6 = void 0, s7 = null, c5 = !!t8.dynamicChildren) => {
      if (e11 === t8) return;
      e11 && !uo(e11, t8) && (r5 = _e6(e11), fe7(e11, i6, a6, true), e11 = null), t8.patchFlag === -2 && (c5 = false, t8.dynamicChildren = null);
      let { type: l5, ref: u5, shapeFlag: d6 } = t8;
      switch (l5) {
        case $a:
          y7(e11, t8, n4, r5);
          break;
        case J:
          b6(e11, t8, n4, r5);
          break;
        case eo:
          e11 ?? x5(t8, n4, r5, o6);
          break;
        case q:
          ne4(e11, t8, n4, r5, i6, a6, o6, s7, c5);
          break;
        default:
          d6 & 1 ? w3(e11, t8, n4, r5, i6, a6, o6, s7, c5) : d6 & 6 ? re4(e11, t8, n4, r5, i6, a6, o6, s7, c5) : (d6 & 64 || d6 & 128) && l5.process(e11, t8, n4, r5, i6, a6, o6, s7, c5, be6);
      }
      u5 != null && i6 ? Dr(u5, e11 && e11.ref, a6, t8 || e11, !t8) : u5 == null && e11 && e11.ref != null && Dr(e11.ref, null, a6, e11, true);
    }, y7 = (e11, t8, n4, r5) => {
      if (e11 == null) o5(t8.el = u4(t8.children), n4, r5);
      else {
        let n5 = t8.el = e11.el;
        t8.children !== e11.children && f6(n5, t8.children);
      }
    }, b6 = (e11, t8, n4, r5) => {
      e11 == null ? o5(t8.el = d5(t8.children || ``), n4, r5) : t8.el = e11.el;
    }, x5 = (e11, t8, n4, r5) => {
      [e11.el, e11.anchor] = _6(e11.children, t8, n4, r5, e11.el, e11.anchor);
    }, S5 = ({ el: e11, anchor: t8 }, n4, r5) => {
      let i6;
      for (; e11 && e11 !== t8; ) i6 = h5(e11), o5(e11, n4, r5), e11 = i6;
      o5(t8, n4, r5);
    }, C4 = ({ el: e11, anchor: t8 }) => {
      let n4;
      for (; e11 && e11 !== t8; ) n4 = h5(e11), s6(e11), e11 = n4;
      s6(t8);
    }, w3 = (e11, t8, n4, r5, i6, a6, o6, s7, c5) => {
      if (t8.type === `svg` ? o6 = `svg` : t8.type === `math` && (o6 = `mathml`), e11 == null) T3(t8, n4, r5, i6, a6, o6, s7, c5);
      else {
        let n5 = e11.el && e11.el._isVueCE ? e11.el : null;
        try {
          n5 && n5._beginPatch(), O5(e11, t8, i6, a6, o6, s7, c5);
        } finally {
          n5 && n5._endPatch();
        }
      }
    }, T3 = (e11, t8, n4, r5, i6, a6, s7, u5) => {
      let d6, f7, { props: m6, shapeFlag: h6, transition: g7, dirs: _7 } = e11;
      if (d6 = e11.el = l4(e11.type, a6, m6 && m6.is, m6), h6 & 8 ? p4(d6, e11.children) : h6 & 16 && ee4(e11.children, d6, null, r5, i6, Ma(e11, a6), s7, u5), _7 && Ln(e11, null, r5, `created`), D5(d6, e11, e11.scopeId, s7, r5), m6) {
        for (let e12 in m6) e12 !== `value` && !E(e12) && c4(d6, e12, null, m6[e12], a6, r5);
        `value` in m6 && c4(d6, `value`, null, m6.value, a6), (f7 = m6.onVnodeBeforeMount) && Q(f7, r5, e11);
      }
      _7 && Ln(e11, null, r5, `beforeMount`);
      let v8 = Pa(i6, g7);
      v8 && g7.beforeEnter(d6), o5(d6, t8, n4), ((f7 = m6 && m6.onVnodeMounted) || v8 || _7) && K(() => {
        try {
          f7 && Q(f7, r5, e11), v8 && g7.enter(d6), _7 && Ln(e11, null, r5, `mounted`);
        } finally {
        }
      }, i6);
    }, D5 = (e11, t8, n4, r5, i6) => {
      if (n4 && g6(e11, n4), r5) for (let t9 = 0; t9 < r5.length; t9++) g6(e11, r5[t9]);
      if (i6) {
        let n5 = i6.subTree;
        if (t8 === n5 || Ba(n5.type) && (n5.ssContent === t8 || n5.ssFallback === t8)) {
          let t9 = i6.vnode;
          D5(e11, t9, t9.scopeId, t9.slotScopeIds, i6.parent);
        }
      }
    }, ee4 = (e11, t8, n4, r5, i6, a6, o6, s7, c5 = 0) => {
      for (let l5 = c5; l5 < e11.length; l5++) {
        let c6 = e11[l5] = s7 ? xo(e11[l5]) : Z(e11[l5]);
        v7(null, c6, t8, n4, r5, i6, a6, o6, s7);
      }
    }, O5 = (e11, n4, r5, i6, a6, o6, s7) => {
      let l5 = n4.el = e11.el, { patchFlag: u5, dynamicChildren: d6, dirs: f7 } = n4;
      u5 |= e11.patchFlag & 16;
      let m6 = e11.props || t, h6 = n4.props || t, g7;
      if (r5 && Na(r5, false), (g7 = h6.onVnodeBeforeUpdate) && Q(g7, r5, n4, e11), f7 && Ln(n4, e11, r5, `beforeUpdate`), r5 && Na(r5, true), d6 && (!e11.dynamicChildren || e11.dynamicChildren.length !== d6.length) && (u5 = 0, s7 = false, d6 = null), (m6.innerHTML && h6.innerHTML == null || m6.textContent && h6.textContent == null) && p4(l5, ``), d6 ? te4(e11.dynamicChildren, d6, l5, r5, i6, Ma(n4, a6), o6) : s7 || se6(e11, n4, l5, null, r5, i6, Ma(n4, a6), o6, false), u5 > 0) {
        if (u5 & 16) k6(l5, m6, h6, r5, a6);
        else if (u5 & 2 && m6.class !== h6.class && c4(l5, `class`, null, h6.class, a6), u5 & 4 && c4(l5, `style`, m6.style, h6.style, a6), u5 & 8) {
          let e12 = n4.dynamicProps;
          for (let t8 = 0; t8 < e12.length; t8++) {
            let n5 = e12[t8], i7 = m6[n5], o7 = h6[n5];
            (o7 !== i7 || n5 === `value`) && c4(l5, n5, i7, o7, a6, r5);
          }
        }
        u5 & 1 && e11.children !== n4.children && p4(l5, n4.children);
      } else !s7 && d6 == null && k6(l5, m6, h6, r5, a6);
      ((g7 = h6.onVnodeUpdated) || f7) && K(() => {
        g7 && Q(g7, r5, n4, e11), f7 && Ln(n4, e11, r5, `updated`);
      }, i6);
    }, te4 = (e11, t8, n4, r5, i6, a6, o6) => {
      for (let s7 = 0; s7 < t8.length; s7++) {
        let c5 = e11[s7], l5 = t8[s7], u5 = c5.el && (c5.type === q || !uo(c5, l5) || c5.shapeFlag & 198) ? m5(c5.el) : n4;
        v7(c5, l5, u5, null, r5, i6, a6, o6, true);
      }
    }, k6 = (e11, n4, r5, i6, a6) => {
      if (n4 !== r5) {
        if (n4 !== t) for (let t8 in n4) !E(t8) && !(t8 in r5) && c4(e11, t8, n4[t8], null, a6, i6);
        for (let t8 in r5) {
          if (E(t8)) continue;
          let o6 = r5[t8], s7 = n4[t8];
          o6 !== s7 && t8 !== `value` && c4(e11, t8, s7, o6, a6, i6);
        }
        `value` in r5 && c4(e11, `value`, n4.value, r5.value, a6);
      }
    }, ne4 = (e11, t8, n4, r5, i6, a6, s7, c5, l5) => {
      let d6 = t8.el = e11 ? e11.el : u4(``), f7 = t8.anchor = e11 ? e11.anchor : u4(``), { patchFlag: p5, dynamicChildren: m6, slotScopeIds: h6 } = t8;
      h6 && (c5 = c5 ? c5.concat(h6) : h6), e11 == null ? (o5(d6, n4, r5), o5(f7, n4, r5), ee4(t8.children || [], n4, f7, i6, a6, s7, c5, l5)) : p5 > 0 && p5 & 64 && m6 && e11.dynamicChildren && e11.dynamicChildren.length === m6.length ? (te4(e11.dynamicChildren, m6, n4, i6, a6, s7, c5), (t8.key != null || i6 && t8 === i6.subTree) && Fa(e11, t8, true)) : se6(e11, t8, n4, f7, i6, a6, s7, c5, l5);
    }, re4 = (e11, t8, n4, r5, i6, a6, o6, s7, c5) => {
      t8.slotScopeIds = s7, e11 == null ? t8.shapeFlag & 512 ? i6.ctx.activate(t8, n4, r5, o6, c5) : A6(t8, n4, r5, i6, a6, o6, c5) : ie5(e11, t8, c5);
    }, A6 = (e11, t8, n4, r5, i6, a6, o6) => {
      let s7 = e11.component = Eo(e11, r5, i6);
      if (Yr(e11) && (s7.ctx.renderer = be6), Po(s7, false, o6), s7.asyncDep) {
        if (i6 && i6.registerDep(s7, ae6, o6), !e11.el) {
          let r6 = s7.subTree = X(J);
          b6(null, r6, t8, n4), e11.placeholder = r6.el;
        }
      } else ae6(s7, e11, t8, n4, i6, a6, o6);
    }, ie5 = (e11, t8, n4) => {
      let r5 = t8.component = e11.component;
      if (sa(e11, t8, n4)) {
        if (r5.asyncDep && !r5.asyncResolved) {
          oe6(r5, t8, n4);
          return;
        }
        r5.next = t8, r5.update();
      } else t8.el = e11.el, r5.vnode = t8;
    }, ae6 = (e11, t8, n4, r5, i6, a6, o6) => {
      let s7 = () => {
        if (e11.isMounted) {
          let { next: t9, bu: n5, u: r6, parent: s8, vnode: c6 } = e11;
          {
            let n6 = La(e11);
            if (n6) {
              t9 && (t9.el = c6.el, oe6(e11, t9, o6)), n6.asyncDep.then(() => {
                K(() => {
                  e11.isUnmounted || l5();
                }, i6);
              });
              return;
            }
          }
          let u6 = t9, d6;
          Na(e11, false), t9 ? (t9.el = c6.el, oe6(e11, t9, o6)) : t9 = c6, n5 && j(n5), (d6 = t9.props && t9.props.onVnodeBeforeUpdate) && Q(d6, s8, t9, c6), Na(e11, true);
          let f7 = ra(e11), p5 = e11.subTree;
          e11.subTree = f7, v7(p5, f7, m5(p5.el), _e6(p5), e11, i6, a6), t9.el = f7.el, u6 === null && ua(e11, f7.el), r6 && K(r6, i6), (d6 = t9.props && t9.props.onVnodeUpdated) && K(() => Q(d6, s8, t9, c6), i6);
        } else {
          let o7, { el: s8, props: c6 } = t8, { bm: l6, m: u6, parent: d6, root: f7, type: p5 } = e11, m6 = Kr(t8);
          if (Na(e11, false), l6 && j(l6), !m6 && (o7 = c6 && c6.onVnodeBeforeMount) && Q(o7, d6, t8), Na(e11, true), s8 && Se6) {
            let t9 = () => {
              e11.subTree = ra(e11), Se6(s8, e11.subTree, e11, i6, null);
            };
            m6 && p5.__asyncHydrate ? p5.__asyncHydrate(s8, e11, t9) : t9();
          } else {
            f7.ce && f7.ce._hasShadowRoot() && f7.ce._injectChildStyle(p5, e11.parent ? e11.parent.type : void 0);
            let o8 = e11.subTree = ra(e11);
            v7(null, o8, n4, r5, e11, i6, a6), t8.el = o8.el;
          }
          if (u6 && K(u6, i6), !m6 && (o7 = c6 && c6.onVnodeMounted)) {
            let e12 = t8;
            K(() => Q(o7, d6, e12), i6);
          }
          (t8.shapeFlag & 256 || d6 && Kr(d6.vnode) && d6.vnode.shapeFlag & 256) && e11.a && K(e11.a, i6), e11.isMounted = true, t8 = n4 = r5 = null;
        }
      };
      e11.scope.on();
      let c5 = e11.effect = new Ae(s7);
      e11.scope.off();
      let l5 = e11.update = c5.run.bind(c5), u5 = e11.job = c5.runIfDirty.bind(c5);
      u5.i = e11, u5.id = e11.uid, c5.scheduler = () => En(u5), Na(e11, true), l5();
    }, oe6 = (e11, t8, n4) => {
      t8.component = e11;
      let r5 = e11.vnode.props;
      e11.vnode = t8, e11.next = null, ha(e11, t8.props, r5, n4), Oa(e11, t8.children, n4), We(), kn(e11), Ge();
    }, se6 = (e11, t8, n4, r5, i6, a6, o6, s7, c5 = false) => {
      let l5 = e11 && e11.children, u5 = e11 ? e11.shapeFlag : 0, d6 = t8.children, { patchFlag: f7, shapeFlag: m6 } = t8;
      if (f7 > 0) {
        if (f7 & 128) {
          ue7(l5, d6, n4, r5, i6, a6, o6, s7, c5);
          return;
        }
        if (f7 & 256) {
          le7(l5, d6, n4, r5, i6, a6, o6, s7, c5);
          return;
        }
      }
      m6 & 8 ? (u5 & 16 && ge7(l5, i6, a6), d6 !== l5 && p4(n4, d6)) : u5 & 16 ? m6 & 16 ? ue7(l5, d6, n4, r5, i6, a6, o6, s7, c5) : ge7(l5, i6, a6, true) : (u5 & 8 && p4(n4, ``), m6 & 16 && ee4(d6, n4, r5, i6, a6, o6, s7, c5));
    }, le7 = (e11, t8, r5, i6, a6, o6, s7, c5, l5) => {
      e11 ||= n, t8 ||= n;
      let u5 = e11.length, d6 = t8.length, f7 = Math.min(u5, d6), p5;
      for (p5 = 0; p5 < f7; p5++) {
        let n4 = t8[p5] = l5 ? xo(t8[p5]) : Z(t8[p5]);
        v7(e11[p5], n4, r5, null, a6, o6, s7, c5, l5);
      }
      u5 > d6 ? ge7(e11, a6, o6, true, false, f7) : ee4(t8, r5, i6, a6, o6, s7, c5, l5, f7);
    }, ue7 = (e11, t8, r5, i6, a6, o6, s7, c5, l5) => {
      let u5 = 0, d6 = t8.length, f7 = e11.length - 1, p5 = d6 - 1;
      for (; u5 <= f7 && u5 <= p5; ) {
        let n4 = e11[u5], i7 = t8[u5] = l5 ? xo(t8[u5]) : Z(t8[u5]);
        if (uo(n4, i7)) v7(n4, i7, r5, null, a6, o6, s7, c5, l5);
        else break;
        u5++;
      }
      for (; u5 <= f7 && u5 <= p5; ) {
        let n4 = e11[f7], i7 = t8[p5] = l5 ? xo(t8[p5]) : Z(t8[p5]);
        if (uo(n4, i7)) v7(n4, i7, r5, null, a6, o6, s7, c5, l5);
        else break;
        f7--, p5--;
      }
      if (u5 > f7) {
        if (u5 <= p5) {
          let e12 = p5 + 1, n4 = e12 < d6 ? t8[e12].el : i6;
          for (; u5 <= p5; ) v7(null, t8[u5] = l5 ? xo(t8[u5]) : Z(t8[u5]), r5, n4, a6, o6, s7, c5, l5), u5++;
        }
      } else if (u5 > p5) for (; u5 <= f7; ) fe7(e11[u5], a6, o6, true), u5++;
      else {
        let m6 = u5, h6 = u5, g7 = /* @__PURE__ */ new Map();
        for (u5 = h6; u5 <= p5; u5++) {
          let e12 = t8[u5] = l5 ? xo(t8[u5]) : Z(t8[u5]);
          e12.key != null && g7.set(e12.key, u5);
        }
        let _7, y8 = 0, b7 = p5 - h6 + 1, x6 = false, S6 = 0, C5 = Array(b7);
        for (u5 = 0; u5 < b7; u5++) C5[u5] = 0;
        for (u5 = m6; u5 <= f7; u5++) {
          let n4 = e11[u5];
          if (y8 >= b7) {
            fe7(n4, a6, o6, true);
            continue;
          }
          let i7;
          if (n4.key != null) i7 = g7.get(n4.key);
          else for (_7 = h6; _7 <= p5; _7++) if (C5[_7 - h6] === 0 && uo(n4, t8[_7])) {
            i7 = _7;
            break;
          }
          i7 === void 0 ? fe7(n4, a6, o6, true) : (C5[i7 - h6] = u5 + 1, i7 >= S6 ? S6 = i7 : x6 = true, v7(n4, t8[i7], r5, null, a6, o6, s7, c5, l5), y8++);
        }
        let w4 = x6 ? Ia(C5) : n;
        for (_7 = w4.length - 1, u5 = b7 - 1; u5 >= 0; u5--) {
          let e12 = h6 + u5, n4 = t8[e12], f8 = t8[e12 + 1], p6 = e12 + 1 < d6 ? f8.el || za(f8) : i6;
          C5[u5] === 0 ? v7(null, n4, r5, p6, a6, o6, s7, c5, l5) : x6 && (_7 < 0 || u5 !== w4[_7] ? de7(n4, r5, p6, 2) : _7--);
        }
      }
    }, de7 = (e11, t8, n4, r5, i6 = null) => {
      let { el: a6, type: c5, transition: l5, children: u5, shapeFlag: d6 } = e11;
      if (d6 & 6) {
        de7(e11.component.subTree, t8, n4, r5);
        return;
      }
      if (d6 & 128) {
        e11.suspense.move(t8, n4, r5);
        return;
      }
      if (d6 & 64) {
        c5.move(e11, t8, n4, be6);
        return;
      }
      if (c5 === q) {
        o5(a6, t8, n4);
        for (let e12 = 0; e12 < u5.length; e12++) de7(u5[e12], t8, n4, r5);
        o5(e11.anchor, t8, n4);
        return;
      }
      if (c5 === eo) {
        S5(e11, t8, n4);
        return;
      }
      if (r5 !== 2 && d6 & 1 && l5) {
        if (r5 === 0) l5.persisted && !a6[U] ? o5(a6, t8, n4) : (l5.beforeEnter(a6), o5(a6, t8, n4), K(() => l5.enter(a6), i6));
        else {
          let { leave: r6, delayLeave: i7, afterLeave: c6 } = l5, u6 = () => {
            e11.ctx.isUnmounted ? s6(a6) : o5(a6, t8, n4);
          }, d7 = () => {
            let e12 = a6._isLeaving || !!a6[U];
            a6._isLeaving && a6[U](true), l5.persisted && !e12 ? u6() : r6(a6, () => {
              u6(), c6 && c6();
            });
          };
          i7 ? i7(a6, u6, d7) : d7();
        }
      } else o5(a6, t8, n4);
    }, fe7 = (e11, t8, n4, r5 = false, i6 = false) => {
      let { type: a6, props: o6, ref: s7, children: c5, dynamicChildren: l5, shapeFlag: u5, patchFlag: d6, dirs: f7, cacheIndex: p5, memo: m6 } = e11;
      if (d6 === -2 && (i6 = false), s7 != null && (We(), Dr(s7, null, n4, e11, true), Ge()), p5 != null && (t8.renderCache[p5] = void 0), u5 & 256) {
        t8.ctx.deactivate(e11);
        return;
      }
      let h6 = u5 & 1 && f7, g7 = !Kr(e11), _7;
      if (g7 && (_7 = o6 && o6.onVnodeBeforeUnmount) && Q(_7, t8, e11), u5 & 6) he7(e11.component, n4, r5);
      else {
        if (u5 & 128) {
          e11.suspense.unmount(n4, r5);
          return;
        }
        h6 && Ln(e11, null, t8, `beforeUnmount`), u5 & 64 ? e11.type.remove(e11, t8, n4, be6, r5) : l5 && !l5.hasOnce && (a6 !== q || d6 > 0 && d6 & 64) ? ge7(l5, t8, n4, false, true) : (a6 === q && d6 & 384 || !i6 && u5 & 16) && ge7(c5, t8, n4), r5 && pe7(e11);
      }
      let v8 = m6 != null && p5 == null;
      (g7 && (_7 = o6 && o6.onVnodeUnmounted) || h6 || v8) && K(() => {
        _7 && Q(_7, t8, e11), h6 && Ln(e11, null, t8, `unmounted`), v8 && (e11.el = null);
      }, n4);
    }, pe7 = (e11) => {
      let { type: t8, el: n4, anchor: r5, transition: i6 } = e11;
      if (t8 === q) {
        me7(n4, r5);
        return;
      }
      if (t8 === eo) {
        C4(e11);
        return;
      }
      let a6 = () => {
        s6(n4), i6 && !i6.persisted && i6.afterLeave && i6.afterLeave();
      };
      if (e11.shapeFlag & 1 && i6 && !i6.persisted) {
        let { leave: t9, delayLeave: r6 } = i6, o6 = () => t9(n4, a6);
        r6 ? r6(e11.el, a6, o6) : o6();
      } else a6();
    }, me7 = (e11, t8) => {
      let n4;
      for (; e11 !== t8; ) n4 = h5(e11), s6(e11), e11 = n4;
      s6(t8);
    }, he7 = (e11, t8, n4) => {
      let { bum: r5, scope: i6, job: a6, subTree: o6, um: s7, m: c5, a: l5 } = e11;
      Ra(c5), Ra(l5), r5 && j(r5), i6.stop(), a6 && (a6.flags |= 8, fe7(o6, e11, t8, n4)), s7 && K(s7, t8), K(() => {
        e11.isUnmounted = true;
      }, t8);
    }, ge7 = (e11, t8, n4, r5 = false, i6 = false, a6 = 0) => {
      for (let o6 = a6; o6 < e11.length; o6++) fe7(e11[o6], t8, n4, r5, i6);
    }, _e6 = (e11) => {
      if (e11.shapeFlag & 6) return _e6(e11.component.subTree);
      if (e11.shapeFlag & 128) return e11.suspense.next();
      let t8 = h5(e11.anchor || e11.el), n4 = t8 && t8[Xn];
      return n4 ? h5(n4) : t8;
    }, ve6 = false, ye6 = (e11, t8, n4) => {
      let r5;
      e11 == null ? t8._vnode && (fe7(t8._vnode, null, null, true), r5 = t8._vnode.component) : v7(t8._vnode || null, e11, t8, null, null, null, n4), t8._vnode = e11, ve6 ||= (ve6 = true, kn(r5), An(), false);
    }, be6 = { p: v7, um: fe7, m: de7, r: pe7, mt: A6, mc: ee4, pc: se6, pbc: te4, n: _e6, o: e10 }, xe6, Se6;
    return i5 && ([xe6, Se6] = i5(be6)), { render: ye6, hydrate: xe6, createApp: Yi(ye6, xe6) };
  }
  function Ma({ type: e10, props: t8 }, n4) {
    return n4 === `svg` && e10 === `foreignObject` || n4 === `mathml` && e10 === `annotation-xml` && t8 && t8.encoding && t8.encoding.includes(`html`) ? void 0 : n4;
  }
  function Na({ effect: e10, job: t8 }, n4) {
    n4 ? (e10.flags |= 32, t8.flags |= 4) : (e10.flags &= -33, t8.flags &= -5);
  }
  function Pa(e10, t8) {
    return (!e10 || e10 && !e10.pendingBranch) && t8 && !t8.persisted;
  }
  function Fa(e10, t8, n4 = false) {
    let r5 = e10.children, i5 = t8.children;
    if (d(r5) && d(i5)) for (let e11 = 0; e11 < r5.length; e11++) {
      let t9 = r5[e11], a5 = i5[e11];
      a5.shapeFlag & 1 && !a5.dynamicChildren && ((a5.patchFlag <= 0 || a5.patchFlag === 32) && (a5 = i5[e11] = xo(i5[e11]), a5.el = t9.el), !n4 && a5.patchFlag !== -2 && Fa(t9, a5)), a5.type === $a && (a5.patchFlag === -1 && (a5 = i5[e11] = xo(a5)), a5.el = t9.el), a5.type === J && !a5.el && (a5.el = t9.el);
    }
  }
  function Ia(e10) {
    let t8 = e10.slice(), n4 = [0], r5, i5, a5, o5, s6, c4 = e10.length;
    for (r5 = 0; r5 < c4; r5++) {
      let c5 = e10[r5];
      if (c5 !== 0) {
        if (i5 = n4[n4.length - 1], e10[i5] < c5) {
          t8[r5] = i5, n4.push(r5);
          continue;
        }
        for (a5 = 0, o5 = n4.length - 1; a5 < o5; ) s6 = a5 + o5 >> 1, e10[n4[s6]] < c5 ? a5 = s6 + 1 : o5 = s6;
        c5 < e10[n4[a5]] && (a5 > 0 && (t8[r5] = n4[a5 - 1]), n4[a5] = r5);
      }
    }
    for (a5 = n4.length, o5 = n4[a5 - 1]; a5-- > 0; ) n4[a5] = o5, o5 = t8[o5];
    return n4;
  }
  function La(e10) {
    let t8 = e10.subTree.component;
    if (t8) return t8.asyncDep && !t8.asyncResolved ? t8 : La(t8);
  }
  function Ra(e10) {
    if (e10) for (let t8 = 0; t8 < e10.length; t8++) e10[t8].flags |= 8;
  }
  function za(e10) {
    if (e10.placeholder) return e10.placeholder;
    let t8 = e10.component;
    return t8 ? za(t8.subTree) : null;
  }
  var Ba = (e10) => e10.__isSuspense;
  function Xa(e10, t8) {
    t8 && t8.pendingBranch ? d(e10) ? t8.effects.push(...e10) : t8.effects.push(e10) : On(e10);
  }
  var q = Symbol.for(`v-fgt`);
  var $a = Symbol.for(`v-txt`);
  var J = Symbol.for(`v-cmt`);
  var eo = Symbol.for(`v-stc`);
  var to = [];
  var Y = null;
  function no(e10 = false) {
    to.push(Y = e10 ? null : []);
  }
  function ro() {
    to.pop(), Y = to[to.length - 1] || null;
  }
  var io = 1;
  function ao(e10, t8 = false) {
    io += e10, e10 < 0 && Y && t8 && (Y.hasOnce = true);
  }
  function oo(e10) {
    return e10.dynamicChildren = io > 0 ? Y || n : null, ro(), io > 0 && Y && Y.push(e10), e10;
  }
  function so(e10, t8, n4, r5, i5, a5) {
    return oo(mo(e10, t8, n4, r5, i5, a5, true));
  }
  function co(e10, t8, n4, r5, i5) {
    return oo(X(e10, t8, n4, r5, i5, true));
  }
  function lo(e10) {
    return e10 ? e10.__v_isVNode === true : false;
  }
  function uo(e10, t8) {
    return e10.type === t8.type && e10.key === t8.key;
  }
  var fo = ({ key: e10 }) => e10 ?? null;
  var po = ({ ref: e10, ref_key: t8, ref_for: n4 }) => (typeof e10 == `number` && (e10 = `` + e10), e10 == null ? null : _(e10) || z(e10) || g(e10) ? { i: H, r: e10, k: t8, f: !!n4 } : e10);
  function mo(e10, t8 = null, n4 = null, r5 = 0, i5 = null, a5 = e10 === q ? 0 : 1, o5 = false, s6 = false) {
    let c4 = { __v_isVNode: true, __v_skip: true, type: e10, props: t8, key: t8 && fo(t8), ref: t8 && po(t8), scopeId: Nn, slotScopeIds: null, children: n4, component: null, suspense: null, ssContent: null, ssFallback: null, dirs: null, transition: null, el: null, anchor: null, target: null, targetStart: null, targetAnchor: null, staticCount: 0, shapeFlag: a5, patchFlag: r5, dynamicProps: i5, dynamicChildren: null, appContext: null, ctx: H };
    return s6 ? (So(c4, n4), a5 & 128 && e10.normalize(c4)) : n4 && (c4.shapeFlag |= _(n4) ? 8 : 16), io > 0 && !o5 && Y && (c4.patchFlag > 0 || a5 & 6) && c4.patchFlag !== 32 && Y.push(c4), c4;
  }
  var X = ho;
  function ho(e10, t8 = null, n4 = null, r5 = 0, i5 = null, a5 = false) {
    if ((!e10 || e10 === vi) && (e10 = J), lo(e10)) {
      let r6 = _o(e10, t8, true);
      return n4 && So(r6, n4), io > 0 && !a5 && Y && (r6.shapeFlag & 6 ? Y[Y.indexOf(e10)] = r6 : Y.push(r6)), r6.patchFlag = -2, r6;
    }
    if (Ho(e10) && (e10 = e10.__vccOpts), t8) {
      t8 = go(t8);
      let { class: e11, style: n5 } = t8;
      e11 && !_(e11) && (t8.class = me(e11)), y(n5) && (Ht(n5) && !d(n5) && (n5 = s({}, n5)), t8.style = le(n5));
    }
    let o5 = _(e10) ? 1 : Ba(e10) ? 128 : Zn(e10) ? 64 : y(e10) ? 4 : g(e10) ? 2 : 0;
    return mo(e10, t8, n4, r5, i5, o5, a5, true);
  }
  function go(e10) {
    return e10 ? Ht(e10) || pa(e10) ? s({}, e10) : e10 : null;
  }
  function _o(e10, t8, n4 = false, r5 = false) {
    let { props: i5, ref: a5, patchFlag: o5, children: s6, transition: c4 } = e10, l4 = t8 ? Co(i5 || {}, t8) : i5, u4 = { __v_isVNode: true, __v_skip: true, type: e10.type, props: l4, key: l4 && fo(l4), ref: t8 && t8.ref ? n4 && a5 ? d(a5) ? a5.concat(po(t8)) : [a5, po(t8)] : po(t8) : a5, scopeId: e10.scopeId, slotScopeIds: e10.slotScopeIds, children: s6, target: e10.target, targetStart: e10.targetStart, targetAnchor: e10.targetAnchor, staticCount: e10.staticCount, shapeFlag: e10.shapeFlag, patchFlag: t8 && e10.type !== q ? o5 === -1 ? 16 : o5 | 16 : o5, dynamicProps: e10.dynamicProps, dynamicChildren: e10.dynamicChildren, appContext: e10.appContext, dirs: e10.dirs, transition: c4, component: e10.component, suspense: e10.suspense, ssContent: e10.ssContent && _o(e10.ssContent), ssFallback: e10.ssFallback && _o(e10.ssFallback), placeholder: e10.placeholder, el: e10.el, anchor: e10.anchor, ctx: e10.ctx, ce: e10.ce };
    return c4 && r5 && br(u4, c4.clone(u4)), u4;
  }
  function vo(e10 = ` `, t8 = 0) {
    return X($a, null, e10, t8);
  }
  function bo(e10 = ``, t8 = false) {
    return t8 ? (no(), co(J, null, e10)) : X(J, null, e10);
  }
  function Z(e10) {
    return e10 == null || typeof e10 == `boolean` ? X(J) : d(e10) ? X(q, null, e10.slice()) : lo(e10) ? xo(e10) : X($a, null, String(e10));
  }
  function xo(e10) {
    return e10.el === null && e10.patchFlag !== -1 || e10.memo ? e10 : _o(e10);
  }
  function So(e10, t8) {
    let n4 = 0, { shapeFlag: r5 } = e10;
    if (t8 == null) t8 = null;
    else if (d(t8)) n4 = 16;
    else if (typeof t8 == `object`) {
      if (r5 & 65) {
        let n5 = t8.default;
        n5 && (n5._c && (n5._d = false), So(e10, n5()), n5._c && (n5._d = true));
        return;
      }
      {
        n4 = 32;
        let r6 = t8._;
        !r6 && !pa(t8) ? t8._ctx = H : r6 === 3 && H && (H.slots._ === 1 ? t8._ = 1 : (t8._ = 2, e10.patchFlag |= 1024));
      }
    } else if (g(t8)) {
      if (r5 & 65) {
        So(e10, { default: t8 });
        return;
      }
      t8 = { default: t8, _ctx: H }, n4 = 32;
    } else t8 = String(t8), r5 & 64 ? (n4 = 16, t8 = [vo(t8)]) : n4 = 8;
    e10.children = t8, e10.shapeFlag |= n4;
  }
  function Co(...e10) {
    let t8 = {};
    for (let n4 = 0; n4 < e10.length; n4++) {
      let r5 = e10[n4];
      for (let e11 in r5) if (e11 === `class`) t8.class !== r5.class && (t8.class = me([t8.class, r5.class]));
      else if (e11 === `style`) t8.style = le([t8.style, r5.style]);
      else if (a(e11)) {
        let n5 = t8[e11], i5 = r5[e11];
        i5 && n5 !== i5 && !(d(n5) && n5.includes(i5)) ? t8[e11] = n5 ? [].concat(n5, i5) : i5 : i5 == null && n5 == null && !o(e11) && (t8[e11] = i5);
      } else e11 !== `` && (t8[e11] = r5[e11]);
    }
    return t8;
  }
  function Q(e10, t8, n4, r5 = null) {
    B(e10, t8, 7, [n4, r5]);
  }
  var wo = qi();
  var To = 0;
  function Eo(e10, n4, r5) {
    let i5 = e10.type, a5 = (n4 ? n4.appContext : e10.appContext) || wo, o5 = { uid: To++, vnode: e10, type: i5, parent: n4, appContext: a5, root: null, next: null, subTree: null, effect: null, update: null, job: null, scope: new Te(true), render: null, proxy: null, exposed: null, exposeProxy: null, withProxy: null, provides: n4 ? n4.provides : Object.create(a5.provides), ids: n4 ? n4.ids : [``, 0, 0], accessCache: null, renderCache: [], components: null, directives: null, propsOptions: ya(i5, a5), emitsOptions: ta(i5, a5), emit: null, emitted: null, propsDefaults: t, inheritAttrs: i5.inheritAttrs, ctx: t, data: t, props: t, attrs: t, slots: t, refs: t, setupState: t, setupContext: null, suspense: r5, suspenseId: r5 ? r5.pendingId : 0, asyncDep: null, asyncResolved: false, isMounted: false, isUnmounted: false, isDeactivated: false, bc: null, c: null, bm: null, m: null, bu: null, u: null, um: null, bum: null, da: null, a: null, rtg: null, rtc: null, ec: null, sp: null };
    return o5.ctx = { _: o5 }, o5.root = n4 ? n4.root : o5, o5.emit = $i.bind(null, o5), e10.ce && e10.ce(o5), o5;
  }
  var $ = null;
  var Do = () => $ || H;
  var Oo;
  var ko;
  {
    let e10 = ce(), t8 = (t9, n4) => {
      let r5;
      return (r5 = e10[t9]) || (r5 = e10[t9] = []), r5.push(n4), (e11) => {
        r5.length > 1 ? r5.forEach((t10) => t10(e11)) : r5[0](e11);
      };
    };
    Oo = t8(`__VUE_INSTANCE_SETTERS__`, (e11) => $ = e11), ko = t8(`__VUE_SSR_SETTERS__`, (e11) => No = e11);
  }
  var Ao = (e10) => {
    let t8 = $;
    return Oo(e10), e10.scope.on(), () => {
      e10.scope.off(), Oo(t8);
    };
  };
  var jo = () => {
    $ && $.scope.off(), Oo(null);
  };
  function Mo(e10) {
    return e10.vnode.shapeFlag & 4;
  }
  var No = false;
  function Po(e10, t8 = false, n4 = false) {
    t8 && ko(t8);
    let { props: r5, children: i5 } = e10.vnode, a5 = Mo(e10);
    ma(e10, r5, a5, t8), Da(e10, i5, n4 || t8);
    let o5 = a5 ? Fo(e10, t8) : void 0;
    return t8 && ko(false), o5;
  }
  function Fo(e10, t8) {
    let n4 = e10.type;
    e10.accessCache = /* @__PURE__ */ Object.create(null), e10.proxy = new Proxy(e10.ctx, ki);
    let { setup: r5 } = n4;
    if (r5) {
      We();
      let n5 = e10.setupContext = r5.length > 1 ? zo(e10) : null, i5 = Ao(e10), a5 = hn(r5, e10, 0, [e10.props, n5]), o5 = b(a5);
      if (Ge(), i5(), (o5 || e10.sp) && !Kr(e10) && wr(e10), o5) {
        if (a5.then(jo, jo), t8) return a5.then((n6) => {
          ko(true);
          try {
            Io(e10, n6, t8);
          } finally {
            ko(false);
          }
        }).catch((t9) => {
          gn(t9, e10, 0);
        });
        e10.asyncDep = a5;
      } else Io(e10, a5, t8);
    } else Lo(e10, t8);
  }
  function Io(e10, t8, n4) {
    g(t8) ? e10.type.__ssrInlineRender ? e10.ssrRender = t8 : e10.render = t8 : y(t8) && (e10.setupState = Qt(t8)), Lo(e10, n4);
  }
  function Lo(e10, t8, n4) {
    let i5 = e10.type;
    e10.render ||= i5.render || r;
    {
      let t9 = Ao(e10);
      We();
      try {
        Pi(e10);
      } finally {
        Ge(), t9();
      }
    }
  }
  var Ro = { get(e10, t8) {
    return F(e10, `get`, ``), e10[t8];
  } };
  function zo(e10) {
    return { attrs: new Proxy(e10.attrs, Ro), slots: e10.slots, emit: e10.emit, expose: (t8) => {
      e10.exposed = t8 || {};
    } };
  }
  function Bo(e10) {
    return e10.exposed ? e10.exposeProxy ||= new Proxy(Qt(Ut(e10.exposed)), { get(t8, n4) {
      if (n4 in t8) return t8[n4];
      if (n4 in Di) return Di[n4](e10);
    }, has(e11, t8) {
      return t8 in e11 || t8 in Di;
    } }) : e10.proxy;
  }
  function Ho(e10) {
    return g(e10) && `__vccOpts` in e10;
  }
  var Uo = (e10, t8) => cn(e10, t8, No);
  function Wo(e10, t8, n4) {
    try {
      ao(-1);
      let r5 = arguments.length;
      return r5 === 2 ? y(t8) && !d(t8) ? lo(t8) ? X(e10, null, [t8]) : X(e10, t8) : X(e10, null, t8) : (r5 > 3 ? n4 = Array.prototype.slice.call(arguments, 2) : r5 === 3 && lo(n4) && (n4 = [n4]), X(e10, t8, n4));
    } finally {
      ao(1);
    }
  }
  var Go = `3.5.41`;

  // master-cms-mockup/vendor/omr-preview/source/offline-api.js
  var r2 = (url) => url;
  async function t2(url, options) {
    if (url != "/api/omr-preview/check") throw { data: { data: { message: "\uC624\uD504\uB77C\uC778 \uBAA9\uC5C5\uC5D0\uC11C\uB294 \uD544\uAE30 \uC778\uC2DD \uC11C\uBC84\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4." } } };
    return new Promise((resolve, reject) => {
      const id = crypto.randomUUID();
      let timer;
      const receive = (e10) => {
        if (e10.source !== parent || e10.data?.source !== "donga-omr-preview" || e10.data.type !== "grade-result" || e10.data.id !== id) return;
        clearTimeout(timer);
        removeEventListener("message", receive);
        resolve(e10.data.result);
      };
      addEventListener("message", receive);
      timer = setTimeout(() => {
        removeEventListener("message", receive);
        reject(Error("Local grade response timed out"));
      }, 5e3);
      parent.postMessage({ source: "donga-omr-preview", type: "grade", id, value: options.body.value }, "*");
    });
  }

  // master-cms-mockup/vendor/omr-preview/source/nuxt-shim.js
  var t3 = (component, props = []) => {
    const target = component.__vccOpts || component;
    for (const [k6, v7] of props) target[k6] = v7;
    return target;
  };
  var y2 = () => {
  };

  // master-cms-mockup/vendor/omr-preview/source/DhuA3TEA.js
  var e2 = class e3 extends Error {
    constructor(t8, n4) {
      var r5 = `KaTeX parse error: ` + t8, i5, a5, o5 = n4 && n4.loc;
      if (o5 && o5.start <= o5.end) {
        var s6 = o5.lexer.input;
        i5 = o5.start, a5 = o5.end, i5 === s6.length ? r5 += ` at end of input: ` : r5 += ` at position ` + (i5 + 1) + `: `;
        var c4 = s6.slice(i5, a5).replace(/[^]/g, `$&\u0332`), l4 = i5 > 15 ? `\u2026` + s6.slice(i5 - 15, i5) : s6.slice(0, i5), u4 = a5 + 15 < s6.length ? s6.slice(a5, a5 + 15) + `\u2026` : s6.slice(a5);
        r5 += l4 + c4 + u4;
      }
      super(r5), this.name = `ParseError`, this.position = void 0, this.length = void 0, this.rawMessage = void 0, Object.setPrototypeOf(this, e3.prototype), this.position = i5, i5 != null && a5 != null && (this.length = a5 - i5), this.rawMessage = t8;
    }
  };
  var t4 = /([A-Z])/g;
  var n2 = (e10) => e10.replace(t4, `-$1`).toLowerCase();
  var r3 = { "&": `&amp;`, ">": `&gt;`, "<": `&lt;`, '"': `&quot;`, "'": `&#x27;` };
  var i2 = /[&><"']/g;
  var a2 = (e10) => String(e10).replace(i2, (e11) => r3[e11]);
  var o2 = (e10) => e10.type === `ordgroup` || e10.type === `color` ? e10.body.length === 1 ? o2(e10.body[0]) : e10 : e10.type === `font` ? o2(e10.body) : e10;
  var s2 = /* @__PURE__ */ new Set([`mathord`, `textord`, `atom`]);
  var c2 = (e10) => s2.has(o2(e10).type);
  var l2 = (e10) => {
    var t8 = /^[\x00-\x20]*([^\\/#?]*?)(:|&#0*58|&#x0*3a|&colon)/i.exec(e10);
    return t8 ? t8[2] !== `:` || !/^[a-zA-Z][a-zA-Z0-9+\-.]*$/.test(t8[1]) ? null : t8[1].toLowerCase() : `_relative`;
  };
  var u2 = { displayMode: { type: `boolean`, description: `Render math in display mode, which puts the math in display style (so \\int and \\sum are large, for example), and centers the math on the page on its own line.`, cli: `-d, --display-mode` }, output: { type: { enum: [`htmlAndMathml`, `html`, `mathml`] }, description: `Determines the markup language of the output.`, cli: `-F, --format <type>` }, leqno: { type: `boolean`, description: `Render display math in leqno style (left-justified tags).` }, fleqn: { type: `boolean`, description: `Render display math flush left.` }, throwOnError: { type: `boolean`, default: true, cli: `-t, --no-throw-on-error`, cliDescription: `Render errors (in the color given by --error-color) instead of throwing a ParseError exception when encountering an error.` }, errorColor: { type: `string`, default: `#cc0000`, cli: `-c, --error-color <color>`, cliDescription: `A color string given in the format 'rgb' or 'rrggbb' (no #). This option determines the color of errors rendered by the -t option.`, cliProcessor: (e10) => `#` + e10 }, macros: { type: `object`, cli: `-m, --macro <def>`, cliDescription: `Define custom macro of the form '\\foo:expansion' (use multiple -m arguments for multiple macros).`, cliDefault: [], cliProcessor: (e10, t8) => (t8.push(e10), t8) }, minRuleThickness: { type: `number`, description: "Specifies a minimum thickness, in ems, for fraction lines, `\\sqrt` top lines, `{array}` vertical lines, `\\hline`, `\\hdashline`, `\\underline`, `\\overline`, and the borders of `\\fbox`, `\\boxed`, and `\\fcolorbox`.", processor: (e10) => Math.max(0, e10), cli: `--min-rule-thickness <size>`, cliProcessor: parseFloat }, colorIsTextColor: { type: `boolean`, description: `Makes \\color behave like LaTeX's 2-argument \\textcolor, instead of LaTeX's one-argument \\color mode change.`, cli: `-b, --color-is-text-color` }, strict: { type: [{ enum: [`warn`, `ignore`, `error`] }, `boolean`, `function`], description: `Turn on strict / LaTeX faithfulness mode, which throws an error if the input uses features that are not supported by LaTeX.`, cli: `-S, --strict`, cliDefault: false }, trust: { type: [`boolean`, `function`], description: `Trust the input, enabling all HTML features such as \\url.`, cli: `-T, --trust` }, maxSize: { type: `number`, default: 1 / 0, description: `If non-zero, all user-specified sizes, e.g. in \\rule{500em}{500em}, will be capped to maxSize ems. Otherwise, elements and spaces can be arbitrarily large`, processor: (e10) => Math.max(0, e10), cli: `-s, --max-size <n>`, cliProcessor: parseInt }, maxExpand: { type: `number`, default: 1e3, description: `Limit the number of macro expansions to the specified number, to prevent e.g. infinite macro loops. If set to Infinity, the macro expander will try to fully expand as in LaTeX.`, processor: (e10) => Math.max(0, e10), cli: `-e, --max-expand <n>`, cliProcessor: (e10) => e10 === `Infinity` ? 1 / 0 : parseInt(e10) }, globalGroup: { type: `boolean`, cli: false } };
  function d2(e10) {
    if (typeof e10 != `string`) return e10.enum[0];
    switch (e10) {
      case `boolean`:
        return false;
      case `string`:
        return ``;
      case `number`:
        return 0;
      case `object`:
        return {};
      default:
        throw Error(`Unexpected schema type; settings must declare an explicit default.`);
    }
  }
  function f2(e10) {
    return e10.default === void 0 ? d2(Array.isArray(e10.type) ? e10.type[0] : e10.type) : e10.default;
  }
  function p2(e10, t8, n4, r5) {
    var i5 = n4[t8];
    e10[t8] = i5 === void 0 ? f2(r5) : r5.processor ? r5.processor(i5) : i5;
  }
  var m2 = class {
    constructor(e10) {
      e10 === void 0 && (e10 = {}), this.displayMode = void 0, this.output = void 0, this.leqno = void 0, this.fleqn = void 0, this.throwOnError = void 0, this.errorColor = void 0, this.macros = void 0, this.minRuleThickness = void 0, this.colorIsTextColor = void 0, this.strict = void 0, this.trust = void 0, this.maxSize = void 0, this.maxExpand = void 0, this.globalGroup = void 0, e10 ||= {};
      for (var t8 of Object.keys(u2)) {
        var n4 = u2[t8];
        n4 && p2(this, t8, e10, n4);
      }
    }
    reportNonstrict(t8, n4, r5) {
      var i5 = this.strict;
      if (typeof i5 == `function` && (i5 = i5(t8, n4, r5)), !(!i5 || i5 === `ignore`)) {
        if (i5 === true || i5 === `error`) throw new e2(`LaTeX-incompatible input and strict mode is set to 'error': ` + (n4 + ` [` + t8 + `]`), r5);
        i5 === `warn` ? typeof console < `u` && console.warn(`LaTeX-incompatible input and strict mode is set to 'warn': ` + (n4 + ` [` + t8 + `]`)) : typeof console < `u` && console.warn(`LaTeX-incompatible input and strict mode is set to ` + (`unrecognized '` + i5 + `': ` + n4 + ` [` + t8 + `]`));
      }
    }
    useStrictBehavior(e10, t8, n4) {
      var r5 = this.strict;
      if (typeof r5 == `function`) try {
        r5 = r5(e10, t8, n4);
      } catch {
        r5 = `error`;
      }
      return !r5 || r5 === `ignore` ? false : r5 === true || r5 === `error` ? true : r5 === `warn` ? (typeof console < `u` && console.warn(`LaTeX-incompatible input and strict mode is set to 'warn': ` + (t8 + ` [` + e10 + `]`)), false) : (typeof console < `u` && console.warn(`LaTeX-incompatible input and strict mode is set to ` + (`unrecognized '` + r5 + `': ` + t8 + ` [` + e10 + `]`)), false);
    }
    isTrusted(e10) {
      if (`url` in e10 && e10.url && !e10.protocol) {
        var t8 = l2(e10.url);
        if (t8 == null) return false;
        e10.protocol = t8;
      }
      return !!(typeof this.trust == `function` ? this.trust(e10) : this.trust);
    }
  };
  var h = class {
    constructor(e10, t8, n4) {
      this.id = void 0, this.size = void 0, this.cramped = void 0, this.id = e10, this.size = t8, this.cramped = n4;
    }
    sup() {
      return w2[ee2[this.id]];
    }
    sub() {
      return w2[T2[this.id]];
    }
    fracNum() {
      return w2[te2[this.id]];
    }
    fracDen() {
      return w2[ne2[this.id]];
    }
    cramp() {
      return w2[re2[this.id]];
    }
    text() {
      return w2[ie2[this.id]];
    }
    isTight() {
      return this.size >= 2;
    }
  };
  var g2 = 0;
  var _2 = 1;
  var v2 = 2;
  var y3 = 3;
  var b2 = 4;
  var x2 = 5;
  var S2 = 6;
  var C2 = 7;
  var w2 = [new h(g2, 0, false), new h(_2, 0, true), new h(v2, 1, false), new h(y3, 1, true), new h(b2, 2, false), new h(x2, 2, true), new h(S2, 3, false), new h(C2, 3, true)];
  var ee2 = [b2, x2, b2, x2, S2, C2, S2, C2];
  var T2 = [x2, x2, x2, x2, C2, C2, C2, C2];
  var te2 = [v2, y3, b2, x2, S2, C2, S2, C2];
  var ne2 = [y3, y3, x2, x2, C2, C2, C2, C2];
  var re2 = [_2, _2, y3, y3, x2, x2, C2, C2];
  var ie2 = [g2, _2, v2, y3, v2, y3, v2, y3];
  var E2 = { DISPLAY: w2[g2], TEXT: w2[v2], SCRIPT: w2[b2], SCRIPTSCRIPT: w2[S2] };
  var ae2 = [{ name: `latin`, blocks: [[256, 591], [768, 879]] }, { name: `cyrillic`, blocks: [[1024, 1279]] }, { name: `armenian`, blocks: [[1328, 1423]] }, { name: `brahmic`, blocks: [[2304, 4255]] }, { name: `georgian`, blocks: [[4256, 4351]] }, { name: `cjk`, blocks: [[12288, 12543], [19968, 40879], [65280, 65376]] }, { name: `hangul`, blocks: [[44032, 55215]] }];
  function oe2(e10) {
    for (var t8 = 0; t8 < ae2.length; t8++) for (var n4 = ae2[t8], r5 = 0; r5 < n4.blocks.length; r5++) {
      var i5 = n4.blocks[r5];
      if (e10 >= i5[0] && e10 <= i5[1]) return n4.name;
    }
    return null;
  }
  var se2 = [];
  ae2.forEach((e10) => e10.blocks.forEach((e11) => se2.push(...e11)));
  function ce2(e10) {
    for (var t8 = 0; t8 < se2.length; t8 += 2) if (e10 >= se2[t8] && e10 <= se2[t8 + 1]) return true;
    return false;
  }
  var D2 = (e10) => e10 + ` ` + e10;
  var le2 = 80;
  var ue2 = function(e10, t8) {
    return `M95,` + (622 + e10 + t8) + `
c-2.7,0,-7.17,-2.7,-13.5,-8c-5.8,-5.3,-9.5,-10,-9.5,-14
c0,-2,0.3,-3.3,1,-4c1.3,-2.7,23.83,-20.7,67.5,-54
c44.2,-33.3,65.8,-50.3,66.5,-51c1.3,-1.3,3,-2,5,-2c4.7,0,8.7,3.3,12,10
s173,378,173,378c0.7,0,35.3,-71,104,-213c68.7,-142,137.5,-285,206.5,-429
c69,-144,104.5,-217.7,106.5,-221
l` + e10 / 2.075 + ` -` + e10 + `
c5.3,-9.3,12,-14,20,-14
H400000v` + (40 + e10) + `H845.2724
s-225.272,467,-225.272,467s-235,486,-235,486c-2.7,4.7,-9,7,-19,7
c-6,0,-10,-1,-12,-3s-194,-422,-194,-422s-65,47,-65,47z
M` + (834 + e10) + ` ` + t8 + `h400000v` + (40 + e10) + `h-400000z`;
  };
  var de2 = function(e10, t8) {
    return `M263,` + (601 + e10 + t8) + `c0.7,0,18,39.7,52,119
c34,79.3,68.167,158.7,102.5,238c34.3,79.3,51.8,119.3,52.5,120
c340,-704.7,510.7,-1060.3,512,-1067
l` + e10 / 2.084 + ` -` + e10 + `
c4.7,-7.3,11,-11,19,-11
H40000v` + (40 + e10) + `H1012.3
s-271.3,567,-271.3,567c-38.7,80.7,-84,175,-136,283c-52,108,-89.167,185.3,-111.5,232
c-22.3,46.7,-33.8,70.3,-34.5,71c-4.7,4.7,-12.3,7,-23,7s-12,-1,-12,-1
s-109,-253,-109,-253c-72.7,-168,-109.3,-252,-110,-252c-10.7,8,-22,16.7,-34,26
c-22,17.3,-33.3,26,-34,26s-26,-26,-26,-26s76,-59,76,-59s76,-60,76,-60z
M` + (1001 + e10) + ` ` + t8 + `h400000v` + (40 + e10) + `h-400000z`;
  };
  var fe2 = function(e10, t8) {
    return `M983 ` + (10 + e10 + t8) + `
l` + e10 / 3.13 + ` -` + e10 + `
c4,-6.7,10,-10,18,-10 H400000v` + (40 + e10) + `
H1013.1s-83.4,268,-264.1,840c-180.7,572,-277,876.3,-289,913c-4.7,4.7,-12.7,7,-24,7
s-12,0,-12,0c-1.3,-3.3,-3.7,-11.7,-7,-25c-35.3,-125.3,-106.7,-373.3,-214,-744
c-10,12,-21,25,-33,39s-32,39,-32,39c-6,-5.3,-15,-14,-27,-26s25,-30,25,-30
c26.7,-32.7,52,-63,76,-91s52,-60,52,-60s208,722,208,722
c56,-175.3,126.3,-397.3,211,-666c84.7,-268.7,153.8,-488.2,207.5,-658.5
c53.7,-170.3,84.5,-266.8,92.5,-289.5z
M` + (1001 + e10) + ` ` + t8 + `h400000v` + (40 + e10) + `h-400000z`;
  };
  var pe2 = function(e10, t8) {
    return `M424,` + (2398 + e10 + t8) + `
c-1.3,-0.7,-38.5,-172,-111.5,-514c-73,-342,-109.8,-513.3,-110.5,-514
c0,-2,-10.7,14.3,-32,49c-4.7,7.3,-9.8,15.7,-15.5,25c-5.7,9.3,-9.8,16,-12.5,20
s-5,7,-5,7c-4,-3.3,-8.3,-7.7,-13,-13s-13,-13,-13,-13s76,-122,76,-122s77,-121,77,-121
s209,968,209,968c0,-2,84.7,-361.7,254,-1079c169.3,-717.3,254.7,-1077.7,256,-1081
l` + e10 / 4.223 + ` -` + e10 + `c4,-6.7,10,-10,18,-10 H400000
v` + (40 + e10) + `H1014.6
s-87.3,378.7,-272.6,1166c-185.3,787.3,-279.3,1182.3,-282,1185
c-2,6,-10,9,-24,9
c-8,0,-12,-0.7,-12,-2z M` + (1001 + e10) + ` ` + t8 + `
h400000v` + (40 + e10) + `h-400000z`;
  };
  var me2 = function(e10, t8) {
    return `M473,` + (2713 + e10 + t8) + `
c339.3,-1799.3,509.3,-2700,510,-2702 l` + e10 / 5.298 + ` -` + e10 + `
c3.3,-7.3,9.3,-11,18,-11 H400000v` + (40 + e10) + `H1017.7
s-90.5,478,-276.2,1466c-185.7,988,-279.5,1483,-281.5,1485c-2,6,-10,9,-24,9
c-8,0,-12,-0.7,-12,-2c0,-1.3,-5.3,-32,-16,-92c-50.7,-293.3,-119.7,-693.3,-207,-1200
c0,-1.3,-5.3,8.7,-16,30c-10.7,21.3,-21.3,42.7,-32,64s-16,33,-16,33s-26,-26,-26,-26
s76,-153,76,-153s77,-151,77,-151c0.7,0.7,35.7,202,105,604c67.3,400.7,102,602.7,104,
606zM` + (1001 + e10) + ` ` + t8 + `h400000v` + (40 + e10) + `H1017.7z`;
  };
  var he2 = function(e10) {
    var t8 = e10 / 2;
    return `M400000 ` + e10 + ` H0 L` + t8 + ` 0 l65 45 L145 ` + (e10 - 80) + ` H400000z`;
  };
  var ge2 = function(e10, t8, n4) {
    var r5 = n4 - 54 - t8 - e10;
    return `M702 ` + (e10 + t8) + `H400000` + (40 + e10) + `
H742v` + r5 + `l-4 4-4 4c-.667.7 -2 1.5-4 2.5s-4.167 1.833-6.5 2.5-5.5 1-9.5 1
h-12l-28-84c-16.667-52-96.667 -294.333-240-727l-212 -643 -85 170
c-4-3.333-8.333-7.667-13 -13l-13-13l77-155 77-156c66 199.333 139 419.667
219 661 l218 661zM702 ` + t8 + `H400000v` + (40 + e10) + `H742z`;
  };
  var _e2 = function(e10, t8, n4) {
    t8 = 1e3 * t8;
    var r5 = ``;
    switch (e10) {
      case `sqrtMain`:
        r5 = ue2(t8, le2);
        break;
      case `sqrtSize1`:
        r5 = de2(t8, le2);
        break;
      case `sqrtSize2`:
        r5 = fe2(t8, le2);
        break;
      case `sqrtSize3`:
        r5 = pe2(t8, le2);
        break;
      case `sqrtSize4`:
        r5 = me2(t8, le2);
        break;
      case `sqrtTall`:
        r5 = ge2(t8, le2, n4);
    }
    return r5;
  };
  var ve2 = function(e10, t8) {
    switch (e10) {
      case `\u239C`:
        return D2(`M291 0 H417 V` + t8 + ` H291z`);
      case `\u2223`:
        return D2(`M145 0 H188 V` + t8 + ` H145z`);
      case `\u2225`:
        return D2(`M145 0 H188 V` + t8 + ` H145z`) + D2(`M367 0 H410 V` + t8 + ` H367z`);
      case `\u239F`:
        return D2(`M457 0 H583 V` + t8 + ` H457z`);
      case `\u23A2`:
        return D2(`M319 0 H403 V` + t8 + ` H319z`);
      case `\u23A5`:
        return D2(`M263 0 H347 V` + t8 + ` H263z`);
      case `\u23AA`:
        return D2(`M384 0 H504 V` + t8 + ` H384z`);
      case `\u23D0`:
        return D2(`M312 0 H355 V` + t8 + ` H312z`);
      case `\u2016`:
        return D2(`M257 0 H300 V` + t8 + ` H257z`) + D2(`M478 0 H521 V` + t8 + ` H478z`);
      default:
        return ``;
    }
  };
  var ye2 = { doubleleftarrow: `M262 157
l10-10c34-36 62.7-77 86-123 3.3-8 5-13.3 5-16 0-5.3-6.7-8-20-8-7.3
 0-12.2.5-14.5 1.5-2.3 1-4.8 4.5-7.5 10.5-49.3 97.3-121.7 169.3-217 216-28
 14-57.3 25-88 33-6.7 2-11 3.8-13 5.5-2 1.7-3 4.2-3 7.5s1 5.8 3 7.5
c2 1.7 6.3 3.5 13 5.5 68 17.3 128.2 47.8 180.5 91.5 52.3 43.7 93.8 96.2 124.5
 157.5 9.3 8 15.3 12.3 18 13h6c12-.7 18-4 18-10 0-2-1.7-7-5-15-23.3-46-52-87
-86-123l-10-10h399738v-40H218c328 0 0 0 0 0l-10-8c-26.7-20-65.7-43-117-69 2.7
-2 6-3.7 10-5 36.7-16 72.3-37.3 107-64l10-8h399782v-40z
m8 0v40h399730v-40zm0 194v40h399730v-40z`, doublerightarrow: `M399738 392l
-10 10c-34 36-62.7 77-86 123-3.3 8-5 13.3-5 16 0 5.3 6.7 8 20 8 7.3 0 12.2-.5
 14.5-1.5 2.3-1 4.8-4.5 7.5-10.5 49.3-97.3 121.7-169.3 217-216 28-14 57.3-25 88
-33 6.7-2 11-3.8 13-5.5 2-1.7 3-4.2 3-7.5s-1-5.8-3-7.5c-2-1.7-6.3-3.5-13-5.5-68
-17.3-128.2-47.8-180.5-91.5-52.3-43.7-93.8-96.2-124.5-157.5-9.3-8-15.3-12.3-18
-13h-6c-12 .7-18 4-18 10 0 2 1.7 7 5 15 23.3 46 52 87 86 123l10 10H0v40h399782
c-328 0 0 0 0 0l10 8c26.7 20 65.7 43 117 69-2.7 2-6 3.7-10 5-36.7 16-72.3 37.3
-107 64l-10 8H0v40zM0 157v40h399730v-40zm0 194v40h399730v-40z`, leftarrow: `M400000 241H110l3-3c68.7-52.7 113.7-120
 135-202 4-14.7 6-23 6-25 0-7.3-7-11-21-11-8 0-13.2.8-15.5 2.5-2.3 1.7-4.2 5.8
-5.5 12.5-1.3 4.7-2.7 10.3-4 17-12 48.7-34.8 92-68.5 130S65.3 228.3 18 247
c-10 4-16 7.7-18 11 0 8.7 6 14.3 18 17 47.3 18.7 87.8 47 121.5 85S196 441.3 208
 490c.7 2 1.3 5 2 9s1.2 6.7 1.5 8c.3 1.3 1 3.3 2 6s2.2 4.5 3.5 5.5c1.3 1 3.3
 1.8 6 2.5s6 1 10 1c14 0 21-3.7 21-11 0-2-2-10.3-6-25-20-79.3-65-146.7-135-202
 l-3-3h399890zM100 241v40h399900v-40z`, leftbrace: `M6 548l-6-6v-35l6-11c56-104 135.3-181.3 238-232 57.3-28.7 117
-45 179-50h399577v120H403c-43.3 7-81 15-113 26-100.7 33-179.7 91-237 174-2.7
 5-6 9-10 13-.7 1-7.3 1-20 1H6z`, leftbraceunder: `M0 6l6-6h17c12.688 0 19.313.3 20 1 4 4 7.313 8.3 10 13
 35.313 51.3 80.813 93.8 136.5 127.5 55.688 33.7 117.188 55.8 184.5 66.5.688
 0 2 .3 4 1 18.688 2.7 76 4.3 172 5h399450v120H429l-6-1c-124.688-8-235-61.7
-331-161C60.687 138.7 32.312 99.3 7 54L0 41V6z`, leftgroup: `M400000 80
H435C64 80 168.3 229.4 21 260c-5.9 1.2-18 0-18 0-2 0-3-1-3-3v-38C76 61 257 0
 435 0h399565z`, leftgroupunder: `M400000 262
H435C64 262 168.3 112.6 21 82c-5.9-1.2-18 0-18 0-2 0-3 1-3 3v38c76 158 257 219
 435 219h399565z`, leftharpoon: `M0 267c.7 5.3 3 10 7 14h399993v-40H93c3.3
-3.3 10.2-9.5 20.5-18.5s17.8-15.8 22.5-20.5c50.7-52 88-110.3 112-175 4-11.3 5
-18.3 3-21-1.3-4-7.3-6-18-6-8 0-13 .7-15 2s-4.7 6.7-8 16c-42 98.7-107.3 174.7
-196 228-6.7 4.7-10.7 8-12 10-1.3 2-2 5.7-2 11zm100-26v40h399900v-40z`, leftharpoonplus: `M0 267c.7 5.3 3 10 7 14h399993v-40H93c3.3-3.3 10.2-9.5
 20.5-18.5s17.8-15.8 22.5-20.5c50.7-52 88-110.3 112-175 4-11.3 5-18.3 3-21-1.3
-4-7.3-6-18-6-8 0-13 .7-15 2s-4.7 6.7-8 16c-42 98.7-107.3 174.7-196 228-6.7 4.7
-10.7 8-12 10-1.3 2-2 5.7-2 11zm100-26v40h399900v-40zM0 435v40h400000v-40z
m0 0v40h400000v-40z`, leftharpoondown: `M7 241c-4 4-6.333 8.667-7 14 0 5.333.667 9 2 11s5.333
 5.333 12 10c90.667 54 156 130 196 228 3.333 10.667 6.333 16.333 9 17 2 .667 5
 1 9 1h5c10.667 0 16.667-2 18-6 2-2.667 1-9.667-3-21-32-87.333-82.667-157.667
-152-211l-3-3h399907v-40zM93 281 H400000 v-40L7 241z`, leftharpoondownplus: `M7 435c-4 4-6.3 8.7-7 14 0 5.3.7 9 2 11s5.3 5.3 12
 10c90.7 54 156 130 196 228 3.3 10.7 6.3 16.3 9 17 2 .7 5 1 9 1h5c10.7 0 16.7
-2 18-6 2-2.7 1-9.7-3-21-32-87.3-82.7-157.7-152-211l-3-3h399907v-40H7zm93 0
v40h399900v-40zM0 241v40h399900v-40zm0 0v40h399900v-40z`, lefthook: `M400000 281 H103s-33-11.2-61-33.5S0 197.3 0 164s14.2-61.2 42.5
-83.5C70.8 58.2 104 47 142 47 c16.7 0 25 6.7 25 20 0 12-8.7 18.7-26 20-40 3.3
-68.7 15.7-86 37-10 12-15 25.3-15 40 0 22.7 9.8 40.7 29.5 54 19.7 13.3 43.5 21
 71.5 23h399859zM103 281v-40h399897v40z`, leftlinesegment: D2(`M40 281 V428 H0 V94 H40 V241 H400000 v40z`), leftbracketunder: D2(`M0 0 h120 V290 H399995 v120 H0z`), leftbracketover: D2(`M0 440 h120 V150 H399995 v-120 H0z`), leftmapsto: D2(`M40 281 V448H0V74H40V241H400000v40z`), leftToFrom: `M0 147h400000v40H0zm0 214c68 40 115.7 95.7 143 167h22c15.3 0 23
-.3 23-1 0-1.3-5.3-13.7-16-37-18-35.3-41.3-69-70-101l-7-8h399905v-40H95l7-8
c28.7-32 52-65.7 70-101 10.7-23.3 16-35.7 16-37 0-.7-7.7-1-23-1h-22C115.7 265.3
 68 321 0 361zm0-174v-40h399900v40zm100 154v40h399900v-40z`, longequal: D2(`M0 50 h400000 v40H0z m0 194h40000v40H0z`), midbrace: `M200428 334
c-100.7-8.3-195.3-44-280-108-55.3-42-101.7-93-139-153l-9-14c-2.7 4-5.7 8.7-9 14
-53.3 86.7-123.7 153-211 199-66.7 36-137.3 56.3-212 62H0V214h199568c178.3-11.7
 311.7-78.3 403-201 6-8 9.7-12 11-12 .7-.7 6.7-1 18-1s17.3.3 18 1c1.3 0 5 4 11
 12 44.7 59.3 101.3 106.3 170 141s145.3 54.3 229 60h199572v120z`, midbraceunder: `M199572 214
c100.7 8.3 195.3 44 280 108 55.3 42 101.7 93 139 153l9 14c2.7-4 5.7-8.7 9-14
 53.3-86.7 123.7-153 211-199 66.7-36 137.3-56.3 212-62h199568v120H200432c-178.3
 11.7-311.7 78.3-403 201-6 8-9.7 12-11 12-.7.7-6.7 1-18 1s-17.3-.3-18-1c-1.3 0
-5-4-11-12-44.7-59.3-101.3-106.3-170-141s-145.3-54.3-229-60H0V214z`, oiintSize1: `M512.6 71.6c272.6 0 320.3 106.8 320.3 178.2 0 70.8-47.7 177.6
-320.3 177.6S193.1 320.6 193.1 249.8c0-71.4 46.9-178.2 319.5-178.2z
m368.1 178.2c0-86.4-60.9-215.4-368.1-215.4-306.4 0-367.3 129-367.3 215.4 0 85.8
60.9 214.8 367.3 214.8 307.2 0 368.1-129 368.1-214.8z`, oiintSize2: `M757.8 100.1c384.7 0 451.1 137.6 451.1 230 0 91.3-66.4 228.8
-451.1 228.8-386.3 0-452.7-137.5-452.7-228.8 0-92.4 66.4-230 452.7-230z
m502.4 230c0-111.2-82.4-277.2-502.4-277.2s-504 166-504 277.2
c0 110 84 276 504 276s502.4-166 502.4-276z`, oiiintSize1: `M681.4 71.6c408.9 0 480.5 106.8 480.5 178.2 0 70.8-71.6 177.6
-480.5 177.6S202.1 320.6 202.1 249.8c0-71.4 70.5-178.2 479.3-178.2z
m525.8 178.2c0-86.4-86.8-215.4-525.7-215.4-437.9 0-524.7 129-524.7 215.4 0
85.8 86.8 214.8 524.7 214.8 438.9 0 525.7-129 525.7-214.8z`, oiiintSize2: `M1021.2 53c603.6 0 707.8 165.8 707.8 277.2 0 110-104.2 275.8
-707.8 275.8-606 0-710.2-165.8-710.2-275.8C311 218.8 415.2 53 1021.2 53z
m770.4 277.1c0-131.2-126.4-327.6-770.5-327.6S248.4 198.9 248.4 330.1
c0 130 128.8 326.4 772.7 326.4s770.5-196.4 770.5-326.4z`, rightarrow: `M0 241v40h399891c-47.3 35.3-84 78-110 128
-16.7 32-27.7 63.7-33 95 0 1.3-.2 2.7-.5 4-.3 1.3-.5 2.3-.5 3 0 7.3 6.7 11 20
 11 8 0 13.2-.8 15.5-2.5 2.3-1.7 4.2-5.5 5.5-11.5 2-13.3 5.7-27 11-41 14.7-44.7
 39-84.5 73-119.5s73.7-60.2 119-75.5c6-2 9-5.7 9-11s-3-9-9-11c-45.3-15.3-85
-40.5-119-75.5s-58.3-74.8-73-119.5c-4.7-14-8.3-27.3-11-40-1.3-6.7-3.2-10.8-5.5
-12.5-2.3-1.7-7.5-2.5-15.5-2.5-14 0-21 3.7-21 11 0 2 2 10.3 6 25 20.7 83.3 67
 151.7 139 205zm0 0v40h399900v-40z`, rightbrace: `M400000 542l
-6 6h-17c-12.7 0-19.3-.3-20-1-4-4-7.3-8.3-10-13-35.3-51.3-80.8-93.8-136.5-127.5
s-117.2-55.8-184.5-66.5c-.7 0-2-.3-4-1-18.7-2.7-76-4.3-172-5H0V214h399571l6 1
c124.7 8 235 61.7 331 161 31.3 33.3 59.7 72.7 85 118l7 13v35z`, rightbraceunder: `M399994 0l6 6v35l-6 11c-56 104-135.3 181.3-238 232-57.3
 28.7-117 45-179 50H-300V214h399897c43.3-7 81-15 113-26 100.7-33 179.7-91 237
-174 2.7-5 6-9 10-13 .7-1 7.3-1 20-1h17z`, rightgroup: `M0 80h399565c371 0 266.7 149.4 414 180 5.9 1.2 18 0 18 0 2 0
 3-1 3-3v-38c-76-158-257-219-435-219H0z`, rightgroupunder: `M0 262h399565c371 0 266.7-149.4 414-180 5.9-1.2 18 0 18
 0 2 0 3 1 3 3v38c-76 158-257 219-435 219H0z`, rightharpoon: `M0 241v40h399993c4.7-4.7 7-9.3 7-14 0-9.3
-3.7-15.3-11-18-92.7-56.7-159-133.7-199-231-3.3-9.3-6-14.7-8-16-2-1.3-7-2-15-2
-10.7 0-16.7 2-18 6-2 2.7-1 9.7 3 21 15.3 42 36.7 81.8 64 119.5 27.3 37.7 58
 69.2 92 94.5zm0 0v40h399900v-40z`, rightharpoonplus: `M0 241v40h399993c4.7-4.7 7-9.3 7-14 0-9.3-3.7-15.3-11
-18-92.7-56.7-159-133.7-199-231-3.3-9.3-6-14.7-8-16-2-1.3-7-2-15-2-10.7 0-16.7
 2-18 6-2 2.7-1 9.7 3 21 15.3 42 36.7 81.8 64 119.5 27.3 37.7 58 69.2 92 94.5z
m0 0v40h399900v-40z m100 194v40h399900v-40zm0 0v40h399900v-40z`, rightharpoondown: `M399747 511c0 7.3 6.7 11 20 11 8 0 13-.8 15-2.5s4.7-6.8
 8-15.5c40-94 99.3-166.3 178-217 13.3-8 20.3-12.3 21-13 5.3-3.3 8.5-5.8 9.5
-7.5 1-1.7 1.5-5.2 1.5-10.5s-2.3-10.3-7-15H0v40h399908c-34 25.3-64.7 57-92 95
-27.3 38-48.7 77.7-64 119-3.3 8.7-5 14-5 16zM0 241v40h399900v-40z`, rightharpoondownplus: `M399747 705c0 7.3 6.7 11 20 11 8 0 13-.8
 15-2.5s4.7-6.8 8-15.5c40-94 99.3-166.3 178-217 13.3-8 20.3-12.3 21-13 5.3-3.3
 8.5-5.8 9.5-7.5 1-1.7 1.5-5.2 1.5-10.5s-2.3-10.3-7-15H0v40h399908c-34 25.3
-64.7 57-92 95-27.3 38-48.7 77.7-64 119-3.3 8.7-5 14-5 16zM0 435v40h399900v-40z
m0-194v40h400000v-40zm0 0v40h400000v-40z`, righthook: `M399859 241c-764 0 0 0 0 0 40-3.3 68.7-15.7 86-37 10-12 15-25.3
 15-40 0-22.7-9.8-40.7-29.5-54-19.7-13.3-43.5-21-71.5-23-17.3-1.3-26-8-26-20 0
-13.3 8.7-20 26-20 38 0 71 11.2 99 33.5 0 0 7 5.6 21 16.7 14 11.2 21 33.5 21
 66.8s-14 61.2-42 83.5c-28 22.3-61 33.5-99 33.5L0 241z M0 281v-40h399859v40z`, rightlinesegment: D2(`M399960 241 V94 h40 V428 h-40 V281 H0 v-40z`), rightbracketunder: D2(`M399995 0 h-120 V290 H0 v120 H400000z`), rightbracketover: D2(`M399995 440 h-120 V150 H0 v-120 H399995z`), rightToFrom: `M400000 167c-70.7-42-118-97.7-142-167h-23c-15.3 0-23 .3-23
 1 0 1.3 5.3 13.7 16 37 18 35.3 41.3 69 70 101l7 8H0v40h399905l-7 8c-28.7 32
-52 65.7-70 101-10.7 23.3-16 35.7-16 37 0 .7 7.7 1 23 1h23c24-69.3 71.3-125 142
-167z M100 147v40h399900v-40zM0 341v40h399900v-40z`, twoheadleftarrow: `M0 167c68 40
 115.7 95.7 143 167h22c15.3 0 23-.3 23-1 0-1.3-5.3-13.7-16-37-18-35.3-41.3-69
-70-101l-7-8h125l9 7c50.7 39.3 85 86 103 140h46c0-4.7-6.3-18.7-19-42-18-35.3
-40-67.3-66-96l-9-9h399716v-40H284l9-9c26-28.7 48-60.7 66-96 12.7-23.333 19
-37.333 19-42h-46c-18 54-52.3 100.7-103 140l-9 7H95l7-8c28.7-32 52-65.7 70-101
 10.7-23.333 16-35.7 16-37 0-.7-7.7-1-23-1h-22C115.7 71.3 68 127 0 167z`, twoheadrightarrow: `M400000 167
c-68-40-115.7-95.7-143-167h-22c-15.3 0-23 .3-23 1 0 1.3 5.3 13.7 16 37 18 35.3
 41.3 69 70 101l7 8h-125l-9-7c-50.7-39.3-85-86-103-140h-46c0 4.7 6.3 18.7 19 42
 18 35.3 40 67.3 66 96l9 9H0v40h399716l-9 9c-26 28.7-48 60.7-66 96-12.7 23.333
-19 37.333-19 42h46c18-54 52.3-100.7 103-140l9-7h125l-7 8c-28.7 32-52 65.7-70
 101-10.7 23.333-16 35.7-16 37 0 .7 7.7 1 23 1h22c27.3-71.3 75-127 143-167z`, tilde1: `M200 55.538c-77 0-168 73.953-177 73.953-3 0-7
-2.175-9-5.437L2 97c-1-2-2-4-2-6 0-4 2-7 5-9l20-12C116 12 171 0 207 0c86 0
 114 68 191 68 78 0 168-68 177-68 4 0 7 2 9 5l12 19c1 2.175 2 4.35 2 6.525 0
 4.35-2 7.613-5 9.788l-19 13.05c-92 63.077-116.937 75.308-183 76.128
-68.267.847-113-73.952-191-73.952z`, tilde2: `M344 55.266c-142 0-300.638 81.316-311.5 86.418
-8.01 3.762-22.5 10.91-23.5 5.562L1 120c-1-2-1-3-1-4 0-5 3-9 8-10l18.4-9C160.9
 31.9 283 0 358 0c148 0 188 122 331 122s314-97 326-97c4 0 8 2 10 7l7 21.114
c1 2.14 1 3.21 1 4.28 0 5.347-3 9.626-7 10.696l-22.3 12.622C852.6 158.372 751
 181.476 676 181.476c-149 0-189-126.21-332-126.21z`, tilde3: `M786 59C457 59 32 175.242 13 175.242c-6 0-10-3.457
-11-10.37L.15 138c-1-7 3-12 10-13l19.2-6.4C378.4 40.7 634.3 0 804.3 0c337 0
 411.8 157 746.8 157 328 0 754-112 773-112 5 0 10 3 11 9l1 14.075c1 8.066-.697
 16.595-6.697 17.492l-21.052 7.31c-367.9 98.146-609.15 122.696-778.15 122.696
 -338 0-409-156.573-744-156.573z`, tilde4: `M786 58C457 58 32 177.487 13 177.487c-6 0-10-3.345
-11-10.035L.15 143c-1-7 3-12 10-13l22-6.7C381.2 35 637.15 0 807.15 0c337 0 409
 177 744 177 328 0 754-127 773-127 5 0 10 3 11 9l1 14.794c1 7.805-3 13.38-9
 14.495l-20.7 5.574c-366.85 99.79-607.3 139.372-776.3 139.372-338 0-409
 -175.236-744-175.236z`, vec: `M377 20c0-5.333 1.833-10 5.5-14S391 0 397 0c4.667 0 8.667 1.667 12 5
3.333 2.667 6.667 9 10 19 6.667 24.667 20.333 43.667 41 57 7.333 4.667 11
10.667 11 18 0 6-1 10-3 12s-6.667 5-14 9c-28.667 14.667-53.667 35.667-75 63
-1.333 1.333-3.167 3.5-5.5 6.5s-4 4.833-5 5.5c-1 .667-2.5 1.333-4.5 2s-4.333 1
-7 1c-4.667 0-9.167-1.833-13.5-5.5S337 184 337 178c0-12.667 15.667-32.333 47-59
H213l-171-1c-8.667-6-13-12.333-13-19 0-4.667 4.333-11.333 13-20h359
c-16-25.333-24-45-24-59z`, widehat1: `M529 0h5l519 115c5 1 9 5 9 10 0 1-1 2-1 3l-4 22
c-1 5-5 9-11 9h-2L532 67 19 159h-2c-5 0-9-4-11-9l-5-22c-1-6 2-12 8-13z`, widehat2: `M1181 0h2l1171 176c6 0 10 5 10 11l-2 23c-1 6-5 10
-11 10h-1L1182 67 15 220h-1c-6 0-10-4-11-10l-2-23c-1-6 4-11 10-11z`, widehat3: `M1181 0h2l1171 236c6 0 10 5 10 11l-2 23c-1 6-5 10
-11 10h-1L1182 67 15 280h-1c-6 0-10-4-11-10l-2-23c-1-6 4-11 10-11z`, widehat4: `M1181 0h2l1171 296c6 0 10 5 10 11l-2 23c-1 6-5 10
-11 10h-1L1182 67 15 340h-1c-6 0-10-4-11-10l-2-23c-1-6 4-11 10-11z`, widecheck1: `M529,159h5l519,-115c5,-1,9,-5,9,-10c0,-1,-1,-2,-1,-3l-4,-22c-1,
-5,-5,-9,-11,-9h-2l-512,92l-513,-92h-2c-5,0,-9,4,-11,9l-5,22c-1,6,2,12,8,13z`, widecheck2: `M1181,220h2l1171,-176c6,0,10,-5,10,-11l-2,-23c-1,-6,-5,-10,
-11,-10h-1l-1168,153l-1167,-153h-1c-6,0,-10,4,-11,10l-2,23c-1,6,4,11,10,11z`, widecheck3: `M1181,280h2l1171,-236c6,0,10,-5,10,-11l-2,-23c-1,-6,-5,-10,
-11,-10h-1l-1168,213l-1167,-213h-1c-6,0,-10,4,-11,10l-2,23c-1,6,4,11,10,11z`, widecheck4: `M1181,340h2l1171,-296c6,0,10,-5,10,-11l-2,-23c-1,-6,-5,-10,
-11,-10h-1l-1168,273l-1167,-273h-1c-6,0,-10,4,-11,10l-2,23c-1,6,4,11,10,11z`, baraboveleftarrow: `M400000 620h-399890l3 -3c68.7 -52.7 113.7 -120 135 -202
c4 -14.7 6 -23 6 -25c0 -7.3 -7 -11 -21 -11c-8 0 -13.2 0.8 -15.5 2.5
c-2.3 1.7 -4.2 5.8 -5.5 12.5c-1.3 4.7 -2.7 10.3 -4 17c-12 48.7 -34.8 92 -68.5 130
s-74.2 66.3 -121.5 85c-10 4 -16 7.7 -18 11c0 8.7 6 14.3 18 17c47.3 18.7 87.8 47
121.5 85s56.5 81.3 68.5 130c0.7 2 1.3 5 2 9s1.2 6.7 1.5 8c0.3 1.3 1 3.3 2 6
s2.2 4.5 3.5 5.5c1.3 1 3.3 1.8 6 2.5s6 1 10 1c14 0 21 -3.7 21 -11
c0 -2 -2 -10.3 -6 -25c-20 -79.3 -65 -146.7 -135 -202l-3 -3h399890z
M100 620v40h399900v-40z M0 241v40h399900v-40zM0 241v40h399900v-40z`, rightarrowabovebar: `M0 241v40h399891c-47.3 35.3-84 78-110 128-16.7 32
-27.7 63.7-33 95 0 1.3-.2 2.7-.5 4-.3 1.3-.5 2.3-.5 3 0 7.3 6.7 11 20 11 8 0
13.2-.8 15.5-2.5 2.3-1.7 4.2-5.5 5.5-11.5 2-13.3 5.7-27 11-41 14.7-44.7 39
-84.5 73-119.5s73.7-60.2 119-75.5c6-2 9-5.7 9-11s-3-9-9-11c-45.3-15.3-85-40.5
-119-75.5s-58.3-74.8-73-119.5c-4.7-14-8.3-27.3-11-40-1.3-6.7-3.2-10.8-5.5
-12.5-2.3-1.7-7.5-2.5-15.5-2.5-14 0-21 3.7-21 11 0 2 2 10.3 6 25 20.7 83.3 67
151.7 139 205zm96 379h399894v40H0zm0 0h399904v40H0z`, baraboveshortleftharpoon: `M507,435c-4,4,-6.3,8.7,-7,14c0,5.3,0.7,9,2,11
c1.3,2,5.3,5.3,12,10c90.7,54,156,130,196,228c3.3,10.7,6.3,16.3,9,17
c2,0.7,5,1,9,1c0,0,5,0,5,0c10.7,0,16.7,-2,18,-6c2,-2.7,1,-9.7,-3,-21
c-32,-87.3,-82.7,-157.7,-152,-211c0,0,-3,-3,-3,-3l399351,0l0,-40
c-398570,0,-399437,0,-399437,0z M593 435 v40 H399500 v-40z
M0 281 v-40 H399908 v40z M0 281 v-40 H399908 v40z`, rightharpoonaboveshortbar: `M0,241 l0,40c399126,0,399993,0,399993,0
c4.7,-4.7,7,-9.3,7,-14c0,-9.3,-3.7,-15.3,-11,-18c-92.7,-56.7,-159,-133.7,-199,
-231c-3.3,-9.3,-6,-14.7,-8,-16c-2,-1.3,-7,-2,-15,-2c-10.7,0,-16.7,2,-18,6
c-2,2.7,-1,9.7,3,21c15.3,42,36.7,81.8,64,119.5c27.3,37.7,58,69.2,92,94.5z
M0 241 v40 H399908 v-40z M0 475 v-40 H399500 v40z M0 475 v-40 H399500 v40z`, shortbaraboveleftharpoon: `M7,435c-4,4,-6.3,8.7,-7,14c0,5.3,0.7,9,2,11
c1.3,2,5.3,5.3,12,10c90.7,54,156,130,196,228c3.3,10.7,6.3,16.3,9,17c2,0.7,5,1,9,
1c0,0,5,0,5,0c10.7,0,16.7,-2,18,-6c2,-2.7,1,-9.7,-3,-21c-32,-87.3,-82.7,-157.7,
-152,-211c0,0,-3,-3,-3,-3l399907,0l0,-40c-399126,0,-399993,0,-399993,0z
M93 435 v40 H400000 v-40z M500 241 v40 H400000 v-40z M500 241 v40 H400000 v-40z`, shortrightharpoonabovebar: `M53,241l0,40c398570,0,399437,0,399437,0
c4.7,-4.7,7,-9.3,7,-14c0,-9.3,-3.7,-15.3,-11,-18c-92.7,-56.7,-159,-133.7,-199,
-231c-3.3,-9.3,-6,-14.7,-8,-16c-2,-1.3,-7,-2,-15,-2c-10.7,0,-16.7,2,-18,6
c-2,2.7,-1,9.7,3,21c15.3,42,36.7,81.8,64,119.5c27.3,37.7,58,69.2,92,94.5z
M500 241 v40 H399408 v-40z M500 435 v40 H400000 v-40z` };
  var be2 = function(e10, t8) {
    switch (e10) {
      case `lbrack`:
        return `M403 1759 V84 H666 V0 H319 V1759 v` + t8 + ` v1759 v84 h347 v-84
H403z M403 1759 V0 H319 V1759 v` + t8 + ` v1759 v84 h84z`;
      case `rbrack`:
        return `M347 1759 V0 H0 V84 H263 V1759 v` + t8 + ` v1759 H0 v84 H347z
M347 1759 V0 H263 V1759 v` + t8 + ` v1759 h84z`;
      case `vert`:
        return `M145 15 v585 v` + t8 + ` v585 c2.667,10,9.667,15,21,15
c10,0,16.667,-5,20,-15 v-585 v` + -t8 + ` v-585 c-2.667,-10,-9.667,-15,-21,-15
c-10,0,-16.667,5,-20,15z M188 15 H145 v585 v` + t8 + ` v585 h43z`;
      case `doublevert`:
        return `M145 15 v585 v` + t8 + ` v585 c2.667,10,9.667,15,21,15
c10,0,16.667,-5,20,-15 v-585 v` + -t8 + ` v-585 c-2.667,-10,-9.667,-15,-21,-15
c-10,0,-16.667,5,-20,15z M188 15 H145 v585 v` + t8 + ` v585 h43z
M367 15 v585 v` + t8 + ` v585 c2.667,10,9.667,15,21,15
c10,0,16.667,-5,20,-15 v-585 v` + -t8 + ` v-585 c-2.667,-10,-9.667,-15,-21,-15
c-10,0,-16.667,5,-20,15z M410 15 H367 v585 v` + t8 + ` v585 h43z`;
      case `lfloor`:
        return `M319 602 V0 H403 V602 v` + t8 + ` v1715 h263 v84 H319z
MM319 602 V0 H403 V602 v` + t8 + ` v1715 H319z`;
      case `rfloor`:
        return `M319 602 V0 H403 V602 v` + t8 + ` v1799 H0 v-84 H319z
MM319 602 V0 H403 V602 v` + t8 + ` v1715 H319z`;
      case `lceil`:
        return `M403 1759 V84 H666 V0 H319 V1759 v` + t8 + ` v602 h84z
M403 1759 V0 H319 V1759 v` + t8 + ` v602 h84z`;
      case `rceil`:
        return `M347 1759 V0 H0 V84 H263 V1759 v` + t8 + ` v602 h84z
M347 1759 V0 h-84 V1759 v` + t8 + ` v602 h84z`;
      case `lparen`:
        return `M863,9c0,-2,-2,-5,-6,-9c0,0,-17,0,-17,0c-12.7,0,-19.3,0.3,-20,1
c-5.3,5.3,-10.3,11,-15,17c-242.7,294.7,-395.3,682,-458,1162c-21.3,163.3,-33.3,349,
-36,557 l0,` + (t8 + 84) + `c0.2,6,0,26,0,60c2,159.3,10,310.7,24,454c53.3,528,210,
949.7,470,1265c4.7,6,9.7,11.7,15,17c0.7,0.7,7,1,19,1c0,0,18,0,18,0c4,-4,6,-7,6,-9
c0,-2.7,-3.3,-8.7,-10,-18c-135.3,-192.7,-235.5,-414.3,-300.5,-665c-65,-250.7,-102.5,
-544.7,-112.5,-882c-2,-104,-3,-167,-3,-189
l0,-` + (t8 + 92) + `c0,-162.7,5.7,-314,17,-454c20.7,-272,63.7,-513,129,-723c65.3,
-210,155.3,-396.3,270,-559c6.7,-9.3,10,-15.3,10,-18z`;
      case `rparen`:
        return `M76,0c-16.7,0,-25,3,-25,9c0,2,2,6.3,6,13c21.3,28.7,42.3,60.3,
63,95c96.7,156.7,172.8,332.5,228.5,527.5c55.7,195,92.8,416.5,111.5,664.5
c11.3,139.3,17,290.7,17,454c0,28,1.7,43,3.3,45l0,` + (t8 + 9) + `
c-3,4,-3.3,16.7,-3.3,38c0,162,-5.7,313.7,-17,455c-18.7,248,-55.8,469.3,-111.5,664
c-55.7,194.7,-131.8,370.3,-228.5,527c-20.7,34.7,-41.7,66.3,-63,95c-2,3.3,-4,7,-6,11
c0,7.3,5.7,11,17,11c0,0,11,0,11,0c9.3,0,14.3,-0.3,15,-1c5.3,-5.3,10.3,-11,15,-17
c242.7,-294.7,395.3,-681.7,458,-1161c21.3,-164.7,33.3,-350.7,36,-558
l0,-` + (t8 + 144) + `c-2,-159.3,-10,-310.7,-24,-454c-53.3,-528,-210,-949.7,
-470,-1265c-4.7,-6,-9.7,-11.7,-15,-17c-0.7,-0.7,-6.7,-1,-18,-1z`;
      default:
        throw Error(`Unknown stretchy delimiter.`);
    }
  };
  function xe2(e10) {
    return `toText` in e10;
  }
  var Se2 = class {
    constructor(e10) {
      this.children = void 0, this.classes = void 0, this.height = void 0, this.depth = void 0, this.maxFontSize = void 0, this.style = void 0, this.children = e10, this.classes = [], this.height = 0, this.depth = 0, this.maxFontSize = 0, this.style = {};
    }
    hasClass(e10) {
      return this.classes.includes(e10);
    }
    toNode() {
      for (var e10 = document.createDocumentFragment(), t8 = 0; t8 < this.children.length; t8++) e10.appendChild(this.children[t8].toNode());
      return e10;
    }
    toMarkup() {
      for (var e10 = ``, t8 = 0; t8 < this.children.length; t8++) e10 += this.children[t8].toMarkup();
      return e10;
    }
    toText() {
      return this.children.map((e10) => {
        if (xe2(e10)) return e10.toText();
        throw Error(`Expected MathDomNode with toText, got ` + e10.constructor.name);
      }).join(``);
    }
  };
  var Ce2 = { pt: 1, mm: 7227 / 2540, cm: 7227 / 254, in: 72.27, bp: 803 / 800, pc: 12, dd: 1238 / 1157, cc: 14856 / 1157, nd: 685 / 642, nc: 1370 / 107, sp: 1 / 65536, px: 803 / 800 };
  var we2 = { ex: true, em: true, mu: true };
  var Te2 = function(e10) {
    return typeof e10 != `string` && (e10 = e10.unit), e10 in Ce2 || e10 in we2 || e10 === `ex`;
  };
  var O2 = function(t8, n4) {
    var r5;
    if (t8.unit in Ce2) r5 = Ce2[t8.unit] / n4.fontMetrics().ptPerEm / n4.sizeMultiplier;
    else if (t8.unit === `mu`) r5 = n4.fontMetrics().cssEmPerMu;
    else {
      var i5 = n4.style.isTight() ? n4.havingStyle(n4.style.text()) : n4;
      if (t8.unit === `ex`) r5 = i5.fontMetrics().xHeight;
      else if (t8.unit === `em`) r5 = i5.fontMetrics().quad;
      else throw new e2(`Invalid unit: '` + t8.unit + `'`);
      i5 !== n4 && (r5 *= i5.sizeMultiplier / n4.sizeMultiplier);
    }
    return Math.min(t8.number * r5, n4.maxSize);
  };
  var k2 = function(e10) {
    return +e10.toFixed(4) + `em`;
  };
  var Ee = function(e10) {
    return e10.filter((e11) => e11).join(` `);
  };
  var De2 = function(e10) {
    var t8 = ``;
    for (var r5 of Object.keys(e10)) {
      var i5 = e10[r5];
      i5 !== void 0 && (t8 += n2(r5) + `:` + i5 + `;`);
    }
    return t8;
  };
  var Oe = function(e10, t8, n4) {
    if (this.classes = e10 || [], this.attributes = {}, this.height = 0, this.depth = 0, this.maxFontSize = 0, this.style = n4 || {}, t8) {
      t8.style.isTight() && this.classes.push(`mtight`);
      var r5 = t8.getColor();
      r5 && (this.style.color = r5);
    }
  };
  var ke2 = function(e10) {
    var t8 = document.createElement(e10);
    t8.className = Ee(this.classes), Object.assign(t8.style, this.style);
    for (var n4 of Object.keys(this.attributes)) t8.setAttribute(n4, this.attributes[n4]);
    for (var r5 = 0; r5 < this.children.length; r5++) t8.appendChild(this.children[r5].toNode());
    return t8;
  };
  var Ae2 = /[\s"'>/=\x00-\x1f]/;
  var je2 = function(t8) {
    var n4 = `<` + t8;
    this.classes.length && (n4 += ` class="` + a2(Ee(this.classes)) + `"`);
    var r5 = De2(this.style);
    r5 && (n4 += ` style="` + a2(r5) + `"`);
    for (var i5 of Object.keys(this.attributes)) {
      if (Ae2.test(i5)) throw new e2(`Invalid attribute name '` + i5 + `'`);
      n4 += ` ` + i5 + `="` + a2(this.attributes[i5]) + `"`;
    }
    n4 += `>`;
    for (var o5 = 0; o5 < this.children.length; o5++) n4 += this.children[o5].toMarkup();
    return n4 += `</` + t8 + `>`, n4;
  };
  var Me2 = class {
    constructor(e10, t8, n4, r5) {
      this.children = void 0, this.attributes = void 0, this.classes = void 0, this.height = void 0, this.depth = void 0, this.width = void 0, this.maxFontSize = void 0, this.style = void 0, this.italic = void 0, Oe.call(this, e10, n4, r5), this.children = t8 || [];
    }
    setAttribute(e10, t8) {
      this.attributes[e10] = t8;
    }
    hasClass(e10) {
      return this.classes.includes(e10);
    }
    toNode() {
      return ke2.call(this, `span`);
    }
    toMarkup() {
      return je2.call(this, `span`);
    }
  };
  var Ne2 = class {
    constructor(e10, t8, n4, r5) {
      this.children = void 0, this.attributes = void 0, this.classes = void 0, this.height = void 0, this.depth = void 0, this.maxFontSize = void 0, this.style = void 0, Oe.call(this, t8, r5), this.children = n4 || [], this.setAttribute(`href`, e10);
    }
    setAttribute(e10, t8) {
      this.attributes[e10] = t8;
    }
    hasClass(e10) {
      return this.classes.includes(e10);
    }
    toNode() {
      return ke2.call(this, `a`);
    }
    toMarkup() {
      return je2.call(this, `a`);
    }
  };
  var Pe2 = class {
    constructor(e10, t8, n4) {
      this.src = void 0, this.alt = void 0, this.classes = void 0, this.height = void 0, this.depth = void 0, this.maxFontSize = void 0, this.style = void 0, this.alt = t8, this.src = e10, this.classes = [`mord`], this.height = 0, this.depth = 0, this.maxFontSize = 0, this.style = n4;
    }
    hasClass(e10) {
      return this.classes.includes(e10);
    }
    toNode() {
      var e10 = document.createElement(`img`);
      return e10.src = this.src, e10.alt = this.alt, e10.className = `mord`, Object.assign(e10.style, this.style), e10;
    }
    toMarkup() {
      var e10 = `<img src="` + a2(this.src) + `"` + (` alt="` + a2(this.alt) + `"`), t8 = De2(this.style);
      return t8 && (e10 += ` style="` + a2(t8) + `"`), e10 += `'/>`, e10;
    }
  };
  var Fe2 = { \u00EE: `\u0131\u0302`, \u00EF: `\u0131\u0308`, \u00ED: `\u0131\u0301`, \u00EC: `\u0131\u0300` };
  var Ie2 = class {
    constructor(e10, t8, n4, r5, i5, a5, o5, s6) {
      this.text = void 0, this.height = void 0, this.depth = void 0, this.italic = void 0, this.skew = void 0, this.width = void 0, this.maxFontSize = void 0, this.classes = void 0, this.style = void 0, this.text = e10, this.height = t8 || 0, this.depth = n4 || 0, this.italic = r5 || 0, this.skew = i5 || 0, this.width = a5 || 0, this.classes = o5 || [], this.style = s6 || {}, this.maxFontSize = 0;
      var c4 = oe2(this.text.charCodeAt(0));
      c4 && this.classes.push(c4 + `_fallback`), /[îïíì]/.test(this.text) && (this.text = Fe2[this.text]);
    }
    hasClass(e10) {
      return this.classes.includes(e10);
    }
    toNode() {
      var e10 = document.createTextNode(this.text), t8 = null;
      return this.italic > 0 && (t8 = document.createElement(`span`), t8.style.marginRight = k2(this.italic)), this.classes.length > 0 && (t8 ||= document.createElement(`span`), t8.className = Ee(this.classes)), Object.keys(this.style).length > 0 && (t8 ||= document.createElement(`span`), Object.assign(t8.style, this.style)), t8 ? (t8.appendChild(e10), t8) : e10;
    }
    toMarkup() {
      var e10 = false, t8 = `<span`;
      this.classes.length && (e10 = true, t8 += ` class="`, t8 += a2(Ee(this.classes)), t8 += `"`);
      var n4 = ``;
      this.italic > 0 && (n4 += `margin-right:` + k2(this.italic) + `;`), n4 += De2(this.style), n4 && (e10 = true, t8 += ` style="` + a2(n4) + `"`);
      var r5 = a2(this.text);
      return e10 ? (t8 += `>`, t8 += r5, t8 += `</span>`, t8) : r5;
    }
  };
  var Le2 = class {
    constructor(e10, t8) {
      this.children = void 0, this.attributes = void 0, this.children = e10 || [], this.attributes = t8 || {};
    }
    toNode() {
      var e10 = document.createElementNS(`http://www.w3.org/2000/svg`, `svg`);
      for (var t8 of Object.keys(this.attributes)) e10.setAttribute(t8, this.attributes[t8]);
      for (var n4 = 0; n4 < this.children.length; n4++) e10.appendChild(this.children[n4].toNode());
      return e10;
    }
    toMarkup() {
      var e10 = `<svg xmlns="http://www.w3.org/2000/svg"`;
      for (var t8 of Object.keys(this.attributes)) e10 += ` ` + t8 + `="` + a2(this.attributes[t8]) + `"`;
      e10 += `>`;
      for (var n4 = 0; n4 < this.children.length; n4++) e10 += this.children[n4].toMarkup();
      return e10 += `</svg>`, e10;
    }
  };
  var Re2 = class {
    constructor(e10, t8) {
      this.pathName = void 0, this.alternate = void 0, this.pathName = e10, this.alternate = t8;
    }
    toNode() {
      var e10 = document.createElementNS(`http://www.w3.org/2000/svg`, `path`);
      return this.alternate ? e10.setAttribute(`d`, this.alternate) : e10.setAttribute(`d`, ye2[this.pathName]), e10;
    }
    toMarkup() {
      return this.alternate ? `<path d="` + a2(this.alternate) + `"/>` : `<path d="` + a2(ye2[this.pathName]) + `"/>`;
    }
  };
  var ze2 = class {
    constructor(e10) {
      this.attributes = void 0, this.attributes = e10 || {};
    }
    toNode() {
      var e10 = document.createElementNS(`http://www.w3.org/2000/svg`, `line`);
      for (var t8 of Object.keys(this.attributes)) e10.setAttribute(t8, this.attributes[t8]);
      return e10;
    }
    toMarkup() {
      var e10 = `<line`;
      for (var t8 of Object.keys(this.attributes)) e10 += ` ` + t8 + `="` + a2(this.attributes[t8]) + `"`;
      return e10 += `/>`, e10;
    }
  };
  function Be2(e10) {
    if (e10 instanceof Ie2) return e10;
    throw Error(`Expected symbolNode but got ` + String(e10) + `.`);
  }
  function Ve2(e10) {
    if (e10 instanceof Me2) return e10;
    throw Error(`Expected span<HtmlDomNode> but got ` + String(e10) + `.`);
  }
  var He2 = (e10) => e10 instanceof Me2 || e10 instanceof Ne2 || e10 instanceof Se2;
  var Ue2 = { "AMS-Regular": { 32: [0, 0, 0, 0, 0.25], 65: [0, 0.68889, 0, 0, 0.72222], 66: [0, 0.68889, 0, 0, 0.66667], 67: [0, 0.68889, 0, 0, 0.72222], 68: [0, 0.68889, 0, 0, 0.72222], 69: [0, 0.68889, 0, 0, 0.66667], 70: [0, 0.68889, 0, 0, 0.61111], 71: [0, 0.68889, 0, 0, 0.77778], 72: [0, 0.68889, 0, 0, 0.77778], 73: [0, 0.68889, 0, 0, 0.38889], 74: [0.16667, 0.68889, 0, 0, 0.5], 75: [0, 0.68889, 0, 0, 0.77778], 76: [0, 0.68889, 0, 0, 0.66667], 77: [0, 0.68889, 0, 0, 0.94445], 78: [0, 0.68889, 0, 0, 0.72222], 79: [0.16667, 0.68889, 0, 0, 0.77778], 80: [0, 0.68889, 0, 0, 0.61111], 81: [0.16667, 0.68889, 0, 0, 0.77778], 82: [0, 0.68889, 0, 0, 0.72222], 83: [0, 0.68889, 0, 0, 0.55556], 84: [0, 0.68889, 0, 0, 0.66667], 85: [0, 0.68889, 0, 0, 0.72222], 86: [0, 0.68889, 0, 0, 0.72222], 87: [0, 0.68889, 0, 0, 1], 88: [0, 0.68889, 0, 0, 0.72222], 89: [0, 0.68889, 0, 0, 0.72222], 90: [0, 0.68889, 0, 0, 0.66667], 107: [0, 0.68889, 0, 0, 0.55556], 160: [0, 0, 0, 0, 0.25], 165: [0, 0.675, 0.025, 0, 0.75], 174: [0.15559, 0.69224, 0, 0, 0.94666], 240: [0, 0.68889, 0, 0, 0.55556], 295: [0, 0.68889, 0, 0, 0.54028], 710: [0, 0.825, 0, 0, 2.33334], 732: [0, 0.9, 0, 0, 2.33334], 770: [0, 0.825, 0, 0, 2.33334], 771: [0, 0.9, 0, 0, 2.33334], 989: [0.08167, 0.58167, 0, 0, 0.77778], 1008: [0, 0.43056, 0.04028, 0, 0.66667], 8245: [0, 0.54986, 0, 0, 0.275], 8463: [0, 0.68889, 0, 0, 0.54028], 8487: [0, 0.68889, 0, 0, 0.72222], 8498: [0, 0.68889, 0, 0, 0.55556], 8502: [0, 0.68889, 0, 0, 0.66667], 8503: [0, 0.68889, 0, 0, 0.44445], 8504: [0, 0.68889, 0, 0, 0.66667], 8513: [0, 0.68889, 0, 0, 0.63889], 8592: [-0.03598, 0.46402, 0, 0, 0.5], 8594: [-0.03598, 0.46402, 0, 0, 0.5], 8602: [-0.13313, 0.36687, 0, 0, 1], 8603: [-0.13313, 0.36687, 0, 0, 1], 8606: [0.01354, 0.52239, 0, 0, 1], 8608: [0.01354, 0.52239, 0, 0, 1], 8610: [0.01354, 0.52239, 0, 0, 1.11111], 8611: [0.01354, 0.52239, 0, 0, 1.11111], 8619: [0, 0.54986, 0, 0, 1], 8620: [0, 0.54986, 0, 0, 1], 8621: [-0.13313, 0.37788, 0, 0, 1.38889], 8622: [-0.13313, 0.36687, 0, 0, 1], 8624: [0, 0.69224, 0, 0, 0.5], 8625: [0, 0.69224, 0, 0, 0.5], 8630: [0, 0.43056, 0, 0, 1], 8631: [0, 0.43056, 0, 0, 1], 8634: [0.08198, 0.58198, 0, 0, 0.77778], 8635: [0.08198, 0.58198, 0, 0, 0.77778], 8638: [0.19444, 0.69224, 0, 0, 0.41667], 8639: [0.19444, 0.69224, 0, 0, 0.41667], 8642: [0.19444, 0.69224, 0, 0, 0.41667], 8643: [0.19444, 0.69224, 0, 0, 0.41667], 8644: [0.1808, 0.675, 0, 0, 1], 8646: [0.1808, 0.675, 0, 0, 1], 8647: [0.1808, 0.675, 0, 0, 1], 8648: [0.19444, 0.69224, 0, 0, 0.83334], 8649: [0.1808, 0.675, 0, 0, 1], 8650: [0.19444, 0.69224, 0, 0, 0.83334], 8651: [0.01354, 0.52239, 0, 0, 1], 8652: [0.01354, 0.52239, 0, 0, 1], 8653: [-0.13313, 0.36687, 0, 0, 1], 8654: [-0.13313, 0.36687, 0, 0, 1], 8655: [-0.13313, 0.36687, 0, 0, 1], 8666: [0.13667, 0.63667, 0, 0, 1], 8667: [0.13667, 0.63667, 0, 0, 1], 8669: [-0.13313, 0.37788, 0, 0, 1], 8672: [-0.064, 0.437, 0, 0, 1.334], 8674: [-0.064, 0.437, 0, 0, 1.334], 8705: [0, 0.825, 0, 0, 0.5], 8708: [0, 0.68889, 0, 0, 0.55556], 8709: [0.08167, 0.58167, 0, 0, 0.77778], 8717: [0, 0.43056, 0, 0, 0.42917], 8722: [-0.03598, 0.46402, 0, 0, 0.5], 8724: [0.08198, 0.69224, 0, 0, 0.77778], 8726: [0.08167, 0.58167, 0, 0, 0.77778], 8733: [0, 0.69224, 0, 0, 0.77778], 8736: [0, 0.69224, 0, 0, 0.72222], 8737: [0, 0.69224, 0, 0, 0.72222], 8738: [0.03517, 0.52239, 0, 0, 0.72222], 8739: [0.08167, 0.58167, 0, 0, 0.22222], 8740: [0.25142, 0.74111, 0, 0, 0.27778], 8741: [0.08167, 0.58167, 0, 0, 0.38889], 8742: [0.25142, 0.74111, 0, 0, 0.5], 8756: [0, 0.69224, 0, 0, 0.66667], 8757: [0, 0.69224, 0, 0, 0.66667], 8764: [-0.13313, 0.36687, 0, 0, 0.77778], 8765: [-0.13313, 0.37788, 0, 0, 0.77778], 8769: [-0.13313, 0.36687, 0, 0, 0.77778], 8770: [-0.03625, 0.46375, 0, 0, 0.77778], 8774: [0.30274, 0.79383, 0, 0, 0.77778], 8776: [-0.01688, 0.48312, 0, 0, 0.77778], 8778: [0.08167, 0.58167, 0, 0, 0.77778], 8782: [0.06062, 0.54986, 0, 0, 0.77778], 8783: [0.06062, 0.54986, 0, 0, 0.77778], 8785: [0.08198, 0.58198, 0, 0, 0.77778], 8786: [0.08198, 0.58198, 0, 0, 0.77778], 8787: [0.08198, 0.58198, 0, 0, 0.77778], 8790: [0, 0.69224, 0, 0, 0.77778], 8791: [0.22958, 0.72958, 0, 0, 0.77778], 8796: [0.08198, 0.91667, 0, 0, 0.77778], 8806: [0.25583, 0.75583, 0, 0, 0.77778], 8807: [0.25583, 0.75583, 0, 0, 0.77778], 8808: [0.25142, 0.75726, 0, 0, 0.77778], 8809: [0.25142, 0.75726, 0, 0, 0.77778], 8812: [0.25583, 0.75583, 0, 0, 0.5], 8814: [0.20576, 0.70576, 0, 0, 0.77778], 8815: [0.20576, 0.70576, 0, 0, 0.77778], 8816: [0.30274, 0.79383, 0, 0, 0.77778], 8817: [0.30274, 0.79383, 0, 0, 0.77778], 8818: [0.22958, 0.72958, 0, 0, 0.77778], 8819: [0.22958, 0.72958, 0, 0, 0.77778], 8822: [0.1808, 0.675, 0, 0, 0.77778], 8823: [0.1808, 0.675, 0, 0, 0.77778], 8828: [0.13667, 0.63667, 0, 0, 0.77778], 8829: [0.13667, 0.63667, 0, 0, 0.77778], 8830: [0.22958, 0.72958, 0, 0, 0.77778], 8831: [0.22958, 0.72958, 0, 0, 0.77778], 8832: [0.20576, 0.70576, 0, 0, 0.77778], 8833: [0.20576, 0.70576, 0, 0, 0.77778], 8840: [0.30274, 0.79383, 0, 0, 0.77778], 8841: [0.30274, 0.79383, 0, 0, 0.77778], 8842: [0.13597, 0.63597, 0, 0, 0.77778], 8843: [0.13597, 0.63597, 0, 0, 0.77778], 8847: [0.03517, 0.54986, 0, 0, 0.77778], 8848: [0.03517, 0.54986, 0, 0, 0.77778], 8858: [0.08198, 0.58198, 0, 0, 0.77778], 8859: [0.08198, 0.58198, 0, 0, 0.77778], 8861: [0.08198, 0.58198, 0, 0, 0.77778], 8862: [0, 0.675, 0, 0, 0.77778], 8863: [0, 0.675, 0, 0, 0.77778], 8864: [0, 0.675, 0, 0, 0.77778], 8865: [0, 0.675, 0, 0, 0.77778], 8872: [0, 0.69224, 0, 0, 0.61111], 8873: [0, 0.69224, 0, 0, 0.72222], 8874: [0, 0.69224, 0, 0, 0.88889], 8876: [0, 0.68889, 0, 0, 0.61111], 8877: [0, 0.68889, 0, 0, 0.61111], 8878: [0, 0.68889, 0, 0, 0.72222], 8879: [0, 0.68889, 0, 0, 0.72222], 8882: [0.03517, 0.54986, 0, 0, 0.77778], 8883: [0.03517, 0.54986, 0, 0, 0.77778], 8884: [0.13667, 0.63667, 0, 0, 0.77778], 8885: [0.13667, 0.63667, 0, 0, 0.77778], 8888: [0, 0.54986, 0, 0, 1.11111], 8890: [0.19444, 0.43056, 0, 0, 0.55556], 8891: [0.19444, 0.69224, 0, 0, 0.61111], 8892: [0.19444, 0.69224, 0, 0, 0.61111], 8901: [0, 0.54986, 0, 0, 0.27778], 8903: [0.08167, 0.58167, 0, 0, 0.77778], 8905: [0.08167, 0.58167, 0, 0, 0.77778], 8906: [0.08167, 0.58167, 0, 0, 0.77778], 8907: [0, 0.69224, 0, 0, 0.77778], 8908: [0, 0.69224, 0, 0, 0.77778], 8909: [-0.03598, 0.46402, 0, 0, 0.77778], 8910: [0, 0.54986, 0, 0, 0.76042], 8911: [0, 0.54986, 0, 0, 0.76042], 8912: [0.03517, 0.54986, 0, 0, 0.77778], 8913: [0.03517, 0.54986, 0, 0, 0.77778], 8914: [0, 0.54986, 0, 0, 0.66667], 8915: [0, 0.54986, 0, 0, 0.66667], 8916: [0, 0.69224, 0, 0, 0.66667], 8918: [0.0391, 0.5391, 0, 0, 0.77778], 8919: [0.0391, 0.5391, 0, 0, 0.77778], 8920: [0.03517, 0.54986, 0, 0, 1.33334], 8921: [0.03517, 0.54986, 0, 0, 1.33334], 8922: [0.38569, 0.88569, 0, 0, 0.77778], 8923: [0.38569, 0.88569, 0, 0, 0.77778], 8926: [0.13667, 0.63667, 0, 0, 0.77778], 8927: [0.13667, 0.63667, 0, 0, 0.77778], 8928: [0.30274, 0.79383, 0, 0, 0.77778], 8929: [0.30274, 0.79383, 0, 0, 0.77778], 8934: [0.23222, 0.74111, 0, 0, 0.77778], 8935: [0.23222, 0.74111, 0, 0, 0.77778], 8936: [0.23222, 0.74111, 0, 0, 0.77778], 8937: [0.23222, 0.74111, 0, 0, 0.77778], 8938: [0.20576, 0.70576, 0, 0, 0.77778], 8939: [0.20576, 0.70576, 0, 0, 0.77778], 8940: [0.30274, 0.79383, 0, 0, 0.77778], 8941: [0.30274, 0.79383, 0, 0, 0.77778], 8994: [0.19444, 0.69224, 0, 0, 0.77778], 8995: [0.19444, 0.69224, 0, 0, 0.77778], 9416: [0.15559, 0.69224, 0, 0, 0.90222], 9484: [0, 0.69224, 0, 0, 0.5], 9488: [0, 0.69224, 0, 0, 0.5], 9492: [0, 0.37788, 0, 0, 0.5], 9496: [0, 0.37788, 0, 0, 0.5], 9585: [0.19444, 0.68889, 0, 0, 0.88889], 9586: [0.19444, 0.74111, 0, 0, 0.88889], 9632: [0, 0.675, 0, 0, 0.77778], 9633: [0, 0.675, 0, 0, 0.77778], 9650: [0, 0.54986, 0, 0, 0.72222], 9651: [0, 0.54986, 0, 0, 0.72222], 9654: [0.03517, 0.54986, 0, 0, 0.77778], 9660: [0, 0.54986, 0, 0, 0.72222], 9661: [0, 0.54986, 0, 0, 0.72222], 9664: [0.03517, 0.54986, 0, 0, 0.77778], 9674: [0.11111, 0.69224, 0, 0, 0.66667], 9733: [0.19444, 0.69224, 0, 0, 0.94445], 10003: [0, 0.69224, 0, 0, 0.83334], 10016: [0, 0.69224, 0, 0, 0.83334], 10731: [0.11111, 0.69224, 0, 0, 0.66667], 10846: [0.19444, 0.75583, 0, 0, 0.61111], 10877: [0.13667, 0.63667, 0, 0, 0.77778], 10878: [0.13667, 0.63667, 0, 0, 0.77778], 10885: [0.25583, 0.75583, 0, 0, 0.77778], 10886: [0.25583, 0.75583, 0, 0, 0.77778], 10887: [0.13597, 0.63597, 0, 0, 0.77778], 10888: [0.13597, 0.63597, 0, 0, 0.77778], 10889: [0.26167, 0.75726, 0, 0, 0.77778], 10890: [0.26167, 0.75726, 0, 0, 0.77778], 10891: [0.48256, 0.98256, 0, 0, 0.77778], 10892: [0.48256, 0.98256, 0, 0, 0.77778], 10901: [0.13667, 0.63667, 0, 0, 0.77778], 10902: [0.13667, 0.63667, 0, 0, 0.77778], 10933: [0.25142, 0.75726, 0, 0, 0.77778], 10934: [0.25142, 0.75726, 0, 0, 0.77778], 10935: [0.26167, 0.75726, 0, 0, 0.77778], 10936: [0.26167, 0.75726, 0, 0, 0.77778], 10937: [0.26167, 0.75726, 0, 0, 0.77778], 10938: [0.26167, 0.75726, 0, 0, 0.77778], 10949: [0.25583, 0.75583, 0, 0, 0.77778], 10950: [0.25583, 0.75583, 0, 0, 0.77778], 10955: [0.28481, 0.79383, 0, 0, 0.77778], 10956: [0.28481, 0.79383, 0, 0, 0.77778], 57350: [0.08167, 0.58167, 0, 0, 0.22222], 57351: [0.08167, 0.58167, 0, 0, 0.38889], 57352: [0.08167, 0.58167, 0, 0, 0.77778], 57353: [0, 0.43056, 0.04028, 0, 0.66667], 57356: [0.25142, 0.75726, 0, 0, 0.77778], 57357: [0.25142, 0.75726, 0, 0, 0.77778], 57358: [0.41951, 0.91951, 0, 0, 0.77778], 57359: [0.30274, 0.79383, 0, 0, 0.77778], 57360: [0.30274, 0.79383, 0, 0, 0.77778], 57361: [0.41951, 0.91951, 0, 0, 0.77778], 57366: [0.25142, 0.75726, 0, 0, 0.77778], 57367: [0.25142, 0.75726, 0, 0, 0.77778], 57368: [0.25142, 0.75726, 0, 0, 0.77778], 57369: [0.25142, 0.75726, 0, 0, 0.77778], 57370: [0.13597, 0.63597, 0, 0, 0.77778], 57371: [0.13597, 0.63597, 0, 0, 0.77778] }, "Caligraphic-Regular": { 32: [0, 0, 0, 0, 0.25], 65: [0, 0.68333, 0, 0.19445, 0.79847], 66: [0, 0.68333, 0.03041, 0.13889, 0.65681], 67: [0, 0.68333, 0.05834, 0.13889, 0.52653], 68: [0, 0.68333, 0.02778, 0.08334, 0.77139], 69: [0, 0.68333, 0.08944, 0.11111, 0.52778], 70: [0, 0.68333, 0.09931, 0.11111, 0.71875], 71: [0.09722, 0.68333, 0.0593, 0.11111, 0.59487], 72: [0, 0.68333, 965e-5, 0.11111, 0.84452], 73: [0, 0.68333, 0.07382, 0, 0.54452], 74: [0.09722, 0.68333, 0.18472, 0.16667, 0.67778], 75: [0, 0.68333, 0.01445, 0.05556, 0.76195], 76: [0, 0.68333, 0, 0.13889, 0.68972], 77: [0, 0.68333, 0, 0.13889, 1.2009], 78: [0, 0.68333, 0.14736, 0.08334, 0.82049], 79: [0, 0.68333, 0.02778, 0.11111, 0.79611], 80: [0, 0.68333, 0.08222, 0.08334, 0.69556], 81: [0.09722, 0.68333, 0, 0.11111, 0.81667], 82: [0, 0.68333, 0, 0.08334, 0.8475], 83: [0, 0.68333, 0.075, 0.13889, 0.60556], 84: [0, 0.68333, 0.25417, 0, 0.54464], 85: [0, 0.68333, 0.09931, 0.08334, 0.62583], 86: [0, 0.68333, 0.08222, 0, 0.61278], 87: [0, 0.68333, 0.08222, 0.08334, 0.98778], 88: [0, 0.68333, 0.14643, 0.13889, 0.7133], 89: [0.09722, 0.68333, 0.08222, 0.08334, 0.66834], 90: [0, 0.68333, 0.07944, 0.13889, 0.72473], 160: [0, 0, 0, 0, 0.25] }, "Fraktur-Regular": { 32: [0, 0, 0, 0, 0.25], 33: [0, 0.69141, 0, 0, 0.29574], 34: [0, 0.69141, 0, 0, 0.21471], 38: [0, 0.69141, 0, 0, 0.73786], 39: [0, 0.69141, 0, 0, 0.21201], 40: [0.24982, 0.74947, 0, 0, 0.38865], 41: [0.24982, 0.74947, 0, 0, 0.38865], 42: [0, 0.62119, 0, 0, 0.27764], 43: [0.08319, 0.58283, 0, 0, 0.75623], 44: [0, 0.10803, 0, 0, 0.27764], 45: [0.08319, 0.58283, 0, 0, 0.75623], 46: [0, 0.10803, 0, 0, 0.27764], 47: [0.24982, 0.74947, 0, 0, 0.50181], 48: [0, 0.47534, 0, 0, 0.50181], 49: [0, 0.47534, 0, 0, 0.50181], 50: [0, 0.47534, 0, 0, 0.50181], 51: [0.18906, 0.47534, 0, 0, 0.50181], 52: [0.18906, 0.47534, 0, 0, 0.50181], 53: [0.18906, 0.47534, 0, 0, 0.50181], 54: [0, 0.69141, 0, 0, 0.50181], 55: [0.18906, 0.47534, 0, 0, 0.50181], 56: [0, 0.69141, 0, 0, 0.50181], 57: [0.18906, 0.47534, 0, 0, 0.50181], 58: [0, 0.47534, 0, 0, 0.21606], 59: [0.12604, 0.47534, 0, 0, 0.21606], 61: [-0.13099, 0.36866, 0, 0, 0.75623], 63: [0, 0.69141, 0, 0, 0.36245], 65: [0, 0.69141, 0, 0, 0.7176], 66: [0, 0.69141, 0, 0, 0.88397], 67: [0, 0.69141, 0, 0, 0.61254], 68: [0, 0.69141, 0, 0, 0.83158], 69: [0, 0.69141, 0, 0, 0.66278], 70: [0.12604, 0.69141, 0, 0, 0.61119], 71: [0, 0.69141, 0, 0, 0.78539], 72: [0.06302, 0.69141, 0, 0, 0.7203], 73: [0, 0.69141, 0, 0, 0.55448], 74: [0.12604, 0.69141, 0, 0, 0.55231], 75: [0, 0.69141, 0, 0, 0.66845], 76: [0, 0.69141, 0, 0, 0.66602], 77: [0, 0.69141, 0, 0, 1.04953], 78: [0, 0.69141, 0, 0, 0.83212], 79: [0, 0.69141, 0, 0, 0.82699], 80: [0.18906, 0.69141, 0, 0, 0.82753], 81: [0.03781, 0.69141, 0, 0, 0.82699], 82: [0, 0.69141, 0, 0, 0.82807], 83: [0, 0.69141, 0, 0, 0.82861], 84: [0, 0.69141, 0, 0, 0.66899], 85: [0, 0.69141, 0, 0, 0.64576], 86: [0, 0.69141, 0, 0, 0.83131], 87: [0, 0.69141, 0, 0, 1.04602], 88: [0, 0.69141, 0, 0, 0.71922], 89: [0.18906, 0.69141, 0, 0, 0.83293], 90: [0.12604, 0.69141, 0, 0, 0.60201], 91: [0.24982, 0.74947, 0, 0, 0.27764], 93: [0.24982, 0.74947, 0, 0, 0.27764], 94: [0, 0.69141, 0, 0, 0.49965], 97: [0, 0.47534, 0, 0, 0.50046], 98: [0, 0.69141, 0, 0, 0.51315], 99: [0, 0.47534, 0, 0, 0.38946], 100: [0, 0.62119, 0, 0, 0.49857], 101: [0, 0.47534, 0, 0, 0.40053], 102: [0.18906, 0.69141, 0, 0, 0.32626], 103: [0.18906, 0.47534, 0, 0, 0.5037], 104: [0.18906, 0.69141, 0, 0, 0.52126], 105: [0, 0.69141, 0, 0, 0.27899], 106: [0, 0.69141, 0, 0, 0.28088], 107: [0, 0.69141, 0, 0, 0.38946], 108: [0, 0.69141, 0, 0, 0.27953], 109: [0, 0.47534, 0, 0, 0.76676], 110: [0, 0.47534, 0, 0, 0.52666], 111: [0, 0.47534, 0, 0, 0.48885], 112: [0.18906, 0.52396, 0, 0, 0.50046], 113: [0.18906, 0.47534, 0, 0, 0.48912], 114: [0, 0.47534, 0, 0, 0.38919], 115: [0, 0.47534, 0, 0, 0.44266], 116: [0, 0.62119, 0, 0, 0.33301], 117: [0, 0.47534, 0, 0, 0.5172], 118: [0, 0.52396, 0, 0, 0.5118], 119: [0, 0.52396, 0, 0, 0.77351], 120: [0.18906, 0.47534, 0, 0, 0.38865], 121: [0.18906, 0.47534, 0, 0, 0.49884], 122: [0.18906, 0.47534, 0, 0, 0.39054], 160: [0, 0, 0, 0, 0.25], 8216: [0, 0.69141, 0, 0, 0.21471], 8217: [0, 0.69141, 0, 0, 0.21471], 58112: [0, 0.62119, 0, 0, 0.49749], 58113: [0, 0.62119, 0, 0, 0.4983], 58114: [0.18906, 0.69141, 0, 0, 0.33328], 58115: [0.18906, 0.69141, 0, 0, 0.32923], 58116: [0.18906, 0.47534, 0, 0, 0.50343], 58117: [0, 0.69141, 0, 0, 0.33301], 58118: [0, 0.62119, 0, 0, 0.33409], 58119: [0, 0.47534, 0, 0, 0.50073] }, "Main-Bold": { 32: [0, 0, 0, 0, 0.25], 33: [0, 0.69444, 0, 0, 0.35], 34: [0, 0.69444, 0, 0, 0.60278], 35: [0.19444, 0.69444, 0, 0, 0.95833], 36: [0.05556, 0.75, 0, 0, 0.575], 37: [0.05556, 0.75, 0, 0, 0.95833], 38: [0, 0.69444, 0, 0, 0.89444], 39: [0, 0.69444, 0, 0, 0.31944], 40: [0.25, 0.75, 0, 0, 0.44722], 41: [0.25, 0.75, 0, 0, 0.44722], 42: [0, 0.75, 0, 0, 0.575], 43: [0.13333, 0.63333, 0, 0, 0.89444], 44: [0.19444, 0.15556, 0, 0, 0.31944], 45: [0, 0.44444, 0, 0, 0.38333], 46: [0, 0.15556, 0, 0, 0.31944], 47: [0.25, 0.75, 0, 0, 0.575], 48: [0, 0.64444, 0, 0, 0.575], 49: [0, 0.64444, 0, 0, 0.575], 50: [0, 0.64444, 0, 0, 0.575], 51: [0, 0.64444, 0, 0, 0.575], 52: [0, 0.64444, 0, 0, 0.575], 53: [0, 0.64444, 0, 0, 0.575], 54: [0, 0.64444, 0, 0, 0.575], 55: [0, 0.64444, 0, 0, 0.575], 56: [0, 0.64444, 0, 0, 0.575], 57: [0, 0.64444, 0, 0, 0.575], 58: [0, 0.44444, 0, 0, 0.31944], 59: [0.19444, 0.44444, 0, 0, 0.31944], 60: [0.08556, 0.58556, 0, 0, 0.89444], 61: [-0.10889, 0.39111, 0, 0, 0.89444], 62: [0.08556, 0.58556, 0, 0, 0.89444], 63: [0, 0.69444, 0, 0, 0.54305], 64: [0, 0.69444, 0, 0, 0.89444], 65: [0, 0.68611, 0, 0, 0.86944], 66: [0, 0.68611, 0, 0, 0.81805], 67: [0, 0.68611, 0, 0, 0.83055], 68: [0, 0.68611, 0, 0, 0.88194], 69: [0, 0.68611, 0, 0, 0.75555], 70: [0, 0.68611, 0, 0, 0.72361], 71: [0, 0.68611, 0, 0, 0.90416], 72: [0, 0.68611, 0, 0, 0.9], 73: [0, 0.68611, 0, 0, 0.43611], 74: [0, 0.68611, 0, 0, 0.59444], 75: [0, 0.68611, 0, 0, 0.90138], 76: [0, 0.68611, 0, 0, 0.69166], 77: [0, 0.68611, 0, 0, 1.09166], 78: [0, 0.68611, 0, 0, 0.9], 79: [0, 0.68611, 0, 0, 0.86388], 80: [0, 0.68611, 0, 0, 0.78611], 81: [0.19444, 0.68611, 0, 0, 0.86388], 82: [0, 0.68611, 0, 0, 0.8625], 83: [0, 0.68611, 0, 0, 0.63889], 84: [0, 0.68611, 0, 0, 0.8], 85: [0, 0.68611, 0, 0, 0.88472], 86: [0, 0.68611, 0.01597, 0, 0.86944], 87: [0, 0.68611, 0.01597, 0, 1.18888], 88: [0, 0.68611, 0, 0, 0.86944], 89: [0, 0.68611, 0.02875, 0, 0.86944], 90: [0, 0.68611, 0, 0, 0.70277], 91: [0.25, 0.75, 0, 0, 0.31944], 92: [0.25, 0.75, 0, 0, 0.575], 93: [0.25, 0.75, 0, 0, 0.31944], 94: [0, 0.69444, 0, 0, 0.575], 95: [0.31, 0.13444, 0.03194, 0, 0.575], 97: [0, 0.44444, 0, 0, 0.55902], 98: [0, 0.69444, 0, 0, 0.63889], 99: [0, 0.44444, 0, 0, 0.51111], 100: [0, 0.69444, 0, 0, 0.63889], 101: [0, 0.44444, 0, 0, 0.52708], 102: [0, 0.69444, 0.10903, 0, 0.35139], 103: [0.19444, 0.44444, 0.01597, 0, 0.575], 104: [0, 0.69444, 0, 0, 0.63889], 105: [0, 0.69444, 0, 0, 0.31944], 106: [0.19444, 0.69444, 0, 0, 0.35139], 107: [0, 0.69444, 0, 0, 0.60694], 108: [0, 0.69444, 0, 0, 0.31944], 109: [0, 0.44444, 0, 0, 0.95833], 110: [0, 0.44444, 0, 0, 0.63889], 111: [0, 0.44444, 0, 0, 0.575], 112: [0.19444, 0.44444, 0, 0, 0.63889], 113: [0.19444, 0.44444, 0, 0, 0.60694], 114: [0, 0.44444, 0, 0, 0.47361], 115: [0, 0.44444, 0, 0, 0.45361], 116: [0, 0.63492, 0, 0, 0.44722], 117: [0, 0.44444, 0, 0, 0.63889], 118: [0, 0.44444, 0.01597, 0, 0.60694], 119: [0, 0.44444, 0.01597, 0, 0.83055], 120: [0, 0.44444, 0, 0, 0.60694], 121: [0.19444, 0.44444, 0.01597, 0, 0.60694], 122: [0, 0.44444, 0, 0, 0.51111], 123: [0.25, 0.75, 0, 0, 0.575], 124: [0.25, 0.75, 0, 0, 0.31944], 125: [0.25, 0.75, 0, 0, 0.575], 126: [0.35, 0.34444, 0, 0, 0.575], 160: [0, 0, 0, 0, 0.25], 163: [0, 0.69444, 0, 0, 0.86853], 168: [0, 0.69444, 0, 0, 0.575], 172: [0, 0.44444, 0, 0, 0.76666], 176: [0, 0.69444, 0, 0, 0.86944], 177: [0.13333, 0.63333, 0, 0, 0.89444], 184: [0.17014, 0, 0, 0, 0.51111], 198: [0, 0.68611, 0, 0, 1.04166], 215: [0.13333, 0.63333, 0, 0, 0.89444], 216: [0.04861, 0.73472, 0, 0, 0.89444], 223: [0, 0.69444, 0, 0, 0.59722], 230: [0, 0.44444, 0, 0, 0.83055], 247: [0.13333, 0.63333, 0, 0, 0.89444], 248: [0.09722, 0.54167, 0, 0, 0.575], 305: [0, 0.44444, 0, 0, 0.31944], 338: [0, 0.68611, 0, 0, 1.16944], 339: [0, 0.44444, 0, 0, 0.89444], 567: [0.19444, 0.44444, 0, 0, 0.35139], 710: [0, 0.69444, 0, 0, 0.575], 711: [0, 0.63194, 0, 0, 0.575], 713: [0, 0.59611, 0, 0, 0.575], 714: [0, 0.69444, 0, 0, 0.575], 715: [0, 0.69444, 0, 0, 0.575], 728: [0, 0.69444, 0, 0, 0.575], 729: [0, 0.69444, 0, 0, 0.31944], 730: [0, 0.69444, 0, 0, 0.86944], 732: [0, 0.69444, 0, 0, 0.575], 733: [0, 0.69444, 0, 0, 0.575], 915: [0, 0.68611, 0, 0, 0.69166], 916: [0, 0.68611, 0, 0, 0.95833], 920: [0, 0.68611, 0, 0, 0.89444], 923: [0, 0.68611, 0, 0, 0.80555], 926: [0, 0.68611, 0, 0, 0.76666], 928: [0, 0.68611, 0, 0, 0.9], 931: [0, 0.68611, 0, 0, 0.83055], 933: [0, 0.68611, 0, 0, 0.89444], 934: [0, 0.68611, 0, 0, 0.83055], 936: [0, 0.68611, 0, 0, 0.89444], 937: [0, 0.68611, 0, 0, 0.83055], 8211: [0, 0.44444, 0.03194, 0, 0.575], 8212: [0, 0.44444, 0.03194, 0, 1.14999], 8216: [0, 0.69444, 0, 0, 0.31944], 8217: [0, 0.69444, 0, 0, 0.31944], 8220: [0, 0.69444, 0, 0, 0.60278], 8221: [0, 0.69444, 0, 0, 0.60278], 8224: [0.19444, 0.69444, 0, 0, 0.51111], 8225: [0.19444, 0.69444, 0, 0, 0.51111], 8242: [0, 0.55556, 0, 0, 0.34444], 8407: [0, 0.72444, 0.15486, 0, 0.575], 8463: [0, 0.69444, 0, 0, 0.66759], 8465: [0, 0.69444, 0, 0, 0.83055], 8467: [0, 0.69444, 0, 0, 0.47361], 8472: [0.19444, 0.44444, 0, 0, 0.74027], 8476: [0, 0.69444, 0, 0, 0.83055], 8501: [0, 0.69444, 0, 0, 0.70277], 8592: [-0.10889, 0.39111, 0, 0, 1.14999], 8593: [0.19444, 0.69444, 0, 0, 0.575], 8594: [-0.10889, 0.39111, 0, 0, 1.14999], 8595: [0.19444, 0.69444, 0, 0, 0.575], 8596: [-0.10889, 0.39111, 0, 0, 1.14999], 8597: [0.25, 0.75, 0, 0, 0.575], 8598: [0.19444, 0.69444, 0, 0, 1.14999], 8599: [0.19444, 0.69444, 0, 0, 1.14999], 8600: [0.19444, 0.69444, 0, 0, 1.14999], 8601: [0.19444, 0.69444, 0, 0, 1.14999], 8636: [-0.10889, 0.39111, 0, 0, 1.14999], 8637: [-0.10889, 0.39111, 0, 0, 1.14999], 8640: [-0.10889, 0.39111, 0, 0, 1.14999], 8641: [-0.10889, 0.39111, 0, 0, 1.14999], 8656: [-0.10889, 0.39111, 0, 0, 1.14999], 8657: [0.19444, 0.69444, 0, 0, 0.70277], 8658: [-0.10889, 0.39111, 0, 0, 1.14999], 8659: [0.19444, 0.69444, 0, 0, 0.70277], 8660: [-0.10889, 0.39111, 0, 0, 1.14999], 8661: [0.25, 0.75, 0, 0, 0.70277], 8704: [0, 0.69444, 0, 0, 0.63889], 8706: [0, 0.69444, 0.06389, 0, 0.62847], 8707: [0, 0.69444, 0, 0, 0.63889], 8709: [0.05556, 0.75, 0, 0, 0.575], 8711: [0, 0.68611, 0, 0, 0.95833], 8712: [0.08556, 0.58556, 0, 0, 0.76666], 8715: [0.08556, 0.58556, 0, 0, 0.76666], 8722: [0.13333, 0.63333, 0, 0, 0.89444], 8723: [0.13333, 0.63333, 0, 0, 0.89444], 8725: [0.25, 0.75, 0, 0, 0.575], 8726: [0.25, 0.75, 0, 0, 0.575], 8727: [-0.02778, 0.47222, 0, 0, 0.575], 8728: [-0.02639, 0.47361, 0, 0, 0.575], 8729: [-0.02639, 0.47361, 0, 0, 0.575], 8730: [0.18, 0.82, 0, 0, 0.95833], 8733: [0, 0.44444, 0, 0, 0.89444], 8734: [0, 0.44444, 0, 0, 1.14999], 8736: [0, 0.69224, 0, 0, 0.72222], 8739: [0.25, 0.75, 0, 0, 0.31944], 8741: [0.25, 0.75, 0, 0, 0.575], 8743: [0, 0.55556, 0, 0, 0.76666], 8744: [0, 0.55556, 0, 0, 0.76666], 8745: [0, 0.55556, 0, 0, 0.76666], 8746: [0, 0.55556, 0, 0, 0.76666], 8747: [0.19444, 0.69444, 0.12778, 0, 0.56875], 8764: [-0.10889, 0.39111, 0, 0, 0.89444], 8768: [0.19444, 0.69444, 0, 0, 0.31944], 8771: [222e-5, 0.50222, 0, 0, 0.89444], 8773: [0.027, 0.638, 0, 0, 0.894], 8776: [0.02444, 0.52444, 0, 0, 0.89444], 8781: [222e-5, 0.50222, 0, 0, 0.89444], 8801: [222e-5, 0.50222, 0, 0, 0.89444], 8804: [0.19667, 0.69667, 0, 0, 0.89444], 8805: [0.19667, 0.69667, 0, 0, 0.89444], 8810: [0.08556, 0.58556, 0, 0, 1.14999], 8811: [0.08556, 0.58556, 0, 0, 1.14999], 8826: [0.08556, 0.58556, 0, 0, 0.89444], 8827: [0.08556, 0.58556, 0, 0, 0.89444], 8834: [0.08556, 0.58556, 0, 0, 0.89444], 8835: [0.08556, 0.58556, 0, 0, 0.89444], 8838: [0.19667, 0.69667, 0, 0, 0.89444], 8839: [0.19667, 0.69667, 0, 0, 0.89444], 8846: [0, 0.55556, 0, 0, 0.76666], 8849: [0.19667, 0.69667, 0, 0, 0.89444], 8850: [0.19667, 0.69667, 0, 0, 0.89444], 8851: [0, 0.55556, 0, 0, 0.76666], 8852: [0, 0.55556, 0, 0, 0.76666], 8853: [0.13333, 0.63333, 0, 0, 0.89444], 8854: [0.13333, 0.63333, 0, 0, 0.89444], 8855: [0.13333, 0.63333, 0, 0, 0.89444], 8856: [0.13333, 0.63333, 0, 0, 0.89444], 8857: [0.13333, 0.63333, 0, 0, 0.89444], 8866: [0, 0.69444, 0, 0, 0.70277], 8867: [0, 0.69444, 0, 0, 0.70277], 8868: [0, 0.69444, 0, 0, 0.89444], 8869: [0, 0.69444, 0, 0, 0.89444], 8900: [-0.02639, 0.47361, 0, 0, 0.575], 8901: [-0.02639, 0.47361, 0, 0, 0.31944], 8902: [-0.02778, 0.47222, 0, 0, 0.575], 8968: [0.25, 0.75, 0, 0, 0.51111], 8969: [0.25, 0.75, 0, 0, 0.51111], 8970: [0.25, 0.75, 0, 0, 0.51111], 8971: [0.25, 0.75, 0, 0, 0.51111], 8994: [-0.13889, 0.36111, 0, 0, 1.14999], 8995: [-0.13889, 0.36111, 0, 0, 1.14999], 9651: [0.19444, 0.69444, 0, 0, 1.02222], 9657: [-0.02778, 0.47222, 0, 0, 0.575], 9661: [0.19444, 0.69444, 0, 0, 1.02222], 9667: [-0.02778, 0.47222, 0, 0, 0.575], 9711: [0.19444, 0.69444, 0, 0, 1.14999], 9824: [0.12963, 0.69444, 0, 0, 0.89444], 9825: [0.12963, 0.69444, 0, 0, 0.89444], 9826: [0.12963, 0.69444, 0, 0, 0.89444], 9827: [0.12963, 0.69444, 0, 0, 0.89444], 9837: [0, 0.75, 0, 0, 0.44722], 9838: [0.19444, 0.69444, 0, 0, 0.44722], 9839: [0.19444, 0.69444, 0, 0, 0.44722], 10216: [0.25, 0.75, 0, 0, 0.44722], 10217: [0.25, 0.75, 0, 0, 0.44722], 10815: [0, 0.68611, 0, 0, 0.9], 10927: [0.19667, 0.69667, 0, 0, 0.89444], 10928: [0.19667, 0.69667, 0, 0, 0.89444], 57376: [0.19444, 0.69444, 0, 0, 0] }, "Main-BoldItalic": { 32: [0, 0, 0, 0, 0.25], 33: [0, 0.69444, 0.11417, 0, 0.38611], 34: [0, 0.69444, 0.07939, 0, 0.62055], 35: [0.19444, 0.69444, 0.06833, 0, 0.94444], 37: [0.05556, 0.75, 0.12861, 0, 0.94444], 38: [0, 0.69444, 0.08528, 0, 0.88555], 39: [0, 0.69444, 0.12945, 0, 0.35555], 40: [0.25, 0.75, 0.15806, 0, 0.47333], 41: [0.25, 0.75, 0.03306, 0, 0.47333], 42: [0, 0.75, 0.14333, 0, 0.59111], 43: [0.10333, 0.60333, 0.03306, 0, 0.88555], 44: [0.19444, 0.14722, 0, 0, 0.35555], 45: [0, 0.44444, 0.02611, 0, 0.41444], 46: [0, 0.14722, 0, 0, 0.35555], 47: [0.25, 0.75, 0.15806, 0, 0.59111], 48: [0, 0.64444, 0.13167, 0, 0.59111], 49: [0, 0.64444, 0.13167, 0, 0.59111], 50: [0, 0.64444, 0.13167, 0, 0.59111], 51: [0, 0.64444, 0.13167, 0, 0.59111], 52: [0.19444, 0.64444, 0.13167, 0, 0.59111], 53: [0, 0.64444, 0.13167, 0, 0.59111], 54: [0, 0.64444, 0.13167, 0, 0.59111], 55: [0.19444, 0.64444, 0.13167, 0, 0.59111], 56: [0, 0.64444, 0.13167, 0, 0.59111], 57: [0, 0.64444, 0.13167, 0, 0.59111], 58: [0, 0.44444, 0.06695, 0, 0.35555], 59: [0.19444, 0.44444, 0.06695, 0, 0.35555], 61: [-0.10889, 0.39111, 0.06833, 0, 0.88555], 63: [0, 0.69444, 0.11472, 0, 0.59111], 64: [0, 0.69444, 0.09208, 0, 0.88555], 65: [0, 0.68611, 0, 0, 0.86555], 66: [0, 0.68611, 0.0992, 0, 0.81666], 67: [0, 0.68611, 0.14208, 0, 0.82666], 68: [0, 0.68611, 0.09062, 0, 0.87555], 69: [0, 0.68611, 0.11431, 0, 0.75666], 70: [0, 0.68611, 0.12903, 0, 0.72722], 71: [0, 0.68611, 0.07347, 0, 0.89527], 72: [0, 0.68611, 0.17208, 0, 0.8961], 73: [0, 0.68611, 0.15681, 0, 0.47166], 74: [0, 0.68611, 0.145, 0, 0.61055], 75: [0, 0.68611, 0.14208, 0, 0.89499], 76: [0, 0.68611, 0, 0, 0.69777], 77: [0, 0.68611, 0.17208, 0, 1.07277], 78: [0, 0.68611, 0.17208, 0, 0.8961], 79: [0, 0.68611, 0.09062, 0, 0.85499], 80: [0, 0.68611, 0.0992, 0, 0.78721], 81: [0.19444, 0.68611, 0.09062, 0, 0.85499], 82: [0, 0.68611, 0.02559, 0, 0.85944], 83: [0, 0.68611, 0.11264, 0, 0.64999], 84: [0, 0.68611, 0.12903, 0, 0.7961], 85: [0, 0.68611, 0.17208, 0, 0.88083], 86: [0, 0.68611, 0.18625, 0, 0.86555], 87: [0, 0.68611, 0.18625, 0, 1.15999], 88: [0, 0.68611, 0.15681, 0, 0.86555], 89: [0, 0.68611, 0.19803, 0, 0.86555], 90: [0, 0.68611, 0.14208, 0, 0.70888], 91: [0.25, 0.75, 0.1875, 0, 0.35611], 93: [0.25, 0.75, 0.09972, 0, 0.35611], 94: [0, 0.69444, 0.06709, 0, 0.59111], 95: [0.31, 0.13444, 0.09811, 0, 0.59111], 97: [0, 0.44444, 0.09426, 0, 0.59111], 98: [0, 0.69444, 0.07861, 0, 0.53222], 99: [0, 0.44444, 0.05222, 0, 0.53222], 100: [0, 0.69444, 0.10861, 0, 0.59111], 101: [0, 0.44444, 0.085, 0, 0.53222], 102: [0.19444, 0.69444, 0.21778, 0, 0.4], 103: [0.19444, 0.44444, 0.105, 0, 0.53222], 104: [0, 0.69444, 0.09426, 0, 0.59111], 105: [0, 0.69326, 0.11387, 0, 0.35555], 106: [0.19444, 0.69326, 0.1672, 0, 0.35555], 107: [0, 0.69444, 0.11111, 0, 0.53222], 108: [0, 0.69444, 0.10861, 0, 0.29666], 109: [0, 0.44444, 0.09426, 0, 0.94444], 110: [0, 0.44444, 0.09426, 0, 0.64999], 111: [0, 0.44444, 0.07861, 0, 0.59111], 112: [0.19444, 0.44444, 0.07861, 0, 0.59111], 113: [0.19444, 0.44444, 0.105, 0, 0.53222], 114: [0, 0.44444, 0.11111, 0, 0.50167], 115: [0, 0.44444, 0.08167, 0, 0.48694], 116: [0, 0.63492, 0.09639, 0, 0.385], 117: [0, 0.44444, 0.09426, 0, 0.62055], 118: [0, 0.44444, 0.11111, 0, 0.53222], 119: [0, 0.44444, 0.11111, 0, 0.76777], 120: [0, 0.44444, 0.12583, 0, 0.56055], 121: [0.19444, 0.44444, 0.105, 0, 0.56166], 122: [0, 0.44444, 0.13889, 0, 0.49055], 126: [0.35, 0.34444, 0.11472, 0, 0.59111], 160: [0, 0, 0, 0, 0.25], 168: [0, 0.69444, 0.11473, 0, 0.59111], 176: [0, 0.69444, 0, 0, 0.94888], 184: [0.17014, 0, 0, 0, 0.53222], 198: [0, 0.68611, 0.11431, 0, 1.02277], 216: [0.04861, 0.73472, 0.09062, 0, 0.88555], 223: [0.19444, 0.69444, 0.09736, 0, 0.665], 230: [0, 0.44444, 0.085, 0, 0.82666], 248: [0.09722, 0.54167, 0.09458, 0, 0.59111], 305: [0, 0.44444, 0.09426, 0, 0.35555], 338: [0, 0.68611, 0.11431, 0, 1.14054], 339: [0, 0.44444, 0.085, 0, 0.82666], 567: [0.19444, 0.44444, 0.04611, 0, 0.385], 710: [0, 0.69444, 0.06709, 0, 0.59111], 711: [0, 0.63194, 0.08271, 0, 0.59111], 713: [0, 0.59444, 0.10444, 0, 0.59111], 714: [0, 0.69444, 0.08528, 0, 0.59111], 715: [0, 0.69444, 0, 0, 0.59111], 728: [0, 0.69444, 0.10333, 0, 0.59111], 729: [0, 0.69444, 0.12945, 0, 0.35555], 730: [0, 0.69444, 0, 0, 0.94888], 732: [0, 0.69444, 0.11472, 0, 0.59111], 733: [0, 0.69444, 0.11472, 0, 0.59111], 915: [0, 0.68611, 0.12903, 0, 0.69777], 916: [0, 0.68611, 0, 0, 0.94444], 920: [0, 0.68611, 0.09062, 0, 0.88555], 923: [0, 0.68611, 0, 0, 0.80666], 926: [0, 0.68611, 0.15092, 0, 0.76777], 928: [0, 0.68611, 0.17208, 0, 0.8961], 931: [0, 0.68611, 0.11431, 0, 0.82666], 933: [0, 0.68611, 0.10778, 0, 0.88555], 934: [0, 0.68611, 0.05632, 0, 0.82666], 936: [0, 0.68611, 0.10778, 0, 0.88555], 937: [0, 0.68611, 0.0992, 0, 0.82666], 8211: [0, 0.44444, 0.09811, 0, 0.59111], 8212: [0, 0.44444, 0.09811, 0, 1.18221], 8216: [0, 0.69444, 0.12945, 0, 0.35555], 8217: [0, 0.69444, 0.12945, 0, 0.35555], 8220: [0, 0.69444, 0.16772, 0, 0.62055], 8221: [0, 0.69444, 0.07939, 0, 0.62055] }, "Main-Italic": { 32: [0, 0, 0, 0, 0.25], 33: [0, 0.69444, 0.12417, 0, 0.30667], 34: [0, 0.69444, 0.06961, 0, 0.51444], 35: [0.19444, 0.69444, 0.06616, 0, 0.81777], 37: [0.05556, 0.75, 0.13639, 0, 0.81777], 38: [0, 0.69444, 0.09694, 0, 0.76666], 39: [0, 0.69444, 0.12417, 0, 0.30667], 40: [0.25, 0.75, 0.16194, 0, 0.40889], 41: [0.25, 0.75, 0.03694, 0, 0.40889], 42: [0, 0.75, 0.14917, 0, 0.51111], 43: [0.05667, 0.56167, 0.03694, 0, 0.76666], 44: [0.19444, 0.10556, 0, 0, 0.30667], 45: [0, 0.43056, 0.02826, 0, 0.35778], 46: [0, 0.10556, 0, 0, 0.30667], 47: [0.25, 0.75, 0.16194, 0, 0.51111], 48: [0, 0.64444, 0.13556, 0, 0.51111], 49: [0, 0.64444, 0.13556, 0, 0.51111], 50: [0, 0.64444, 0.13556, 0, 0.51111], 51: [0, 0.64444, 0.13556, 0, 0.51111], 52: [0.19444, 0.64444, 0.13556, 0, 0.51111], 53: [0, 0.64444, 0.13556, 0, 0.51111], 54: [0, 0.64444, 0.13556, 0, 0.51111], 55: [0.19444, 0.64444, 0.13556, 0, 0.51111], 56: [0, 0.64444, 0.13556, 0, 0.51111], 57: [0, 0.64444, 0.13556, 0, 0.51111], 58: [0, 0.43056, 0.0582, 0, 0.30667], 59: [0.19444, 0.43056, 0.0582, 0, 0.30667], 61: [-0.13313, 0.36687, 0.06616, 0, 0.76666], 63: [0, 0.69444, 0.1225, 0, 0.51111], 64: [0, 0.69444, 0.09597, 0, 0.76666], 65: [0, 0.68333, 0, 0, 0.74333], 66: [0, 0.68333, 0.10257, 0, 0.70389], 67: [0, 0.68333, 0.14528, 0, 0.71555], 68: [0, 0.68333, 0.09403, 0, 0.755], 69: [0, 0.68333, 0.12028, 0, 0.67833], 70: [0, 0.68333, 0.13305, 0, 0.65277], 71: [0, 0.68333, 0.08722, 0, 0.77361], 72: [0, 0.68333, 0.16389, 0, 0.74333], 73: [0, 0.68333, 0.15806, 0, 0.38555], 74: [0, 0.68333, 0.14028, 0, 0.525], 75: [0, 0.68333, 0.14528, 0, 0.76888], 76: [0, 0.68333, 0, 0, 0.62722], 77: [0, 0.68333, 0.16389, 0, 0.89666], 78: [0, 0.68333, 0.16389, 0, 0.74333], 79: [0, 0.68333, 0.09403, 0, 0.76666], 80: [0, 0.68333, 0.10257, 0, 0.67833], 81: [0.19444, 0.68333, 0.09403, 0, 0.76666], 82: [0, 0.68333, 0.03868, 0, 0.72944], 83: [0, 0.68333, 0.11972, 0, 0.56222], 84: [0, 0.68333, 0.13305, 0, 0.71555], 85: [0, 0.68333, 0.16389, 0, 0.74333], 86: [0, 0.68333, 0.18361, 0, 0.74333], 87: [0, 0.68333, 0.18361, 0, 0.99888], 88: [0, 0.68333, 0.15806, 0, 0.74333], 89: [0, 0.68333, 0.19383, 0, 0.74333], 90: [0, 0.68333, 0.14528, 0, 0.61333], 91: [0.25, 0.75, 0.1875, 0, 0.30667], 93: [0.25, 0.75, 0.10528, 0, 0.30667], 94: [0, 0.69444, 0.06646, 0, 0.51111], 95: [0.31, 0.12056, 0.09208, 0, 0.51111], 97: [0, 0.43056, 0.07671, 0, 0.51111], 98: [0, 0.69444, 0.06312, 0, 0.46], 99: [0, 0.43056, 0.05653, 0, 0.46], 100: [0, 0.69444, 0.10333, 0, 0.51111], 101: [0, 0.43056, 0.07514, 0, 0.46], 102: [0.19444, 0.69444, 0.21194, 0, 0.30667], 103: [0.19444, 0.43056, 0.08847, 0, 0.46], 104: [0, 0.69444, 0.07671, 0, 0.51111], 105: [0, 0.65536, 0.1019, 0, 0.30667], 106: [0.19444, 0.65536, 0.14467, 0, 0.30667], 107: [0, 0.69444, 0.10764, 0, 0.46], 108: [0, 0.69444, 0.10333, 0, 0.25555], 109: [0, 0.43056, 0.07671, 0, 0.81777], 110: [0, 0.43056, 0.07671, 0, 0.56222], 111: [0, 0.43056, 0.06312, 0, 0.51111], 112: [0.19444, 0.43056, 0.06312, 0, 0.51111], 113: [0.19444, 0.43056, 0.08847, 0, 0.46], 114: [0, 0.43056, 0.10764, 0, 0.42166], 115: [0, 0.43056, 0.08208, 0, 0.40889], 116: [0, 0.61508, 0.09486, 0, 0.33222], 117: [0, 0.43056, 0.07671, 0, 0.53666], 118: [0, 0.43056, 0.10764, 0, 0.46], 119: [0, 0.43056, 0.10764, 0, 0.66444], 120: [0, 0.43056, 0.12042, 0, 0.46389], 121: [0.19444, 0.43056, 0.08847, 0, 0.48555], 122: [0, 0.43056, 0.12292, 0, 0.40889], 126: [0.35, 0.31786, 0.11585, 0, 0.51111], 160: [0, 0, 0, 0, 0.25], 168: [0, 0.66786, 0.10474, 0, 0.51111], 176: [0, 0.69444, 0, 0, 0.83129], 184: [0.17014, 0, 0, 0, 0.46], 198: [0, 0.68333, 0.12028, 0, 0.88277], 216: [0.04861, 0.73194, 0.09403, 0, 0.76666], 223: [0.19444, 0.69444, 0.10514, 0, 0.53666], 230: [0, 0.43056, 0.07514, 0, 0.71555], 248: [0.09722, 0.52778, 0.09194, 0, 0.51111], 338: [0, 0.68333, 0.12028, 0, 0.98499], 339: [0, 0.43056, 0.07514, 0, 0.71555], 710: [0, 0.69444, 0.06646, 0, 0.51111], 711: [0, 0.62847, 0.08295, 0, 0.51111], 713: [0, 0.56167, 0.10333, 0, 0.51111], 714: [0, 0.69444, 0.09694, 0, 0.51111], 715: [0, 0.69444, 0, 0, 0.51111], 728: [0, 0.69444, 0.10806, 0, 0.51111], 729: [0, 0.66786, 0.11752, 0, 0.30667], 730: [0, 0.69444, 0, 0, 0.83129], 732: [0, 0.66786, 0.11585, 0, 0.51111], 733: [0, 0.69444, 0.1225, 0, 0.51111], 915: [0, 0.68333, 0.13305, 0, 0.62722], 916: [0, 0.68333, 0, 0, 0.81777], 920: [0, 0.68333, 0.09403, 0, 0.76666], 923: [0, 0.68333, 0, 0, 0.69222], 926: [0, 0.68333, 0.15294, 0, 0.66444], 928: [0, 0.68333, 0.16389, 0, 0.74333], 931: [0, 0.68333, 0.12028, 0, 0.71555], 933: [0, 0.68333, 0.11111, 0, 0.76666], 934: [0, 0.68333, 0.05986, 0, 0.71555], 936: [0, 0.68333, 0.11111, 0, 0.76666], 937: [0, 0.68333, 0.10257, 0, 0.71555], 8211: [0, 0.43056, 0.09208, 0, 0.51111], 8212: [0, 0.43056, 0.09208, 0, 1.02222], 8216: [0, 0.69444, 0.12417, 0, 0.30667], 8217: [0, 0.69444, 0.12417, 0, 0.30667], 8220: [0, 0.69444, 0.1685, 0, 0.51444], 8221: [0, 0.69444, 0.06961, 0, 0.51444], 8463: [0, 0.68889, 0, 0, 0.54028] }, "Main-Regular": { 32: [0, 0, 0, 0, 0.25], 33: [0, 0.69444, 0, 0, 0.27778], 34: [0, 0.69444, 0, 0, 0.5], 35: [0.19444, 0.69444, 0, 0, 0.83334], 36: [0.05556, 0.75, 0, 0, 0.5], 37: [0.05556, 0.75, 0, 0, 0.83334], 38: [0, 0.69444, 0, 0, 0.77778], 39: [0, 0.69444, 0, 0, 0.27778], 40: [0.25, 0.75, 0, 0, 0.38889], 41: [0.25, 0.75, 0, 0, 0.38889], 42: [0, 0.75, 0, 0, 0.5], 43: [0.08333, 0.58333, 0, 0, 0.77778], 44: [0.19444, 0.10556, 0, 0, 0.27778], 45: [0, 0.43056, 0, 0, 0.33333], 46: [0, 0.10556, 0, 0, 0.27778], 47: [0.25, 0.75, 0, 0, 0.5], 48: [0, 0.64444, 0, 0, 0.5], 49: [0, 0.64444, 0, 0, 0.5], 50: [0, 0.64444, 0, 0, 0.5], 51: [0, 0.64444, 0, 0, 0.5], 52: [0, 0.64444, 0, 0, 0.5], 53: [0, 0.64444, 0, 0, 0.5], 54: [0, 0.64444, 0, 0, 0.5], 55: [0, 0.64444, 0, 0, 0.5], 56: [0, 0.64444, 0, 0, 0.5], 57: [0, 0.64444, 0, 0, 0.5], 58: [0, 0.43056, 0, 0, 0.27778], 59: [0.19444, 0.43056, 0, 0, 0.27778], 60: [0.0391, 0.5391, 0, 0, 0.77778], 61: [-0.13313, 0.36687, 0, 0, 0.77778], 62: [0.0391, 0.5391, 0, 0, 0.77778], 63: [0, 0.69444, 0, 0, 0.47222], 64: [0, 0.69444, 0, 0, 0.77778], 65: [0, 0.68333, 0, 0, 0.75], 66: [0, 0.68333, 0, 0, 0.70834], 67: [0, 0.68333, 0, 0, 0.72222], 68: [0, 0.68333, 0, 0, 0.76389], 69: [0, 0.68333, 0, 0, 0.68056], 70: [0, 0.68333, 0, 0, 0.65278], 71: [0, 0.68333, 0, 0, 0.78472], 72: [0, 0.68333, 0, 0, 0.75], 73: [0, 0.68333, 0, 0, 0.36111], 74: [0, 0.68333, 0, 0, 0.51389], 75: [0, 0.68333, 0, 0, 0.77778], 76: [0, 0.68333, 0, 0, 0.625], 77: [0, 0.68333, 0, 0, 0.91667], 78: [0, 0.68333, 0, 0, 0.75], 79: [0, 0.68333, 0, 0, 0.77778], 80: [0, 0.68333, 0, 0, 0.68056], 81: [0.19444, 0.68333, 0, 0, 0.77778], 82: [0, 0.68333, 0, 0, 0.73611], 83: [0, 0.68333, 0, 0, 0.55556], 84: [0, 0.68333, 0, 0, 0.72222], 85: [0, 0.68333, 0, 0, 0.75], 86: [0, 0.68333, 0.01389, 0, 0.75], 87: [0, 0.68333, 0.01389, 0, 1.02778], 88: [0, 0.68333, 0, 0, 0.75], 89: [0, 0.68333, 0.025, 0, 0.75], 90: [0, 0.68333, 0, 0, 0.61111], 91: [0.25, 0.75, 0, 0, 0.27778], 92: [0.25, 0.75, 0, 0, 0.5], 93: [0.25, 0.75, 0, 0, 0.27778], 94: [0, 0.69444, 0, 0, 0.5], 95: [0.31, 0.12056, 0.02778, 0, 0.5], 97: [0, 0.43056, 0, 0, 0.5], 98: [0, 0.69444, 0, 0, 0.55556], 99: [0, 0.43056, 0, 0, 0.44445], 100: [0, 0.69444, 0, 0, 0.55556], 101: [0, 0.43056, 0, 0, 0.44445], 102: [0, 0.69444, 0.07778, 0, 0.30556], 103: [0.19444, 0.43056, 0.01389, 0, 0.5], 104: [0, 0.69444, 0, 0, 0.55556], 105: [0, 0.66786, 0, 0, 0.27778], 106: [0.19444, 0.66786, 0, 0, 0.30556], 107: [0, 0.69444, 0, 0, 0.52778], 108: [0, 0.69444, 0, 0, 0.27778], 109: [0, 0.43056, 0, 0, 0.83334], 110: [0, 0.43056, 0, 0, 0.55556], 111: [0, 0.43056, 0, 0, 0.5], 112: [0.19444, 0.43056, 0, 0, 0.55556], 113: [0.19444, 0.43056, 0, 0, 0.52778], 114: [0, 0.43056, 0, 0, 0.39167], 115: [0, 0.43056, 0, 0, 0.39445], 116: [0, 0.61508, 0, 0, 0.38889], 117: [0, 0.43056, 0, 0, 0.55556], 118: [0, 0.43056, 0.01389, 0, 0.52778], 119: [0, 0.43056, 0.01389, 0, 0.72222], 120: [0, 0.43056, 0, 0, 0.52778], 121: [0.19444, 0.43056, 0.01389, 0, 0.52778], 122: [0, 0.43056, 0, 0, 0.44445], 123: [0.25, 0.75, 0, 0, 0.5], 124: [0.25, 0.75, 0, 0, 0.27778], 125: [0.25, 0.75, 0, 0, 0.5], 126: [0.35, 0.31786, 0, 0, 0.5], 160: [0, 0, 0, 0, 0.25], 163: [0, 0.69444, 0, 0, 0.76909], 167: [0.19444, 0.69444, 0, 0, 0.44445], 168: [0, 0.66786, 0, 0, 0.5], 172: [0, 0.43056, 0, 0, 0.66667], 176: [0, 0.69444, 0, 0, 0.75], 177: [0.08333, 0.58333, 0, 0, 0.77778], 182: [0.19444, 0.69444, 0, 0, 0.61111], 184: [0.17014, 0, 0, 0, 0.44445], 198: [0, 0.68333, 0, 0, 0.90278], 215: [0.08333, 0.58333, 0, 0, 0.77778], 216: [0.04861, 0.73194, 0, 0, 0.77778], 223: [0, 0.69444, 0, 0, 0.5], 230: [0, 0.43056, 0, 0, 0.72222], 247: [0.08333, 0.58333, 0, 0, 0.77778], 248: [0.09722, 0.52778, 0, 0, 0.5], 305: [0, 0.43056, 0, 0, 0.27778], 338: [0, 0.68333, 0, 0, 1.01389], 339: [0, 0.43056, 0, 0, 0.77778], 567: [0.19444, 0.43056, 0, 0, 0.30556], 710: [0, 0.69444, 0, 0, 0.5], 711: [0, 0.62847, 0, 0, 0.5], 713: [0, 0.56778, 0, 0, 0.5], 714: [0, 0.69444, 0, 0, 0.5], 715: [0, 0.69444, 0, 0, 0.5], 728: [0, 0.69444, 0, 0, 0.5], 729: [0, 0.66786, 0, 0, 0.27778], 730: [0, 0.69444, 0, 0, 0.75], 732: [0, 0.66786, 0, 0, 0.5], 733: [0, 0.69444, 0, 0, 0.5], 915: [0, 0.68333, 0, 0, 0.625], 916: [0, 0.68333, 0, 0, 0.83334], 920: [0, 0.68333, 0, 0, 0.77778], 923: [0, 0.68333, 0, 0, 0.69445], 926: [0, 0.68333, 0, 0, 0.66667], 928: [0, 0.68333, 0, 0, 0.75], 931: [0, 0.68333, 0, 0, 0.72222], 933: [0, 0.68333, 0, 0, 0.77778], 934: [0, 0.68333, 0, 0, 0.72222], 936: [0, 0.68333, 0, 0, 0.77778], 937: [0, 0.68333, 0, 0, 0.72222], 8211: [0, 0.43056, 0.02778, 0, 0.5], 8212: [0, 0.43056, 0.02778, 0, 1], 8216: [0, 0.69444, 0, 0, 0.27778], 8217: [0, 0.69444, 0, 0, 0.27778], 8220: [0, 0.69444, 0, 0, 0.5], 8221: [0, 0.69444, 0, 0, 0.5], 8224: [0.19444, 0.69444, 0, 0, 0.44445], 8225: [0.19444, 0.69444, 0, 0, 0.44445], 8230: [0, 0.123, 0, 0, 1.172], 8242: [0, 0.55556, 0, 0, 0.275], 8407: [0, 0.71444, 0.15382, 0, 0.5], 8463: [0, 0.68889, 0, 0, 0.54028], 8465: [0, 0.69444, 0, 0, 0.72222], 8467: [0, 0.69444, 0, 0.11111, 0.41667], 8472: [0.19444, 0.43056, 0, 0.11111, 0.63646], 8476: [0, 0.69444, 0, 0, 0.72222], 8501: [0, 0.69444, 0, 0, 0.61111], 8592: [-0.13313, 0.36687, 0, 0, 1], 8593: [0.19444, 0.69444, 0, 0, 0.5], 8594: [-0.13313, 0.36687, 0, 0, 1], 8595: [0.19444, 0.69444, 0, 0, 0.5], 8596: [-0.13313, 0.36687, 0, 0, 1], 8597: [0.25, 0.75, 0, 0, 0.5], 8598: [0.19444, 0.69444, 0, 0, 1], 8599: [0.19444, 0.69444, 0, 0, 1], 8600: [0.19444, 0.69444, 0, 0, 1], 8601: [0.19444, 0.69444, 0, 0, 1], 8614: [0.011, 0.511, 0, 0, 1], 8617: [0.011, 0.511, 0, 0, 1.126], 8618: [0.011, 0.511, 0, 0, 1.126], 8636: [-0.13313, 0.36687, 0, 0, 1], 8637: [-0.13313, 0.36687, 0, 0, 1], 8640: [-0.13313, 0.36687, 0, 0, 1], 8641: [-0.13313, 0.36687, 0, 0, 1], 8652: [0.011, 0.671, 0, 0, 1], 8656: [-0.13313, 0.36687, 0, 0, 1], 8657: [0.19444, 0.69444, 0, 0, 0.61111], 8658: [-0.13313, 0.36687, 0, 0, 1], 8659: [0.19444, 0.69444, 0, 0, 0.61111], 8660: [-0.13313, 0.36687, 0, 0, 1], 8661: [0.25, 0.75, 0, 0, 0.61111], 8704: [0, 0.69444, 0, 0, 0.55556], 8706: [0, 0.69444, 0.05556, 0.08334, 0.5309], 8707: [0, 0.69444, 0, 0, 0.55556], 8709: [0.05556, 0.75, 0, 0, 0.5], 8711: [0, 0.68333, 0, 0, 0.83334], 8712: [0.0391, 0.5391, 0, 0, 0.66667], 8715: [0.0391, 0.5391, 0, 0, 0.66667], 8722: [0.08333, 0.58333, 0, 0, 0.77778], 8723: [0.08333, 0.58333, 0, 0, 0.77778], 8725: [0.25, 0.75, 0, 0, 0.5], 8726: [0.25, 0.75, 0, 0, 0.5], 8727: [-0.03472, 0.46528, 0, 0, 0.5], 8728: [-0.05555, 0.44445, 0, 0, 0.5], 8729: [-0.05555, 0.44445, 0, 0, 0.5], 8730: [0.2, 0.8, 0, 0, 0.83334], 8733: [0, 0.43056, 0, 0, 0.77778], 8734: [0, 0.43056, 0, 0, 1], 8736: [0, 0.69224, 0, 0, 0.72222], 8739: [0.25, 0.75, 0, 0, 0.27778], 8741: [0.25, 0.75, 0, 0, 0.5], 8743: [0, 0.55556, 0, 0, 0.66667], 8744: [0, 0.55556, 0, 0, 0.66667], 8745: [0, 0.55556, 0, 0, 0.66667], 8746: [0, 0.55556, 0, 0, 0.66667], 8747: [0.19444, 0.69444, 0.11111, 0, 0.41667], 8764: [-0.13313, 0.36687, 0, 0, 0.77778], 8768: [0.19444, 0.69444, 0, 0, 0.27778], 8771: [-0.03625, 0.46375, 0, 0, 0.77778], 8773: [-0.022, 0.589, 0, 0, 0.778], 8776: [-0.01688, 0.48312, 0, 0, 0.77778], 8781: [-0.03625, 0.46375, 0, 0, 0.77778], 8784: [-0.133, 0.673, 0, 0, 0.778], 8801: [-0.03625, 0.46375, 0, 0, 0.77778], 8804: [0.13597, 0.63597, 0, 0, 0.77778], 8805: [0.13597, 0.63597, 0, 0, 0.77778], 8810: [0.0391, 0.5391, 0, 0, 1], 8811: [0.0391, 0.5391, 0, 0, 1], 8826: [0.0391, 0.5391, 0, 0, 0.77778], 8827: [0.0391, 0.5391, 0, 0, 0.77778], 8834: [0.0391, 0.5391, 0, 0, 0.77778], 8835: [0.0391, 0.5391, 0, 0, 0.77778], 8838: [0.13597, 0.63597, 0, 0, 0.77778], 8839: [0.13597, 0.63597, 0, 0, 0.77778], 8846: [0, 0.55556, 0, 0, 0.66667], 8849: [0.13597, 0.63597, 0, 0, 0.77778], 8850: [0.13597, 0.63597, 0, 0, 0.77778], 8851: [0, 0.55556, 0, 0, 0.66667], 8852: [0, 0.55556, 0, 0, 0.66667], 8853: [0.08333, 0.58333, 0, 0, 0.77778], 8854: [0.08333, 0.58333, 0, 0, 0.77778], 8855: [0.08333, 0.58333, 0, 0, 0.77778], 8856: [0.08333, 0.58333, 0, 0, 0.77778], 8857: [0.08333, 0.58333, 0, 0, 0.77778], 8866: [0, 0.69444, 0, 0, 0.61111], 8867: [0, 0.69444, 0, 0, 0.61111], 8868: [0, 0.69444, 0, 0, 0.77778], 8869: [0, 0.69444, 0, 0, 0.77778], 8872: [0.249, 0.75, 0, 0, 0.867], 8900: [-0.05555, 0.44445, 0, 0, 0.5], 8901: [-0.05555, 0.44445, 0, 0, 0.27778], 8902: [-0.03472, 0.46528, 0, 0, 0.5], 8904: [5e-3, 0.505, 0, 0, 0.9], 8942: [0.03, 0.903, 0, 0, 0.278], 8943: [-0.19, 0.313, 0, 0, 1.172], 8945: [-0.1, 0.823, 0, 0, 1.282], 8968: [0.25, 0.75, 0, 0, 0.44445], 8969: [0.25, 0.75, 0, 0, 0.44445], 8970: [0.25, 0.75, 0, 0, 0.44445], 8971: [0.25, 0.75, 0, 0, 0.44445], 8994: [-0.14236, 0.35764, 0, 0, 1], 8995: [-0.14236, 0.35764, 0, 0, 1], 9136: [0.244, 0.744, 0, 0, 0.412], 9137: [0.244, 0.745, 0, 0, 0.412], 9651: [0.19444, 0.69444, 0, 0, 0.88889], 9657: [-0.03472, 0.46528, 0, 0, 0.5], 9661: [0.19444, 0.69444, 0, 0, 0.88889], 9667: [-0.03472, 0.46528, 0, 0, 0.5], 9711: [0.19444, 0.69444, 0, 0, 1], 9824: [0.12963, 0.69444, 0, 0, 0.77778], 9825: [0.12963, 0.69444, 0, 0, 0.77778], 9826: [0.12963, 0.69444, 0, 0, 0.77778], 9827: [0.12963, 0.69444, 0, 0, 0.77778], 9837: [0, 0.75, 0, 0, 0.38889], 9838: [0.19444, 0.69444, 0, 0, 0.38889], 9839: [0.19444, 0.69444, 0, 0, 0.38889], 10216: [0.25, 0.75, 0, 0, 0.38889], 10217: [0.25, 0.75, 0, 0, 0.38889], 10222: [0.244, 0.744, 0, 0, 0.412], 10223: [0.244, 0.745, 0, 0, 0.412], 10229: [0.011, 0.511, 0, 0, 1.609], 10230: [0.011, 0.511, 0, 0, 1.638], 10231: [0.011, 0.511, 0, 0, 1.859], 10232: [0.024, 0.525, 0, 0, 1.609], 10233: [0.024, 0.525, 0, 0, 1.638], 10234: [0.024, 0.525, 0, 0, 1.858], 10236: [0.011, 0.511, 0, 0, 1.638], 10815: [0, 0.68333, 0, 0, 0.75], 10927: [0.13597, 0.63597, 0, 0, 0.77778], 10928: [0.13597, 0.63597, 0, 0, 0.77778], 57376: [0.19444, 0.69444, 0, 0, 0] }, "Math-BoldItalic": { 32: [0, 0, 0, 0, 0.25], 48: [0, 0.44444, 0, 0, 0.575], 49: [0, 0.44444, 0, 0, 0.575], 50: [0, 0.44444, 0, 0, 0.575], 51: [0.19444, 0.44444, 0, 0, 0.575], 52: [0.19444, 0.44444, 0, 0, 0.575], 53: [0.19444, 0.44444, 0, 0, 0.575], 54: [0, 0.64444, 0, 0, 0.575], 55: [0.19444, 0.44444, 0, 0, 0.575], 56: [0, 0.64444, 0, 0, 0.575], 57: [0.19444, 0.44444, 0, 0, 0.575], 65: [0, 0.68611, 0, 0, 0.86944], 66: [0, 0.68611, 0.04835, 0, 0.8664], 67: [0, 0.68611, 0.06979, 0, 0.81694], 68: [0, 0.68611, 0.03194, 0, 0.93812], 69: [0, 0.68611, 0.05451, 0, 0.81007], 70: [0, 0.68611, 0.15972, 0, 0.68889], 71: [0, 0.68611, 0, 0, 0.88673], 72: [0, 0.68611, 0.08229, 0, 0.98229], 73: [0, 0.68611, 0.07778, 0, 0.51111], 74: [0, 0.68611, 0.10069, 0, 0.63125], 75: [0, 0.68611, 0.06979, 0, 0.97118], 76: [0, 0.68611, 0, 0, 0.75555], 77: [0, 0.68611, 0.11424, 0, 1.14201], 78: [0, 0.68611, 0.11424, 0, 0.95034], 79: [0, 0.68611, 0.03194, 0, 0.83666], 80: [0, 0.68611, 0.15972, 0, 0.72309], 81: [0.19444, 0.68611, 0, 0, 0.86861], 82: [0, 0.68611, 421e-5, 0, 0.87235], 83: [0, 0.68611, 0.05382, 0, 0.69271], 84: [0, 0.68611, 0.15972, 0, 0.63663], 85: [0, 0.68611, 0.11424, 0, 0.80027], 86: [0, 0.68611, 0.25555, 0, 0.67778], 87: [0, 0.68611, 0.15972, 0, 1.09305], 88: [0, 0.68611, 0.07778, 0, 0.94722], 89: [0, 0.68611, 0.25555, 0, 0.67458], 90: [0, 0.68611, 0.06979, 0, 0.77257], 97: [0, 0.44444, 0, 0, 0.63287], 98: [0, 0.69444, 0, 0, 0.52083], 99: [0, 0.44444, 0, 0, 0.51342], 100: [0, 0.69444, 0, 0, 0.60972], 101: [0, 0.44444, 0, 0, 0.55361], 102: [0.19444, 0.69444, 0.11042, 0, 0.56806], 103: [0.19444, 0.44444, 0.03704, 0, 0.5449], 104: [0, 0.69444, 0, 0, 0.66759], 105: [0, 0.69326, 0, 0, 0.4048], 106: [0.19444, 0.69326, 0.0622, 0, 0.47083], 107: [0, 0.69444, 0.01852, 0, 0.6037], 108: [0, 0.69444, 88e-4, 0, 0.34815], 109: [0, 0.44444, 0, 0, 1.0324], 110: [0, 0.44444, 0, 0, 0.71296], 111: [0, 0.44444, 0, 0, 0.58472], 112: [0.19444, 0.44444, 0, 0, 0.60092], 113: [0.19444, 0.44444, 0.03704, 0, 0.54213], 114: [0, 0.44444, 0.03194, 0, 0.5287], 115: [0, 0.44444, 0, 0, 0.53125], 116: [0, 0.63492, 0, 0, 0.41528], 117: [0, 0.44444, 0, 0, 0.68102], 118: [0, 0.44444, 0.03704, 0, 0.56666], 119: [0, 0.44444, 0.02778, 0, 0.83148], 120: [0, 0.44444, 0, 0, 0.65903], 121: [0.19444, 0.44444, 0.03704, 0, 0.59028], 122: [0, 0.44444, 0.04213, 0, 0.55509], 160: [0, 0, 0, 0, 0.25], 915: [0, 0.68611, 0.15972, 0, 0.65694], 916: [0, 0.68611, 0, 0, 0.95833], 920: [0, 0.68611, 0.03194, 0, 0.86722], 923: [0, 0.68611, 0, 0, 0.80555], 926: [0, 0.68611, 0.07458, 0, 0.84125], 928: [0, 0.68611, 0.08229, 0, 0.98229], 931: [0, 0.68611, 0.05451, 0, 0.88507], 933: [0, 0.68611, 0.15972, 0, 0.67083], 934: [0, 0.68611, 0, 0, 0.76666], 936: [0, 0.68611, 0.11653, 0, 0.71402], 937: [0, 0.68611, 0.04835, 0, 0.8789], 945: [0, 0.44444, 0, 0, 0.76064], 946: [0.19444, 0.69444, 0.03403, 0, 0.65972], 947: [0.19444, 0.44444, 0.06389, 0, 0.59003], 948: [0, 0.69444, 0.03819, 0, 0.52222], 949: [0, 0.44444, 0, 0, 0.52882], 950: [0.19444, 0.69444, 0.06215, 0, 0.50833], 951: [0.19444, 0.44444, 0.03704, 0, 0.6], 952: [0, 0.69444, 0.03194, 0, 0.5618], 953: [0, 0.44444, 0, 0, 0.41204], 954: [0, 0.44444, 0, 0, 0.66759], 955: [0, 0.69444, 0, 0, 0.67083], 956: [0.19444, 0.44444, 0, 0, 0.70787], 957: [0, 0.44444, 0.06898, 0, 0.57685], 958: [0.19444, 0.69444, 0.03021, 0, 0.50833], 959: [0, 0.44444, 0, 0, 0.58472], 960: [0, 0.44444, 0.03704, 0, 0.68241], 961: [0.19444, 0.44444, 0, 0, 0.6118], 962: [0.09722, 0.44444, 0.07917, 0, 0.42361], 963: [0, 0.44444, 0.03704, 0, 0.68588], 964: [0, 0.44444, 0.13472, 0, 0.52083], 965: [0, 0.44444, 0.03704, 0, 0.63055], 966: [0.19444, 0.44444, 0, 0, 0.74722], 967: [0.19444, 0.44444, 0, 0, 0.71805], 968: [0.19444, 0.69444, 0.03704, 0, 0.75833], 969: [0, 0.44444, 0.03704, 0, 0.71782], 977: [0, 0.69444, 0, 0, 0.69155], 981: [0.19444, 0.69444, 0, 0, 0.7125], 982: [0, 0.44444, 0.03194, 0, 0.975], 1009: [0.19444, 0.44444, 0, 0, 0.6118], 1013: [0, 0.44444, 0, 0, 0.48333], 57649: [0, 0.44444, 0, 0, 0.39352], 57911: [0.19444, 0.44444, 0, 0, 0.43889] }, "Math-Italic": { 32: [0, 0, 0, 0, 0.25], 48: [0, 0.43056, 0, 0, 0.5], 49: [0, 0.43056, 0, 0, 0.5], 50: [0, 0.43056, 0, 0, 0.5], 51: [0.19444, 0.43056, 0, 0, 0.5], 52: [0.19444, 0.43056, 0, 0, 0.5], 53: [0.19444, 0.43056, 0, 0, 0.5], 54: [0, 0.64444, 0, 0, 0.5], 55: [0.19444, 0.43056, 0, 0, 0.5], 56: [0, 0.64444, 0, 0, 0.5], 57: [0.19444, 0.43056, 0, 0, 0.5], 65: [0, 0.68333, 0, 0.13889, 0.75], 66: [0, 0.68333, 0.05017, 0.08334, 0.75851], 67: [0, 0.68333, 0.07153, 0.08334, 0.71472], 68: [0, 0.68333, 0.02778, 0.05556, 0.82792], 69: [0, 0.68333, 0.05764, 0.08334, 0.7382], 70: [0, 0.68333, 0.13889, 0.08334, 0.64306], 71: [0, 0.68333, 0, 0.08334, 0.78625], 72: [0, 0.68333, 0.08125, 0.05556, 0.83125], 73: [0, 0.68333, 0.07847, 0.11111, 0.43958], 74: [0, 0.68333, 0.09618, 0.16667, 0.55451], 75: [0, 0.68333, 0.07153, 0.05556, 0.84931], 76: [0, 0.68333, 0, 0.02778, 0.68056], 77: [0, 0.68333, 0.10903, 0.08334, 0.97014], 78: [0, 0.68333, 0.10903, 0.08334, 0.80347], 79: [0, 0.68333, 0.02778, 0.08334, 0.76278], 80: [0, 0.68333, 0.13889, 0.08334, 0.64201], 81: [0.19444, 0.68333, 0, 0.08334, 0.79056], 82: [0, 0.68333, 773e-5, 0.08334, 0.75929], 83: [0, 0.68333, 0.05764, 0.08334, 0.6132], 84: [0, 0.68333, 0.13889, 0.08334, 0.58438], 85: [0, 0.68333, 0.10903, 0.02778, 0.68278], 86: [0, 0.68333, 0.22222, 0, 0.58333], 87: [0, 0.68333, 0.13889, 0, 0.94445], 88: [0, 0.68333, 0.07847, 0.08334, 0.82847], 89: [0, 0.68333, 0.22222, 0, 0.58056], 90: [0, 0.68333, 0.07153, 0.08334, 0.68264], 97: [0, 0.43056, 0, 0, 0.52859], 98: [0, 0.69444, 0, 0, 0.42917], 99: [0, 0.43056, 0, 0.05556, 0.43276], 100: [0, 0.69444, 0, 0.16667, 0.52049], 101: [0, 0.43056, 0, 0.05556, 0.46563], 102: [0.19444, 0.69444, 0.10764, 0.16667, 0.48959], 103: [0.19444, 0.43056, 0.03588, 0.02778, 0.47697], 104: [0, 0.69444, 0, 0, 0.57616], 105: [0, 0.65952, 0, 0, 0.34451], 106: [0.19444, 0.65952, 0.05724, 0, 0.41181], 107: [0, 0.69444, 0.03148, 0, 0.5206], 108: [0, 0.69444, 0.01968, 0.08334, 0.29838], 109: [0, 0.43056, 0, 0, 0.87801], 110: [0, 0.43056, 0, 0, 0.60023], 111: [0, 0.43056, 0, 0.05556, 0.48472], 112: [0.19444, 0.43056, 0, 0.08334, 0.50313], 113: [0.19444, 0.43056, 0.03588, 0.08334, 0.44641], 114: [0, 0.43056, 0.02778, 0.05556, 0.45116], 115: [0, 0.43056, 0, 0.05556, 0.46875], 116: [0, 0.61508, 0, 0.08334, 0.36111], 117: [0, 0.43056, 0, 0.02778, 0.57246], 118: [0, 0.43056, 0.03588, 0.02778, 0.48472], 119: [0, 0.43056, 0.02691, 0.08334, 0.71592], 120: [0, 0.43056, 0, 0.02778, 0.57153], 121: [0.19444, 0.43056, 0.03588, 0.05556, 0.49028], 122: [0, 0.43056, 0.04398, 0.05556, 0.46505], 160: [0, 0, 0, 0, 0.25], 915: [0, 0.68333, 0.13889, 0.08334, 0.61528], 916: [0, 0.68333, 0, 0.16667, 0.83334], 920: [0, 0.68333, 0.02778, 0.08334, 0.76278], 923: [0, 0.68333, 0, 0.16667, 0.69445], 926: [0, 0.68333, 0.07569, 0.08334, 0.74236], 928: [0, 0.68333, 0.08125, 0.05556, 0.83125], 931: [0, 0.68333, 0.05764, 0.08334, 0.77986], 933: [0, 0.68333, 0.13889, 0.05556, 0.58333], 934: [0, 0.68333, 0, 0.08334, 0.66667], 936: [0, 0.68333, 0.11, 0.05556, 0.61222], 937: [0, 0.68333, 0.05017, 0.08334, 0.7724], 945: [0, 0.43056, 37e-4, 0.02778, 0.6397], 946: [0.19444, 0.69444, 0.05278, 0.08334, 0.56563], 947: [0.19444, 0.43056, 0.05556, 0, 0.51773], 948: [0, 0.69444, 0.03785, 0.05556, 0.44444], 949: [0, 0.43056, 0, 0.08334, 0.46632], 950: [0.19444, 0.69444, 0.07378, 0.08334, 0.4375], 951: [0.19444, 0.43056, 0.03588, 0.05556, 0.49653], 952: [0, 0.69444, 0.02778, 0.08334, 0.46944], 953: [0, 0.43056, 0, 0.05556, 0.35394], 954: [0, 0.43056, 0, 0, 0.57616], 955: [0, 0.69444, 0, 0, 0.58334], 956: [0.19444, 0.43056, 0, 0.02778, 0.60255], 957: [0, 0.43056, 0.06366, 0.02778, 0.49398], 958: [0.19444, 0.69444, 0.04601, 0.11111, 0.4375], 959: [0, 0.43056, 0, 0.05556, 0.48472], 960: [0, 0.43056, 0.03588, 0, 0.57003], 961: [0.19444, 0.43056, 0, 0.08334, 0.51702], 962: [0.09722, 0.43056, 0.07986, 0.08334, 0.36285], 963: [0, 0.43056, 0.03588, 0, 0.57141], 964: [0, 0.43056, 0.1132, 0.02778, 0.43715], 965: [0, 0.43056, 0.03588, 0.02778, 0.54028], 966: [0.19444, 0.43056, 0, 0.08334, 0.65417], 967: [0.19444, 0.43056, 0, 0.05556, 0.62569], 968: [0.19444, 0.69444, 0.03588, 0.11111, 0.65139], 969: [0, 0.43056, 0.03588, 0, 0.62245], 977: [0, 0.69444, 0, 0.08334, 0.59144], 981: [0.19444, 0.69444, 0, 0.08334, 0.59583], 982: [0, 0.43056, 0.02778, 0, 0.82813], 1009: [0.19444, 0.43056, 0, 0.08334, 0.51702], 1013: [0, 0.43056, 0, 0.05556, 0.4059], 57649: [0, 0.43056, 0, 0.02778, 0.32246], 57911: [0.19444, 0.43056, 0, 0.08334, 0.38403] }, "SansSerif-Bold": { 32: [0, 0, 0, 0, 0.25], 33: [0, 0.69444, 0, 0, 0.36667], 34: [0, 0.69444, 0, 0, 0.55834], 35: [0.19444, 0.69444, 0, 0, 0.91667], 36: [0.05556, 0.75, 0, 0, 0.55], 37: [0.05556, 0.75, 0, 0, 1.02912], 38: [0, 0.69444, 0, 0, 0.83056], 39: [0, 0.69444, 0, 0, 0.30556], 40: [0.25, 0.75, 0, 0, 0.42778], 41: [0.25, 0.75, 0, 0, 0.42778], 42: [0, 0.75, 0, 0, 0.55], 43: [0.11667, 0.61667, 0, 0, 0.85556], 44: [0.10556, 0.13056, 0, 0, 0.30556], 45: [0, 0.45833, 0, 0, 0.36667], 46: [0, 0.13056, 0, 0, 0.30556], 47: [0.25, 0.75, 0, 0, 0.55], 48: [0, 0.69444, 0, 0, 0.55], 49: [0, 0.69444, 0, 0, 0.55], 50: [0, 0.69444, 0, 0, 0.55], 51: [0, 0.69444, 0, 0, 0.55], 52: [0, 0.69444, 0, 0, 0.55], 53: [0, 0.69444, 0, 0, 0.55], 54: [0, 0.69444, 0, 0, 0.55], 55: [0, 0.69444, 0, 0, 0.55], 56: [0, 0.69444, 0, 0, 0.55], 57: [0, 0.69444, 0, 0, 0.55], 58: [0, 0.45833, 0, 0, 0.30556], 59: [0.10556, 0.45833, 0, 0, 0.30556], 61: [-0.09375, 0.40625, 0, 0, 0.85556], 63: [0, 0.69444, 0, 0, 0.51945], 64: [0, 0.69444, 0, 0, 0.73334], 65: [0, 0.69444, 0, 0, 0.73334], 66: [0, 0.69444, 0, 0, 0.73334], 67: [0, 0.69444, 0, 0, 0.70278], 68: [0, 0.69444, 0, 0, 0.79445], 69: [0, 0.69444, 0, 0, 0.64167], 70: [0, 0.69444, 0, 0, 0.61111], 71: [0, 0.69444, 0, 0, 0.73334], 72: [0, 0.69444, 0, 0, 0.79445], 73: [0, 0.69444, 0, 0, 0.33056], 74: [0, 0.69444, 0, 0, 0.51945], 75: [0, 0.69444, 0, 0, 0.76389], 76: [0, 0.69444, 0, 0, 0.58056], 77: [0, 0.69444, 0, 0, 0.97778], 78: [0, 0.69444, 0, 0, 0.79445], 79: [0, 0.69444, 0, 0, 0.79445], 80: [0, 0.69444, 0, 0, 0.70278], 81: [0.10556, 0.69444, 0, 0, 0.79445], 82: [0, 0.69444, 0, 0, 0.70278], 83: [0, 0.69444, 0, 0, 0.61111], 84: [0, 0.69444, 0, 0, 0.73334], 85: [0, 0.69444, 0, 0, 0.76389], 86: [0, 0.69444, 0.01528, 0, 0.73334], 87: [0, 0.69444, 0.01528, 0, 1.03889], 88: [0, 0.69444, 0, 0, 0.73334], 89: [0, 0.69444, 0.0275, 0, 0.73334], 90: [0, 0.69444, 0, 0, 0.67223], 91: [0.25, 0.75, 0, 0, 0.34306], 93: [0.25, 0.75, 0, 0, 0.34306], 94: [0, 0.69444, 0, 0, 0.55], 95: [0.35, 0.10833, 0.03056, 0, 0.55], 97: [0, 0.45833, 0, 0, 0.525], 98: [0, 0.69444, 0, 0, 0.56111], 99: [0, 0.45833, 0, 0, 0.48889], 100: [0, 0.69444, 0, 0, 0.56111], 101: [0, 0.45833, 0, 0, 0.51111], 102: [0, 0.69444, 0.07639, 0, 0.33611], 103: [0.19444, 0.45833, 0.01528, 0, 0.55], 104: [0, 0.69444, 0, 0, 0.56111], 105: [0, 0.69444, 0, 0, 0.25556], 106: [0.19444, 0.69444, 0, 0, 0.28611], 107: [0, 0.69444, 0, 0, 0.53056], 108: [0, 0.69444, 0, 0, 0.25556], 109: [0, 0.45833, 0, 0, 0.86667], 110: [0, 0.45833, 0, 0, 0.56111], 111: [0, 0.45833, 0, 0, 0.55], 112: [0.19444, 0.45833, 0, 0, 0.56111], 113: [0.19444, 0.45833, 0, 0, 0.56111], 114: [0, 0.45833, 0.01528, 0, 0.37222], 115: [0, 0.45833, 0, 0, 0.42167], 116: [0, 0.58929, 0, 0, 0.40417], 117: [0, 0.45833, 0, 0, 0.56111], 118: [0, 0.45833, 0.01528, 0, 0.5], 119: [0, 0.45833, 0.01528, 0, 0.74445], 120: [0, 0.45833, 0, 0, 0.5], 121: [0.19444, 0.45833, 0.01528, 0, 0.5], 122: [0, 0.45833, 0, 0, 0.47639], 126: [0.35, 0.34444, 0, 0, 0.55], 160: [0, 0, 0, 0, 0.25], 168: [0, 0.69444, 0, 0, 0.55], 176: [0, 0.69444, 0, 0, 0.73334], 180: [0, 0.69444, 0, 0, 0.55], 184: [0.17014, 0, 0, 0, 0.48889], 305: [0, 0.45833, 0, 0, 0.25556], 567: [0.19444, 0.45833, 0, 0, 0.28611], 710: [0, 0.69444, 0, 0, 0.55], 711: [0, 0.63542, 0, 0, 0.55], 713: [0, 0.63778, 0, 0, 0.55], 728: [0, 0.69444, 0, 0, 0.55], 729: [0, 0.69444, 0, 0, 0.30556], 730: [0, 0.69444, 0, 0, 0.73334], 732: [0, 0.69444, 0, 0, 0.55], 733: [0, 0.69444, 0, 0, 0.55], 915: [0, 0.69444, 0, 0, 0.58056], 916: [0, 0.69444, 0, 0, 0.91667], 920: [0, 0.69444, 0, 0, 0.85556], 923: [0, 0.69444, 0, 0, 0.67223], 926: [0, 0.69444, 0, 0, 0.73334], 928: [0, 0.69444, 0, 0, 0.79445], 931: [0, 0.69444, 0, 0, 0.79445], 933: [0, 0.69444, 0, 0, 0.85556], 934: [0, 0.69444, 0, 0, 0.79445], 936: [0, 0.69444, 0, 0, 0.85556], 937: [0, 0.69444, 0, 0, 0.79445], 8211: [0, 0.45833, 0.03056, 0, 0.55], 8212: [0, 0.45833, 0.03056, 0, 1.10001], 8216: [0, 0.69444, 0, 0, 0.30556], 8217: [0, 0.69444, 0, 0, 0.30556], 8220: [0, 0.69444, 0, 0, 0.55834], 8221: [0, 0.69444, 0, 0, 0.55834] }, "SansSerif-Italic": { 32: [0, 0, 0, 0, 0.25], 33: [0, 0.69444, 0.05733, 0, 0.31945], 34: [0, 0.69444, 316e-5, 0, 0.5], 35: [0.19444, 0.69444, 0.05087, 0, 0.83334], 36: [0.05556, 0.75, 0.11156, 0, 0.5], 37: [0.05556, 0.75, 0.03126, 0, 0.83334], 38: [0, 0.69444, 0.03058, 0, 0.75834], 39: [0, 0.69444, 0.07816, 0, 0.27778], 40: [0.25, 0.75, 0.13164, 0, 0.38889], 41: [0.25, 0.75, 0.02536, 0, 0.38889], 42: [0, 0.75, 0.11775, 0, 0.5], 43: [0.08333, 0.58333, 0.02536, 0, 0.77778], 44: [0.125, 0.08333, 0, 0, 0.27778], 45: [0, 0.44444, 0.01946, 0, 0.33333], 46: [0, 0.08333, 0, 0, 0.27778], 47: [0.25, 0.75, 0.13164, 0, 0.5], 48: [0, 0.65556, 0.11156, 0, 0.5], 49: [0, 0.65556, 0.11156, 0, 0.5], 50: [0, 0.65556, 0.11156, 0, 0.5], 51: [0, 0.65556, 0.11156, 0, 0.5], 52: [0, 0.65556, 0.11156, 0, 0.5], 53: [0, 0.65556, 0.11156, 0, 0.5], 54: [0, 0.65556, 0.11156, 0, 0.5], 55: [0, 0.65556, 0.11156, 0, 0.5], 56: [0, 0.65556, 0.11156, 0, 0.5], 57: [0, 0.65556, 0.11156, 0, 0.5], 58: [0, 0.44444, 0.02502, 0, 0.27778], 59: [0.125, 0.44444, 0.02502, 0, 0.27778], 61: [-0.13, 0.37, 0.05087, 0, 0.77778], 63: [0, 0.69444, 0.11809, 0, 0.47222], 64: [0, 0.69444, 0.07555, 0, 0.66667], 65: [0, 0.69444, 0, 0, 0.66667], 66: [0, 0.69444, 0.08293, 0, 0.66667], 67: [0, 0.69444, 0.11983, 0, 0.63889], 68: [0, 0.69444, 0.07555, 0, 0.72223], 69: [0, 0.69444, 0.11983, 0, 0.59722], 70: [0, 0.69444, 0.13372, 0, 0.56945], 71: [0, 0.69444, 0.11983, 0, 0.66667], 72: [0, 0.69444, 0.08094, 0, 0.70834], 73: [0, 0.69444, 0.13372, 0, 0.27778], 74: [0, 0.69444, 0.08094, 0, 0.47222], 75: [0, 0.69444, 0.11983, 0, 0.69445], 76: [0, 0.69444, 0, 0, 0.54167], 77: [0, 0.69444, 0.08094, 0, 0.875], 78: [0, 0.69444, 0.08094, 0, 0.70834], 79: [0, 0.69444, 0.07555, 0, 0.73611], 80: [0, 0.69444, 0.08293, 0, 0.63889], 81: [0.125, 0.69444, 0.07555, 0, 0.73611], 82: [0, 0.69444, 0.08293, 0, 0.64584], 83: [0, 0.69444, 0.09205, 0, 0.55556], 84: [0, 0.69444, 0.13372, 0, 0.68056], 85: [0, 0.69444, 0.08094, 0, 0.6875], 86: [0, 0.69444, 0.1615, 0, 0.66667], 87: [0, 0.69444, 0.1615, 0, 0.94445], 88: [0, 0.69444, 0.13372, 0, 0.66667], 89: [0, 0.69444, 0.17261, 0, 0.66667], 90: [0, 0.69444, 0.11983, 0, 0.61111], 91: [0.25, 0.75, 0.15942, 0, 0.28889], 93: [0.25, 0.75, 0.08719, 0, 0.28889], 94: [0, 0.69444, 0.0799, 0, 0.5], 95: [0.35, 0.09444, 0.08616, 0, 0.5], 97: [0, 0.44444, 981e-5, 0, 0.48056], 98: [0, 0.69444, 0.03057, 0, 0.51667], 99: [0, 0.44444, 0.08336, 0, 0.44445], 100: [0, 0.69444, 0.09483, 0, 0.51667], 101: [0, 0.44444, 0.06778, 0, 0.44445], 102: [0, 0.69444, 0.21705, 0, 0.30556], 103: [0.19444, 0.44444, 0.10836, 0, 0.5], 104: [0, 0.69444, 0.01778, 0, 0.51667], 105: [0, 0.67937, 0.09718, 0, 0.23889], 106: [0.19444, 0.67937, 0.09162, 0, 0.26667], 107: [0, 0.69444, 0.08336, 0, 0.48889], 108: [0, 0.69444, 0.09483, 0, 0.23889], 109: [0, 0.44444, 0.01778, 0, 0.79445], 110: [0, 0.44444, 0.01778, 0, 0.51667], 111: [0, 0.44444, 0.06613, 0, 0.5], 112: [0.19444, 0.44444, 0.0389, 0, 0.51667], 113: [0.19444, 0.44444, 0.04169, 0, 0.51667], 114: [0, 0.44444, 0.10836, 0, 0.34167], 115: [0, 0.44444, 0.0778, 0, 0.38333], 116: [0, 0.57143, 0.07225, 0, 0.36111], 117: [0, 0.44444, 0.04169, 0, 0.51667], 118: [0, 0.44444, 0.10836, 0, 0.46111], 119: [0, 0.44444, 0.10836, 0, 0.68334], 120: [0, 0.44444, 0.09169, 0, 0.46111], 121: [0.19444, 0.44444, 0.10836, 0, 0.46111], 122: [0, 0.44444, 0.08752, 0, 0.43472], 126: [0.35, 0.32659, 0.08826, 0, 0.5], 160: [0, 0, 0, 0, 0.25], 168: [0, 0.67937, 0.06385, 0, 0.5], 176: [0, 0.69444, 0, 0, 0.73752], 184: [0.17014, 0, 0, 0, 0.44445], 305: [0, 0.44444, 0.04169, 0, 0.23889], 567: [0.19444, 0.44444, 0.04169, 0, 0.26667], 710: [0, 0.69444, 0.0799, 0, 0.5], 711: [0, 0.63194, 0.08432, 0, 0.5], 713: [0, 0.60889, 0.08776, 0, 0.5], 714: [0, 0.69444, 0.09205, 0, 0.5], 715: [0, 0.69444, 0, 0, 0.5], 728: [0, 0.69444, 0.09483, 0, 0.5], 729: [0, 0.67937, 0.07774, 0, 0.27778], 730: [0, 0.69444, 0, 0, 0.73752], 732: [0, 0.67659, 0.08826, 0, 0.5], 733: [0, 0.69444, 0.09205, 0, 0.5], 915: [0, 0.69444, 0.13372, 0, 0.54167], 916: [0, 0.69444, 0, 0, 0.83334], 920: [0, 0.69444, 0.07555, 0, 0.77778], 923: [0, 0.69444, 0, 0, 0.61111], 926: [0, 0.69444, 0.12816, 0, 0.66667], 928: [0, 0.69444, 0.08094, 0, 0.70834], 931: [0, 0.69444, 0.11983, 0, 0.72222], 933: [0, 0.69444, 0.09031, 0, 0.77778], 934: [0, 0.69444, 0.04603, 0, 0.72222], 936: [0, 0.69444, 0.09031, 0, 0.77778], 937: [0, 0.69444, 0.08293, 0, 0.72222], 8211: [0, 0.44444, 0.08616, 0, 0.5], 8212: [0, 0.44444, 0.08616, 0, 1], 8216: [0, 0.69444, 0.07816, 0, 0.27778], 8217: [0, 0.69444, 0.07816, 0, 0.27778], 8220: [0, 0.69444, 0.14205, 0, 0.5], 8221: [0, 0.69444, 316e-5, 0, 0.5] }, "SansSerif-Regular": { 32: [0, 0, 0, 0, 0.25], 33: [0, 0.69444, 0, 0, 0.31945], 34: [0, 0.69444, 0, 0, 0.5], 35: [0.19444, 0.69444, 0, 0, 0.83334], 36: [0.05556, 0.75, 0, 0, 0.5], 37: [0.05556, 0.75, 0, 0, 0.83334], 38: [0, 0.69444, 0, 0, 0.75834], 39: [0, 0.69444, 0, 0, 0.27778], 40: [0.25, 0.75, 0, 0, 0.38889], 41: [0.25, 0.75, 0, 0, 0.38889], 42: [0, 0.75, 0, 0, 0.5], 43: [0.08333, 0.58333, 0, 0, 0.77778], 44: [0.125, 0.08333, 0, 0, 0.27778], 45: [0, 0.44444, 0, 0, 0.33333], 46: [0, 0.08333, 0, 0, 0.27778], 47: [0.25, 0.75, 0, 0, 0.5], 48: [0, 0.65556, 0, 0, 0.5], 49: [0, 0.65556, 0, 0, 0.5], 50: [0, 0.65556, 0, 0, 0.5], 51: [0, 0.65556, 0, 0, 0.5], 52: [0, 0.65556, 0, 0, 0.5], 53: [0, 0.65556, 0, 0, 0.5], 54: [0, 0.65556, 0, 0, 0.5], 55: [0, 0.65556, 0, 0, 0.5], 56: [0, 0.65556, 0, 0, 0.5], 57: [0, 0.65556, 0, 0, 0.5], 58: [0, 0.44444, 0, 0, 0.27778], 59: [0.125, 0.44444, 0, 0, 0.27778], 61: [-0.13, 0.37, 0, 0, 0.77778], 63: [0, 0.69444, 0, 0, 0.47222], 64: [0, 0.69444, 0, 0, 0.66667], 65: [0, 0.69444, 0, 0, 0.66667], 66: [0, 0.69444, 0, 0, 0.66667], 67: [0, 0.69444, 0, 0, 0.63889], 68: [0, 0.69444, 0, 0, 0.72223], 69: [0, 0.69444, 0, 0, 0.59722], 70: [0, 0.69444, 0, 0, 0.56945], 71: [0, 0.69444, 0, 0, 0.66667], 72: [0, 0.69444, 0, 0, 0.70834], 73: [0, 0.69444, 0, 0, 0.27778], 74: [0, 0.69444, 0, 0, 0.47222], 75: [0, 0.69444, 0, 0, 0.69445], 76: [0, 0.69444, 0, 0, 0.54167], 77: [0, 0.69444, 0, 0, 0.875], 78: [0, 0.69444, 0, 0, 0.70834], 79: [0, 0.69444, 0, 0, 0.73611], 80: [0, 0.69444, 0, 0, 0.63889], 81: [0.125, 0.69444, 0, 0, 0.73611], 82: [0, 0.69444, 0, 0, 0.64584], 83: [0, 0.69444, 0, 0, 0.55556], 84: [0, 0.69444, 0, 0, 0.68056], 85: [0, 0.69444, 0, 0, 0.6875], 86: [0, 0.69444, 0.01389, 0, 0.66667], 87: [0, 0.69444, 0.01389, 0, 0.94445], 88: [0, 0.69444, 0, 0, 0.66667], 89: [0, 0.69444, 0.025, 0, 0.66667], 90: [0, 0.69444, 0, 0, 0.61111], 91: [0.25, 0.75, 0, 0, 0.28889], 93: [0.25, 0.75, 0, 0, 0.28889], 94: [0, 0.69444, 0, 0, 0.5], 95: [0.35, 0.09444, 0.02778, 0, 0.5], 97: [0, 0.44444, 0, 0, 0.48056], 98: [0, 0.69444, 0, 0, 0.51667], 99: [0, 0.44444, 0, 0, 0.44445], 100: [0, 0.69444, 0, 0, 0.51667], 101: [0, 0.44444, 0, 0, 0.44445], 102: [0, 0.69444, 0.06944, 0, 0.30556], 103: [0.19444, 0.44444, 0.01389, 0, 0.5], 104: [0, 0.69444, 0, 0, 0.51667], 105: [0, 0.67937, 0, 0, 0.23889], 106: [0.19444, 0.67937, 0, 0, 0.26667], 107: [0, 0.69444, 0, 0, 0.48889], 108: [0, 0.69444, 0, 0, 0.23889], 109: [0, 0.44444, 0, 0, 0.79445], 110: [0, 0.44444, 0, 0, 0.51667], 111: [0, 0.44444, 0, 0, 0.5], 112: [0.19444, 0.44444, 0, 0, 0.51667], 113: [0.19444, 0.44444, 0, 0, 0.51667], 114: [0, 0.44444, 0.01389, 0, 0.34167], 115: [0, 0.44444, 0, 0, 0.38333], 116: [0, 0.57143, 0, 0, 0.36111], 117: [0, 0.44444, 0, 0, 0.51667], 118: [0, 0.44444, 0.01389, 0, 0.46111], 119: [0, 0.44444, 0.01389, 0, 0.68334], 120: [0, 0.44444, 0, 0, 0.46111], 121: [0.19444, 0.44444, 0.01389, 0, 0.46111], 122: [0, 0.44444, 0, 0, 0.43472], 126: [0.35, 0.32659, 0, 0, 0.5], 160: [0, 0, 0, 0, 0.25], 168: [0, 0.67937, 0, 0, 0.5], 176: [0, 0.69444, 0, 0, 0.66667], 184: [0.17014, 0, 0, 0, 0.44445], 305: [0, 0.44444, 0, 0, 0.23889], 567: [0.19444, 0.44444, 0, 0, 0.26667], 710: [0, 0.69444, 0, 0, 0.5], 711: [0, 0.63194, 0, 0, 0.5], 713: [0, 0.60889, 0, 0, 0.5], 714: [0, 0.69444, 0, 0, 0.5], 715: [0, 0.69444, 0, 0, 0.5], 728: [0, 0.69444, 0, 0, 0.5], 729: [0, 0.67937, 0, 0, 0.27778], 730: [0, 0.69444, 0, 0, 0.66667], 732: [0, 0.67659, 0, 0, 0.5], 733: [0, 0.69444, 0, 0, 0.5], 915: [0, 0.69444, 0, 0, 0.54167], 916: [0, 0.69444, 0, 0, 0.83334], 920: [0, 0.69444, 0, 0, 0.77778], 923: [0, 0.69444, 0, 0, 0.61111], 926: [0, 0.69444, 0, 0, 0.66667], 928: [0, 0.69444, 0, 0, 0.70834], 931: [0, 0.69444, 0, 0, 0.72222], 933: [0, 0.69444, 0, 0, 0.77778], 934: [0, 0.69444, 0, 0, 0.72222], 936: [0, 0.69444, 0, 0, 0.77778], 937: [0, 0.69444, 0, 0, 0.72222], 8211: [0, 0.44444, 0.02778, 0, 0.5], 8212: [0, 0.44444, 0.02778, 0, 1], 8216: [0, 0.69444, 0, 0, 0.27778], 8217: [0, 0.69444, 0, 0, 0.27778], 8220: [0, 0.69444, 0, 0, 0.5], 8221: [0, 0.69444, 0, 0, 0.5] }, "Script-Regular": { 32: [0, 0, 0, 0, 0.25], 65: [0, 0.7, 0.22925, 0, 0.80253], 66: [0, 0.7, 0.04087, 0, 0.90757], 67: [0, 0.7, 0.1689, 0, 0.66619], 68: [0, 0.7, 0.09371, 0, 0.77443], 69: [0, 0.7, 0.18583, 0, 0.56162], 70: [0, 0.7, 0.13634, 0, 0.89544], 71: [0, 0.7, 0.17322, 0, 0.60961], 72: [0, 0.7, 0.29694, 0, 0.96919], 73: [0, 0.7, 0.19189, 0, 0.80907], 74: [0.27778, 0.7, 0.19189, 0, 1.05159], 75: [0, 0.7, 0.31259, 0, 0.91364], 76: [0, 0.7, 0.19189, 0, 0.87373], 77: [0, 0.7, 0.15981, 0, 1.08031], 78: [0, 0.7, 0.3525, 0, 0.9015], 79: [0, 0.7, 0.08078, 0, 0.73787], 80: [0, 0.7, 0.08078, 0, 1.01262], 81: [0, 0.7, 0.03305, 0, 0.88282], 82: [0, 0.7, 0.06259, 0, 0.85], 83: [0, 0.7, 0.19189, 0, 0.86767], 84: [0, 0.7, 0.29087, 0, 0.74697], 85: [0, 0.7, 0.25815, 0, 0.79996], 86: [0, 0.7, 0.27523, 0, 0.62204], 87: [0, 0.7, 0.27523, 0, 0.80532], 88: [0, 0.7, 0.26006, 0, 0.94445], 89: [0, 0.7, 0.2939, 0, 0.70961], 90: [0, 0.7, 0.24037, 0, 0.8212], 160: [0, 0, 0, 0, 0.25] }, "Size1-Regular": { 32: [0, 0, 0, 0, 0.25], 40: [0.35001, 0.85, 0, 0, 0.45834], 41: [0.35001, 0.85, 0, 0, 0.45834], 47: [0.35001, 0.85, 0, 0, 0.57778], 91: [0.35001, 0.85, 0, 0, 0.41667], 92: [0.35001, 0.85, 0, 0, 0.57778], 93: [0.35001, 0.85, 0, 0, 0.41667], 123: [0.35001, 0.85, 0, 0, 0.58334], 125: [0.35001, 0.85, 0, 0, 0.58334], 160: [0, 0, 0, 0, 0.25], 710: [0, 0.72222, 0, 0, 0.55556], 732: [0, 0.72222, 0, 0, 0.55556], 770: [0, 0.72222, 0, 0, 0.55556], 771: [0, 0.72222, 0, 0, 0.55556], 8214: [-99e-5, 0.601, 0, 0, 0.77778], 8593: [1e-5, 0.6, 0, 0, 0.66667], 8595: [1e-5, 0.6, 0, 0, 0.66667], 8657: [1e-5, 0.6, 0, 0, 0.77778], 8659: [1e-5, 0.6, 0, 0, 0.77778], 8719: [0.25001, 0.75, 0, 0, 0.94445], 8720: [0.25001, 0.75, 0, 0, 0.94445], 8721: [0.25001, 0.75, 0, 0, 1.05556], 8730: [0.35001, 0.85, 0, 0, 1], 8739: [-599e-5, 0.606, 0, 0, 0.33333], 8741: [-599e-5, 0.606, 0, 0, 0.55556], 8747: [0.30612, 0.805, 0.19445, 0, 0.47222], 8748: [0.306, 0.805, 0.19445, 0, 0.47222], 8749: [0.306, 0.805, 0.19445, 0, 0.47222], 8750: [0.30612, 0.805, 0.19445, 0, 0.47222], 8896: [0.25001, 0.75, 0, 0, 0.83334], 8897: [0.25001, 0.75, 0, 0, 0.83334], 8898: [0.25001, 0.75, 0, 0, 0.83334], 8899: [0.25001, 0.75, 0, 0, 0.83334], 8968: [0.35001, 0.85, 0, 0, 0.47222], 8969: [0.35001, 0.85, 0, 0, 0.47222], 8970: [0.35001, 0.85, 0, 0, 0.47222], 8971: [0.35001, 0.85, 0, 0, 0.47222], 9168: [-99e-5, 0.601, 0, 0, 0.66667], 10216: [0.35001, 0.85, 0, 0, 0.47222], 10217: [0.35001, 0.85, 0, 0, 0.47222], 10752: [0.25001, 0.75, 0, 0, 1.11111], 10753: [0.25001, 0.75, 0, 0, 1.11111], 10754: [0.25001, 0.75, 0, 0, 1.11111], 10756: [0.25001, 0.75, 0, 0, 0.83334], 10758: [0.25001, 0.75, 0, 0, 0.83334] }, "Size2-Regular": { 32: [0, 0, 0, 0, 0.25], 40: [0.65002, 1.15, 0, 0, 0.59722], 41: [0.65002, 1.15, 0, 0, 0.59722], 47: [0.65002, 1.15, 0, 0, 0.81111], 91: [0.65002, 1.15, 0, 0, 0.47222], 92: [0.65002, 1.15, 0, 0, 0.81111], 93: [0.65002, 1.15, 0, 0, 0.47222], 123: [0.65002, 1.15, 0, 0, 0.66667], 125: [0.65002, 1.15, 0, 0, 0.66667], 160: [0, 0, 0, 0, 0.25], 710: [0, 0.75, 0, 0, 1], 732: [0, 0.75, 0, 0, 1], 770: [0, 0.75, 0, 0, 1], 771: [0, 0.75, 0, 0, 1], 8719: [0.55001, 1.05, 0, 0, 1.27778], 8720: [0.55001, 1.05, 0, 0, 1.27778], 8721: [0.55001, 1.05, 0, 0, 1.44445], 8730: [0.65002, 1.15, 0, 0, 1], 8747: [0.86225, 1.36, 0.44445, 0, 0.55556], 8748: [0.862, 1.36, 0.44445, 0, 0.55556], 8749: [0.862, 1.36, 0.44445, 0, 0.55556], 8750: [0.86225, 1.36, 0.44445, 0, 0.55556], 8896: [0.55001, 1.05, 0, 0, 1.11111], 8897: [0.55001, 1.05, 0, 0, 1.11111], 8898: [0.55001, 1.05, 0, 0, 1.11111], 8899: [0.55001, 1.05, 0, 0, 1.11111], 8968: [0.65002, 1.15, 0, 0, 0.52778], 8969: [0.65002, 1.15, 0, 0, 0.52778], 8970: [0.65002, 1.15, 0, 0, 0.52778], 8971: [0.65002, 1.15, 0, 0, 0.52778], 10216: [0.65002, 1.15, 0, 0, 0.61111], 10217: [0.65002, 1.15, 0, 0, 0.61111], 10752: [0.55001, 1.05, 0, 0, 1.51112], 10753: [0.55001, 1.05, 0, 0, 1.51112], 10754: [0.55001, 1.05, 0, 0, 1.51112], 10756: [0.55001, 1.05, 0, 0, 1.11111], 10758: [0.55001, 1.05, 0, 0, 1.11111] }, "Size3-Regular": { 32: [0, 0, 0, 0, 0.25], 40: [0.95003, 1.45, 0, 0, 0.73611], 41: [0.95003, 1.45, 0, 0, 0.73611], 47: [0.95003, 1.45, 0, 0, 1.04445], 91: [0.95003, 1.45, 0, 0, 0.52778], 92: [0.95003, 1.45, 0, 0, 1.04445], 93: [0.95003, 1.45, 0, 0, 0.52778], 123: [0.95003, 1.45, 0, 0, 0.75], 125: [0.95003, 1.45, 0, 0, 0.75], 160: [0, 0, 0, 0, 0.25], 710: [0, 0.75, 0, 0, 1.44445], 732: [0, 0.75, 0, 0, 1.44445], 770: [0, 0.75, 0, 0, 1.44445], 771: [0, 0.75, 0, 0, 1.44445], 8730: [0.95003, 1.45, 0, 0, 1], 8968: [0.95003, 1.45, 0, 0, 0.58334], 8969: [0.95003, 1.45, 0, 0, 0.58334], 8970: [0.95003, 1.45, 0, 0, 0.58334], 8971: [0.95003, 1.45, 0, 0, 0.58334], 10216: [0.95003, 1.45, 0, 0, 0.75], 10217: [0.95003, 1.45, 0, 0, 0.75] }, "Size4-Regular": { 32: [0, 0, 0, 0, 0.25], 40: [1.25003, 1.75, 0, 0, 0.79167], 41: [1.25003, 1.75, 0, 0, 0.79167], 47: [1.25003, 1.75, 0, 0, 1.27778], 91: [1.25003, 1.75, 0, 0, 0.58334], 92: [1.25003, 1.75, 0, 0, 1.27778], 93: [1.25003, 1.75, 0, 0, 0.58334], 123: [1.25003, 1.75, 0, 0, 0.80556], 125: [1.25003, 1.75, 0, 0, 0.80556], 160: [0, 0, 0, 0, 0.25], 710: [0, 0.825, 0, 0, 1.8889], 732: [0, 0.825, 0, 0, 1.8889], 770: [0, 0.825, 0, 0, 1.8889], 771: [0, 0.825, 0, 0, 1.8889], 8730: [1.25003, 1.75, 0, 0, 1], 8968: [1.25003, 1.75, 0, 0, 0.63889], 8969: [1.25003, 1.75, 0, 0, 0.63889], 8970: [1.25003, 1.75, 0, 0, 0.63889], 8971: [1.25003, 1.75, 0, 0, 0.63889], 9115: [0.64502, 1.155, 0, 0, 0.875], 9116: [1e-5, 0.6, 0, 0, 0.875], 9117: [0.64502, 1.155, 0, 0, 0.875], 9118: [0.64502, 1.155, 0, 0, 0.875], 9119: [1e-5, 0.6, 0, 0, 0.875], 9120: [0.64502, 1.155, 0, 0, 0.875], 9121: [0.64502, 1.155, 0, 0, 0.66667], 9122: [-99e-5, 0.601, 0, 0, 0.66667], 9123: [0.64502, 1.155, 0, 0, 0.66667], 9124: [0.64502, 1.155, 0, 0, 0.66667], 9125: [-99e-5, 0.601, 0, 0, 0.66667], 9126: [0.64502, 1.155, 0, 0, 0.66667], 9127: [1e-5, 0.9, 0, 0, 0.88889], 9128: [0.65002, 1.15, 0, 0, 0.88889], 9129: [0.90001, 0, 0, 0, 0.88889], 9130: [0, 0.3, 0, 0, 0.88889], 9131: [1e-5, 0.9, 0, 0, 0.88889], 9132: [0.65002, 1.15, 0, 0, 0.88889], 9133: [0.90001, 0, 0, 0, 0.88889], 9143: [0.88502, 0.915, 0, 0, 1.05556], 10216: [1.25003, 1.75, 0, 0, 0.80556], 10217: [1.25003, 1.75, 0, 0, 0.80556], 57344: [-499e-5, 0.605, 0, 0, 1.05556], 57345: [-499e-5, 0.605, 0, 0, 1.05556], 57680: [0, 0.12, 0, 0, 0.45], 57681: [0, 0.12, 0, 0, 0.45], 57682: [0, 0.12, 0, 0, 0.45], 57683: [0, 0.12, 0, 0, 0.45] }, "Typewriter-Regular": { 32: [0, 0, 0, 0, 0.525], 33: [0, 0.61111, 0, 0, 0.525], 34: [0, 0.61111, 0, 0, 0.525], 35: [0, 0.61111, 0, 0, 0.525], 36: [0.08333, 0.69444, 0, 0, 0.525], 37: [0.08333, 0.69444, 0, 0, 0.525], 38: [0, 0.61111, 0, 0, 0.525], 39: [0, 0.61111, 0, 0, 0.525], 40: [0.08333, 0.69444, 0, 0, 0.525], 41: [0.08333, 0.69444, 0, 0, 0.525], 42: [0, 0.52083, 0, 0, 0.525], 43: [-0.08056, 0.53055, 0, 0, 0.525], 44: [0.13889, 0.125, 0, 0, 0.525], 45: [-0.08056, 0.53055, 0, 0, 0.525], 46: [0, 0.125, 0, 0, 0.525], 47: [0.08333, 0.69444, 0, 0, 0.525], 48: [0, 0.61111, 0, 0, 0.525], 49: [0, 0.61111, 0, 0, 0.525], 50: [0, 0.61111, 0, 0, 0.525], 51: [0, 0.61111, 0, 0, 0.525], 52: [0, 0.61111, 0, 0, 0.525], 53: [0, 0.61111, 0, 0, 0.525], 54: [0, 0.61111, 0, 0, 0.525], 55: [0, 0.61111, 0, 0, 0.525], 56: [0, 0.61111, 0, 0, 0.525], 57: [0, 0.61111, 0, 0, 0.525], 58: [0, 0.43056, 0, 0, 0.525], 59: [0.13889, 0.43056, 0, 0, 0.525], 60: [-0.05556, 0.55556, 0, 0, 0.525], 61: [-0.19549, 0.41562, 0, 0, 0.525], 62: [-0.05556, 0.55556, 0, 0, 0.525], 63: [0, 0.61111, 0, 0, 0.525], 64: [0, 0.61111, 0, 0, 0.525], 65: [0, 0.61111, 0, 0, 0.525], 66: [0, 0.61111, 0, 0, 0.525], 67: [0, 0.61111, 0, 0, 0.525], 68: [0, 0.61111, 0, 0, 0.525], 69: [0, 0.61111, 0, 0, 0.525], 70: [0, 0.61111, 0, 0, 0.525], 71: [0, 0.61111, 0, 0, 0.525], 72: [0, 0.61111, 0, 0, 0.525], 73: [0, 0.61111, 0, 0, 0.525], 74: [0, 0.61111, 0, 0, 0.525], 75: [0, 0.61111, 0, 0, 0.525], 76: [0, 0.61111, 0, 0, 0.525], 77: [0, 0.61111, 0, 0, 0.525], 78: [0, 0.61111, 0, 0, 0.525], 79: [0, 0.61111, 0, 0, 0.525], 80: [0, 0.61111, 0, 0, 0.525], 81: [0.13889, 0.61111, 0, 0, 0.525], 82: [0, 0.61111, 0, 0, 0.525], 83: [0, 0.61111, 0, 0, 0.525], 84: [0, 0.61111, 0, 0, 0.525], 85: [0, 0.61111, 0, 0, 0.525], 86: [0, 0.61111, 0, 0, 0.525], 87: [0, 0.61111, 0, 0, 0.525], 88: [0, 0.61111, 0, 0, 0.525], 89: [0, 0.61111, 0, 0, 0.525], 90: [0, 0.61111, 0, 0, 0.525], 91: [0.08333, 0.69444, 0, 0, 0.525], 92: [0.08333, 0.69444, 0, 0, 0.525], 93: [0.08333, 0.69444, 0, 0, 0.525], 94: [0, 0.61111, 0, 0, 0.525], 95: [0.09514, 0, 0, 0, 0.525], 96: [0, 0.61111, 0, 0, 0.525], 97: [0, 0.43056, 0, 0, 0.525], 98: [0, 0.61111, 0, 0, 0.525], 99: [0, 0.43056, 0, 0, 0.525], 100: [0, 0.61111, 0, 0, 0.525], 101: [0, 0.43056, 0, 0, 0.525], 102: [0, 0.61111, 0, 0, 0.525], 103: [0.22222, 0.43056, 0, 0, 0.525], 104: [0, 0.61111, 0, 0, 0.525], 105: [0, 0.61111, 0, 0, 0.525], 106: [0.22222, 0.61111, 0, 0, 0.525], 107: [0, 0.61111, 0, 0, 0.525], 108: [0, 0.61111, 0, 0, 0.525], 109: [0, 0.43056, 0, 0, 0.525], 110: [0, 0.43056, 0, 0, 0.525], 111: [0, 0.43056, 0, 0, 0.525], 112: [0.22222, 0.43056, 0, 0, 0.525], 113: [0.22222, 0.43056, 0, 0, 0.525], 114: [0, 0.43056, 0, 0, 0.525], 115: [0, 0.43056, 0, 0, 0.525], 116: [0, 0.55358, 0, 0, 0.525], 117: [0, 0.43056, 0, 0, 0.525], 118: [0, 0.43056, 0, 0, 0.525], 119: [0, 0.43056, 0, 0, 0.525], 120: [0, 0.43056, 0, 0, 0.525], 121: [0.22222, 0.43056, 0, 0, 0.525], 122: [0, 0.43056, 0, 0, 0.525], 123: [0.08333, 0.69444, 0, 0, 0.525], 124: [0.08333, 0.69444, 0, 0, 0.525], 125: [0.08333, 0.69444, 0, 0, 0.525], 126: [0, 0.61111, 0, 0, 0.525], 127: [0, 0.61111, 0, 0, 0.525], 160: [0, 0, 0, 0, 0.525], 176: [0, 0.61111, 0, 0, 0.525], 184: [0.19445, 0, 0, 0, 0.525], 305: [0, 0.43056, 0, 0, 0.525], 567: [0.22222, 0.43056, 0, 0, 0.525], 711: [0, 0.56597, 0, 0, 0.525], 713: [0, 0.56555, 0, 0, 0.525], 714: [0, 0.61111, 0, 0, 0.525], 715: [0, 0.61111, 0, 0, 0.525], 728: [0, 0.61111, 0, 0, 0.525], 730: [0, 0.61111, 0, 0, 0.525], 770: [0, 0.61111, 0, 0, 0.525], 771: [0, 0.61111, 0, 0, 0.525], 776: [0, 0.61111, 0, 0, 0.525], 915: [0, 0.61111, 0, 0, 0.525], 916: [0, 0.61111, 0, 0, 0.525], 920: [0, 0.61111, 0, 0, 0.525], 923: [0, 0.61111, 0, 0, 0.525], 926: [0, 0.61111, 0, 0, 0.525], 928: [0, 0.61111, 0, 0, 0.525], 931: [0, 0.61111, 0, 0, 0.525], 933: [0, 0.61111, 0, 0, 0.525], 934: [0, 0.61111, 0, 0, 0.525], 936: [0, 0.61111, 0, 0, 0.525], 937: [0, 0.61111, 0, 0, 0.525], 8216: [0, 0.61111, 0, 0, 0.525], 8217: [0, 0.61111, 0, 0, 0.525], 8242: [0, 0.61111, 0, 0, 0.525], 9251: [0.11111, 0.21944, 0, 0, 0.525] } };
  var We2 = { slant: [0.25, 0.25, 0.25], space: [0, 0, 0], stretch: [0, 0, 0], shrink: [0, 0, 0], xHeight: [0.431, 0.431, 0.431], quad: [1, 1.171, 1.472], extraSpace: [0, 0, 0], num1: [0.677, 0.732, 0.925], num2: [0.394, 0.384, 0.387], num3: [0.444, 0.471, 0.504], denom1: [0.686, 0.752, 1.025], denom2: [0.345, 0.344, 0.532], sup1: [0.413, 0.503, 0.504], sup2: [0.363, 0.431, 0.404], sup3: [0.289, 0.286, 0.294], sub1: [0.15, 0.143, 0.2], sub2: [0.247, 0.286, 0.4], supDrop: [0.386, 0.353, 0.494], subDrop: [0.05, 0.071, 0.1], delim1: [2.39, 1.7, 1.98], delim2: [1.01, 1.157, 1.42], axisHeight: [0.25, 0.25, 0.25], defaultRuleThickness: [0.04, 0.049, 0.049], bigOpSpacing1: [0.111, 0.111, 0.111], bigOpSpacing2: [0.166, 0.166, 0.166], bigOpSpacing3: [0.2, 0.2, 0.2], bigOpSpacing4: [0.6, 0.611, 0.611], bigOpSpacing5: [0.1, 0.143, 0.143], sqrtRuleThickness: [0.04, 0.04, 0.04], ptPerEm: [10, 10, 10], doubleRuleSep: [0.2, 0.2, 0.2], arrayRuleWidth: [0.04, 0.04, 0.04], fboxsep: [0.3, 0.3, 0.3], fboxrule: [0.04, 0.04, 0.04] };
  var Ge2 = { \u00C5: `A`, \u00D0: `D`, \u00DE: `o`, \u00E5: `a`, \u00F0: `d`, \u00FE: `o`, \u0410: `A`, \u0411: `B`, \u0412: `B`, \u0413: `F`, \u0414: `A`, \u0415: `E`, \u0416: `K`, \u0417: `3`, \u0418: `N`, \u0419: `N`, \u041A: `K`, \u041B: `N`, \u041C: `M`, \u041D: `H`, \u041E: `O`, \u041F: `N`, \u0420: `P`, \u0421: `C`, \u0422: `T`, \u0423: `y`, \u0424: `O`, \u0425: `X`, \u0426: `U`, \u0427: `h`, \u0428: `W`, \u0429: `W`, \u042A: `B`, \u042B: `X`, \u042C: `B`, \u042D: `3`, \u042E: `X`, \u042F: `R`, \u0430: `a`, \u0431: `b`, \u0432: `a`, \u0433: `r`, \u0434: `y`, \u0435: `e`, \u0436: `m`, \u0437: `e`, \u0438: `n`, \u0439: `n`, \u043A: `n`, \u043B: `n`, \u043C: `m`, \u043D: `n`, \u043E: `o`, \u043F: `n`, \u0440: `p`, \u0441: `c`, \u0442: `o`, \u0443: `y`, \u0444: `b`, \u0445: `x`, \u0446: `n`, \u0447: `n`, \u0448: `w`, \u0449: `w`, \u044A: `a`, \u044B: `m`, \u044C: `a`, \u044D: `e`, \u044E: `m`, \u044F: `r` };
  function Ke2(e10, t8) {
    Ue2[e10] = t8;
  }
  function qe2(e10, t8, n4) {
    if (!Ue2[t8]) throw Error(`Font metrics not found for font: ` + t8 + `.`);
    var r5 = e10.charCodeAt(0), i5 = Ue2[t8][r5];
    if (!i5 && e10[0] in Ge2 && (r5 = Ge2[e10[0]].charCodeAt(0), i5 = Ue2[t8][r5]), !i5 && n4 === `text` && ce2(r5) && (i5 = Ue2[t8][77]), i5) return { depth: i5[0], height: i5[1], italic: i5[2], skew: i5[3], width: i5[4] };
  }
  var Je2 = {};
  function Ye2(e10) {
    var t8 = e10 >= 5 ? 0 : e10 >= 3 ? 1 : 2;
    if (!Je2[t8]) {
      var n4 = Je2[t8] = { cssEmPerMu: We2.quad[t8] / 18 };
      for (var r5 in We2) We2.hasOwnProperty(r5) && (n4[r5] = We2[r5][t8]);
    }
    return Je2[t8];
  }
  var A2 = { math: {}, text: {} };
  function j2(e10, t8, n4, r5, i5, a5) {
    A2[e10][i5] = { font: t8, group: n4, replace: r5 }, a5 && r5 && (A2[e10][r5] = A2[e10][i5]);
  }
  var M2 = `math`;
  var N2 = `text`;
  var P2 = `main`;
  var F2 = `ams`;
  var I2 = `accent-token`;
  var L2 = `bin`;
  var Xe2 = `close`;
  var Ze2 = `inner`;
  var R2 = `mathord`;
  var z2 = `op-token`;
  var Qe2 = `open`;
  var $e2 = `punct`;
  var B2 = `rel`;
  var et2 = `spacing`;
  var V2 = `textord`;
  j2(M2, P2, B2, `\u2261`, `\\equiv`, true), j2(M2, P2, B2, `\u227A`, `\\prec`, true), j2(M2, P2, B2, `\u227B`, `\\succ`, true), j2(M2, P2, B2, `\u223C`, `\\sim`, true), j2(M2, P2, B2, `\u22A5`, `\\perp`), j2(M2, P2, B2, `\u2AAF`, `\\preceq`, true), j2(M2, P2, B2, `\u2AB0`, `\\succeq`, true), j2(M2, P2, B2, `\u2243`, `\\simeq`, true), j2(M2, P2, B2, `\u2223`, `\\mid`, true), j2(M2, P2, B2, `\u226A`, `\\ll`, true), j2(M2, P2, B2, `\u226B`, `\\gg`, true), j2(M2, P2, B2, `\u224D`, `\\asymp`, true), j2(M2, P2, B2, `\u2225`, `\\parallel`), j2(M2, P2, B2, `\u22C8`, `\\bowtie`, true), j2(M2, P2, B2, `\u2323`, `\\smile`, true), j2(M2, P2, B2, `\u2291`, `\\sqsubseteq`, true), j2(M2, P2, B2, `\u2292`, `\\sqsupseteq`, true), j2(M2, P2, B2, `\u2250`, `\\doteq`, true), j2(M2, P2, B2, `\u2322`, `\\frown`, true), j2(M2, P2, B2, `\u220B`, `\\ni`, true), j2(M2, P2, B2, `\u221D`, `\\propto`, true), j2(M2, P2, B2, `\u22A2`, `\\vdash`, true), j2(M2, P2, B2, `\u22A3`, `\\dashv`, true), j2(M2, P2, B2, `\u220B`, `\\owns`), j2(M2, P2, $e2, `.`, `\\ldotp`), j2(M2, P2, $e2, `\u22C5`, `\\cdotp`), j2(M2, P2, $e2, `\u22C5`, `\xB7`), j2(N2, P2, V2, `\u22C5`, `\xB7`), j2(M2, P2, V2, `#`, `\\#`), j2(N2, P2, V2, `#`, `\\#`), j2(M2, P2, V2, `&`, `\\&`), j2(N2, P2, V2, `&`, `\\&`), j2(M2, P2, V2, `\u2135`, `\\aleph`, true), j2(M2, P2, V2, `\u2200`, `\\forall`, true), j2(M2, P2, V2, `\u210F`, `\\hbar`, true), j2(M2, P2, V2, `\u2203`, `\\exists`, true), j2(M2, P2, V2, `\u2207`, `\\nabla`, true), j2(M2, P2, V2, `\u266D`, `\\flat`, true), j2(M2, P2, V2, `\u2113`, `\\ell`, true), j2(M2, P2, V2, `\u266E`, `\\natural`, true), j2(M2, P2, V2, `\u2663`, `\\clubsuit`, true), j2(M2, P2, V2, `\u2118`, `\\wp`, true), j2(M2, P2, V2, `\u266F`, `\\sharp`, true), j2(M2, P2, V2, `\u2662`, `\\diamondsuit`, true), j2(M2, P2, V2, `\u211C`, `\\Re`, true), j2(M2, P2, V2, `\u2661`, `\\heartsuit`, true), j2(M2, P2, V2, `\u2111`, `\\Im`, true), j2(M2, P2, V2, `\u2660`, `\\spadesuit`, true), j2(M2, P2, V2, `\xA7`, `\\S`, true), j2(N2, P2, V2, `\xA7`, `\\S`), j2(M2, P2, V2, `\xB6`, `\\P`, true), j2(N2, P2, V2, `\xB6`, `\\P`), j2(M2, P2, V2, `\u2020`, `\\dag`), j2(N2, P2, V2, `\u2020`, `\\dag`), j2(N2, P2, V2, `\u2020`, `\\textdagger`), j2(M2, P2, V2, `\u2021`, `\\ddag`), j2(N2, P2, V2, `\u2021`, `\\ddag`), j2(N2, P2, V2, `\u2021`, `\\textdaggerdbl`), j2(M2, P2, Xe2, `\u23B1`, `\\rmoustache`, true), j2(M2, P2, Qe2, `\u23B0`, `\\lmoustache`, true), j2(M2, P2, Xe2, `\u27EF`, `\\rgroup`, true), j2(M2, P2, Qe2, `\u27EE`, `\\lgroup`, true), j2(M2, P2, L2, `\u2213`, `\\mp`, true), j2(M2, P2, L2, `\u2296`, `\\ominus`, true), j2(M2, P2, L2, `\u228E`, `\\uplus`, true), j2(M2, P2, L2, `\u2293`, `\\sqcap`, true), j2(M2, P2, L2, `\u2217`, `\\ast`), j2(M2, P2, L2, `\u2294`, `\\sqcup`, true), j2(M2, P2, L2, `\u25EF`, `\\bigcirc`, true), j2(M2, P2, L2, `\u2219`, `\\bullet`, true), j2(M2, P2, L2, `\u2021`, `\\ddagger`), j2(M2, P2, L2, `\u2240`, `\\wr`, true), j2(M2, P2, L2, `\u2A3F`, `\\amalg`), j2(M2, P2, L2, `&`, `\\And`), j2(M2, P2, B2, `\u27F5`, `\\longleftarrow`, true), j2(M2, P2, B2, `\u21D0`, `\\Leftarrow`, true), j2(M2, P2, B2, `\u27F8`, `\\Longleftarrow`, true), j2(M2, P2, B2, `\u27F6`, `\\longrightarrow`, true), j2(M2, P2, B2, `\u21D2`, `\\Rightarrow`, true), j2(M2, P2, B2, `\u27F9`, `\\Longrightarrow`, true), j2(M2, P2, B2, `\u2194`, `\\leftrightarrow`, true), j2(M2, P2, B2, `\u27F7`, `\\longleftrightarrow`, true), j2(M2, P2, B2, `\u21D4`, `\\Leftrightarrow`, true), j2(M2, P2, B2, `\u27FA`, `\\Longleftrightarrow`, true), j2(M2, P2, B2, `\u21A6`, `\\mapsto`, true), j2(M2, P2, B2, `\u27FC`, `\\longmapsto`, true), j2(M2, P2, B2, `\u2197`, `\\nearrow`, true), j2(M2, P2, B2, `\u21A9`, `\\hookleftarrow`, true), j2(M2, P2, B2, `\u21AA`, `\\hookrightarrow`, true), j2(M2, P2, B2, `\u2198`, `\\searrow`, true), j2(M2, P2, B2, `\u21BC`, `\\leftharpoonup`, true), j2(M2, P2, B2, `\u21C0`, `\\rightharpoonup`, true), j2(M2, P2, B2, `\u2199`, `\\swarrow`, true), j2(M2, P2, B2, `\u21BD`, `\\leftharpoondown`, true), j2(M2, P2, B2, `\u21C1`, `\\rightharpoondown`, true), j2(M2, P2, B2, `\u2196`, `\\nwarrow`, true), j2(M2, P2, B2, `\u21CC`, `\\rightleftharpoons`, true), j2(M2, F2, B2, `\u226E`, `\\nless`, true), j2(M2, F2, B2, `\uE010`, `\\@nleqslant`), j2(M2, F2, B2, `\uE011`, `\\@nleqq`), j2(M2, F2, B2, `\u2A87`, `\\lneq`, true), j2(M2, F2, B2, `\u2268`, `\\lneqq`, true), j2(M2, F2, B2, `\uE00C`, `\\@lvertneqq`), j2(M2, F2, B2, `\u22E6`, `\\lnsim`, true), j2(M2, F2, B2, `\u2A89`, `\\lnapprox`, true), j2(M2, F2, B2, `\u2280`, `\\nprec`, true), j2(M2, F2, B2, `\u22E0`, `\\npreceq`, true), j2(M2, F2, B2, `\u22E8`, `\\precnsim`, true), j2(M2, F2, B2, `\u2AB9`, `\\precnapprox`, true), j2(M2, F2, B2, `\u2241`, `\\nsim`, true), j2(M2, F2, B2, `\uE006`, `\\@nshortmid`), j2(M2, F2, B2, `\u2224`, `\\nmid`, true), j2(M2, F2, B2, `\u22AC`, `\\nvdash`, true), j2(M2, F2, B2, `\u22AD`, `\\nvDash`, true), j2(M2, F2, B2, `\u22EA`, `\\ntriangleleft`), j2(M2, F2, B2, `\u22EC`, `\\ntrianglelefteq`, true), j2(M2, F2, B2, `\u228A`, `\\subsetneq`, true), j2(M2, F2, B2, `\uE01A`, `\\@varsubsetneq`), j2(M2, F2, B2, `\u2ACB`, `\\subsetneqq`, true), j2(M2, F2, B2, `\uE017`, `\\@varsubsetneqq`), j2(M2, F2, B2, `\u226F`, `\\ngtr`, true), j2(M2, F2, B2, `\uE00F`, `\\@ngeqslant`), j2(M2, F2, B2, `\uE00E`, `\\@ngeqq`), j2(M2, F2, B2, `\u2A88`, `\\gneq`, true), j2(M2, F2, B2, `\u2269`, `\\gneqq`, true), j2(M2, F2, B2, `\uE00D`, `\\@gvertneqq`), j2(M2, F2, B2, `\u22E7`, `\\gnsim`, true), j2(M2, F2, B2, `\u2A8A`, `\\gnapprox`, true), j2(M2, F2, B2, `\u2281`, `\\nsucc`, true), j2(M2, F2, B2, `\u22E1`, `\\nsucceq`, true), j2(M2, F2, B2, `\u22E9`, `\\succnsim`, true), j2(M2, F2, B2, `\u2ABA`, `\\succnapprox`, true), j2(M2, F2, B2, `\u2246`, `\\ncong`, true), j2(M2, F2, B2, `\uE007`, `\\@nshortparallel`), j2(M2, F2, B2, `\u2226`, `\\nparallel`, true), j2(M2, F2, B2, `\u22AF`, `\\nVDash`, true), j2(M2, F2, B2, `\u22EB`, `\\ntriangleright`), j2(M2, F2, B2, `\u22ED`, `\\ntrianglerighteq`, true), j2(M2, F2, B2, `\uE018`, `\\@nsupseteqq`), j2(M2, F2, B2, `\u228B`, `\\supsetneq`, true), j2(M2, F2, B2, `\uE01B`, `\\@varsupsetneq`), j2(M2, F2, B2, `\u2ACC`, `\\supsetneqq`, true), j2(M2, F2, B2, `\uE019`, `\\@varsupsetneqq`), j2(M2, F2, B2, `\u22AE`, `\\nVdash`, true), j2(M2, F2, B2, `\u2AB5`, `\\precneqq`, true), j2(M2, F2, B2, `\u2AB6`, `\\succneqq`, true), j2(M2, F2, B2, `\uE016`, `\\@nsubseteqq`), j2(M2, F2, L2, `\u22B4`, `\\unlhd`), j2(M2, F2, L2, `\u22B5`, `\\unrhd`), j2(M2, F2, B2, `\u219A`, `\\nleftarrow`, true), j2(M2, F2, B2, `\u219B`, `\\nrightarrow`, true), j2(M2, F2, B2, `\u21CD`, `\\nLeftarrow`, true), j2(M2, F2, B2, `\u21CF`, `\\nRightarrow`, true), j2(M2, F2, B2, `\u21AE`, `\\nleftrightarrow`, true), j2(M2, F2, B2, `\u21CE`, `\\nLeftrightarrow`, true), j2(M2, F2, B2, `\u25B3`, `\\vartriangle`), j2(M2, F2, V2, `\u210F`, `\\hslash`), j2(M2, F2, V2, `\u25BD`, `\\triangledown`), j2(M2, F2, V2, `\u25CA`, `\\lozenge`), j2(M2, F2, V2, `\u24C8`, `\\circledS`), j2(M2, F2, V2, `\xAE`, `\\circledR`), j2(N2, F2, V2, `\xAE`, `\\circledR`), j2(M2, F2, V2, `\u2221`, `\\measuredangle`, true), j2(M2, F2, V2, `\u2204`, `\\nexists`), j2(M2, F2, V2, `\u2127`, `\\mho`), j2(M2, F2, V2, `\u2132`, `\\Finv`, true), j2(M2, F2, V2, `\u2141`, `\\Game`, true), j2(M2, F2, V2, `\u2035`, `\\backprime`), j2(M2, F2, V2, `\u25B2`, `\\blacktriangle`), j2(M2, F2, V2, `\u25BC`, `\\blacktriangledown`), j2(M2, F2, V2, `\u25A0`, `\\blacksquare`), j2(M2, F2, V2, `\u29EB`, `\\blacklozenge`), j2(M2, F2, V2, `\u2605`, `\\bigstar`), j2(M2, F2, V2, `\u2222`, `\\sphericalangle`, true), j2(M2, F2, V2, `\u2201`, `\\complement`, true), j2(M2, F2, V2, `\xF0`, `\\eth`, true), j2(N2, P2, V2, `\xF0`, `\xF0`), j2(M2, F2, V2, `\u2571`, `\\diagup`), j2(M2, F2, V2, `\u2572`, `\\diagdown`), j2(M2, F2, V2, `\u25A1`, `\\square`), j2(M2, F2, V2, `\u25A1`, `\\Box`), j2(M2, F2, V2, `\u25CA`, `\\Diamond`), j2(M2, F2, V2, `\xA5`, `\\yen`, true), j2(N2, F2, V2, `\xA5`, `\\yen`, true), j2(M2, F2, V2, `\u2713`, `\\checkmark`, true), j2(N2, F2, V2, `\u2713`, `\\checkmark`), j2(M2, F2, V2, `\u2136`, `\\beth`, true), j2(M2, F2, V2, `\u2138`, `\\daleth`, true), j2(M2, F2, V2, `\u2137`, `\\gimel`, true), j2(M2, F2, V2, `\u03DD`, `\\digamma`, true), j2(M2, F2, V2, `\u03F0`, `\\varkappa`), j2(M2, F2, Qe2, `\u250C`, `\\@ulcorner`, true), j2(M2, F2, Xe2, `\u2510`, `\\@urcorner`, true), j2(M2, F2, Qe2, `\u2514`, `\\@llcorner`, true), j2(M2, F2, Xe2, `\u2518`, `\\@lrcorner`, true), j2(M2, F2, B2, `\u2266`, `\\leqq`, true), j2(M2, F2, B2, `\u2A7D`, `\\leqslant`, true), j2(M2, F2, B2, `\u2A95`, `\\eqslantless`, true), j2(M2, F2, B2, `\u2272`, `\\lesssim`, true), j2(M2, F2, B2, `\u2A85`, `\\lessapprox`, true), j2(M2, F2, B2, `\u224A`, `\\approxeq`, true), j2(M2, F2, L2, `\u22D6`, `\\lessdot`), j2(M2, F2, B2, `\u22D8`, `\\lll`, true), j2(M2, F2, B2, `\u2276`, `\\lessgtr`, true), j2(M2, F2, B2, `\u22DA`, `\\lesseqgtr`, true), j2(M2, F2, B2, `\u2A8B`, `\\lesseqqgtr`, true), j2(M2, F2, B2, `\u2251`, `\\doteqdot`), j2(M2, F2, B2, `\u2253`, `\\risingdotseq`, true), j2(M2, F2, B2, `\u2252`, `\\fallingdotseq`, true), j2(M2, F2, B2, `\u223D`, `\\backsim`, true), j2(M2, F2, B2, `\u22CD`, `\\backsimeq`, true), j2(M2, F2, B2, `\u2AC5`, `\\subseteqq`, true), j2(M2, F2, B2, `\u22D0`, `\\Subset`, true), j2(M2, F2, B2, `\u228F`, `\\sqsubset`, true), j2(M2, F2, B2, `\u227C`, `\\preccurlyeq`, true), j2(M2, F2, B2, `\u22DE`, `\\curlyeqprec`, true), j2(M2, F2, B2, `\u227E`, `\\precsim`, true), j2(M2, F2, B2, `\u2AB7`, `\\precapprox`, true), j2(M2, F2, B2, `\u22B2`, `\\vartriangleleft`), j2(M2, F2, B2, `\u22B4`, `\\trianglelefteq`), j2(M2, F2, B2, `\u22A8`, `\\vDash`, true), j2(M2, F2, B2, `\u22AA`, `\\Vvdash`, true), j2(M2, F2, B2, `\u2323`, `\\smallsmile`), j2(M2, F2, B2, `\u2322`, `\\smallfrown`), j2(M2, F2, B2, `\u224F`, `\\bumpeq`, true), j2(M2, F2, B2, `\u224E`, `\\Bumpeq`, true), j2(M2, F2, B2, `\u2267`, `\\geqq`, true), j2(M2, F2, B2, `\u2A7E`, `\\geqslant`, true), j2(M2, F2, B2, `\u2A96`, `\\eqslantgtr`, true), j2(M2, F2, B2, `\u2273`, `\\gtrsim`, true), j2(M2, F2, B2, `\u2A86`, `\\gtrapprox`, true), j2(M2, F2, L2, `\u22D7`, `\\gtrdot`), j2(M2, F2, B2, `\u22D9`, `\\ggg`, true), j2(M2, F2, B2, `\u2277`, `\\gtrless`, true), j2(M2, F2, B2, `\u22DB`, `\\gtreqless`, true), j2(M2, F2, B2, `\u2A8C`, `\\gtreqqless`, true), j2(M2, F2, B2, `\u2256`, `\\eqcirc`, true), j2(M2, F2, B2, `\u2257`, `\\circeq`, true), j2(M2, F2, B2, `\u225C`, `\\triangleq`, true), j2(M2, F2, B2, `\u223C`, `\\thicksim`), j2(M2, F2, B2, `\u2248`, `\\thickapprox`), j2(M2, F2, B2, `\u2AC6`, `\\supseteqq`, true), j2(M2, F2, B2, `\u22D1`, `\\Supset`, true), j2(M2, F2, B2, `\u2290`, `\\sqsupset`, true), j2(M2, F2, B2, `\u227D`, `\\succcurlyeq`, true), j2(M2, F2, B2, `\u22DF`, `\\curlyeqsucc`, true), j2(M2, F2, B2, `\u227F`, `\\succsim`, true), j2(M2, F2, B2, `\u2AB8`, `\\succapprox`, true), j2(M2, F2, B2, `\u22B3`, `\\vartriangleright`), j2(M2, F2, B2, `\u22B5`, `\\trianglerighteq`), j2(M2, F2, B2, `\u22A9`, `\\Vdash`, true), j2(M2, F2, B2, `\u2223`, `\\shortmid`), j2(M2, F2, B2, `\u2225`, `\\shortparallel`), j2(M2, F2, B2, `\u226C`, `\\between`, true), j2(M2, F2, B2, `\u22D4`, `\\pitchfork`, true), j2(M2, F2, B2, `\u221D`, `\\varpropto`), j2(M2, F2, B2, `\u25C0`, `\\blacktriangleleft`), j2(M2, F2, B2, `\u2234`, `\\therefore`, true), j2(M2, F2, B2, `\u220D`, `\\backepsilon`), j2(M2, F2, B2, `\u25B6`, `\\blacktriangleright`), j2(M2, F2, B2, `\u2235`, `\\because`, true), j2(M2, F2, B2, `\u22D8`, `\\llless`), j2(M2, F2, B2, `\u22D9`, `\\gggtr`), j2(M2, F2, L2, `\u22B2`, `\\lhd`), j2(M2, F2, L2, `\u22B3`, `\\rhd`), j2(M2, F2, B2, `\u2242`, `\\eqsim`, true), j2(M2, P2, B2, `\u22C8`, `\\Join`), j2(M2, F2, B2, `\u2251`, `\\Doteq`, true), j2(M2, F2, L2, `\u2214`, `\\dotplus`, true), j2(M2, F2, L2, `\u2216`, `\\smallsetminus`), j2(M2, F2, L2, `\u22D2`, `\\Cap`, true), j2(M2, F2, L2, `\u22D3`, `\\Cup`, true), j2(M2, F2, L2, `\u2A5E`, `\\doublebarwedge`, true), j2(M2, F2, L2, `\u229F`, `\\boxminus`, true), j2(M2, F2, L2, `\u229E`, `\\boxplus`, true), j2(M2, F2, L2, `\u22C7`, `\\divideontimes`, true), j2(M2, F2, L2, `\u22C9`, `\\ltimes`, true), j2(M2, F2, L2, `\u22CA`, `\\rtimes`, true), j2(M2, F2, L2, `\u22CB`, `\\leftthreetimes`, true), j2(M2, F2, L2, `\u22CC`, `\\rightthreetimes`, true), j2(M2, F2, L2, `\u22CF`, `\\curlywedge`, true), j2(M2, F2, L2, `\u22CE`, `\\curlyvee`, true), j2(M2, F2, L2, `\u229D`, `\\circleddash`, true), j2(M2, F2, L2, `\u229B`, `\\circledast`, true), j2(M2, F2, L2, `\u22C5`, `\\centerdot`), j2(M2, F2, L2, `\u22BA`, `\\intercal`, true), j2(M2, F2, L2, `\u22D2`, `\\doublecap`), j2(M2, F2, L2, `\u22D3`, `\\doublecup`), j2(M2, F2, L2, `\u22A0`, `\\boxtimes`, true), j2(M2, F2, B2, `\u21E2`, `\\dashrightarrow`, true), j2(M2, F2, B2, `\u21E0`, `\\dashleftarrow`, true), j2(M2, F2, B2, `\u21C7`, `\\leftleftarrows`, true), j2(M2, F2, B2, `\u21C6`, `\\leftrightarrows`, true), j2(M2, F2, B2, `\u21DA`, `\\Lleftarrow`, true), j2(M2, F2, B2, `\u219E`, `\\twoheadleftarrow`, true), j2(M2, F2, B2, `\u21A2`, `\\leftarrowtail`, true), j2(M2, F2, B2, `\u21AB`, `\\looparrowleft`, true), j2(M2, F2, B2, `\u21CB`, `\\leftrightharpoons`, true), j2(M2, F2, B2, `\u21B6`, `\\curvearrowleft`, true), j2(M2, F2, B2, `\u21BA`, `\\circlearrowleft`, true), j2(M2, F2, B2, `\u21B0`, `\\Lsh`, true), j2(M2, F2, B2, `\u21C8`, `\\upuparrows`, true), j2(M2, F2, B2, `\u21BF`, `\\upharpoonleft`, true), j2(M2, F2, B2, `\u21C3`, `\\downharpoonleft`, true), j2(M2, P2, B2, `\u22B6`, `\\origof`, true), j2(M2, P2, B2, `\u22B7`, `\\imageof`, true), j2(M2, F2, B2, `\u22B8`, `\\multimap`, true), j2(M2, F2, B2, `\u21AD`, `\\leftrightsquigarrow`, true), j2(M2, F2, B2, `\u21C9`, `\\rightrightarrows`, true), j2(M2, F2, B2, `\u21C4`, `\\rightleftarrows`, true), j2(M2, F2, B2, `\u21A0`, `\\twoheadrightarrow`, true), j2(M2, F2, B2, `\u21A3`, `\\rightarrowtail`, true), j2(M2, F2, B2, `\u21AC`, `\\looparrowright`, true), j2(M2, F2, B2, `\u21B7`, `\\curvearrowright`, true), j2(M2, F2, B2, `\u21BB`, `\\circlearrowright`, true), j2(M2, F2, B2, `\u21B1`, `\\Rsh`, true), j2(M2, F2, B2, `\u21CA`, `\\downdownarrows`, true), j2(M2, F2, B2, `\u21BE`, `\\upharpoonright`, true), j2(M2, F2, B2, `\u21C2`, `\\downharpoonright`, true), j2(M2, F2, B2, `\u21DD`, `\\rightsquigarrow`, true), j2(M2, F2, B2, `\u21DD`, `\\leadsto`), j2(M2, F2, B2, `\u21DB`, `\\Rrightarrow`, true), j2(M2, F2, B2, `\u21BE`, `\\restriction`), j2(M2, P2, V2, `\u2018`, "`"), j2(M2, P2, V2, `$`, `\\$`), j2(N2, P2, V2, `$`, `\\$`), j2(N2, P2, V2, `$`, `\\textdollar`), j2(M2, P2, V2, `%`, `\\%`), j2(N2, P2, V2, `%`, `\\%`), j2(M2, P2, V2, `_`, `\\_`), j2(N2, P2, V2, `_`, `\\_`), j2(N2, P2, V2, `_`, `\\textunderscore`), j2(M2, P2, V2, `\u2220`, `\\angle`, true), j2(M2, P2, V2, `\u221E`, `\\infty`, true), j2(M2, P2, V2, `\u2032`, `\\prime`), j2(M2, P2, V2, `\u25B3`, `\\triangle`), j2(M2, P2, V2, `\u0393`, `\\Gamma`, true), j2(M2, P2, V2, `\u0394`, `\\Delta`, true), j2(M2, P2, V2, `\u0398`, `\\Theta`, true), j2(M2, P2, V2, `\u039B`, `\\Lambda`, true), j2(M2, P2, V2, `\u039E`, `\\Xi`, true), j2(M2, P2, V2, `\u03A0`, `\\Pi`, true), j2(M2, P2, V2, `\u03A3`, `\\Sigma`, true), j2(M2, P2, V2, `\u03A5`, `\\Upsilon`, true), j2(M2, P2, V2, `\u03A6`, `\\Phi`, true), j2(M2, P2, V2, `\u03A8`, `\\Psi`, true), j2(M2, P2, V2, `\u03A9`, `\\Omega`, true), j2(M2, P2, V2, `A`, `\u0391`), j2(M2, P2, V2, `B`, `\u0392`), j2(M2, P2, V2, `E`, `\u0395`), j2(M2, P2, V2, `Z`, `\u0396`), j2(M2, P2, V2, `H`, `\u0397`), j2(M2, P2, V2, `I`, `\u0399`), j2(M2, P2, V2, `K`, `\u039A`), j2(M2, P2, V2, `M`, `\u039C`), j2(M2, P2, V2, `N`, `\u039D`), j2(M2, P2, V2, `O`, `\u039F`), j2(M2, P2, V2, `P`, `\u03A1`), j2(M2, P2, V2, `T`, `\u03A4`), j2(M2, P2, V2, `X`, `\u03A7`), j2(M2, P2, V2, `\xAC`, `\\neg`, true), j2(M2, P2, V2, `\xAC`, `\\lnot`), j2(M2, P2, V2, `\u22A4`, `\\top`), j2(M2, P2, V2, `\u22A5`, `\\bot`), j2(M2, P2, V2, `\u2205`, `\\emptyset`), j2(M2, F2, V2, `\u2205`, `\\varnothing`), j2(M2, P2, R2, `\u03B1`, `\\alpha`, true), j2(M2, P2, R2, `\u03B2`, `\\beta`, true), j2(M2, P2, R2, `\u03B3`, `\\gamma`, true), j2(M2, P2, R2, `\u03B4`, `\\delta`, true), j2(M2, P2, R2, `\u03F5`, `\\epsilon`, true), j2(M2, P2, R2, `\u03B6`, `\\zeta`, true), j2(M2, P2, R2, `\u03B7`, `\\eta`, true), j2(M2, P2, R2, `\u03B8`, `\\theta`, true), j2(M2, P2, R2, `\u03B9`, `\\iota`, true), j2(M2, P2, R2, `\u03BA`, `\\kappa`, true), j2(M2, P2, R2, `\u03BB`, `\\lambda`, true), j2(M2, P2, R2, `\u03BC`, `\\mu`, true), j2(M2, P2, R2, `\u03BD`, `\\nu`, true), j2(M2, P2, R2, `\u03BE`, `\\xi`, true), j2(M2, P2, R2, `\u03BF`, `\\omicron`, true), j2(M2, P2, R2, `\u03C0`, `\\pi`, true), j2(M2, P2, R2, `\u03C1`, `\\rho`, true), j2(M2, P2, R2, `\u03C3`, `\\sigma`, true), j2(M2, P2, R2, `\u03C4`, `\\tau`, true), j2(M2, P2, R2, `\u03C5`, `\\upsilon`, true), j2(M2, P2, R2, `\u03D5`, `\\phi`, true), j2(M2, P2, R2, `\u03C7`, `\\chi`, true), j2(M2, P2, R2, `\u03C8`, `\\psi`, true), j2(M2, P2, R2, `\u03C9`, `\\omega`, true), j2(M2, P2, R2, `\u03B5`, `\\varepsilon`, true), j2(M2, P2, R2, `\u03D1`, `\\vartheta`, true), j2(M2, P2, R2, `\u03D6`, `\\varpi`, true), j2(M2, P2, R2, `\u03F1`, `\\varrho`, true), j2(M2, P2, R2, `\u03C2`, `\\varsigma`, true), j2(M2, P2, R2, `\u03C6`, `\\varphi`, true), j2(M2, P2, L2, `\u2217`, `*`, true), j2(M2, P2, L2, `+`, `+`), j2(M2, P2, L2, `\u2212`, `-`, true), j2(M2, P2, L2, `\u22C5`, `\\cdot`, true), j2(M2, P2, L2, `\u2218`, `\\circ`, true), j2(M2, P2, L2, `\xF7`, `\\div`, true), j2(M2, P2, L2, `\xB1`, `\\pm`, true), j2(M2, P2, L2, `\xD7`, `\\times`, true), j2(M2, P2, L2, `\u2229`, `\\cap`, true), j2(M2, P2, L2, `\u222A`, `\\cup`, true), j2(M2, P2, L2, `\u2216`, `\\setminus`, true), j2(M2, P2, L2, `\u2227`, `\\land`), j2(M2, P2, L2, `\u2228`, `\\lor`), j2(M2, P2, L2, `\u2227`, `\\wedge`, true), j2(M2, P2, L2, `\u2228`, `\\vee`, true), j2(M2, P2, V2, `\u221A`, `\\surd`), j2(M2, P2, Qe2, `\u27E8`, `\\langle`, true), j2(M2, P2, Qe2, `\u2223`, `\\lvert`), j2(M2, P2, Qe2, `\u2225`, `\\lVert`), j2(M2, P2, Xe2, `?`, `?`), j2(M2, P2, Xe2, `!`, `!`), j2(M2, P2, Xe2, `\u27E9`, `\\rangle`, true), j2(M2, P2, Xe2, `\u2223`, `\\rvert`), j2(M2, P2, Xe2, `\u2225`, `\\rVert`), j2(M2, P2, B2, `=`, `=`), j2(M2, P2, B2, `:`, `:`), j2(M2, P2, B2, `\u2248`, `\\approx`, true), j2(M2, P2, B2, `\u2245`, `\\cong`, true), j2(M2, P2, B2, `\u2265`, `\\ge`), j2(M2, P2, B2, `\u2265`, `\\geq`, true), j2(M2, P2, B2, `\u2190`, `\\gets`), j2(M2, P2, B2, `>`, `\\gt`, true), j2(M2, P2, B2, `\u2208`, `\\in`, true), j2(M2, P2, B2, `\uE020`, `\\@not`), j2(M2, P2, B2, `\u2282`, `\\subset`, true), j2(M2, P2, B2, `\u2283`, `\\supset`, true), j2(M2, P2, B2, `\u2286`, `\\subseteq`, true), j2(M2, P2, B2, `\u2287`, `\\supseteq`, true), j2(M2, F2, B2, `\u2288`, `\\nsubseteq`, true), j2(M2, F2, B2, `\u2289`, `\\nsupseteq`, true), j2(M2, P2, B2, `\u22A8`, `\\models`), j2(M2, P2, B2, `\u2190`, `\\leftarrow`, true), j2(M2, P2, B2, `\u2264`, `\\le`), j2(M2, P2, B2, `\u2264`, `\\leq`, true), j2(M2, P2, B2, `<`, `\\lt`, true), j2(M2, P2, B2, `\u2192`, `\\rightarrow`, true), j2(M2, P2, B2, `\u2192`, `\\to`), j2(M2, F2, B2, `\u2271`, `\\ngeq`, true), j2(M2, F2, B2, `\u2270`, `\\nleq`, true), j2(M2, P2, et2, `\xA0`, `\\ `), j2(M2, P2, et2, `\xA0`, `\\space`), j2(M2, P2, et2, `\xA0`, `\\nobreakspace`), j2(N2, P2, et2, `\xA0`, `\\ `), j2(N2, P2, et2, `\xA0`, ` `), j2(N2, P2, et2, `\xA0`, `\\space`), j2(N2, P2, et2, `\xA0`, `\\nobreakspace`), j2(M2, P2, et2, ``, `\\nobreak`), j2(M2, P2, et2, ``, `\\allowbreak`), j2(M2, P2, $e2, `,`, `,`), j2(M2, P2, $e2, `;`, `;`), j2(M2, F2, L2, `\u22BC`, `\\barwedge`, true), j2(M2, F2, L2, `\u22BB`, `\\veebar`, true), j2(M2, P2, L2, `\u2299`, `\\odot`, true), j2(M2, P2, L2, `\u2295`, `\\oplus`, true), j2(M2, P2, L2, `\u2297`, `\\otimes`, true), j2(M2, P2, V2, `\u2202`, `\\partial`, true), j2(M2, P2, L2, `\u2298`, `\\oslash`, true), j2(M2, F2, L2, `\u229A`, `\\circledcirc`, true), j2(M2, F2, L2, `\u22A1`, `\\boxdot`, true), j2(M2, P2, L2, `\u25B3`, `\\bigtriangleup`), j2(M2, P2, L2, `\u25BD`, `\\bigtriangledown`), j2(M2, P2, L2, `\u2020`, `\\dagger`), j2(M2, P2, L2, `\u22C4`, `\\diamond`), j2(M2, P2, L2, `\u22C6`, `\\star`), j2(M2, P2, L2, `\u25C3`, `\\triangleleft`), j2(M2, P2, L2, `\u25B9`, `\\triangleright`), j2(M2, P2, Qe2, `{`, `\\{`), j2(N2, P2, V2, `{`, `\\{`), j2(N2, P2, V2, `{`, `\\textbraceleft`), j2(M2, P2, Xe2, `}`, `\\}`), j2(N2, P2, V2, `}`, `\\}`), j2(N2, P2, V2, `}`, `\\textbraceright`), j2(M2, P2, Qe2, `{`, `\\lbrace`), j2(M2, P2, Xe2, `}`, `\\rbrace`), j2(M2, P2, Qe2, `[`, `\\lbrack`, true), j2(N2, P2, V2, `[`, `\\lbrack`, true), j2(M2, P2, Xe2, `]`, `\\rbrack`, true), j2(N2, P2, V2, `]`, `\\rbrack`, true), j2(M2, P2, Qe2, `(`, `\\lparen`, true), j2(M2, P2, Xe2, `)`, `\\rparen`, true), j2(N2, P2, V2, `<`, `\\textless`, true), j2(N2, P2, V2, `>`, `\\textgreater`, true), j2(M2, P2, Qe2, `\u230A`, `\\lfloor`, true), j2(M2, P2, Xe2, `\u230B`, `\\rfloor`, true), j2(M2, P2, Qe2, `\u2308`, `\\lceil`, true), j2(M2, P2, Xe2, `\u2309`, `\\rceil`, true), j2(M2, P2, V2, `\\`, `\\backslash`), j2(M2, P2, V2, `\u2223`, `|`), j2(M2, P2, V2, `\u2223`, `\\vert`), j2(N2, P2, V2, `|`, `\\textbar`, true), j2(M2, P2, V2, `\u2225`, `\\|`), j2(M2, P2, V2, `\u2225`, `\\Vert`), j2(N2, P2, V2, `\u2225`, `\\textbardbl`), j2(N2, P2, V2, `~`, `\\textasciitilde`), j2(N2, P2, V2, `\\`, `\\textbackslash`), j2(N2, P2, V2, `^`, `\\textasciicircum`), j2(M2, P2, B2, `\u2191`, `\\uparrow`, true), j2(M2, P2, B2, `\u21D1`, `\\Uparrow`, true), j2(M2, P2, B2, `\u2193`, `\\downarrow`, true), j2(M2, P2, B2, `\u21D3`, `\\Downarrow`, true), j2(M2, P2, B2, `\u2195`, `\\updownarrow`, true), j2(M2, P2, B2, `\u21D5`, `\\Updownarrow`, true), j2(M2, P2, z2, `\u2210`, `\\coprod`), j2(M2, P2, z2, `\u22C1`, `\\bigvee`), j2(M2, P2, z2, `\u22C0`, `\\bigwedge`), j2(M2, P2, z2, `\u2A04`, `\\biguplus`), j2(M2, P2, z2, `\u22C2`, `\\bigcap`), j2(M2, P2, z2, `\u22C3`, `\\bigcup`), j2(M2, P2, z2, `\u222B`, `\\int`), j2(M2, P2, z2, `\u222B`, `\\intop`), j2(M2, P2, z2, `\u222C`, `\\iint`), j2(M2, P2, z2, `\u222D`, `\\iiint`), j2(M2, P2, z2, `\u220F`, `\\prod`), j2(M2, P2, z2, `\u2211`, `\\sum`), j2(M2, P2, z2, `\u2A02`, `\\bigotimes`), j2(M2, P2, z2, `\u2A01`, `\\bigoplus`), j2(M2, P2, z2, `\u2A00`, `\\bigodot`), j2(M2, P2, z2, `\u222E`, `\\oint`), j2(M2, P2, z2, `\u222F`, `\\oiint`), j2(M2, P2, z2, `\u2230`, `\\oiiint`), j2(M2, P2, z2, `\u2A06`, `\\bigsqcup`), j2(M2, P2, z2, `\u222B`, `\\smallint`), j2(N2, P2, Ze2, `\u2026`, `\\textellipsis`), j2(M2, P2, Ze2, `\u2026`, `\\mathellipsis`), j2(N2, P2, Ze2, `\u2026`, `\\ldots`, true), j2(M2, P2, Ze2, `\u2026`, `\\ldots`, true), j2(M2, P2, Ze2, `\u22EF`, `\\@cdots`, true), j2(M2, P2, Ze2, `\u22F1`, `\\ddots`, true), j2(M2, P2, V2, `\u22EE`, `\\varvdots`), j2(N2, P2, V2, `\u22EE`, `\\varvdots`), j2(M2, P2, I2, `\u02CA`, `\\acute`), j2(M2, P2, I2, `\u02CB`, `\\grave`), j2(M2, P2, I2, `\xA8`, `\\ddot`), j2(M2, P2, I2, `~`, `\\tilde`), j2(M2, P2, I2, `\u02C9`, `\\bar`), j2(M2, P2, I2, `\u02D8`, `\\breve`), j2(M2, P2, I2, `\u02C7`, `\\check`), j2(M2, P2, I2, `^`, `\\hat`), j2(M2, P2, I2, `\u20D7`, `\\vec`), j2(M2, P2, I2, `\u02D9`, `\\dot`), j2(M2, P2, I2, `\u02DA`, `\\mathring`), j2(M2, P2, R2, `\uE131`, `\\@imath`), j2(M2, P2, R2, `\uE237`, `\\@jmath`), j2(M2, P2, V2, `\u0131`, `\u0131`), j2(M2, P2, V2, `\u0237`, `\u0237`), j2(N2, P2, V2, `\u0131`, `\\i`, true), j2(N2, P2, V2, `\u0237`, `\\j`, true), j2(N2, P2, V2, `\xDF`, `\\ss`, true), j2(N2, P2, V2, `\xE6`, `\\ae`, true), j2(N2, P2, V2, `\u0153`, `\\oe`, true), j2(N2, P2, V2, `\xF8`, `\\o`, true), j2(N2, P2, V2, `\xC6`, `\\AE`, true), j2(N2, P2, V2, `\u0152`, `\\OE`, true), j2(N2, P2, V2, `\xD8`, `\\O`, true), j2(N2, P2, I2, `\u02CA`, `\\'`), j2(N2, P2, I2, `\u02CB`, "\\`"), j2(N2, P2, I2, `\u02C6`, `\\^`), j2(N2, P2, I2, `\u02DC`, `\\~`), j2(N2, P2, I2, `\u02C9`, `\\=`), j2(N2, P2, I2, `\u02D8`, `\\u`), j2(N2, P2, I2, `\u02D9`, `\\.`), j2(N2, P2, I2, `\xB8`, `\\c`), j2(N2, P2, I2, `\u02DA`, `\\r`), j2(N2, P2, I2, `\u02C7`, `\\v`), j2(N2, P2, I2, `\xA8`, `\\"`), j2(N2, P2, I2, `\u02DD`, `\\H`), j2(N2, P2, I2, `\u25EF`, `\\textcircled`);
  var tt2 = { "--": true, "---": true, "``": true, "''": true };
  j2(N2, P2, V2, `\u2013`, `--`, true), j2(N2, P2, V2, `\u2013`, `\\textendash`), j2(N2, P2, V2, `\u2014`, `---`, true), j2(N2, P2, V2, `\u2014`, `\\textemdash`), j2(N2, P2, V2, `\u2018`, "`", true), j2(N2, P2, V2, `\u2018`, `\\textquoteleft`), j2(N2, P2, V2, `\u2019`, `'`, true), j2(N2, P2, V2, `\u2019`, `\\textquoteright`), j2(N2, P2, V2, `\u201C`, "``", true), j2(N2, P2, V2, `\u201C`, `\\textquotedblleft`), j2(N2, P2, V2, `\u201D`, `''`, true), j2(N2, P2, V2, `\u201D`, `\\textquotedblright`), j2(M2, P2, V2, `\xB0`, `\\degree`, true), j2(N2, P2, V2, `\xB0`, `\\degree`), j2(N2, P2, V2, `\xB0`, `\\textdegree`, true), j2(M2, P2, V2, `\xA3`, `\\pounds`), j2(M2, P2, V2, `\xA3`, `\\mathsterling`, true), j2(N2, P2, V2, `\xA3`, `\\pounds`), j2(N2, P2, V2, `\xA3`, `\\textsterling`, true), j2(M2, F2, V2, `\u2720`, `\\maltese`), j2(N2, F2, V2, `\u2720`, `\\maltese`);
  for (nt3 = `0123456789/@."`, rt4 = 0; rt4 < nt3.length; rt4++) {
    it4 = nt3.charAt(rt4);
    j2(M2, P2, V2, it4, it4);
  }
  var it4;
  var nt3;
  var rt4;
  for (at4 = `0123456789!@*()-=+";:?/.,`, ot3 = 0; ot3 < at4.length; ot3++) {
    st3 = at4.charAt(ot3);
    j2(N2, P2, V2, st3, st3);
  }
  var st3;
  var at4;
  var ot3;
  for (ct3 = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz`, lt4 = 0; lt4 < ct3.length; lt4++) {
    ut4 = ct3.charAt(lt4);
    j2(M2, P2, R2, ut4, ut4), j2(N2, P2, V2, ut4, ut4);
  }
  var ut4;
  var ct3;
  var lt4;
  j2(M2, F2, V2, `C`, `\u2102`), j2(N2, F2, V2, `C`, `\u2102`), j2(M2, F2, V2, `H`, `\u210D`), j2(N2, F2, V2, `H`, `\u210D`), j2(M2, F2, V2, `N`, `\u2115`), j2(N2, F2, V2, `N`, `\u2115`), j2(M2, F2, V2, `P`, `\u2119`), j2(N2, F2, V2, `P`, `\u2119`), j2(M2, F2, V2, `Q`, `\u211A`), j2(N2, F2, V2, `Q`, `\u211A`), j2(M2, F2, V2, `R`, `\u211D`), j2(N2, F2, V2, `R`, `\u211D`), j2(M2, F2, V2, `Z`, `\u2124`), j2(N2, F2, V2, `Z`, `\u2124`), j2(M2, P2, R2, `h`, `\u210E`), j2(N2, P2, R2, `h`, `\u210E`);
  for (dt3 = 0; dt3 < ct3.length; dt3++) {
    U5 = ct3.charAt(dt3);
    H5 = String.fromCharCode(55349, 56320 + dt3), j2(M2, P2, R2, U5, H5), j2(N2, P2, V2, U5, H5), H5 = String.fromCharCode(55349, 56372 + dt3), j2(M2, P2, R2, U5, H5), j2(N2, P2, V2, U5, H5), H5 = String.fromCharCode(55349, 56424 + dt3), j2(M2, P2, R2, U5, H5), j2(N2, P2, V2, U5, H5), H5 = String.fromCharCode(55349, 56580 + dt3), j2(M2, P2, R2, U5, H5), j2(N2, P2, V2, U5, H5), H5 = String.fromCharCode(55349, 56684 + dt3), j2(M2, P2, R2, U5, H5), j2(N2, P2, V2, U5, H5), H5 = String.fromCharCode(55349, 56736 + dt3), j2(M2, P2, R2, U5, H5), j2(N2, P2, V2, U5, H5), H5 = String.fromCharCode(55349, 56788 + dt3), j2(M2, P2, R2, U5, H5), j2(N2, P2, V2, U5, H5), H5 = String.fromCharCode(55349, 56840 + dt3), j2(M2, P2, R2, U5, H5), j2(N2, P2, V2, U5, H5), H5 = String.fromCharCode(55349, 56944 + dt3), j2(M2, P2, R2, U5, H5), j2(N2, P2, V2, U5, H5), dt3 < 26 && (H5 = String.fromCharCode(55349, 56632 + dt3), j2(M2, P2, R2, U5, H5), j2(N2, P2, V2, U5, H5), H5 = String.fromCharCode(55349, 56476 + dt3), j2(M2, P2, R2, U5, H5), j2(N2, P2, V2, U5, H5));
  }
  var U5;
  var H5;
  var dt3;
  H5 = String.fromCharCode(55349, 56668), j2(M2, P2, R2, `k`, H5), j2(N2, P2, V2, `k`, H5);
  for (ft4 = 0; ft4 < 10; ft4++) {
    pt4 = ft4.toString();
    H5 = String.fromCharCode(55349, 57294 + ft4), j2(M2, P2, R2, pt4, H5), j2(N2, P2, V2, pt4, H5), H5 = String.fromCharCode(55349, 57314 + ft4), j2(M2, P2, R2, pt4, H5), j2(N2, P2, V2, pt4, H5), H5 = String.fromCharCode(55349, 57324 + ft4), j2(M2, P2, R2, pt4, H5), j2(N2, P2, V2, pt4, H5), H5 = String.fromCharCode(55349, 57334 + ft4), j2(M2, P2, R2, pt4, H5), j2(N2, P2, V2, pt4, H5);
  }
  var pt4;
  var ft4;
  for (mt4 = `\xD0\xDE\xFE`, ht4 = 0; ht4 < mt4.length; ht4++) {
    gt4 = mt4.charAt(ht4);
    j2(M2, P2, R2, gt4, gt4), j2(N2, P2, V2, gt4, gt4);
  }
  var gt4;
  var mt4;
  var ht4;
  var _t2 = { mathClass: `mathbf`, textClass: `textbf`, font: `Main-Bold` };
  var vt2 = { mathClass: `mathnormal`, textClass: `textit`, font: `Math-Italic` };
  var yt2 = { mathClass: `boldsymbol`, textClass: `boldsymbol`, font: `Main-BoldItalic` };
  var bt2 = { mathClass: `mathscr`, textClass: `textscr`, font: `Script-Regular` };
  var xt2 = { mathClass: ``, textClass: ``, font: `` };
  var St2 = { mathClass: `mathfrak`, textClass: `textfrak`, font: `Fraktur-Regular` };
  var Ct2 = { mathClass: `mathbb`, textClass: `textbb`, font: `AMS-Regular` };
  var wt2 = { mathClass: `mathboldfrak`, textClass: `textboldfrak`, font: `Fraktur-Regular` };
  var Tt2 = { mathClass: `mathsf`, textClass: `textsf`, font: `SansSerif-Regular` };
  var Et2 = { mathClass: `mathboldsf`, textClass: `textboldsf`, font: `SansSerif-Bold` };
  var Dt2 = { mathClass: `mathitsf`, textClass: `textitsf`, font: `SansSerif-Italic` };
  var Ot2 = { mathClass: `mathtt`, textClass: `texttt`, font: `Typewriter-Regular` };
  var kt2 = [_t2, _t2, vt2, vt2, yt2, yt2, bt2, xt2, xt2, xt2, St2, St2, Ct2, Ct2, wt2, wt2, Tt2, Tt2, Et2, Et2, Dt2, Dt2, xt2, xt2, Ot2, Ot2];
  var At2 = [_t2, xt2, Tt2, Et2, Ot2];
  var jt2 = (t8) => {
    var n4 = t8.charCodeAt(0), r5 = t8.charCodeAt(1), i5 = (n4 - 55296) * 1024 + (r5 - 56320) + 65536;
    if (119808 <= i5 && i5 < 120484) return kt2[Math.floor((i5 - 119808) / 26)];
    if (120782 <= i5 && i5 <= 120831) return At2[Math.floor((i5 - 120782) / 10)];
    if (i5 === 120485 || i5 === 120486) return kt2[0];
    if (120486 < i5 && i5 < 120782) return xt2;
    throw new e2(`Unsupported character: ` + t8);
  };
  var Mt2 = function(e10, t8, n4) {
    if (A2[n4][e10]) {
      var r5 = A2[n4][e10].replace;
      r5 && (e10 = r5);
    }
    return { value: e10, metrics: qe2(e10, t8, n4) };
  };
  var Nt2 = function(e10, t8, n4, r5, i5) {
    var a5 = Mt2(e10, t8, n4), o5 = a5.metrics;
    e10 = a5.value;
    var s6;
    if (o5) {
      var c4 = o5.italic;
      (n4 === `text` || r5 && r5.font === `mathit`) && (c4 = 0), s6 = new Ie2(e10, o5.height, o5.depth, c4, o5.skew, o5.width, i5);
    } else typeof console < `u` && console.warn(`No character metrics ` + (`for '` + e10 + `' in style '` + t8 + `' and mode '` + n4 + `'`)), s6 = new Ie2(e10, 0, 0, 0, 0, 0, i5);
    if (r5) {
      s6.maxFontSize = r5.sizeMultiplier, r5.style.isTight() && s6.classes.push(`mtight`);
      var l4 = r5.getColor();
      l4 && (s6.style.color = l4);
    }
    return s6;
  };
  var Pt2 = function(e10, t8, n4, r5) {
    return r5 === void 0 && (r5 = []), n4.font === `boldsymbol` && Mt2(e10, `Main-Bold`, t8).metrics ? Nt2(e10, `Main-Bold`, t8, n4, r5.concat([`mathbf`])) : e10 === `\\` || A2[t8][e10].font === `main` ? Nt2(e10, `Main-Regular`, t8, n4, r5) : Nt2(e10, `AMS-Regular`, t8, n4, r5.concat([`amsrm`]));
  };
  var Ft2 = function(e10, t8, n4) {
    return n4 !== `textord` && Mt2(e10, `Math-BoldItalic`, t8).metrics ? { fontName: `Math-BoldItalic`, fontClass: `boldsymbol` } : { fontName: `Main-Bold`, fontClass: `mathbf` };
  };
  var It2 = function(e10, t8, n4) {
    var r5 = e10.mode, i5 = e10.text, a5 = [`mord`], { font: o5, fontFamily: s6, fontWeight: c4, fontShape: l4 } = t8, u4 = r5 === `math` || r5 === `text` && !!o5, d5 = u4 ? o5 : s6, f6 = ``, p4 = ``;
    if (i5.charCodeAt(0) === 55349) {
      var m5 = jt2(i5);
      f6 = m5.font, p4 = m5[r5 + `Class`];
    }
    if (f6) return Nt2(i5, f6, r5, t8, a5.concat(p4));
    if (d5) {
      var h5, g6;
      if (d5 === `boldsymbol`) {
        var _6 = Ft2(i5, r5, n4);
        h5 = _6.fontName, g6 = [_6.fontClass];
      } else u4 ? (h5 = Jt2[o5].fontName, g6 = [o5]) : (h5 = qt2(s6, c4, l4), g6 = [s6, c4, l4]);
      if (Mt2(i5, h5, r5).metrics) return Nt2(i5, h5, r5, t8, a5.concat(g6));
      if (tt2.hasOwnProperty(i5) && h5.slice(0, 10) === `Typewriter`) {
        for (var v7 = [], y7 = 0; y7 < i5.length; y7++) v7.push(Nt2(i5[y7], h5, r5, t8, a5.concat(g6)));
        return Ut2(v7);
      }
    }
    if (n4 === `mathord`) return Nt2(i5, `Math-Italic`, r5, t8, a5.concat([`mathnormal`]));
    if (n4 === `textord`) {
      var b6 = A2[r5][i5] && A2[r5][i5].font;
      if (b6 === `ams`) return Nt2(i5, qt2(`amsrm`, c4, l4), r5, t8, a5.concat(`amsrm`, c4, l4));
      if (b6 === `main` || !b6) return Nt2(i5, qt2(`textrm`, c4, l4), r5, t8, a5.concat(c4, l4));
      var x5 = qt2(b6, c4, l4);
      return Nt2(i5, x5, r5, t8, a5.concat(x5, c4, l4));
    }
    throw Error(`unexpected type: ` + n4 + ` in makeOrd`);
  };
  var Lt2 = (e10, t8) => {
    if (Ee(e10.classes) !== Ee(t8.classes) || e10.skew !== t8.skew || e10.maxFontSize !== t8.maxFontSize || e10.italic !== 0 && e10.hasClass(`mathnormal`)) return false;
    if (e10.classes.length === 1) {
      var n4 = e10.classes[0];
      if (n4 === `mbin` || n4 === `mord`) return false;
    }
    for (var r5 of Object.keys(e10.style)) if (e10.style[r5] !== t8.style[r5]) return false;
    for (var i5 of Object.keys(t8.style)) if (e10.style[i5] !== t8.style[i5]) return false;
    return true;
  };
  var Rt2 = (e10) => {
    for (var t8 = 0; t8 < e10.length - 1; t8++) {
      var n4 = e10[t8], r5 = e10[t8 + 1];
      n4 instanceof Ie2 && r5 instanceof Ie2 && Lt2(n4, r5) && (n4.text += r5.text, n4.height = Math.max(n4.height, r5.height), n4.depth = Math.max(n4.depth, r5.depth), n4.italic = r5.italic, e10.splice(t8 + 1, 1), t8--);
    }
    return e10;
  };
  var zt2 = function(e10) {
    for (var t8 = 0, n4 = 0, r5 = 0, i5 = 0; i5 < e10.children.length; i5++) {
      var a5 = e10.children[i5];
      a5.height > t8 && (t8 = a5.height), a5.depth > n4 && (n4 = a5.depth), a5.maxFontSize > r5 && (r5 = a5.maxFontSize);
    }
    e10.height = t8, e10.depth = n4, e10.maxFontSize = r5;
  };
  var W2 = function(e10, t8, n4, r5) {
    var i5 = new Me2(e10, t8, n4, r5);
    return zt2(i5), i5;
  };
  var Bt2 = (e10, t8, n4, r5) => new Me2(e10, t8, n4, r5);
  var Vt2 = function(e10, t8, n4) {
    var r5 = W2([e10], [], t8);
    return r5.height = Math.max(n4 || t8.fontMetrics().defaultRuleThickness, t8.minRuleThickness), r5.style.borderBottomWidth = k2(r5.height), r5.maxFontSize = 1, r5;
  };
  var Ht2 = function(e10, t8, n4, r5) {
    var i5 = new Ne2(e10, t8, n4, r5);
    return zt2(i5), i5;
  };
  var Ut2 = function(e10) {
    var t8 = new Se2(e10);
    return zt2(t8), t8;
  };
  var Wt2 = function(e10, t8) {
    return e10 instanceof Se2 ? W2([], [e10], t8) : e10;
  };
  var Gt2 = function(e10) {
    if (e10.positionType === `individualShift`) {
      for (var t8 = e10.children, n4 = [t8[0]], r5 = -t8[0].shift - t8[0].elem.depth, i5 = r5, a5 = 1; a5 < t8.length; a5++) {
        var o5 = -t8[a5].shift - i5 - t8[a5].elem.depth, s6 = o5 - (t8[a5 - 1].elem.height + t8[a5 - 1].elem.depth);
        i5 += o5, n4.push({ type: `kern`, size: s6 }), n4.push(t8[a5]);
      }
      return { children: n4, depth: r5 };
    }
    var c4;
    if (e10.positionType === `top`) {
      for (var l4 = e10.positionData, u4 = 0; u4 < e10.children.length; u4++) {
        var d5 = e10.children[u4];
        l4 -= d5.type === `kern` ? d5.size : d5.elem.height + d5.elem.depth;
      }
      c4 = l4;
    } else if (e10.positionType === `bottom`) c4 = -e10.positionData;
    else {
      var f6 = e10.children[0];
      if (f6.type !== `elem`) throw Error(`First child must have type "elem".`);
      if (e10.positionType === `shift`) c4 = -f6.elem.depth - e10.positionData;
      else if (e10.positionType === `firstBaseline`) c4 = -f6.elem.depth;
      else throw Error(`Invalid positionType ` + e10.positionType + `.`);
    }
    return { children: e10.children, depth: c4 };
  };
  var G2 = function(e10, t8) {
    for (var { children: n4, depth: r5 } = Gt2(e10), i5 = 0, a5 = 0; a5 < n4.length; a5++) {
      var o5 = n4[a5];
      if (o5.type === `elem`) {
        var s6 = o5.elem;
        i5 = Math.max(i5, s6.maxFontSize, s6.height);
      }
    }
    i5 += 2;
    var c4 = W2([`pstrut`], []);
    c4.style.height = k2(i5);
    for (var l4 = [], u4 = r5, d5 = r5, f6 = r5, p4 = 0; p4 < n4.length; p4++) {
      var m5 = n4[p4];
      if (m5.type === `kern`) f6 += m5.size;
      else {
        var h5 = m5.elem, g6 = m5.wrapperClasses || [], _6 = m5.wrapperStyle || {}, v7 = W2(g6, [c4, h5], void 0, _6);
        v7.style.top = k2(-i5 - f6 - h5.depth), m5.marginLeft && (v7.style.marginLeft = m5.marginLeft), m5.marginRight && (v7.style.marginRight = m5.marginRight), l4.push(v7), f6 += h5.height + h5.depth;
      }
      u4 = Math.min(u4, f6), d5 = Math.max(d5, f6);
    }
    var y7 = W2([`vlist`], l4);
    y7.style.height = k2(d5);
    var b6;
    if (u4 < 0) {
      var x5 = W2([`vlist`], [W2([], [])]);
      x5.style.height = k2(-u4), b6 = [W2([`vlist-r`], [y7, W2([`vlist-s`], [new Ie2(`\u200B`)])]), W2([`vlist-r`], [x5])];
    } else b6 = [W2([`vlist-r`], [y7])];
    var S5 = W2([`vlist-t`], b6);
    return b6.length === 2 && S5.classes.push(`vlist-t2`), S5.height = d5, S5.depth = -u4, S5;
  };
  var Kt = (e10, t8) => {
    var n4 = W2([`mspace`], [], t8), r5 = O2(e10, t8);
    return n4.style.marginRight = k2(r5), n4;
  };
  var qt2 = (e10, t8, n4) => {
    var r5, i5;
    switch (e10) {
      case `amsrm`:
        r5 = `AMS`;
        break;
      case `textrm`:
        r5 = `Main`;
        break;
      case `textsf`:
        r5 = `SansSerif`;
        break;
      case `texttt`:
        r5 = `Typewriter`;
        break;
      default:
        r5 = e10;
    }
    return i5 = t8 === `textbf` && n4 === `textit` ? `BoldItalic` : t8 === `textbf` ? `Bold` : n4 === `textit` ? `Italic` : `Regular`, r5 + `-` + i5;
  };
  var Jt2 = { mathbf: { variant: `bold`, fontName: `Main-Bold` }, mathrm: { variant: `normal`, fontName: `Main-Regular` }, textit: { variant: `italic`, fontName: `Main-Italic` }, mathit: { variant: `italic`, fontName: `Main-Italic` }, mathnormal: { variant: `italic`, fontName: `Math-Italic` }, mathsfit: { variant: `sans-serif-italic`, fontName: `SansSerif-Italic` }, mathbb: { variant: `double-struck`, fontName: `AMS-Regular` }, mathcal: { variant: `script`, fontName: `Caligraphic-Regular` }, mathfrak: { variant: `fraktur`, fontName: `Fraktur-Regular` }, mathscr: { variant: `script`, fontName: `Script-Regular` }, mathsf: { variant: `sans-serif`, fontName: `SansSerif-Regular` }, mathtt: { variant: `monospace`, fontName: `Typewriter-Regular` } };
  var Yt2 = { vec: [`vec`, 0.471, 0.714], oiintSize1: [`oiintSize1`, 0.957, 0.499], oiintSize2: [`oiintSize2`, 1.472, 0.659], oiiintSize1: [`oiiintSize1`, 1.304, 0.499], oiiintSize2: [`oiiintSize2`, 1.98, 0.659] };
  var Xt = function(e10, t8) {
    var [n4, r5, i5] = Yt2[e10], a5 = Bt2([`overlay`], [new Le2([new Re2(n4)], { width: k2(r5), height: k2(i5), style: `width:` + k2(r5), viewBox: `0 0 ` + 1e3 * r5 + ` ` + 1e3 * i5, preserveAspectRatio: `xMinYMin` })], t8);
    return a5.height = i5, a5.style.height = k2(i5), a5.style.width = k2(r5), a5;
  };
  var K2 = { number: 3, unit: `mu` };
  var Zt2 = { number: 4, unit: `mu` };
  var Qt2 = { number: 5, unit: `mu` };
  var $t2 = { mord: { mop: K2, mbin: Zt2, mrel: Qt2, minner: K2 }, mop: { mord: K2, mop: K2, mrel: Qt2, minner: K2 }, mbin: { mord: Zt2, mop: Zt2, mopen: Zt2, minner: Zt2 }, mrel: { mord: Qt2, mop: Qt2, mopen: Qt2, minner: Qt2 }, mopen: {}, mclose: { mop: K2, mbin: Zt2, mrel: Qt2, minner: K2 }, mpunct: { mord: K2, mop: K2, mrel: Qt2, mopen: K2, mclose: K2, mpunct: K2, minner: K2 }, minner: { mord: K2, mop: K2, mbin: Zt2, mrel: Qt2, mopen: K2, mpunct: K2, minner: K2 } };
  var en2 = { mord: { mop: K2 }, mop: { mord: K2, mop: K2 }, mbin: {}, mrel: {}, mopen: {}, mclose: { mop: K2 }, mpunct: {}, minner: { mop: K2 } };
  var tn = {};
  var nn = {};
  var rn = {};
  function q2(e10) {
    for (var { type: t8, names: n4, props: r5, handler: i5, htmlBuilder: a5, mathmlBuilder: o5 } = e10, s6 = { type: t8, numArgs: r5.numArgs, argTypes: r5.argTypes, allowedInArgument: !!r5.allowedInArgument, allowedInText: !!r5.allowedInText, allowedInMath: r5.allowedInMath === void 0 || r5.allowedInMath, numOptionalArgs: r5.numOptionalArgs || 0, infix: !!r5.infix, primitive: !!r5.primitive, handler: i5 }, c4 = 0; c4 < n4.length; ++c4) tn[n4[c4]] = s6;
    t8 && (a5 && (nn[t8] = a5), o5 && (rn[t8] = o5));
  }
  function an(e10) {
    var { type: t8, htmlBuilder: n4, mathmlBuilder: r5 } = e10;
    q2({ type: t8, names: [], props: { numArgs: 0 }, handler() {
      throw Error(`Should never be called.`);
    }, htmlBuilder: n4, mathmlBuilder: r5 });
  }
  var on = function(e10) {
    return e10.type === `ordgroup` && e10.body.length === 1 ? e10.body[0] : e10;
  };
  var J2 = function(e10) {
    return e10.type === `ordgroup` ? e10.body : [e10];
  };
  var sn2 = /* @__PURE__ */ new Set([`leftmost`, `mbin`, `mopen`, `mrel`, `mop`, `mpunct`]);
  var cn2 = /* @__PURE__ */ new Set([`rightmost`, `mrel`, `mclose`, `mpunct`]);
  var ln2 = { display: E2.DISPLAY, text: E2.TEXT, script: E2.SCRIPT, scriptscript: E2.SCRIPTSCRIPT };
  var un2 = { mord: `mord`, mop: `mop`, mbin: `mbin`, mrel: `mrel`, mopen: `mopen`, mclose: `mclose`, mpunct: `mpunct`, minner: `minner` };
  var dn2 = function(e10, t8, n4, r5) {
    r5 === void 0 && (r5 = [null, null]);
    for (var i5 = [], a5 = 0; a5 < e10.length; a5++) {
      var o5 = Y2(e10[a5], t8);
      if (o5 instanceof Se2) {
        var s6 = o5.children;
        i5.push(...s6);
      } else i5.push(o5);
    }
    if (Rt2(i5), !n4) return i5;
    var c4 = t8;
    if (e10.length === 1) {
      var l4 = e10[0];
      l4.type === `sizing` ? c4 = t8.havingSize(l4.size) : l4.type === `styling` && (c4 = t8.havingStyle(ln2[l4.style]));
    }
    var u4 = W2([r5[0] || `leftmost`], [], t8), d5 = W2([r5[1] || `rightmost`], [], t8), f6 = n4 === `root`;
    return fn2(i5, (e11, t9) => {
      var n5 = t9.classes[0], r6 = e11.classes[0];
      n5 === `mbin` && cn2.has(r6) ? t9.classes[0] = `mord` : r6 === `mbin` && sn2.has(n5) && (e11.classes[0] = `mord`);
    }, { node: u4 }, d5, f6), fn2(i5, (e11, t9) => {
      var n5 = hn2(t9), r6 = hn2(e11), i6 = n5 && r6 ? e11.hasClass(`mtight`) ? en2[n5]?.[r6] : $t2[n5]?.[r6] : null;
      if (i6) return Kt(i6, c4);
    }, { node: u4 }, d5, f6), i5;
  };
  var fn2 = function(e10, t8, n4, r5, i5) {
    r5 && e10.push(r5);
    for (var a5 = 0; a5 < e10.length; a5++) {
      var o5 = e10[a5], s6 = pn2(o5);
      if (s6) {
        fn2(s6.children, t8, n4, null, i5);
        continue;
      }
      var c4 = !o5.hasClass(`mspace`);
      if (c4) {
        var l4 = t8(o5, n4.node);
        l4 && (n4.insertAfter ? n4.insertAfter(l4) : (e10.unshift(l4), a5++));
      }
      c4 ? n4.node = o5 : i5 && o5.hasClass(`newline`) && (n4.node = W2([`leftmost`])), n4.insertAfter = /* @__PURE__ */ ((t9) => (n5) => {
        e10.splice(t9 + 1, 0, n5), a5++;
      })(a5);
    }
    r5 && e10.pop();
  };
  var pn2 = function(e10) {
    return e10 instanceof Se2 || e10 instanceof Ne2 || e10 instanceof Me2 && e10.hasClass(`enclosing`) ? e10 : null;
  };
  var mn2 = function(e10, t8) {
    var n4 = pn2(e10);
    if (n4) {
      var r5 = n4.children;
      if (r5.length) {
        if (t8 === `right`) return mn2(r5[r5.length - 1], `right`);
        if (t8 === `left`) return mn2(r5[0], `left`);
      }
    }
    return e10;
  };
  var hn2 = function(e10, t8) {
    return e10 ? (t8 && (e10 = mn2(e10, t8)), un2[e10.classes[0]] || null) : null;
  };
  var gn2 = function(e10, t8) {
    var n4 = [`nulldelimiter`].concat(e10.baseSizingClasses());
    return W2(t8.concat(n4));
  };
  var Y2 = function(t8, n4, r5) {
    if (!t8) return W2();
    if (nn[t8.type]) {
      var i5 = nn[t8.type](t8, n4);
      if (r5 && n4.size !== r5.size) {
        i5 = W2(n4.sizingClasses(r5), [i5], n4);
        var a5 = n4.sizeMultiplier / r5.sizeMultiplier;
        i5.height *= a5, i5.depth *= a5;
      }
      return i5;
    }
    throw new e2(`Got group of unknown type: '` + t8.type + `'`);
  };
  function _n2(e10, t8) {
    var n4 = W2([`base`], e10, t8), r5 = W2([`strut`]);
    return r5.style.height = k2(n4.height + n4.depth), n4.depth && (r5.style.verticalAlign = k2(-n4.depth)), n4.children.unshift(r5), n4;
  }
  function vn2(e10, t8) {
    var n4 = null;
    e10.length === 1 && e10[0].type === `tag` && (n4 = e10[0].tag, e10 = e10[0].body);
    var r5 = dn2(e10, t8, `root`), i5;
    r5.length === 2 && r5[1].hasClass(`tag`) && (i5 = r5.pop());
    for (var a5 = [], o5 = [], s6 = 0; s6 < r5.length; s6++) if (o5.push(r5[s6]), r5[s6].hasClass(`mbin`) || r5[s6].hasClass(`mrel`) || r5[s6].hasClass(`allowbreak`)) {
      for (var c4 = false; s6 < r5.length - 1 && r5[s6 + 1].hasClass(`mspace`) && !r5[s6 + 1].hasClass(`newline`); ) s6++, o5.push(r5[s6]), r5[s6].hasClass(`nobreak`) && (c4 = true);
      c4 || (a5.push(_n2(o5, t8)), o5 = []);
    } else r5[s6].hasClass(`newline`) && (o5.pop(), o5.length > 0 && (a5.push(_n2(o5, t8)), o5 = []), a5.push(r5[s6]));
    o5.length > 0 && a5.push(_n2(o5, t8));
    var l4;
    n4 ? (l4 = _n2(dn2(n4, t8, true), t8), l4.classes = [`tag`], a5.push(l4)) : i5 && a5.push(i5);
    var u4 = W2([`katex-html`], a5);
    if (u4.setAttribute(`aria-hidden`, `true`), l4) {
      var d5 = l4.children[0];
      d5.style.height = k2(u4.height + u4.depth), u4.depth && (d5.style.verticalAlign = k2(-u4.depth));
    }
    return u4;
  }
  function yn2(e10) {
    return new Se2(e10);
  }
  var X2 = class {
    constructor(e10, t8, n4) {
      this.type = void 0, this.attributes = void 0, this.children = void 0, this.classes = void 0, this.type = e10, this.attributes = {}, this.children = t8 || [], this.classes = n4 || [];
    }
    setAttribute(e10, t8) {
      this.attributes[e10] = t8;
    }
    getAttribute(e10) {
      return this.attributes[e10];
    }
    toNode() {
      var e10 = document.createElementNS(`http://www.w3.org/1998/Math/MathML`, this.type);
      for (var t8 in this.attributes) Object.prototype.hasOwnProperty.call(this.attributes, t8) && e10.setAttribute(t8, this.attributes[t8]);
      this.classes.length > 0 && (e10.className = Ee(this.classes));
      for (var n4 = 0; n4 < this.children.length; n4++) if (this.children[n4] instanceof bn2 && this.children[n4 + 1] instanceof bn2) {
        for (var r5 = this.children[n4].toText() + this.children[++n4].toText(); this.children[n4 + 1] instanceof bn2; ) r5 += this.children[++n4].toText();
        e10.appendChild(new bn2(r5).toNode());
      } else e10.appendChild(this.children[n4].toNode());
      return e10;
    }
    toMarkup() {
      var e10 = `<` + this.type;
      for (var t8 in this.attributes) Object.prototype.hasOwnProperty.call(this.attributes, t8) && (e10 += ` ` + t8 + `="`, e10 += a2(this.attributes[t8]), e10 += `"`);
      this.classes.length > 0 && (e10 += ` class ="` + a2(Ee(this.classes)) + `"`), e10 += `>`;
      for (var n4 = 0; n4 < this.children.length; n4++) e10 += this.children[n4].toMarkup();
      return e10 += `</` + this.type + `>`, e10;
    }
    toText() {
      return this.children.map((e10) => e10.toText()).join(``);
    }
  };
  var bn2 = class {
    constructor(e10) {
      this.text = void 0, this.text = e10;
    }
    toNode() {
      return document.createTextNode(this.text);
    }
    toMarkup() {
      return a2(this.toText());
    }
    toText() {
      return this.text;
    }
  };
  var xn2 = class {
    constructor(e10) {
      this.width = void 0, this.character = void 0, this.width = e10, this.character = e10 >= 0.05555 && e10 <= 0.05556 ? `\u200A` : e10 >= 0.1666 && e10 <= 0.1667 ? `\u2009` : e10 >= 0.2222 && e10 <= 0.2223 ? `\u2005` : e10 >= 0.2777 && e10 <= 0.2778 ? `\u2005\u200A` : e10 >= -0.05556 && e10 <= -0.05555 ? `\u200A\u2063` : e10 >= -0.1667 && e10 <= -0.1666 ? `\u2009\u2063` : e10 >= -0.2223 && e10 <= -0.2222 ? `\u205F\u2063` : e10 >= -0.2778 && e10 <= -0.2777 ? `\u2005\u2063` : null;
    }
    toNode() {
      if (this.character) return document.createTextNode(this.character);
      var e10 = document.createElementNS(`http://www.w3.org/1998/Math/MathML`, `mspace`);
      return e10.setAttribute(`width`, k2(this.width)), e10;
    }
    toMarkup() {
      return this.character ? `<mtext>` + this.character + `</mtext>` : `<mspace width="` + k2(this.width) + `"/>`;
    }
    toText() {
      return this.character ? this.character : ` `;
    }
  };
  var Sn2 = /* @__PURE__ */ new Set([`\\imath`, `\\jmath`]);
  var Cn2 = /* @__PURE__ */ new Set([`mrow`, `mtable`]);
  var wn2 = function(e10, t8, n4) {
    return A2[t8][e10] && A2[t8][e10].replace && e10.charCodeAt(0) !== 55349 && !(tt2.hasOwnProperty(e10) && n4 && (n4.fontFamily && n4.fontFamily.slice(4, 6) === `tt` || n4.font && n4.font.slice(4, 6) === `tt`)) && (e10 = A2[t8][e10].replace), new bn2(e10);
  };
  var Tn2 = function(e10) {
    return e10.length === 1 ? e10[0] : new X2(`mrow`, e10);
  };
  var En2 = { mathit: `italic`, boldsymbol: (e10) => e10.type === `textord` ? `bold` : `bold-italic`, mathbf: `bold`, mathbb: `double-struck`, mathsfit: `sans-serif-italic`, mathfrak: `fraktur`, mathscr: `script`, mathcal: `script`, mathsf: `sans-serif`, mathtt: `monospace` };
  var Dn2 = (e10, t8) => {
    if (e10.mode === `text`) {
      if (t8.fontFamily === `texttt`) return `monospace`;
      if (t8.fontFamily === `textsf`) return t8.fontShape === `textit` && t8.fontWeight === `textbf` ? `sans-serif-bold-italic` : t8.fontShape === `textit` ? `sans-serif-italic` : t8.fontWeight === `textbf` ? `bold-sans-serif` : `sans-serif`;
      if (t8.fontShape === `textit` && t8.fontWeight === `textbf`) return `bold-italic`;
      if (t8.fontShape === `textit`) return `italic`;
      if (t8.fontWeight === `textbf`) return `bold`;
    }
    var n4 = t8.font;
    if (!n4 || n4 === `mathnormal`) return null;
    var r5 = e10.mode, i5 = En2[n4];
    if (i5) return typeof i5 == `function` ? i5(e10) : i5;
    var a5 = e10.text;
    if (Sn2.has(a5)) return null;
    if (A2[r5][a5]) {
      var o5 = A2[r5][a5].replace;
      o5 && (a5 = o5);
    }
    var s6 = Jt2[n4].fontName;
    return qe2(a5, s6, r5) ? Jt2[n4].variant : null;
  };
  function On2(e10) {
    if (!e10) return false;
    if (e10.type === `mi` && e10.children.length === 1) {
      var t8 = e10.children[0];
      return t8 instanceof bn2 && t8.text === `.`;
    }
    if (e10.type === `mo` && e10.children.length === 1 && e10.getAttribute(`separator`) === `true` && e10.getAttribute(`lspace`) === `0em` && e10.getAttribute(`rspace`) === `0em`) {
      var n4 = e10.children[0];
      return n4 instanceof bn2 && n4.text === `,`;
    }
    return false;
  }
  var kn2 = function(e10, t8, n4) {
    if (e10.length === 1) {
      var r5 = Z2(e10[0], t8);
      return n4 && r5 instanceof X2 && r5.type === `mo` && (r5.setAttribute(`lspace`, `0em`), r5.setAttribute(`rspace`, `0em`)), [r5];
    }
    for (var i5 = [], a5, o5 = 0; o5 < e10.length; o5++) {
      var s6 = Z2(e10[o5], t8);
      if (s6 instanceof X2 && a5 instanceof X2) {
        if (s6.type === `mtext` && a5.type === `mtext` && s6.getAttribute(`mathvariant`) === a5.getAttribute(`mathvariant`)) {
          a5.children.push(...s6.children);
          continue;
        }
        if (s6.type === `mn` && a5.type === `mn`) {
          a5.children.push(...s6.children);
          continue;
        }
        if (On2(s6) && a5.type === `mn`) {
          a5.children.push(...s6.children);
          continue;
        }
        if (s6.type === `mn` && On2(a5)) s6.children = [...a5.children, ...s6.children], i5.pop();
        else if ((s6.type === `msup` || s6.type === `msub`) && s6.children.length >= 1 && (a5.type === `mn` || On2(a5))) {
          var c4 = s6.children[0];
          c4 instanceof X2 && c4.type === `mn` && (c4.children = [...a5.children, ...c4.children], i5.pop());
        } else if (a5.type === `mi` && a5.children.length === 1) {
          var l4 = a5.children[0];
          if (l4 instanceof bn2 && l4.text === `\u0338` && (s6.type === `mo` || s6.type === `mi` || s6.type === `mn`)) {
            var u4 = s6.children[0];
            u4 instanceof bn2 && u4.text.length > 0 && (u4.text = u4.text.slice(0, 1) + `\u0338` + u4.text.slice(1), i5.pop());
          }
        }
      }
      i5.push(s6), a5 = s6;
    }
    return i5;
  };
  var An2 = function(e10, t8, n4) {
    return Tn2(kn2(e10, t8, n4));
  };
  var Z2 = function(t8, n4) {
    if (!t8) return new X2(`mrow`);
    if (rn[t8.type]) return rn[t8.type](t8, n4);
    throw new e2(`Got group of unknown type: '` + t8.type + `'`);
  };
  function jn2(e10, t8, n4, r5, i5) {
    var a5 = kn2(e10, n4), o5 = a5.length === 1 && a5[0] instanceof X2 && Cn2.has(a5[0].type) ? a5[0] : new X2(`mrow`, a5), s6 = new X2(`annotation`, [new bn2(t8)]);
    s6.setAttribute(`encoding`, `application/x-tex`);
    var c4 = new X2(`math`, [new X2(`semantics`, [o5, s6])]);
    return c4.setAttribute(`xmlns`, `http://www.w3.org/1998/Math/MathML`), r5 && c4.setAttribute(`display`, `block`), W2([i5 ? `katex` : `katex-mathml`], [c4]);
  }
  var Mn2 = [[1, 1, 1], [2, 1, 1], [3, 1, 1], [4, 2, 1], [5, 2, 1], [6, 3, 1], [7, 4, 2], [8, 6, 3], [9, 7, 6], [10, 8, 7], [11, 10, 9]];
  var Nn2 = [0.5, 0.6, 0.7, 0.8, 0.9, 1, 1.2, 1.44, 1.728, 2.074, 2.488];
  var Pn2 = function(e10, t8) {
    return t8.size < 2 ? e10 : Mn2[e10 - 1][t8.size - 1];
  };
  var Fn2 = class e4 {
    constructor(t8) {
      this.style = void 0, this.color = void 0, this.size = void 0, this.textSize = void 0, this.phantom = void 0, this.font = void 0, this.fontFamily = void 0, this.fontWeight = void 0, this.fontShape = void 0, this.sizeMultiplier = void 0, this.maxSize = void 0, this.minRuleThickness = void 0, this._fontMetrics = void 0, this.style = t8.style, this.color = t8.color, this.size = t8.size || e4.BASESIZE, this.textSize = t8.textSize || this.size, this.phantom = !!t8.phantom, this.font = t8.font || ``, this.fontFamily = t8.fontFamily || ``, this.fontWeight = t8.fontWeight || ``, this.fontShape = t8.fontShape || ``, this.sizeMultiplier = Nn2[this.size - 1], this.maxSize = t8.maxSize, this.minRuleThickness = t8.minRuleThickness, this._fontMetrics = void 0;
    }
    extend(t8) {
      var n4 = { style: this.style, size: this.size, textSize: this.textSize, color: this.color, phantom: this.phantom, font: this.font, fontFamily: this.fontFamily, fontWeight: this.fontWeight, fontShape: this.fontShape, maxSize: this.maxSize, minRuleThickness: this.minRuleThickness };
      return Object.assign(n4, t8), new e4(n4);
    }
    havingStyle(e10) {
      return this.style === e10 ? this : this.extend({ style: e10, size: Pn2(this.textSize, e10) });
    }
    havingCrampedStyle() {
      return this.havingStyle(this.style.cramp());
    }
    havingSize(e10) {
      return this.size === e10 && this.textSize === e10 ? this : this.extend({ style: this.style.text(), size: e10, textSize: e10, sizeMultiplier: Nn2[e10 - 1] });
    }
    havingBaseStyle(t8) {
      t8 ||= this.style.text();
      var n4 = Pn2(e4.BASESIZE, t8);
      return this.size === n4 && this.textSize === e4.BASESIZE && this.style === t8 ? this : this.extend({ style: t8, size: n4 });
    }
    havingBaseSizing() {
      var e10;
      switch (this.style.id) {
        case 4:
        case 5:
          e10 = 3;
          break;
        case 6:
        case 7:
          e10 = 1;
          break;
        default:
          e10 = 6;
      }
      return this.extend({ style: this.style.text(), size: e10 });
    }
    withColor(e10) {
      return this.extend({ color: e10 });
    }
    withPhantom() {
      return this.extend({ phantom: true });
    }
    withFont(e10) {
      return this.extend({ font: e10 });
    }
    withTextFontFamily(e10) {
      return this.extend({ fontFamily: e10, font: `` });
    }
    withTextFontWeight(e10) {
      return this.extend({ fontWeight: e10, font: `` });
    }
    withTextFontShape(e10) {
      return this.extend({ fontShape: e10, font: `` });
    }
    sizingClasses(e10) {
      return e10.size === this.size ? [] : [`sizing`, `reset-size` + e10.size, `size` + this.size];
    }
    baseSizingClasses() {
      return this.size === e4.BASESIZE ? [] : [`sizing`, `reset-size` + this.size, `size` + e4.BASESIZE];
    }
    fontMetrics() {
      return this._fontMetrics ||= Ye2(this.size), this._fontMetrics;
    }
    getColor() {
      return this.phantom ? `transparent` : this.color;
    }
  };
  Fn2.BASESIZE = 6;
  var In2 = function(e10) {
    return new Fn2({ style: e10.displayMode ? E2.DISPLAY : E2.TEXT, maxSize: e10.maxSize, minRuleThickness: e10.minRuleThickness });
  };
  var Ln2 = function(e10, t8) {
    if (t8.displayMode) {
      var n4 = [`katex-display`];
      t8.leqno && n4.push(`leqno`), t8.fleqn && n4.push(`fleqn`), e10 = W2(n4, [e10]);
    }
    return e10;
  };
  var Rn2 = function(e10, t8, n4) {
    var r5 = In2(n4), i5;
    return n4.output === `mathml` ? jn2(e10, t8, r5, n4.displayMode, true) : (i5 = n4.output === `html` ? W2([`katex`], [vn2(e10, r5)]) : W2([`katex`], [jn2(e10, t8, r5, n4.displayMode, false), vn2(e10, r5)]), Ln2(i5, n4));
  };
  var zn2 = function(e10, t8, n4) {
    return Ln2(W2([`katex`], [vn2(e10, In2(n4))]), n4);
  };
  var Bn = { widehat: `^`, widecheck: `\u02C7`, widetilde: `~`, utilde: `~`, overleftarrow: `\u2190`, underleftarrow: `\u2190`, xleftarrow: `\u2190`, overrightarrow: `\u2192`, underrightarrow: `\u2192`, xrightarrow: `\u2192`, underbrace: `\u23DF`, overbrace: `\u23DE`, underbracket: `\u23B5`, overbracket: `\u23B4`, overgroup: `\u23E0`, undergroup: `\u23E1`, overleftrightarrow: `\u2194`, underleftrightarrow: `\u2194`, xleftrightarrow: `\u2194`, Overrightarrow: `\u21D2`, xRightarrow: `\u21D2`, overleftharpoon: `\u21BC`, xleftharpoonup: `\u21BC`, overrightharpoon: `\u21C0`, xrightharpoonup: `\u21C0`, xLeftarrow: `\u21D0`, xLeftrightarrow: `\u21D4`, xhookleftarrow: `\u21A9`, xhookrightarrow: `\u21AA`, xmapsto: `\u21A6`, xrightharpoondown: `\u21C1`, xleftharpoondown: `\u21BD`, xrightleftharpoons: `\u21CC`, xleftrightharpoons: `\u21CB`, xtwoheadleftarrow: `\u219E`, xtwoheadrightarrow: `\u21A0`, xlongequal: `=`, xtofrom: `\u21C4`, xrightleftarrows: `\u21C4`, xrightequilibrium: `\u21CC`, xleftequilibrium: `\u21CB`, "\\cdrightarrow": `\u2192`, "\\cdleftarrow": `\u2190`, "\\cdlongequal": `=` };
  var Vn2 = function(e10) {
    var t8 = new X2(`mo`, [new bn2(Bn[e10.replace(/^\\/, ``)])]);
    return t8.setAttribute(`stretchy`, `true`), t8;
  };
  var Hn2 = { overrightarrow: [[`rightarrow`], 0.888, 522, `xMaxYMin`], overleftarrow: [[`leftarrow`], 0.888, 522, `xMinYMin`], underrightarrow: [[`rightarrow`], 0.888, 522, `xMaxYMin`], underleftarrow: [[`leftarrow`], 0.888, 522, `xMinYMin`], xrightarrow: [[`rightarrow`], 1.469, 522, `xMaxYMin`], "\\cdrightarrow": [[`rightarrow`], 3, 522, `xMaxYMin`], xleftarrow: [[`leftarrow`], 1.469, 522, `xMinYMin`], "\\cdleftarrow": [[`leftarrow`], 3, 522, `xMinYMin`], Overrightarrow: [[`doublerightarrow`], 0.888, 560, `xMaxYMin`], xRightarrow: [[`doublerightarrow`], 1.526, 560, `xMaxYMin`], xLeftarrow: [[`doubleleftarrow`], 1.526, 560, `xMinYMin`], overleftharpoon: [[`leftharpoon`], 0.888, 522, `xMinYMin`], xleftharpoonup: [[`leftharpoon`], 0.888, 522, `xMinYMin`], xleftharpoondown: [[`leftharpoondown`], 0.888, 522, `xMinYMin`], overrightharpoon: [[`rightharpoon`], 0.888, 522, `xMaxYMin`], xrightharpoonup: [[`rightharpoon`], 0.888, 522, `xMaxYMin`], xrightharpoondown: [[`rightharpoondown`], 0.888, 522, `xMaxYMin`], xlongequal: [[`longequal`], 0.888, 334, `xMinYMin`], "\\cdlongequal": [[`longequal`], 3, 334, `xMinYMin`], xtwoheadleftarrow: [[`twoheadleftarrow`], 0.888, 334, `xMinYMin`], xtwoheadrightarrow: [[`twoheadrightarrow`], 0.888, 334, `xMaxYMin`], overleftrightarrow: [[`leftarrow`, `rightarrow`], 0.888, 522], overbrace: [[`leftbrace`, `midbrace`, `rightbrace`], 1.6, 548], underbrace: [[`leftbraceunder`, `midbraceunder`, `rightbraceunder`], 1.6, 548], underleftrightarrow: [[`leftarrow`, `rightarrow`], 0.888, 522], xleftrightarrow: [[`leftarrow`, `rightarrow`], 1.75, 522], xLeftrightarrow: [[`doubleleftarrow`, `doublerightarrow`], 1.75, 560], xrightleftharpoons: [[`leftharpoondownplus`, `rightharpoonplus`], 1.75, 716], xleftrightharpoons: [[`leftharpoonplus`, `rightharpoondownplus`], 1.75, 716], xhookleftarrow: [[`leftarrow`, `righthook`], 1.08, 522], xhookrightarrow: [[`lefthook`, `rightarrow`], 1.08, 522], overlinesegment: [[`leftlinesegment`, `rightlinesegment`], 0.888, 522], underlinesegment: [[`leftlinesegment`, `rightlinesegment`], 0.888, 522], overbracket: [[`leftbracketover`, `rightbracketover`], 1.6, 440], underbracket: [[`leftbracketunder`, `rightbracketunder`], 1.6, 410], overgroup: [[`leftgroup`, `rightgroup`], 0.888, 342], undergroup: [[`leftgroupunder`, `rightgroupunder`], 0.888, 342], xmapsto: [[`leftmapsto`, `rightarrow`], 1.5, 522], xtofrom: [[`leftToFrom`, `rightToFrom`], 1.75, 528], xrightleftarrows: [[`baraboveleftarrow`, `rightarrowabovebar`], 1.75, 901], xrightequilibrium: [[`baraboveshortleftharpoon`, `rightharpoonaboveshortbar`], 1.75, 716], xleftequilibrium: [[`shortbaraboveleftharpoon`, `shortrightharpoonabovebar`], 1.75, 716] };
  var Un = /* @__PURE__ */ new Set([`widehat`, `widecheck`, `widetilde`, `utilde`]);
  var Wn2 = function(e10, t8) {
    function n4() {
      var n5 = 4e5, r6 = e10.label.slice(1);
      if (Un.has(r6) && `base` in e10) {
        var i6 = e10.base.type === `ordgroup` ? e10.base.body.length : 1, a6, o5, s6;
        if (i6 > 5) r6 === `widehat` || r6 === `widecheck` ? (a6 = 420, n5 = 2364, s6 = 0.42, o5 = r6 + `4`) : (a6 = 312, n5 = 2340, s6 = 0.34, o5 = `tilde4`);
        else {
          var c4 = [1, 1, 2, 2, 3, 3][i6];
          r6 === `widehat` || r6 === `widecheck` ? (n5 = [0, 1062, 2364, 2364, 2364][c4], a6 = [0, 239, 300, 360, 420][c4], s6 = [0, 0.24, 0.3, 0.3, 0.36, 0.42][c4], o5 = r6 + c4) : (n5 = [0, 600, 1033, 2339, 2340][c4], a6 = [0, 260, 286, 306, 312][c4], s6 = [0, 0.26, 0.286, 0.3, 0.306, 0.34][c4], o5 = `tilde` + c4);
        }
        return { span: Bt2([], [new Le2([new Re2(o5)], { width: `100%`, height: k2(s6), viewBox: `0 0 ` + n5 + ` ` + a6, preserveAspectRatio: `none` })], t8), minWidth: 0, height: s6 };
      }
      var l4 = [], u4 = Hn2[r6];
      if (!u4) throw Error(`No SVG data for "` + r6 + `".`);
      var [d5, f6, p4] = u4, m5 = p4 / 1e3, h5 = d5.length, g6, _6;
      if (h5 === 1) {
        if (u4.length !== 4) throw Error(`Expected 4-tuple for single-path SVG data "` + r6 + `".`);
        g6 = [`hide-tail`], _6 = [u4[3]];
      } else if (h5 === 2) g6 = [`halfarrow-left`, `halfarrow-right`], _6 = [`xMinYMin`, `xMaxYMin`];
      else if (h5 === 3) g6 = [`brace-left`, `brace-center`, `brace-right`], _6 = [`xMinYMin`, `xMidYMin`, `xMaxYMin`];
      else throw Error(`Correct katexImagesData or update code here to support
                    ` + h5 + ` children.`);
      for (var v7 = 0; v7 < h5; v7++) {
        var y7 = new Le2([new Re2(d5[v7])], { width: `400em`, height: k2(m5), viewBox: `0 0 ` + n5 + ` ` + p4, preserveAspectRatio: _6[v7] + ` slice` }), b6 = Bt2([g6[v7]], [y7], t8);
        if (h5 === 1) return { span: b6, minWidth: f6, height: m5 };
        b6.style.height = k2(m5), l4.push(b6);
      }
      return { span: W2([`stretchy`], l4, t8), minWidth: f6, height: m5 };
    }
    var { span: r5, minWidth: i5, height: a5 } = n4();
    return r5.height = a5, r5.style.height = k2(a5), i5 > 0 && (r5.style.minWidth = k2(i5)), r5;
  };
  var Gn2 = function(e10, t8, n4, r5, i5) {
    var a5, o5 = e10.height + e10.depth + n4 + r5;
    if (/fbox|color|angl/.test(t8)) {
      if (a5 = W2([`stretchy`, t8], [], i5), t8 === `fbox`) {
        var s6 = i5.color && i5.getColor();
        s6 && (a5.style.borderColor = s6);
      }
    } else {
      var c4 = [];
      /^[bx]cancel$/.test(t8) && c4.push(new ze2({ x1: `0`, y1: `0`, x2: `100%`, y2: `100%`, "stroke-width": `0.046em` })), /^x?cancel$/.test(t8) && c4.push(new ze2({ x1: `0`, y1: `100%`, x2: `100%`, y2: `0`, "stroke-width": `0.046em` })), a5 = Bt2([], [new Le2(c4, { width: `100%`, height: k2(o5) })], i5);
    }
    return a5.height = o5, a5.style.height = k2(o5), a5;
  };
  var Kn2 = { bin: 1, close: 1, inner: 1, open: 1, punct: 1, rel: 1 };
  var qn2 = { "accent-token": 1, mathord: 1, "op-token": 1, spacing: 1, textord: 1 };
  function Jn2(e10) {
    return e10 in Kn2;
  }
  function Q2(e10, t8) {
    if (!e10 || e10.type !== t8) throw Error(`Expected node of type ` + t8 + `, but got ` + (e10 ? `node of type ` + e10.type : String(e10)));
    return e10;
  }
  function Yn2(e10) {
    var t8 = Xn2(e10);
    if (!t8) throw Error(`Expected node of symbol group type, but got ` + (e10 ? `node of type ` + e10.type : String(e10)));
    return t8;
  }
  function Xn2(e10) {
    return e10 && (e10.type === `atom` || qn2.hasOwnProperty(e10.type)) ? e10 : null;
  }
  var Zn2 = (e10) => {
    if (e10 instanceof Ie2) return e10;
    if (He2(e10) && e10.children.length === 1) return Zn2(e10.children[0]);
  };
  var Qn2 = (e10, t8) => {
    var n4, r5, i5;
    e10 && e10.type === `supsub` ? (r5 = Q2(e10.base, `accent`), n4 = r5.base, e10.base = n4, i5 = Ve2(Y2(e10, t8)), e10.base = r5) : (r5 = Q2(e10, `accent`), n4 = r5.base);
    var a5 = Y2(n4, t8.havingCrampedStyle()), o5 = r5.isShifty && c2(n4), s6 = 0;
    o5 && (s6 = Zn2(a5)?.skew ?? 0);
    var l4 = r5.label === `\\c`, u4 = l4 ? a5.height + a5.depth : Math.min(a5.height, t8.fontMetrics().xHeight), d5;
    if (r5.isStretchy) d5 = Wn2(r5, t8), d5 = G2({ positionType: `firstBaseline`, children: [{ type: `elem`, elem: a5 }, { type: `elem`, elem: d5, wrapperClasses: [`svg-align`], wrapperStyle: s6 > 0 ? { width: `calc(100% - ` + k2(2 * s6) + `)`, marginLeft: k2(2 * s6) } : void 0 }] });
    else {
      var f6, p4;
      r5.label === `\\vec` ? (f6 = Xt(`vec`, t8), p4 = Yt2.vec[1]) : (f6 = It2({ type: `textord`, mode: r5.mode, text: r5.label }, t8, `textord`), f6 = Be2(f6), f6.italic = 0, p4 = f6.width, l4 && (u4 += f6.depth)), d5 = W2([`accent-body`], [f6]);
      var m5 = r5.label === `\\textcircled`;
      m5 && (d5.classes.push(`accent-full`), u4 = a5.height);
      var h5 = s6;
      m5 || (h5 -= p4 / 2), d5.style.left = k2(h5), r5.label === `\\textcircled` && (d5.style.top = `.2em`), d5 = G2({ positionType: `firstBaseline`, children: [{ type: `elem`, elem: a5 }, { type: `kern`, size: -u4 }, { type: `elem`, elem: d5 }] });
    }
    var g6 = W2([`mord`, `accent`], [d5], t8);
    return i5 ? (i5.children[0] = g6, i5.height = Math.max(g6.height, i5.height), i5.classes[0] = `mord`, i5) : g6;
  };
  var $n2 = (e10, t8) => {
    var n4 = e10.isStretchy ? Vn2(e10.label) : new X2(`mo`, [wn2(e10.label, e10.mode)]), r5 = new X2(`mover`, [Z2(e10.base, t8), n4]);
    return r5.setAttribute(`accent`, `true`), r5;
  };
  var er2 = new RegExp([`\\acute`, `\\grave`, `\\ddot`, `\\tilde`, `\\bar`, `\\breve`, `\\check`, `\\hat`, `\\vec`, `\\dot`, `\\mathring`].map((e10) => `\\` + e10).join(`|`));
  q2({ type: `accent`, names: [`\\acute`, `\\grave`, `\\ddot`, `\\tilde`, `\\bar`, `\\breve`, `\\check`, `\\hat`, `\\vec`, `\\dot`, `\\mathring`, `\\widecheck`, `\\widehat`, `\\widetilde`, `\\overrightarrow`, `\\overleftarrow`, `\\Overrightarrow`, `\\overleftrightarrow`, `\\overgroup`, `\\overlinesegment`, `\\overleftharpoon`, `\\overrightharpoon`], props: { numArgs: 1 }, handler: (e10, t8) => {
    var n4 = on(t8[0]), r5 = !er2.test(e10.funcName), i5 = !r5 || e10.funcName === `\\widehat` || e10.funcName === `\\widetilde` || e10.funcName === `\\widecheck`;
    return { type: `accent`, mode: e10.parser.mode, label: e10.funcName, isStretchy: r5, isShifty: i5, base: n4 };
  }, htmlBuilder: Qn2, mathmlBuilder: $n2 }), q2({ type: `accent`, names: [`\\'`, "\\`", `\\^`, `\\~`, `\\=`, `\\u`, `\\.`, `\\"`, `\\c`, `\\r`, `\\H`, `\\v`, `\\textcircled`], props: { numArgs: 1, allowedInText: true, allowedInMath: true, argTypes: [`primitive`] }, handler: (e10, t8) => {
    var n4 = t8[0], r5 = e10.parser.mode;
    return r5 === `math` && (e10.parser.settings.reportNonstrict(`mathVsTextAccents`, `LaTeX's accent ` + e10.funcName + ` works only in text mode`), r5 = `text`), { type: `accent`, mode: r5, label: e10.funcName, isStretchy: false, isShifty: true, base: n4 };
  }, htmlBuilder: Qn2, mathmlBuilder: $n2 }), q2({ type: `accentUnder`, names: [`\\underleftarrow`, `\\underrightarrow`, `\\underleftrightarrow`, `\\undergroup`, `\\underlinesegment`, `\\utilde`], props: { numArgs: 1 }, handler: (e10, t8) => {
    var { parser: n4, funcName: r5 } = e10, i5 = t8[0];
    return { type: `accentUnder`, mode: n4.mode, label: r5, base: i5 };
  }, htmlBuilder: (e10, t8) => {
    var n4 = Y2(e10.base, t8), r5 = Wn2(e10, t8), i5 = e10.label === `\\utilde` ? 0.12 : 0;
    return W2([`mord`, `accentunder`], [G2({ positionType: `top`, positionData: n4.height, children: [{ type: `elem`, elem: r5, wrapperClasses: [`svg-align`] }, { type: `kern`, size: i5 }, { type: `elem`, elem: n4 }] })], t8);
  }, mathmlBuilder: (e10, t8) => {
    var n4 = Vn2(e10.label), r5 = new X2(`munder`, [Z2(e10.base, t8), n4]);
    return r5.setAttribute(`accentunder`, `true`), r5;
  } });
  var tr2 = (e10) => {
    var t8 = new X2(`mpadded`, e10 ? [e10] : []);
    return t8.setAttribute(`width`, `+0.6em`), t8.setAttribute(`lspace`, `0.3em`), t8;
  };
  q2({ type: `xArrow`, names: [`\\xleftarrow`, `\\xrightarrow`, `\\xLeftarrow`, `\\xRightarrow`, `\\xleftrightarrow`, `\\xLeftrightarrow`, `\\xhookleftarrow`, `\\xhookrightarrow`, `\\xmapsto`, `\\xrightharpoondown`, `\\xrightharpoonup`, `\\xleftharpoondown`, `\\xleftharpoonup`, `\\xrightleftharpoons`, `\\xleftrightharpoons`, `\\xlongequal`, `\\xtwoheadrightarrow`, `\\xtwoheadleftarrow`, `\\xtofrom`, `\\xrightleftarrows`, `\\xrightequilibrium`, `\\xleftequilibrium`, `\\\\cdrightarrow`, `\\\\cdleftarrow`, `\\\\cdlongequal`], props: { numArgs: 1, numOptionalArgs: 1 }, handler(e10, t8, n4) {
    var { parser: r5, funcName: i5 } = e10;
    return { type: `xArrow`, mode: r5.mode, label: i5, body: t8[0], below: n4[0] };
  }, htmlBuilder(e10, t8) {
    var n4 = t8.style, r5 = t8.havingStyle(n4.sup()), i5 = Wt2(Y2(e10.body, r5, t8), t8), a5 = e10.label.slice(0, 2) === `\\x` ? `x` : `cd`;
    i5.classes.push(a5 + `-arrow-pad`);
    var o5;
    e10.below && (r5 = t8.havingStyle(n4.sub()), o5 = Wt2(Y2(e10.below, r5, t8), t8), o5.classes.push(a5 + `-arrow-pad`));
    var s6 = Wn2(e10, t8), c4 = -t8.fontMetrics().axisHeight + 0.5 * s6.height, l4 = -t8.fontMetrics().axisHeight - 0.5 * s6.height - 0.111;
    (i5.depth > 0.25 || e10.label === `\\xleftequilibrium`) && (l4 -= i5.depth);
    var u4;
    if (o5) {
      var d5 = -t8.fontMetrics().axisHeight + o5.height + 0.5 * s6.height + 0.111;
      u4 = G2({ positionType: `individualShift`, children: [{ type: `elem`, elem: i5, shift: l4 }, { type: `elem`, elem: s6, shift: c4, wrapperClasses: [`svg-align`] }, { type: `elem`, elem: o5, shift: d5 }] });
    } else u4 = G2({ positionType: `individualShift`, children: [{ type: `elem`, elem: i5, shift: l4 }, { type: `elem`, elem: s6, shift: c4, wrapperClasses: [`svg-align`] }] });
    return W2([`mrel`, `x-arrow`], [u4], t8);
  }, mathmlBuilder(e10, t8) {
    var n4 = Vn2(e10.label);
    n4.setAttribute(`minsize`, e10.label.charAt(0) === `x` ? `1.75em` : `3.0em`);
    var r5;
    if (e10.body) {
      var i5 = tr2(Z2(e10.body, t8));
      r5 = e10.below ? new X2(`munderover`, [n4, tr2(Z2(e10.below, t8)), i5]) : new X2(`mover`, [n4, i5]);
    } else e10.below ? r5 = new X2(`munder`, [n4, tr2(Z2(e10.below, t8))]) : (r5 = tr2(), r5 = new X2(`mover`, [n4, r5]));
    return r5;
  } });
  function nr2(e10, t8) {
    var n4 = dn2(e10.body, t8, true);
    return W2([e10.mclass], n4, t8);
  }
  function rr2(e10, t8) {
    var n4, r5 = kn2(e10.body, t8);
    return e10.mclass === `minner` ? n4 = new X2(`mpadded`, r5) : e10.mclass === `mord` ? e10.isCharacterBox ? (n4 = r5[0], n4.type = `mi`) : n4 = new X2(`mi`, r5) : (e10.isCharacterBox ? (n4 = r5[0], n4.type = `mo`) : n4 = new X2(`mo`, r5), e10.mclass === `mbin` ? (n4.attributes.lspace = `0.22em`, n4.attributes.rspace = `0.22em`) : e10.mclass === `mpunct` ? (n4.attributes.lspace = `0em`, n4.attributes.rspace = `0.17em`) : e10.mclass === `mopen` || e10.mclass === `mclose` ? (n4.attributes.lspace = `0em`, n4.attributes.rspace = `0em`) : e10.mclass === `minner` && (n4.attributes.lspace = `0.0556em`, n4.attributes.width = `+0.1111em`)), n4;
  }
  q2({ type: `mclass`, names: [`\\mathord`, `\\mathbin`, `\\mathrel`, `\\mathopen`, `\\mathclose`, `\\mathpunct`, `\\mathinner`], props: { numArgs: 1, primitive: true }, handler(e10, t8) {
    var { parser: n4, funcName: r5 } = e10, i5 = t8[0];
    return { type: `mclass`, mode: n4.mode, mclass: `m` + r5.slice(5), body: J2(i5), isCharacterBox: c2(i5) };
  }, htmlBuilder: nr2, mathmlBuilder: rr2 });
  var ir2 = (e10) => {
    var t8 = e10.type === `ordgroup` && e10.body.length ? e10.body[0] : e10;
    return t8.type === `atom` && (t8.family === `bin` || t8.family === `rel`) ? `m` + t8.family : `mord`;
  };
  q2({ type: `mclass`, names: [`\\@binrel`], props: { numArgs: 2 }, handler(e10, t8) {
    var { parser: n4 } = e10;
    return { type: `mclass`, mode: n4.mode, mclass: ir2(t8[0]), body: J2(t8[1]), isCharacterBox: c2(t8[1]) };
  } }), q2({ type: `mclass`, names: [`\\stackrel`, `\\overset`, `\\underset`], props: { numArgs: 2 }, handler(e10, t8) {
    var { parser: n4, funcName: r5 } = e10, i5 = t8[1], a5 = t8[0], o5 = r5 === `\\stackrel` ? `mrel` : ir2(i5), s6 = { type: `op`, mode: i5.mode, limits: true, alwaysHandleSupSub: true, parentIsSupSub: false, symbol: false, suppressBaseShift: r5 !== `\\stackrel`, body: J2(i5) }, l4 = { type: `supsub`, mode: a5.mode, base: s6, sup: r5 === `\\underset` ? null : a5, sub: r5 === `\\underset` ? a5 : null };
    return { type: `mclass`, mode: n4.mode, mclass: o5, body: [l4], isCharacterBox: c2(l4) };
  }, htmlBuilder: nr2, mathmlBuilder: rr2 }), q2({ type: `pmb`, names: [`\\pmb`], props: { numArgs: 1, allowedInText: true }, handler(e10, t8) {
    var { parser: n4 } = e10;
    return { type: `pmb`, mode: n4.mode, mclass: ir2(t8[0]), body: J2(t8[0]) };
  }, htmlBuilder(e10, t8) {
    var n4 = dn2(e10.body, t8, true), r5 = W2([e10.mclass], n4, t8);
    return r5.style.textShadow = `0.02em 0.01em 0.04px`, r5;
  }, mathmlBuilder(e10, t8) {
    var n4 = new X2(`mstyle`, kn2(e10.body, t8));
    return n4.setAttribute(`style`, `text-shadow: 0.02em 0.01em 0.04px`), n4;
  } });
  var ar2 = { ">": `\\\\cdrightarrow`, "<": `\\\\cdleftarrow`, "=": `\\\\cdlongequal`, A: `\\uparrow`, V: `\\downarrow`, "|": `\\Vert`, ".": `no arrow` };
  var or2 = () => ({ type: `styling`, body: [], mode: `math`, style: `display`, resetFont: true });
  var sr2 = (e10) => e10.type === `textord` && e10.text === `@`;
  var cr2 = (e10, t8) => (e10.type === `mathord` || e10.type === `atom`) && e10.text === t8;
  function lr2(e10, t8, n4) {
    var r5 = ar2[e10];
    switch (r5) {
      case `\\\\cdrightarrow`:
      case `\\\\cdleftarrow`:
        return n4.callFunction(r5, [t8[0]], [t8[1]]);
      case `\\uparrow`:
      case `\\downarrow`:
        var i5 = n4.callFunction(`\\\\cdleft`, [t8[0]], []), a5 = { type: `atom`, text: r5, mode: `math`, family: `rel` }, o5 = { type: `ordgroup`, mode: `math`, body: [i5, n4.callFunction(`\\Big`, [a5], []), n4.callFunction(`\\\\cdright`, [t8[1]], [])] };
        return n4.callFunction(`\\\\cdparent`, [o5], []);
      case `\\\\cdlongequal`:
        return n4.callFunction(`\\\\cdlongequal`, [], []);
      case `\\Vert`:
        return n4.callFunction(`\\Big`, [{ type: `textord`, text: `\\Vert`, mode: `math` }], []);
      default:
        return { type: `textord`, text: ` `, mode: `math` };
    }
  }
  function ur2(t8) {
    var n4 = [];
    for (t8.gullet.beginGroup(), t8.gullet.macros.set(`\\cr`, `\\\\\\relax`), t8.gullet.beginGroup(); ; ) {
      n4.push(t8.parseExpression(false, `\\\\`)), t8.gullet.endGroup(), t8.gullet.beginGroup();
      var r5 = t8.fetch().text;
      if (r5 === `&` || r5 === `\\\\`) t8.consume();
      else if (r5 === `\\end`) {
        n4[n4.length - 1].length === 0 && n4.pop();
        break;
      } else throw new e2(`Expected \\\\ or \\cr or \\end`, t8.nextToken);
    }
    for (var i5 = [], a5 = [i5], o5 = 0; o5 < n4.length; o5++) {
      for (var s6 = n4[o5], c4 = or2(), l4 = 0; l4 < s6.length; l4++) if (!sr2(s6[l4])) c4.body.push(s6[l4]);
      else {
        i5.push(c4), l4 += 1;
        var u4 = Yn2(s6[l4]).text, d5 = [, ,];
        if (d5[0] = { type: `ordgroup`, mode: `math`, body: [] }, d5[1] = { type: `ordgroup`, mode: `math`, body: [] }, !`=|.`.includes(u4)) {
          if (`<>AV`.includes(u4)) for (var f6 = 0; f6 < 2; f6++) {
            for (var p4 = true, m5 = l4 + 1; m5 < s6.length; m5++) {
              if (cr2(s6[m5], u4)) {
                p4 = false, l4 = m5;
                break;
              }
              if (sr2(s6[m5])) throw new e2(`Missing a ` + u4 + ` character to complete a CD arrow.`, s6[m5]);
              d5[f6].body.push(s6[m5]);
            }
            if (p4) throw new e2(`Missing a ` + u4 + ` character to complete a CD arrow.`, s6[l4]);
          }
          else throw new e2(`Expected one of "<>AV=|." after @`, s6[l4]);
        }
        var h5 = { type: `styling`, body: [lr2(u4, d5, t8)], mode: `math`, style: `display`, resetFont: true };
        i5.push(h5), c4 = or2();
      }
      o5 % 2 == 0 ? i5.push(c4) : i5.shift(), i5 = [], a5.push(i5);
    }
    return t8.gullet.endGroup(), t8.gullet.endGroup(), { type: `array`, mode: `math`, body: a5, arraystretch: 1, addJot: true, rowGaps: [null], cols: Array(a5[0].length).fill({ type: `align`, align: `c`, pregap: 0.25, postgap: 0.25 }), colSeparationType: `CD`, hLinesBeforeRow: Array(a5.length + 1).fill([]) };
  }
  q2({ type: `cdlabel`, names: [`\\\\cdleft`, `\\\\cdright`], props: { numArgs: 1 }, handler(e10, t8) {
    var { parser: n4, funcName: r5 } = e10;
    return { type: `cdlabel`, mode: n4.mode, side: r5.slice(4), label: t8[0] };
  }, htmlBuilder(e10, t8) {
    var n4 = t8.havingStyle(t8.style.sup()), r5 = Wt2(Y2(e10.label, n4, t8), t8);
    return r5.classes.push(`cd-label-` + e10.side), r5.style.bottom = k2(0.8 - r5.depth), r5.height = 0, r5.depth = 0, r5;
  }, mathmlBuilder(e10, t8) {
    var n4 = new X2(`mrow`, [Z2(e10.label, t8)]);
    return n4 = new X2(`mpadded`, [n4]), n4.setAttribute(`width`, `0`), e10.side === `left` && n4.setAttribute(`lspace`, `-1width`), n4.setAttribute(`voffset`, `0.7em`), n4 = new X2(`mstyle`, [n4]), n4.setAttribute(`displaystyle`, `false`), n4.setAttribute(`scriptlevel`, `1`), n4;
  } }), q2({ type: `cdlabelparent`, names: [`\\\\cdparent`], props: { numArgs: 1 }, handler(e10, t8) {
    var { parser: n4 } = e10;
    return { type: `cdlabelparent`, mode: n4.mode, fragment: t8[0] };
  }, htmlBuilder(e10, t8) {
    var n4 = Wt2(Y2(e10.fragment, t8), t8);
    return n4.classes.push(`cd-vert-arrow`), n4;
  }, mathmlBuilder(e10, t8) {
    return new X2(`mrow`, [Z2(e10.fragment, t8)]);
  } }), q2({ type: `textord`, names: [`\\@char`], props: { numArgs: 1, allowedInText: true }, handler(t8, n4) {
    for (var { parser: r5 } = t8, i5 = Q2(n4[0], `ordgroup`).body, a5 = ``, o5 = 0; o5 < i5.length; o5++) {
      var s6 = Q2(i5[o5], `textord`);
      a5 += s6.text;
    }
    var c4 = parseInt(a5), l4;
    if (isNaN(c4)) throw new e2(`\\@char has non-numeric argument ` + a5);
    if (c4 < 0 || c4 >= 1114111) throw new e2(`\\@char with invalid code point ` + a5);
    return c4 <= 65535 ? l4 = String.fromCharCode(c4) : (c4 -= 65536, l4 = String.fromCharCode((c4 >> 10) + 55296, (c4 & 1023) + 56320)), { type: `textord`, mode: r5.mode, text: l4 };
  } });
  var dr2 = (e10, t8) => Ut2(dn2(e10.body, t8.withColor(e10.color), false));
  var fr2 = (e10, t8) => {
    var n4 = new X2(`mstyle`, kn2(e10.body, t8.withColor(e10.color)));
    return n4.setAttribute(`mathcolor`, e10.color), n4;
  };
  q2({ type: `color`, names: [`\\textcolor`], props: { numArgs: 2, allowedInText: true, argTypes: [`color`, `original`] }, handler(e10, t8) {
    var { parser: n4 } = e10, r5 = Q2(t8[0], `color-token`).color, i5 = t8[1];
    return { type: `color`, mode: n4.mode, color: r5, body: J2(i5) };
  }, htmlBuilder: dr2, mathmlBuilder: fr2 }), q2({ type: `color`, names: [`\\color`], props: { numArgs: 1, allowedInText: true, argTypes: [`color`] }, handler(e10, t8) {
    var { parser: n4, breakOnTokenText: r5 } = e10, i5 = Q2(t8[0], `color-token`).color;
    n4.gullet.macros.set(`\\current@color`, i5);
    var a5 = n4.parseExpression(true, r5);
    return { type: `color`, mode: n4.mode, color: i5, body: a5 };
  }, htmlBuilder: dr2, mathmlBuilder: fr2 }), q2({ type: `cr`, names: [`\\\\`], props: { numArgs: 0, numOptionalArgs: 0, allowedInText: true }, handler(e10, t8, n4) {
    var { parser: r5 } = e10, i5 = r5.gullet.future().text === `[` ? r5.parseSizeGroup(true) : null, a5 = !r5.settings.displayMode || !r5.settings.useStrictBehavior(`newLineInDisplayMode`, `In LaTeX, \\\\ or \\newline does nothing in display mode`);
    return { type: `cr`, mode: r5.mode, newLine: a5, size: i5 && Q2(i5, `size`).value };
  }, htmlBuilder(e10, t8) {
    var n4 = W2([`mspace`], [], t8);
    return e10.newLine && (n4.classes.push(`newline`), e10.size && (n4.style.marginTop = k2(O2(e10.size, t8)))), n4;
  }, mathmlBuilder(e10, t8) {
    var n4 = new X2(`mspace`);
    return e10.newLine && (n4.setAttribute(`linebreak`, `newline`), e10.size && n4.setAttribute(`height`, k2(O2(e10.size, t8)))), n4;
  } });
  var pr2 = { "\\global": `\\global`, "\\long": `\\\\globallong`, "\\\\globallong": `\\\\globallong`, "\\def": `\\gdef`, "\\gdef": `\\gdef`, "\\edef": `\\xdef`, "\\xdef": `\\xdef`, "\\let": `\\\\globallet`, "\\futurelet": `\\\\globalfuture` };
  var mr2 = (t8) => {
    var n4 = t8.text;
    if (/^(?:[\\{}$&#^_]|EOF)$/.test(n4)) throw new e2(`Expected a control sequence`, t8);
    return n4;
  };
  var hr2 = (e10) => {
    var t8 = e10.gullet.popToken();
    return t8.text === `=` && (t8 = e10.gullet.popToken(), t8.text === ` ` && (t8 = e10.gullet.popToken())), t8;
  };
  var gr2 = (e10, t8, n4, r5) => {
    var i5 = e10.gullet.macros.get(n4.text);
    i5 ??= (n4.noexpand = true, { tokens: [n4], numArgs: 0, unexpandable: !e10.gullet.isExpandable(n4.text) }), e10.gullet.macros.set(t8, i5, r5);
  };
  q2({ type: `internal`, names: [`\\global`, `\\long`, `\\\\globallong`], props: { numArgs: 0, allowedInText: true }, handler(t8) {
    var { parser: n4, funcName: r5 } = t8;
    n4.consumeSpaces();
    var i5 = n4.fetch();
    if (pr2[i5.text]) return (r5 === `\\global` || r5 === `\\\\globallong`) && (i5.text = pr2[i5.text]), Q2(n4.parseFunction(), `internal`);
    throw new e2(`Invalid token after macro prefix`, i5);
  } }), q2({ type: `internal`, names: [`\\def`, `\\gdef`, `\\edef`, `\\xdef`], props: { numArgs: 0, allowedInText: true, primitive: true }, handler(t8) {
    var { parser: n4, funcName: r5 } = t8, i5 = n4.gullet.popToken(), a5 = i5.text;
    if (/^(?:[\\{}$&#^_]|EOF)$/.test(a5)) throw new e2(`Expected a control sequence`, i5);
    for (var o5 = 0, s6, c4 = [[]]; n4.gullet.future().text !== `{`; ) if (i5 = n4.gullet.popToken(), i5.text === `#`) {
      if (n4.gullet.future().text === `{`) {
        s6 = n4.gullet.future(), c4[o5].push(`{`);
        break;
      }
      if (i5 = n4.gullet.popToken(), !/^[1-9]$/.test(i5.text)) throw new e2(`Invalid argument number "` + i5.text + `"`);
      if (parseInt(i5.text) !== o5 + 1) throw new e2(`Argument number "` + i5.text + `" out of order`);
      o5++, c4.push([]);
    } else if (i5.text === `EOF`) throw new e2(`Expected a macro definition`);
    else c4[o5].push(i5.text);
    var { tokens: l4 } = n4.gullet.consumeArg();
    return s6 && l4.unshift(s6), (r5 === `\\edef` || r5 === `\\xdef`) && (l4 = n4.gullet.expandTokens(l4), l4.reverse()), n4.gullet.macros.set(a5, { tokens: l4, numArgs: o5, delimiters: c4 }, r5 === pr2[r5]), { type: `internal`, mode: n4.mode };
  } }), q2({ type: `internal`, names: [`\\let`, `\\\\globallet`], props: { numArgs: 0, allowedInText: true, primitive: true }, handler(e10) {
    var { parser: t8, funcName: n4 } = e10, r5 = mr2(t8.gullet.popToken());
    return t8.gullet.consumeSpaces(), gr2(t8, r5, hr2(t8), n4 === `\\\\globallet`), { type: `internal`, mode: t8.mode };
  } }), q2({ type: `internal`, names: [`\\futurelet`, `\\\\globalfuture`], props: { numArgs: 0, allowedInText: true, primitive: true }, handler(e10) {
    var { parser: t8, funcName: n4 } = e10, r5 = mr2(t8.gullet.popToken()), i5 = t8.gullet.popToken(), a5 = t8.gullet.popToken();
    return gr2(t8, r5, a5, n4 === `\\\\globalfuture`), t8.gullet.pushToken(a5), t8.gullet.pushToken(i5), { type: `internal`, mode: t8.mode };
  } });
  var _r2 = function(e10, t8, n4) {
    var r5 = qe2(A2.math[e10] && A2.math[e10].replace || e10, t8, n4);
    if (!r5) throw Error(`Unsupported symbol ` + e10 + ` and font size ` + t8 + `.`);
    return r5;
  };
  var vr2 = function(e10, t8, n4, r5) {
    var i5 = n4.havingBaseStyle(t8), a5 = W2(r5.concat(i5.sizingClasses(n4)), [e10], n4), o5 = i5.sizeMultiplier / n4.sizeMultiplier;
    return a5.height *= o5, a5.depth *= o5, a5.maxFontSize = i5.sizeMultiplier, a5;
  };
  var yr2 = function(e10, t8, n4) {
    var r5 = t8.havingBaseStyle(n4), i5 = (1 - t8.sizeMultiplier / r5.sizeMultiplier) * t8.fontMetrics().axisHeight;
    e10.classes.push(`delimcenter`), e10.style.top = k2(i5), e10.height -= i5, e10.depth += i5;
  };
  var br2 = function(e10, t8, n4, r5, i5, a5) {
    var o5 = vr2(Nt2(e10, `Main-Regular`, i5, r5), t8, r5, a5);
    return n4 && yr2(o5, r5, t8), o5;
  };
  var xr2 = function(e10, t8, n4, r5) {
    return Nt2(e10, `Size` + t8 + `-Regular`, n4, r5);
  };
  var Sr2 = function(e10, t8, n4, r5, i5, a5) {
    var o5 = xr2(e10, t8, i5, r5), s6 = vr2(W2([`delimsizing`, `size` + t8], [o5], r5), E2.TEXT, r5, a5);
    return n4 && yr2(s6, r5, E2.TEXT), s6;
  };
  var Cr = function(e10, t8, n4) {
    return { type: `elem`, elem: W2([`delimsizinginner`, t8 === `Size1-Regular` ? `delim-size1` : `delim-size4`], [W2([], [Nt2(e10, t8, n4)])]) };
  };
  var wr2 = function(e10, t8, n4) {
    var r5 = Ue2[`Size4-Regular`][e10.charCodeAt(0)] ? Ue2[`Size4-Regular`][e10.charCodeAt(0)][4] : Ue2[`Size1-Regular`][e10.charCodeAt(0)][4], i5 = Bt2([], [new Le2([new Re2(`inner`, ve2(e10, Math.round(1e3 * t8)))], { width: k2(r5), height: k2(t8), style: `width:` + k2(r5), viewBox: `0 0 ` + 1e3 * r5 + ` ` + Math.round(1e3 * t8), preserveAspectRatio: `xMinYMin` })], n4);
    return i5.height = t8, i5.style.height = k2(t8), i5.style.width = k2(r5), { type: `elem`, elem: i5 };
  };
  var Tr2 = 8e-3;
  var Er2 = { type: `kern`, size: -1 * Tr2 };
  var Dr2 = /* @__PURE__ */ new Set([`|`, `\\lvert`, `\\rvert`, `\\vert`]);
  var Or2 = /* @__PURE__ */ new Set([`\\|`, `\\lVert`, `\\rVert`, `\\Vert`]);
  var kr = function(e10, t8, n4, r5, i5, a5) {
    var o5, s6, c4, l4, u4 = ``, d5 = 0;
    o5 = c4 = l4 = e10, s6 = null;
    var f6 = `Size1-Regular`;
    e10 === `\\uparrow` ? c4 = l4 = `\u23D0` : e10 === `\\Uparrow` ? c4 = l4 = `\u2016` : e10 === `\\downarrow` ? o5 = c4 = `\u23D0` : e10 === `\\Downarrow` ? o5 = c4 = `\u2016` : e10 === `\\updownarrow` ? (o5 = `\\uparrow`, c4 = `\u23D0`, l4 = `\\downarrow`) : e10 === `\\Updownarrow` ? (o5 = `\\Uparrow`, c4 = `\u2016`, l4 = `\\Downarrow`) : Dr2.has(e10) ? (c4 = `\u2223`, u4 = `vert`, d5 = 333) : Or2.has(e10) ? (c4 = `\u2225`, u4 = `doublevert`, d5 = 556) : e10 === `[` || e10 === `\\lbrack` ? (o5 = `\u23A1`, c4 = `\u23A2`, l4 = `\u23A3`, f6 = `Size4-Regular`, u4 = `lbrack`, d5 = 667) : e10 === `]` || e10 === `\\rbrack` ? (o5 = `\u23A4`, c4 = `\u23A5`, l4 = `\u23A6`, f6 = `Size4-Regular`, u4 = `rbrack`, d5 = 667) : e10 === `\\lfloor` || e10 === `\u230A` ? (c4 = o5 = `\u23A2`, l4 = `\u23A3`, f6 = `Size4-Regular`, u4 = `lfloor`, d5 = 667) : e10 === `\\lceil` || e10 === `\u2308` ? (o5 = `\u23A1`, c4 = l4 = `\u23A2`, f6 = `Size4-Regular`, u4 = `lceil`, d5 = 667) : e10 === `\\rfloor` || e10 === `\u230B` ? (c4 = o5 = `\u23A5`, l4 = `\u23A6`, f6 = `Size4-Regular`, u4 = `rfloor`, d5 = 667) : e10 === `\\rceil` || e10 === `\u2309` ? (o5 = `\u23A4`, c4 = l4 = `\u23A5`, f6 = `Size4-Regular`, u4 = `rceil`, d5 = 667) : e10 === `(` || e10 === `\\lparen` ? (o5 = `\u239B`, c4 = `\u239C`, l4 = `\u239D`, f6 = `Size4-Regular`, u4 = `lparen`, d5 = 875) : e10 === `)` || e10 === `\\rparen` ? (o5 = `\u239E`, c4 = `\u239F`, l4 = `\u23A0`, f6 = `Size4-Regular`, u4 = `rparen`, d5 = 875) : e10 === `\\{` || e10 === `\\lbrace` ? (o5 = `\u23A7`, s6 = `\u23A8`, l4 = `\u23A9`, c4 = `\u23AA`, f6 = `Size4-Regular`) : e10 === `\\}` || e10 === `\\rbrace` ? (o5 = `\u23AB`, s6 = `\u23AC`, l4 = `\u23AD`, c4 = `\u23AA`, f6 = `Size4-Regular`) : e10 === `\\lgroup` || e10 === `\u27EE` ? (o5 = `\u23A7`, l4 = `\u23A9`, c4 = `\u23AA`, f6 = `Size4-Regular`) : e10 === `\\rgroup` || e10 === `\u27EF` ? (o5 = `\u23AB`, l4 = `\u23AD`, c4 = `\u23AA`, f6 = `Size4-Regular`) : e10 === `\\lmoustache` || e10 === `\u23B0` ? (o5 = `\u23A7`, l4 = `\u23AD`, c4 = `\u23AA`, f6 = `Size4-Regular`) : (e10 === `\\rmoustache` || e10 === `\u23B1`) && (o5 = `\u23AB`, l4 = `\u23A9`, c4 = `\u23AA`, f6 = `Size4-Regular`);
    var p4 = _r2(o5, f6, i5), m5 = p4.height + p4.depth, h5 = _r2(c4, f6, i5), g6 = h5.height + h5.depth, _6 = _r2(l4, f6, i5), v7 = _6.height + _6.depth, y7 = 0, b6 = 1;
    if (s6 !== null) {
      var x5 = _r2(s6, f6, i5);
      y7 = x5.height + x5.depth, b6 = 2;
    }
    var S5 = m5 + v7 + y7, C4 = S5 + Math.max(0, Math.ceil((t8 - S5) / (b6 * g6))) * b6 * g6, w3 = r5.fontMetrics().axisHeight;
    n4 && (w3 *= r5.sizeMultiplier);
    var ee4 = C4 / 2 - w3, T3 = [];
    if (u4.length > 0) {
      var te4 = C4 - m5 - v7, ne4 = Math.round(C4 * 1e3), re4 = be2(u4, Math.round(te4 * 1e3)), ie5 = new Re2(u4, re4), ae6 = k2(d5 / 1e3), oe6 = k2(ne4 / 1e3), se6 = Bt2([], [new Le2([ie5], { width: ae6, height: oe6, viewBox: `0 0 ` + d5 + ` ` + ne4 })], r5);
      se6.height = ne4 / 1e3, se6.style.width = ae6, se6.style.height = oe6, T3.push({ type: `elem`, elem: se6 });
    } else {
      if (T3.push(Cr(l4, f6, i5)), T3.push(Er2), s6 === null) {
        var ce7 = C4 - m5 - v7 + 2 * Tr2;
        T3.push(wr2(c4, ce7, r5));
      } else {
        var D5 = (C4 - m5 - v7 - y7) / 2 + 2 * Tr2;
        T3.push(wr2(c4, D5, r5)), T3.push(Er2), T3.push(Cr(s6, f6, i5)), T3.push(Er2), T3.push(wr2(c4, D5, r5));
      }
      T3.push(Er2), T3.push(Cr(o5, f6, i5));
    }
    var le7 = r5.havingBaseStyle(E2.TEXT);
    return vr2(W2([`delimsizing`, `mult`], [G2({ positionType: `bottom`, positionData: ee4, children: T3 })], le7), E2.TEXT, r5, a5);
  };
  var Ar = 80;
  var jr = 0.08;
  var Mr = function(e10, t8, n4, r5, i5) {
    return Bt2([`hide-tail`], [new Le2([new Re2(e10, _e2(e10, r5, n4))], { width: `400em`, height: k2(t8), viewBox: `0 0 400000 ` + n4, preserveAspectRatio: `xMinYMin slice` })], i5);
  };
  var Nr = function(e10, t8) {
    var n4 = t8.havingBaseSizing(), r5 = Ur(`\\surd`, e10 * n4.sizeMultiplier, Vr, n4), i5 = n4.sizeMultiplier, a5 = Math.max(0, t8.minRuleThickness - t8.fontMetrics().sqrtRuleThickness), o5, s6, c4, l4, u4;
    return r5.type === `small` ? (l4 = 1e3 + 1e3 * a5 + Ar, e10 < 1 ? i5 = 1 : e10 < 1.4 && (i5 = 0.7), s6 = (1 + a5 + jr) / i5, c4 = (1 + a5) / i5, o5 = Mr(`sqrtMain`, s6, l4, a5, t8), o5.style.minWidth = `0.853em`, u4 = 0.833 / i5) : r5.type === `large` ? (l4 = (1e3 + Ar) * Lr[r5.size], c4 = (Lr[r5.size] + a5) / i5, s6 = (Lr[r5.size] + a5 + jr) / i5, o5 = Mr(`sqrtSize` + r5.size, s6, l4, a5, t8), o5.style.minWidth = `1.02em`, u4 = 1 / i5) : (s6 = e10 + a5 + jr, c4 = e10 + a5, l4 = Math.floor(1e3 * e10 + a5) + Ar, o5 = Mr(`sqrtTall`, s6, l4, a5, t8), o5.style.minWidth = `0.742em`, u4 = 1.056), o5.height = c4, o5.style.height = k2(s6), { span: o5, advanceWidth: u4, ruleWidth: (t8.fontMetrics().sqrtRuleThickness + a5) * i5 };
  };
  var Pr = /* @__PURE__ */ new Set([`(`, `\\lparen`, `)`, `\\rparen`, `[`, `\\lbrack`, `]`, `\\rbrack`, `\\{`, `\\lbrace`, `\\}`, `\\rbrace`, `\\lfloor`, `\\rfloor`, `\u230A`, `\u230B`, `\\lceil`, `\\rceil`, `\u2308`, `\u2309`, `\\surd`]);
  var Fr = /* @__PURE__ */ new Set([`\\uparrow`, `\\downarrow`, `\\updownarrow`, `\\Uparrow`, `\\Downarrow`, `\\Updownarrow`, `|`, `\\|`, `\\vert`, `\\Vert`, `\\lvert`, `\\rvert`, `\\lVert`, `\\rVert`, `\\lgroup`, `\\rgroup`, `\u27EE`, `\u27EF`, `\\lmoustache`, `\\rmoustache`, `\u23B0`, `\u23B1`]);
  var Ir = /* @__PURE__ */ new Set([`<`, `>`, `\\langle`, `\\rangle`, `/`, `\\backslash`, `\\lt`, `\\gt`]);
  var Lr = [0, 1.2, 1.8, 2.4, 3];
  var Rr = function(t8, n4, r5, i5, a5) {
    if (t8 === `<` || t8 === `\\lt` || t8 === `\u27E8` ? t8 = `\\langle` : (t8 === `>` || t8 === `\\gt` || t8 === `\u27E9`) && (t8 = `\\rangle`), Pr.has(t8) || Ir.has(t8)) return Sr2(t8, n4, false, r5, i5, a5);
    if (Fr.has(t8)) return kr(t8, Lr[n4], false, r5, i5, a5);
    throw new e2(`Illegal delimiter: '` + t8 + `'`);
  };
  var zr = [{ type: `small`, style: E2.SCRIPTSCRIPT }, { type: `small`, style: E2.SCRIPT }, { type: `small`, style: E2.TEXT }, { type: `large`, size: 1 }, { type: `large`, size: 2 }, { type: `large`, size: 3 }, { type: `large`, size: 4 }];
  var Br = [{ type: `small`, style: E2.SCRIPTSCRIPT }, { type: `small`, style: E2.SCRIPT }, { type: `small`, style: E2.TEXT }, { type: `stack` }];
  var Vr = [{ type: `small`, style: E2.SCRIPTSCRIPT }, { type: `small`, style: E2.SCRIPT }, { type: `small`, style: E2.TEXT }, { type: `large`, size: 1 }, { type: `large`, size: 2 }, { type: `large`, size: 3 }, { type: `large`, size: 4 }, { type: `stack` }];
  var Hr = function(e10) {
    if (e10.type === `small`) return `Main-Regular`;
    if (e10.type === `large`) return `Size` + e10.size + `-Regular`;
    if (e10.type === `stack`) return `Size4-Regular`;
    var t8 = e10.type;
    throw Error(`Add support for delim type '` + t8 + `' here.`);
  };
  var Ur = function(e10, t8, n4, r5) {
    for (var i5 = Math.min(2, 3 - r5.style.size); i5 < n4.length; i5++) {
      var a5 = n4[i5];
      if (a5.type === `stack`) break;
      var o5 = _r2(e10, Hr(a5), `math`), s6 = o5.height + o5.depth;
      if (a5.type === `small`) {
        var c4 = r5.havingBaseStyle(a5.style);
        s6 *= c4.sizeMultiplier;
      }
      if (s6 > t8) return a5;
    }
    return n4[n4.length - 1];
  };
  var Wr = function(e10, t8, n4, r5, i5, a5) {
    e10 === `<` || e10 === `\\lt` || e10 === `\u27E8` ? e10 = `\\langle` : (e10 === `>` || e10 === `\\gt` || e10 === `\u27E9`) && (e10 = `\\rangle`);
    var o5 = Ir.has(e10) ? zr : Pr.has(e10) ? Vr : Br, s6 = Ur(e10, t8, o5, r5);
    return s6.type === `small` ? br2(e10, s6.style, n4, r5, i5, a5) : s6.type === `large` ? Sr2(e10, s6.size, n4, r5, i5, a5) : kr(e10, t8, n4, r5, i5, a5);
  };
  var Gr = function(e10, t8, n4, r5, i5, a5) {
    var o5 = r5.fontMetrics().axisHeight * r5.sizeMultiplier, s6 = 901, c4 = 5 / r5.fontMetrics().ptPerEm, l4 = Math.max(t8 - o5, n4 + o5);
    return Wr(e10, Math.max(l4 / 500 * s6, 2 * l4 - c4), true, r5, i5, a5);
  };
  var Kr2 = { "\\bigl": { mclass: `mopen`, size: 1 }, "\\Bigl": { mclass: `mopen`, size: 2 }, "\\biggl": { mclass: `mopen`, size: 3 }, "\\Biggl": { mclass: `mopen`, size: 4 }, "\\bigr": { mclass: `mclose`, size: 1 }, "\\Bigr": { mclass: `mclose`, size: 2 }, "\\biggr": { mclass: `mclose`, size: 3 }, "\\Biggr": { mclass: `mclose`, size: 4 }, "\\bigm": { mclass: `mrel`, size: 1 }, "\\Bigm": { mclass: `mrel`, size: 2 }, "\\biggm": { mclass: `mrel`, size: 3 }, "\\Biggm": { mclass: `mrel`, size: 4 }, "\\big": { mclass: `mord`, size: 1 }, "\\Big": { mclass: `mord`, size: 2 }, "\\bigg": { mclass: `mord`, size: 3 }, "\\Bigg": { mclass: `mord`, size: 4 } };
  var qr = new Set(`(,\\lparen,),\\rparen,[,\\lbrack,],\\rbrack,\\{,\\lbrace,\\},\\rbrace,\\lfloor,\\rfloor,\u230A,\u230B,\\lceil,\\rceil,\u2308,\u2309,<,>,\\langle,\u27E8,\\rangle,\u27E9,\\lt,\\gt,\\lvert,\\rvert,\\lVert,\\rVert,\\lgroup,\\rgroup,\u27EE,\u27EF,\\lmoustache,\\rmoustache,\u23B0,\u23B1,/,\\backslash,|,\\vert,\\|,\\Vert,\\uparrow,\\Uparrow,\\downarrow,\\Downarrow,\\updownarrow,\\Updownarrow,.`.split(`,`));
  function Jr(e10) {
    return `isMiddle` in e10;
  }
  function Yr2(t8, n4) {
    var r5 = Xn2(t8);
    if (r5 && qr.has(r5.text)) return r5;
    throw r5 ? new e2(`Invalid delimiter '` + r5.text + `' after '` + n4.funcName + `'`, t8) : new e2(`Invalid delimiter type '` + t8.type + `'`, t8);
  }
  q2({ type: `delimsizing`, names: [`\\bigl`, `\\Bigl`, `\\biggl`, `\\Biggl`, `\\bigr`, `\\Bigr`, `\\biggr`, `\\Biggr`, `\\bigm`, `\\Bigm`, `\\biggm`, `\\Biggm`, `\\big`, `\\Big`, `\\bigg`, `\\Bigg`], props: { numArgs: 1, argTypes: [`primitive`] }, handler: (e10, t8) => {
    var n4 = Yr2(t8[0], e10);
    return { type: `delimsizing`, mode: e10.parser.mode, size: Kr2[e10.funcName].size, mclass: Kr2[e10.funcName].mclass, delim: n4.text };
  }, htmlBuilder: (e10, t8) => e10.delim === `.` ? W2([e10.mclass]) : Rr(e10.delim, e10.size, t8, e10.mode, [e10.mclass]), mathmlBuilder: (e10) => {
    var t8 = [];
    e10.delim !== `.` && t8.push(wn2(e10.delim, e10.mode));
    var n4 = new X2(`mo`, t8);
    e10.mclass === `mopen` || e10.mclass === `mclose` ? n4.setAttribute(`fence`, `true`) : n4.setAttribute(`fence`, `false`), n4.setAttribute(`stretchy`, `true`);
    var r5 = k2(Lr[e10.size]);
    return n4.setAttribute(`minsize`, r5), n4.setAttribute(`maxsize`, r5), n4;
  } });
  function Xr(e10) {
    if (!e10.body) throw Error(`Bug: The leftright ParseNode wasn't fully parsed.`);
  }
  q2({ type: `leftright-right`, names: [`\\right`], props: { numArgs: 1, primitive: true }, handler: (t8, n4) => {
    var r5 = t8.parser.gullet.macros.get(`\\current@color`);
    if (r5 && typeof r5 != `string`) throw new e2(`\\current@color set to non-string in \\right`);
    return { type: `leftright-right`, mode: t8.parser.mode, delim: Yr2(n4[0], t8).text, color: r5 };
  } }), q2({ type: `leftright`, names: [`\\left`], props: { numArgs: 1, primitive: true }, handler: (e10, t8) => {
    var n4 = Yr2(t8[0], e10), r5 = e10.parser;
    ++r5.leftrightDepth;
    var i5 = r5.parseExpression(false);
    --r5.leftrightDepth, r5.expect(`\\right`, false);
    var a5 = Q2(r5.parseFunction(), `leftright-right`);
    return { type: `leftright`, mode: r5.mode, body: i5, left: n4.text, right: a5.delim, rightColor: a5.color };
  }, htmlBuilder: (e10, t8) => {
    Xr(e10);
    for (var n4 = dn2(e10.body, t8, true, [`mopen`, `mclose`]), r5 = 0, i5 = 0, a5 = false, o5 = 0; o5 < n4.length; o5++) {
      var s6 = n4[o5];
      Jr(s6) ? a5 = true : (r5 = Math.max(n4[o5].height, r5), i5 = Math.max(n4[o5].depth, i5));
    }
    r5 *= t8.sizeMultiplier, i5 *= t8.sizeMultiplier;
    var c4 = e10.left === `.` ? gn2(t8, [`mopen`]) : Gr(e10.left, r5, i5, t8, e10.mode, [`mopen`]);
    if (n4.unshift(c4), a5) for (var l4 = 1; l4 < n4.length; l4++) {
      var u4 = n4[l4];
      if (Jr(u4)) {
        var d5 = u4.isMiddle;
        n4[l4] = Gr(d5.delim, r5, i5, d5.options, e10.mode, []);
      }
    }
    var f6;
    if (e10.right === `.`) f6 = gn2(t8, [`mclose`]);
    else {
      var p4 = e10.rightColor ? t8.withColor(e10.rightColor) : t8;
      f6 = Gr(e10.right, r5, i5, p4, e10.mode, [`mclose`]);
    }
    return n4.push(f6), W2([`minner`], n4, t8);
  }, mathmlBuilder: (e10, t8) => {
    Xr(e10);
    var n4 = kn2(e10.body, t8);
    if (e10.left !== `.`) {
      var r5 = new X2(`mo`, [wn2(e10.left, e10.mode)]);
      r5.setAttribute(`fence`, `true`), n4.unshift(r5);
    }
    if (e10.right !== `.`) {
      var i5 = new X2(`mo`, [wn2(e10.right, e10.mode)]);
      i5.setAttribute(`fence`, `true`), e10.rightColor && i5.setAttribute(`mathcolor`, e10.rightColor), n4.push(i5);
    }
    return Tn2(n4);
  } }), q2({ type: `middle`, names: [`\\middle`], props: { numArgs: 1, primitive: true }, handler: (t8, n4) => {
    var r5 = Yr2(n4[0], t8);
    if (!t8.parser.leftrightDepth) throw new e2(`\\middle without preceding \\left`, r5);
    return { type: `middle`, mode: t8.parser.mode, delim: r5.text };
  }, htmlBuilder: (e10, t8) => {
    var n4;
    return e10.delim === `.` ? n4 = gn2(t8, []) : (n4 = Rr(e10.delim, 1, t8, e10.mode, []), n4.isMiddle = { delim: e10.delim, options: t8 }), n4;
  }, mathmlBuilder: (e10, t8) => {
    var n4 = new X2(`mo`, [e10.delim === `\\vert` || e10.delim === `|` ? wn2(`|`, `text`) : wn2(e10.delim, e10.mode)]);
    return n4.setAttribute(`fence`, `true`), n4.setAttribute(`lspace`, `0.05em`), n4.setAttribute(`rspace`, `0.05em`), n4;
  } });
  var Zr = (e10, t8) => {
    var n4 = Wt2(Y2(e10.body, t8), t8), r5 = e10.label.slice(1), i5 = t8.sizeMultiplier, a5, o5, s6 = c2(e10.body);
    if (r5 === `sout`) a5 = W2([`stretchy`, `sout`]), a5.height = t8.fontMetrics().defaultRuleThickness / i5, o5 = -0.5 * t8.fontMetrics().xHeight;
    else if (r5 === `phase`) {
      var l4 = O2({ number: 0.6, unit: `pt` }, t8), u4 = O2({ number: 0.35, unit: `ex` }, t8), d5 = t8.havingBaseSizing();
      i5 /= d5.sizeMultiplier;
      var f6 = n4.height + n4.depth + l4 + u4;
      n4.style.paddingLeft = k2(f6 / 2 + l4);
      var p4 = Math.floor(1e3 * f6 * i5);
      a5 = Bt2([`hide-tail`], [new Le2([new Re2(`phase`, he2(p4))], { width: `400em`, height: k2(p4 / 1e3), viewBox: `0 0 400000 ` + p4, preserveAspectRatio: `xMinYMin slice` })], t8), a5.style.height = k2(f6), o5 = n4.depth + l4 + u4;
    } else {
      /cancel/.test(r5) ? s6 || n4.classes.push(`cancel-pad`) : r5 === `angl` ? n4.classes.push(`anglpad`) : n4.classes.push(`boxpad`);
      var m5, h5, g6 = 0;
      /box/.test(r5) ? (g6 = Math.max(t8.fontMetrics().fboxrule, t8.minRuleThickness), m5 = t8.fontMetrics().fboxsep + (r5 === `colorbox` ? 0 : g6), h5 = m5) : r5 === `angl` ? (g6 = Math.max(t8.fontMetrics().defaultRuleThickness, t8.minRuleThickness), m5 = 4 * g6, h5 = Math.max(0, 0.25 - n4.depth)) : (m5 = s6 ? 0.2 : 0, h5 = m5), a5 = Gn2(n4, r5, m5, h5, t8), /fbox|boxed|fcolorbox/.test(r5) ? (a5.style.borderStyle = `solid`, a5.style.borderWidth = k2(g6)) : r5 === `angl` && g6 !== 0.049 && (a5.style.borderTopWidth = k2(g6), a5.style.borderRightWidth = k2(g6)), o5 = n4.depth + h5, e10.backgroundColor && (a5.style.backgroundColor = e10.backgroundColor, e10.borderColor && (a5.style.borderColor = e10.borderColor));
    }
    var _6;
    if (e10.backgroundColor) _6 = G2({ positionType: `individualShift`, children: [{ type: `elem`, elem: a5, shift: o5 }, { type: `elem`, elem: n4, shift: 0 }] });
    else {
      var v7 = /cancel|phase/.test(r5) ? [`svg-align`] : [];
      _6 = G2({ positionType: `individualShift`, children: [{ type: `elem`, elem: n4, shift: 0 }, { type: `elem`, elem: a5, shift: o5, wrapperClasses: v7 }] });
    }
    return /cancel/.test(r5) && (_6.height = n4.height, _6.depth = n4.depth), /cancel/.test(r5) && !s6 ? W2([`mord`, `cancel-lap`], [_6], t8) : W2([`mord`], [_6], t8);
  };
  var Qr2 = (e10, t8) => {
    var n4, r5 = new X2(e10.label.includes(`colorbox`) ? `mpadded` : `menclose`, [Z2(e10.body, t8)]);
    switch (e10.label) {
      case `\\cancel`:
        r5.setAttribute(`notation`, `updiagonalstrike`);
        break;
      case `\\bcancel`:
        r5.setAttribute(`notation`, `downdiagonalstrike`);
        break;
      case `\\phase`:
        r5.setAttribute(`notation`, `phasorangle`);
        break;
      case `\\sout`:
        r5.setAttribute(`notation`, `horizontalstrike`);
        break;
      case `\\fbox`:
        r5.setAttribute(`notation`, `box`);
        break;
      case `\\angl`:
        r5.setAttribute(`notation`, `actuarial`);
        break;
      case `\\fcolorbox`:
      case `\\colorbox`:
        if (n4 = t8.fontMetrics().fboxsep * t8.fontMetrics().ptPerEm, r5.setAttribute(`width`, `+` + 2 * n4 + `pt`), r5.setAttribute(`height`, `+` + 2 * n4 + `pt`), r5.setAttribute(`lspace`, n4 + `pt`), r5.setAttribute(`voffset`, n4 + `pt`), e10.label === `\\fcolorbox`) {
          var i5 = Math.max(t8.fontMetrics().fboxrule, t8.minRuleThickness);
          r5.setAttribute(`style`, `border: ` + k2(i5) + ` solid ` + e10.borderColor);
        }
        break;
      case `\\xcancel`:
        r5.setAttribute(`notation`, `updiagonalstrike downdiagonalstrike`);
    }
    return e10.backgroundColor && r5.setAttribute(`mathbackground`, e10.backgroundColor), r5;
  };
  q2({ type: `enclose`, names: [`\\colorbox`], props: { numArgs: 2, allowedInText: true, argTypes: [`color`, `hbox`] }, handler(e10, t8, n4) {
    var { parser: r5, funcName: i5 } = e10, a5 = Q2(t8[0], `color-token`).color, o5 = t8[1];
    return { type: `enclose`, mode: r5.mode, label: i5, backgroundColor: a5, body: o5 };
  }, htmlBuilder: Zr, mathmlBuilder: Qr2 }), q2({ type: `enclose`, names: [`\\fcolorbox`], props: { numArgs: 3, allowedInText: true, argTypes: [`color`, `color`, `hbox`] }, handler(e10, t8, n4) {
    var { parser: r5, funcName: i5 } = e10, a5 = Q2(t8[0], `color-token`).color, o5 = Q2(t8[1], `color-token`).color, s6 = t8[2];
    return { type: `enclose`, mode: r5.mode, label: i5, backgroundColor: o5, borderColor: a5, body: s6 };
  }, htmlBuilder: Zr, mathmlBuilder: Qr2 }), q2({ type: `enclose`, names: [`\\fbox`], props: { numArgs: 1, argTypes: [`hbox`], allowedInText: true }, handler(e10, t8) {
    var { parser: n4 } = e10;
    return { type: `enclose`, mode: n4.mode, label: `\\fbox`, body: t8[0] };
  } }), q2({ type: `enclose`, names: [`\\cancel`, `\\bcancel`, `\\xcancel`, `\\phase`], props: { numArgs: 1 }, handler(e10, t8) {
    var { parser: n4, funcName: r5 } = e10, i5 = t8[0];
    return { type: `enclose`, mode: n4.mode, label: r5, body: i5 };
  }, htmlBuilder: Zr, mathmlBuilder: Qr2 }), q2({ type: `enclose`, names: [`\\sout`], props: { numArgs: 1, allowedInText: true }, handler(e10, t8) {
    var { parser: n4, funcName: r5 } = e10;
    n4.mode === `math` && n4.settings.reportNonstrict(`mathVsSout`, `LaTeX's \\sout works only in text mode`);
    var i5 = t8[0];
    return { type: `enclose`, mode: n4.mode, label: r5, body: i5 };
  }, htmlBuilder: Zr, mathmlBuilder: Qr2 }), q2({ type: `enclose`, names: [`\\angl`], props: { numArgs: 1, argTypes: [`hbox`], allowedInText: false }, handler(e10, t8) {
    var { parser: n4 } = e10;
    return { type: `enclose`, mode: n4.mode, label: `\\angl`, body: t8[0] };
  } });
  var $r2 = {};
  function ei2(e10) {
    for (var { type: t8, names: n4, props: r5, handler: i5, htmlBuilder: a5, mathmlBuilder: o5 } = e10, s6 = { type: t8, numArgs: r5.numArgs || 0, allowedInText: false, numOptionalArgs: 0, handler: i5 }, c4 = 0; c4 < n4.length; ++c4) $r2[n4[c4]] = s6;
    a5 && (nn[t8] = a5), o5 && (rn[t8] = o5);
  }
  var ti2 = {};
  function $2(e10, t8) {
    ti2[e10] = t8;
  }
  var ni = class e5 {
    constructor(e10, t8, n4) {
      this.lexer = void 0, this.start = void 0, this.end = void 0, this.lexer = e10, this.start = t8, this.end = n4;
    }
    static range(t8, n4) {
      return n4 ? !t8 || !t8.loc || !n4.loc || t8.loc.lexer !== n4.loc.lexer ? null : new e5(t8.loc.lexer, t8.loc.start, n4.loc.end) : t8 && t8.loc;
    }
  };
  var ri = class e6 {
    constructor(e10, t8) {
      this.text = void 0, this.loc = void 0, this.noexpand = void 0, this.treatAsRelax = void 0, this.text = e10, this.loc = t8;
    }
    range(t8, n4) {
      return new e6(n4, ni.range(this, t8));
    }
  };
  function ii2(e10) {
    var t8 = [];
    e10.consumeSpaces();
    var n4 = e10.fetch().text;
    for (n4 === `\\relax` && (e10.consume(), e10.consumeSpaces(), n4 = e10.fetch().text); n4 === `\\hline` || n4 === `\\hdashline`; ) e10.consume(), t8.push(n4 === `\\hdashline`), e10.consumeSpaces(), n4 = e10.fetch().text;
    return t8;
  }
  var ai2 = (t8) => {
    if (!t8.parser.settings.displayMode) throw new e2(`{` + t8.envName + `} can be used only in display mode.`);
  };
  var oi2 = /* @__PURE__ */ new Set([`gather`, `gather*`]);
  function si2(e10) {
    if (!e10.includes(`ed`)) return !e10.includes(`*`);
  }
  function ci2(t8, n4, r5) {
    var { hskipBeforeAndAfter: i5, addJot: a5, cols: o5, arraystretch: s6, colSeparationType: c4, autoTag: l4, singleRow: u4, emptySingleRow: d5, maxNumCols: f6, leqno: p4 } = n4;
    if (t8.gullet.beginGroup(), u4 || t8.gullet.macros.set(`\\cr`, `\\\\\\relax`), !s6) {
      var m5 = t8.gullet.expandMacroAsText(`\\arraystretch`);
      if (m5 == null) s6 = 1;
      else if (s6 = parseFloat(m5), !s6 || s6 < 0) throw new e2(`Invalid \\arraystretch: ` + m5);
    }
    t8.gullet.beginGroup();
    var h5 = [], g6 = [h5], _6 = [], v7 = [], y7 = l4 == null ? void 0 : [];
    function b6() {
      l4 && t8.gullet.macros.set(`\\@eqnsw`, `1`, true);
    }
    function x5() {
      y7 && (t8.gullet.macros.get(`\\df@tag`) ? (y7.push(t8.subparse([new ri(`\\df@tag`)])), t8.gullet.macros.set(`\\df@tag`, void 0, true)) : y7.push(!!l4 && t8.gullet.macros.get(`\\@eqnsw`) === `1`));
    }
    for (b6(), v7.push(ii2(t8)); ; ) {
      var S5 = t8.parseExpression(false, u4 ? `\\end` : `\\\\`);
      t8.gullet.endGroup(), t8.gullet.beginGroup();
      var C4 = { type: `ordgroup`, mode: t8.mode, body: S5 };
      r5 && (C4 = { type: `styling`, mode: t8.mode, style: r5, resetFont: true, body: [C4] }), h5.push(C4);
      var w3 = t8.fetch().text;
      if (w3 === `&`) {
        if (f6 && h5.length === f6) {
          if (u4 || c4) throw new e2(`Too many tab characters: &`, t8.nextToken);
          t8.settings.reportNonstrict(`textEnv`, `Too few columns specified in the {array} column argument.`);
        }
        t8.consume();
      } else if (w3 === `\\end`) {
        x5(), h5.length === 1 && C4.type === `styling` && C4.body.length === 1 && C4.body[0].type === `ordgroup` && C4.body[0].body.length === 0 && (g6.length > 1 || !d5) && g6.pop(), v7.length < g6.length + 1 && v7.push([]);
        break;
      } else if (w3 === `\\\\`) {
        t8.consume();
        var ee4 = void 0;
        t8.gullet.future().text !== ` ` && (ee4 = t8.parseSizeGroup(true)), _6.push(ee4 ? ee4.value : null), x5(), v7.push(ii2(t8)), h5 = [], g6.push(h5), b6();
      } else throw new e2(`Expected & or \\\\ or \\cr or \\end`, t8.nextToken);
    }
    return t8.gullet.endGroup(), t8.gullet.endGroup(), { type: `array`, mode: t8.mode, addJot: a5, arraystretch: s6, body: g6, cols: o5, rowGaps: _6, hskipBeforeAndAfter: i5, hLinesBeforeRow: v7, colSeparationType: c4, tags: y7, leqno: p4 };
  }
  function li2(e10) {
    return e10.slice(0, 1) === `d` ? `display` : `text`;
  }
  var ui2 = function(t8, n4) {
    var r5, i5, a5 = t8.body.length, o5 = t8.hLinesBeforeRow, s6 = 0, c4 = Array(a5), l4 = [], u4 = Math.max(n4.fontMetrics().arrayRuleWidth, n4.minRuleThickness), d5 = 1 / n4.fontMetrics().ptPerEm, f6 = 5 * d5;
    t8.colSeparationType && t8.colSeparationType === `small` && (f6 = 0.2778 * (n4.havingStyle(E2.SCRIPT).sizeMultiplier / n4.sizeMultiplier));
    var p4 = t8.colSeparationType === `CD` ? O2({ number: 3, unit: `ex` }, n4) : 12 * d5, m5 = 3 * d5, h5 = t8.arraystretch * p4, g6 = 0.7 * h5, _6 = 0.3 * h5, v7 = 0;
    function y7(e10) {
      for (var t9 = 0; t9 < e10.length; ++t9) t9 > 0 && (v7 += 0.25), l4.push({ pos: v7, isDashed: e10[t9] });
    }
    for (y7(o5[0]), r5 = 0; r5 < t8.body.length; ++r5) {
      var b6 = t8.body[r5], x5 = g6, S5 = _6;
      s6 < b6.length && (s6 = b6.length);
      var C4 = { cells: Array(b6.length), height: 0, depth: 0, pos: 0 };
      for (i5 = 0; i5 < b6.length; ++i5) {
        var w3 = Y2(b6[i5], n4);
        S5 < w3.depth && (S5 = w3.depth), x5 < w3.height && (x5 = w3.height), C4.cells[i5] = w3;
      }
      var ee4 = t8.rowGaps[r5], T3 = 0;
      ee4 && (T3 = O2(ee4, n4), T3 > 0 && (T3 += _6, S5 < T3 && (S5 = T3), T3 = 0)), t8.addJot && r5 < t8.body.length - 1 && (S5 += m5), C4.height = x5, C4.depth = S5, v7 += x5, C4.pos = v7, v7 += S5 + T3, c4[r5] = C4, y7(o5[r5 + 1]);
    }
    var te4 = v7 / 2 + n4.fontMetrics().axisHeight, ne4 = t8.cols || [], re4 = [], ie5, ae6, oe6 = [];
    if (t8.tags && t8.tags.some((e10) => e10)) for (r5 = 0; r5 < a5; ++r5) {
      var se6 = c4[r5], ce7 = se6.pos - te4, D5 = t8.tags[r5], le7 = void 0;
      le7 = D5 === true ? W2([`eqn-num`], [], n4) : D5 === false ? W2([], [], n4) : W2([], dn2(D5, n4, true), n4), le7.depth = se6.depth, le7.height = se6.height, oe6.push({ type: `elem`, elem: le7, shift: ce7 });
    }
    for (i5 = 0, ae6 = 0; i5 < s6 || ae6 < ne4.length; ++i5, ++ae6) {
      for (var ue7 = ne4[ae6], de7 = true; (fe7 = ue7)?.type === `separator`; ) {
        var fe7;
        if (de7 || (ie5 = W2([`arraycolsep`], []), ie5.style.width = k2(n4.fontMetrics().doubleRuleSep), re4.push(ie5)), ue7.separator === `|` || ue7.separator === `:`) {
          var pe7 = ue7.separator === `|` ? `solid` : `dashed`, me7 = W2([`vertical-separator`], [], n4);
          me7.style.height = k2(v7), me7.style.borderRightWidth = k2(u4), me7.style.borderRightStyle = pe7, me7.style.margin = `0 ` + k2(-u4 / 2);
          var he7 = v7 - te4;
          he7 && (me7.style.verticalAlign = k2(-he7)), re4.push(me7);
        } else throw new e2(`Invalid separator type: ` + ue7.separator);
        ae6++, ue7 = ne4[ae6], de7 = false;
      }
      if (!(i5 >= s6)) {
        var ge7 = void 0;
        (i5 > 0 || t8.hskipBeforeAndAfter) && (ge7 = ue7?.pregap ?? f6, ge7 !== 0 && (ie5 = W2([`arraycolsep`], []), ie5.style.width = k2(ge7), re4.push(ie5)));
        var _e6 = [];
        for (r5 = 0; r5 < a5; ++r5) {
          var ve6 = c4[r5], ye6 = ve6.cells[i5];
          if (ye6) {
            var be6 = ve6.pos - te4;
            ye6.depth = ve6.depth, ye6.height = ve6.height, _e6.push({ type: `elem`, elem: ye6, shift: be6 });
          }
        }
        var xe6 = G2({ positionType: `individualShift`, children: _e6 }), Se6 = W2([`col-align-` + (ue7?.align || `c`)], [xe6]);
        re4.push(Se6), (i5 < s6 - 1 || t8.hskipBeforeAndAfter) && (ge7 = ue7?.postgap ?? f6, ge7 !== 0 && (ie5 = W2([`arraycolsep`], []), ie5.style.width = k2(ge7), re4.push(ie5)));
      }
    }
    var Ce6 = W2([`mtable`], re4);
    if (l4.length > 0) {
      for (var we6 = Vt2(`hline`, n4, u4), Te6 = Vt2(`hdashline`, n4, u4), Ee5 = [{ type: `elem`, elem: Ce6, shift: 0 }]; l4.length > 0; ) {
        var De6 = l4.pop(), Oe5 = De6.pos - te4;
        De6.isDashed ? Ee5.push({ type: `elem`, elem: Te6, shift: Oe5 }) : Ee5.push({ type: `elem`, elem: we6, shift: Oe5 });
      }
      Ce6 = G2({ positionType: `individualShift`, children: Ee5 });
    }
    if (oe6.length === 0) return W2([`mord`], [Ce6], n4);
    var ke6 = W2([`tag`], [G2({ positionType: `individualShift`, children: oe6 })], n4);
    return Ut2([Ce6, ke6]);
  };
  var di2 = { c: `center `, l: `left `, r: `right ` };
  var fi2 = function(e10, t8) {
    for (var n4 = [], r5 = new X2(`mtd`, [], [`mtr-glue`]), i5 = new X2(`mtd`, [], [`mml-eqn-num`]), a5 = 0; a5 < e10.body.length; a5++) {
      for (var o5 = e10.body[a5], s6 = [], c4 = 0; c4 < o5.length; c4++) s6.push(new X2(`mtd`, [Z2(o5[c4], t8)]));
      e10.tags && e10.tags[a5] && (s6.unshift(r5), s6.push(r5), e10.leqno ? s6.unshift(i5) : s6.push(i5)), n4.push(new X2(`mtr`, s6));
    }
    var l4 = new X2(`mtable`, n4), u4 = e10.arraystretch === 0.5 ? 0.1 : 0.16 + e10.arraystretch - 1 + (e10.addJot ? 0.09 : 0);
    l4.setAttribute(`rowspacing`, k2(u4));
    var d5 = ``, f6 = ``;
    if (e10.cols && e10.cols.length > 0) {
      var p4 = e10.cols, m5 = ``, h5 = false, g6 = 0, _6 = p4.length;
      p4[0].type === `separator` && (d5 += `top `, g6 = 1), p4[p4.length - 1].type === `separator` && (d5 += `bottom `, --_6);
      for (var v7 = g6; v7 < _6; v7++) {
        var y7 = p4[v7];
        y7.type === `align` ? (f6 += di2[y7.align], h5 && (m5 += `none `), h5 = true) : y7.type === `separator` && (h5 &&= (m5 += y7.separator === `|` ? `solid ` : `dashed `, false));
      }
      l4.setAttribute(`columnalign`, f6.trim()), /[sd]/.test(m5) && l4.setAttribute(`columnlines`, m5.trim());
    }
    if (e10.colSeparationType === `align`) {
      for (var b6 = e10.cols || [], x5 = ``, S5 = 1; S5 < b6.length; S5++) x5 += S5 % 2 ? `0em ` : `1em `;
      l4.setAttribute(`columnspacing`, x5.trim());
    } else e10.colSeparationType === `alignat` || e10.colSeparationType === `gather` ? l4.setAttribute(`columnspacing`, `0em`) : e10.colSeparationType === `small` ? l4.setAttribute(`columnspacing`, `0.2778em`) : e10.colSeparationType === `CD` ? l4.setAttribute(`columnspacing`, `0.5em`) : l4.setAttribute(`columnspacing`, `1em`);
    var C4 = ``, w3 = e10.hLinesBeforeRow;
    d5 += w3[0].length > 0 ? `left ` : ``, d5 += w3[w3.length - 1].length > 0 ? `right ` : ``;
    for (var ee4 = 1; ee4 < w3.length - 1; ee4++) C4 += w3[ee4].length === 0 ? `none ` : w3[ee4][0] ? `dashed ` : `solid `;
    return /[sd]/.test(C4) && l4.setAttribute(`rowlines`, C4.trim()), d5 !== `` && (l4 = new X2(`menclose`, [l4]), l4.setAttribute(`notation`, d5.trim())), e10.arraystretch && e10.arraystretch < 1 && (l4 = new X2(`mstyle`, [l4]), l4.setAttribute(`scriptlevel`, `1`)), l4;
  };
  var pi2 = function(t8, n4) {
    t8.envName.includes(`ed`) || ai2(t8);
    var r5 = [], i5 = t8.envName.includes(`at`) ? `alignat` : `align`, a5 = t8.envName === `split`, o5 = ci2(t8.parser, { cols: r5, addJot: true, autoTag: a5 ? void 0 : si2(t8.envName), emptySingleRow: true, colSeparationType: i5, maxNumCols: a5 ? 2 : void 0, leqno: t8.parser.settings.leqno }, `display`), s6 = 0, c4 = 0, l4 = { type: `ordgroup`, mode: t8.mode, body: [] };
    if (n4[0] && n4[0].type === `ordgroup`) {
      for (var u4 = ``, d5 = 0; d5 < n4[0].body.length; d5++) {
        var f6 = Q2(n4[0].body[d5], `textord`);
        u4 += f6.text;
      }
      s6 = Number(u4), c4 = s6 * 2;
    }
    var p4 = !c4;
    o5.body.forEach(function(t9) {
      for (var n5 = 1; n5 < t9.length; n5 += 2) Q2(Q2(t9[n5], `styling`).body[0], `ordgroup`).body.unshift(l4);
      if (p4) c4 < t9.length && (c4 = t9.length);
      else {
        var r6 = t9.length / 2;
        if (s6 < r6) throw new e2(`Too many math in a row: ` + (`expected ` + s6 + `, but got ` + r6), t9[0]);
      }
    });
    for (var m5 = 0; m5 < c4; ++m5) {
      var h5 = `r`, g6 = 0;
      m5 % 2 == 1 ? h5 = `l` : m5 > 0 && p4 && (g6 = 1), r5[m5] = { type: `align`, align: h5, pregap: g6, postgap: 0 };
    }
    return o5.colSeparationType = p4 ? `align` : `alignat`, o5;
  };
  ei2({ type: `array`, names: [`array`, `darray`], props: { numArgs: 1 }, handler(t8, n4) {
    var r5 = (Xn2(n4[0]) ? [n4[0]] : Q2(n4[0], `ordgroup`).body).map(function(t9) {
      var n5 = Yn2(t9).text;
      if (`lcr`.includes(n5)) return { type: `align`, align: n5 };
      if (n5 === `|`) return { type: `separator`, separator: `|` };
      if (n5 === `:`) return { type: `separator`, separator: `:` };
      throw new e2(`Unknown column alignment: ` + n5, t9);
    }), i5 = { cols: r5, hskipBeforeAndAfter: true, maxNumCols: r5.length };
    return ci2(t8.parser, i5, li2(t8.envName));
  }, htmlBuilder: ui2, mathmlBuilder: fi2 }), ei2({ type: `array`, names: [`matrix`, `pmatrix`, `bmatrix`, `Bmatrix`, `vmatrix`, `Vmatrix`, `matrix*`, `pmatrix*`, `bmatrix*`, `Bmatrix*`, `vmatrix*`, `Vmatrix*`], props: { numArgs: 0 }, handler(t8) {
    var n4 = { matrix: null, pmatrix: [`(`, `)`], bmatrix: [`[`, `]`], Bmatrix: [`\\{`, `\\}`], vmatrix: [`|`, `|`], Vmatrix: [`\\Vert`, `\\Vert`] }[t8.envName.replace(`*`, ``)], r5 = `c`, i5 = { hskipBeforeAndAfter: false, cols: [{ type: `align`, align: r5 }] };
    if (t8.envName.charAt(t8.envName.length - 1) === `*`) {
      var a5 = t8.parser;
      if (a5.consumeSpaces(), a5.fetch().text === `[`) {
        if (a5.consume(), a5.consumeSpaces(), r5 = a5.fetch().text, !`lcr`.includes(r5)) throw new e2(`Expected l or c or r`, a5.nextToken);
        a5.consume(), a5.consumeSpaces(), a5.expect(`]`), a5.consume(), i5.cols = [{ type: `align`, align: r5 }];
      }
    }
    var o5 = ci2(t8.parser, i5, li2(t8.envName)), s6 = Math.max(0, ...o5.body.map((e10) => e10.length));
    return o5.cols = Array(s6).fill({ type: `align`, align: r5 }), n4 ? { type: `leftright`, mode: t8.mode, body: [o5], left: n4[0], right: n4[1], rightColor: void 0 } : o5;
  }, htmlBuilder: ui2, mathmlBuilder: fi2 }), ei2({ type: `array`, names: [`smallmatrix`], props: { numArgs: 0 }, handler(e10) {
    var t8 = ci2(e10.parser, { arraystretch: 0.5 }, `script`);
    return t8.colSeparationType = `small`, t8;
  }, htmlBuilder: ui2, mathmlBuilder: fi2 }), ei2({ type: `array`, names: [`subarray`], props: { numArgs: 1 }, handler(t8, n4) {
    var r5 = (Xn2(n4[0]) ? [n4[0]] : Q2(n4[0], `ordgroup`).body).map(function(t9) {
      var n5 = Yn2(t9).text;
      if (`lc`.includes(n5)) return { type: `align`, align: n5 };
      throw new e2(`Unknown column alignment: ` + n5, t9);
    });
    if (r5.length > 1) throw new e2(`{subarray} can contain only one column`);
    var i5 = { cols: r5, hskipBeforeAndAfter: false, arraystretch: 0.5 }, a5 = ci2(t8.parser, i5, `script`);
    if (a5.body.length > 0 && a5.body[0].length > 1) throw new e2(`{subarray} can contain only one column`);
    return a5;
  }, htmlBuilder: ui2, mathmlBuilder: fi2 }), ei2({ type: `array`, names: [`cases`, `dcases`, `rcases`, `drcases`], props: { numArgs: 0 }, handler(e10) {
    var t8 = ci2(e10.parser, { arraystretch: 1.2, cols: [{ type: `align`, align: `l`, pregap: 0, postgap: 1 }, { type: `align`, align: `l`, pregap: 0, postgap: 0 }] }, li2(e10.envName));
    return { type: `leftright`, mode: e10.mode, body: [t8], left: e10.envName.includes(`r`) ? `.` : `\\{`, right: e10.envName.includes(`r`) ? `\\}` : `.`, rightColor: void 0 };
  }, htmlBuilder: ui2, mathmlBuilder: fi2 }), ei2({ type: `array`, names: [`align`, `align*`, `aligned`, `split`], props: { numArgs: 0 }, handler: pi2, htmlBuilder: ui2, mathmlBuilder: fi2 }), ei2({ type: `array`, names: [`gathered`, `gather`, `gather*`], props: { numArgs: 0 }, handler(e10) {
    oi2.has(e10.envName) && ai2(e10);
    var t8 = { cols: [{ type: `align`, align: `c` }], addJot: true, colSeparationType: `gather`, autoTag: si2(e10.envName), emptySingleRow: true, leqno: e10.parser.settings.leqno };
    return ci2(e10.parser, t8, `display`);
  }, htmlBuilder: ui2, mathmlBuilder: fi2 }), ei2({ type: `array`, names: [`alignat`, `alignat*`, `alignedat`], props: { numArgs: 1 }, handler: pi2, htmlBuilder: ui2, mathmlBuilder: fi2 }), ei2({ type: `array`, names: [`equation`, `equation*`], props: { numArgs: 0 }, handler(e10) {
    ai2(e10);
    var t8 = { autoTag: si2(e10.envName), emptySingleRow: true, singleRow: true, maxNumCols: 1, leqno: e10.parser.settings.leqno };
    return ci2(e10.parser, t8, `display`);
  }, htmlBuilder: ui2, mathmlBuilder: fi2 }), ei2({ type: `array`, names: [`CD`], props: { numArgs: 0 }, handler(e10) {
    return ai2(e10), ur2(e10.parser);
  }, htmlBuilder: ui2, mathmlBuilder: fi2 }), $2(`\\nonumber`, `\\gdef\\@eqnsw{0}`), $2(`\\notag`, `\\nonumber`), q2({ type: `text`, names: [`\\hline`, `\\hdashline`], props: { numArgs: 0, allowedInText: true, allowedInMath: true }, handler(t8, n4) {
    throw new e2(t8.funcName + ` valid only within array environment`);
  } });
  var mi2 = $r2;
  q2({ type: `environment`, names: [`\\begin`, `\\end`], props: { numArgs: 1, argTypes: [`text`] }, handler(t8, n4) {
    var { parser: r5, funcName: i5 } = t8, a5 = n4[0];
    if (a5.type !== `ordgroup`) throw new e2(`Invalid environment name`, a5);
    for (var o5 = ``, s6 = 0; s6 < a5.body.length; ++s6) o5 += Q2(a5.body[s6], `textord`).text;
    if (i5 === `\\begin`) {
      if (!mi2.hasOwnProperty(o5)) throw new e2(`No such environment: ` + o5, a5);
      var c4 = mi2[o5], { args: l4, optArgs: u4 } = r5.parseArguments(`\\begin{` + o5 + `}`, c4), d5 = { mode: r5.mode, envName: o5, parser: r5 }, f6 = c4.handler(d5, l4, u4);
      r5.expect(`\\end`, false);
      var p4 = r5.nextToken, m5 = Q2(r5.parseFunction(), `environment`);
      if (m5.name !== o5) throw new e2(`Mismatch: \\begin{` + o5 + `} matched by \\end{` + m5.name + `}`, p4);
      return f6;
    }
    return { type: `environment`, mode: r5.mode, name: o5, nameGroup: a5 };
  } });
  var hi2 = (e10, t8) => {
    var n4 = e10.font, r5 = t8.withFont(n4);
    return Y2(e10.body, r5);
  };
  var gi = (e10, t8) => {
    var n4 = e10.font, r5 = t8.withFont(n4);
    return Z2(e10.body, r5);
  };
  var _i = { "\\Bbb": `\\mathbb`, "\\bold": `\\mathbf`, "\\frak": `\\mathfrak` };
  q2({ type: `font`, names: [`\\mathrm`, `\\mathit`, `\\mathbf`, `\\mathnormal`, `\\mathsfit`, `\\mathbb`, `\\mathcal`, `\\mathfrak`, `\\mathscr`, `\\mathsf`, `\\mathtt`, `\\Bbb`, `\\bold`, `\\frak`], props: { numArgs: 1, allowedInArgument: true }, handler: (e10, t8) => {
    var { parser: n4, funcName: r5 } = e10, i5 = on(t8[0]), a5 = r5;
    return a5 in _i && (a5 = _i[a5]), { type: `font`, mode: n4.mode, font: a5.slice(1), body: i5 };
  }, htmlBuilder: hi2, mathmlBuilder: gi }), q2({ type: `mclass`, names: [`\\boldsymbol`, `\\bm`], props: { numArgs: 1 }, handler: (e10, t8) => {
    var { parser: n4 } = e10, r5 = t8[0];
    return { type: `mclass`, mode: n4.mode, mclass: ir2(r5), body: [{ type: `font`, mode: n4.mode, font: `boldsymbol`, body: r5 }], isCharacterBox: c2(r5) };
  } }), q2({ type: `font`, names: [`\\rm`, `\\sf`, `\\tt`, `\\bf`, `\\it`, `\\cal`], props: { numArgs: 0, allowedInText: true }, handler: (e10, t8) => {
    var { parser: n4, funcName: r5, breakOnTokenText: i5 } = e10, { mode: a5 } = n4, o5 = n4.parseExpression(true, i5);
    return { type: `font`, mode: a5, font: `math` + r5.slice(1), body: { type: `ordgroup`, mode: n4.mode, body: o5 } };
  }, htmlBuilder: hi2, mathmlBuilder: gi });
  var vi2 = (e10, t8) => {
    var n4 = t8.style, r5 = n4.fracNum(), i5 = n4.fracDen(), a5 = t8.havingStyle(r5), o5 = Y2(e10.numer, a5, t8);
    if (e10.continued) {
      var s6 = 8.5 / t8.fontMetrics().ptPerEm, c4 = 3.5 / t8.fontMetrics().ptPerEm;
      o5.height = o5.height < s6 ? s6 : o5.height, o5.depth = o5.depth < c4 ? c4 : o5.depth;
    }
    a5 = t8.havingStyle(i5);
    var l4 = Y2(e10.denom, a5, t8), u4, d5, f6;
    e10.hasBarLine ? (e10.barSize ? (d5 = O2(e10.barSize, t8), u4 = Vt2(`frac-line`, t8, d5)) : u4 = Vt2(`frac-line`, t8), d5 = u4.height, f6 = u4.height) : (u4 = null, d5 = 0, f6 = t8.fontMetrics().defaultRuleThickness);
    var p4, m5, h5;
    n4.size === E2.DISPLAY.size ? (p4 = t8.fontMetrics().num1, m5 = d5 > 0 ? 3 * f6 : 7 * f6, h5 = t8.fontMetrics().denom1) : (d5 > 0 ? (p4 = t8.fontMetrics().num2, m5 = f6) : (p4 = t8.fontMetrics().num3, m5 = 3 * f6), h5 = t8.fontMetrics().denom2);
    var g6;
    if (u4) {
      var _6 = t8.fontMetrics().axisHeight;
      p4 - o5.depth - (_6 + 0.5 * d5) < m5 && (p4 += m5 - (p4 - o5.depth - (_6 + 0.5 * d5))), _6 - 0.5 * d5 - (l4.height - h5) < m5 && (h5 += m5 - (_6 - 0.5 * d5 - (l4.height - h5)));
      var v7 = -(_6 - 0.5 * d5);
      g6 = G2({ positionType: `individualShift`, children: [{ type: `elem`, elem: l4, shift: h5 }, { type: `elem`, elem: u4, shift: v7 }, { type: `elem`, elem: o5, shift: -p4 }] });
    } else {
      var y7 = p4 - o5.depth - (l4.height - h5);
      y7 < m5 && (p4 += 0.5 * (m5 - y7), h5 += 0.5 * (m5 - y7)), g6 = G2({ positionType: `individualShift`, children: [{ type: `elem`, elem: l4, shift: h5 }, { type: `elem`, elem: o5, shift: -p4 }] });
    }
    a5 = t8.havingStyle(n4), g6.height *= a5.sizeMultiplier / t8.sizeMultiplier, g6.depth *= a5.sizeMultiplier / t8.sizeMultiplier;
    var b6 = n4.size === E2.DISPLAY.size ? t8.fontMetrics().delim1 : n4.size === E2.SCRIPTSCRIPT.size ? t8.havingStyle(E2.SCRIPT).fontMetrics().delim2 : t8.fontMetrics().delim2, x5 = e10.leftDelim == null ? gn2(t8, [`mopen`]) : Wr(e10.leftDelim, b6, true, t8.havingStyle(n4), e10.mode, [`mopen`]), S5 = e10.continued ? W2([]) : e10.rightDelim == null ? gn2(t8, [`mclose`]) : Wr(e10.rightDelim, b6, true, t8.havingStyle(n4), e10.mode, [`mclose`]);
    return W2([`mord`].concat(a5.sizingClasses(t8)), [x5, W2([`mfrac`], [g6]), S5], t8);
  };
  var yi = (e10, t8) => {
    var n4 = new X2(`mfrac`, [Z2(e10.numer, t8), Z2(e10.denom, t8)]);
    if (!e10.hasBarLine) n4.setAttribute(`linethickness`, `0px`);
    else if (e10.barSize) {
      var r5 = O2(e10.barSize, t8);
      n4.setAttribute(`linethickness`, k2(r5));
    }
    if (e10.leftDelim != null || e10.rightDelim != null) {
      var i5 = [];
      if (e10.leftDelim != null) {
        var a5 = new X2(`mo`, [new bn2(e10.leftDelim.replace(`\\`, ``))]);
        a5.setAttribute(`fence`, `true`), i5.push(a5);
      }
      if (i5.push(n4), e10.rightDelim != null) {
        var o5 = new X2(`mo`, [new bn2(e10.rightDelim.replace(`\\`, ``))]);
        o5.setAttribute(`fence`, `true`), i5.push(o5);
      }
      return Tn2(i5);
    }
    return n4;
  };
  var bi = (e10, t8) => t8 ? { type: `styling`, mode: e10.mode, style: t8, body: [e10] } : e10;
  q2({ type: `genfrac`, names: [`\\cfrac`, `\\dfrac`, `\\frac`, `\\tfrac`, `\\dbinom`, `\\binom`, `\\tbinom`, `\\\\atopfrac`, `\\\\bracefrac`, `\\\\brackfrac`], props: { numArgs: 2, allowedInArgument: true }, handler: (e10, t8) => {
    var { parser: n4, funcName: r5 } = e10, i5 = t8[0], a5 = t8[1], o5, s6 = null, c4 = null;
    switch (r5) {
      case `\\cfrac`:
      case `\\dfrac`:
      case `\\frac`:
      case `\\tfrac`:
        o5 = true;
        break;
      case `\\\\atopfrac`:
        o5 = false;
        break;
      case `\\dbinom`:
      case `\\binom`:
      case `\\tbinom`:
        o5 = false, s6 = `(`, c4 = `)`;
        break;
      case `\\\\bracefrac`:
        o5 = false, s6 = `\\{`, c4 = `\\}`;
        break;
      case `\\\\brackfrac`:
        o5 = false, s6 = `[`, c4 = `]`;
        break;
      default:
        throw Error(`Unrecognized genfrac command`);
    }
    var l4 = r5 === `\\cfrac`, u4 = null;
    return l4 || r5.startsWith(`\\d`) ? u4 = `display` : r5.startsWith(`\\t`) && (u4 = `text`), bi({ type: `genfrac`, mode: n4.mode, numer: i5, denom: a5, continued: l4, hasBarLine: o5, leftDelim: s6, rightDelim: c4, barSize: null }, u4);
  }, htmlBuilder: vi2, mathmlBuilder: yi }), q2({ type: `infix`, names: [`\\over`, `\\choose`, `\\atop`, `\\brace`, `\\brack`], props: { numArgs: 0, infix: true }, handler(e10) {
    var { parser: t8, funcName: n4, token: r5 } = e10, i5;
    switch (n4) {
      case `\\over`:
        i5 = `\\frac`;
        break;
      case `\\choose`:
        i5 = `\\binom`;
        break;
      case `\\atop`:
        i5 = `\\\\atopfrac`;
        break;
      case `\\brace`:
        i5 = `\\\\bracefrac`;
        break;
      case `\\brack`:
        i5 = `\\\\brackfrac`;
        break;
      default:
        throw Error(`Unrecognized infix genfrac command`);
    }
    return { type: `infix`, mode: t8.mode, replaceWith: i5, token: r5 };
  } });
  var xi = [`display`, `text`, `script`, `scriptscript`];
  var Si2 = function(e10) {
    var t8 = null;
    return e10.length > 0 && (t8 = e10, t8 = t8 === `.` ? null : t8), t8;
  };
  q2({ type: `genfrac`, names: [`\\genfrac`], props: { numArgs: 6, allowedInArgument: true, argTypes: [`math`, `math`, `size`, `text`, `math`, `math`] }, handler(e10, t8) {
    var { parser: n4 } = e10, r5 = t8[4], i5 = t8[5], a5 = on(t8[0]), o5 = a5.type === `atom` && a5.family === `open` ? Si2(a5.text) : null, s6 = on(t8[1]), c4 = s6.type === `atom` && s6.family === `close` ? Si2(s6.text) : null, l4 = Q2(t8[2], `size`), u4, d5 = null;
    l4.isBlank ? u4 = true : (d5 = l4.value, u4 = d5.number > 0);
    var f6 = null, p4 = t8[3];
    if (p4.type === `ordgroup`) {
      if (p4.body.length > 0) {
        var m5 = Q2(p4.body[0], `textord`);
        f6 = xi[Number(m5.text)];
      }
    } else p4 = Q2(p4, `textord`), f6 = xi[Number(p4.text)];
    return bi({ type: `genfrac`, mode: n4.mode, numer: r5, denom: i5, continued: false, hasBarLine: u4, barSize: d5, leftDelim: o5, rightDelim: c4 }, f6);
  } }), q2({ type: `infix`, names: [`\\above`], props: { numArgs: 1, argTypes: [`size`], infix: true }, handler(e10, t8) {
    var { parser: n4, funcName: r5, token: i5 } = e10;
    return { type: `infix`, mode: n4.mode, replaceWith: `\\\\abovefrac`, size: Q2(t8[0], `size`).value, token: i5 };
  } }), q2({ type: `genfrac`, names: [`\\\\abovefrac`], props: { numArgs: 3, argTypes: [`math`, `size`, `math`] }, handler: (e10, t8) => {
    var { parser: n4, funcName: r5 } = e10, i5 = t8[0], a5 = Q2(t8[1], `infix`).size;
    if (!a5) throw Error(`\\\\abovefrac expected size, but got ` + String(a5));
    var o5 = t8[2], s6 = a5.number > 0;
    return { type: `genfrac`, mode: n4.mode, numer: i5, denom: o5, continued: false, hasBarLine: s6, barSize: a5, leftDelim: null, rightDelim: null };
  } });
  var Ci = (e10, t8) => {
    var n4 = t8.style, r5, i5;
    e10.type === `supsub` ? (r5 = e10.sup ? Y2(e10.sup, t8.havingStyle(n4.sup()), t8) : Y2(e10.sub, t8.havingStyle(n4.sub()), t8), i5 = Q2(e10.base, `horizBrace`)) : i5 = Q2(e10, `horizBrace`);
    var a5 = Y2(i5.base, t8.havingBaseStyle(E2.DISPLAY)), o5 = Wn2(i5, t8), s6 = i5.isOver ? G2({ positionType: `firstBaseline`, children: [{ type: `elem`, elem: a5 }, { type: `kern`, size: 0.1 }, { type: `elem`, elem: o5, wrapperClasses: [`svg-align`] }] }) : G2({ positionType: `bottom`, positionData: a5.depth + 0.1 + o5.height, children: [{ type: `elem`, elem: o5, wrapperClasses: [`svg-align`] }, { type: `kern`, size: 0.1 }, { type: `elem`, elem: a5 }] });
    if (r5) {
      var c4 = W2([`minner`, i5.isOver ? `mover` : `munder`], [s6], t8);
      s6 = i5.isOver ? G2({ positionType: `firstBaseline`, children: [{ type: `elem`, elem: c4 }, { type: `kern`, size: 0.2 }, { type: `elem`, elem: r5 }] }) : G2({ positionType: `bottom`, positionData: c4.depth + 0.2 + r5.height + r5.depth, children: [{ type: `elem`, elem: r5 }, { type: `kern`, size: 0.2 }, { type: `elem`, elem: c4 }] });
    }
    return W2([`minner`, i5.isOver ? `mover` : `munder`], [s6], t8);
  };
  q2({ type: `horizBrace`, names: [`\\overbrace`, `\\underbrace`, `\\overbracket`, `\\underbracket`], props: { numArgs: 1 }, handler(e10, t8) {
    var { parser: n4, funcName: r5 } = e10;
    return { type: `horizBrace`, mode: n4.mode, label: r5, isOver: r5.includes(`\\over`), base: t8[0] };
  }, htmlBuilder: Ci, mathmlBuilder: (e10, t8) => {
    var n4 = Vn2(e10.label);
    return new X2(e10.isOver ? `mover` : `munder`, [Z2(e10.base, t8), n4]);
  } }), q2({ type: `href`, names: [`\\href`], props: { numArgs: 2, argTypes: [`url`, `original`], allowedInText: true }, handler: (e10, t8) => {
    var { parser: n4 } = e10, r5 = t8[1], i5 = Q2(t8[0], `url`).url;
    return n4.settings.isTrusted({ command: `\\href`, url: i5 }) ? { type: `href`, mode: n4.mode, href: i5, body: J2(r5) } : n4.formatUnsupportedCmd(`\\href`);
  }, htmlBuilder: (e10, t8) => {
    var n4 = dn2(e10.body, t8, false);
    return Ht2(e10.href, [], n4, t8);
  }, mathmlBuilder: (e10, t8) => {
    var n4 = An2(e10.body, t8);
    return n4 instanceof X2 || (n4 = new X2(`mrow`, [n4])), n4.setAttribute(`href`, e10.href), n4;
  } }), q2({ type: `href`, names: [`\\url`], props: { numArgs: 1, argTypes: [`url`], allowedInText: true }, handler: (e10, t8) => {
    var { parser: n4 } = e10, r5 = Q2(t8[0], `url`).url;
    if (!n4.settings.isTrusted({ command: `\\url`, url: r5 })) return n4.formatUnsupportedCmd(`\\url`);
    for (var i5 = [], a5 = 0; a5 < r5.length; a5++) {
      var o5 = r5[a5];
      o5 === `~` && (o5 = `\\textasciitilde`), i5.push({ type: `textord`, mode: `text`, text: o5 });
    }
    var s6 = { type: `text`, mode: n4.mode, font: `\\texttt`, body: i5 };
    return { type: `href`, mode: n4.mode, href: r5, body: J2(s6) };
  } }), q2({ type: `hbox`, names: [`\\hbox`], props: { numArgs: 1, argTypes: [`text`], allowedInText: true, primitive: true }, handler(e10, t8) {
    var { parser: n4 } = e10;
    return { type: `hbox`, mode: n4.mode, body: J2(t8[0]) };
  }, htmlBuilder(e10, t8) {
    return Ut2(dn2(e10.body, t8.withFont(``), false));
  }, mathmlBuilder(e10, t8) {
    return new X2(`mrow`, kn2(e10.body, t8.withFont(``)));
  } }), q2({ type: `html`, names: [`\\htmlClass`, `\\htmlId`, `\\htmlStyle`, `\\htmlData`], props: { numArgs: 2, argTypes: [`raw`, `original`], allowedInText: true }, handler: (t8, n4) => {
    var { parser: r5, funcName: i5, token: a5 } = t8, o5 = Q2(n4[0], `raw`).string, s6 = n4[1];
    r5.settings.strict && r5.settings.reportNonstrict(`htmlExtension`, `HTML extension is disabled on strict mode`);
    var c4, l4 = {};
    switch (i5) {
      case `\\htmlClass`:
        l4.class = o5, c4 = { command: `\\htmlClass`, class: o5 };
        break;
      case `\\htmlId`:
        l4.id = o5, c4 = { command: `\\htmlId`, id: o5 };
        break;
      case `\\htmlStyle`:
        l4.style = o5, c4 = { command: `\\htmlStyle`, style: o5 };
        break;
      case `\\htmlData`:
        for (var u4 = o5.split(`,`), d5 = 0; d5 < u4.length; d5++) {
          var f6 = u4[d5], p4 = f6.indexOf(`=`);
          if (p4 < 0) throw new e2(`\\htmlData key/value '` + f6 + `' missing equals sign`);
          var m5 = f6.slice(0, p4), h5 = f6.slice(p4 + 1);
          l4[`data-` + m5.trim()] = h5;
        }
        c4 = { command: `\\htmlData`, attributes: l4 };
        break;
      default:
        throw Error(`Unrecognized html command`);
    }
    return r5.settings.isTrusted(c4) ? { type: `html`, mode: r5.mode, attributes: l4, body: J2(s6) } : r5.formatUnsupportedCmd(i5);
  }, htmlBuilder: (e10, t8) => {
    var n4 = dn2(e10.body, t8, false), r5 = [`enclosing`];
    e10.attributes.class && r5.push(...e10.attributes.class.trim().split(/\s+/));
    var i5 = W2(r5, n4, t8);
    for (var a5 in e10.attributes) a5 !== `class` && e10.attributes.hasOwnProperty(a5) && i5.setAttribute(a5, e10.attributes[a5]);
    return i5;
  }, mathmlBuilder: (e10, t8) => An2(e10.body, t8) }), q2({ type: `htmlmathml`, names: [`\\html@mathml`], props: { numArgs: 2, allowedInArgument: true, allowedInText: true }, handler: (e10, t8) => {
    var { parser: n4 } = e10;
    return { type: `htmlmathml`, mode: n4.mode, html: J2(t8[0]), mathml: J2(t8[1]) };
  }, htmlBuilder: (e10, t8) => Ut2(dn2(e10.html, t8, false)), mathmlBuilder: (e10, t8) => An2(e10.mathml, t8) });
  var wi2 = function(t8) {
    if (/^[-+]? *(\d+(\.\d*)?|\.\d+)$/.test(t8)) return { number: +t8, unit: `bp` };
    var n4 = /([-+]?) *(\d+(?:\.\d*)?|\.\d+) *([a-z]{2})/.exec(t8);
    if (!n4) throw new e2(`Invalid size: '` + t8 + `' in \\includegraphics`);
    var r5 = { number: +(n4[1] + n4[2]), unit: n4[3] };
    if (!Te2(r5)) throw new e2(`Invalid unit: '` + r5.unit + `' in \\includegraphics.`);
    return r5;
  };
  q2({ type: `includegraphics`, names: [`\\includegraphics`], props: { numArgs: 1, numOptionalArgs: 1, argTypes: [`raw`, `url`], allowedInText: false }, handler: (t8, n4, r5) => {
    var { parser: i5 } = t8, a5 = { number: 0, unit: `em` }, o5 = { number: 0.9, unit: `em` }, s6 = { number: 0, unit: `em` }, c4 = ``;
    if (r5[0]) for (var l4 = Q2(r5[0], `raw`).string.split(`,`), u4 = 0; u4 < l4.length; u4++) {
      var d5 = l4[u4].split(`=`);
      if (d5.length === 2) {
        var f6 = d5[1].trim();
        switch (d5[0].trim()) {
          case `alt`:
            c4 = f6;
            break;
          case `width`:
            a5 = wi2(f6);
            break;
          case `height`:
            o5 = wi2(f6);
            break;
          case `totalheight`:
            s6 = wi2(f6);
            break;
          default:
            throw new e2(`Invalid key: '` + d5[0] + `' in \\includegraphics.`);
        }
      }
    }
    var p4 = Q2(n4[0], `url`).url;
    return c4 === `` && (c4 = p4, c4 = c4.replace(/^.*[\\/]/, ``), c4 = c4.substring(0, c4.lastIndexOf(`.`))), i5.settings.isTrusted({ command: `\\includegraphics`, url: p4 }) ? { type: `includegraphics`, mode: i5.mode, alt: c4, width: a5, height: o5, totalheight: s6, src: p4 } : i5.formatUnsupportedCmd(`\\includegraphics`);
  }, htmlBuilder: (e10, t8) => {
    var n4 = O2(e10.height, t8), r5 = 0;
    e10.totalheight.number > 0 && (r5 = O2(e10.totalheight, t8) - n4);
    var i5 = 0;
    e10.width.number > 0 && (i5 = O2(e10.width, t8));
    var a5 = { height: k2(n4 + r5) };
    i5 > 0 && (a5.width = k2(i5)), r5 > 0 && (a5.verticalAlign = k2(-r5));
    var o5 = new Pe2(e10.src, e10.alt, a5);
    return o5.height = n4, o5.depth = r5, o5;
  }, mathmlBuilder: (e10, t8) => {
    var n4 = new X2(`mglyph`, []);
    n4.setAttribute(`alt`, e10.alt);
    var r5 = O2(e10.height, t8), i5 = 0;
    if (e10.totalheight.number > 0 && (i5 = O2(e10.totalheight, t8) - r5, n4.setAttribute(`valign`, k2(-i5))), n4.setAttribute(`height`, k2(r5 + i5)), e10.width.number > 0) {
      var a5 = O2(e10.width, t8);
      n4.setAttribute(`width`, k2(a5));
    }
    return n4.setAttribute(`src`, e10.src), n4;
  } }), q2({ type: `kern`, names: [`\\kern`, `\\mkern`, `\\hskip`, `\\mskip`], props: { numArgs: 1, argTypes: [`size`], primitive: true, allowedInText: true }, handler(e10, t8) {
    var { parser: n4, funcName: r5 } = e10, i5 = Q2(t8[0], `size`);
    if (n4.settings.strict) {
      var a5 = r5[1] === `m`, o5 = i5.value.unit === `mu`;
      a5 ? (o5 || n4.settings.reportNonstrict(`mathVsTextUnits`, `LaTeX's ` + r5 + ` supports only mu units, ` + (`not ` + i5.value.unit + ` units`)), n4.mode !== `math` && n4.settings.reportNonstrict(`mathVsTextUnits`, `LaTeX's ` + r5 + ` works only in math mode`)) : o5 && n4.settings.reportNonstrict(`mathVsTextUnits`, `LaTeX's ` + r5 + ` doesn't support mu units`);
    }
    return { type: `kern`, mode: n4.mode, dimension: i5.value };
  }, htmlBuilder(e10, t8) {
    return Kt(e10.dimension, t8);
  }, mathmlBuilder(e10, t8) {
    return new xn2(O2(e10.dimension, t8));
  } }), q2({ type: `lap`, names: [`\\mathllap`, `\\mathrlap`, `\\mathclap`], props: { numArgs: 1, allowedInText: true }, handler: (e10, t8) => {
    var { parser: n4, funcName: r5 } = e10, i5 = t8[0];
    return { type: `lap`, mode: n4.mode, alignment: r5.slice(5), body: i5 };
  }, htmlBuilder: (e10, t8) => {
    var n4;
    e10.alignment === `clap` ? (n4 = W2([], [Y2(e10.body, t8)]), n4 = W2([`inner`], [n4], t8)) : n4 = W2([`inner`], [Y2(e10.body, t8)]);
    var r5 = W2([`fix`], []), i5 = W2([e10.alignment], [n4, r5], t8), a5 = W2([`strut`]);
    return a5.style.height = k2(i5.height + i5.depth), i5.depth && (a5.style.verticalAlign = k2(-i5.depth)), i5.children.unshift(a5), i5 = W2([`thinbox`], [i5], t8), W2([`mord`, `vbox`], [i5], t8);
  }, mathmlBuilder: (e10, t8) => {
    var n4 = new X2(`mpadded`, [Z2(e10.body, t8)]);
    if (e10.alignment !== `rlap`) {
      var r5 = e10.alignment === `llap` ? `-1` : `-0.5`;
      n4.setAttribute(`lspace`, r5 + `width`);
    }
    return n4.setAttribute(`width`, `0px`), n4;
  } }), q2({ type: `styling`, names: [`\\(`, `$`], props: { numArgs: 0, allowedInText: true, allowedInMath: false }, handler(e10, t8) {
    var { funcName: n4, parser: r5 } = e10, i5 = r5.mode;
    r5.switchMode(`math`);
    var a5 = n4 === `\\(` ? `\\)` : `$`, o5 = r5.parseExpression(false, a5);
    return r5.expect(a5), r5.switchMode(i5), { type: `styling`, mode: r5.mode, style: `text`, resetFont: true, body: o5 };
  } }), q2({ type: `text`, names: [`\\)`, `\\]`], props: { numArgs: 0, allowedInText: true, allowedInMath: false }, handler(t8, n4) {
    throw new e2(`Mismatched ` + t8.funcName);
  } });
  var Ti2 = (e10, t8) => {
    switch (t8.style.size) {
      case E2.DISPLAY.size:
        return e10.display;
      case E2.TEXT.size:
        return e10.text;
      case E2.SCRIPT.size:
        return e10.script;
      case E2.SCRIPTSCRIPT.size:
        return e10.scriptscript;
      default:
        return e10.text;
    }
  };
  q2({ type: `mathchoice`, names: [`\\mathchoice`], props: { numArgs: 4, primitive: true }, handler: (e10, t8) => {
    var { parser: n4 } = e10;
    return { type: `mathchoice`, mode: n4.mode, display: J2(t8[0]), text: J2(t8[1]), script: J2(t8[2]), scriptscript: J2(t8[3]) };
  }, htmlBuilder: (e10, t8) => Ut2(dn2(Ti2(e10, t8), t8, false)), mathmlBuilder: (e10, t8) => An2(Ti2(e10, t8), t8) });
  var Ei2 = (e10, t8, n4, r5, i5, a5, o5) => {
    e10 = W2([], [e10]);
    var s6 = n4 && c2(n4), l4, u4;
    if (t8) {
      var d5 = Y2(t8, r5.havingStyle(i5.sup()), r5);
      u4 = { elem: d5, kern: Math.max(r5.fontMetrics().bigOpSpacing1, r5.fontMetrics().bigOpSpacing3 - d5.depth) };
    }
    if (n4) {
      var f6 = Y2(n4, r5.havingStyle(i5.sub()), r5);
      l4 = { elem: f6, kern: Math.max(r5.fontMetrics().bigOpSpacing2, r5.fontMetrics().bigOpSpacing4 - f6.height) };
    }
    var p4;
    if (u4 && l4) p4 = G2({ positionType: `bottom`, positionData: r5.fontMetrics().bigOpSpacing5 + l4.elem.height + l4.elem.depth + l4.kern + e10.depth + o5, children: [{ type: `kern`, size: r5.fontMetrics().bigOpSpacing5 }, { type: `elem`, elem: l4.elem, marginLeft: k2(-a5) }, { type: `kern`, size: l4.kern }, { type: `elem`, elem: e10 }, { type: `kern`, size: u4.kern }, { type: `elem`, elem: u4.elem, marginLeft: k2(a5) }, { type: `kern`, size: r5.fontMetrics().bigOpSpacing5 }] });
    else if (l4) p4 = G2({ positionType: `top`, positionData: e10.height - o5, children: [{ type: `kern`, size: r5.fontMetrics().bigOpSpacing5 }, { type: `elem`, elem: l4.elem, marginLeft: k2(-a5) }, { type: `kern`, size: l4.kern }, { type: `elem`, elem: e10 }] });
    else if (u4) p4 = G2({ positionType: `bottom`, positionData: e10.depth + o5, children: [{ type: `elem`, elem: e10 }, { type: `kern`, size: u4.kern }, { type: `elem`, elem: u4.elem, marginLeft: k2(a5) }, { type: `kern`, size: r5.fontMetrics().bigOpSpacing5 }] });
    else return e10;
    var m5 = [p4];
    if (l4 && a5 !== 0 && !s6) {
      var h5 = W2([`mspace`], [], r5);
      h5.style.marginRight = k2(a5), m5.unshift(h5);
    }
    return W2([`mop`, `op-limits`], m5, r5);
  };
  var Di2 = /* @__PURE__ */ new Set([`\\smallint`]);
  var Oi2 = (e10, t8) => {
    var n4, r5, i5 = false, a5;
    e10.type === `supsub` ? (n4 = e10.sup, r5 = e10.sub, a5 = Q2(e10.base, `op`), i5 = true) : a5 = Q2(e10, `op`);
    var o5 = t8.style, s6 = false;
    o5.size === E2.DISPLAY.size && a5.symbol && !Di2.has(a5.name) && (s6 = true);
    var c4, l4;
    if (a5.symbol) {
      var u4 = s6 ? `Size2-Regular` : `Size1-Regular`, d5 = ``;
      if ((a5.name === `\\oiint` || a5.name === `\\oiiint`) && (d5 = a5.name.slice(1), a5.name = d5 === `oiint` ? `\\iint` : `\\iiint`), c4 = Nt2(a5.name, u4, `math`, t8, [`mop`, `op-symbol`, s6 ? `large-op` : `small-op`]), l4 = c4.italic, d5.length > 0) {
        var f6 = Xt(d5 + `Size` + (s6 ? `2` : `1`), t8);
        c4 = G2({ positionType: `individualShift`, children: [{ type: `elem`, elem: c4, shift: 0 }, { type: `elem`, elem: f6, shift: s6 ? 0.08 : 0 }] }), a5.name = `\\` + d5, c4.classes.unshift(`mop`), c4.italic = l4;
      }
    } else if (a5.body) {
      var p4 = dn2(a5.body, t8, true);
      p4.length === 1 && p4[0] instanceof Ie2 ? (c4 = p4[0], c4.classes[0] = `mop`) : c4 = W2([`mop`], p4, t8);
    } else {
      for (var m5 = [], h5 = 1; h5 < a5.name.length; h5++) m5.push(Pt2(a5.name[h5], a5.mode, t8));
      c4 = W2([`mop`], m5, t8);
    }
    var g6 = 0, _6 = 0;
    return (c4 instanceof Ie2 || a5.name === `\\oiint` || a5.name === `\\oiiint`) && !a5.suppressBaseShift && (g6 = (c4.height - c4.depth) / 2 - t8.fontMetrics().axisHeight, _6 = c4.italic ?? 0), i5 ? Ei2(c4, n4, r5, t8, o5, _6, g6) : (g6 && (c4.style.position = `relative`, c4.style.top = k2(g6)), c4);
  };
  var ki2 = (e10, t8) => {
    var n4;
    if (e10.symbol) n4 = new X2(`mo`, [wn2(e10.name, e10.mode)]), Di2.has(e10.name) && n4.setAttribute(`largeop`, `false`);
    else if (e10.body) n4 = new X2(`mo`, kn2(e10.body, t8));
    else {
      n4 = new X2(`mi`, [new bn2(e10.name.slice(1))]);
      var r5 = new X2(`mo`, [wn2(`\u2061`, `text`)]);
      n4 = e10.parentIsSupSub ? new X2(`mrow`, [n4, r5]) : yn2([n4, r5]);
    }
    return n4;
  };
  var Ai2 = { "\u220F": `\\prod`, "\u2210": `\\coprod`, "\u2211": `\\sum`, "\u22C0": `\\bigwedge`, "\u22C1": `\\bigvee`, "\u22C2": `\\bigcap`, "\u22C3": `\\bigcup`, "\u2A00": `\\bigodot`, "\u2A01": `\\bigoplus`, "\u2A02": `\\bigotimes`, "\u2A04": `\\biguplus`, "\u2A06": `\\bigsqcup` };
  q2({ type: `op`, names: `\\coprod.\\bigvee.\\bigwedge.\\biguplus.\\bigcap.\\bigcup.\\intop.\\prod.\\sum.\\bigotimes.\\bigoplus.\\bigodot.\\bigsqcup.\\smallint.\u220F.\u2210.\u2211.\u22C0.\u22C1.\u22C2.\u22C3.\u2A00.\u2A01.\u2A02.\u2A04.\u2A06`.split(`.`), props: { numArgs: 0 }, handler: (e10, t8) => {
    var { parser: n4, funcName: r5 } = e10, i5 = r5;
    return i5.length === 1 && (i5 = Ai2[i5]), { type: `op`, mode: n4.mode, limits: true, parentIsSupSub: false, symbol: true, name: i5 };
  }, htmlBuilder: Oi2, mathmlBuilder: ki2 }), q2({ type: `op`, names: [`\\mathop`], props: { numArgs: 1, primitive: true }, handler: (e10, t8) => {
    var { parser: n4 } = e10, r5 = t8[0];
    return { type: `op`, mode: n4.mode, limits: false, parentIsSupSub: false, symbol: false, body: J2(r5) };
  }, htmlBuilder: Oi2, mathmlBuilder: ki2 });
  var ji2 = { "\u222B": `\\int`, "\u222C": `\\iint`, "\u222D": `\\iiint`, "\u222E": `\\oint`, "\u222F": `\\oiint`, "\u2230": `\\oiiint` };
  q2({ type: `op`, names: `\\arcsin.\\arccos.\\arctan.\\arctg.\\arcctg.\\arg.\\ch.\\cos.\\cosec.\\cosh.\\cot.\\cotg.\\coth.\\csc.\\ctg.\\cth.\\deg.\\dim.\\exp.\\hom.\\ker.\\lg.\\ln.\\log.\\sec.\\sin.\\sinh.\\sh.\\tan.\\tanh.\\tg.\\th`.split(`.`), props: { numArgs: 0 }, handler(e10) {
    var { parser: t8, funcName: n4 } = e10;
    return { type: `op`, mode: t8.mode, limits: false, parentIsSupSub: false, symbol: false, name: n4 };
  }, htmlBuilder: Oi2, mathmlBuilder: ki2 }), q2({ type: `op`, names: [`\\det`, `\\gcd`, `\\inf`, `\\lim`, `\\max`, `\\min`, `\\Pr`, `\\sup`], props: { numArgs: 0 }, handler(e10) {
    var { parser: t8, funcName: n4 } = e10;
    return { type: `op`, mode: t8.mode, limits: true, parentIsSupSub: false, symbol: false, name: n4 };
  }, htmlBuilder: Oi2, mathmlBuilder: ki2 }), q2({ type: `op`, names: [`\\int`, `\\iint`, `\\iiint`, `\\oint`, `\\oiint`, `\\oiiint`, `\u222B`, `\u222C`, `\u222D`, `\u222E`, `\u222F`, `\u2230`], props: { numArgs: 0, allowedInArgument: true }, handler(e10) {
    var { parser: t8, funcName: n4 } = e10, r5 = n4;
    return r5.length === 1 && (r5 = ji2[r5]), { type: `op`, mode: t8.mode, limits: false, parentIsSupSub: false, symbol: true, name: r5 };
  }, htmlBuilder: Oi2, mathmlBuilder: ki2 });
  var Mi = (e10, t8) => {
    var n4, r5, i5 = false, a5;
    e10.type === `supsub` ? (n4 = e10.sup, r5 = e10.sub, a5 = Q2(e10.base, `operatorname`), i5 = true) : a5 = Q2(e10, `operatorname`);
    var o5;
    if (a5.body.length > 0) {
      for (var s6 = dn2(a5.body.map((e11) => {
        var t9 = `text` in e11 ? e11.text : void 0;
        return typeof t9 == `string` ? { type: `textord`, mode: e11.mode, text: t9 } : e11;
      }), t8.withFont(`mathrm`), true), c4 = 0; c4 < s6.length; c4++) {
        var l4 = s6[c4];
        l4 instanceof Ie2 && (l4.text = l4.text.replace(/\u2212/, `-`).replace(/\u2217/, `*`));
      }
      o5 = W2([`mop`], s6, t8);
    } else o5 = W2([`mop`], [], t8);
    return i5 ? Ei2(o5, n4, r5, t8, t8.style, 0, 0) : o5;
  };
  q2({ type: `operatorname`, names: [`\\operatorname@`, `\\operatornamewithlimits`], props: { numArgs: 1 }, handler: (e10, t8) => {
    var { parser: n4, funcName: r5 } = e10, i5 = t8[0];
    return { type: `operatorname`, mode: n4.mode, body: J2(i5), alwaysHandleSupSub: r5 === `\\operatornamewithlimits`, limits: false, parentIsSupSub: false };
  }, htmlBuilder: Mi, mathmlBuilder: (e10, t8) => {
    for (var n4 = kn2(e10.body, t8.withFont(`mathrm`)), r5 = true, i5 = 0; i5 < n4.length; i5++) {
      var a5 = n4[i5];
      if (!(a5 instanceof xn2)) {
        if (a5 instanceof X2) switch (a5.type) {
          case `mi`:
          case `mn`:
          case `mspace`:
          case `mtext`:
            break;
          case `mo`:
            var o5 = a5.children[0];
            a5.children.length === 1 && o5 instanceof bn2 ? o5.text = o5.text.replace(/\u2212/, `-`).replace(/\u2217/, `*`) : r5 = false;
            break;
          default:
            r5 = false;
        }
        else r5 = false;
      }
    }
    r5 && (n4 = [new bn2(n4.map((e11) => e11.toText()).join(``))]);
    var s6 = new X2(`mi`, n4);
    s6.setAttribute(`mathvariant`, `normal`);
    var c4 = new X2(`mo`, [wn2(`\u2061`, `text`)]);
    return e10.parentIsSupSub ? new X2(`mrow`, [s6, c4]) : yn2([s6, c4]);
  } }), $2(`\\operatorname`, `\\@ifstar\\operatornamewithlimits\\operatorname@`), an({ type: `ordgroup`, htmlBuilder(e10, t8) {
    return e10.semisimple ? Ut2(dn2(e10.body, t8, false)) : W2([`mord`], dn2(e10.body, t8, true), t8);
  }, mathmlBuilder(e10, t8) {
    return An2(e10.body, t8, true);
  } }), q2({ type: `overline`, names: [`\\overline`], props: { numArgs: 1 }, handler(e10, t8) {
    var { parser: n4 } = e10, r5 = t8[0];
    return { type: `overline`, mode: n4.mode, body: r5 };
  }, htmlBuilder(e10, t8) {
    var n4 = Y2(e10.body, t8.havingCrampedStyle()), r5 = Vt2(`overline-line`, t8), i5 = t8.fontMetrics().defaultRuleThickness;
    return W2([`mord`, `overline`], [G2({ positionType: `firstBaseline`, children: [{ type: `elem`, elem: n4 }, { type: `kern`, size: 3 * i5 }, { type: `elem`, elem: r5 }, { type: `kern`, size: i5 }] })], t8);
  }, mathmlBuilder(e10, t8) {
    var n4 = new X2(`mo`, [new bn2(`\u203E`)]);
    n4.setAttribute(`stretchy`, `true`);
    var r5 = new X2(`mover`, [Z2(e10.body, t8), n4]);
    return r5.setAttribute(`accent`, `true`), r5;
  } }), q2({ type: `phantom`, names: [`\\phantom`], props: { numArgs: 1, allowedInText: true }, handler: (e10, t8) => {
    var { parser: n4 } = e10, r5 = t8[0];
    return { type: `phantom`, mode: n4.mode, body: J2(r5) };
  }, htmlBuilder: (e10, t8) => Ut2(dn2(e10.body, t8.withPhantom(), false)), mathmlBuilder: (e10, t8) => new X2(`mphantom`, kn2(e10.body, t8)) }), $2(`\\hphantom`, `\\smash{\\phantom{#1}}`), q2({ type: `vphantom`, names: [`\\vphantom`], props: { numArgs: 1, allowedInText: true }, handler: (e10, t8) => {
    var { parser: n4 } = e10, r5 = t8[0];
    return { type: `vphantom`, mode: n4.mode, body: r5 };
  }, htmlBuilder: (e10, t8) => W2([`mord`, `rlap`], [W2([`inner`], [Y2(e10.body, t8.withPhantom())]), W2([`fix`], [])], t8), mathmlBuilder: (e10, t8) => {
    var n4 = new X2(`mpadded`, [new X2(`mphantom`, kn2(J2(e10.body), t8))]);
    return n4.setAttribute(`width`, `0px`), n4;
  } }), q2({ type: `raisebox`, names: [`\\raisebox`], props: { numArgs: 2, argTypes: [`size`, `hbox`], allowedInText: true }, handler(e10, t8) {
    var { parser: n4 } = e10, r5 = Q2(t8[0], `size`).value, i5 = t8[1];
    return { type: `raisebox`, mode: n4.mode, dy: r5, body: i5 };
  }, htmlBuilder(e10, t8) {
    var n4 = Y2(e10.body, t8);
    return G2({ positionType: `shift`, positionData: -O2(e10.dy, t8), children: [{ type: `elem`, elem: n4 }] });
  }, mathmlBuilder(e10, t8) {
    var n4 = new X2(`mpadded`, [Z2(e10.body, t8)]), r5 = e10.dy.number + e10.dy.unit;
    return n4.setAttribute(`voffset`, r5), n4;
  } }), q2({ type: `internal`, names: [`\\relax`], props: { numArgs: 0, allowedInText: true, allowedInArgument: true }, handler(e10) {
    var { parser: t8 } = e10;
    return { type: `internal`, mode: t8.mode };
  } }), q2({ type: `rule`, names: [`\\rule`], props: { numArgs: 2, numOptionalArgs: 1, allowedInText: true, allowedInMath: true, argTypes: [`size`, `size`, `size`] }, handler(e10, t8, n4) {
    var { parser: r5 } = e10, i5 = n4[0], a5 = Q2(t8[0], `size`), o5 = Q2(t8[1], `size`);
    return { type: `rule`, mode: r5.mode, shift: i5 && Q2(i5, `size`).value, width: a5.value, height: o5.value };
  }, htmlBuilder(e10, t8) {
    var n4 = W2([`mord`, `rule`], [], t8), r5 = O2(e10.width, t8), i5 = O2(e10.height, t8), a5 = e10.shift ? O2(e10.shift, t8) : 0;
    return n4.style.borderRightWidth = k2(r5), n4.style.borderTopWidth = k2(i5), n4.style.bottom = k2(a5), n4.width = r5, n4.height = i5 + a5, n4.depth = -a5, n4.maxFontSize = i5 * 1.125 * t8.sizeMultiplier, n4;
  }, mathmlBuilder(e10, t8) {
    var n4 = O2(e10.width, t8), r5 = O2(e10.height, t8), i5 = e10.shift ? O2(e10.shift, t8) : 0, a5 = t8.color && t8.getColor() || `black`, o5 = new X2(`mspace`);
    o5.setAttribute(`mathbackground`, a5), o5.setAttribute(`width`, k2(n4)), o5.setAttribute(`height`, k2(r5));
    var s6 = new X2(`mpadded`, [o5]);
    return i5 >= 0 ? s6.setAttribute(`height`, k2(i5)) : (s6.setAttribute(`height`, k2(i5)), s6.setAttribute(`depth`, k2(-i5))), s6.setAttribute(`voffset`, k2(i5)), s6;
  } });
  function Ni2(e10, t8, n4) {
    for (var r5 = dn2(e10, t8, false), i5 = t8.sizeMultiplier / n4.sizeMultiplier, a5 = 0; a5 < r5.length; a5++) {
      var o5 = r5[a5].classes.indexOf(`sizing`);
      o5 < 0 ? Array.prototype.push.apply(r5[a5].classes, t8.sizingClasses(n4)) : r5[a5].classes[o5 + 1] === `reset-size` + t8.size && (r5[a5].classes[o5 + 1] = `reset-size` + n4.size), r5[a5].height *= i5, r5[a5].depth *= i5;
    }
    return Ut2(r5);
  }
  var Pi2 = [`\\tiny`, `\\sixptsize`, `\\scriptsize`, `\\footnotesize`, `\\small`, `\\normalsize`, `\\large`, `\\Large`, `\\LARGE`, `\\huge`, `\\Huge`];
  q2({ type: `sizing`, names: Pi2, props: { numArgs: 0, allowedInText: true }, handler: (e10, t8) => {
    var { breakOnTokenText: n4, funcName: r5, parser: i5 } = e10, a5 = i5.parseExpression(false, n4);
    return { type: `sizing`, mode: i5.mode, size: Pi2.indexOf(r5) + 1, body: a5 };
  }, htmlBuilder: (e10, t8) => {
    var n4 = t8.havingSize(e10.size);
    return Ni2(e10.body, n4, t8);
  }, mathmlBuilder: (e10, t8) => {
    var n4 = t8.havingSize(e10.size), r5 = new X2(`mstyle`, kn2(e10.body, n4));
    return r5.setAttribute(`mathsize`, k2(n4.sizeMultiplier)), r5;
  } }), q2({ type: `smash`, names: [`\\smash`], props: { numArgs: 1, numOptionalArgs: 1, allowedInText: true }, handler: (e10, t8, n4) => {
    var { parser: r5 } = e10, i5 = false, a5 = false, o5 = n4[0] && Q2(n4[0], `ordgroup`);
    if (o5) for (var s6, c4 = 0; c4 < o5.body.length; ++c4) {
      var l4 = o5.body[c4];
      if (s6 = Yn2(l4).text, s6 === `t`) i5 = true;
      else if (s6 === `b`) a5 = true;
      else {
        i5 = false, a5 = false;
        break;
      }
    }
    else i5 = true, a5 = true;
    var u4 = t8[0];
    return { type: `smash`, mode: r5.mode, body: u4, smashHeight: i5, smashDepth: a5 };
  }, htmlBuilder: (e10, t8) => {
    var n4 = W2([], [Y2(e10.body, t8)]);
    if (!e10.smashHeight && !e10.smashDepth) return n4;
    if (e10.smashHeight && (n4.height = 0), e10.smashDepth && (n4.depth = 0), e10.smashHeight && e10.smashDepth) return W2([`mord`, `smash`], [n4], t8);
    if (n4.children) for (var r5 = 0; r5 < n4.children.length; r5++) e10.smashHeight && (n4.children[r5].height = 0), e10.smashDepth && (n4.children[r5].depth = 0);
    return W2([`mord`], [G2({ positionType: `firstBaseline`, children: [{ type: `elem`, elem: n4 }] })], t8);
  }, mathmlBuilder: (e10, t8) => {
    var n4 = new X2(`mpadded`, [Z2(e10.body, t8)]);
    return e10.smashHeight && n4.setAttribute(`height`, `0px`), e10.smashDepth && n4.setAttribute(`depth`, `0px`), n4;
  } }), q2({ type: `sqrt`, names: [`\\sqrt`], props: { numArgs: 1, numOptionalArgs: 1 }, handler(e10, t8, n4) {
    var { parser: r5 } = e10, i5 = n4[0], a5 = t8[0];
    return { type: `sqrt`, mode: r5.mode, body: a5, index: i5 };
  }, htmlBuilder(e10, t8) {
    var n4 = Y2(e10.body, t8.havingCrampedStyle());
    n4.height === 0 && (n4.height = t8.fontMetrics().xHeight), n4 = Wt2(n4, t8);
    var r5 = t8.fontMetrics().defaultRuleThickness, i5 = r5;
    t8.style.id < E2.TEXT.id && (i5 = t8.fontMetrics().xHeight);
    var a5 = r5 + i5 / 4, { span: o5, ruleWidth: s6, advanceWidth: c4 } = Nr(n4.height + n4.depth + a5 + r5, t8), l4 = o5.height - s6;
    l4 > n4.height + n4.depth + a5 && (a5 = (a5 + l4 - n4.height - n4.depth) / 2);
    var u4 = o5.height - n4.height - a5 - s6;
    n4.style.paddingLeft = k2(c4);
    var d5 = G2({ positionType: `firstBaseline`, children: [{ type: `elem`, elem: n4, wrapperClasses: [`svg-align`] }, { type: `kern`, size: -(n4.height + u4) }, { type: `elem`, elem: o5 }, { type: `kern`, size: s6 }] });
    if (e10.index) {
      var f6 = t8.havingStyle(E2.SCRIPTSCRIPT), p4 = Y2(e10.index, f6, t8);
      return W2([`mord`, `sqrt`], [W2([`root`], [G2({ positionType: `shift`, positionData: -(0.6 * (d5.height - d5.depth)), children: [{ type: `elem`, elem: p4 }] })]), d5], t8);
    }
    return W2([`mord`, `sqrt`], [d5], t8);
  }, mathmlBuilder(e10, t8) {
    var { body: n4, index: r5 } = e10;
    return r5 ? new X2(`mroot`, [Z2(n4, t8), Z2(r5, t8)]) : new X2(`msqrt`, [Z2(n4, t8)]);
  } });
  var Fi2 = { display: E2.DISPLAY, text: E2.TEXT, script: E2.SCRIPT, scriptscript: E2.SCRIPTSCRIPT };
  function Ii2(e10) {
    return e10 in Fi2;
  }
  q2({ type: `styling`, names: [`\\displaystyle`, `\\textstyle`, `\\scriptstyle`, `\\scriptscriptstyle`], props: { numArgs: 0, allowedInText: true, primitive: true }, handler(e10, t8) {
    var { breakOnTokenText: n4, funcName: r5, parser: i5 } = e10, a5 = i5.parseExpression(true, n4), o5 = r5.slice(1, r5.length - 5);
    if (!Ii2(o5)) throw Error(`Unknown style: ` + o5);
    return { type: `styling`, mode: i5.mode, style: o5, body: a5 };
  }, htmlBuilder(e10, t8) {
    var n4 = Fi2[e10.style], r5 = t8.havingStyle(n4);
    return e10.resetFont && (r5 = r5.withFont(``)), Ni2(e10.body, r5, t8);
  }, mathmlBuilder(e10, t8) {
    var n4 = Fi2[e10.style], r5 = t8.havingStyle(n4);
    e10.resetFont && (r5 = r5.withFont(``));
    var i5 = new X2(`mstyle`, kn2(e10.body, r5)), a5 = { display: [`0`, `true`], text: [`0`, `false`], script: [`1`, `false`], scriptscript: [`2`, `false`] }[e10.style];
    return i5.setAttribute(`scriptlevel`, a5[0]), i5.setAttribute(`displaystyle`, a5[1]), i5;
  } });
  var Li2 = function(e10, t8) {
    var n4 = e10.base;
    return n4 ? n4.type === `op` ? n4.limits && (t8.style.size === E2.DISPLAY.size || n4.alwaysHandleSupSub) ? Oi2 : null : n4.type === `operatorname` ? n4.alwaysHandleSupSub && (t8.style.size === E2.DISPLAY.size || n4.limits) ? Mi : null : n4.type === `accent` ? c2(n4.base) ? Qn2 : null : n4.type === `horizBrace` && !e10.sub === n4.isOver ? Ci : null : null;
  };
  an({ type: `supsub`, htmlBuilder(e10, t8) {
    var n4 = Li2(e10, t8);
    if (n4) return n4(e10, t8);
    var { base: r5, sup: i5, sub: a5 } = e10, o5 = Y2(r5, t8), s6, l4, u4 = t8.fontMetrics(), d5 = 0, f6 = 0, p4 = r5 && c2(r5);
    if (i5) {
      var m5 = t8.havingStyle(t8.style.sup());
      s6 = Y2(i5, m5, t8), p4 || (d5 = o5.height - m5.fontMetrics().supDrop * m5.sizeMultiplier / t8.sizeMultiplier);
    }
    if (a5) {
      var h5 = t8.havingStyle(t8.style.sub());
      l4 = Y2(a5, h5, t8), p4 || (f6 = o5.depth + h5.fontMetrics().subDrop * h5.sizeMultiplier / t8.sizeMultiplier);
    }
    var g6 = t8.style === E2.DISPLAY ? u4.sup1 : t8.style.cramped ? u4.sup3 : u4.sup2, _6 = t8.sizeMultiplier, v7 = k2(0.5 / u4.ptPerEm / _6), y7 = null;
    if (l4) {
      var b6 = e10.base && e10.base.type === `op` && e10.base.name && (e10.base.name === `\\oiint` || e10.base.name === `\\oiiint`);
      (o5 instanceof Ie2 || b6) && (y7 = k2(-(o5.italic ?? 0)));
    }
    var x5;
    if (s6 && l4) {
      d5 = Math.max(d5, g6, s6.depth + 0.25 * u4.xHeight), f6 = Math.max(f6, u4.sub2);
      var S5 = 4 * u4.defaultRuleThickness;
      if (d5 - s6.depth - (l4.height - f6) < S5) {
        f6 = S5 - (d5 - s6.depth) + l4.height;
        var C4 = 0.8 * u4.xHeight - (d5 - s6.depth);
        C4 > 0 && (d5 += C4, f6 -= C4);
      }
      x5 = G2({ positionType: `individualShift`, children: [{ type: `elem`, elem: l4, shift: f6, marginRight: v7, marginLeft: y7 }, { type: `elem`, elem: s6, shift: -d5, marginRight: v7 }] });
    } else if (l4) f6 = Math.max(f6, u4.sub1, l4.height - 0.8 * u4.xHeight), x5 = G2({ positionType: `shift`, positionData: f6, children: [{ type: `elem`, elem: l4, marginLeft: y7, marginRight: v7 }] });
    else if (s6) d5 = Math.max(d5, g6, s6.depth + 0.25 * u4.xHeight), x5 = G2({ positionType: `shift`, positionData: -d5, children: [{ type: `elem`, elem: s6, marginRight: v7 }] });
    else throw Error(`supsub must have either sup or sub.`);
    return W2([hn2(o5, `right`) || `mord`], [o5, W2([`msupsub`], [x5])], t8);
  }, mathmlBuilder(e10, t8) {
    var n4 = false, r5, i5;
    e10.base && e10.base.type === `horizBrace` && (i5 = !!e10.sup, i5 === e10.base.isOver && (n4 = true, r5 = e10.base.isOver)), e10.base && (e10.base.type === `op` || e10.base.type === `operatorname`) && (e10.base.parentIsSupSub = true);
    var a5 = [Z2(e10.base, t8)];
    e10.sub && a5.push(Z2(e10.sub, t8)), e10.sup && a5.push(Z2(e10.sup, t8));
    var o5;
    if (n4) o5 = r5 ? `mover` : `munder`;
    else if (!e10.sub) {
      var s6 = e10.base;
      o5 = s6 && s6.type === `op` && s6.limits && (t8.style === E2.DISPLAY || s6.alwaysHandleSupSub) || s6 && s6.type === `operatorname` && s6.alwaysHandleSupSub && (s6.limits || t8.style === E2.DISPLAY) ? `mover` : `msup`;
    } else if (e10.sup) {
      var c4 = e10.base;
      o5 = c4 && c4.type === `op` && c4.limits && t8.style === E2.DISPLAY || c4 && c4.type === `operatorname` && c4.alwaysHandleSupSub && (t8.style === E2.DISPLAY || c4.limits) ? `munderover` : `msubsup`;
    } else {
      var l4 = e10.base;
      o5 = l4 && l4.type === `op` && l4.limits && (t8.style === E2.DISPLAY || l4.alwaysHandleSupSub) || l4 && l4.type === `operatorname` && l4.alwaysHandleSupSub && (l4.limits || t8.style === E2.DISPLAY) ? `munder` : `msub`;
    }
    return new X2(o5, a5);
  } }), an({ type: `atom`, htmlBuilder(e10, t8) {
    return Pt2(e10.text, e10.mode, t8, [`m` + e10.family]);
  }, mathmlBuilder(e10, t8) {
    var n4 = new X2(`mo`, [wn2(e10.text, e10.mode)]);
    if (e10.family === `bin`) {
      var r5 = Dn2(e10, t8);
      r5 === `bold-italic` && n4.setAttribute(`mathvariant`, r5);
    } else e10.family === `punct` ? n4.setAttribute(`separator`, `true`) : (e10.family === `open` || e10.family === `close`) && n4.setAttribute(`stretchy`, `false`);
    return n4;
  } });
  var Ri2 = { mi: `italic`, mn: `normal`, mtext: `normal` };
  an({ type: `mathord`, htmlBuilder(e10, t8) {
    return It2(e10, t8, `mathord`);
  }, mathmlBuilder(e10, t8) {
    var n4 = new X2(`mi`, [wn2(e10.text, e10.mode, t8)]), r5 = Dn2(e10, t8) || `italic`;
    return r5 !== Ri2[n4.type] && n4.setAttribute(`mathvariant`, r5), n4;
  } }), an({ type: `textord`, htmlBuilder(e10, t8) {
    return It2(e10, t8, `textord`);
  }, mathmlBuilder(e10, t8) {
    var n4 = wn2(e10.text, e10.mode, t8), r5 = Dn2(e10, t8) || `normal`, i5 = e10.mode === `text` ? new X2(`mtext`, [n4]) : /[0-9]/.test(e10.text) ? new X2(`mn`, [n4]) : e10.text === `\\prime` ? new X2(`mo`, [n4]) : new X2(`mi`, [n4]);
    return r5 !== Ri2[i5.type] && i5.setAttribute(`mathvariant`, r5), i5;
  } });
  var zi2 = { "\\nobreak": `nobreak`, "\\allowbreak": `allowbreak` };
  var Bi2 = { " ": {}, "\\ ": {}, "~": { className: `nobreak` }, "\\space": {}, "\\nobreakspace": { className: `nobreak` } };
  an({ type: `spacing`, htmlBuilder(t8, n4) {
    if (Bi2.hasOwnProperty(t8.text)) {
      var r5 = Bi2[t8.text].className || ``;
      if (t8.mode === `text`) {
        var i5 = It2(t8, n4, `textord`);
        return i5.classes.push(r5), i5;
      }
      return W2([`mspace`, r5], [Pt2(t8.text, t8.mode, n4)], n4);
    }
    if (zi2.hasOwnProperty(t8.text)) return W2([`mspace`, zi2[t8.text]], [], n4);
    throw new e2(`Unknown type of space "` + t8.text + `"`);
  }, mathmlBuilder(t8, n4) {
    var r5;
    if (Bi2.hasOwnProperty(t8.text)) r5 = new X2(`mtext`, [new bn2(`\xA0`)]);
    else if (zi2.hasOwnProperty(t8.text)) return new X2(`mspace`);
    else throw new e2(`Unknown type of space "` + t8.text + `"`);
    return r5;
  } });
  var Vi2 = () => {
    var e10 = new X2(`mtd`, []);
    return e10.setAttribute(`width`, `50%`), e10;
  };
  an({ type: `tag`, mathmlBuilder(e10, t8) {
    var n4 = new X2(`mtable`, [new X2(`mtr`, [Vi2(), new X2(`mtd`, [An2(e10.body, t8)]), Vi2(), new X2(`mtd`, [An2(e10.tag, t8)])])]);
    return n4.setAttribute(`width`, `100%`), n4;
  } });
  var Hi2 = { "\\text": void 0, "\\textrm": `textrm`, "\\textsf": `textsf`, "\\texttt": `texttt`, "\\textnormal": `textrm` };
  var Ui2 = { "\\textbf": `textbf`, "\\textmd": `textmd` };
  var Wi2 = { "\\textit": `textit`, "\\textup": `textup` };
  var Gi2 = (e10, t8) => {
    var n4 = e10.font;
    return n4 ? Hi2[n4] ? t8.withTextFontFamily(Hi2[n4]) : Ui2[n4] ? t8.withTextFontWeight(Ui2[n4]) : n4 === `\\emph` ? t8.fontShape === `textit` ? t8.withTextFontShape(`textup`) : t8.withTextFontShape(`textit`) : t8.withTextFontShape(Wi2[n4]) : t8;
  };
  q2({ type: `text`, names: [`\\text`, `\\textrm`, `\\textsf`, `\\texttt`, `\\textnormal`, `\\textbf`, `\\textmd`, `\\textit`, `\\textup`, `\\emph`], props: { numArgs: 1, argTypes: [`text`], allowedInArgument: true, allowedInText: true }, handler(e10, t8) {
    var { parser: n4, funcName: r5 } = e10, i5 = t8[0];
    return { type: `text`, mode: n4.mode, body: J2(i5), font: r5 };
  }, htmlBuilder(e10, t8) {
    var n4 = Gi2(e10, t8);
    return W2([`mord`, `text`], dn2(e10.body, n4, true), n4);
  }, mathmlBuilder(e10, t8) {
    var n4 = Gi2(e10, t8);
    return An2(e10.body, n4);
  } }), q2({ type: `underline`, names: [`\\underline`], props: { numArgs: 1, allowedInText: true }, handler(e10, t8) {
    var { parser: n4 } = e10;
    return { type: `underline`, mode: n4.mode, body: t8[0] };
  }, htmlBuilder(e10, t8) {
    var n4 = Y2(e10.body, t8), r5 = Vt2(`underline-line`, t8), i5 = t8.fontMetrics().defaultRuleThickness;
    return W2([`mord`, `underline`], [G2({ positionType: `top`, positionData: n4.height, children: [{ type: `kern`, size: i5 }, { type: `elem`, elem: r5 }, { type: `kern`, size: 3 * i5 }, { type: `elem`, elem: n4 }] })], t8);
  }, mathmlBuilder(e10, t8) {
    var n4 = new X2(`mo`, [new bn2(`\u203E`)]);
    n4.setAttribute(`stretchy`, `true`);
    var r5 = new X2(`munder`, [Z2(e10.body, t8), n4]);
    return r5.setAttribute(`accentunder`, `true`), r5;
  } }), q2({ type: `vcenter`, names: [`\\vcenter`], props: { numArgs: 1, argTypes: [`original`], allowedInText: false }, handler(e10, t8) {
    var { parser: n4 } = e10;
    return { type: `vcenter`, mode: n4.mode, body: t8[0] };
  }, htmlBuilder(e10, t8) {
    var n4 = Y2(e10.body, t8), r5 = t8.fontMetrics().axisHeight;
    return G2({ positionType: `shift`, positionData: 0.5 * (n4.height - r5 - (n4.depth + r5)), children: [{ type: `elem`, elem: n4 }] });
  }, mathmlBuilder(e10, t8) {
    return new X2(`mrow`, [new X2(`mpadded`, [Z2(e10.body, t8)], [`vcenter`])]);
  } }), q2({ type: `verb`, names: [`\\verb`], props: { numArgs: 0, allowedInText: true }, handler(t8, n4, r5) {
    throw new e2(`\\verb ended by end of line instead of matching delimiter`);
  }, htmlBuilder(e10, t8) {
    for (var n4 = Ki2(e10), r5 = [], i5 = t8.havingStyle(t8.style.text()), a5 = 0; a5 < n4.length; a5++) {
      var o5 = n4[a5];
      o5 === `~` && (o5 = `\\textasciitilde`), r5.push(Nt2(o5, `Typewriter-Regular`, e10.mode, i5, [`mord`, `texttt`]));
    }
    return W2([`mord`, `text`].concat(i5.sizingClasses(t8)), Rt2(r5), i5);
  }, mathmlBuilder(e10, t8) {
    var n4 = new X2(`mtext`, [new bn2(Ki2(e10))]);
    return n4.setAttribute(`mathvariant`, `monospace`), n4;
  } });
  var Ki2 = (e10) => e10.body.replace(/ /g, e10.star ? `\u2423` : `\xA0`);
  var qi2 = tn;
  var Ji2 = `[ \r
	]`;
  var Yi2 = `\\\\[a-zA-Z@]+`;
  var Xi2 = `\\\\[^\uD800-\uDFFF]`;
  var Zi2 = `(` + Yi2 + `)` + Ji2 + `*`;
  var Qi2 = `\\\\(
|[ \r	]+
?)[ \r	]*`;
  var $i2 = `[\u0300-\u036F]`;
  var ea2 = RegExp($i2 + `+$`);
  var ta2 = `(` + Ji2 + `+)|` + (Qi2 + `|`) + `([!-\\[\\]-\u2027\u202A-\uD7FF\uF900-\uFFFF]` + ($i2 + `*`) + `|[\uD800-\uDBFF][\uDC00-\uDFFF]` + ($i2 + `*`) + `|\\\\verb\\*([^]).*?\\4|\\\\verb([^*a-zA-Z]).*?\\5` + (`|` + Zi2) + (`|` + Xi2 + `)`);
  var na2 = class {
    constructor(e10, t8) {
      this.input = void 0, this.settings = void 0, this.tokenRegex = void 0, this.catcodes = void 0, this.input = e10, this.settings = t8, this.tokenRegex = new RegExp(ta2, `g`), this.catcodes = { "%": 14, "~": 13 };
    }
    setCatcode(e10, t8) {
      this.catcodes[e10] = t8;
    }
    lex() {
      var t8 = this.input, n4 = this.tokenRegex.lastIndex;
      if (n4 === t8.length) return new ri(`EOF`, new ni(this, n4, n4));
      var r5 = this.tokenRegex.exec(t8);
      if (r5 === null || r5.index !== n4) throw new e2(`Unexpected character: '` + t8[n4] + `'`, new ri(t8[n4], new ni(this, n4, n4 + 1)));
      var i5 = r5[6] || r5[3] || (r5[2] ? `\\ ` : ` `);
      if (this.catcodes[i5] === 14) {
        var a5 = t8.indexOf(`
`, this.tokenRegex.lastIndex);
        return a5 === -1 ? (this.tokenRegex.lastIndex = t8.length, this.settings.reportNonstrict(`commentAtEnd`, `% comment has no terminating newline; LaTeX would fail because of commenting the end of math mode (e.g. $)`)) : this.tokenRegex.lastIndex = a5 + 1, this.lex();
      }
      return new ri(i5, new ni(this, n4, this.tokenRegex.lastIndex));
    }
  };
  var ra2 = class {
    constructor(e10, t8) {
      e10 === void 0 && (e10 = {}), t8 === void 0 && (t8 = {}), this.current = void 0, this.builtins = void 0, this.undefStack = void 0, this.current = t8, this.builtins = e10, this.undefStack = [];
    }
    beginGroup() {
      this.undefStack.push({});
    }
    endGroup() {
      if (this.undefStack.length === 0) throw new e2(`Unbalanced namespace destruction: attempt to pop global namespace; please report this as a bug`);
      var t8 = this.undefStack.pop();
      for (var n4 in t8) t8.hasOwnProperty(n4) && (t8[n4] == null ? delete this.current[n4] : this.current[n4] = t8[n4]);
    }
    endGroups() {
      for (; this.undefStack.length > 0; ) this.endGroup();
    }
    has(e10) {
      return this.current.hasOwnProperty(e10) || this.builtins.hasOwnProperty(e10);
    }
    get(e10) {
      return this.current.hasOwnProperty(e10) ? this.current[e10] : this.builtins[e10];
    }
    set(e10, t8, n4) {
      if (n4 === void 0 && (n4 = false), n4) {
        for (var r5 = 0; r5 < this.undefStack.length; r5++) delete this.undefStack[r5][e10];
        this.undefStack.length > 0 && (this.undefStack[this.undefStack.length - 1][e10] = t8);
      } else {
        var i5 = this.undefStack[this.undefStack.length - 1];
        i5 && !i5.hasOwnProperty(e10) && (i5[e10] = this.current[e10]);
      }
      t8 == null ? delete this.current[e10] : this.current[e10] = t8;
    }
  };
  var ia = ti2;
  $2(`\\noexpand`, function(e10) {
    var t8 = e10.popToken();
    return e10.isExpandable(t8.text) && (t8.noexpand = true, t8.treatAsRelax = true), { tokens: [t8], numArgs: 0 };
  }), $2(`\\expandafter`, function(e10) {
    var t8 = e10.popToken();
    return e10.expandOnce(true), { tokens: [t8], numArgs: 0 };
  }), $2(`\\@firstoftwo`, function(e10) {
    return { tokens: e10.consumeArgs(2)[0], numArgs: 0 };
  }), $2(`\\@secondoftwo`, function(e10) {
    return { tokens: e10.consumeArgs(2)[1], numArgs: 0 };
  }), $2(`\\@ifnextchar`, function(e10) {
    var t8 = e10.consumeArgs(3);
    e10.consumeSpaces();
    var n4 = e10.future();
    return t8[0].length === 1 && t8[0][0].text === n4.text ? { tokens: t8[1], numArgs: 0 } : { tokens: t8[2], numArgs: 0 };
  }), $2(`\\@ifstar`, `\\@ifnextchar *{\\@firstoftwo{#1}}`), $2(`\\TextOrMath`, function(e10) {
    var t8 = e10.consumeArgs(2);
    return e10.mode === `text` ? { tokens: t8[0], numArgs: 0 } : { tokens: t8[1], numArgs: 0 };
  });
  var aa2 = { 0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, a: 10, A: 10, b: 11, B: 11, c: 12, C: 12, d: 13, D: 13, e: 14, E: 14, f: 15, F: 15 };
  $2(`\\char`, function(t8) {
    var n4 = t8.popToken(), r5, i5 = 0;
    if (n4.text === `'`) r5 = 8, n4 = t8.popToken();
    else if (n4.text === `"`) r5 = 16, n4 = t8.popToken();
    else if (n4.text === "`") {
      if (n4 = t8.popToken(), n4.text[0] === `\\`) i5 = n4.text.charCodeAt(1);
      else if (n4.text === `EOF`) throw new e2("\\char` missing argument");
      else i5 = n4.text.charCodeAt(0);
    } else r5 = 10;
    if (r5) {
      if (i5 = aa2[n4.text], i5 == null || i5 >= r5) throw new e2(`Invalid base-` + r5 + ` digit ` + n4.text);
      for (var a5; (a5 = aa2[t8.future().text]) != null && a5 < r5; ) i5 *= r5, i5 += a5, t8.popToken();
    }
    return `\\@char{` + i5 + `}`;
  });
  var oa2 = (t8, n4, r5, i5) => {
    var a5 = t8.consumeArg().tokens;
    if (a5.length !== 1) throw new e2(`\\newcommand's first argument must be a macro name`);
    var o5 = a5[0].text, s6 = t8.isDefined(o5);
    if (s6 && !n4) throw new e2(`\\newcommand{` + o5 + `} attempting to redefine ` + (o5 + `; use \\renewcommand`));
    if (!s6 && !r5) throw new e2(`\\renewcommand{` + o5 + `} when command ` + o5 + ` does not yet exist; use \\newcommand`);
    var c4 = 0;
    if (a5 = t8.consumeArg().tokens, a5.length === 1 && a5[0].text === `[`) {
      for (var l4 = ``, u4 = t8.expandNextToken(); u4.text !== `]` && u4.text !== `EOF`; ) l4 += u4.text, u4 = t8.expandNextToken();
      if (!l4.match(/^\s*[0-9]+\s*$/)) throw new e2(`Invalid number of arguments: ` + l4);
      c4 = parseInt(l4), a5 = t8.consumeArg().tokens;
    }
    return s6 && i5 || t8.macros.set(o5, { tokens: a5, numArgs: c4 }), ``;
  };
  $2(`\\newcommand`, (e10) => oa2(e10, false, true, false)), $2(`\\renewcommand`, (e10) => oa2(e10, true, false, false)), $2(`\\providecommand`, (e10) => oa2(e10, true, true, true)), $2(`\\message`, (e10) => {
    var t8 = e10.consumeArgs(1)[0];
    return console.log(t8.reverse().map((e11) => e11.text).join(``)), ``;
  }), $2(`\\errmessage`, (e10) => {
    var t8 = e10.consumeArgs(1)[0];
    return console.error(t8.reverse().map((e11) => e11.text).join(``)), ``;
  }), $2(`\\show`, (e10) => {
    var t8 = e10.popToken(), n4 = t8.text;
    return console.log(t8, e10.macros.get(n4), qi2[n4], A2.math[n4], A2.text[n4]), ``;
  }), $2(`\\bgroup`, `{`), $2(`\\egroup`, `}`), $2(`~`, `\\nobreakspace`), $2(`\\lq`, "`"), $2(`\\rq`, `'`), $2(`\\aa`, `\\r a`), $2(`\\AA`, `\\r A`), $2(`\\textcopyright`, "\\html@mathml{\\textcircled{c}}{\\char`\xA9}"), $2(`\\copyright`, `\\TextOrMath{\\textcopyright}{\\text{\\textcopyright}}`), $2(`\\textregistered`, "\\html@mathml{\\textcircled{\\scriptsize R}}{\\char`\xAE}"), $2(`\u212C`, `\\mathscr{B}`), $2(`\u2130`, `\\mathscr{E}`), $2(`\u2131`, `\\mathscr{F}`), $2(`\u210B`, `\\mathscr{H}`), $2(`\u2110`, `\\mathscr{I}`), $2(`\u2112`, `\\mathscr{L}`), $2(`\u2133`, `\\mathscr{M}`), $2(`\u211B`, `\\mathscr{R}`), $2(`\u212D`, `\\mathfrak{C}`), $2(`\u210C`, `\\mathfrak{H}`), $2(`\u2128`, `\\mathfrak{Z}`), $2(`\\Bbbk`, `\\Bbb{k}`), $2(`\\llap`, `\\mathllap{\\textrm{#1}}`), $2(`\\rlap`, `\\mathrlap{\\textrm{#1}}`), $2(`\\clap`, `\\mathclap{\\textrm{#1}}`), $2(`\\mathstrut`, `\\vphantom{(}`), $2(`\\underbar`, `\\underline{\\text{#1}}`), $2(`\\not`, `\\html@mathml{\\mathrel{\\mathrlap\\@not}\\nobreak}{\\char"338}`), $2(`\\neq`, "\\html@mathml{\\mathrel{\\not=}}{\\mathrel{\\char`\u2260}}"), $2(`\\ne`, `\\neq`), $2(`\u2260`, `\\neq`), $2(`\\notin`, "\\html@mathml{\\mathrel{{\\in}\\mathllap{/\\mskip1mu}}}{\\mathrel{\\char`\u2209}}"), $2(`\u2209`, `\\notin`), $2(`\u2258`, "\\html@mathml{\\mathrel{=\\kern{-1em}\\raisebox{0.4em}{$\\scriptsize\\frown$}}}{\\mathrel{\\char`\u2258}}"), $2(`\u2259`, "\\html@mathml{\\stackrel{\\tiny\\wedge}{=}}{\\mathrel{\\char`\u2258}}"), $2(`\u225A`, "\\html@mathml{\\stackrel{\\tiny\\vee}{=}}{\\mathrel{\\char`\u225A}}"), $2(`\u225B`, "\\html@mathml{\\stackrel{\\scriptsize\\star}{=}}{\\mathrel{\\char`\u225B}}"), $2(`\u225D`, "\\html@mathml{\\stackrel{\\tiny\\mathrm{def}}{=}}{\\mathrel{\\char`\u225D}}"), $2(`\u225E`, "\\html@mathml{\\stackrel{\\tiny\\mathrm{m}}{=}}{\\mathrel{\\char`\u225E}}"), $2(`\u225F`, "\\html@mathml{\\stackrel{\\tiny?}{=}}{\\mathrel{\\char`\u225F}}"), $2(`\u27C2`, `\\perp`), $2(`\u203C`, `\\mathclose{!\\mkern-0.8mu!}`), $2(`\u220C`, `\\notni`), $2(`\u231C`, `\\ulcorner`), $2(`\u231D`, `\\urcorner`), $2(`\u231E`, `\\llcorner`), $2(`\u231F`, `\\lrcorner`), $2(`\xA9`, `\\copyright`), $2(`\xAE`, `\\textregistered`), $2(`\\ulcorner`, `\\html@mathml{\\@ulcorner}{\\mathop{\\char"231c}}`), $2(`\\urcorner`, `\\html@mathml{\\@urcorner}{\\mathop{\\char"231d}}`), $2(`\\llcorner`, `\\html@mathml{\\@llcorner}{\\mathop{\\char"231e}}`), $2(`\\lrcorner`, `\\html@mathml{\\@lrcorner}{\\mathop{\\char"231f}}`), $2(`\\vdots`, `{\\varvdots\\rule{0pt}{15pt}}`), $2(`\u22EE`, `\\vdots`), $2(`\\varGamma`, `\\mathit{\\Gamma}`), $2(`\\varDelta`, `\\mathit{\\Delta}`), $2(`\\varTheta`, `\\mathit{\\Theta}`), $2(`\\varLambda`, `\\mathit{\\Lambda}`), $2(`\\varXi`, `\\mathit{\\Xi}`), $2(`\\varPi`, `\\mathit{\\Pi}`), $2(`\\varSigma`, `\\mathit{\\Sigma}`), $2(`\\varUpsilon`, `\\mathit{\\Upsilon}`), $2(`\\varPhi`, `\\mathit{\\Phi}`), $2(`\\varPsi`, `\\mathit{\\Psi}`), $2(`\\varOmega`, `\\mathit{\\Omega}`), $2(`\\substack`, `\\begin{subarray}{c}#1\\end{subarray}`), $2(`\\colon`, `\\nobreak\\mskip2mu\\mathpunct{}\\mathchoice{\\mkern-3mu}{\\mkern-3mu}{}{}{:}\\mskip6mu\\relax`), $2(`\\boxed`, `\\fbox{$\\displaystyle{#1}$}`), $2(`\\iff`, `\\DOTSB\\;\\Longleftrightarrow\\;`), $2(`\\implies`, `\\DOTSB\\;\\Longrightarrow\\;`), $2(`\\impliedby`, `\\DOTSB\\;\\Longleftarrow\\;`), $2(`\\dddot`, `{\\overset{\\raisebox{-0.1ex}{\\normalsize ...}}{#1}}`), $2(`\\ddddot`, `{\\overset{\\raisebox{-0.1ex}{\\normalsize ....}}{#1}}`);
  var sa2 = { ",": `\\dotsc`, "\\not": `\\dotsb`, "+": `\\dotsb`, "=": `\\dotsb`, "<": `\\dotsb`, ">": `\\dotsb`, "-": `\\dotsb`, "*": `\\dotsb`, ":": `\\dotsb`, "\\DOTSB": `\\dotsb`, "\\coprod": `\\dotsb`, "\\bigvee": `\\dotsb`, "\\bigwedge": `\\dotsb`, "\\biguplus": `\\dotsb`, "\\bigcap": `\\dotsb`, "\\bigcup": `\\dotsb`, "\\prod": `\\dotsb`, "\\sum": `\\dotsb`, "\\bigotimes": `\\dotsb`, "\\bigoplus": `\\dotsb`, "\\bigodot": `\\dotsb`, "\\bigsqcup": `\\dotsb`, "\\And": `\\dotsb`, "\\longrightarrow": `\\dotsb`, "\\Longrightarrow": `\\dotsb`, "\\longleftarrow": `\\dotsb`, "\\Longleftarrow": `\\dotsb`, "\\longleftrightarrow": `\\dotsb`, "\\Longleftrightarrow": `\\dotsb`, "\\mapsto": `\\dotsb`, "\\longmapsto": `\\dotsb`, "\\hookrightarrow": `\\dotsb`, "\\doteq": `\\dotsb`, "\\mathbin": `\\dotsb`, "\\mathrel": `\\dotsb`, "\\relbar": `\\dotsb`, "\\Relbar": `\\dotsb`, "\\xrightarrow": `\\dotsb`, "\\xleftarrow": `\\dotsb`, "\\DOTSI": `\\dotsi`, "\\int": `\\dotsi`, "\\oint": `\\dotsi`, "\\iint": `\\dotsi`, "\\iiint": `\\dotsi`, "\\iiiint": `\\dotsi`, "\\idotsint": `\\dotsi`, "\\DOTSX": `\\dotsx` };
  var ca2 = /* @__PURE__ */ new Set([`bin`, `rel`]);
  $2(`\\dots`, function(e10) {
    var t8 = `\\dotso`, n4 = e10.expandAfterFuture().text;
    return n4 in sa2 ? t8 = sa2[n4] : (n4.slice(0, 4) === `\\not` || n4 in A2.math && ca2.has(A2.math[n4].group)) && (t8 = `\\dotsb`), t8;
  });
  var la2 = { ")": true, "]": true, "\\rbrack": true, "\\}": true, "\\rbrace": true, "\\rangle": true, "\\rceil": true, "\\rfloor": true, "\\rgroup": true, "\\rmoustache": true, "\\right": true, "\\bigr": true, "\\biggr": true, "\\Bigr": true, "\\Biggr": true, $: true, ";": true, ".": true, ",": true };
  $2(`\\dotso`, function(e10) {
    return e10.future().text in la2 ? `\\ldots\\,` : `\\ldots`;
  }), $2(`\\dotsc`, function(e10) {
    var t8 = e10.future().text;
    return t8 in la2 && t8 !== `,` ? `\\ldots\\,` : `\\ldots`;
  }), $2(`\\cdots`, function(e10) {
    return e10.future().text in la2 ? `\\@cdots\\,` : `\\@cdots`;
  }), $2(`\\dotsb`, `\\cdots`), $2(`\\dotsm`, `\\cdots`), $2(`\\dotsi`, `\\!\\cdots`), $2(`\\dotsx`, `\\ldots\\,`), $2(`\\DOTSI`, `\\relax`), $2(`\\DOTSB`, `\\relax`), $2(`\\DOTSX`, `\\relax`), $2(`\\tmspace`, `\\TextOrMath{\\kern#1#3}{\\mskip#1#2}\\relax`), $2(`\\,`, `\\tmspace+{3mu}{.1667em}`), $2(`\\thinspace`, `\\,`), $2(`\\>`, `\\mskip{4mu}`), $2(`\\:`, `\\tmspace+{4mu}{.2222em}`), $2(`\\medspace`, `\\:`), $2(`\\;`, `\\tmspace+{5mu}{.2777em}`), $2(`\\thickspace`, `\\;`), $2(`\\!`, `\\tmspace-{3mu}{.1667em}`), $2(`\\negthinspace`, `\\!`), $2(`\\negmedspace`, `\\tmspace-{4mu}{.2222em}`), $2(`\\negthickspace`, `\\tmspace-{5mu}{.277em}`), $2(`\\enspace`, `\\kern.5em `), $2(`\\enskip`, `\\hskip.5em\\relax`), $2(`\\quad`, `\\hskip1em\\relax`), $2(`\\qquad`, `\\hskip2em\\relax`), $2(`\\tag`, `\\@ifstar\\tag@literal\\tag@paren`), $2(`\\tag@paren`, `\\tag@literal{({#1})}`), $2(`\\tag@literal`, (t8) => {
    if (t8.macros.get(`\\df@tag`)) throw new e2(`Multiple \\tag`);
    return `\\gdef\\df@tag{\\text{#1}}`;
  }), $2(`\\bmod`, `\\mathchoice{\\mskip1mu}{\\mskip1mu}{\\mskip5mu}{\\mskip5mu}\\mathbin{\\rm mod}\\mathchoice{\\mskip1mu}{\\mskip1mu}{\\mskip5mu}{\\mskip5mu}`), $2(`\\pod`, `\\allowbreak\\mathchoice{\\mkern18mu}{\\mkern8mu}{\\mkern8mu}{\\mkern8mu}(#1)`), $2(`\\pmod`, `\\pod{{\\rm mod}\\mkern6mu#1}`), $2(`\\mod`, `\\allowbreak\\mathchoice{\\mkern18mu}{\\mkern12mu}{\\mkern12mu}{\\mkern12mu}{\\rm mod}\\,\\,#1`), $2(`\\newline`, `\\\\\\relax`), $2(`\\TeX`, `\\textrm{\\html@mathml{T\\kern-.1667em\\raisebox{-.5ex}{E}\\kern-.125emX}{TeX}}`);
  var ua2 = k2(Ue2[`Main-Regular`][84][1] - 0.7 * Ue2[`Main-Regular`][65][1]);
  $2(`\\LaTeX`, `\\textrm{\\html@mathml{` + (`L\\kern-.36em\\raisebox{` + ua2 + `}{\\scriptstyle A}`) + `\\kern-.15em\\TeX}{LaTeX}}`), $2(`\\KaTeX`, `\\textrm{\\html@mathml{` + (`K\\kern-.17em\\raisebox{` + ua2 + `}{\\scriptstyle A}`) + `\\kern-.15em\\TeX}{KaTeX}}`), $2(`\\hspace`, `\\@ifstar\\@hspacer\\@hspace`), $2(`\\@hspace`, `\\hskip #1\\relax`), $2(`\\@hspacer`, `\\rule{0pt}{0pt}\\hskip #1\\relax`), $2(`\\ordinarycolon`, `:`), $2(`\\vcentcolon`, `\\mathrel{\\mathop\\ordinarycolon}`), $2(`\\dblcolon`, `\\html@mathml{\\mathrel{\\vcentcolon\\mathrel{\\mkern-.9mu}\\vcentcolon}}{\\mathop{\\char"2237}}`), $2(`\\coloneqq`, `\\html@mathml{\\mathrel{\\vcentcolon\\mathrel{\\mkern-1.2mu}=}}{\\mathop{\\char"2254}}`), $2(`\\Coloneqq`, `\\html@mathml{\\mathrel{\\dblcolon\\mathrel{\\mkern-1.2mu}=}}{\\mathop{\\char"2237\\char"3d}}`), $2(`\\coloneq`, `\\html@mathml{\\mathrel{\\vcentcolon\\mathrel{\\mkern-1.2mu}\\mathrel{-}}}{\\mathop{\\char"3a\\char"2212}}`), $2(`\\Coloneq`, `\\html@mathml{\\mathrel{\\dblcolon\\mathrel{\\mkern-1.2mu}\\mathrel{-}}}{\\mathop{\\char"2237\\char"2212}}`), $2(`\\eqqcolon`, `\\html@mathml{\\mathrel{=\\mathrel{\\mkern-1.2mu}\\vcentcolon}}{\\mathop{\\char"2255}}`), $2(`\\Eqqcolon`, `\\html@mathml{\\mathrel{=\\mathrel{\\mkern-1.2mu}\\dblcolon}}{\\mathop{\\char"3d\\char"2237}}`), $2(`\\eqcolon`, `\\html@mathml{\\mathrel{\\mathrel{-}\\mathrel{\\mkern-1.2mu}\\vcentcolon}}{\\mathop{\\char"2239}}`), $2(`\\Eqcolon`, `\\html@mathml{\\mathrel{\\mathrel{-}\\mathrel{\\mkern-1.2mu}\\dblcolon}}{\\mathop{\\char"2212\\char"2237}}`), $2(`\\colonapprox`, `\\html@mathml{\\mathrel{\\vcentcolon\\mathrel{\\mkern-1.2mu}\\approx}}{\\mathop{\\char"3a\\char"2248}}`), $2(`\\Colonapprox`, `\\html@mathml{\\mathrel{\\dblcolon\\mathrel{\\mkern-1.2mu}\\approx}}{\\mathop{\\char"2237\\char"2248}}`), $2(`\\colonsim`, `\\html@mathml{\\mathrel{\\vcentcolon\\mathrel{\\mkern-1.2mu}\\sim}}{\\mathop{\\char"3a\\char"223c}}`), $2(`\\Colonsim`, `\\html@mathml{\\mathrel{\\dblcolon\\mathrel{\\mkern-1.2mu}\\sim}}{\\mathop{\\char"2237\\char"223c}}`), $2(`\u2237`, `\\dblcolon`), $2(`\u2239`, `\\eqcolon`), $2(`\u2254`, `\\coloneqq`), $2(`\u2255`, `\\eqqcolon`), $2(`\u2A74`, `\\Coloneqq`), $2(`\\ratio`, `\\vcentcolon`), $2(`\\coloncolon`, `\\dblcolon`), $2(`\\colonequals`, `\\coloneqq`), $2(`\\coloncolonequals`, `\\Coloneqq`), $2(`\\equalscolon`, `\\eqqcolon`), $2(`\\equalscoloncolon`, `\\Eqqcolon`), $2(`\\colonminus`, `\\coloneq`), $2(`\\coloncolonminus`, `\\Coloneq`), $2(`\\minuscolon`, `\\eqcolon`), $2(`\\minuscoloncolon`, `\\Eqcolon`), $2(`\\coloncolonapprox`, `\\Colonapprox`), $2(`\\coloncolonsim`, `\\Colonsim`), $2(`\\simcolon`, `\\mathrel{\\sim\\mathrel{\\mkern-1.2mu}\\vcentcolon}`), $2(`\\simcoloncolon`, `\\mathrel{\\sim\\mathrel{\\mkern-1.2mu}\\dblcolon}`), $2(`\\approxcolon`, `\\mathrel{\\approx\\mathrel{\\mkern-1.2mu}\\vcentcolon}`), $2(`\\approxcoloncolon`, `\\mathrel{\\approx\\mathrel{\\mkern-1.2mu}\\dblcolon}`), $2(`\\notni`, "\\html@mathml{\\not\\ni}{\\mathrel{\\char`\u220C}}"), $2(`\\limsup`, `\\DOTSB\\operatorname*{lim\\,sup}`), $2(`\\liminf`, `\\DOTSB\\operatorname*{lim\\,inf}`), $2(`\\injlim`, `\\DOTSB\\operatorname*{inj\\,lim}`), $2(`\\projlim`, `\\DOTSB\\operatorname*{proj\\,lim}`), $2(`\\varlimsup`, `\\DOTSB\\operatorname*{\\overline{lim}}`), $2(`\\varliminf`, `\\DOTSB\\operatorname*{\\underline{lim}}`), $2(`\\varinjlim`, `\\DOTSB\\operatorname*{\\underrightarrow{lim}}`), $2(`\\varprojlim`, `\\DOTSB\\operatorname*{\\underleftarrow{lim}}`), $2(`\\gvertneqq`, `\\html@mathml{\\@gvertneqq}{\u2269}`), $2(`\\lvertneqq`, `\\html@mathml{\\@lvertneqq}{\u2268}`), $2(`\\ngeqq`, `\\html@mathml{\\@ngeqq}{\u2271}`), $2(`\\ngeqslant`, `\\html@mathml{\\@ngeqslant}{\u2271}`), $2(`\\nleqq`, `\\html@mathml{\\@nleqq}{\u2270}`), $2(`\\nleqslant`, `\\html@mathml{\\@nleqslant}{\u2270}`), $2(`\\nshortmid`, `\\html@mathml{\\@nshortmid}{\u2224}`), $2(`\\nshortparallel`, `\\html@mathml{\\@nshortparallel}{\u2226}`), $2(`\\nsubseteqq`, `\\html@mathml{\\@nsubseteqq}{\u2288}`), $2(`\\nsupseteqq`, `\\html@mathml{\\@nsupseteqq}{\u2289}`), $2(`\\varsubsetneq`, `\\html@mathml{\\@varsubsetneq}{\u228A}`), $2(`\\varsubsetneqq`, `\\html@mathml{\\@varsubsetneqq}{\u2ACB}`), $2(`\\varsupsetneq`, `\\html@mathml{\\@varsupsetneq}{\u228B}`), $2(`\\varsupsetneqq`, `\\html@mathml{\\@varsupsetneqq}{\u2ACC}`), $2(`\\imath`, `\\html@mathml{\\@imath}{\u0131}`), $2(`\\jmath`, `\\html@mathml{\\@jmath}{\u0237}`), $2(`\\llbracket`, "\\html@mathml{\\mathopen{[\\mkern-3.2mu[}}{\\mathopen{\\char`\u27E6}}"), $2(`\\rrbracket`, "\\html@mathml{\\mathclose{]\\mkern-3.2mu]}}{\\mathclose{\\char`\u27E7}}"), $2(`\u27E6`, `\\llbracket`), $2(`\u27E7`, `\\rrbracket`), $2(`\\lBrace`, "\\html@mathml{\\mathopen{\\{\\mkern-3.2mu[}}{\\mathopen{\\char`\u2983}}"), $2(`\\rBrace`, "\\html@mathml{\\mathclose{]\\mkern-3.2mu\\}}}{\\mathclose{\\char`\u2984}}"), $2(`\u2983`, `\\lBrace`), $2(`\u2984`, `\\rBrace`), $2(`\\minuso`, "\\mathbin{\\html@mathml{{\\mathrlap{\\mathchoice{\\kern{0.145em}}{\\kern{0.145em}}{\\kern{0.1015em}}{\\kern{0.0725em}}\\circ}{-}}}{\\char`\u29B5}}"), $2(`\u29B5`, `\\minuso`), $2(`\\darr`, `\\downarrow`), $2(`\\dArr`, `\\Downarrow`), $2(`\\Darr`, `\\Downarrow`), $2(`\\lang`, `\\langle`), $2(`\\rang`, `\\rangle`), $2(`\\uarr`, `\\uparrow`), $2(`\\uArr`, `\\Uparrow`), $2(`\\Uarr`, `\\Uparrow`), $2(`\\N`, `\\mathbb{N}`), $2(`\\R`, `\\mathbb{R}`), $2(`\\Z`, `\\mathbb{Z}`), $2(`\\alef`, `\\aleph`), $2(`\\alefsym`, `\\aleph`), $2(`\\Alpha`, `\\mathrm{A}`), $2(`\\Beta`, `\\mathrm{B}`), $2(`\\bull`, `\\bullet`), $2(`\\Chi`, `\\mathrm{X}`), $2(`\\clubs`, `\\clubsuit`), $2(`\\cnums`, `\\mathbb{C}`), $2(`\\Complex`, `\\mathbb{C}`), $2(`\\Dagger`, `\\ddagger`), $2(`\\diamonds`, `\\diamondsuit`), $2(`\\empty`, `\\emptyset`), $2(`\\Epsilon`, `\\mathrm{E}`), $2(`\\Eta`, `\\mathrm{H}`), $2(`\\exist`, `\\exists`), $2(`\\harr`, `\\leftrightarrow`), $2(`\\hArr`, `\\Leftrightarrow`), $2(`\\Harr`, `\\Leftrightarrow`), $2(`\\hearts`, `\\heartsuit`), $2(`\\image`, `\\Im`), $2(`\\infin`, `\\infty`), $2(`\\Iota`, `\\mathrm{I}`), $2(`\\isin`, `\\in`), $2(`\\Kappa`, `\\mathrm{K}`), $2(`\\larr`, `\\leftarrow`), $2(`\\lArr`, `\\Leftarrow`), $2(`\\Larr`, `\\Leftarrow`), $2(`\\lrarr`, `\\leftrightarrow`), $2(`\\lrArr`, `\\Leftrightarrow`), $2(`\\Lrarr`, `\\Leftrightarrow`), $2(`\\Mu`, `\\mathrm{M}`), $2(`\\natnums`, `\\mathbb{N}`), $2(`\\Nu`, `\\mathrm{N}`), $2(`\\Omicron`, `\\mathrm{O}`), $2(`\\plusmn`, `\\pm`), $2(`\\rarr`, `\\rightarrow`), $2(`\\rArr`, `\\Rightarrow`), $2(`\\Rarr`, `\\Rightarrow`), $2(`\\real`, `\\Re`), $2(`\\reals`, `\\mathbb{R}`), $2(`\\Reals`, `\\mathbb{R}`), $2(`\\Rho`, `\\mathrm{P}`), $2(`\\sdot`, `\\cdot`), $2(`\\sect`, `\\S`), $2(`\\spades`, `\\spadesuit`), $2(`\\sub`, `\\subset`), $2(`\\sube`, `\\subseteq`), $2(`\\supe`, `\\supseteq`), $2(`\\Tau`, `\\mathrm{T}`), $2(`\\thetasym`, `\\vartheta`), $2(`\\weierp`, `\\wp`), $2(`\\Zeta`, `\\mathrm{Z}`), $2(`\\argmin`, `\\DOTSB\\operatorname*{arg\\,min}`), $2(`\\argmax`, `\\DOTSB\\operatorname*{arg\\,max}`), $2(`\\plim`, `\\DOTSB\\mathop{\\operatorname{plim}}\\limits`), $2(`\\bra`, `\\mathinner{\\langle{#1}|}`), $2(`\\ket`, `\\mathinner{|{#1}\\rangle}`), $2(`\\braket`, `\\mathinner{\\langle{#1}\\rangle}`), $2(`\\Bra`, `\\left\\langle#1\\right|`), $2(`\\Ket`, `\\left|#1\\right\\rangle`);
  var da2 = (e10) => (t8) => {
    var n4 = t8.consumeArg().tokens, r5 = t8.consumeArg().tokens, i5 = t8.consumeArg().tokens, a5 = t8.consumeArg().tokens, o5 = t8.macros.get(`|`), s6 = t8.macros.get(`\\|`);
    t8.macros.beginGroup();
    var c4 = (t9) => (n5) => {
      e10 && (n5.macros.set(`|`, o5), i5.length && n5.macros.set(`\\|`, s6));
      var a6 = t9;
      return !t9 && i5.length && n5.future().text === `|` && (n5.popToken(), a6 = true), { tokens: a6 ? i5 : r5, numArgs: 0 };
    };
    t8.macros.set(`|`, c4(false)), i5.length && t8.macros.set(`\\|`, c4(true));
    var l4 = t8.consumeArg().tokens, u4 = t8.expandTokens([...a5, ...l4, ...n4]);
    return t8.macros.endGroup(), { tokens: u4.reverse(), numArgs: 0 };
  };
  $2(`\\bra@ket`, da2(false)), $2(`\\bra@set`, da2(true)), $2(`\\Braket`, `\\bra@ket{\\left\\langle}{\\,\\middle\\vert\\,}{\\,\\middle\\vert\\,}{\\right\\rangle}`), $2(`\\Set`, `\\bra@set{\\left\\{\\:}{\\;\\middle\\vert\\;}{\\;\\middle\\Vert\\;}{\\:\\right\\}}`), $2(`\\set`, `\\bra@set{\\{\\,}{\\mid}{}{\\,\\}}`), $2(`\\angln`, `{\\angl n}`), $2(`\\blue`, `\\textcolor{##6495ed}{#1}`), $2(`\\orange`, `\\textcolor{##ffa500}{#1}`), $2(`\\pink`, `\\textcolor{##ff00af}{#1}`), $2(`\\red`, `\\textcolor{##df0030}{#1}`), $2(`\\green`, `\\textcolor{##28ae7b}{#1}`), $2(`\\gray`, `\\textcolor{gray}{#1}`), $2(`\\purple`, `\\textcolor{##9d38bd}{#1}`), $2(`\\blueA`, `\\textcolor{##ccfaff}{#1}`), $2(`\\blueB`, `\\textcolor{##80f6ff}{#1}`), $2(`\\blueC`, `\\textcolor{##63d9ea}{#1}`), $2(`\\blueD`, `\\textcolor{##11accd}{#1}`), $2(`\\blueE`, `\\textcolor{##0c7f99}{#1}`), $2(`\\tealA`, `\\textcolor{##94fff5}{#1}`), $2(`\\tealB`, `\\textcolor{##26edd5}{#1}`), $2(`\\tealC`, `\\textcolor{##01d1c1}{#1}`), $2(`\\tealD`, `\\textcolor{##01a995}{#1}`), $2(`\\tealE`, `\\textcolor{##208170}{#1}`), $2(`\\greenA`, `\\textcolor{##b6ffb0}{#1}`), $2(`\\greenB`, `\\textcolor{##8af281}{#1}`), $2(`\\greenC`, `\\textcolor{##74cf70}{#1}`), $2(`\\greenD`, `\\textcolor{##1fab54}{#1}`), $2(`\\greenE`, `\\textcolor{##0d923f}{#1}`), $2(`\\goldA`, `\\textcolor{##ffd0a9}{#1}`), $2(`\\goldB`, `\\textcolor{##ffbb71}{#1}`), $2(`\\goldC`, `\\textcolor{##ff9c39}{#1}`), $2(`\\goldD`, `\\textcolor{##e07d10}{#1}`), $2(`\\goldE`, `\\textcolor{##a75a05}{#1}`), $2(`\\redA`, `\\textcolor{##fca9a9}{#1}`), $2(`\\redB`, `\\textcolor{##ff8482}{#1}`), $2(`\\redC`, `\\textcolor{##f9685d}{#1}`), $2(`\\redD`, `\\textcolor{##e84d39}{#1}`), $2(`\\redE`, `\\textcolor{##bc2612}{#1}`), $2(`\\maroonA`, `\\textcolor{##ffbde0}{#1}`), $2(`\\maroonB`, `\\textcolor{##ff92c6}{#1}`), $2(`\\maroonC`, `\\textcolor{##ed5fa6}{#1}`), $2(`\\maroonD`, `\\textcolor{##ca337c}{#1}`), $2(`\\maroonE`, `\\textcolor{##9e034e}{#1}`), $2(`\\purpleA`, `\\textcolor{##ddd7ff}{#1}`), $2(`\\purpleB`, `\\textcolor{##c6b9fc}{#1}`), $2(`\\purpleC`, `\\textcolor{##aa87ff}{#1}`), $2(`\\purpleD`, `\\textcolor{##7854ab}{#1}`), $2(`\\purpleE`, `\\textcolor{##543b78}{#1}`), $2(`\\mintA`, `\\textcolor{##f5f9e8}{#1}`), $2(`\\mintB`, `\\textcolor{##edf2df}{#1}`), $2(`\\mintC`, `\\textcolor{##e0e5cc}{#1}`), $2(`\\grayA`, `\\textcolor{##f6f7f7}{#1}`), $2(`\\grayB`, `\\textcolor{##f0f1f2}{#1}`), $2(`\\grayC`, `\\textcolor{##e3e5e6}{#1}`), $2(`\\grayD`, `\\textcolor{##d6d8da}{#1}`), $2(`\\grayE`, `\\textcolor{##babec2}{#1}`), $2(`\\grayF`, `\\textcolor{##888d93}{#1}`), $2(`\\grayG`, `\\textcolor{##626569}{#1}`), $2(`\\grayH`, `\\textcolor{##3b3e40}{#1}`), $2(`\\grayI`, `\\textcolor{##21242c}{#1}`), $2(`\\kaBlue`, `\\textcolor{##314453}{#1}`), $2(`\\kaGreen`, `\\textcolor{##71B307}{#1}`);
  var fa2 = { "^": true, _: true, "\\limits": true, "\\nolimits": true };
  var pa2 = class {
    constructor(e10, t8, n4) {
      this.settings = void 0, this.expansionCount = void 0, this.lexer = void 0, this.macros = void 0, this.stack = void 0, this.mode = void 0, this.settings = t8, this.expansionCount = 0, this.feed(e10), this.macros = new ra2(ia, t8.macros), this.mode = n4, this.stack = [];
    }
    feed(e10) {
      this.lexer = new na2(e10, this.settings);
    }
    switchMode(e10) {
      this.mode = e10;
    }
    beginGroup() {
      this.macros.beginGroup();
    }
    endGroup() {
      this.macros.endGroup();
    }
    endGroups() {
      this.macros.endGroups();
    }
    future() {
      return this.stack.length === 0 && this.pushToken(this.lexer.lex()), this.stack[this.stack.length - 1];
    }
    popToken() {
      return this.future(), this.stack.pop();
    }
    pushToken(e10) {
      this.stack.push(e10);
    }
    pushTokens(e10) {
      this.stack.push(...e10);
    }
    scanArgument(e10) {
      var t8, n4, r5;
      if (e10) {
        if (this.consumeSpaces(), this.future().text !== `[`) return null;
        t8 = this.popToken(), { tokens: r5, end: n4 } = this.consumeArg([`]`]);
      } else ({ tokens: r5, start: t8, end: n4 } = this.consumeArg());
      return this.pushToken(new ri(`EOF`, n4.loc)), this.pushTokens(r5), new ri(``, ni.range(t8, n4));
    }
    consumeSpaces() {
      for (; this.future().text === ` `; ) this.stack.pop();
    }
    consumeArg(t8) {
      var n4 = [], r5 = t8 && t8.length > 0;
      r5 || this.consumeSpaces();
      var i5 = this.future(), a5, o5 = 0, s6 = 0;
      do {
        if (a5 = this.popToken(), n4.push(a5), a5.text === `{`) ++o5;
        else if (a5.text === `}`) {
          if (--o5, o5 === -1) throw new e2(`Extra }`, a5);
        } else if (a5.text === `EOF`) throw new e2(`Unexpected end of input in a macro argument, expected '` + (t8 && r5 ? t8[s6] : `}`) + `'`, a5);
        if (t8 && r5) {
          if ((o5 === 0 || o5 === 1 && t8[s6] === `{`) && a5.text === t8[s6]) {
            if (++s6, s6 === t8.length) {
              n4.splice(-s6, s6);
              break;
            }
          } else s6 = 0;
        }
      } while (o5 !== 0 || r5);
      return i5.text === `{` && n4[n4.length - 1].text === `}` && (n4.pop(), n4.shift()), n4.reverse(), { tokens: n4, start: i5, end: a5 };
    }
    consumeArgs(t8, n4) {
      if (n4) {
        if (n4.length !== t8 + 1) throw new e2(`The length of delimiters doesn't match the number of args!`);
        for (var r5 = n4[0], i5 = 0; i5 < r5.length; i5++) {
          var a5 = this.popToken();
          if (r5[i5] !== a5.text) throw new e2(`Use of the macro doesn't match its definition`, a5);
        }
      }
      for (var o5 = [], s6 = 0; s6 < t8; s6++) o5.push(this.consumeArg(n4 && n4[s6 + 1]).tokens);
      return o5;
    }
    countExpansion(t8) {
      if (this.expansionCount += t8, this.expansionCount > this.settings.maxExpand) throw new e2(`Too many expansions: infinite loop or need to increase maxExpand setting`);
    }
    expandOnce(t8) {
      var n4 = this.popToken(), r5 = n4.text, i5 = n4.noexpand ? null : this._getExpansion(r5);
      if (i5 == null || t8 && i5.unexpandable) {
        if (t8 && i5 == null && r5[0] === `\\` && !this.isDefined(r5)) throw new e2(`Undefined control sequence: ` + r5);
        return this.pushToken(n4), false;
      }
      this.countExpansion(1);
      var a5 = i5.tokens, o5 = this.consumeArgs(i5.numArgs, i5.delimiters);
      if (i5.numArgs) {
        a5 = a5.slice();
        for (var s6 = a5.length - 1; s6 >= 0; --s6) {
          var c4 = a5[s6];
          if (c4.text === `#`) {
            if (s6 === 0) throw new e2(`Incomplete placeholder at end of macro body`, c4);
            if (c4 = a5[--s6], c4.text === `#`) a5.splice(s6 + 1, 1);
            else if (/^[1-9]$/.test(c4.text)) a5.splice(s6, 2, ...o5[c4.text - 1]);
            else throw new e2(`Not a valid argument number`, c4);
          }
        }
      }
      return this.pushTokens(a5), a5.length;
    }
    expandAfterFuture() {
      return this.expandOnce(), this.future();
    }
    expandNextToken() {
      for (; ; ) if (this.expandOnce() === false) {
        var e10 = this.stack.pop();
        return e10.treatAsRelax && (e10.text = `\\relax`), e10;
      }
    }
    expandMacro(e10) {
      return this.macros.has(e10) ? this.expandTokens([new ri(e10)]) : void 0;
    }
    expandTokens(e10) {
      var t8 = [], n4 = this.stack.length;
      for (this.pushTokens(e10); this.stack.length > n4; ) if (this.expandOnce(true) === false) {
        var r5 = this.stack.pop();
        r5.treatAsRelax &&= (r5.noexpand = false, false), t8.push(r5);
      }
      return this.countExpansion(t8.length), t8;
    }
    expandMacroAsText(e10) {
      var t8 = this.expandMacro(e10);
      return t8 && t8.map((e11) => e11.text).join(``);
    }
    _getExpansion(e10) {
      var t8 = this.macros.get(e10);
      if (t8 == null) return t8;
      if (e10.length === 1) {
        var n4 = this.lexer.catcodes[e10];
        if (n4 != null && n4 !== 13) return;
      }
      var r5 = typeof t8 == `function` ? t8(this) : t8;
      if (typeof r5 == `string`) {
        var i5 = 0;
        if (r5.includes(`#`)) for (var a5 = r5.replace(/##/g, ``); a5.includes(`#` + (i5 + 1)); ) ++i5;
        for (var o5 = new na2(r5, this.settings), s6 = [], c4 = o5.lex(); c4.text !== `EOF`; ) s6.push(c4), c4 = o5.lex();
        return s6.reverse(), { tokens: s6, numArgs: i5 };
      }
      return r5;
    }
    isDefined(e10) {
      return this.macros.has(e10) || qi2.hasOwnProperty(e10) || A2.math.hasOwnProperty(e10) || A2.text.hasOwnProperty(e10) || fa2.hasOwnProperty(e10);
    }
    isExpandable(e10) {
      var t8 = this.macros.get(e10);
      return t8 == null ? qi2.hasOwnProperty(e10) && !qi2[e10].primitive : typeof t8 == `string` || typeof t8 == `function` || !t8.unexpandable;
    }
  };
  var ma2 = /^[₊₋₌₍₎₀₁₂₃₄₅₆₇₈₉ₐₑₕᵢⱼₖₗₘₙₒₚᵣₛₜᵤᵥₓᵦᵧᵨᵩᵪ]/;
  var ha2 = Object.freeze({ "\u208A": `+`, "\u208B": `-`, "\u208C": `=`, "\u208D": `(`, "\u208E": `)`, "\u2080": `0`, "\u2081": `1`, "\u2082": `2`, "\u2083": `3`, "\u2084": `4`, "\u2085": `5`, "\u2086": `6`, "\u2087": `7`, "\u2088": `8`, "\u2089": `9`, "\u2090": `a`, "\u2091": `e`, "\u2095": `h`, "\u1D62": `i`, "\u2C7C": `j`, "\u2096": `k`, "\u2097": `l`, "\u2098": `m`, "\u2099": `n`, "\u2092": `o`, "\u209A": `p`, "\u1D63": `r`, "\u209B": `s`, "\u209C": `t`, "\u1D64": `u`, "\u1D65": `v`, "\u2093": `x`, "\u1D66": `\u03B2`, "\u1D67": `\u03B3`, "\u1D68": `\u03C1`, "\u1D69": `\u03D5`, "\u1D6A": `\u03C7`, "\u207A": `+`, "\u207B": `-`, "\u207C": `=`, "\u207D": `(`, "\u207E": `)`, "\u2070": `0`, "\xB9": `1`, "\xB2": `2`, "\xB3": `3`, "\u2074": `4`, "\u2075": `5`, "\u2076": `6`, "\u2077": `7`, "\u2078": `8`, "\u2079": `9`, "\u1D2C": `A`, "\u1D2E": `B`, "\u1D30": `D`, "\u1D31": `E`, "\u1D33": `G`, "\u1D34": `H`, "\u1D35": `I`, "\u1D36": `J`, "\u1D37": `K`, "\u1D38": `L`, "\u1D39": `M`, "\u1D3A": `N`, "\u1D3C": `O`, "\u1D3E": `P`, "\u1D3F": `R`, "\u1D40": `T`, "\u1D41": `U`, "\u2C7D": `V`, "\u1D42": `W`, "\u1D43": `a`, "\u1D47": `b`, "\u1D9C": `c`, "\u1D48": `d`, "\u1D49": `e`, "\u1DA0": `f`, "\u1D4D": `g`, \u02B0: `h`, "\u2071": `i`, \u02B2: `j`, "\u1D4F": `k`, \u02E1: `l`, "\u1D50": `m`, \u207F: `n`, "\u1D52": `o`, "\u1D56": `p`, \u02B3: `r`, \u02E2: `s`, "\u1D57": `t`, "\u1D58": `u`, "\u1D5B": `v`, \u02B7: `w`, \u02E3: `x`, \u02B8: `y`, "\u1DBB": `z`, "\u1D5D": `\u03B2`, "\u1D5E": `\u03B3`, "\u1D5F": `\u03B4`, "\u1D60": `\u03D5`, "\u1D61": `\u03C7`, "\u1DBF": `\u03B8` });
  var ga2 = { "\u0301": { text: `\\'`, math: `\\acute` }, "\u0300": { text: "\\`", math: `\\grave` }, "\u0308": { text: `\\"`, math: `\\ddot` }, "\u0303": { text: `\\~`, math: `\\tilde` }, "\u0304": { text: `\\=`, math: `\\bar` }, "\u0306": { text: `\\u`, math: `\\breve` }, "\u030C": { text: `\\v`, math: `\\check` }, "\u0302": { text: `\\^`, math: `\\hat` }, "\u0307": { text: `\\.`, math: `\\dot` }, "\u030A": { text: `\\r`, math: `\\mathring` }, "\u030B": { text: `\\H` }, "\u0327": { text: `\\c` } };
  var _a2 = { \u00E1: `a\u0301`, \u00E0: `a\u0300`, \u00E4: `a\u0308`, \u01DF: `a\u0308\u0304`, \u00E3: `a\u0303`, \u0101: `a\u0304`, \u0103: `a\u0306`, \u1EAF: `a\u0306\u0301`, \u1EB1: `a\u0306\u0300`, \u1EB5: `a\u0306\u0303`, \u01CE: `a\u030C`, \u00E2: `a\u0302`, \u1EA5: `a\u0302\u0301`, \u1EA7: `a\u0302\u0300`, \u1EAB: `a\u0302\u0303`, \u0227: `a\u0307`, \u01E1: `a\u0307\u0304`, \u00E5: `a\u030A`, \u01FB: `a\u030A\u0301`, \u1E03: `b\u0307`, \u0107: `c\u0301`, \u1E09: `c\u0327\u0301`, \u010D: `c\u030C`, \u0109: `c\u0302`, \u010B: `c\u0307`, \u00E7: `c\u0327`, \u010F: `d\u030C`, \u1E0B: `d\u0307`, \u1E11: `d\u0327`, \u00E9: `e\u0301`, \u00E8: `e\u0300`, \u00EB: `e\u0308`, \u1EBD: `e\u0303`, \u0113: `e\u0304`, \u1E17: `e\u0304\u0301`, \u1E15: `e\u0304\u0300`, \u0115: `e\u0306`, \u1E1D: `e\u0327\u0306`, \u011B: `e\u030C`, \u00EA: `e\u0302`, \u1EBF: `e\u0302\u0301`, \u1EC1: `e\u0302\u0300`, \u1EC5: `e\u0302\u0303`, \u0117: `e\u0307`, \u0229: `e\u0327`, \u1E1F: `f\u0307`, \u01F5: `g\u0301`, \u1E21: `g\u0304`, \u011F: `g\u0306`, \u01E7: `g\u030C`, \u011D: `g\u0302`, \u0121: `g\u0307`, \u0123: `g\u0327`, \u1E27: `h\u0308`, \u021F: `h\u030C`, \u0125: `h\u0302`, \u1E23: `h\u0307`, \u1E29: `h\u0327`, \u00ED: `i\u0301`, \u00EC: `i\u0300`, \u00EF: `i\u0308`, \u1E2F: `i\u0308\u0301`, \u0129: `i\u0303`, \u012B: `i\u0304`, \u012D: `i\u0306`, \u01D0: `i\u030C`, \u00EE: `i\u0302`, \u01F0: `j\u030C`, \u0135: `j\u0302`, \u1E31: `k\u0301`, \u01E9: `k\u030C`, \u0137: `k\u0327`, \u013A: `l\u0301`, \u013E: `l\u030C`, \u013C: `l\u0327`, \u1E3F: `m\u0301`, \u1E41: `m\u0307`, \u0144: `n\u0301`, \u01F9: `n\u0300`, \u00F1: `n\u0303`, \u0148: `n\u030C`, \u1E45: `n\u0307`, \u0146: `n\u0327`, \u00F3: `o\u0301`, \u00F2: `o\u0300`, \u00F6: `o\u0308`, \u022B: `o\u0308\u0304`, \u00F5: `o\u0303`, \u1E4D: `o\u0303\u0301`, \u1E4F: `o\u0303\u0308`, \u022D: `o\u0303\u0304`, \u014D: `o\u0304`, \u1E53: `o\u0304\u0301`, \u1E51: `o\u0304\u0300`, \u014F: `o\u0306`, \u01D2: `o\u030C`, \u00F4: `o\u0302`, \u1ED1: `o\u0302\u0301`, \u1ED3: `o\u0302\u0300`, \u1ED7: `o\u0302\u0303`, \u022F: `o\u0307`, \u0231: `o\u0307\u0304`, \u0151: `o\u030B`, \u1E55: `p\u0301`, \u1E57: `p\u0307`, \u0155: `r\u0301`, \u0159: `r\u030C`, \u1E59: `r\u0307`, \u0157: `r\u0327`, \u015B: `s\u0301`, \u1E65: `s\u0301\u0307`, \u0161: `s\u030C`, \u1E67: `s\u030C\u0307`, \u015D: `s\u0302`, \u1E61: `s\u0307`, \u015F: `s\u0327`, \u1E97: `t\u0308`, \u0165: `t\u030C`, \u1E6B: `t\u0307`, \u0163: `t\u0327`, \u00FA: `u\u0301`, \u00F9: `u\u0300`, \u00FC: `u\u0308`, \u01D8: `u\u0308\u0301`, \u01DC: `u\u0308\u0300`, \u01D6: `u\u0308\u0304`, \u01DA: `u\u0308\u030C`, \u0169: `u\u0303`, \u1E79: `u\u0303\u0301`, \u016B: `u\u0304`, \u1E7B: `u\u0304\u0308`, \u016D: `u\u0306`, \u01D4: `u\u030C`, \u00FB: `u\u0302`, \u016F: `u\u030A`, \u0171: `u\u030B`, \u1E7D: `v\u0303`, \u1E83: `w\u0301`, \u1E81: `w\u0300`, \u1E85: `w\u0308`, \u0175: `w\u0302`, \u1E87: `w\u0307`, \u1E98: `w\u030A`, \u1E8D: `x\u0308`, \u1E8B: `x\u0307`, \u00FD: `y\u0301`, \u1EF3: `y\u0300`, \u00FF: `y\u0308`, \u1EF9: `y\u0303`, \u0233: `y\u0304`, \u0177: `y\u0302`, \u1E8F: `y\u0307`, \u1E99: `y\u030A`, \u017A: `z\u0301`, \u017E: `z\u030C`, \u1E91: `z\u0302`, \u017C: `z\u0307`, \u00C1: `A\u0301`, \u00C0: `A\u0300`, \u00C4: `A\u0308`, \u01DE: `A\u0308\u0304`, \u00C3: `A\u0303`, \u0100: `A\u0304`, \u0102: `A\u0306`, \u1EAE: `A\u0306\u0301`, \u1EB0: `A\u0306\u0300`, \u1EB4: `A\u0306\u0303`, \u01CD: `A\u030C`, \u00C2: `A\u0302`, \u1EA4: `A\u0302\u0301`, \u1EA6: `A\u0302\u0300`, \u1EAA: `A\u0302\u0303`, \u0226: `A\u0307`, \u01E0: `A\u0307\u0304`, \u00C5: `A\u030A`, \u01FA: `A\u030A\u0301`, \u1E02: `B\u0307`, \u0106: `C\u0301`, \u1E08: `C\u0327\u0301`, \u010C: `C\u030C`, \u0108: `C\u0302`, \u010A: `C\u0307`, \u00C7: `C\u0327`, \u010E: `D\u030C`, \u1E0A: `D\u0307`, \u1E10: `D\u0327`, \u00C9: `E\u0301`, \u00C8: `E\u0300`, \u00CB: `E\u0308`, \u1EBC: `E\u0303`, \u0112: `E\u0304`, \u1E16: `E\u0304\u0301`, \u1E14: `E\u0304\u0300`, \u0114: `E\u0306`, \u1E1C: `E\u0327\u0306`, \u011A: `E\u030C`, \u00CA: `E\u0302`, \u1EBE: `E\u0302\u0301`, \u1EC0: `E\u0302\u0300`, \u1EC4: `E\u0302\u0303`, \u0116: `E\u0307`, \u0228: `E\u0327`, \u1E1E: `F\u0307`, \u01F4: `G\u0301`, \u1E20: `G\u0304`, \u011E: `G\u0306`, \u01E6: `G\u030C`, \u011C: `G\u0302`, \u0120: `G\u0307`, \u0122: `G\u0327`, \u1E26: `H\u0308`, \u021E: `H\u030C`, \u0124: `H\u0302`, \u1E22: `H\u0307`, \u1E28: `H\u0327`, \u00CD: `I\u0301`, \u00CC: `I\u0300`, \u00CF: `I\u0308`, \u1E2E: `I\u0308\u0301`, \u0128: `I\u0303`, \u012A: `I\u0304`, \u012C: `I\u0306`, \u01CF: `I\u030C`, \u00CE: `I\u0302`, \u0130: `I\u0307`, \u0134: `J\u0302`, \u1E30: `K\u0301`, \u01E8: `K\u030C`, \u0136: `K\u0327`, \u0139: `L\u0301`, \u013D: `L\u030C`, \u013B: `L\u0327`, \u1E3E: `M\u0301`, \u1E40: `M\u0307`, \u0143: `N\u0301`, \u01F8: `N\u0300`, \u00D1: `N\u0303`, \u0147: `N\u030C`, \u1E44: `N\u0307`, \u0145: `N\u0327`, \u00D3: `O\u0301`, \u00D2: `O\u0300`, \u00D6: `O\u0308`, \u022A: `O\u0308\u0304`, \u00D5: `O\u0303`, \u1E4C: `O\u0303\u0301`, \u1E4E: `O\u0303\u0308`, \u022C: `O\u0303\u0304`, \u014C: `O\u0304`, \u1E52: `O\u0304\u0301`, \u1E50: `O\u0304\u0300`, \u014E: `O\u0306`, \u01D1: `O\u030C`, \u00D4: `O\u0302`, \u1ED0: `O\u0302\u0301`, \u1ED2: `O\u0302\u0300`, \u1ED6: `O\u0302\u0303`, \u022E: `O\u0307`, \u0230: `O\u0307\u0304`, \u0150: `O\u030B`, \u1E54: `P\u0301`, \u1E56: `P\u0307`, \u0154: `R\u0301`, \u0158: `R\u030C`, \u1E58: `R\u0307`, \u0156: `R\u0327`, \u015A: `S\u0301`, \u1E64: `S\u0301\u0307`, \u0160: `S\u030C`, \u1E66: `S\u030C\u0307`, \u015C: `S\u0302`, \u1E60: `S\u0307`, \u015E: `S\u0327`, \u0164: `T\u030C`, \u1E6A: `T\u0307`, \u0162: `T\u0327`, \u00DA: `U\u0301`, \u00D9: `U\u0300`, \u00DC: `U\u0308`, \u01D7: `U\u0308\u0301`, \u01DB: `U\u0308\u0300`, \u01D5: `U\u0308\u0304`, \u01D9: `U\u0308\u030C`, \u0168: `U\u0303`, \u1E78: `U\u0303\u0301`, \u016A: `U\u0304`, \u1E7A: `U\u0304\u0308`, \u016C: `U\u0306`, \u01D3: `U\u030C`, \u00DB: `U\u0302`, \u016E: `U\u030A`, \u0170: `U\u030B`, \u1E7C: `V\u0303`, \u1E82: `W\u0301`, \u1E80: `W\u0300`, \u1E84: `W\u0308`, \u0174: `W\u0302`, \u1E86: `W\u0307`, \u1E8C: `X\u0308`, \u1E8A: `X\u0307`, \u00DD: `Y\u0301`, \u1EF2: `Y\u0300`, \u0178: `Y\u0308`, \u1EF8: `Y\u0303`, \u0232: `Y\u0304`, \u0176: `Y\u0302`, \u1E8E: `Y\u0307`, \u0179: `Z\u0301`, \u017D: `Z\u030C`, \u1E90: `Z\u0302`, \u017B: `Z\u0307`, \u03AC: `\u03B1\u0301`, \u1F70: `\u03B1\u0300`, \u1FB1: `\u03B1\u0304`, \u1FB0: `\u03B1\u0306`, \u03AD: `\u03B5\u0301`, \u1F72: `\u03B5\u0300`, \u03AE: `\u03B7\u0301`, \u1F74: `\u03B7\u0300`, \u03AF: `\u03B9\u0301`, \u1F76: `\u03B9\u0300`, \u03CA: `\u03B9\u0308`, \u0390: `\u03B9\u0308\u0301`, \u1FD2: `\u03B9\u0308\u0300`, \u1FD1: `\u03B9\u0304`, \u1FD0: `\u03B9\u0306`, \u03CC: `\u03BF\u0301`, \u1F78: `\u03BF\u0300`, \u03CD: `\u03C5\u0301`, \u1F7A: `\u03C5\u0300`, \u03CB: `\u03C5\u0308`, \u03B0: `\u03C5\u0308\u0301`, \u1FE2: `\u03C5\u0308\u0300`, \u1FE1: `\u03C5\u0304`, \u1FE0: `\u03C5\u0306`, \u03CE: `\u03C9\u0301`, \u1F7C: `\u03C9\u0300`, \u038E: `\u03A5\u0301`, \u1FEA: `\u03A5\u0300`, \u03AB: `\u03A5\u0308`, \u1FE9: `\u03A5\u0304`, \u1FE8: `\u03A5\u0306`, \u038F: `\u03A9\u0301`, \u1FFA: `\u03A9\u0300` };
  var va2 = class t5 {
    constructor(e10, t8) {
      this.mode = void 0, this.gullet = void 0, this.settings = void 0, this.leftrightDepth = void 0, this.nextToken = void 0, this.mode = `math`, this.gullet = new pa2(e10, t8, this.mode), this.settings = t8, this.leftrightDepth = 0, this.nextToken = null;
    }
    expect(t8, n4) {
      if (n4 === void 0 && (n4 = true), this.fetch().text !== t8) throw new e2(`Expected '` + t8 + `', got '` + this.fetch().text + `'`, this.fetch());
      n4 && this.consume();
    }
    consume() {
      this.nextToken = null;
    }
    fetch() {
      return this.nextToken ??= this.gullet.expandNextToken(), this.nextToken;
    }
    switchMode(e10) {
      this.mode = e10, this.gullet.switchMode(e10);
    }
    parse() {
      this.settings.globalGroup || this.gullet.beginGroup(), this.settings.colorIsTextColor && this.gullet.macros.set(`\\color`, `\\textcolor`);
      try {
        var e10 = this.parseExpression(false);
        return this.expect(`EOF`), this.settings.globalGroup || this.gullet.endGroup(), e10;
      } finally {
        this.gullet.endGroups();
      }
    }
    subparse(e10) {
      var t8 = this.nextToken;
      this.consume(), this.gullet.pushToken(new ri(`}`)), this.gullet.pushTokens(e10);
      var n4 = this.parseExpression(false);
      return this.expect(`}`), this.nextToken = t8, n4;
    }
    parseExpression(e10, n4) {
      for (var r5 = []; ; ) {
        this.mode === `math` && this.consumeSpaces();
        var i5 = this.fetch();
        if (t5.endOfExpression.has(i5.text) || n4 && i5.text === n4 || e10 && qi2[i5.text] && qi2[i5.text].infix) break;
        var a5 = this.parseAtom(n4);
        if (!a5) break;
        a5.type !== `internal` && r5.push(a5);
      }
      return this.mode === `text` && this.formLigatures(r5), this.handleInfixNodes(r5);
    }
    handleInfixNodes(t8) {
      for (var n4 = -1, r5, i5 = 0; i5 < t8.length; i5++) {
        var a5 = t8[i5];
        if (a5.type === `infix`) {
          if (n4 !== -1) throw new e2(`only one infix operator per group`, a5.token);
          n4 = i5, r5 = a5.replaceWith;
        }
      }
      if (n4 !== -1 && r5) {
        var o5, s6, c4 = t8.slice(0, n4), l4 = t8.slice(n4 + 1);
        return o5 = c4.length === 1 && c4[0].type === `ordgroup` ? c4[0] : { type: `ordgroup`, mode: this.mode, body: c4 }, s6 = l4.length === 1 && l4[0].type === `ordgroup` ? l4[0] : { type: `ordgroup`, mode: this.mode, body: l4 }, [r5 === `\\\\abovefrac` ? this.callFunction(r5, [o5, t8[n4], s6], []) : this.callFunction(r5, [o5, s6], [])];
      }
      return t8;
    }
    handleSupSubscript(t8) {
      var n4 = this.fetch(), r5 = n4.text;
      this.consume(), this.consumeSpaces();
      var i5;
      do
        i5 = this.parseGroup(t8);
      while (i5?.type === `internal`);
      if (!i5) throw new e2(`Expected group after '` + r5 + `'`, n4);
      return i5;
    }
    formatUnsupportedCmd(e10) {
      for (var t8 = [], n4 = 0; n4 < e10.length; n4++) t8.push({ type: `textord`, mode: `text`, text: e10[n4] });
      var r5 = { type: `text`, mode: this.mode, body: t8 };
      return { type: `color`, mode: this.mode, color: this.settings.errorColor, body: [r5] };
    }
    parseAtom(t8) {
      var n4 = this.parseGroup(`atom`, t8);
      if (n4?.type === `internal` || this.mode === `text`) return n4;
      for (var r5, i5; ; ) {
        this.consumeSpaces();
        var a5 = this.fetch();
        if (a5.text === `\\limits` || a5.text === `\\nolimits`) {
          if (n4 && n4.type === `op`) n4.limits = a5.text === `\\limits`, n4.alwaysHandleSupSub = true;
          else if (n4 && n4.type === `operatorname`) n4.alwaysHandleSupSub && (n4.limits = a5.text === `\\limits`);
          else throw new e2(`Limit controls must follow a math operator`, a5);
          this.consume();
        } else if (a5.text === `^`) {
          if (r5) throw new e2(`Double superscript`, a5);
          r5 = this.handleSupSubscript(`superscript`);
        } else if (a5.text === `_`) {
          if (i5) throw new e2(`Double subscript`, a5);
          i5 = this.handleSupSubscript(`subscript`);
        } else if (a5.text === `'`) {
          if (r5) throw new e2(`Double superscript`, a5);
          var o5 = { type: `textord`, mode: this.mode, text: `\\prime` }, s6 = [o5];
          for (this.consume(); this.fetch().text === `'`; ) s6.push(o5), this.consume();
          this.fetch().text === `^` && s6.push(this.handleSupSubscript(`superscript`)), r5 = { type: `ordgroup`, mode: this.mode, body: s6 };
        } else if (ha2[a5.text]) {
          var c4 = ma2.test(a5.text), l4 = [];
          for (l4.push(new ri(ha2[a5.text])), this.consume(); ; ) {
            var u4 = this.fetch().text;
            if (!ha2[u4] || ma2.test(u4) !== c4) break;
            l4.unshift(new ri(ha2[u4])), this.consume();
          }
          var d5 = this.subparse(l4);
          c4 ? i5 = { type: `ordgroup`, mode: `math`, body: d5 } : r5 = { type: `ordgroup`, mode: `math`, body: d5 };
        } else break;
      }
      return r5 || i5 ? { type: `supsub`, mode: this.mode, base: n4, sup: r5, sub: i5 } : n4;
    }
    parseFunction(t8, n4) {
      var r5 = this.fetch(), i5 = r5.text, a5 = qi2[i5];
      if (!a5) return null;
      if (this.consume(), n4 && n4 !== `atom` && !a5.allowedInArgument) throw new e2(`Got function '` + i5 + `' with no arguments` + (n4 ? ` as ` + n4 : ``), r5);
      if (this.mode === `text` && !a5.allowedInText) throw new e2(`Can't use function '` + i5 + `' in text mode`, r5);
      if (this.mode === `math` && a5.allowedInMath === false) throw new e2(`Can't use function '` + i5 + `' in math mode`, r5);
      var { args: o5, optArgs: s6 } = this.parseArguments(i5, a5);
      return this.callFunction(i5, o5, s6, r5, t8);
    }
    callFunction(t8, n4, r5, i5, a5) {
      var o5 = { funcName: t8, parser: this, token: i5, breakOnTokenText: a5 }, s6 = qi2[t8];
      if (s6 && s6.handler) return s6.handler(o5, n4, r5);
      throw new e2(`No function handler for ` + t8);
    }
    parseArguments(t8, n4) {
      var r5 = n4.numArgs + n4.numOptionalArgs;
      if (r5 === 0) return { args: [], optArgs: [] };
      for (var i5 = [], a5 = [], o5 = 0; o5 < r5; o5++) {
        var s6 = n4.argTypes && n4.argTypes[o5], c4 = o5 < n4.numOptionalArgs;
        (`primitive` in n4 && n4.primitive && s6 == null || n4.type === `sqrt` && o5 === 1 && a5[0] == null) && (s6 = `primitive`);
        var l4 = this.parseGroupOfType(`argument to '` + t8 + `'`, s6, c4);
        if (c4) a5.push(l4);
        else if (l4 != null) i5.push(l4);
        else throw new e2(`Null argument, please report this as a bug`);
      }
      return { args: i5, optArgs: a5 };
    }
    parseGroupOfType(t8, n4, r5) {
      switch (n4) {
        case `color`:
          return this.parseColorGroup(r5);
        case `size`:
          return this.parseSizeGroup(r5);
        case `url`:
          return this.parseUrlGroup(r5);
        case `math`:
        case `text`:
          return this.parseArgumentGroup(r5, n4);
        case `hbox`:
          var i5 = this.parseArgumentGroup(r5, `text`);
          return i5 == null ? null : { type: `styling`, mode: i5.mode, body: [i5], style: `text`, resetFont: true };
        case `raw`:
          var a5 = this.parseStringGroup(`raw`, r5);
          return a5 == null ? null : { type: `raw`, mode: `text`, string: a5.text };
        case `primitive`:
          if (r5) throw new e2(`A primitive argument cannot be optional`);
          var o5 = this.parseGroup(t8);
          if (o5 == null) throw new e2(`Expected group as ` + t8, this.fetch());
          return o5;
        case `original`:
        case null:
        case void 0:
          return this.parseArgumentGroup(r5);
        default:
          throw new e2(`Unknown group type as ` + t8, this.fetch());
      }
    }
    consumeSpaces() {
      for (; this.fetch().text === ` `; ) this.consume();
    }
    parseStringGroup(e10, t8) {
      var n4 = this.gullet.scanArgument(t8);
      if (n4 == null) return null;
      for (var r5 = ``, i5; (i5 = this.fetch()).text !== `EOF`; ) r5 += i5.text, this.consume();
      return this.consume(), n4.text = r5, n4;
    }
    parseRegexGroup(t8, n4) {
      for (var r5 = this.fetch(), i5 = r5, a5 = ``, o5; (o5 = this.fetch()).text !== `EOF` && t8.test(a5 + o5.text); ) i5 = o5, a5 += i5.text, this.consume();
      if (a5 === ``) throw new e2(`Invalid ` + n4 + `: '` + r5.text + `'`, r5);
      return r5.range(i5, a5);
    }
    parseColorGroup(t8) {
      var n4 = this.parseStringGroup(`color`, t8);
      if (n4 == null) return null;
      var r5 = /^(#[a-f0-9]{3,4}|#[a-f0-9]{6}|#[a-f0-9]{8}|[a-f0-9]{6}|[a-z]+)$/i.exec(n4.text);
      if (!r5) throw new e2(`Invalid color: '` + n4.text + `'`, n4);
      var i5 = r5[0];
      return /^[0-9a-f]{6}$/i.test(i5) && (i5 = `#` + i5), { type: `color-token`, mode: this.mode, color: i5 };
    }
    parseSizeGroup(t8) {
      var n4, r5 = false;
      if (this.gullet.consumeSpaces(), n4 = !t8 && this.gullet.future().text !== `{` ? this.parseRegexGroup(/^[-+]? *(?:$|\d+|\d+\.\d*|\.\d*) *[a-z]{0,2} *$/, `size`) : this.parseStringGroup(`size`, t8), !n4) return null;
      !t8 && n4.text.length === 0 && (n4.text = `0pt`, r5 = true);
      var i5 = /([-+]?) *(\d+(?:\.\d*)?|\.\d+) *([a-z]{2})/.exec(n4.text);
      if (!i5) throw new e2(`Invalid size: '` + n4.text + `'`, n4);
      var a5 = { number: +(i5[1] + i5[2]), unit: i5[3] };
      if (!Te2(a5)) throw new e2(`Invalid unit: '` + a5.unit + `'`, n4);
      return { type: `size`, mode: this.mode, value: a5, isBlank: r5 };
    }
    parseUrlGroup(e10) {
      this.gullet.lexer.setCatcode(`%`, 13), this.gullet.lexer.setCatcode(`~`, 12);
      var t8 = this.parseStringGroup(`url`, e10);
      if (this.gullet.lexer.setCatcode(`%`, 14), this.gullet.lexer.setCatcode(`~`, 13), t8 == null) return null;
      var n4 = t8.text.replace(/\\([#$%&~_^{}])/g, `$1`);
      return { type: `url`, mode: this.mode, url: n4 };
    }
    parseArgumentGroup(e10, t8) {
      var n4 = this.gullet.scanArgument(e10);
      if (n4 == null) return null;
      var r5 = this.mode;
      t8 && this.switchMode(t8), this.gullet.beginGroup();
      var i5 = this.parseExpression(false, `EOF`);
      this.expect(`EOF`), this.gullet.endGroup();
      var a5 = { type: `ordgroup`, mode: this.mode, loc: n4.loc, body: i5 };
      return t8 && this.switchMode(r5), a5;
    }
    parseGroup(t8, n4) {
      var r5 = this.fetch(), i5 = r5.text, a5;
      if (i5 === `{` || i5 === `\\begingroup`) {
        this.consume();
        var o5 = i5 === `{` ? `}` : `\\endgroup`;
        this.gullet.beginGroup();
        var s6 = this.parseExpression(false, o5), c4 = this.fetch();
        this.expect(o5), this.gullet.endGroup(), a5 = { type: `ordgroup`, mode: this.mode, loc: ni.range(r5, c4), body: s6, semisimple: i5 === `\\begingroup` || void 0 };
      } else if (a5 = this.parseFunction(n4, t8) || this.parseSymbol(), a5 == null && i5[0] === `\\` && !fa2.hasOwnProperty(i5)) {
        if (this.settings.throwOnError) throw new e2(`Undefined control sequence: ` + i5, r5);
        a5 = this.formatUnsupportedCmd(i5), this.consume();
      }
      return a5;
    }
    formLigatures(e10) {
      for (var t8 = e10.length - 1, n4 = 0; n4 < t8; ++n4) {
        var r5 = e10[n4];
        if (r5.type === `textord`) {
          var i5 = r5.text, a5 = e10[n4 + 1];
          if (!(!a5 || a5.type !== `textord`)) {
            if (i5 === `-` && a5.text === `-`) {
              var o5 = e10[n4 + 2];
              n4 + 1 < t8 && o5 && o5.type === `textord` && o5.text === `-` ? (e10.splice(n4, 3, { type: `textord`, mode: `text`, loc: ni.range(r5, o5), text: `---` }), t8 -= 2) : (e10.splice(n4, 2, { type: `textord`, mode: `text`, loc: ni.range(r5, a5), text: `--` }), --t8);
            }
            (i5 === `'` || i5 === "`") && a5.text === i5 && (e10.splice(n4, 2, { type: `textord`, mode: `text`, loc: ni.range(r5, a5), text: i5 + i5 }), --t8);
          }
        }
      }
    }
    parseSymbol() {
      var t8 = this.fetch(), n4 = t8.text;
      if (/^\\verb[^a-zA-Z]/.test(n4)) {
        this.consume();
        var r5 = n4.slice(5), i5 = r5.charAt(0) === `*`;
        if (i5 && (r5 = r5.slice(1)), r5.length < 2 || r5.charAt(0) !== r5.slice(-1)) throw new e2(`\\verb assertion failed --
                    please report what input caused this bug`);
        return r5 = r5.slice(1, -1), { type: `verb`, mode: `text`, body: r5, star: i5 };
      }
      _a2.hasOwnProperty(n4[0]) && !A2[this.mode][n4[0]] && (this.settings.strict && this.mode === `math` && this.settings.reportNonstrict(`unicodeTextInMathMode`, `Accented Unicode text character "` + n4[0] + `" used in math mode`, t8), n4 = _a2[n4[0]] + n4.slice(1));
      var a5 = ea2.exec(n4);
      a5 && (n4 = n4.substring(0, a5.index), n4 === `i` ? n4 = `\u0131` : n4 === `j` && (n4 = `\u0237`));
      var o5;
      if (A2[this.mode][n4]) {
        this.settings.strict && this.mode === `math` && mt4.includes(n4) && this.settings.reportNonstrict(`unicodeTextInMathMode`, `Latin-1/Unicode text character "` + n4[0] + `" used in math mode`, t8);
        var s6 = A2[this.mode][n4].group, c4 = ni.range(t8);
        o5 = Jn2(s6) ? { type: `atom`, mode: this.mode, family: s6, loc: c4, text: n4 } : { type: s6, mode: this.mode, loc: c4, text: n4 };
      } else if (n4.charCodeAt(0) >= 128) this.settings.strict && (ce2(n4.charCodeAt(0)) ? this.mode === `math` && this.settings.reportNonstrict(`unicodeTextInMathMode`, `Unicode text character "` + n4[0] + `" used in math mode`, t8) : this.settings.reportNonstrict(`unknownSymbol`, `Unrecognized Unicode character "` + n4[0] + `"` + (` (` + n4.charCodeAt(0) + `)`), t8)), o5 = { type: `textord`, mode: `text`, loc: ni.range(t8), text: n4 };
      else return null;
      if (this.consume(), a5) for (var l4 = 0; l4 < a5[0].length; l4++) {
        var u4 = a5[0][l4];
        if (!ga2[u4]) throw new e2(`Unknown accent ' ` + u4 + `'`, t8);
        var d5 = ga2[u4][this.mode] || ga2[u4].text;
        if (!d5) throw new e2(`Accent ` + u4 + ` unsupported in ` + this.mode + ` mode`, t8);
        o5 = { type: `accent`, mode: this.mode, loc: ni.range(t8), label: d5, isStretchy: false, isShifty: true, base: o5 };
      }
      return o5;
    }
  };
  va2.endOfExpression = /* @__PURE__ */ new Set([`}`, `\\endgroup`, `\\end`, `\\right`, `&`]);
  var ya2 = function(t8, n4) {
    if (!(typeof t8 == `string` || t8 instanceof String)) throw TypeError(`KaTeX can only parse string typed expression`);
    var r5 = new va2(t8, n4);
    delete r5.gullet.macros.current[`\\df@tag`];
    var i5 = r5.parse();
    if (delete r5.gullet.macros.current[`\\current@color`], delete r5.gullet.macros.current[`\\color`], r5.gullet.macros.get(`\\df@tag`)) {
      if (!n4.displayMode) throw new e2(`\\tag works only in display equations`);
      i5 = [{ type: `tag`, mode: `text`, body: i5, tag: r5.subparse([new ri(`\\df@tag`)]) }];
    }
    return i5;
  };
  var ba2 = function(e10, t8, n4) {
    t8.textContent = ``;
    var r5 = wa2(e10, n4).toNode();
    t8.appendChild(r5);
  };
  typeof document < `u` && document.compatMode !== `CSS1Compat` && (typeof console < `u` && console.warn(`Warning: KaTeX doesn't work in quirks mode. Make sure your website has a suitable doctype.`), ba2 = function() {
    throw new e2(`KaTeX doesn't work in quirks mode.`);
  });
  var xa2 = function(e10, t8) {
    return wa2(e10, t8).toMarkup();
  };
  var Sa2 = function(e10, t8) {
    return ya2(e10, new m2(t8));
  };
  var Ca2 = function(t8, n4, r5) {
    if (r5.throwOnError || !(t8 instanceof e2)) throw t8;
    var i5 = W2([`katex-error`], [new Ie2(n4)]);
    return i5.setAttribute(`title`, t8.toString()), i5.setAttribute(`style`, `color:` + r5.errorColor), i5;
  };
  var wa2 = function(e10, t8) {
    var n4 = new m2(t8);
    try {
      return Rn2(ya2(e10, n4), e10, n4);
    } catch (t9) {
      return Ca2(t9, e10, n4);
    }
  };
  var Ta2 = { version: `0.16.47`, render: ba2, renderToString: xa2, ParseError: e2, SETTINGS_SCHEMA: u2, __parse: Sa2, __renderToDomTree: wa2, __renderToHTMLTree: function(e10, t8) {
    var n4 = new m2(t8);
    try {
      return zn2(ya2(e10, n4), e10, n4);
    } catch (t9) {
      return Ca2(t9, e10, n4);
    }
  }, __setFontMetrics: Ke2, __defineSymbol: j2, __defineFunction: q2, __defineMacro: $2, __domTree: { Span: Me2, Anchor: Ne2, SymbolNode: Ie2, SvgNode: Le2, PathNode: Re2, LineNode: ze2 } };

  // master-cms-mockup/vendor/omr-preview/source/8uJXABZy.js
  var s3 = Object.assign(Sr({ __name: `MathView`, props: { latex: {}, displayMode: { type: Boolean }, fullSizeFraction: { type: Boolean } }, setup(i5) {
    let s6 = i5, c4 = Gt(null), l4 = () => {
      if (!c4.value) return;
      let e10 = s6.latex || ``;
      Ta2.render(s6.fullSizeFraction ? `\\displaystyle ${e10}` : e10, c4.value, { throwOnError: false, displayMode: s6.displayMode === true });
    };
    return si(l4), Gn(() => [s6.latex, s6.displayMode], l4), (e10, t8) => (no(), so(`span`, { ref_key: `el`, ref: c4, class: `math-view` }, null, 512));
  } }), { __name: `MathView` });

  // master-cms-mockup/vendor/omr-preview/source/CNs_Ozdc.js
  var e7 = (e10) => {
  };

  // master-cms-mockup/vendor/omr-preview/source/Dn7CRAow.js
  var D3 = void 0;
  var ce3 = typeof window < `u` && window.trustedTypes;
  if (ce3) try {
    D3 = ce3.createPolicy(`vue`, { createHTML: (e10) => e10 });
  } catch {
  }
  var le3 = D3 ? (e10) => D3.createHTML(e10) : (e10) => e10;
  var ue3 = `http://www.w3.org/2000/svg`;
  var de3 = `http://www.w3.org/1998/Math/MathML`;
  var O3 = typeof document < `u` ? document : null;
  var k3 = O3 && O3.createElement(`template`);
  var fe3 = { insert: (e10, t8, n4) => {
    t8.insertBefore(e10, n4 || null);
  }, remove: (e10) => {
    let t8 = e10.parentNode;
    t8 && t8.removeChild(e10);
  }, createElement: (e10, t8, n4, r5) => {
    let i5 = t8 === `svg` ? O3.createElementNS(ue3, e10) : t8 === `mathml` ? O3.createElementNS(de3, e10) : n4 ? O3.createElement(e10, { is: n4 }) : O3.createElement(e10);
    return e10 === `select` && r5 && r5.multiple != null && i5.setAttribute(`multiple`, r5.multiple), i5;
  }, createText: (e10) => O3.createTextNode(e10), createComment: (e10) => O3.createComment(e10), setText: (e10, t8) => {
    e10.nodeValue = t8;
  }, setElementText: (e10, t8) => {
    e10.textContent = t8;
  }, parentNode: (e10) => e10.parentNode, nextSibling: (e10) => e10.nextSibling, querySelector: (e10) => O3.querySelector(e10), setScopeId(e10, t8) {
    e10.setAttribute(t8, ``);
  }, insertStaticContent(e10, t8, n4, r5, i5, a5) {
    let o5 = n4 ? n4.previousSibling : t8.lastChild;
    if (i5 && (i5 === a5 || i5.nextSibling)) for (; t8.insertBefore(i5.cloneNode(true), n4), !(i5 === a5 || !(i5 = i5.nextSibling)); ) ;
    else {
      k3.innerHTML = le3(r5 === `svg` ? `<svg>${e10}</svg>` : r5 === `mathml` ? `<math>${e10}</math>` : e10);
      let i6 = k3.content;
      if (r5 === `svg` || r5 === `mathml`) {
        let e11 = i6.firstChild;
        for (; e11.firstChild; ) i6.appendChild(e11.firstChild);
        i6.removeChild(e11);
      }
      t8.insertBefore(i6, n4);
    }
    return [o5 ? o5.nextSibling : t8.firstChild, n4 ? n4.previousSibling : t8.lastChild];
  } };
  var A3 = `transition`;
  var j3 = `animation`;
  var M3 = Symbol(`_vtc`);
  var pe3 = { name: String, type: String, css: { type: Boolean, default: true }, duration: [String, Number, Object], enterFromClass: String, enterActiveClass: String, enterToClass: String, appearFromClass: String, appearActiveClass: String, appearToClass: String, leaveFromClass: String, leaveActiveClass: String, leaveToClass: String };
  var me3 = s({}, dr, pe3);
  var he3 = ((e10) => (e10.displayName = `Transition`, e10.props = me3, e10))((e10, { slots: t8 }) => Wo(hr, _e3(e10), t8));
  var N3 = (e10, t8 = []) => {
    d(e10) ? e10.forEach((e11) => e11(...t8)) : e10 && e10(...t8);
  };
  var ge3 = (e10) => e10 ? d(e10) ? e10.some((e11) => e11.length > 1) : e10.length > 1 : false;
  function _e3(e10) {
    let t8 = {};
    for (let n5 in e10) n5 in pe3 || (t8[n5] = e10[n5]);
    if (e10.css === false) return t8;
    let { name: n4 = `v`, type: r5, duration: i5, enterFromClass: a5 = `${n4}-enter-from`, enterActiveClass: o5 = `${n4}-enter-active`, enterToClass: s6 = `${n4}-enter-to`, appearFromClass: c4 = a5, appearActiveClass: l4 = o5, appearToClass: u4 = s6, leaveFromClass: d5 = `${n4}-leave-from`, leaveActiveClass: f6 = `${n4}-leave-active`, leaveToClass: p4 = `${n4}-leave-to` } = e10, m5 = ve3(i5), h5 = m5 && m5[0], g6 = m5 && m5[1], { onBeforeEnter: _6, onEnter: v7, onEnterCancelled: y7, onLeave: b6, onLeaveCancelled: x5, onBeforeAppear: ee4 = _6, onAppear: te4 = v7, onAppearCancelled: ne4 = y7 } = t8, S5 = (e11, t9, n5, r6) => {
      e11._enterCancelled = r6, I3(e11, t9 ? u4 : s6), I3(e11, t9 ? l4 : o5), n5 && n5();
    }, C4 = (e11, t9) => {
      e11._isLeaving = false, I3(e11, d5), I3(e11, p4), I3(e11, f6), t9 && t9();
    }, w3 = (e11) => (t9, n5) => {
      let i6 = e11 ? te4 : v7, o6 = () => S5(t9, e11, n5);
      N3(i6, [t9, o6]), ye3(() => {
        I3(t9, e11 ? c4 : a5), F3(t9, e11 ? u4 : s6), ge3(i6) || xe3(t9, r5, h5, o6);
      });
    };
    return s(t8, { onBeforeEnter(e11) {
      N3(_6, [e11]), F3(e11, a5), F3(e11, o5);
    }, onBeforeAppear(e11) {
      N3(ee4, [e11]), F3(e11, c4), F3(e11, l4);
    }, onEnter: w3(false), onAppear: w3(true), onLeave(e11, t9) {
      e11._isLeaving = true;
      let n5 = () => C4(e11, t9);
      F3(e11, d5), e11._enterCancelled ? (F3(e11, f6), z3(e11)) : (z3(e11), F3(e11, f6)), ye3(() => {
        e11._isLeaving && (I3(e11, d5), F3(e11, p4), ge3(b6) || xe3(e11, r5, g6, n5));
      }), N3(b6, [e11, n5]);
    }, onEnterCancelled(e11) {
      S5(e11, false, void 0, true), N3(y7, [e11]);
    }, onAppearCancelled(e11) {
      S5(e11, true, void 0, true), N3(ne4, [e11]);
    }, onLeaveCancelled(e11) {
      C4(e11), N3(x5, [e11]);
    } });
  }
  function ve3(e10) {
    if (e10 == null) return null;
    if (y(e10)) return [P3(e10.enter), P3(e10.leave)];
    {
      let t8 = P3(e10);
      return [t8, t8];
    }
  }
  function P3(e10) {
    return oe(e10);
  }
  function F3(e10, t8) {
    t8.split(/\s+/).forEach((t9) => t9 && e10.classList.add(t9)), (e10[M3] || (e10[M3] = /* @__PURE__ */ new Set())).add(t8);
  }
  function I3(e10, t8) {
    t8.split(/\s+/).forEach((t9) => t9 && e10.classList.remove(t9));
    let n4 = e10[M3];
    n4 && (n4.delete(t8), n4.size || (e10[M3] = void 0));
  }
  function ye3(e10) {
    requestAnimationFrame(() => {
      requestAnimationFrame(e10);
    });
  }
  var be3 = 0;
  function xe3(e10, t8, n4, r5) {
    let i5 = e10._endId = ++be3, a5 = () => {
      i5 === e10._endId && r5();
    };
    if (n4 != null) return setTimeout(a5, n4);
    let { type: o5, timeout: s6, propCount: c4 } = Se3(e10, t8);
    if (!o5) return r5();
    let l4 = o5 + `end`, u4 = 0, d5 = () => {
      e10.removeEventListener(l4, f6), a5();
    }, f6 = (t9) => {
      t9.target === e10 && ++u4 >= c4 && d5();
    };
    setTimeout(() => {
      u4 < c4 && d5();
    }, s6 + 1), e10.addEventListener(l4, f6);
  }
  function Se3(e10, t8) {
    let n4 = window.getComputedStyle(e10), r5 = (e11) => (n4[e11] || ``).split(`, `), i5 = r5(`${A3}Delay`), a5 = r5(`${A3}Duration`), o5 = L3(i5, a5), s6 = r5(`${j3}Delay`), c4 = r5(`${j3}Duration`), l4 = L3(s6, c4), u4 = null, d5 = 0, f6 = 0;
    t8 === A3 ? o5 > 0 && (u4 = A3, d5 = o5, f6 = a5.length) : t8 === j3 ? l4 > 0 && (u4 = j3, d5 = l4, f6 = c4.length) : (d5 = Math.max(o5, l4), u4 = d5 > 0 ? o5 > l4 ? A3 : j3 : null, f6 = u4 ? u4 === A3 ? a5.length : c4.length : 0);
    let p4 = u4 === A3 && /\b(?:transform|all)(?:,|$)/.test(r5(`${A3}Property`).toString());
    return { type: u4, timeout: d5, propCount: f6, hasTransform: p4 };
  }
  function L3(e10, t8) {
    for (; e10.length < t8.length; ) e10 = e10.concat(e10);
    return Math.max(...t8.map((t9, n4) => R3(t9) + R3(e10[n4])));
  }
  function R3(e10) {
    return e10 === `auto` ? 0 : Number(e10.slice(0, -1).replace(`,`, `.`)) * 1e3;
  }
  function z3(e10) {
    return (e10 ? e10.ownerDocument : document).body.offsetHeight;
  }
  function Ce3(e10, t8, n4) {
    let r5 = e10[M3];
    r5 && (t8 = (t8 ? [t8, ...r5] : [...r5]).join(` `)), t8 == null ? e10.removeAttribute(`class`) : n4 ? e10.setAttribute(`class`, t8) : e10.className = t8;
  }
  var B3 = Symbol(`_vod`);
  var V3 = Symbol(`_vsh`);
  var we3 = { name: `show`, beforeMount(e10, { value: t8 }, { transition: n4 }) {
    e10[B3] = e10.style.display === `none` ? `` : e10.style.display, n4 && t8 ? n4.beforeEnter(e10) : H2(e10, t8);
  }, mounted(e10, { value: t8 }, { transition: n4 }) {
    n4 && t8 && n4.enter(e10);
  }, updated(e10, { value: t8, oldValue: n4 }, { transition: r5 }) {
    !t8 != !n4 && (r5 ? t8 ? (r5.beforeEnter(e10), H2(e10, true), r5.enter(e10)) : r5.leave(e10, () => {
      H2(e10, false);
    }) : H2(e10, t8));
  }, beforeUnmount(e10, { value: t8 }) {
    H2(e10, t8);
  } };
  function H2(e10, t8) {
    e10.style.display = t8 ? e10[B3] : `none`, e10[V3] = !t8;
  }
  var Te3 = Symbol(``);
  var Ee2 = /(?:^|;)\s*display\s*:/;
  function De3(e10, t8, n4) {
    let r5 = e10.style, i5 = _(n4), a5 = false;
    if (n4 && !i5) {
      if (t8) {
        if (_(t8)) for (let e11 of t8.split(`;`)) {
          let t9 = e11.slice(0, e11.indexOf(`:`)).trim();
          n4[t9] ?? U2(r5, t9, ``);
        }
        else for (let e11 in t8) n4[e11] ?? U2(r5, e11, ``);
      }
      for (let i6 in n4) {
        i6 === `display` && (a5 = true);
        let o5 = n4[i6];
        o5 == null ? U2(r5, i6, ``) : je3(e10, i6, !_(t8) && t8 ? t8[i6] : void 0, o5) || U2(r5, i6, o5);
      }
    } else if (i5) {
      if (t8 !== n4) {
        let e11 = r5[Te3];
        e11 && (n4 += `;` + e11), r5.cssText = n4, a5 = Ee2.test(n4);
      }
    } else t8 && e10.removeAttribute(`style`);
    B3 in e10 && (e10[B3] = a5 ? r5.display : ``, e10[V3] && (r5.display = `none`));
  }
  var Oe2 = /\s*!important$/;
  function U2(e10, t8, n4) {
    if (d(n4)) n4.forEach((n5) => U2(e10, t8, n5));
    else if (n4 ??= ``, t8.startsWith(`--`)) e10.setProperty(t8, n4);
    else {
      let r5 = Ae3(e10, t8);
      Oe2.test(n4) ? e10.setProperty(k(r5), n4.replace(Oe2, ``), `important`) : e10[r5] = n4;
    }
  }
  var ke3 = [`Webkit`, `Moz`, `ms`];
  var W3 = {};
  function Ae3(e10, t8) {
    let n4 = W3[t8];
    if (n4) return n4;
    let r5 = O(t8);
    if (r5 !== `filter` && r5 in e10) return W3[t8] = r5;
    r5 = ne(r5);
    for (let n5 = 0; n5 < ke3.length; n5++) {
      let i5 = ke3[n5] + r5;
      if (i5 in e10) return W3[t8] = i5;
    }
    return t8;
  }
  function je3(e10, t8, n4, r5) {
    return e10.tagName === `TEXTAREA` && (t8 === `width` || t8 === `height`) && _(r5) && n4 === r5;
  }
  var Me3 = `http://www.w3.org/1999/xlink`;
  function Ne3(e10, t8, r5, i5, a5, o5 = ge(t8)) {
    i5 && t8.startsWith(`xlink:`) ? r5 == null ? e10.removeAttributeNS(Me3, t8.slice(6, t8.length)) : e10.setAttributeNS(Me3, t8, r5) : r5 == null || o5 && !_e(r5) ? e10.removeAttribute(t8) : e10.setAttribute(t8, o5 ? `` : v(r5) ? String(r5) : r5);
  }
  function Pe3(e10, t8, r5, i5, a5) {
    if (t8 === `innerHTML` || t8 === `textContent`) {
      r5 != null && (e10[t8] = t8 === `innerHTML` ? le3(r5) : r5);
      return;
    }
    let o5 = e10.tagName;
    if (t8 === `value` && o5 !== `PROGRESS` && !o5.includes(`-`)) {
      let n4 = o5 === `OPTION` ? e10.getAttribute(`value`) || `` : e10.value, i6 = r5 == null ? e10.type === `checkbox` ? `on` : `` : String(r5);
      (n4 !== i6 || !(`_value` in e10)) && (e10.value = i6), r5 ?? e10.removeAttribute(t8), e10._value = r5;
      return;
    }
    let s6 = false;
    if (r5 === `` || r5 == null) {
      let i6 = typeof e10[t8];
      i6 === `boolean` ? r5 = _e(r5) : r5 == null && i6 === `string` ? (r5 = ``, s6 = true) : i6 === `number` && (r5 = 0, s6 = true);
    }
    try {
      e10[t8] = r5;
    } catch {
    }
    s6 && e10.removeAttribute(a5 || t8);
  }
  function G3(e10, t8, n4, r5) {
    e10.addEventListener(t8, n4, r5);
  }
  function Fe3(e10, t8, n4, r5) {
    e10.removeEventListener(t8, n4, r5);
  }
  var Ie3 = Symbol(`_vei`);
  function Le3(e10, t8, n4, r5, i5 = null) {
    let a5 = e10[Ie3] || (e10[Ie3] = {}), o5 = a5[t8];
    if (r5 && o5) o5.value = r5;
    else {
      let [n5, s6] = Be3(t8);
      r5 ? G3(e10, n5, a5[t8] = We3(r5, i5), s6) : o5 && (Fe3(e10, n5, o5, s6), a5[t8] = void 0);
    }
  }
  var Re3 = /(Once|Passive|Capture)$/;
  var ze3 = /^on:?(?:Once|Passive|Capture)$/;
  function Be3(e10) {
    let t8, n4;
    for (; (n4 = e10.match(Re3)) && !ze3.test(e10); ) t8 ||= {}, e10 = e10.slice(0, e10.length - n4[1].length), t8[n4[1].toLowerCase()] = true;
    return [e10[2] === `:` ? e10.slice(3) : k(e10.slice(2)), t8];
  }
  var Ve3 = 0;
  var He3 = Promise.resolve();
  var Ue3 = () => Ve3 ||= (He3.then(() => Ve3 = 0), Date.now());
  function We3(e10, t8) {
    let n4 = (e11) => {
      if (!e11._vts) e11._vts = Date.now();
      else if (e11._vts <= n4.attached) return;
      let r5 = n4.value;
      if (d(r5)) {
        let n5 = e11.stopImmediatePropagation;
        e11.stopImmediatePropagation = () => {
          n5.call(e11), e11._stopped = true;
        };
        let i5 = r5.slice(), a5 = [e11];
        for (let n6 = 0; n6 < i5.length && !e11._stopped; n6++) {
          let e12 = i5[n6];
          e12 && B(e12, t8, 5, a5);
        }
      } else B(r5, t8, 5, [e11]);
    };
    return n4.value = e10, n4.attached = Ue3(), n4;
  }
  var Ge3 = (e10) => e10.charCodeAt(0) === 111 && e10.charCodeAt(1) === 110 && e10.charCodeAt(2) > 96 && e10.charCodeAt(2) < 123;
  var Ke3 = (e10, t8, n4, i5, a5, o5) => {
    let s6 = a5 === `svg`;
    t8 === `class` ? Ce3(e10, i5, s6) : t8 === `style` ? De3(e10, n4, i5) : a(t8) ? o(t8) || Le3(e10, t8, n4, i5, o5) : (t8[0] === `.` ? (t8 = t8.slice(1), true) : t8[0] === `^` ? (t8 = t8.slice(1), false) : qe3(e10, t8, i5, s6)) ? (Pe3(e10, t8, i5), !e10.tagName.includes(`-`) && (t8 === `value` || t8 === `checked` || t8 === `selected`) && Ne3(e10, t8, i5, s6, o5, t8 !== `value`)) : e10._isVueCE && (Je3(e10, t8) || e10._def.__asyncLoader && (/[A-Z]/.test(t8) || !_(i5))) ? Pe3(e10, O(t8), i5, o5, t8) : (t8 === `true-value` ? e10._trueValue = i5 : t8 === `false-value` && (e10._falseValue = i5), Ne3(e10, t8, i5, s6));
  };
  function qe3(e10, t8, n4, r5) {
    if (r5) return !!(t8 === `innerHTML` || t8 === `textContent` || t8 in e10 && Ge3(t8) && g(n4));
    if (t8 === `spellcheck` || t8 === `draggable` || t8 === `translate` || t8 === `autocorrect` || t8 === `sandbox` && e10.tagName === `IFRAME` || t8 === `form` || t8 === `list` && e10.tagName === `INPUT` || t8 === `type` && e10.tagName === `TEXTAREA`) return false;
    if (t8 === `width` || t8 === `height`) {
      let t9 = e10.tagName;
      if (t9 === `IMG` || t9 === `VIDEO` || t9 === `CANVAS` || t9 === `SOURCE`) return false;
    }
    return Ge3(t8) && _(n4) ? false : t8 in e10;
  }
  function Je3(e10, t8) {
    let n4 = e10._def.props;
    if (!n4) return false;
    let r5 = O(t8);
    return Array.isArray(n4) ? n4.some((e11) => O(e11) === r5) : Object.keys(n4).some((e11) => O(e11) === r5);
  }
  var Ye3 = /* @__PURE__ */ new WeakMap();
  var Xe3 = /* @__PURE__ */ new WeakMap();
  var K3 = Symbol(`_moveCb`);
  var Ze3 = Symbol(`_enterCb`);
  var Qe3 = ((e10) => (delete e10.props.mode, e10))({ name: `TransitionGroup`, props: s({}, me3, { tag: String, moveClass: String }), setup(e10, { slots: n4 }) {
    let r5 = Do(), i5 = ur(), a5, o5;
    return li(() => {
      if (!a5.length) return;
      let t8 = e10.moveClass || `${e10.name || `v`}-move`;
      if (!nt(a5[0].el, r5.vnode.el, t8)) {
        a5 = [];
        return;
      }
      a5.forEach($e3), a5.forEach(et3);
      let n5 = a5.filter(tt3);
      z3(r5.vnode.el), n5.forEach((e11) => {
        let n6 = e11.el, r6 = n6.style;
        F3(n6, t8), r6.transform = r6.webkitTransform = r6.transitionDuration = ``;
        let i6 = n6[K3] = (e12) => {
          e12 && e12.target !== n6 || (!e12 || e12.propertyName.endsWith(`transform`)) && (n6.removeEventListener(`transitionend`, i6), n6[K3] = null, I3(n6, t8));
        };
        n6.addEventListener(`transitionend`, i6);
      }), a5 = [];
    }), () => {
      let c4 = L(e10), l4 = _e3(c4), u4 = c4.tag || q;
      if (a5 = [], o5) for (let e11 = 0; e11 < o5.length; e11++) {
        let t8 = o5[e11];
        t8.el && t8.el instanceof Element && !t8.el[V3] && (a5.push(t8), br(t8, _r(t8, l4, i5, r5)), Ye3.set(t8, q3(t8.el)));
      }
      o5 = n4.default ? xr(n4.default()) : [];
      for (let e11 = 0; e11 < o5.length; e11++) {
        let t8 = o5[e11];
        t8.key != null && br(t8, _r(t8, l4, i5, r5));
      }
      return X(u4, null, o5);
    };
  } });
  function $e3(e10) {
    let t8 = e10.el;
    t8[K3] && t8[K3](), t8[Ze3] && t8[Ze3]();
  }
  function et3(e10) {
    Xe3.set(e10, q3(e10.el));
  }
  function tt3(e10) {
    let t8 = Ye3.get(e10), n4 = Xe3.get(e10), r5 = t8.left - n4.left, i5 = t8.top - n4.top;
    if (r5 || i5) {
      let t9 = e10.el, n5 = t9.style, a5 = t9.getBoundingClientRect(), o5 = 1, s6 = 1;
      return t9.offsetWidth && (o5 = a5.width / t9.offsetWidth), t9.offsetHeight && (s6 = a5.height / t9.offsetHeight), (!Number.isFinite(o5) || o5 === 0) && (o5 = 1), (!Number.isFinite(s6) || s6 === 0) && (s6 = 1), Math.abs(o5 - 1) < 0.01 && (o5 = 1), Math.abs(s6 - 1) < 0.01 && (s6 = 1), n5.transform = n5.webkitTransform = `translate(${r5 / o5}px,${i5 / s6}px)`, n5.transitionDuration = `0s`, e10;
    }
  }
  function q3(e10) {
    let t8 = e10.getBoundingClientRect();
    return { left: t8.left, top: t8.top };
  }
  function nt(e10, t8, n4) {
    let r5 = e10.cloneNode(), i5 = e10[M3];
    i5 && i5.forEach((e11) => {
      e11.split(/\s+/).forEach((e12) => e12 && r5.classList.remove(e12));
    }), n4.split(/\s+/).forEach((e11) => e11 && r5.classList.add(e11)), r5.style.display = `none`;
    let a5 = t8.nodeType === 1 ? t8 : t8.parentNode;
    a5.appendChild(r5);
    let { hasTransform: o5 } = Se3(r5);
    return a5.removeChild(r5), o5;
  }
  var J3 = (e10) => {
    let t8 = e10.props[`onUpdate:modelValue`] || false;
    return d(t8) ? (e11) => j(t8, e11) : t8;
  };
  function rt2(e10) {
    e10.target.composing = true;
  }
  function it2(e10) {
    let t8 = e10.target;
    t8.composing && (t8.composing = false, t8.dispatchEvent(new Event(`input`)));
  }
  var Y3 = Symbol(`_assign`);
  var X3 = Symbol(`_initialValue`);
  function Z3(e10, t8, n4) {
    return t8 && (e10 = e10.trim()), n4 && (e10 = ae(e10)), e10;
  }
  var at2 = { created(e10, { modifiers: { lazy: t8, trim: n4, number: r5 } }, i5) {
    e10.parentNode && (e10.type === `text` ? e10[X3] = e10.defaultValue.replace(/[\r\n]/g, ``) : e10.type === `textarea` && (e10[X3] = e10.defaultValue.replace(/\r\n?/g, `
`))), e10[Y3] = J3(i5);
    let a5 = r5 || i5.props && i5.props.type === `number`;
    G3(e10, t8 ? `change` : `input`, (t9) => {
      t9.target.composing || e10[Y3](Z3(e10.value, n4, a5));
    }), (n4 || a5) && G3(e10, `change`, () => {
      e10.value = Z3(e10.value, n4, a5);
    }), t8 || (G3(e10, `compositionstart`, rt2), G3(e10, `compositionend`, it2), G3(e10, `change`, it2));
  }, mounted(e10, { value: t8, modifiers: { trim: n4, number: r5 } }) {
    let i5 = t8 ?? ``, a5 = e10[X3];
    delete e10[X3], a5 !== void 0 && (e10.type === `text` || e10.type === `textarea`) && e10.value !== a5 ? e10[Y3](Z3(e10.value, n4, r5)) : e10.value = i5;
  }, beforeUpdate(e10, { value: t8, oldValue: n4, modifiers: { lazy: r5, trim: i5, number: a5 } }, o5) {
    if (e10[Y3] = J3(o5), e10.composing) return;
    let s6 = (a5 || e10.type === `number`) && !/^0\d/.test(e10.value) ? ae(e10.value) : e10.value, l4 = t8 ?? ``;
    if (s6 === l4) return;
    let u4 = e10.getRootNode();
    (u4 instanceof Document || u4 instanceof ShadowRoot) && u4.activeElement === e10 && e10.type !== `range` && (r5 && t8 === n4 || i5 && e10.value.trim() === l4) || (e10.value = l4);
  } };
  var lt2 = { deep: true, created(t8, { value: n4, modifiers: { number: r5 } }, i5) {
    t8._modelValue = n4, G3(t8, `change`, () => {
      let n5 = Array.prototype.filter.call(t8.options, (e10) => e10.selected).map((e10) => r5 ? ae(Q3(e10)) : Q3(e10));
      t8[Y3](t8.multiple ? p(t8._modelValue) ? new Set(n5) : n5 : n5[0]), t8._assigning = true, wn(() => {
        t8._assigning = false;
      });
    }), t8[Y3] = J3(i5);
  }, mounted(e10, { value: t8 }) {
    ut2(e10, t8);
  }, beforeUpdate(e10, { value: t8 }, n4) {
    e10._modelValue = t8, e10[Y3] = J3(n4);
  }, updated(e10, { value: t8 }) {
    e10._assigning || ut2(e10, t8);
  } };
  function ut2(e10, t8) {
    let n4 = e10.multiple, r5 = d(t8);
    if (!(n4 && !r5 && !p(t8))) {
      for (let i5 = 0, s6 = e10.options.length; i5 < s6; i5++) {
        let s7 = e10.options[i5], c4 = Q3(s7);
        if (n4) {
          if (r5) {
            let e11 = typeof c4;
            s7.selected = e11 === `string` || e11 === `number` ? t8.some((e12) => String(e12) === String(c4)) : be(t8, c4) > -1;
          } else s7.selected = t8.has(c4);
        } else if (ye(Q3(s7), t8)) {
          e10.selectedIndex !== i5 && (e10.selectedIndex = i5);
          return;
        }
      }
      !n4 && e10.selectedIndex !== -1 && (e10.selectedIndex = -1);
    }
  }
  function Q3(e10) {
    return `_value` in e10 ? e10._value : e10.value;
  }
  var ft2 = [`ctrl`, `shift`, `alt`, `meta`];
  var pt2 = { stop: (e10) => e10.stopPropagation(), prevent: (e10) => e10.preventDefault(), self: (e10) => e10.target !== e10.currentTarget, ctrl: (e10) => !e10.ctrlKey, shift: (e10) => !e10.shiftKey, alt: (e10) => !e10.altKey, meta: (e10) => !e10.metaKey, left: (e10) => `button` in e10 && e10.button !== 0, middle: (e10) => `button` in e10 && e10.button !== 1, right: (e10) => `button` in e10 && e10.button !== 2, exact: (e10, t8) => ft2.some((n4) => e10[`${n4}Key`] && !t8.includes(n4)) };
  var mt2 = (e10, t8) => {
    if (!e10) return e10;
    let n4 = e10._withMods ||= {}, r5 = t8.join(`.`);
    return n4[r5] || (n4[r5] = ((n5, ...r6) => {
      for (let e11 = 0; e11 < t8.length; e11++) {
        let r7 = pt2[t8[e11]];
        if (r7 && r7(n5, t8)) return;
      }
      return e10(n5, ...r6);
    }));
  };
  var ht2 = { esc: `escape`, space: ` `, up: `arrow-up`, left: `arrow-left`, right: `arrow-right`, down: `arrow-down`, delete: `backspace` };
  var gt2 = (e10, t8) => {
    let n4 = e10._withKeys ||= {}, r5 = t8.join(`.`);
    return n4[r5] || (n4[r5] = ((n5) => {
      if (!(`key` in n5)) return;
      let r6 = k(n5.key);
      if (t8.some((e11) => e11 === r6 || ht2[e11] === r6)) return e10(n5);
    }));
  };
  var _t3 = s({ patchProp: Ke3 }, fe3);
  var $3;
  function yt3() {
    return $3 ||= ka(_t3);
  }
  var xt3 = ((...e10) => {
    let t8 = yt3().createApp(...e10), { mount: n4 } = t8;
    return t8.mount = (e11) => {
      let r5 = wt3(e11);
      if (!r5) return;
      let a5 = t8._component;
      !g(a5) && !a5.render && !a5.template && (a5.template = r5.innerHTML), r5.nodeType === 1 && (r5.textContent = ``);
      let o5 = n4(r5, false, Ct3(r5));
      return r5 instanceof Element && (r5.removeAttribute(`v-cloak`), r5.setAttribute(`data-v-app`, ``)), o5;
    }, t8;
  });
  function Ct3(e10) {
    if (e10 instanceof SVGElement) return `svg`;
    if (typeof MathMLElement == `function` && e10 instanceof MathMLElement) return `mathml`;
  }
  function wt3(e10) {
    return _(e10) ? document.querySelector(e10) : e10;
  }

  // master-cms-mockup/vendor/omr-preview/source/C6zEzIug.js
  var e8 = `\\displaylines`;
  var t6 = (t8) => {
    let n4 = t8, r5 = n4.indexOf(e8);
    for (; r5 !== -1; ) {
      let t9 = r5 + 13;
      for (; t9 < n4.length && n4[t9] === ` `; ) t9++;
      if (n4[t9] !== `{`) break;
      let i5 = 0, a5 = -1;
      for (let e10 = t9; e10 < n4.length; e10++) if (n4[e10] === `{`) i5++;
      else if (n4[e10] === `}` && --i5 === 0) {
        a5 = e10;
        break;
      }
      if (a5 === -1) break;
      let o5 = n4.slice(t9 + 1, a5);
      n4 = n4.slice(0, r5) + `\\begin{gathered}` + o5 + `\\end{gathered}` + n4.slice(a5 + 1), r5 = n4.indexOf(e8);
    }
    return n4 = n4.replace(/\\placeholder(?:\[[^\]]*\])?\{([^{}]*)\}/g, (e10, t9) => t9.trim() ? t9 : `\\square`), n4;
  };

  // master-cms-mockup/vendor/omr-preview/source/ebkOLk70.js
  var i3 = {};
  var a3 = { type: `button`, class: `close-btn`, "aria-label": `\uB2EB\uAE30` };
  function o3(r5, i5) {
    return no(), so(`button`, a3, [...i5[0] ||= [mo(`svg`, { viewBox: `0 0 20 20`, fill: `none`, "aria-hidden": `true` }, [mo(`path`, { d: `M2 2 18 18M18 2 2 18`, stroke: `currentColor`, "stroke-width": `1.6`, "stroke-linecap": `round` })], -1)]]);
  }
  var s4 = Object.assign(t3(i3, [[`render`, o3], [`__scopeId`, `data-v-a16cddb0`]]), { __name: `CommonCloseButton` });

  // master-cms-mockup/vendor/omr-preview/source/D0Ojt8zw.js
  var ie3 = r2(`vendor/omr-preview/images/math-keypad/variant-mark.svg`);
  var A4 = (e10) => e10 === `ele` || e10 === `mid` || e10 === `high` ? e10 : void 0;
  var M4 = (e10) => Math.min(4, Math.max(1, Math.floor(e10) || 1));
  var ae3 = (e10, t8) => `\\begin{pmatrix}${Array.from({ length: M4(e10) }, (e11, n4) => Array.from({ length: M4(t8) }, (e12, t9) => n4 === 0 && t9 === 0 ? `#0` : `#?`).join(`&`)).join(`\\\\`)}\\end{pmatrix}`;
  var N4 = (e10, t8, n4 = {}) => ({ label: e10, insert: t8 ?? e10, ...n4 });
  var P4 = (e10) => N4(e10, e10, { size: `lg` });
  var F4 = (e10, t8, n4 = {}) => ({ label: ``, action: e10, icon: t8, fn: true, ...n4 });
  var I4 = (e10) => ({ label: ``, spacer: true, span: e10 });
  var L4 = F4(`left`, `left`);
  var R4 = F4(`right`, `right`);
  var z4 = F4(`enter`, `enter`);
  var B4 = F4(`backspace`, `backspace`);
  var V4 = N4(`+`, `+`, { variants: [N4(`\\pm`)] });
  var H3 = N4(`-`);
  var U3 = N4(`\\times`);
  var W4 = N4(`\\div`);
  var G4 = N4(`=`, `=`, { variants: [N4(`\\neq`), N4(`\\fallingdotseq`)] });
  var K4 = N4(`<`);
  var q4 = N4(`>`);
  var J4 = N4(`:`);
  var Y4 = N4(`\\cdots`);
  var oe3 = N4(`\\%`);
  var X4 = N4(`\\le`);
  var se3 = N4(`\\ge`);
  var ce4 = N4(`\\equiv`);
  var le4 = N4(`\\backsim`);
  var ue4 = N4(`\\pi`);
  var de4 = N4(`\\sin`, `\\sin`, { size: `sm` });
  var fe4 = N4(`\\cos`, `\\cos`, { size: `sm` });
  var pe4 = N4(`\\tan`, `\\tan`, { size: `sm` });
  var me4 = N4(`\\dfrac{\\square}{\\square}`, `\\frac{#@}{#?}`, { size: `sm` });
  var he4 = N4(`\\square^{\\square}`, `#@^{#?}`);
  var ge4 = N4(`\\square_{\\square}`, `#@_{#?}`);
  var _e4 = N4(`\\sqrt{\\square}`, `\\sqrt{#0}`);
  var ve4 = N4(`\\overline{\\square}`, `\\overline{#@}`, { variants: [N4(`\\overrightarrow{\\square}`, `\\overrightarrow{#@}`), N4(`\\overleftrightarrow{\\square}`, `\\overleftrightarrow{#@}`), N4(`\\overgroup{\\square}`, `\\overgroup{#@}`)] });
  var ye4 = N4(`\\left\\{\\begin{smallmatrix}\\square\\\\\\square\\end{smallmatrix}\\right.`, `\\begin{cases}#0\\\\#?\\end{cases}`);
  var be4 = N4(`|\\square|`, `\\left|#0\\right|`);
  var xe4 = N4(`\\dot{\\square}`, `\\dot{#@}`);
  var Se4 = N4(`{}^{\\circ}`, `#@^{\\circ}`);
  var Ce4 = N4(`'`, `'`);
  var we4 = N4(`,`, `,`);
  var Te4 = N4(`/`, `/`);
  var Ee3 = N4(`\\angle`);
  var De4 = N4(`\\mathrel{/\\!\\!/}`);
  var Oe3 = N4(`\\perp`);
  var ke4 = N4(`(`);
  var Ae4 = N4(`)`);
  var je4 = N4(`[`);
  var Me4 = N4(`]`);
  var Ne4 = N4(`\\{`, `\\{`);
  var Pe4 = N4(`\\}`, `\\}`);
  var Fe4 = N4(`\\square`);
  var Ie4 = N4(`\\bigcirc`);
  var Le4 = N4(`\\triangle`);
  var Re4 = [[P4(`7`), P4(`8`), P4(`9`), L4], [P4(`4`), P4(`5`), P4(`6`), R4], [P4(`1`), P4(`2`), P4(`3`), z4], [{ ...P4(`0`), span: 2 }, P4(`.`), B4]];
  var ze4 = [[P4(`7`), P4(`8`), P4(`9`), L4], [P4(`4`), P4(`5`), P4(`6`), R4], [P4(`1`), P4(`2`), P4(`3`), z4], [oe3, P4(`0`), P4(`.`), B4]];
  var Be4 = [[N4(`+`), H3, U3, W4], [K4, q4, J4, N4(`=`)], [me4, N4(`\\square\\dfrac{\\square}{\\square}`, `#0\\frac{#?}{#?}`, { size: `sm` }), N4(`(\\square)`, `\\left(#0\\right)`), N4(`\\{\\square\\}`, `\\left\\{#0\\right\\}`)], [Fe4, Ie4, Le4, Se4]];
  var Ve4 = [[V4, H3, U3, W4, G4], [K4, q4, J4, Y4, oe3], [X4, se3, ce4, le4, ue4], [{ ...de4, span: 5 / 3 }, { ...fe4, span: 5 / 3 }, { ...pe4, span: 5 / 3 }]];
  var He4 = [[me4, he4, _e4, ve4, ye4], [ke4, Ae4, be4, xe4, Se4], [je4, Me4, Ee3, De4, Ce4], [Ne4, Pe4, Oe3, Te4, we4], [{ ...Fe4, span: 5 / 3 }, { ...Ie4, span: 5 / 3 }, { ...Le4, span: 5 / 3 }]];
  var Ue4 = { ..._e4, variants: [N4(`\\sqrt[\\square]{\\square}`, `\\sqrt[#0]{#?}`)] };
  var We4 = N4(`\\left(\\begin{smallmatrix}\\square&\\square\\\\\\square&\\square\\end{smallmatrix}\\right)`, void 0, { action: `matrix` });
  var Ge4 = [[V4, H3, U3, K4, q4], [W4, G4, J4, X4, se3], [ye4, be4, oe3, ke4, Ae4], [me4, he4, ge4, je4, Me4], [Ue4, ve4, We4, Ne4, Pe4]];
  var Ke4 = [[Ee3, { ...Fe4, variants: [Ie4, Le4] }, De4, le4, ce4], [Oe3, Te4, Ce4, we4, ue4], [N4(`\\in`), N4(`\\not\\in`), N4(`\\subset`), N4(`\\not\\subset`), N4(`i`)], [N4(`\\cup`), N4(`\\cap`), N4(`\\varnothing`), N4(`\\circ`), Se4], [N4(`\\square^{c}`, `#@^{c}`), N4(`n(\\square)`, `n(#0)`), N4(`\\to`, `\\to`, { variants: [N4(`\\Rightarrow`), N4(`\\Leftrightarrow`)] }), N4(`\\sim`, `\\sim`, { variants: [N4(`\\nsim`)] }), N4(`|`, `\\mid`)]];
  var qe4 = [[N4(`\\log\\square`, `\\log{#0}`, { size: `sm`, span: 1.5 }), N4(`\\log_{\\square}\\square`, `\\log_{#0}{#?}`, { size: `sm`, span: 1.5 }), N4(`e`, `e`, { span: 1.5 }), { ...Se4, span: 1.5 }], [{ ...de4, span: 2, variants: [N4(`\\csc`, `\\csc`, { size: `sm` })] }, { ...fe4, span: 2, variants: [N4(`\\sec`, `\\sec`, { size: `sm` })] }, { ...pe4, span: 2, variants: [N4(`\\cot`, `\\cot`, { size: `sm` })] }], [N4(`\\Sigma`, `\\sum_{#0}^{#?}`), N4(`\\lim`, `\\lim_{#0\\to#?}`, { size: `sm` }), N4(`\\infty`), N4(`\\int`, `\\int`), N4(`\\int_{\\square}^{\\square}`, `\\int_{#0}^{#?}`, { size: `xs` }), N4(`dx`, `\\,dx`, { size: `sm` })], [N4(`f'(\\square)`, `f'(#0)`, { size: `sm`, span: 2 }), N4(`\\dfrac{dy}{dx}`, `\\frac{dy}{dx}`, { size: `sm`, span: 2 }), N4(`\\Delta`, `\\Delta`, { span: 2 })], [N4(`{}_{n}\\mathrm{P}_{r}`, `{}_{#0}\\mathrm{P}_{#?}`, { size: `sm` }), N4(`{}_{n}\\mathrm{C}_{r}`, `{}_{#0}\\mathrm{C}_{#?}`, { size: `sm` }), N4(`{}_{n}\\Pi_{r}`, `{}_{#0}\\Pi_{#?}`, { size: `sm` }), N4(`{}_{n}\\mathrm{H}_{r}`, `{}_{#0}\\mathrm{H}_{#?}`, { size: `sm` }), N4(`!`), Y4], [N4(`\\mathrm{P}(\\square)`, `\\mathrm{P}(#0)`, { size: `xs` }), N4(`\\mathrm{P}(\\square|\\square)`, `\\mathrm{P}(#0|#?)`, { size: `xs` }), N4(`\\mathrm{E}(\\square)`, `\\mathrm{E}(#0)`, { size: `xs` }), N4(`\\mathrm{V}(\\square)`, `\\mathrm{V}(#0)`, { size: `xs` }), N4(`\\sigma(\\square)`, `\\sigma(#0)`, { size: `xs` }), N4(`\\mathrm{N}(\\square,\\square^2)`, `\\mathrm{N}(#0,#?^{2})`, { size: `xs` })]];
  var Z4 = (e10) => [...e10].map((e11) => N4(e11, e11, { letter: true, upper: e11.toUpperCase(), upperLabel: e11.toUpperCase() }));
  var Q4 = (e10, t8) => N4(e10, t8, { letter: true });
  var Je4 = [Q4(`\u03B1`, `\\alpha`), Q4(`\u03B2`, `\\beta`), Q4(`\u03B3`, `\\gamma`), Q4(`\u03B8`, `\\theta`), Q4(`\u03C3`, `\\sigma`), Q4(`\u03BC`, `\\mu`), Q4(`\u03BB`, `\\lambda`), Q4(`\u0394`, `\\Delta`), Q4(`\u03A3`, `\\Sigma`), Q4(`\u03A9`, `\\Omega`)];
  var Ye4 = { label: `\uC2A4\uD398\uC774\uC2A4`, text: true, action: `space`, span: 3 };
  var Xe4 = [[...Z4(`qwertyuiop`), F4(`backspace`, `backspace`, { span: 3, align: `end` })], [...Z4(`asdfghjkl`), F4(`enter`, `enter`, { span: 4, align: `end` })], [F4(`shift`, `shift`, { span: 3, align: `start` }), ...Z4(`zxcvbnm`), F4(`shift`, `shift`, { span: 3, align: `end` })], [...Je4, Ye4]];
  var Ze4 = [Z4(`qwertyuiop`), [I4(0.5), ...Z4(`asdfghjkl`), I4(0.5)], [F4(`shift`, `shift`, { span: 1.5 }), ...Z4(`zxcvbnm`), F4(`backspace`, `backspace`, { span: 1.5 })], Je4];
  var Qe4 = { label: `\uC54C\uD30C\uBCB3\xB7\uADF8\uB9AC\uC2A4 \uBB38\uC790`, blocks: [{ rows: Xe4, rowHeight: 56, gap: 6 }] };
  var $4 = { rowHeight: 38, gap: 6 };
  var $e4 = { rowHeight: 56, gap: 6 };
  var et4 = { label: `\uC54C\uD30C\uBCB3\xB7\uADF8\uB9AC\uC2A4 \uBB38\uC790`, blocks: [{ rows: Ze4, ...$e4 }] };
  var tt4 = { ele: { width: 800, pc: [{ label: ``, gap: 20, blocks: [{ rows: Be4, rowHeight: 56, gap: 6 }, { rows: ze4, rowHeight: 56, gap: 6 }] }], mobile: [{ label: `\uC22B\uC790`, blocks: [{ rows: ze4, ...$e4 }] }, { label: `\uC218\uC2DD`, blocks: [{ rows: Be4, ...$e4 }] }] }, mid: { width: 900, pc: [{ label: `\uC22B\uC790\xB7\uC5F0\uC0B0\xB7\uAE30\uD638`, gap: 9, blocks: [{ rows: Ve4, rowHeight: 38, gap: 4, width: 301 }, { rows: He4, rowHeight: 38, gap: 4, width: 301 }, { rows: Re4, rowHeight: `fill`, gap: 4, width: 200 }] }, Qe4], mobile: [{ label: `\uC22B\uC790`, blocks: [{ rows: Re4, ...$e4 }] }, { label: `\uC5F0\uC0B0`, blocks: [{ rows: Ve4, ...$4 }] }, { label: `\uAE30\uD638`, blocks: [{ rows: He4, ...$4 }] }, et4] }, high: { width: 1e3, pc: [{ label: `\uC22B\uC790\xB7\uC5F0\uC0B0\xB7\uAE30\uD638`, gap: 8, blocks: [{ rows: Ge4, rowHeight: 38, gap: 4, width: 226 }, { rows: Ke4, rowHeight: 38, gap: 4, width: 226 }, { rows: qe4, rowHeight: 38, gap: 4, width: 296 }, { rows: Re4, rowHeight: `fill`, gap: 4, width: 148 }] }, Qe4], mobile: [{ label: `\uC22B\uC790`, blocks: [{ rows: Re4, ...$e4 }] }, { label: `\uC5F0\uC0B0`, blocks: [{ rows: Ge4, ...$4 }] }, { label: `\uAE30\uD638`, blocks: [{ rows: Ke4, ...$4 }] }, { label: `\uB300\uC218\xB7\uBBF8\uC801\uBD84`, blocks: [{ rows: qe4, ...$4 }] }, et4] } };
  var nt2 = { key: 0, class: `keypad__tabs`, role: `tablist` };
  var rt3 = [`aria-selected`, `onClick`];
  var it3 = [`aria-label`, `onPointerdown`];
  var at3 = [`src`];
  var ot2 = { key: 1, class: `keypad__text` };
  var st2 = { key: 3, class: `keypad__mark`, src: ie3, alt: `` };
  var ct2 = [`data-variant`, `onClick`];
  var lt3 = 400;
  var ut3 = 6;
  var dt2 = 2;
  var ft3 = Object.assign(t3(Sr({ __name: `MathKeypad`, props: { level: {}, mobile: { type: Boolean } }, emits: [`key`], setup(i5, { emit: f6 }) {
    let h5 = i5, g6 = f6, v7 = { left: `arrow-left`, right: `arrow-right`, enter: `enter`, backspace: `delete`, shift: `shift` }, b6 = Uo(() => tt4[h5.level][h5.mobile ? `mobile` : `pc`]), T3 = Gt(0), E3 = Uo(() => b6.value[T3.value] ?? b6.value[0]), D5 = Gt(false);
    Gn(() => [h5.level, h5.mobile], () => {
      T3.value = 0, D5.value = false;
    });
    let O5 = (e10) => e10.rowHeight === `fill` || e10.rowHeight >= 56, ee4 = (e10) => ({ gap: `${e10.gap}px`, flex: e10.width ? `0 1 ${e10.width}px` : `1 1 0` }), k6 = (e10) => ({ gap: `${e10.gap}px`, height: e10.rowHeight === `fill` ? void 0 : `${e10.rowHeight}px` }), ne4 = (e10, t8) => {
      let n4 = e10.span ?? 1;
      return { flex: `${n4} ${n4} ${Math.max(0, t8 * (n4 - 1))}px` };
    }, re4 = (e10) => ({ "is-fn": e10.fn, "is-letter": e10.letter, "is-lg": e10.size === `lg`, "is-sm": e10.size === `sm`, "is-xs": e10.size === `xs`, "is-start": e10.align === `start`, "is-end": e10.align === `end`, "is-pressed": M7.value?.key === e10 }), ie5 = (e10) => D5.value && e10.upperLabel ? e10.upperLabel : e10.label, A6 = (e10) => `vendor/omr-preview/images/math-keypad/${e10 === `shift` && D5.value ? `shift-press` : v7[e10]}.svg`, j6 = (e10) => ({ left: `\uC67C\uCABD`, right: `\uC624\uB978\uCABD`, enter: `\uC904\uBC14\uAFC8`, backspace: `\uC9C0\uC6B0\uAE30`, shift: `\uB300\uBB38\uC790`, space: `\uC2A4\uD398\uC774\uC2A4`, matrix: `\uD589\uB82C` })[e10.action ?? ``] ?? ie5(e10), M7 = Gt(null), ae6 = Gt(null), N7 = null, P7 = (e10) => {
      if (e10.action === `shift`) {
        D5.value = !D5.value;
        return;
      }
      g6(`key`, e10, D5.value);
    }, F7 = (e10, t8) => {
      let n4 = t8.getBoundingClientRect();
      M7.value = { key: e10, items: e10.variants ?? [], hover: 0, style: { left: `${n4.left + n4.width / 2}px`, top: `${n4.top - 4}px` }, cellStyle: { width: `${n4.width}px`, height: `${Math.min(n4.height, 38)}px` } };
    }, I7 = () => {
      M7.value = null;
    }, L7 = (e10) => {
      let t8 = document.elementFromPoint(e10.clientX, e10.clientY)?.closest(`[data-variant]`);
      return t8 ? Number(t8.dataset.variant) : -1;
    }, R7 = (e10) => {
      if (!M7.value) return;
      let t8 = L7(e10);
      t8 >= 0 && (M7.value.hover = t8);
    }, z7 = (e10, t8) => {
      if (H5(), !M7.value) {
        P7(t8);
        return;
      }
      let n4 = L7(e10);
      n4 >= 0 && W6(M7.value.items[n4]);
    }, B6 = null, V6 = null, H5 = () => {
      N7 && clearTimeout(N7), N7 = null, B6 && window.removeEventListener(`pointermove`, B6), V6 && window.removeEventListener(`pointerup`, V6), B6 = V6 = null;
    }, U5 = (e10, t8) => {
      I7(), H5();
      let n4 = e10.currentTarget;
      t8.variants?.length && (N7 = setTimeout(() => F7(t8, n4), lt3)), B6 = R7, V6 = (e11) => z7(e11, t8), window.addEventListener(`pointermove`, B6), window.addEventListener(`pointerup`, V6);
    }, W6 = (e10) => {
      I7(), g6(`key`, e10, false);
    }, G6 = (e10) => {
      M7.value && !ae6.value?.contains(e10.target) && I7();
    }, K6 = Gt(null), q6 = (e10, t8 = ut3) => {
      let n4 = (e10.parentElement?.clientWidth ?? 0) - t8, r5 = e10.offsetWidth;
      return n4 > 0 && r5 > n4 ? n4 / r5 : 1;
    }, J6 = () => {
      let e10 = [...K6.value?.querySelectorAll(`.keypad__label`) ?? []], t8 = (e11) => e11.parentElement?.classList.contains(`is-letter`), n4 = Math.min(1, ...e10.filter(t8).map((e11) => q6(e11, dt2)));
      e10.forEach((e11) => {
        let r5 = t8(e11) ? n4 : q6(e11);
        e11.style.transform = r5 < 1 ? `scale(${r5})` : ``;
      });
    };
    Gn([T3, D5, () => h5.level, () => h5.mobile], () => wn(J6));
    let Y6 = null;
    return si(() => {
      document.addEventListener(`pointerdown`, G6, true), Y6 = new ResizeObserver(J6), K6.value && Y6.observe(K6.value);
    }), ui(() => {
      document.removeEventListener(`pointerdown`, G6, true), Y6?.disconnect(), H5();
    }), (e10, r5) => {
      let a5 = s3;
      return no(), so(`div`, { class: me([`keypad`, { "is-mobile": i5.mobile }]) }, [Yt(b6).length > 1 ? (no(), so(`div`, nt2, [(no(true), so(q, null, Si(Yt(b6), (e11, n4) => (no(), so(`button`, { key: e11.label, type: `button`, role: `tab`, class: me([`keypad__tab`, { "is-active": n4 === Yt(T3) }]), "aria-selected": n4 === Yt(T3), onPointerdown: r5[0] ||= mt2(() => {
      }, [`prevent`]), onClick: (e12) => T3.value = n4 }, Se(e11.label), 43, rt3))), 128))])) : bo(``, true), mo(`div`, { ref_key: `bodyEl`, ref: K6, class: `keypad__body`, style: le({ gap: `${Yt(E3).gap ?? 0}px` }) }, [(no(true), so(q, null, Si(Yt(E3).blocks, (e11, r6) => (no(), so(`div`, { key: `${Yt(T3)}-${r6}`, class: me([`keypad__block`, { "is-fill": e11.rowHeight === `fill`, "is-tall": O5(e11) }]), style: le(ee4(e11)) }, [(no(true), so(q, null, Si(e11.rows, (r7, i6) => (no(), so(`div`, { key: i6, class: `keypad__row`, style: le(k6(e11)) }, [(no(true), so(q, null, Si(r7, (n4, r8) => (no(), so(q, { key: r8 }, [n4.spacer ? (no(), so(`span`, { key: 0, class: `keypad__spacer`, style: le(ne4(n4, e11.gap)) }, null, 4)) : (no(), so(`button`, { key: 1, type: `button`, class: me([`keypad__key`, re4(n4)]), style: le(ne4(n4, e11.gap)), "aria-label": j6(n4), onPointerdown: mt2((e12) => U5(e12, n4), [`prevent`]) }, [n4.icon ? (no(), so(`img`, { key: 0, class: me([`keypad__icon`, `is-${n4.icon}`]), src: A6(n4.icon), alt: `` }, null, 10, at3)) : n4.text ? (no(), so(`span`, ot2, Se(n4.label), 1)) : (no(), co(a5, { key: 2, class: `keypad__label`, latex: ie5(n4) }, null, 8, [`latex`])), n4.variants ? (no(), so(`img`, st2)) : bo(``, true)], 46, it3))], 64))), 128))], 4))), 128))], 6))), 128))], 4), Yt(M7) ? (no(), so(`div`, { key: 1, ref_key: `popupEl`, ref: ae6, class: `keypad__variants`, style: le(Yt(M7).style), onPointerdown: r5[1] ||= mt2(() => {
      }, [`prevent`]) }, [(no(true), so(q, null, Si(Yt(M7).items, (e11, t8) => (no(), so(`button`, { key: t8, type: `button`, class: me([`keypad__variant`, { "is-hover": t8 === Yt(M7).hover }]), style: le(Yt(M7).cellStyle), "data-variant": t8, onClick: (t9) => W6(e11) }, [X(a5, { class: `keypad__label`, latex: e11.label }, null, 8, [`latex`])], 14, ct2))), 128))], 36)) : bo(``, true)], 2);
    };
  } }), [[`__scopeId`, `data-v-864e459e`]]), { __name: `MathKeypad` });
  var pt3 = { class: `ink-canvas` };
  var mt3 = { key: 0, class: `ink-canvas__placeholder` };
  var ht3 = 3;
  var gt3 = `#f6f8fb`;
  var _t4 = Object.assign(t3(Sr({ __name: `MathInkCanvas`, setup(e10, { expose: t8 }) {
    let n4 = 0, i5 = 0, o5 = Gt(null), s6 = Gt([]), c4 = Gt(false), f6 = () => o5.value?.getContext(`2d`) ?? null, m5 = () => {
      let e11 = f6();
      if (e11) {
        e11.fillStyle = gt3, e11.fillRect(0, 0, n4, i5), e11.strokeStyle = `#000`, e11.lineWidth = ht3, e11.lineCap = `round`, e11.lineJoin = `round`;
        for (let t9 of s6.value) {
          if (t9.length < 2) {
            e11.beginPath(), e11.arc(t9[0].x, t9[0].y, ht3 / 2, 0, Math.PI * 2), e11.fillStyle = `#000`, e11.fill();
            continue;
          }
          e11.beginPath(), e11.moveTo(t9[0].x, t9[0].y);
          for (let n5 of t9.slice(1)) e11.lineTo(n5.x, n5.y);
          e11.stroke();
        }
      }
    }, h5 = (e11) => {
      let t9 = o5.value.getBoundingClientRect();
      return { x: (e11.clientX - t9.left) / t9.width * n4, y: (e11.clientY - t9.top) / t9.height * i5 };
    }, g6 = (e11) => {
      e11.preventDefault(), o5.value?.setPointerCapture(e11.pointerId), c4.value = true, s6.value.push([h5(e11)]);
    }, v7 = (e11) => {
      if (!c4.value) return;
      let t9 = s6.value[s6.value.length - 1];
      t9.push(h5(e11));
      let n5 = f6();
      if (!n5 || t9.length < 2) return;
      let [r5, i6] = t9.slice(-2);
      n5.strokeStyle = `#000`, n5.lineWidth = ht3, n5.lineCap = `round`, n5.beginPath(), n5.moveTo(r5.x, r5.y), n5.lineTo(i6.x, i6.y), n5.stroke();
    }, b6 = () => {
      c4.value && (c4.value = false, m5());
    }, x5 = () => {
      s6.value.pop(), m5();
    }, C4 = () => {
      s6.value = [], m5();
    }, w3 = Uo(() => s6.value.length === 0), T3 = (e11) => {
      let t9 = 1 / 0, n5 = 1 / 0, r5 = -1 / 0, i6 = -1 / 0;
      for (let a6 of e11) for (let e12 of a6) e12.x < t9 && (t9 = e12.x), e12.x > r5 && (r5 = e12.x), e12.y < n5 && (n5 = e12.y), e12.y > i6 && (i6 = e12.y);
      let a5 = Math.ceil(r5 - t9 + 32), o6 = Math.ceil(i6 - n5 + 32), s7 = t9 - 16, c5 = n5 - 16, l4 = document.createElement(`canvas`);
      l4.width = a5, l4.height = o6;
      let u4 = l4.getContext(`2d`);
      u4.fillStyle = `#fff`, u4.fillRect(0, 0, a5, o6), u4.strokeStyle = `#000`, u4.lineWidth = ht3, u4.lineCap = `round`, u4.lineJoin = `round`;
      for (let t10 of e11) {
        if (t10.length < 2) {
          u4.beginPath(), u4.arc(t10[0].x - s7, t10[0].y - c5, ht3 / 2, 0, Math.PI * 2), u4.fillStyle = `#000`, u4.fill(), u4.fillStyle = `#fff`;
          continue;
        }
        u4.beginPath(), u4.moveTo(t10[0].x - s7, t10[0].y - c5);
        for (let e12 of t10.slice(1)) u4.lineTo(e12.x - s7, e12.y - c5);
        u4.stroke();
      }
      return new Promise((e12) => l4.toBlob(e12, `image/png`));
    }, E3 = () => s6.value.length ? T3(s6.value) : Promise.resolve(null), D5 = () => {
      let e11 = o5.value;
      if (!e11 || !e11.clientWidth) return;
      let t9 = window.devicePixelRatio || 1;
      n4 = e11.clientWidth, i5 = e11.clientHeight, e11.width = Math.round(n4 * t9), e11.height = Math.round(i5 * t9), f6()?.setTransform(t9, 0, 0, t9, 0, 0), m5();
    }, O5 = null;
    return si(() => {
      D5(), O5 = new ResizeObserver(D5), o5.value && O5.observe(o5.value);
    }), ui(() => O5?.disconnect()), t8({ toCroppedBlob: E3, clear: C4, undo: x5, isEmpty: w3 }), (e11, t9) => (no(), so(`div`, pt3, [mo(`canvas`, { ref_key: `canvasEl`, ref: o5, class: `ink-canvas__board`, onPointerdown: g6, onPointermove: v7, onPointerup: b6, onPointercancel: b6, onPointerleave: b6 }, null, 544), Yt(s6).length ? bo(``, true) : (no(), so(`p`, mt3, `\uC5EC\uAE30\uC5D0 \uC190\uAE00\uC528\uB85C \uC218\uC2DD\uC744 \uC785\uB825\uD558\uC138\uC694.`))]));
  } }), [[`__scopeId`, `data-v-aa52dfe5`]]), { __name: `MathInkCanvas` });
  var vt3 = { class: `matrix-dialog__head` };
  var yt4 = { class: `matrix-dialog__body` };
  var bt3 = { class: `matrix-dialog__select` };
  var xt4 = [`onKeydown`];
  var St3 = [`value`];
  var Ct4 = { class: `matrix-dialog__select` };
  var wt4 = [`onKeydown`];
  var Tt3 = [`value`];
  var Et3 = Object.assign(t3(Sr({ __name: `MathMatrixDialog`, props: { open: { type: Boolean } }, emits: [`confirm`, `cancel`], setup(r5, { emit: i5 }) {
    let a5 = r5, o5 = i5, d5 = Gt(2), v7 = Gt(2), b6 = Gt(null), C4 = Array.from({ length: 4 }, (e10, t8) => 1 + t8);
    Gn(() => a5.open, async (t8) => {
      t8 && (d5.value = 2, v7.value = 2, await wn(), b6.value?.focus());
    });
    let T3 = () => o5(`confirm`, d5.value, v7.value);
    return (e10, i6) => {
      let a6 = s4;
      return no(), co(or, { to: `body` }, [r5.open ? (no(), so(`div`, { key: 0, class: `matrix-dialog-backdrop`, onClick: i6[4] ||= mt2((e11) => o5(`cancel`), [`self`]) }, [mo(`div`, { class: `matrix-dialog`, role: `dialog`, "aria-modal": `true`, onKeydown: i6[3] ||= gt2(mt2((e11) => o5(`cancel`), [`stop`]), [`esc`]) }, [mo(`div`, vt3, [i6[5] ||= mo(`p`, { class: `matrix-dialog__title` }, `\uD589\uB82C \uC120\uD0DD`, -1), X(a6, { onClick: i6[0] ||= (e11) => o5(`cancel`) })]), mo(`div`, yt4, [mo(`label`, bt3, [i6[6] ||= mo(`span`, { class: `matrix-dialog__sr` }, `\uD589`, -1), In(mo(`select`, { ref_key: `rowsSelect`, ref: b6, "onUpdate:modelValue": i6[1] ||= (e11) => z(d5) ? d5.value = e11 : null, onKeydown: gt2(mt2(T3, [`prevent`]), [`enter`]) }, [(no(true), so(q, null, Si(Yt(C4), (e11) => (no(), so(`option`, { key: e11, value: e11 }, Se(e11), 9, St3))), 128))], 40, xt4), [[lt2, Yt(d5), void 0, { number: true }]]), i6[7] ||= mo(`svg`, { viewBox: `0 0 24 24`, fill: `none`, "aria-hidden": `true` }, [mo(`path`, { d: `M7 10l5 5 5-5`, stroke: `currentColor`, "stroke-width": `1.6`, "stroke-linecap": `round`, "stroke-linejoin": `round` })], -1)]), mo(`label`, Ct4, [i6[8] ||= mo(`span`, { class: `matrix-dialog__sr` }, `\uC5F4`, -1), In(mo(`select`, { "onUpdate:modelValue": i6[2] ||= (e11) => z(v7) ? v7.value = e11 : null, onKeydown: gt2(mt2(T3, [`prevent`]), [`enter`]) }, [(no(true), so(q, null, Si(Yt(C4), (e11) => (no(), so(`option`, { key: e11, value: e11 }, Se(e11), 9, Tt3))), 128))], 40, wt4), [[lt2, Yt(v7), void 0, { number: true }]]), i6[9] ||= mo(`svg`, { viewBox: `0 0 24 24`, fill: `none`, "aria-hidden": `true` }, [mo(`path`, { d: `M7 10l5 5 5-5`, stroke: `currentColor`, "stroke-width": `1.6`, "stroke-linecap": `round`, "stroke-linejoin": `round` })], -1)])]), mo(`div`, { class: `matrix-dialog__actions` }, [mo(`button`, { type: `button`, class: `matrix-dialog__btn`, onClick: T3 }, `\uCD94\uAC00`)])], 32)])) : bo(``, true)]);
    };
  } }), [[`__scopeId`, `data-v-af85ac1b`]]), { __name: `MathMatrixDialog` });
  var Dt3 = Gt(0);
  var Ot3 = () => Dt3;
  var kt3 = { key: 0, class: `math-dialog__titlebar` };
  var At3 = { class: `math-dialog__content` };
  var jt3 = { class: `math-dialog__bar` };
  var Mt3 = { class: `math-dialog__tabs`, role: `tablist` };
  var Nt3 = [`aria-selected`, `onClick`];
  var Pt3 = { key: 0, class: `math-dialog__hint` };
  var Ft3 = { class: `math-dialog__keyboard` };
  var It3 = { class: `math-dialog__ink` };
  var Lt3 = { class: `math-dialog__ink-actions` };
  var Rt3 = [`disabled`, `onClick`];
  var zt3 = { key: 0, viewBox: `0 0 16 16`, fill: `none`, "aria-hidden": `true` };
  var Bt3 = { key: 1, viewBox: `0 0 16 16`, fill: `none`, "aria-hidden": `true` };
  var Vt3 = { class: `math-dialog__result` };
  var Ht3 = { key: 0, class: `math-dialog__error` };
  var Ut3 = { key: 1, class: `math-dialog__count` };
  var Wt3 = { class: `math-dialog__actions` };
  var Gt3 = `(max-width: 767px)`;
  var Kt2 = Object.assign(t3(Sr({ __name: `MathFieldDialog`, props: { open: { type: Boolean }, latex: {}, level: {}, maxLength: {} }, emits: [`confirm`, `cancel`], setup(a5, { emit: h5 }) {
    let b6 = a5, E3 = h5, D5 = [{ value: `keyboard`, label: `\uD0A4\uBCF4\uB4DC` }, { value: `ink`, label: `\uC190\uAE00\uC528` }], O5 = { focus: true, feedback: true, scrollIntoView: true, mode: `math`, format: `latex` }, k6 = Uo(() => b6.level ?? `high`), ie5 = Uo(() => tt4[k6.value].width), A6 = Gt(null), j6 = Gt(`keyboard`), M7 = Gt(null), N7 = Gt(false), P7 = Gt(``), F7 = Gt(``), I7 = Gt(false), L7 = null, R7 = (e10) => {
      I7.value = e10.matches;
    };
    si(() => {
      L7 = window.matchMedia(Gt3), I7.value = L7.matches, L7.addEventListener(`change`, R7);
    }), di(() => L7?.removeEventListener(`change`, R7));
    let z7 = Ot3(), B6 = Gt(null), V6 = null, H5 = () => {
      B6.value && (z7.value = B6.value.scrollHeight + (I7.value ? 20 : 40));
    }, U5 = () => {
      V6 && (V6.disconnect(), V6 = null, z7.value = 0);
    };
    di(U5), Gn(() => b6.open, async (t8) => {
      if (!t8) {
        X6.value = false, U5();
        return;
      }
      if (j6.value = `keyboard`, P7.value = ``, F7.value = ``, await wn(), M7.value?.clear(), A6.value && (A6.value.mathModeSpace = `\\;`, A6.value.value = b6.latex ?? ``, q6(), A6.value.focus()), B6.value) {
        V6 = new ResizeObserver(H5), V6.observe(B6.value);
        for (let e10 of B6.value.children) V6.observe(e10);
      }
    });
    let W6 = (t8) => {
      j6.value = t8, t8 === `keyboard` && wn(() => A6.value?.focus());
    }, G6 = Gt(0), K6 = { value: ``, position: 0 }, q6 = () => {
      let e10 = A6.value;
      e10 && (K6 = { value: e10.value, position: e10.position }, G6.value = e10.value.length);
    }, J6 = () => {
      let e10 = A6.value;
      if (e10) {
        if (b6.maxLength && e10.value.length > b6.maxLength) {
          e10.value = K6.value, e10.position = K6.position;
          return;
        }
        q6();
      }
    }, Y6 = (e10) => A6.value?.executeCommand([`insert`, e10, O5]), oe6 = (e10, t8) => {
      let n4 = A6.value;
      if (n4) switch (e10.action) {
        case `left`:
          n4.executeCommand(`moveToPreviousChar`);
          break;
        case `right`:
          n4.executeCommand(`moveToNextChar`);
          break;
        case `backspace`:
          n4.executeCommand(`deleteBackward`);
          break;
        case `enter`:
          Y6(`\\\\`);
          break;
        case `space`:
          Y6(`\\;`);
          break;
        case `matrix`:
          X6.value = true;
          break;
        default:
          Y6(t8 && e10.upper ? e10.upper : e10.insert ?? e10.label);
      }
    }, X6 = Gt(false), se6 = () => {
      X6.value = false, A6.value?.focus();
    }, ce7 = (e10, t8) => {
      X6.value = false, Y6(ae3(e10, t8));
    }, le7 = async () => {
      let e10 = await M7.value?.toCroppedBlob();
      if (e10) {
        N7.value = true, P7.value = ``;
        try {
          let t8 = new FormData();
          t8.append(`img`, e10, `ink.png`);
          let { latex: n4 } = await t2(`/api/math-ocr`, { method: `POST`, body: t8 });
          F7.value = (n4 ?? ``).trim(), A6.value && (A6.value.value = F7.value, q6());
        } catch {
          P7.value = `\uC778\uC2DD\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4. OCR \uC11C\uBC84 \uC0C1\uD0DC\uB97C \uD655\uC778\uD574 \uC8FC\uC138\uC694.`;
        } finally {
          N7.value = false;
        }
      }
    }, ue7 = Uo(() => {
      let e10 = M7.value?.isEmpty ?? true;
      return [{ label: `\uD55C \uD68D \uC9C0\uC6B0\uAE30`, icon: `undo`, disabled: e10, run: () => M7.value?.undo() }, { label: `\uC804\uCCB4 \uC9C0\uC6B0\uAE30`, icon: `trash`, disabled: e10, run: () => M7.value?.clear() }, { label: N7.value ? `\uC778\uC2DD \uC911...` : `\uC778\uC2DD\uD558\uAE30`, icon: ``, primary: true, disabled: e10 || N7.value, run: le7 }];
    }), de7 = () => {
      E3(`confirm`, t6(A6.value?.value ?? ``));
    }, fe7 = (e10) => {
      if (e10.key !== `Enter` || e10.isComposing || e10.keyCode === 229 || e10.altKey || e10.ctrlKey || e10.metaKey || X6.value) return;
      let t8 = e10.target;
      if (t8.closest(`button, select, a`)) return;
      let n4 = t8.tagName === `MATH-FIELD`;
      n4 && A6.value?.mode === `latex` || e10.shiftKey && !n4 || (e10.preventDefault(), e10.stopPropagation(), e10.shiftKey ? Y6(`\\\\`) : de7());
    };
    return (e10, r5) => {
      let i5 = s4, s6 = ft3, l4 = _t4, d5 = s3, h6 = Et3;
      return no(), co(or, { to: `body` }, [a5.open ? (no(), so(`div`, { key: 0, class: me([`math-dialog-backdrop`, { "is-mobile": Yt(I7) }]), onMousedown: r5[3] ||= mt2((e11) => E3(`cancel`), [`self`]), onKeydownCapture: fe7 }, [mo(`div`, { ref_key: `panelEl`, ref: B6, class: `math-dialog`, style: le(Yt(I7) ? void 0 : { width: `${Yt(ie5)}px` }), role: `dialog`, "aria-modal": `true` }, [Yt(I7) ? bo(``, true) : (no(), so(`div`, kt3, [r5[4] ||= mo(`p`, { class: `math-dialog__title` }, `\uC218\uC2DD\uC785\uB825\uAE30`, -1), X(i5, { onClick: r5[0] ||= (e11) => E3(`cancel`) })])), mo(`div`, At3, [mo(`div`, jt3, [mo(`div`, Mt3, [(no(), so(q, null, Si(D5, (e11) => mo(`button`, { key: e11.value, type: `button`, role: `tab`, class: me([`math-dialog__tab`, { "is-active": Yt(j6) === e11.value }]), "aria-selected": Yt(j6) === e11.value, onClick: (t8) => W6(e11.value) }, Se(e11.label), 11, Nt3)), 64))]), Yt(j6) === `keyboard` && !Yt(I7) ? (no(), so(`p`, Pt3, ` \uD14D\uC2A4\uD2B8\xB7\uC22B\uC790\uB294 \uD0A4\uBCF4\uB4DC\uB85C \uC9C1\uC811 \uC785\uB825, \uC218\uC2DD \uAE30\uD638\uB294 \uC544\uB798 \uD0A4\uD328\uB4DC\uB97C \uC774\uC6A9\uD558\uC138\uC694 `)) : bo(``, true), Yt(I7) ? (no(), co(i5, { key: 1, class: `math-dialog__close`, onClick: r5[1] ||= (e11) => E3(`cancel`) })) : bo(``, true)]), In(mo(`div`, Ft3, [mo(`math-field`, { ref_key: `mf`, ref: A6, class: `math-dialog__field`, "math-virtual-keyboard-policy": `manual`, onInput: J6 }, null, 544), X(s6, { level: Yt(k6), mobile: Yt(I7), onKey: oe6 }, null, 8, [`level`, `mobile`])], 512), [[we3, Yt(j6) === `keyboard`]]), In(mo(`div`, It3, [X(l4, { ref_key: `ink`, ref: M7 }, null, 512), mo(`div`, Lt3, [(no(true), so(q, null, Si(Yt(ue7), (e11) => (no(), so(`button`, { key: e11.label, type: `button`, class: me([`math-dialog__ink-btn`, { "is-primary": e11.primary }]), disabled: e11.disabled, onClick: e11.run }, [e11.icon === `undo` ? (no(), so(`svg`, zt3, [...r5[5] ||= [mo(`path`, { d: `M5.5 4 3 6.5 5.5 9`, stroke: `currentColor`, "stroke-width": `1.2`, "stroke-linecap": `round`, "stroke-linejoin": `round` }, null, -1), mo(`path`, { d: `M3.5 6.5H9a3.5 3.5 0 0 1 0 7H6`, stroke: `currentColor`, "stroke-width": `1.2`, "stroke-linecap": `round` }, null, -1)]])) : e11.icon === `trash` ? (no(), so(`svg`, Bt3, [...r5[6] ||= [mo(`path`, { d: `M3 4.5h10M6.5 4.5V3h3v1.5M4.5 4.5l.6 8.5h5.8l.6-8.5`, stroke: `currentColor`, "stroke-width": `1.2`, "stroke-linecap": `round`, "stroke-linejoin": `round` }, null, -1), mo(`path`, { d: `M7 7v4M9 7v4`, stroke: `currentColor`, "stroke-width": `1.2`, "stroke-linecap": `round` }, null, -1)]])) : bo(``, true), vo(` ` + Se(e11.label), 1)], 10, Rt3))), 128))]), mo(`div`, Vt3, [r5[7] ||= mo(`p`, { class: `math-dialog__result-label` }, `\uC778\uC2DD \uACB0\uACFC`, -1), mo(`div`, { class: me([`math-dialog__result-box`, { "is-filled": !!Yt(F7) }]) }, [Yt(F7) ? (no(), co(d5, { key: 0, latex: Yt(F7) }, null, 8, [`latex`])) : bo(``, true)], 2), Yt(P7) ? (no(), so(`span`, Ht3, Se(Yt(P7)), 1)) : bo(``, true)])], 512), [[we3, Yt(j6) === `ink`]])]), a5.maxLength ? (no(), so(`p`, Ut3, Se(Yt(G6)) + `/` + Se(a5.maxLength), 1)) : bo(``, true), mo(`div`, Wt3, [mo(`button`, { type: `button`, class: `math-dialog__btn`, onClick: r5[2] ||= (e11) => E3(`cancel`) }, `\uCDE8\uC18C`), mo(`button`, { type: `button`, class: `math-dialog__btn is-primary`, onClick: de7 }, `\uC801\uC6A9`)])], 4), X(h6, { open: Yt(X6), onConfirm: ce7, onCancel: se6 }, null, 8, [`open`])], 34)) : bo(``, true)]);
    };
  } }), [[`__scopeId`, `data-v-01fbeaef`]]), { __name: `MathFieldDialog` });
  var qt3 = { key: 1, class: `math-answer-field__placeholder` };
  var Jt3 = 1e3;
  var Yt3 = Object.assign(t3(Sr({ __name: `MathAnswerField`, props: { modelValue: { default: `` }, level: { default: `high` }, placeholder: { default: `\uB2F5\uC744 \uC791\uC131\uD574 \uC8FC\uC138\uC694.` } }, emits: [`update:modelValue`], setup(e10, { emit: n4 }) {
    let r5 = n4, i5 = Gt(false), a5 = (e11) => {
      i5.value = false, r5(`update:modelValue`, e11);
    };
    return (n5, r6) => {
      let o5 = s3, s6 = Kt2;
      return no(), so(q, null, [mo(`button`, { type: `button`, class: `math-answer-field`, onClick: r6[0] ||= (e11) => i5.value = true }, [e10.modelValue ? (no(), co(o5, { key: 0, latex: e10.modelValue, "full-size-fraction": `` }, null, 8, [`latex`])) : (no(), so(`span`, qt3, Se(e10.placeholder), 1))]), X(s6, { open: Yt(i5), latex: e10.modelValue, level: e10.level, "max-length": Jt3, onConfirm: a5, onCancel: r6[1] ||= (e11) => i5.value = false }, null, 8, [`open`, `latex`, `level`])], 64);
    };
  } }), [[`__scopeId`, `data-v-403ed8c9`]]), { __name: `MathAnswerField` });

  // master-cms-mockup/vendor/omr-preview/source/Drc2WqKd.js
  var f3 = 0;
  function m3() {
    si(() => {
      f3++, document.body.style.overflow = `hidden`, document.documentElement.style.scrollbarGutter = `auto`;
    }), di(() => {
      f3 = Math.max(0, f3 - 1), f3 === 0 && (document.body.style.overflow = ``, document.documentElement.style.scrollbarGutter = ``);
    });
  }
  var h2 = Object.assign(t3(Sr({ __name: `Modal`, props: { width: { default: 460 }, dismissable: { type: Boolean, default: true }, dim: { type: Boolean, default: true }, bordered: { type: Boolean, default: false } }, emits: [`close`], setup(s6, { emit: d5 }) {
    let f6 = d5;
    function p4() {
      s6.dismissable && f6(`close`);
    }
    function h5(e10) {
      s6.dismissable && e10.key === `Escape` && f6(`close`);
    }
    return m3(), si(() => {
      document.addEventListener(`keydown`, h5);
    }), di(() => {
      document.removeEventListener(`keydown`, h5);
    }), (e10, t8) => (no(), co(or, { to: `body` }, [mo(`div`, { class: me([`modal`, { "is-plain": !s6.dim }]), onMousedown: mt2(p4, [`self`]) }, [mo(`div`, { class: me([`modal__dialog`, { "is-bordered": s6.bordered }]), style: le({ width: `${s6.width}px` }), role: `dialog`, "aria-modal": `true` }, [wi(e10.$slots, `default`, {}, void 0, true)], 6)], 34)]));
  } }), [[`__scopeId`, `data-v-9eaac7aa`]]), { __name: `CommonModal` });

  // master-cms-mockup/vendor/omr-preview/source/CR7uvW5E.js
  var d3 = { class: `bottom-sheet__body` };
  var f4 = Object.assign(t3(Sr({ __name: `BottomSheet`, emits: [`close`], setup(o5, { emit: l4 }) {
    let f6 = l4;
    m3();
    function p4(e10) {
      e10.key === `Escape` && f6(`close`);
    }
    return si(() => document.addEventListener(`keydown`, p4)), di(() => document.removeEventListener(`keydown`, p4)), (e10, t8) => (no(), co(or, { to: `body` }, [mo(`div`, { class: `bottom-sheet`, onClick: t8[1] ||= mt2((e11) => f6(`close`), [`self`]) }, [mo(`div`, { class: `bottom-sheet__panel`, role: `dialog`, "aria-modal": `true`, onMousedown: t8[0] ||= mt2(() => {
    }, [`stop`]) }, [t8[2] ||= mo(`div`, { class: `bottom-sheet__handle` }, [mo(`span`, { "aria-hidden": `true` })], -1), mo(`div`, d3, [wi(e10.$slots, `default`, {}, void 0, true)])], 32)])]));
  } }), [[`__scopeId`, `data-v-c48d60fe`]]), { __name: `CommonBottomSheet` });

  // master-cms-mockup/vendor/omr-preview/source/BFxMqP97.js
  var k4 = [`src`];
  var A5 = { key: 2, class: `select-option-label__text` };
  var j4 = Object.assign(t3(Sr({ __name: `SelectOptionLabel`, props: { label: {}, kind: { default: `text` } }, setup(t8) {
    return (n4, r5) => {
      let i5 = s3;
      return t8.kind === `math` ? (no(), co(i5, { key: 0, latex: Yt(t6)(t8.label), "full-size-fraction": `` }, null, 8, [`latex`])) : t8.kind === `image` ? (no(), so(`img`, { key: 1, class: `select-option-label__img`, src: t8.label, alt: `` }, null, 8, k4)) : (no(), so(`span`, A5, Se(t8.label), 1));
    };
  } }), [[`__scopeId`, `data-v-cf9b27b6`]]), { __name: `CommonSelectOptionLabel` });
  var M5 = [`disabled`];
  var N5 = { class: `select__value` };
  var P5 = { class: `select-sheet`, role: `listbox` };
  var F5 = [`aria-selected`, `onClick`];
  var I5 = { key: 0, viewBox: `0 0 24 24`, fill: `none`, "aria-hidden": `true` };
  var L5 = [`aria-selected`, `onClick`];
  var R5 = `(max-width: 767px)`;
  var z5 = Object.assign(t3(Sr({ __name: `Select`, props: ji({ options: {}, disabled: { type: Boolean, default: false }, placeholder: { default: `-` } }, { modelValue: { default: `` }, modelModifiers: {} }), emits: [`update:modelValue`], setup(a5) {
    let b6 = Zi(a5, `modelValue`), T3 = Uo(() => a5.options.map((e10) => typeof e10 == `string` ? { label: e10, value: e10 } : e10)), D5 = Uo(() => T3.value.find((e10) => e10.value === b6.value) ?? (b6.value ? { label: b6.value, value: b6.value } : void 0)), O5 = Gt(false), k6 = Gt(null), A6 = Gt(null), z7 = Gt(null), B6 = Gt({}), V6 = zn(`forceDesktop`, false), H5 = Gt(false), U5 = null;
    function W6(e10) {
      H5.value = !V6 && e10.matches;
    }
    si(() => {
      U5 = window.matchMedia(R5), H5.value = !V6 && U5.matches, U5.addEventListener(`change`, W6);
    }), di(() => U5?.removeEventListener(`change`, W6));
    function G6() {
      let e10 = A6.value;
      if (!e10) return;
      let t8 = e10.getBoundingClientRect(), n4 = window.innerHeight - t8.bottom, r5 = t8.top;
      B6.value = n4 < 240 && r5 > n4 ? { left: `${t8.left}px`, minWidth: `${t8.width}px`, bottom: `${window.innerHeight - t8.top + 5}px`, maxHeight: `${Math.max(120, r5 - 16)}px` } : { left: `${t8.left}px`, minWidth: `${t8.width}px`, top: `${t8.bottom + 5}px`, maxHeight: `${Math.max(120, n4 - 16)}px` };
    }
    function K6() {
      if (!a5.disabled) {
        if (O5.value) {
          O5.value = false;
          return;
        }
        H5.value || G6(), O5.value = true;
      }
    }
    function q6(e10) {
      b6.value = e10, O5.value = false;
    }
    function J6(e10) {
      k6.value && !k6.value.contains(e10.target) && (O5.value = false);
    }
    function Y6(e10) {
      if (!O5.value || H5.value) return;
      let t8 = e10?.target;
      t8 && z7.value && (z7.value === t8 || z7.value.contains(t8)) || (O5.value = false);
    }
    return Gn(O5, (e10) => {
      e10 ? (document.addEventListener(`mousedown`, J6), window.addEventListener(`scroll`, Y6, true), window.addEventListener(`resize`, Y6)) : (document.removeEventListener(`mousedown`, J6), window.removeEventListener(`scroll`, Y6, true), window.removeEventListener(`resize`, Y6));
    }), di(() => {
      document.removeEventListener(`mousedown`, J6), window.removeEventListener(`scroll`, Y6, true), window.removeEventListener(`resize`, Y6);
    }), (t8, r5) => {
      let i5 = j4, s6 = f4;
      return no(), so(`div`, { ref_key: `root`, ref: k6, class: `select` }, [mo(`button`, { ref_key: `trigger`, ref: A6, type: `button`, class: me([`select__trigger`, { "is-open": Yt(O5), "is-math": Yt(D5)?.kind === `math` }]), disabled: a5.disabled, onClick: K6 }, [mo(`span`, N5, [a5.disabled || !Yt(D5) ? (no(), so(q, { key: 0 }, [vo(Se(a5.placeholder), 1)], 64)) : (no(), co(i5, { key: 1, label: Yt(D5).label, kind: Yt(D5).kind }, null, 8, [`label`, `kind`]))]), (no(), so(`svg`, { class: me([`select__icon`, { "is-up": Yt(O5) }]), viewBox: `0 0 24 24`, fill: `none`, "aria-hidden": `true` }, [...r5[2] ||= [mo(`path`, { d: `M7 10l5 5 5-5`, stroke: `currentColor`, "stroke-width": `1.6`, "stroke-linecap": `round`, "stroke-linejoin": `round` }, null, -1)]], 2))], 10, M5), Yt(O5) && Yt(H5) ? (no(), co(s6, { key: 0, onClose: r5[0] ||= (e10) => O5.value = false }, { default: Fn(() => [mo(`ul`, P5, [(no(true), so(q, null, Si(Yt(T3), (e10) => (no(), so(`li`, { key: e10.value }, [mo(`button`, { type: `button`, class: me([`select-sheet__item`, { "is-selected": e10.value === b6.value }]), role: `option`, "aria-selected": e10.value === b6.value, onClick: (t9) => q6(e10.value) }, [X(i5, { label: e10.label, kind: e10.kind }, null, 8, [`label`, `kind`]), e10.value === b6.value ? (no(), so(`svg`, I5, [...r5[3] ||= [mo(`path`, { d: `M5 12.5 10 17.5 19 7.5`, stroke: `currentColor`, "stroke-width": `2`, "stroke-linecap": `round`, "stroke-linejoin": `round` }, null, -1)]])) : bo(``, true)], 10, F5)]))), 128))])]), _: 1 })) : bo(``, true), (no(), co(or, { to: `body` }, [Yt(O5) && !Yt(H5) ? (no(), so(`div`, { key: 0, ref_key: `panel`, ref: z7, class: `select__panel`, style: le(Yt(B6)), role: `listbox`, onMousedown: r5[1] ||= mt2(() => {
      }, [`stop`]) }, [(no(true), so(q, null, Si(Yt(T3), (e10) => (no(), so(`button`, { key: e10.value, type: `button`, class: me([`select__option`, { "is-selected": e10.value === b6.value }]), role: `option`, "aria-selected": e10.value === b6.value, onClick: (t9) => q6(e10.value) }, [X(i5, { label: e10.label, kind: e10.kind }, null, 8, [`label`, `kind`])], 10, L5))), 128))], 36)) : bo(``, true)]))], 512);
    };
  } }), [[`__scopeId`, `data-v-fdb088a6`]]), { __name: `CommonSelect` });

  // master-cms-mockup/vendor/omr-preview/source/COsCKZWP.js
  var m4 = { class: `confirm-dialog` };
  var h3 = { class: `confirm-dialog__titlebar` };
  var g3 = { class: `confirm-dialog__content` };
  var _3 = { class: `confirm-dialog__texts` };
  var v3 = { class: `confirm-dialog__title` };
  var y4 = { key: 0, class: `confirm-dialog__message` };
  var b3 = { class: `confirm-dialog__buttons` };
  var x3 = [`disabled`];
  var S3 = Object.assign(t3(Sr({ __name: `ConfirmDialog`, props: { confirmLabel: { default: `\uD655\uC778` }, cancelLabel: { default: `\uCDE8\uC18C` }, hideCancel: { type: Boolean, default: false }, dismissable: { type: Boolean, default: true }, confirmDisabled: { type: Boolean, default: false }, danger: { type: Boolean, default: false } }, emits: [`close`, `confirm`], setup(c4) {
    return (d5, S5) => {
      let C4 = s4, w3 = h2;
      return no(), co(w3, { width: 460, dismissable: c4.dismissable, onClose: S5[3] ||= (e10) => d5.$emit(`close`) }, { default: Fn(() => [mo(`div`, m4, [mo(`div`, h3, [X(C4, { onClick: S5[0] ||= (e10) => d5.$emit(`close`) })]), mo(`div`, g3, [mo(`div`, _3, [mo(`div`, v3, [wi(d5.$slots, `title`, {}, void 0, true)]), d5.$slots.message ? (no(), so(`div`, y4, [wi(d5.$slots, `message`, {}, void 0, true)])) : bo(``, true)]), mo(`div`, b3, [c4.hideCancel ? bo(``, true) : (no(), so(`button`, { key: 0, type: `button`, class: `confirm-dialog__btn`, onClick: S5[1] ||= (e10) => d5.$emit(`close`) }, Se(c4.cancelLabel), 1)), mo(`button`, { type: `button`, class: me([`confirm-dialog__btn confirm-dialog__btn--primary`, { "confirm-dialog__btn--danger": c4.danger }]), disabled: c4.confirmDisabled, onClick: S5[2] ||= (e10) => d5.$emit(`confirm`) }, Se(c4.confirmLabel), 11, x3)])])])]), _: 3 }, 8, [`dismissable`]);
    };
  } }), [[`__scopeId`, `data-v-21c2a112`]]), { __name: `CommonConfirmDialog` });

  // master-cms-mockup/vendor/omr-preview/source/Y1_n5oYk.js
  var j5 = { class: `answer-field` };
  var M6 = { key: 0, class: `answer-field__affix` };
  var N6 = { key: 1, class: `answer-field__affix` };
  var P6 = [`src`];
  var ee3 = { key: 2, class: `answer-field__text` };
  var te3 = { key: 2, class: `answer-field__affix` };
  var ne3 = [`src`];
  var re3 = { key: 2, class: `answer-field__text` };
  var F6 = { key: 3, class: `answer-field__delimiter` };
  var I6 = Object.assign(t3(Sr({ __name: `ExamAnswerField`, props: { label: { default: `` }, prefix: { default: `` }, suffix: { default: `` }, prefixKind: { default: `text` }, suffixKind: { default: `text` }, delimiter: { default: `` } }, setup(e10) {
    return (n4, r5) => {
      let i5 = s3;
      return no(), so(`div`, j5, [e10.label ? (no(), so(`span`, M6, Se(e10.label), 1)) : bo(``, true), e10.prefix ? (no(), so(`span`, N6, [e10.prefixKind === `math` ? (no(), co(i5, { key: 0, latex: Yt(t6)(e10.prefix), "full-size-fraction": `` }, null, 8, [`latex`])) : e10.prefixKind === `image` ? (no(), so(`img`, { key: 1, class: `answer-field__img`, src: e10.prefix, alt: `` }, null, 8, P6)) : (no(), so(`span`, ee3, Se(e10.prefix), 1))])) : bo(``, true), wi(n4.$slots, `default`, {}, void 0, true), e10.suffix ? (no(), so(`span`, te3, [e10.suffixKind === `math` ? (no(), co(i5, { key: 0, latex: Yt(t6)(e10.suffix), "full-size-fraction": `` }, null, 8, [`latex`])) : e10.suffixKind === `image` ? (no(), so(`img`, { key: 1, class: `answer-field__img`, src: e10.suffix, alt: `` }, null, 8, ne3)) : (no(), so(`span`, re3, Se(e10.suffix), 1))])) : bo(``, true), e10.delimiter ? (no(), so(`span`, F6, Se(e10.delimiter), 1)) : bo(``, true)]);
    };
  } }), [[`__scopeId`, `data-v-748ad386`]]), { __name: `StudentExamAnswerField` });
  var L6 = { class: `answer-input` };
  var R6 = { key: 0, class: `answer-input__math` };
  var z6 = [`placeholder`];
  var B5 = [`aria-pressed`, `aria-label`];
  var V5 = Object.assign(t3(Sr({ __name: `ExamAnswerInput`, props: ji({ label: { default: `` }, prefix: { default: `` }, suffix: { default: `` }, prefixKind: { default: `text` }, suffixKind: { default: `text` }, delimiter: { default: `` }, formula: { type: Boolean, default: false }, placeholder: { default: `\uB2F5\uC744 \uC791\uC131\uD574 \uC8FC\uC138\uC694.` }, level: { default: `high` }, math: { type: Boolean, default: false } }, { modelValue: { default: `` }, modelModifiers: {}, mode: {}, modeModifiers: {} }), emits: [`update:modelValue`, `update:mode`], setup(e10) {
    let n4 = Zi(e10, `modelValue`), r5 = Zi(e10, `mode`), i5 = Uo(() => r5.value ? r5.value === `math` : e10.math || e10.formula), o5 = Gt(false);
    function c4() {
      if (n4.value) {
        o5.value = true;
        return;
      }
      b6();
    }
    function b6() {
      o5.value = false, r5.value = i5.value ? `text` : `math`, n4.value = ``;
    }
    return (r6, s6) => {
      let u4 = Yt3, p4 = I6, w3 = S3;
      return no(), so(q, null, [X(p4, { label: e10.label, prefix: e10.prefix, suffix: e10.suffix, "prefix-kind": e10.prefixKind, "suffix-kind": e10.suffixKind, delimiter: e10.delimiter }, { default: Fn(() => [mo(`div`, L6, [Yt(i5) ? (no(), so(`div`, R6, [X(u4, { modelValue: n4.value, "onUpdate:modelValue": s6[0] ||= (e11) => n4.value = e11, level: e10.level }, null, 8, [`modelValue`, `level`])])) : In((no(), so(`input`, { key: 1, "onUpdate:modelValue": s6[1] ||= (e11) => n4.value = e11, type: `text`, class: `answer-input__field`, maxlength: `20`, placeholder: e10.placeholder }, null, 8, z6)), [[at2, n4.value]]), e10.formula ? (no(), so(`button`, { key: 2, type: `button`, class: me([`answer-input__formula`, { "is-active": Yt(i5) }]), "aria-pressed": Yt(i5), "aria-label": Yt(i5) ? `\uC77C\uBC18 \uC785\uB825\uC73C\uB85C \uC804\uD658` : `\uC218\uC2DD \uC785\uB825\uC73C\uB85C \uC804\uD658`, onClick: c4 }, ` \u221Ax `, 10, B5)) : bo(``, true)])]), _: 1 }, 8, [`label`, `prefix`, `suffix`, `prefix-kind`, `suffix-kind`, `delimiter`]), Yt(o5) ? (no(), co(w3, { key: 0, "confirm-label": `\uC804\uD658`, onClose: s6[2] ||= (e11) => o5.value = false, onConfirm: b6 }, { title: Fn(() => [vo(Se(Yt(i5) ? `\uC77C\uBC18\uD14D\uC2A4\uD2B8\uB85C \uBCC0\uACBD\uD558\uC2DC\uACA0\uC2B5\uB2C8\uAE4C?` : `\uC218\uC2DD\uC785\uB825\uAE30\uB85C \uBCC0\uACBD\uD558\uC2DC\uACA0\uC2B5\uB2C8\uAE4C?`), 1)]), message: Fn(() => [...s6[3] ||= [vo(`\uC9C0\uAE08\uAE4C\uC9C0 \uC791\uC131\uD55C \uB2F5\uC740 \uC9C0\uC6CC\uC9D1\uB2C8\uB2E4.`, -1)]]), _: 1 })) : bo(``, true)], 64);
    };
  } }), [[`__scopeId`, `data-v-55fe3bcc`]]), { __name: `StudentExamAnswerInput` });
  var H4 = { class: `answer-multi` };
  var U4 = { key: 2, class: `answer-multi__comma` };
  var W5 = Object.assign(t3(Sr({ __name: `ExamAnswerMulti`, props: ji({ items: {}, columns: { default: 2 }, control: { default: `input` }, options: { default: () => [] } }, { modelValue: { default: () => ({}) }, modelModifiers: {}, modes: { default: () => ({}) }, modesModifiers: {} }), emits: [`update:modelValue`, `update:modes`], setup(e10) {
    let t8 = Zi(e10, `modelValue`), r5 = Zi(e10, `modes`), i5 = Uo(() => e10.items.map((e11, t9) => ({ ...e11, key: e11.mark || String(t9) }))), a5 = Uo(() => Array.from({ length: Math.ceil(i5.value.length / e10.columns) }, (t9, n4) => i5.value.slice(n4 * e10.columns, n4 * e10.columns + e10.columns)));
    return (i6, o5) => {
      let s6 = z5, c4 = I6, u4 = V5;
      return no(), so(`div`, H4, [(no(true), so(q, null, Si(Yt(a5), (i7, a6) => (no(), so(`div`, { key: a6, class: `answer-multi__line` }, [(no(true), so(q, null, Si(i7, (n4, a7) => (no(), so(q, { key: n4.key }, [e10.control === `select` ? (no(), co(c4, { key: 0, label: n4.label, prefix: n4.mark, suffix: n4.suffix }, { default: Fn(() => [X(s6, { modelValue: t8.value[n4.key], "onUpdate:modelValue": (e11) => t8.value[n4.key] = e11, options: e10.options, placeholder: `\uC120\uD0DD` }, null, 8, [`modelValue`, `onUpdate:modelValue`, `options`])]), _: 2 }, 1032, [`label`, `prefix`, `suffix`])) : (no(), co(u4, { key: 1, modelValue: t8.value[n4.key], "onUpdate:modelValue": (e11) => t8.value[n4.key] = e11, label: n4.label, prefix: n4.mark, suffix: n4.suffix, formula: n4.formula, mode: r5.value[n4.key], "onUpdate:mode": (e11) => r5.value = { ...r5.value, [n4.key]: e11 } }, null, 8, [`modelValue`, `onUpdate:modelValue`, `label`, `prefix`, `suffix`, `formula`, `mode`, `onUpdate:mode`])), a7 < i7.length - 1 ? (no(), so(`span`, U4, `,`)) : bo(``, true)], 64))), 128))]))), 128))]);
    };
  } }), [[`__scopeId`, `data-v-65ddba22`]]), { __name: `StudentExamAnswerMulti` });
  var G5 = { class: `answer-repeat` };
  var K5 = { class: `answer-repeat__mark` };
  var q5 = { class: `answer-repeat__lines` };
  var J5 = [`aria-label`, `disabled`, `onClick`];
  var Y5 = { viewBox: `0 0 20 20`, fill: `none`, "aria-hidden": `true` };
  var X5 = { key: 0, d: `M10 2.5v15`, stroke: `currentColor`, "stroke-width": `1.5`, "stroke-linecap": `round` };
  var ie4 = { key: 0, class: `answer-repeat__sizer`, "aria-hidden": `true` };
  var ae4 = { key: 0, class: `answer-repeat__comma` };
  var Z5 = 3;
  var oe4 = Object.assign(t3(Sr({ __name: `ExamAnswerRepeat`, props: ji({ items: {}, options: { default: () => [] }, repeatable: { type: Boolean, default: true } }, { modelValue: { default: () => ({}) }, modelModifiers: {} }), emits: [`update:modelValue`], setup(e10) {
    let r5 = Zi(e10, `modelValue`), i5 = Uo(() => e10.items.reduce((t8, n4, r6) => (r6 > 0 && e10.items[r6 - 1].delimiter ? t8.at(-1).push(n4) : t8.push([n4]), t8), [])), a5 = Uo(() => e10.options.reduce((e11, t8) => t8.length > e11.length ? t8 : e11, `\uC120\uD0DD`));
    function o5(e11) {
      return r5.value[e11]?.length ? r5.value[e11] : [``];
    }
    function c4(e11, t8) {
      r5.value = { ...r5.value, [e11]: t8 };
    }
    function l4(e11, t8, n4) {
      let r6 = [...o5(e11)];
      r6[t8] = n4, c4(e11, r6);
    }
    function u4(e11) {
      o5(e11).length >= Z5 || c4(e11, [...o5(e11), ``]);
    }
    function d5(e11, t8) {
      let n4 = [...o5(e11)];
      n4.splice(t8, 1), c4(e11, n4);
    }
    return (r6, s6) => {
      let c5 = z5;
      return no(), so(`div`, G5, [(no(true), so(q, null, Si(Yt(i5), (r7, i6) => (no(), so(`div`, { key: i6, class: `answer-repeat__row` }, [(no(true), so(q, null, Si(r7, (i7) => (no(), so(`div`, { key: i7.mark, class: `answer-repeat__group` }, [mo(`span`, K5, Se(i7.mark), 1), s6[1] ||= mo(`span`, { class: `answer-repeat__dash` }, `-`, -1), mo(`div`, q5, [(no(true), so(q, null, Si(o5(i7.mark), (t8, n4) => (no(), so(`div`, { key: n4, class: `answer-repeat__line` }, [X(c5, { "model-value": t8, options: e10.options, placeholder: `\uC120\uD0DD`, "onUpdate:modelValue": (e11) => l4(i7.mark, n4, e11) }, null, 8, [`model-value`, `options`, `onUpdate:modelValue`]), e10.repeatable ? (no(), so(`button`, { key: 0, type: `button`, class: `answer-repeat__btn`, "aria-label": n4 === 0 ? `\uB2F5 \uCD94\uAC00` : `\uB2F5 \uC0AD\uC81C`, disabled: n4 === 0 && o5(i7.mark).length >= Z5, onClick: (e11) => n4 === 0 ? u4(i7.mark) : d5(i7.mark, n4) }, [(no(), so(`svg`, Y5, [n4 === 0 ? (no(), so(`path`, X5)) : bo(``, true), s6[0] ||= mo(`path`, { d: `M2.5 10h15`, stroke: `currentColor`, "stroke-width": `1.5`, "stroke-linecap": `round` }, null, -1)]))], 8, J5)) : bo(``, true)]))), 128)), r7.length > 1 ? (no(), so(`span`, ie4, Se(Yt(a5)), 1)) : bo(``, true)]), i7.delimiter ? (no(), so(`span`, ae4, Se(i7.delimiter), 1)) : bo(``, true)]))), 128))]))), 128))]);
    };
  } }), [[`__scopeId`, `data-v-a10ad163`]]), { __name: `StudentExamAnswerRepeat` });
  var se4 = { class: `answer-ox` };
  var ce5 = [`aria-label`, `onClick`];
  var le5 = { key: 0, viewBox: `0 0 32 32`, fill: `none`, "aria-hidden": `true` };
  var ue5 = { key: 1, viewBox: `0 0 32 32`, fill: `none`, "aria-hidden": `true` };
  var de5 = { key: 2, class: `answer-ox__label` };
  var fe5 = Object.assign(t3(Sr({ __name: `ExamAnswerOx`, props: ji({ options: { default: () => [`O`, `X`] }, optionKinds: { default: () => [] } }, { modelValue: { default: `` }, modelModifiers: {} }), emits: [`update:modelValue`], setup(e10) {
    let t8 = Zi(e10, `modelValue`), r5 = (e11) => e11.trim().toLowerCase(), i5 = (e11) => ({ o: `\uC815\uB2F5`, x: `\uC624\uB2F5` })[r5(e11)] ?? e11;
    return (o5, s6) => {
      let c4 = j4;
      return no(), so(`div`, se4, [(no(true), so(q, null, Si(e10.options, (n4, o6) => (no(), so(`button`, { key: o6, type: `button`, class: me([`answer-ox__btn`, { "is-selected": t8.value === n4 }]), "aria-label": i5(n4), onClick: (e11) => t8.value = n4 }, [r5(n4) === `o` ? (no(), so(`svg`, le5, [...s6[0] ||= [mo(`circle`, { cx: `16`, cy: `16`, r: `10.8`, stroke: `#2068e5`, "stroke-width": `2.4` }, null, -1)]])) : r5(n4) === `x` ? (no(), so(`svg`, ue5, [...s6[1] ||= [mo(`path`, { d: `M25.3151 6.6595 6.6667 25.3261M25.3333 25.3262 6.6849 6.6596`, stroke: `#fd5e50`, "stroke-width": `2.4`, "stroke-linecap": `round` }, null, -1)]])) : (no(), so(`span`, de5, [X(c4, { label: n4, kind: e10.optionKinds[o6] ?? `text` }, null, 8, [`label`, `kind`])]))], 10, ce5))), 128))]);
    };
  } }), [[`__scopeId`, `data-v-940df794`]]), { __name: `StudentExamAnswerOx` });
  var pe5 = { class: `answer-formula` };
  var me5 = { class: `answer-formula__head` };
  var he5 = { key: 0, class: `answer-formula__label` };
  var ge5 = [`aria-pressed`];
  var _e5 = { key: 0, class: `answer-formula__math` };
  var ve5 = [`placeholder`];
  var ye5 = 42;
  var be5 = Object.assign(t3(Sr({ __name: `ExamAnswerFormula`, props: ji({ label: { default: `` }, placeholder: { default: `\uB2F5\uC744 \uC791\uC131\uD574 \uC8FC\uC138\uC694.` }, level: { default: `high` } }, { modelValue: { default: `` }, modelModifiers: {} }), emits: [`update:modelValue`], setup(n4) {
    let i5 = Zi(n4, `modelValue`), o5 = Gt(false), p4 = Gt(false);
    function b6() {
      if (i5.value) {
        p4.value = true;
        return;
      }
      w3();
    }
    function w3() {
      p4.value = false, o5.value = !o5.value, i5.value = ``;
    }
    let T3 = Gt(null);
    function E3() {
      let e10 = T3.value;
      e10 && (e10.style.height = `auto`, e10.style.height = `${Math.max(ye5, e10.scrollHeight)}px`);
    }
    return si(E3), Gn([i5, o5], () => wn(E3)), (e10, r5) => {
      let s6 = Yt3, c4 = S3;
      return no(), so(q, null, [mo(`div`, pe5, [mo(`div`, me5, [n4.label ? (no(), so(`strong`, he5, Se(n4.label), 1)) : bo(``, true), mo(`button`, { type: `button`, class: me([`answer-formula__btn`, { "is-active": Yt(o5) }]), "aria-pressed": Yt(o5), onClick: b6 }, Se(Yt(o5) ? `\uC77C\uBC18 \uC785\uB825` : `\uC218\uC2DD\uC785\uB825\uAE30`), 11, ge5)]), Yt(o5) ? (no(), so(`div`, _e5, [X(s6, { modelValue: i5.value, "onUpdate:modelValue": r5[0] ||= (e11) => i5.value = e11, level: n4.level }, null, 8, [`modelValue`, `level`])])) : In((no(), so(`textarea`, { key: 1, ref_key: `field`, ref: T3, "onUpdate:modelValue": r5[1] ||= (e11) => i5.value = e11, class: `answer-formula__field`, rows: `1`, placeholder: n4.placeholder, onInput: E3 }, null, 40, ve5)), [[at2, i5.value]])]), Yt(p4) ? (no(), co(c4, { key: 0, "confirm-label": `\uC804\uD658`, onClose: r5[2] ||= (e11) => p4.value = false, onConfirm: w3 }, { title: Fn(() => [vo(Se(Yt(o5) ? `\uC77C\uBC18\uD14D\uC2A4\uD2B8\uB85C \uBCC0\uACBD\uD558\uC2DC\uACA0\uC2B5\uB2C8\uAE4C?` : `\uC218\uC2DD\uC785\uB825\uAE30\uB85C \uBCC0\uACBD\uD558\uC2DC\uACA0\uC2B5\uB2C8\uAE4C?`), 1)]), message: Fn(() => [...r5[3] ||= [vo(`\uC9C0\uAE08\uAE4C\uC9C0 \uC791\uC131\uD55C \uB2F5\uC740 \uC9C0\uC6CC\uC9D1\uB2C8\uB2E4.`, -1)]]), _: 1 })) : bo(``, true)], 64);
    };
  } }), [[`__scopeId`, `data-v-193d1f6c`]]), { __name: `StudentExamAnswerFormula` });
  var xe5 = { key: 0, class: `answer-files__notice` };
  var Se5 = [`disabled`];
  var Ce5 = { class: `answer-files__list` };
  var we5 = [`onClick`];
  var Te5 = [`src`];
  var Ee4 = [`onClick`];
  var De5 = [`aria-label`, `onClick`];
  var Oe4 = { key: 1, type: `button`, class: `answer-files__zoom`, "aria-label": `\uD06C\uAC8C \uBCF4\uAE30` };
  var Q5 = Object.assign(t3(Sr({ __name: `ExamAnswerFiles`, props: ji({ max: { default: 2 }, mode: { default: `file` } }, { modelValue: { default: () => [] }, modelModifiers: {} }), emits: ji([`edit`, `add`, `preview`, `remove`], [`update:modelValue`]), setup(e10, { emit: t8 }) {
    let r5 = Zi(e10, `modelValue`), i5 = t8;
    function o5() {
      r5.value = [...r5.value, ``];
    }
    return (t9, s6) => (no(), so(`div`, { class: me([`answer-files`, `is-${e10.mode}`]) }, [e10.mode === `upload` ? (no(), so(`div`, xe5, [s6[2] ||= mo(`p`, null, `\uB4F1\uB85D\uB41C \uD30C\uC77C\uC744 \uD074\uB9AD\uD558\uBA74 \uD06C\uAC8C \uBCFC \uC218 \uC788\uC2B5\uB2C8\uB2E4.`, -1), mo(`button`, { type: `button`, class: `answer-files__more`, disabled: r5.value.length >= e10.max, onClick: s6[0] ||= (e11) => i5(`add`) }, [...s6[1] ||= [vo(` \uD30C\uC77C \uCD94\uAC00 `, -1), mo(`svg`, { viewBox: `0 0 14 14`, fill: `none`, "aria-hidden": `true` }, [mo(`path`, { d: `M7 1.75v10.5M1.75 7h10.5`, stroke: `currentColor`, "stroke-width": `1.4`, "stroke-linecap": `round`, "stroke-linejoin": `round` })], -1)]], 8, Se5)])) : bo(``, true), mo(`div`, Ce5, [(no(true), so(q, null, Si(r5.value, (t10, n4) => (no(), so(`div`, { key: n4, class: `answer-files__card` }, [mo(`button`, { type: `button`, class: `answer-files__image`, "aria-label": `\uD06C\uAC8C \uBCF4\uAE30`, onClick: (e11) => i5(`preview`, n4) }, [t10 ? (no(), so(`img`, { key: 0, src: t10, alt: `` }, null, 8, Te5)) : bo(``, true)], 8, we5), mo(`button`, { type: `button`, class: `answer-files__remove`, "aria-label": `\uD30C\uC77C \uC0AD\uC81C`, onClick: (e11) => i5(`remove`, n4) }, [...s6[3] ||= [mo(`svg`, { viewBox: `0 0 19.125 19.125`, fill: `none`, "aria-hidden": `true` }, [mo(`path`, { d: `M1.24116 4.85444C3.84139 0.258824 9.67481 -1.35896 14.2705 1.24116C18.8661 3.84139 20.4839 9.67481 17.8837 14.2705C17.2269 15.3154 16.8102 15.8187 16.0253 16.6113C13.054 19.3367 8.55332 19.9765 4.85444 17.8837C0.258824 15.2835 -1.35896 9.45009 1.24116 4.85444ZM12.0205 7.10542C11.8008 6.88577 11.4442 6.88581 11.2246 7.10542L9.56147 8.76753L7.89936 7.10542C7.67971 6.88577 7.32412 6.88581 7.10444 7.10542C6.88477 7.32509 6.88477 7.68067 7.10444 7.90034L8.76655 9.56245L7.10444 11.2255C6.88511 11.4451 6.8851 11.8009 7.10444 12.0205C7.32415 12.2397 7.68081 12.24 7.90034 12.0205L9.56245 10.3583L11.2246 12.0205C11.4443 12.2397 11.8 12.24 12.0195 12.0205C12.2389 11.8009 12.2387 11.4452 12.0195 11.2255L10.3574 9.56343L12.0205 7.90034C12.2396 7.68087 12.2394 7.32504 12.0205 7.10542Z`, fill: `#333` })], -1)]], 8, Ee4), e10.mode === `file` ? (no(), so(`button`, Oe4, [...s6[5] ||= [mo(`svg`, { viewBox: `0 0 18 19`, fill: `none`, "aria-hidden": `true` }, [mo(`path`, { d: `M13.25 14.25L17.25 18.25M8.25 6.25V10.25M6.25 8.25H10.25M15.75 8.25C15.75 12.3921 12.3921 15.75 8.25 15.75C4.10786 15.75 0.75 12.3921 0.75 8.25C0.75 4.10786 4.10786 0.75 8.25 0.75C12.3921 0.75 15.75 4.10786 15.75 8.25Z`, stroke: `currentColor`, "stroke-width": `1.5`, "stroke-linecap": `round` })], -1)]])) : (no(), so(`button`, { key: 0, type: `button`, class: `answer-files__zoom`, "aria-label": e10.mode === `draw` ? `\uB2E4\uC2DC \uC791\uC131` : `\uD30C\uC77C \uBC14\uAFB8\uAE30`, onClick: (e11) => i5(`edit`, n4) }, [...s6[4] ||= [mo(`svg`, { viewBox: `0 0 24 24`, fill: `none`, "aria-hidden": `true` }, [mo(`path`, { d: `M14.3843 6.37201L18.7963 10.7567M9.33333 18.6667H2.66667M7.69535 18.6664L10.6667 18.6667C11.2049 18.6553 11.5303 18.3802 11.9124 18.0034L20.8368 9.20531C21.497 8.55448 21.4991 7.49436 20.8416 6.8409L18.4744 4.48836C17.8178 3.83583 16.7522 3.83758 16.0969 4.49143C12.8752 7.70609 10.6986 9.87801 7.34308 13.2262C6.96219 13.6062 6.67811 14.1304 6.66667 14.6667L6.6669 17.6443C6.65475 18.2137 7.12239 18.6785 7.69535 18.6664Z`, stroke: `currentColor`, "stroke-width": `1.5`, "stroke-linecap": `round`, "stroke-linejoin": `round` })], -1)]], 8, De5))]))), 128)), e10.mode === `file` && r5.value.length < e10.max ? (no(), so(`button`, { key: 0, type: `button`, class: `answer-files__add`, onClick: o5 }, [...s6[6] ||= [mo(`svg`, { viewBox: `0 0 22 22`, fill: `none`, "aria-hidden": `true` }, [mo(`path`, { d: `M11 2.75v16.5M2.75 11h16.5`, stroke: `currentColor`, "stroke-width": `1.5`, "stroke-linecap": `round`, "stroke-linejoin": `round` })], -1), vo(` \uD30C\uC77C \uCD94\uAC00 `, -1)]])) : bo(``, true)])], 2));
  } }), [[`__scopeId`, `data-v-79a5124e`]]), { __name: `StudentExamAnswerFiles` });
  var ke5 = { class: `answer-method` };
  var Ae5 = { key: 0, class: `answer-method__label` };
  var $5 = { class: `answer-method__box` };
  var je5 = { class: `answer-method__actions` };
  var Me5 = { key: 0, class: `answer-method__hint` };
  var Ne5 = Object.assign(t3(Sr({ __name: `ExamAnswerMethod`, props: { label: { default: `` }, hint: { type: Boolean, default: false }, maxFiles: { default: 6 } }, emits: [`write`, `file`], setup(e10, { emit: n4 }) {
    let r5 = n4;
    return (n5, i5) => (no(), so(`div`, ke5, [e10.label ? (no(), so(`strong`, Ae5, Se(e10.label), 1)) : bo(``, true), mo(`div`, $5, [i5[4] ||= mo(`p`, { class: `answer-method__text` }, `\uB2F5 \uC785\uB825 \uBC29\uC2DD\uC744 \uC120\uD0DD\uD574 \uC8FC\uC138\uC694.`, -1), mo(`div`, je5, [mo(`button`, { type: `button`, class: `answer-method__btn`, onClick: i5[0] ||= (e11) => r5(`write`) }, `\uB2F5\uC548 \uC791\uC131`), mo(`button`, { type: `button`, class: `answer-method__btn`, onClick: i5[1] ||= (e11) => r5(`file`) }, `\uD30C\uC77C \uC120\uD0DD`)]), e10.hint ? (no(), so(`p`, Me5, [i5[2] ||= vo(` JPG, PNG \uB4F1 \uC774\uBBF8\uC9C0 \uD30C\uC77C\uB9CC \uB4F1\uB85D \uAC00\uB2A5\uD569\uB2C8\uB2E4.`, -1), i5[3] ||= mo(`br`, null, null, -1), vo(`\uD30C\uC77C \uC120\uD0DD \uC2DC \uCD5C\uB300 ` + Se(e10.maxFiles) + `\uAC1C\uAE4C\uC9C0 \uB4F1\uB85D\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4. `, 1)])) : bo(``, true)])]));
  } }), [[`__scopeId`, `data-v-06e07df3`]]), { __name: `StudentExamAnswerMethod` });
  var Pe5 = { class: `answer-control` };
  var Fe5 = [`aria-pressed`, `disabled`, `onClick`];
  var Ie5 = { class: `answer-choice__num` };
  var Le5 = Object.assign(t3(Sr({ __name: `ExamAnswerControl`, props: ji({ blocks: {}, variant: { default: `single` }, disabled: { type: Boolean, default: false }, correct: { default: () => [] }, picked: {}, drawn: { default: `` }, files: { default: () => [] }, level: { default: `high` } }, { answer: {}, answerModifiers: {}, modelValue: { default: () => ({}) }, modelModifiers: {}, modes: { default: () => ({}) }, modesModifiers: {} }), emits: ji([`write`, `remove-drawing`, `file`, `update-files`, `preview`, `remove-file`], [`update:answer`, `update:modelValue`, `update:modes`]), setup(e10, { emit: r5 }) {
    let i5 = r5, o5 = Zi(e10, `answer`), c4 = Zi(e10, `modelValue`), u4 = Zi(e10, `modes`), p4 = (t8) => e10.picked ? e10.picked.includes(t8) : o5.value === t8;
    function g6(e11) {
      let t8 = e11.options ?? [], n4 = e11.optionKinds;
      return n4?.some((e12) => e12 !== `text`) ? t8.map((e12, t9) => ({ label: e12, value: e12, kind: n4[t9] ?? `text` })) : t8;
    }
    function v7(e11) {
      return c4.value[e11];
    }
    function b6(e11, t8) {
      c4.value = { ...c4.value, [e11]: t8 };
    }
    function C4(e11, t8) {
      u4.value = { ...u4.value, [e11]: t8 };
    }
    return (r6, s6) => {
      let c5 = V5, w3 = z5, T3 = I6, E3 = W5, D5 = oe4, k6 = fe5, A6 = be5, j6 = Q5, M7 = Ne5;
      return no(), so(`div`, Pe5, [(no(true), so(q, null, Si(e10.blocks, (r7, O5) => (no(), so(q, { key: O5 }, [r7.type === 1 ? (no(), so(`div`, { key: 0, class: me([`answer-choice`, `is-${e10.variant}`]) }, [(no(true), so(q, null, Si(r7.count ?? 5, (n4) => (no(), so(`button`, { key: n4, type: `button`, class: me([`answer-choice__cell`, { "is-selected": p4(n4), "is-answer": e10.correct.includes(n4) }]), "aria-pressed": p4(n4), disabled: e10.disabled, onClick: (e11) => o5.value = n4 }, [mo(`span`, Ie5, Se(n4), 1)], 10, Fe5))), 128))], 2)) : r7.type === 2 ? (no(), co(c5, { key: 1, "model-value": String(v7(O5) ?? ``), label: r7.label, prefix: r7.prefix, suffix: r7.suffix, "prefix-kind": r7.prefixKind, "suffix-kind": r7.suffixKind, delimiter: r7.delimiter, formula: r7.formula, math: r7.math, level: e10.level, mode: u4.value[O5], "onUpdate:modelValue": (e11) => b6(O5, e11), "onUpdate:mode": (e11) => C4(O5, e11) }, null, 8, [`model-value`, `label`, `prefix`, `suffix`, `prefix-kind`, `suffix-kind`, `delimiter`, `formula`, `math`, `level`, `mode`, `onUpdate:modelValue`, `onUpdate:mode`])) : r7.type === 3 ? (no(), co(T3, { key: 2, label: r7.label, prefix: r7.prefix, suffix: r7.suffix, "prefix-kind": r7.prefixKind, "suffix-kind": r7.suffixKind, delimiter: r7.delimiter }, { default: Fn(() => [X(w3, { "model-value": String(v7(O5) ?? ``), options: g6(r7), placeholder: `\uC120\uD0DD`, "onUpdate:modelValue": (e11) => b6(O5, e11) }, null, 8, [`model-value`, `options`, `onUpdate:modelValue`])]), _: 2 }, 1032, [`label`, `prefix`, `suffix`, `prefix-kind`, `suffix-kind`, `delimiter`])) : r7.type === 4 || r7.type === 5 ? (no(), co(E3, { key: 3, "model-value": v7(O5) ?? {}, items: r7.items ?? [], columns: r7.columns, control: r7.type === 5 ? `select` : `input`, options: r7.options ?? [], modes: u4.value[O5] ?? {}, "onUpdate:modelValue": (e11) => b6(O5, e11), "onUpdate:modes": (e11) => C4(O5, e11) }, null, 8, [`model-value`, `items`, `columns`, `control`, `options`, `modes`, `onUpdate:modelValue`, `onUpdate:modes`])) : r7.type === 6 ? (no(), co(D5, { key: 4, "model-value": v7(O5) ?? {}, items: r7.items ?? [], options: r7.options ?? [], repeatable: r7.repeatable ?? true, "onUpdate:modelValue": (e11) => b6(O5, e11) }, null, 8, [`model-value`, `items`, `options`, `repeatable`, `onUpdate:modelValue`])) : r7.type === 7 ? (no(), co(T3, { key: 5, label: r7.label, delimiter: r7.delimiter }, { default: Fn(() => [X(k6, { "model-value": String(v7(O5) ?? ``), options: r7.options, "option-kinds": r7.optionKinds, "onUpdate:modelValue": (e11) => b6(O5, e11) }, null, 8, [`model-value`, `options`, `option-kinds`, `onUpdate:modelValue`])]), _: 2 }, 1032, [`label`, `delimiter`])) : r7.type === 8 ? (no(), co(A6, { key: 6, "model-value": String(v7(O5) ?? ``), label: r7.label, level: e10.level, "onUpdate:modelValue": (e11) => b6(O5, e11) }, null, 8, [`model-value`, `label`, `level`, `onUpdate:modelValue`])) : r7.type === 9 && r7.files ? (no(), co(j6, { key: 7, "model-value": v7(O5) ?? [], "onUpdate:modelValue": (e11) => b6(O5, e11) }, null, 8, [`model-value`, `onUpdate:modelValue`])) : r7.type === 9 && e10.drawn ? (no(), co(j6, { key: 8, mode: `draw`, "model-value": [e10.drawn], onEdit: s6[0] ||= (e11) => i5(`write`), onRemove: s6[1] ||= (e11) => i5(`remove-drawing`) }, null, 8, [`model-value`])) : r7.type === 9 && e10.files.length ? (no(), co(j6, { key: 9, mode: `upload`, max: Yt(3), "model-value": e10.files, onAdd: s6[2] ||= (e11) => i5(`file`), onPreview: (e11) => i5(`preview`, e11), onRemove: (e11) => i5(`remove-file`, e11), onEdit: (e11) => i5(`file`, e11), "onUpdate:modelValue": s6[3] ||= (e11) => i5(`update-files`, e11) }, null, 8, [`max`, `model-value`, `onPreview`, `onRemove`, `onEdit`])) : r7.type === 9 ? (no(), co(M7, { key: 10, label: r7.label, hint: e10.variant === `single`, "max-files": Yt(3), onWrite: s6[4] ||= (e11) => i5(`write`), onFile: s6[5] ||= (e11) => i5(`file`) }, null, 8, [`label`, `hint`, `max-files`])) : bo(``, true)], 64))), 128))]);
    };
  } }), [[`__scopeId`, `data-v-6f678ce7`]]), { __name: `StudentExamAnswerControl` });

  // master-cms-mockup/vendor/omr-preview/source/CHZCu2qy.js
  var g4 = { class: `omr-table__row omr-table__row--head` };
  var _4 = { key: 0, class: `omr-table__view` };
  var v4 = [`onFocusin`, `onClick`];
  var y5 = { class: `omr-table__no` };
  var b4 = [`inert`];
  var x4 = { key: 0, class: `omr-table__view` };
  var S4 = [`onClick`];
  var C3 = Object.assign(t3(Sr({ __name: `ExamOmrTable`, props: ji({ questions: {}, answers: { default: () => ({}) }, inputs: { default: () => ({}) }, current: { default: 0 }, showView: { type: Boolean, default: true }, scrollable: { type: Boolean, default: true }, variant: { default: `omr` }, level: {}, drawn: { default: () => ({}) }, files: { default: () => ({}) }, locked: { default: () => ({}) } }, { modes: { default: () => ({}) }, modesModifiers: {} }), emits: ji([`pick`, `input`, `focus-row`, `view`, `write`, `remove-drawing`, `file`, `update-files`, `preview`, `remove-file`], [`update:modes`]), setup(n4, { emit: u4 }) {
    let m5 = u4, C4 = false;
    function w3() {
      C4 = true;
    }
    function T3(e10) {
      C4 || m5(`focus-row`, e10);
    }
    function E3(e10) {
      C4 = false, m5(`focus-row`, e10);
    }
    let D5 = Zi(n4, `modes`);
    function O5(e10) {
      let t8 = n4.answers[e10];
      return Array.isArray(t8) ? t8 : void 0;
    }
    function k6(e10) {
      return e10.blocks.length === 1 && e10.blocks[0].type === 1;
    }
    return (a5, u5) => {
      let C5 = Le5;
      return no(), so(`div`, { class: me([`omr-table`, { "is-scrollable": n4.scrollable }]) }, [mo(`div`, g4, [u5[0] ||= mo(`span`, { class: `omr-table__no` }, `\uBC88\uD638`, -1), u5[1] ||= mo(`span`, { class: `omr-table__field` }, `\uB2F5 \uB780`, -1), n4.showView ? (no(), so(`span`, _4, `\uBB38\uD56D`)) : bo(``, true)]), (no(true), so(q, null, Si(n4.questions, (t8) => (no(), so(`div`, { key: t8.no, class: me([`omr-table__row`, { "is-current": t8.no === n4.current }]), onPointerdown: w3, onFocusin: (e10) => T3(t8.no), onClick: (e10) => E3(t8.no) }, [mo(`span`, y5, Se(String(t8.no).padStart(2, `0`)), 1), mo(`div`, { class: me([`omr-table__field`, { "is-flush": k6(t8) }]), inert: n4.locked[t8.no] || void 0 }, [X(C5, { blocks: t8.blocks, variant: n4.variant, level: t8.keypad ?? n4.level, disabled: !!n4.locked[t8.no], correct: t8.correct ?? [], picked: t8.picked ?? O5(t8.no), answer: O5(t8.no) ? void 0 : n4.answers[t8.no], "model-value": n4.inputs[t8.no] ?? {}, modes: D5.value[t8.no] ?? {}, drawn: n4.drawn[t8.no] ?? ``, files: n4.files[t8.no] ?? [], "onUpdate:answer": (e10) => e10 && m5(`pick`, t8.no, e10), "onUpdate:modelValue": (e10) => m5(`input`, t8.no, e10), "onUpdate:modes": (e10) => D5.value = { ...D5.value, [t8.no]: e10 }, onWrite: (e10) => m5(`write`, t8.no), onRemoveDrawing: (e10) => m5(`remove-drawing`, t8.no), onFile: (e10) => m5(`file`, t8.no, e10), onUpdateFiles: (e10) => m5(`update-files`, t8.no, e10), onPreview: (e10) => m5(`preview`, t8.no, e10), onRemoveFile: (e10) => m5(`remove-file`, t8.no, e10) }, null, 8, [`blocks`, `variant`, `level`, `disabled`, `correct`, `picked`, `answer`, `model-value`, `modes`, `drawn`, `files`, `onUpdate:answer`, `onUpdate:modelValue`, `onUpdate:modes`, `onWrite`, `onRemoveDrawing`, `onFile`, `onUpdateFiles`, `onPreview`, `onRemoveFile`])], 10, b4), n4.showView ? (no(), so(`span`, x4, [mo(`button`, { type: `button`, class: `omr-table__view-btn`, onClick: mt2((e10) => m5(`view`, t8.no), [`stop`]) }, `\uBCF4\uAE30`, 8, S4)])) : bo(``, true)], 42, v4))), 128)), wi(a5.$slots, `footer`, {}, void 0, true)], 2);
    };
  } }), [[`__scopeId`, `data-v-b199c653`]]), { __name: `StudentExamOmrTable` });

  // master-cms-mockup/vendor/omr-preview/source/DsHCOj37.js
  var e9 = { choice: 1, text: 2, select: 3, match: 6, ox: 7, essay: 9 };
  var t7 = (e10) => e10?.value || void 0;
  var n3 = (e10) => e10.value_type === `math` || e10.value_type === `image` ? e10.value_type : `text`;
  var r4 = (e10) => e10.type === `BUTTON` && (e10.options ?? []).length === 2;
  function i4(t8) {
    if (t8.left_fields?.length) return e9.match;
    if (r4(t8)) return e9.ox;
    switch (t8.type) {
      case `TEXT`:
        return e9.text;
      case `SELECT`:
        return e9.select;
      case `BUTTON`:
        return e9.choice;
      case `COMMENT`:
        return e9.essay;
      default:
        return t8.options?.length ? e9.choice : e9.essay;
    }
  }
  function a4(r5) {
    return r5.map((r6) => {
      let a5 = i4(r6), o5 = { type: a5 };
      return r6.title && (o5.label = r6.title), r6.pre_text && (o5.prefix = t7(r6.pre_text), o5.prefixKind = n3(r6.pre_text)), r6.post_text && (o5.suffix = t7(r6.post_text), o5.suffixKind = n3(r6.post_text)), r6.delimiter && (o5.delimiter = r6.delimiter), a5 === e9.choice && (o5.count = r6.options?.length ?? 5), a5 === e9.text && (o5.formula = true), (a5 === e9.select || a5 === e9.ox) && (o5.options = (r6.options ?? []).map((e10) => e10.value), o5.optionKinds = (r6.options ?? []).map(n3)), a5 === e9.match && (o5.items = (r6.left_fields ?? []).map((e10) => ({ mark: e10.value, delimiter: e10.delimiter })), o5.options = (r6.right_fields ?? []).map((e10) => e10.value), o5.repeatable = r6.multi_flag === `Y`), o5;
    });
  }
  function o4(e10) {
    return !e10 || typeof e10 != `object` ? [] : Array.isArray(e10.nodes) ? e10.nodes.flatMap(o4) : [e10];
  }
  var s5 = (e10) => e10?.rule_type === `VALUE` ? (e10.allowed_answer ?? []).filter((e11) => e11.value) : [];
  function c3(e10, t8, n4, r5) {
    let i5 = s5(o4(r5).find((e11) => e11.rule_type === `VALUE`)), a5 = i5[0];
    if (!a5) {
      e10.notes.push({ index: t8, kind: `missing` });
      return;
    }
    e10.inputs[t8] = a5.value, n4 === 2 && a5.value_type === `math` && (e10.math[t8] = true), i5.length > 1 && e10.notes.push({ index: t8, kind: `alternates`, values: i5.slice(1) });
  }
  function l3(e10, t8, n4, r5) {
    let i5 = s5(o4(r5).find((e11) => e11.rule_type === `VALUE`))[0]?.value.trim().toLowerCase(), a5 = (n4.options ?? []).find((e11) => e11.value.trim().toLowerCase() === i5);
    if (!a5) {
      e10.notes.push({ index: t8, kind: `missing` });
      return;
    }
    e10.inputs[t8] = a5.value;
  }
  function u3(e10, t8, n4, r5) {
    let i5 = o4(r5).flatMap((e11) => s5(e11).map((e12) => e12.value)), a5 = (n4.options ?? []).flatMap((e11, t9) => i5.includes(e11.value) ? [t9 + 1] : []);
    a5.length || e10.notes.push({ index: t8, kind: `missing` }), e10.correct.push(...a5.filter((t9) => !e10.correct.includes(t9)));
  }
  function d4(e10, t8, n4, r5) {
    let i5 = (n4.left_fields ?? []).map((e11) => e11.value), a5 = i5.length > 1 && r5?.nodes ? r5.nodes : [r5], c4 = {};
    i5.forEach((e11, t9) => {
      let n5 = o4(a5[t9]).flatMap((e12) => s5(e12).map((e13) => e13.value));
      n5.length && (c4[e11] = n5);
    }), Object.keys(c4).length ? e10.inputs[t8] = c4 : e10.notes.push({ index: t8, kind: `missing` });
  }
  function f5(e10, t8) {
    let n4 = { correct: [], inputs: {}, math: {}, notes: [] };
    if (!t8) return n4;
    let r5 = e10.length > 1 ? o4(t8) : [];
    return e10.forEach((a5, o5) => {
      let s6 = e10.length > 1 ? r5[o5] : t8, f6 = i4(a5);
      f6 === 1 ? u3(n4, o5, a5, s6) : f6 === 6 ? d4(n4, o5, a5, s6) : f6 === 7 ? l3(n4, o5, a5, s6) : f6 === 9 ? n4.notes.push({ index: o5, kind: `manual` }) : c3(n4, o5, f6, s6);
    }), n4;
  }
  function p3(e10, t8) {
    return e10.length === 1 && i4(e10[0]) === 1 && Array.isArray(t8?.nodes);
  }
  function h4(e10, t8, n4) {
    let r5 = t8 ?? {}, i5 = e10.left_fields ?? [], a5 = (e11) => (r5[e11] ?? []).filter((e12) => e12 !== ``);
    return i5.some((e11) => a5(e11.value).length) ? i5.flatMap((e11) => {
      let t9 = a5(e11.value);
      return t9.length ? t9 : [``];
    }) : i5.map(() => n4);
  }
  function g5(e10, t8, n4, r5 = ``) {
    let a5 = i4(e10);
    if (a5 === 1) {
      let n5 = (t9) => e10.options?.[t9 - 1]?.value ?? null;
      return Array.isArray(t8) ? t8.map(n5) : t8 ? n5(t8) : null;
    }
    return a5 === 6 ? h4(e10, n4, r5) : a5 === 7 ? (e10.options ?? []).find((e11) => e11.value === n4)?.value ?? null : typeof n4 == `string` && n4 !== `` ? n4 : null;
  }
  function _5(e10, t8) {
    if (t8 == null || Array.isArray(t8) && !t8.length) return null;
    if (e10 && Array.isArray(e10.nodes)) {
      let n4 = Array.isArray(t8) ? t8 : [t8], r5 = e10.nodes;
      return Array.from({ length: Math.max(n4.length, r5.length) }, (e11, t9) => _5(r5[t9], n4[t9]));
    }
    return Array.isArray(t8) && t8.length === 1 ? _5(e10, t8[0]) : t8;
  }
  function v5(e10, t8) {
    return Array.isArray(e10.nodes) ? e10.nodes.map((e11) => v5(e11, t8)) : _5(e10, t8());
  }
  function y6(e10, t8 = []) {
    return Array.isArray(e10) ? e10.forEach((e11) => y6(e11, t8)) : t8.push(e10 ?? ``), t8;
  }
  function b5(e10, t8, n4, r5) {
    let a5 = e10.map((e11, t9) => g5(e11, n4, r5?.[t9]));
    if (e10.length === 1) return y6(i4(e10[0]) === 6 ? a5[0] : _5(t8 ?? void 0, a5[0]));
    if (!t8) return y6(a5);
    let o5 = 0;
    return y6(v5(t8, () => a5[o5++]));
  }

  // master-cms-mockup/vendor/omr-preview/source/CMo_b7JC.js
  var v6 = () => ({ query: { level: "high" } });
  var ae5 = { key: 0, class: `omr-preview__error` };
  var oe5 = { key: 0, class: `omr-preview__toolbar` };
  var se5 = { class: `omr-preview__switch-field` };
  var ce6 = [`aria-checked`];
  var le6 = [`inert`];
  var ue6 = { key: 1, class: `omr-preview__notes` };
  var de6 = { class: `omr-preview__note-label` };
  var fe6 = [`src`];
  var pe6 = { key: 2, class: `omr-preview__submit` };
  var me6 = { key: 0, class: `omr-preview__result-detail` };
  var he6 = [`disabled`];
  var ge6 = { key: 2, class: `omr-preview__empty` };
  var D4 = `donga-omr-preview`;
  var O4 = 1;
  var k5 = t3(Sr({ __name: `omr-preview`, setup(ee4) {
    e7({ layout: `empty` }), y2({ title: `OMR \uBBF8\uB9AC\uBCF4\uAE30`, htmlAttrs: { style: `scrollbar-gutter: auto` } }), Rn(`forceDesktop`, true);
    let y7 = A4(v6().query.level);
    function k6(e10) {
      if (e10.source === window || location.protocol === "file:" && e10.source === window.parent) return true;
      try {
        let { protocol: t8, hostname: n4 } = new URL(e10.origin);
        return (t8 === `https:` || t8 === `http:`) && n4.endsWith(`.dongahub.com`);
      } catch {
        return false;
      }
    }
    let A6 = Gt(null), j6 = Gt(``), M7 = Gt([]), N7 = Gt(null), P7 = Gt(`omr`), F7 = Gt(false), I7 = Uo(() => a4(M7.value)), L7 = Uo(() => N7.value != null), R7 = Uo(() => L7.value && F7.value), z7 = Uo(() => f5(M7.value, N7.value)), B6 = Uo(() => p3(M7.value, N7.value)), V6 = Uo(() => I7.value.map((e10) => e10.type).join(`-`)), H5 = Gt({}), U5 = Gt([]), W6 = Gt({});
    Gn([V6, B6], () => {
      H5.value = {}, U5.value = [], W6.value = {};
    });
    let _e6 = Uo(() => {
      if (!R7.value) return [{ no: O4, blocks: I7.value, picked: B6.value ? U5.value : void 0 }];
      let { math: e10, correct: t8 } = z7.value;
      return [{ no: O4, blocks: I7.value.map((t9, n4) => e10[n4] ? { ...t9, math: true } : { ...t9, formula: false }), correct: t8 }];
    });
    function ve6(e10, t8) {
      if (R7.value) return;
      if (!B6.value) {
        H5.value[e10] = t8;
        return;
      }
      let n4 = U5.value;
      U5.value = n4.includes(t8) ? n4.filter((e11) => e11 !== t8) : [...n4, t8].sort((e11, t9) => e11 - t9);
    }
    function ye6(e10, t8) {
      R7.value || (W6.value[e10] = t8);
    }
    function be6(e10) {
      let t8 = M7.value[e10]?.title;
      return t8 ? `${e10 + 1}\uBC88 \uCE78(${t8})` : `${e10 + 1}\uBC88 \uCE78`;
    }
    let G6 = Gt(false), K6 = Gt(null), q6 = 0;
    Gn([M7, N7, H5, U5, W6], () => {
      q6++, K6.value = null;
    }, { deep: true });
    function xe6(e10) {
      let t8 = e10.data?.[0], n4 = e10.message && e10.message !== `ok` ? e10.message : void 0;
      return t8 ? t8.is_correct === true ? { tone: `correct`, text: `\uC815\uB2F5\uC785\uB2C8\uB2E4.`, detail: n4 } : t8.is_correct === false ? { tone: `wrong`, text: `\uC624\uB2F5\uC785\uB2C8\uB2E4.`, detail: n4 } : { tone: `unknown`, text: `\uD310\uC815\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.`, detail: n4 } : { tone: `error`, text: `\uCC44\uC810 \uACB0\uACFC\uB97C \uBC1B\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.` };
    }
    async function J6() {
      let e10 = ++q6;
      G6.value = true;
      try {
        let t8 = B6.value ? U5.value : H5.value[O4], n4 = b5(M7.value, N7.value, t8, W6.value[O4]), r5 = await t2(`/api/omr-preview/check`, { method: `POST`, body: { answer: N7.value, value: n4 } });
        e10 === q6 && (K6.value = xe6(r5));
      } catch (t8) {
        let n4 = t8.data?.data?.message;
        e10 === q6 && (K6.value = { tone: `error`, text: `\uCC44\uC810\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.`, detail: n4 });
      } finally {
        G6.value = false;
      }
    }
    function Y6(e10, t8) {
      if (e10 != null) {
        if (typeof e10 != `string`) return e10;
        try {
          return JSON.parse(e10);
        } catch (e11) {
          throw Error(`${t8} JSON \uC624\uB958: ${e11.message}`, { cause: e11 });
        }
      }
    }
    function X6(e10) {
      try {
        let t8 = Y6(e10.omr, `OMR`), n4 = Y6(e10.answer ?? void 0, `\uC815\uB2F5`);
        t8 && (M7.value = Array.isArray(t8) ? t8 : []), N7.value = n4 && typeof n4 == `object` ? n4 : null, e10.options?.variant && (P7.value = e10.options.variant), j6.value = ``;
      } catch (e11) {
        j6.value = e11.message;
      }
    }
    function Z6(e10, t8 = {}) {
      typeof window > `u` || window.parent === window || window.parent.postMessage({ source: D4, type: e10, ...t8 }, `*`);
    }
    let Q6 = Ot3(), $6 = () => Z6(`rendered`, { blocks: I7.value.length, error: j6.value || void 0, height: Math.max(A6.value?.scrollHeight ?? 0, Q6.value) });
    return Gn([I7, j6, Q6], () => wn($6)), si(() => {
      let e10 = v6().query;
      e10.omr && X6({ omr: String(e10.omr) });
      let t8 = (e11) => {
        let t9 = e11.data;
        if (!(!t9 || t9.source !== D4 || t9.type !== `render`)) {
          if (!k6(e11)) {
            console.warn(`[omr-preview] \uD5C8\uC6A9\uD558\uC9C0 \uC54A\uC740 \uCD9C\uCC98\uB77C \uBB34\uC2DC\uD55C\uB2E4:`, e11.origin);
            return;
          }
          X6(t9);
        }
      };
      window.addEventListener(`message`, t8), di(() => window.removeEventListener(`message`, t8));
      let n4 = new ResizeObserver($6);
      A6.value && n4.observe(A6.value), di(() => n4.disconnect()), Z6(`ready`);
    }), (e10, t8) => {
      let i5 = C3, a5 = s3;
      return no(), so(`div`, { ref_key: `root`, ref: A6, class: `omr-preview` }, [Yt(j6) ? (no(), so(`p`, ae5, Se(Yt(j6)), 1)) : Yt(I7).length ? (no(), so(q, { key: 1 }, [Yt(L7) ? (no(), so(`div`, oe5, [mo(`label`, se5, [t8[2] ||= vo(` \uC815\uB2F5 \uBCF4\uAE30 `, -1), mo(`span`, { class: me([`switch`, { "is-on": Yt(F7) }]), role: `switch`, "aria-checked": Yt(F7), onClick: t8[0] ||= (e11) => F7.value = !Yt(F7) }, [...t8[1] ||= [mo(`span`, { class: `switch__dot` }, null, -1)]], 10, ce6)])])) : bo(``, true), mo(`div`, { class: `omr-preview__frame`, inert: Yt(R7) }, [(no(), co(i5, { key: `${Yt(V6)}-${Yt(R7)}`, questions: Yt(_e6), answers: Yt(R7) ? {} : Yt(H5), inputs: Yt(R7) ? { [O4]: Yt(z7).inputs } : Yt(W6), variant: Yt(P7), level: Yt(y7), "show-view": false, scrollable: false, onPick: ve6, onInput: ye6 }, null, 8, [`questions`, `answers`, `inputs`, `variant`, `level`]))], 8, le6), Yt(R7) && Yt(z7).notes.length ? (no(), so(`ul`, ue6, [(no(true), so(q, null, Si(Yt(z7).notes, (e11) => (no(), so(`li`, { key: `${e11.index}-${e11.kind}`, class: me([`omr-preview__note`, `is-${e11.kind}`]) }, [mo(`span`, de6, Se(be6(e11.index)), 1), e11.kind === `alternates` ? (no(), so(q, { key: 0 }, [t8[3] ||= vo(` \uC720\uC0AC \uC815\uB2F5: `, -1), (no(true), so(q, null, Si(e11.values, (e12, t9) => (no(), so(q, { key: t9 }, [t9 ? (no(), so(q, { key: 0 }, [vo(`, `)], 64)) : bo(``, true), e12.value_type === `math` ? (no(), co(a5, { key: 1, latex: e12.value, "full-size-fraction": `` }, null, 8, [`latex`])) : e12.value_type === `image` ? (no(), so(`img`, { key: 2, class: `omr-preview__note-img`, src: e12.value, alt: `\uC720\uC0AC \uC815\uB2F5 \uC774\uBBF8\uC9C0` }, null, 8, fe6)) : (no(), so(q, { key: 3 }, [vo(Se(e12.value), 1)], 64))], 64))), 128))], 64)) : e11.kind === `manual` ? (no(), so(q, { key: 1 }, [vo(`\uC218\uB3D9 \uCC44\uC810(\uC815\uD574\uC9C4 \uC815\uB2F5 \uC5C6\uC74C)`)], 64)) : (no(), so(q, { key: 2 }, [vo(`\uC815\uB2F5 \uBBF8\uC124\uC815`)], 64))], 2))), 128))])) : bo(``, true), Yt(R7) ? bo(``, true) : (no(), so(`div`, pe6, [Yt(K6) ? (no(), so(`p`, { key: 0, class: me([`omr-preview__result`, `is-${Yt(K6).tone}`]), role: `status` }, [mo(`strong`, null, Se(Yt(K6).text), 1), Yt(K6).detail ? (no(), so(`span`, me6, Se(Yt(K6).detail), 1)) : bo(``, true)], 2)) : bo(``, true), mo(`button`, { type: `button`, class: `omr-preview__btn`, disabled: Yt(G6), onClick: J6 }, Se(Yt(G6) ? `\uCC44\uC810 \uC911` : `\uCC44\uC810\uD558\uAE30`), 9, he6)]))], 64)) : (no(), so(`p`, ge6, `OMR \uB370\uC774\uD130\uB97C \uAE30\uB2E4\uB9AC\uB294 \uC911\uC785\uB2C8\uB2E4.`))], 512);
    };
  } }), [[`__scopeId`, `data-v-d3a57aee`]]);

  // master-cms-mockup/vendor/omr-preview/source/entry.js
  window.OmrPreviewApp = xt3(k5);
  window.OmrPreviewApp.mount("#preview-root");
})();
