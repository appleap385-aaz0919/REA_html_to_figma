const BATCH=700;
const pages=figma.root.children.filter(p=>p.name.includes("문항 관리"));
const states=pages.flatMap(p=>p.children.filter(n=>n.type==="SECTION").flatMap(s=>s.children.filter(f=>f.getPluginData("cmsStoryboardState")).map(f=>({id:f.id,state:f.getPluginData("cmsStoryboardState"),x:f.x,y:f.y,w:f.width,h:f.height}))));
const baseline={recorded:"2026-11-11",pages:pages.map(p=>({id:p.id,name:p.name})),states};
figma.root.setPluginData("cmsRemainingBefore",JSON.stringify(baseline));
figma.notify("CMS 스토리보드 배치 700 완료",{timeout:60000});
print({pages:baseline.pages.length,existingStates:states.length});

