const f=figma.getNodeById('7:2');
const data={texts:f.children.filter(n=>n.type==='TEXT').map(n=>({id:n.id,x:n.x,y:n.y,w:n.width,h:n.height,t:n.characters})),images:[]};
for(const n of f.findAll(n=>Array.isArray(n.fills)&&n.fills.some(p=>p.type==='IMAGE'))){for(const p of n.fills.filter(p=>p.type==='IMAGE')){const img=figma.getImageByHash(p.imageHash);data.images.push({id:n.id,w:n.width,h:n.height,size:await img.getSizeAsync(),mode:p.scaleMode})}}
figma.notify('APPROVED_LAYOUT '+JSON.stringify(data),{timeout:60000});
