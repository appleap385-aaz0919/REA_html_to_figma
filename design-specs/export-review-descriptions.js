const report=v=>print('DESCRIPTION_EXPORT '+JSON.stringify(v));
const ix=JSON.parse(figma.root.getPluginData('cmsRevisionNodes')),screens=[];
for(const [key,ref] of Object.entries(ix)){
 const f=figma.getNodeById(ref.frame);if(!f)throw Error('Missing '+key);
 const notes=JSON.parse(f.getPluginData('cmsRevisionNotes')||'[]');
 const texts=[...f.findAll(n=>n.type==='TEXT'),...figma.getNodeById(ref.section).children.filter(n=>n.type==='GROUP').flatMap(g=>g.findAll(n=>n.type==='TEXT'))];
 const exported=notes.map(n=>{const title=texts.find(t=>t.characters===n.label),body=title?title.parent.children.filter(t=>t.type==='TEXT'&&t.x===title.x&&t.y>title.y).sort((a,b)=>a.y-b.y)[0]:null;return {...n,body:body?body.characters:n.body,rendered:!!body};});
 const modals=figma.getNodeById(ref.section).children.filter(m=>m.type==='FRAME'&&m.getPluginData('cmsRevisionModal')).map(m=>{return m?{modalId:m.getPluginData('cmsRevisionModal'),id:m.id,name:m.name,tags:m.getPluginDataKeys().map(k=>[k,m.getPluginData(k)]),texts:m.children.filter(n=>n.type==='TEXT').map(t=>({name:t.name,x:t.x,y:t.y,text:t.characters}))}:null;});
 screens.push({key,ref,frame:f.id,name:f.name,notes:exported,modals});
}
report({schema:'master-cms-figma-description-export/1',capturedAt:new Date().toISOString(),file:figma.fileKey||'xCjdhdFkSbToMiRVlXVN2V',screens});
