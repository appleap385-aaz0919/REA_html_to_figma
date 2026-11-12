// Focused policy delta. Observed CMS captures and existing nodes remain evidence.
const POLICY_ID='HML-PAPER-LIMIT-20261112';
const ix=JSON.parse(figma.root.getPluginData('cmsRevisionNodes'));
const CHANGES={"MST_HML_C02": {"03": "허용된 파일이 없는 상태에서 등록 시작을 누르면 HML 파일을 선택해 달라는 안내로 제출을 중단하도록 설정돼 있습니다. 이 HML 폼의 무파일 차단 결과는 실제 실행으로 검증되지 않았습니다.\n유효한 입력으로 등록 시작을 누르면 업로드 주소 발급·파일 전송·문서 생성으로 이어지도록 설정돼 있으며 파일 진행률은 파싱이나 AI 추천 전체의 진행률이 아닙니다. 정상 파일의 등록과 분리 결과·후속 승인은 확인됐습니다. 단계별 실패·재시도·중복 제출·잔여 객체 정리는 검증되지 않았습니다.\n[변경 예정 · 2026.11.12] 한 HML 파일의 문항 수가 50을 초과해도 HML 업로드·문항 등록은 허용합니다. 초과 제한은 평가지 등록에만 적용하며 파일 용량 50MB 제한과 구분합니다."}, "MST_HML_C03": {"02": "검수값은 S 등록성공·F 등록실패·D 삭제이며 W 등록대기는 비활성 미검수 값입니다. 비고는 최대 1000자이고 평가지 등록여부는 등록 Y·미등록 N입니다. 선택과 비고 변경은 최종 승인 전까지 로컬 상태로 유지됩니다.\n[변경 예정 · 2026.11.12] 50문항 초과 시 평가지 등록여부를 미등록(N)으로 선택하고 등록·미등록 제어를 비활성화합니다. “* 50문항이 넘는 HML은 평가지로 등록할 수 없습니다.”를 표시합니다. 변경 예정 UI는 아래 별도 상태에서 확인합니다.", "03": "승인은 W 미검수·모두 D·평가지 선택 누락 순으로 검사한 뒤 최종 확인을 엽니다. S/F/D 혼합 승인과 세트 D·단건 S 승인은 실제 수용됐으며 세트의 판정은 자식 문항별로 펼쳐집니다. 지문 ID는 문항 승인 대상과 구분합니다.\n미검수 블록 번호를 안내하고 확인 후 첫 미검수 위치로 이동·포커스하도록 설정돼 있습니다. 관측한 초안의 W 선택지는 비활성이었으며 이 경고의 정상 UI 실행은 검증되지 않았습니다.\n모든 문항을 D로 선택하면 승인할 수 없다는 안내를 표시합니다. 이는 문서 전체 폐기가 아니라 승인 경로의 차단입니다.\n평가지 등록여부를 선택하지 않으면 선택을 요구하는 안내를 표시합니다. 확인 후 해당 항목으로 이동하며 평가지 항목이 없는 디피니션에는 이 검사를 적용하지 않습니다.\n승인 여부와 AI 메타 추천이 시작되며 되돌릴 수 없음을 안내합니다. 취소는 최종 제출을 하지 않고 승인 버튼만 서버 처리를 요청합니다.\n[변경 예정] 50문항을 초과해도 기존 검수 조건을 충족하면 HML 승인을 진행합니다. 미등록(N) 상태로 처리하며 평가지 생성을 요청하지 않습니다. 프런트 비활성화와 별도로 서버에서도 초과 평가지 등록을 제한해야 합니다."}, "MST_HML_C04": {"02": "Y에서는 비고와 평가지 값이 읽기 전용이며 분리 카드·원본 다운로드·목록을 제공합니다. 문서 Y, 검수 S/F/D, 개별 Master 상태는 별개입니다. 평가지 등록 Y의 관측 결과는 S/F를 포함하고 D를 제외했으며 미등록 N 승인도 확인됐습니다.\n[변경 예정 · 2026.11.12] 50문항 초과 HML의 승인 결과는 평가지 미등록(N)입니다. 원본 HML과 등록 문항은 유지합니다. 과거 등록된 초과 평가지의 정리는 별도 평가지 정보 정리 작업입니다."}};
const fonts=new Map();
for(const key of Object.keys(CHANGES))for(const t of figma.getNodeById(ix[key].frame).findAll(n=>n.type==='TEXT'))if(t.fontName!==figma.mixed)fonts.set(JSON.stringify(t.fontName),t.fontName);
for(const f of fonts.values())await figma.loadFontAsync(f);
const sample=figma.getNodeById('9:21743');
const font=sample.fontName;
function color(hex){return {r:parseInt(hex.slice(0,2),16)/255,g:parseInt(hex.slice(2,4),16)/255,b:parseInt(hex.slice(4,6),16)/255};}
function box(parent,x,y,w,h,fill='FFFFFF',stroke='D3D9E1',radius=0){const n=figma.createRectangle();parent.appendChild(n);n.x=x;n.y=y;n.resize(w,h);n.fills=[{type:'SOLID',color:color(fill)}];n.strokes=stroke?[{type:'SOLID',color:color(stroke)}]:[];n.cornerRadius=radius;return n;}
function text(parent,value,x,y,w,size=22,fill='253348'){const n=figma.createText();parent.appendChild(n);n.fontName=font;n.fontSize=size;n.lineHeight={unit:'PIXELS',value:Math.round(size*1.45)};n.characters=value;n.resize(w,10);n.textAutoResize='HEIGHT';n.x=x;n.y=y;n.fills=[{type:'SOLID',color:color(fill)}];return n;}
const updated=[];
for(const [key,changes] of Object.entries(CHANGES)){
 const f=figma.getNodeById(ix[key].frame),notes=JSON.parse(f.getPluginData('cmsRevisionNotes'));
 const rows=notes.map(n=>{const title=f.children.find(t=>t.type==='TEXT'&&t.characters===n.label&&t.x>1900);if(!title)throw Error('Missing title '+key+n.key);const body=f.children.filter(t=>t.type==='TEXT'&&t.x===title.x&&t.y>title.y).sort((a,b)=>a.y-b.y)[0];const top=title.y-16;return {n,title,body,rects:f.children.filter(t=>t.type==='RECTANGLE'&&Math.abs(t.y-top)<1&&t.x>=1900),number:f.children.find(t=>t.type==='TEXT'&&t.x>1900&&t.x<title.x&&Math.abs(t.y-(top+18))<2)};});
 let y=rows[0].title.y-16;
 for(const row of rows){const suffix=changes[row.n.key];if(suffix)row.n.body=suffix;row.body.characters=row.n.body;row.body.resize(row.body.width,10);row.body.textAutoResize='HEIGHT';row.title.y=y+16;row.body.y=y+56;if(row.number)row.number.y=y+18;const h=Math.max(100,Math.ceil(row.body.height)+78);for(const r of row.rects){r.y=y;r.resize(r.width,h);}y+=h;}
 if(y+40>f.height)throw Error('Description exceeds existing frame '+key+': '+y);
 f.setPluginData('cmsRevisionNotes',JSON.stringify(notes));f.setPluginData('cmsPlannedPolicy',POLICY_ID);
 updated.push({key,frame:f.id,tableBottom:y});
}
const section=figma.getNodeById(ix.MST_HML_C03.section);
let panel=section.children.find(n=>n.getPluginData('cmsPlannedPolicyPanel')===POLICY_ID);
if(!panel){panel=figma.createFrame();section.appendChild(panel);panel.name='변경 예정 · HML 50문항 초과 평가지 등록 제한';panel.x=60;panel.y=2426;panel.resize(2900,700);panel.fills=[{type:'SOLID',color:color('FFFFFF')}];panel.setPluginData('cmsPlannedPolicyPanel',POLICY_ID);}
else for(const n of [...panel.children])n.remove();
text(panel,'변경 예정 · HML 50문항 초과 시 평가지 미등록',48,24,1700,32);
text(panel,'첨부 요청 기반 설계 / 실제 CMS 반영·실행 검증 전 / 2026.11.12',48,77,1700,20,'8B5E15');
box(panel,48,130,1490,470,'FFFFFF','CFD8E3',6);
box(panel,48,130,1490,54,'F0F0F0','CFD8E3');
text(panel,'기본 정보 · 변경 예정 상태의 부분 화면',68,140,1400,23);
text(panel,'문항 수',78,210,150,21);text(panel,'51문항 (설명용 예시)',245,210,550,21);
text(panel,'평가지 등록여부 *',78,264,270,21);
function radio(x,label,checked){const n=figma.createEllipse();panel.appendChild(n);n.x=x;n.y=269;n.resize(22,22);n.fills=[{type:'SOLID',color:color('F1F3F5')}];n.strokes=[{type:'SOLID',color:color('ADB5BD')}];if(checked){const dot=figma.createEllipse();panel.appendChild(dot);dot.x=x+6;dot.y=275;dot.resize(10,10);dot.fills=[{type:'SOLID',color:color('868E96')}];}text(panel,label,x+32,263,150,21,'868E96');}
radio(350,'등록',false);radio(550,'미등록',true);
text(panel,'* 50문항이 넘는 HML은 평가지로 등록할 수 없습니다.',78,310,1400,23,'C92A2A');
text(panel,'비고',78,366,160,21);box(panel,245,364,1240,110,'FFFFFF','DEE2E6',5);
box(panel,1234,520,112,48,'2279D2','2279D2',5);text(panel,'승인',1264,527,80,22,'FFFFFF');
text(panel,'02  미등록 선택 · 등록/미등록 모두 비활성',78,491,1050,23);
text(panel,'03  기존 검수 조건을 충족하면 HML 승인 가능',78,535,1100,23);
text(panel,'원본 HML과 문항 등록은 유지합니다. 위 UI는 변경 예정 상태를 재현했습니다.',48,620,1490,20,'6B7788');
box(panel,1580,130,1272,46,'F5F6F8','D3D9E1');text(panel,'No. Description · 적용 조건 / 승인 / 기존 자료 정리',1598,136,1235,23);
const specs=[
 ['02','평가지 등록 제한','한 파일의 문항 수 > 50이면 미등록(N)을 선택하고 제어를 비활성화합니다. 안내 문구를 표시하며 HML 등록은 계속 허용합니다.'],
 ['03','승인과 서버 검증','기존 검수 조건을 충족하면 HML 승인을 허용합니다. 평가지 생성은 제한하고 서버에서도 같은 제한을 적용해야 합니다.'],
 ['—','기존 초과 평가지 정리','첨부 기준 31개입니다. 50문항 초과 평가지 정보만 폐기하며 원본 HML과 문항은 유지합니다. 정리 작업은 아직 실행하지 않았습니다.'],
 ['—','경계와 문항 수 산정','상세 지시의 “50문항 초과”를 적용했습니다. 첫 문장의 “이상”과 상충하므로 정확히 50문항의 기준과 세트·삭제 문항 산정은 구현 전 확정합니다.']
];
let y=176;
for(const [no,title,body] of specs){const b=box(panel,1580,y,1272,110);text(panel,no,1598,y+14,62,22);text(panel,title,1660,y+10,1150,23);const t=text(panel,body,1660,y+48,1150,21);const h=Math.max(106,t.height+64);b.resize(1272,h);y+=h;}
if(y>panel.height-16)panel.resize(panel.width,y+24);
if(panel.y+panel.height>section.height)section.resizeWithoutConstraints(section.width,panel.y+panel.height+48);
const report={id:POLICY_ID,date:'2026-11-12',status:'planned_for_cms',updated,panel:panel.id,panelHeight:panel.height,legacyCountReported:31,cmsWrites:0};
figma.root.setPluginData('cmsHmlPaperLimitPolicy',JSON.stringify(report));
figma.currentPage=section.parent;figma.viewport.scrollAndZoomIntoView([panel]);
figma.notify('POLICY_APPLIED '+JSON.stringify(report),{timeout:60000});
