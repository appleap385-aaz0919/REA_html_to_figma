const ix=JSON.parse(figma.root.getPluginData('cmsRevisionNodes'));
const simple=n=>({id:n.id,type:n.type,name:n.name,x:n.x,y:n.y,w:n.width,h:n.height,visible:n.visible,text:n.type==='TEXT'?n.characters:undefined,tags:n.getPluginDataKeys().map(k=>[k,n.getPluginData(k).slice(0,700)])});
const result={frames:{},pages:figma.root.children.map(p=>({id:p.id,name:p.name}))};
for(const key of ['REV_ITM_02','REV_PAP_LIST','REV_PAP_DETAIL','REV_PAP_EDIT']){
 const ref=ix[key],f=figma.getNodeById(ref.frame);
 result.frames[key]={ref,frame:simple(f),notes:JSON.parse(f.getPluginData('cmsRevisionNotes')),children:f.children.map(simple),sectionChildren:f.parent.children.map(simple)};
}
print('DEPLOYMENT_INSPECT '+JSON.stringify(result));
