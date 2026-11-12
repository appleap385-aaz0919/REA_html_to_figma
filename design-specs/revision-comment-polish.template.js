const R={family:'Inter',style:'Regular'},B={family:'Inter',style:'Bold'};await figma.loadFontAsync(R);await figma.loadFontAsync(B);
HELPERS
const ix=JSON.parse(figma.root.getPluginData('cmsRevisionNodes'));const entries=Object.entries(ix).map(([id,n])=>({id,...n,s:figma.getNodeById(n.section),f:figma.getNodeById(n.frame)}));
const replacements={
 '보존 DOM 상태':'기본 상태','보존 HTML 속성 기준 초기 선택 상태':'초기 선택 상태','vendor-saved':'편집기 저장 완료 안내',
 '취소 / 임시저장 수정하기 / 검수완료 수정하기 / X 모두 온전함':'임시저장본 선택',
 '정답 보기 꺼짐; 1~5 답란과 채점하기·닫기·X':'객관식 응답 · 정답 보기 꺼짐',
 '임시 저장하시겠습니까?; 취소/임시 저장/X':'임시 저장 확인','저장하시겠습니까?; 취소/저장/X':'전체 반영 확인',
 '저장하지 않고 이동하시겠습니까?; 취소/저장 하지 않고 이동/X':'미저장 변경 취소 확인',
 '문단 설정 (pt); 모든 입력과 적용/취소':'문단 설정','겹칠 글자/모양/한 자리에 포개기/미리보기/취소/확인':'글자·모양 겹치기 설정',
 '글상자 편집; 줄 정렬/내용/너비/높이/최소 높이/취소/적용':'글상자 본문·크기 편집','검색 결과와 취소/내용영역 추가':'내용영역 조회 결과',
 '검색 결과와 취소/교과역량 추가':'교과역량 조회 결과','이해 선택; 검색 결과와 취소/행동영역 추가':'행동영역 조회·선택',
 'https:// 기본값; 확인/취소':'이미지 URL 입력','키보드; 9 입력':'키보드 모드'
};
for(const e of entries)for(const f of e.s.children.filter(n=>n.type==='FRAME'&&n.getPluginData('cmsRevisionModal'))){
 for(const t of f.children.filter(n=>n.type==='TEXT'))for(const [old,next]of Object.entries(replacements))if(t.characters===old||t.characters===old+' · 요소 설명')t.characters=t.characters.replace(old,next);
 // A tab selection does not mutate source/twin membership. Remove the spurious
 // mutation-result shortcut; retain the actual tab-to-tab transition arrow.
 for(const t of [...f.children].filter(n=>n.type==='TEXT'&&/^(현재 출처 \/ 출처 추가|쌍둥이 추가|비주얼 편집|LaTeX 소스) → 현재 연결 목록 갱신/.test(n.characters))){const a=[...f.children],i=a.indexOf(t);for(const n of a.slice(i-1,i+4))if(!n.removed)n.remove();}
 for(const t of f.children.filter(n=>n.type==='TEXT'&&n.characters==='이동 → 성공 시 결과 반영')){t.characters='이동 → 원래 선택한 화면으로 이동';t.hyperlink=null;}
 const mid=f.getPluginData('cmsRevisionModal');
 if(/^(REV_ITM_DETAIL_OMR|REV_ITM_OMR_PREVIEW)$/.test(mid)){
  const p=f.children.find(n=>n.type==='FRAME'&&n.name.includes('실제 UI'));const no=p.children.find(n=>n.type==='RECTANGLE');const dx=f.width-730;let y=Math.max(...f.children.filter(n=>n.type==='TEXT'&&n.x>=dx-1).map(n=>n.y+n.height))+25;
  const defs=[['응답 선택','유형에 맞게 응답을 입력합니다. 이 예시는 객관식의 다섯 선택지입니다.',20,112],['정답 보기','저장된 정답의 표시를 켜거나 끕니다.',445,78],['채점하기','입력한 응답의 CMS 미리보기 채점 결과를 표시합니다. 실제 서비스 채점 검증과 구분합니다.',20,238],['닫기·X','미리보기 창을 닫고 원래 화면으로 돌아갑니다.',440,439]];
  for(let i=0;i<defs.length;i++){const d=defs[i];cue(f,p.x+d[2],p.y+d[3],i+1);const h=txt(f,dx,y,690,String(i+1).padStart(2,'0')+'  '+d[0],18,true);const b=txt(f,dx,h.y+h.height+6,690,d[1],17);y=b.y+b.height+18;}
  const cy=p.y+p.height+95;rect(f,p.x,cy,250,65,'#fff8e7','#edcf85');txt(f,p.x+10,cy+10,230,'채점하기 → 미리보기 결과 표시',14,true,'#9a6700');arrow(f,[[p.x+265,p.y+262],[p.x+p.width+15,p.y+262],[p.x+p.width+15,cy-25],[p.x+125,cy-25],[p.x+125,cy]],'미리보기 채점');rect(f,p.x+280,cy,250,65,'#edf5ff','#b9d8fa');const back=txt(f,p.x+290,cy+10,230,'닫기 → 원래 화면으로 복귀',14,true,'#0870cb');back.hyperlink={type:'URL',value:'https://www.figma.com/design/xCjdhdFkSbToMiRVlXVN2V/?node-id='+e.f.id.replace(':','-')};arrow(f,[[p.x+470,p.y+460],[p.x+p.width+30,p.y+460],[p.x+p.width+30,cy-15],[p.x+405,cy-15],[p.x+405,cy]],'미리보기 닫기','#0870cb',true);
 }
 if(mid==='REV_ITM_PAPERS'||mid==='TWN_C03_HISTORY'){
  const ps=f.children.filter(n=>n.type==='FRAME'&&n.name.includes('실제 UI'));const dx=f.width-730;let y=Math.max(...f.children.filter(n=>n.type==='TEXT'&&n.x>=dx-1).map(n=>n.y+n.height))+25;
  for(const p of ps){cue(f,p.x+20,p.y+100,1);cue(f,p.x+p.width-80,p.y+p.height-40,2);}const h=txt(f,dx,y,690,'01  '+(mid==='REV_ITM_PAPERS'?'연결된 평가지 목록':'쌍둥이 생성 이력'),18,true);const b=txt(f,dx,h.y+h.height+6,690,mid==='REV_ITM_PAPERS'?'연결된 평가지의 정보를 표로 조회합니다. 이 예시는 연결된 평가지가 없는 상태이며 결과 행이 있으면 해당 정보를 표시합니다.':'생성 요청과 결과 문항을 조회하며, 단건과 세트의 행 구성을 구분합니다.',17);y=b.y+b.height+18;txt(f,dx,y,690,'02  닫기·X: 현재 창을 닫습니다.',18,true);
 }
}
let outside=0;for(const e of entries)for(const f of e.s.children.filter(n=>n.type==='FRAME'))for(const n of f.children.filter(n=>n.type==='TEXT'))if(n.x<0||n.y<0||n.x+n.width>f.width+2||n.y+n.height>f.height+2)outside++;
const a=JSON.parse(figma.root.getPluginData('cmsRevisionAudit'));a.outsideFrameText=outside;a.tabActionsCorrected=true;a.previewControlsAnnotated=true;figma.root.setPluginData('cmsRevisionAudit',JSON.stringify(a));
const focus=entries.find(e=>e.id==='REV_PAP_EDIT');await figma.setCurrentPageAsync(focus.s.parent);figma.currentPage.selection=[focus.f];figma.viewport.scrollAndZoomIntoView([focus.f]);figma.notify('CMS_POLISH_DONE '+JSON.stringify(a),{timeout:60000});
