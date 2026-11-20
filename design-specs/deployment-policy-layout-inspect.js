const ix=JSON.parse(figma.root.getPluginData('cmsRevisionNodes'));
const simple=n=>({id:n.id,type:n.type,name:n.name,x:n.x,y:n.y,w:n.width,h:n.height,visible:n.visible,text:n.type==='TEXT'?n.characters:undefined,tags:n.getPluginDataKeys().map(k=>[k,n.getPluginData(k).slice(0,600)])});
const result={pages:figma.root.children.map(p=>({id:p.id,name:p.name})),sections:{},modals:[]};
for(const key of ['REV_ITM_02','REV_PAP_LIST','REV_PAP_DETAIL','REV_PAP_EDIT']){const f=figma.getNodeById(ix[key].frame);result.sections[key]={section:simple(f.parent),siblings:f.parent.parent.children.map(simple)};}
for(const id of ['8:16887','9:19634']){const f=figma.getNodeById(id);result.modals.push({frame:simple(f),children:f.children.map(simple)});}
print('DEPLOYMENT_LAYOUT '+JSON.stringify(result));
