const report=v=>print('DEPLOYMENT_EXPORT '+JSON.stringify(v));
const result={images:[],sections:[]};
for(const id of ['8:16538','9:19476','9:19545','9:19677','8:16887','9:19634']){const f=figma.getNodeById(id),bytes=await f.exportAsync({format:'PNG',constraint:{type:'SCALE',value:.55}});result.images.push({id,name:f.name,width:f.width,height:f.height,base64:figma.base64Encode(bytes)});}
for(const p of ['0:1','7:9756'])for(const s of figma.getNodeById(p).children.filter(n=>n.type==='SECTION'))result.sections.push({id:s.id,x:s.x,y:s.y,w:s.width,h:s.height});
report(result);
