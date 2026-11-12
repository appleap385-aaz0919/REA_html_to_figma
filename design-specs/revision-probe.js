const BATCH=905;
const index=JSON.parse(figma.root.getPluginData("cmsRevisionNodes")||"{}");
const sections=figma.root.children.flatMap(p=>p.children.filter(n=>n.getPluginData("cmsRevisionScreen")).map(n=>({id:n.getPluginData("cmsRevisionScreen"),done:n.getPluginData("cmsRevisionDone"),node:n.id})));
figma.notify("CMS 스토리보드 배치 905 완료 | "+JSON.stringify({indexed:Object.keys(index),sections}),{timeout:60000});
