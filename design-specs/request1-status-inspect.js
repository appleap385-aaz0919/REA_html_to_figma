const ix=JSON.parse(figma.root.getPluginData('cmsRevisionNodes'));
const ref=ix.REV_ITM_02;const f=figma.getNodeById(ref.frame);const section=figma.getNodeById(ref.section);
const simple=n=>({id:n.id,type:n.type,name:n.name,x:n.x,y:n.y,w:n.width,h:n.height,visible:n.visible,text:n.type==='TEXT'?n.characters:undefined,fills:n.fills&&n.fills!==figma.mixed?n.fills:undefined,tags:n.getPluginDataKeys().map(k=>[k,n.getPluginData(k).slice(0,500)])});
print('REQUEST1_INSPECT '+JSON.stringify({ref,frame:simple(f),section:simple(section),notes:JSON.parse(f.getPluginData('cmsRevisionNotes')),children:f.children.map(simple),siblings:section.children.map(simple)}));
