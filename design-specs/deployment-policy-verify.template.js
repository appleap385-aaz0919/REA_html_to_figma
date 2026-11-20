const report=v=>print('DEPLOYMENT_VERIFIED '+JSON.stringify(v));
const D=__DELTA__,ix=JSON.parse(figma.root.getPluginData('cmsRevisionNodes')),raw=figma.root.getPluginData('cmsDeploymentPolicyApplied');
if(!raw)throw Error('Policy application marker missing');const applied=JSON.parse(raw);
const result={date:'2026-11-20',backup:applied.backup,changes:applied.changes.length,newNumberedDescriptions:0,frames:[],modals:[],outside:[],overlaps:[],sectionOverlaps:[],policyMatches:true,priorStatusLabelsPreserved:true};
for(const key of Object.keys(D.updates)){
 const f=figma.getNodeById(ix[key].frame),notes=JSON.parse(f.getPluginData('cmsRevisionNotes'));
 const expected=applied.frames.find(x=>x.key===key).notes;
 if(JSON.stringify(notes.map(n=>({key:n.key,number:n.number})))!==JSON.stringify(expected))throw Error('Note numbers changed '+key);
 const unique=new Set(notes.map(n=>n.key));if(unique.size!==notes.length)throw Error('Duplicate notes '+key);
 const matches=Object.entries(D.updates[key]).map(([id,body])=>{const note=notes.find(n=>n.key===id),title=f.children.find(n=>n.type==='TEXT'&&n.x>1900&&n.characters===note.label),rendered=f.children.filter(n=>n.type==='TEXT'&&n.x===title.x&&n.y>title.y).sort((a,b)=>a.y-b.y)[0];return{key:id,matches:note.body===body&&rendered.characters===body};});if(matches.some(x=>!x.matches))result.policyMatches=false;
 const ts=f.children.filter(n=>n.type==='TEXT'&&n.x>=1980);
 for(const t of f.findAll(n=>n.type==='TEXT')){if(!t.visible)continue;const b=t.absoluteBoundingBox,a=t.parent.absoluteBoundingBox;if(b.x<a.x-2||b.y<a.y-2||b.x+b.width>a.x+a.width+2||b.y+b.height>a.y+a.height+2)result.outside.push({frame:key,node:t.id,text:t.characters.slice(0,60)});}
 for(let a=0;a<ts.length;a++)for(let b=a+1;b<ts.length;b++){const p=ts[a],q=ts[b];if(Math.min(p.x+p.width,q.x+q.width)-Math.max(p.x,q.x)>3&&Math.min(p.y+p.height,q.y+q.height)-Math.max(p.y,q.y)>3)result.overlaps.push({frame:key,nodes:[p.id,q.id]});}
 const images=f.findAll(n=>n.getPluginData('deploymentPolicyImage')).map(n=>({id:n.id,key:n.getPluginData('deploymentPolicyImage'),w:n.width,h:n.height,image:!!n.fills.find(f=>f.type==='IMAGE'&&f.imageHash)}));
 result.frames.push({key,id:f.id,width:f.width,height:f.height,noteCount:notes.length,numbers:notes.map(n=>n.number),matches,images});
 if(key==='REV_ITM_02'){result.priorStatusLabelsPreserved=f.children.filter(n=>n.name==='요소 번호 8').length===2&&!f.children.some(n=>['요소 번호 13','요소 번호 14'].includes(n.name));}
}
for(const id of applied.modalFrames){const f=figma.getNodeById(id),ts=f.children.filter(n=>n.type==='TEXT'&&n.x>=700);for(const t of ts)if(t.y+t.height>f.height+2||t.x+t.width>f.width+2)result.outside.push({frame:id,node:t.id});for(let a=0;a<ts.length;a++)for(let b=a+1;b<ts.length;b++){const p=ts[a],q=ts[b];if(Math.min(p.x+p.width,q.x+q.width)-Math.max(p.x,q.x)>3&&Math.min(p.y+p.height,q.y+q.height)-Math.max(p.y,q.y)>3)result.overlaps.push({frame:id,nodes:[p.id,q.id]});}result.modals.push({id,width:f.width,height:f.height,controlNumbers:f.children.filter(n=>n.type==='TEXT'&&n.name.startsWith('요소 번호 ')).map(n=>n.characters),images:f.findAll(n=>n.getPluginData('deploymentPolicyImage')).map(n=>n.getPluginData('deploymentPolicyImage'))});}
for(const pid of ['0:1','7:9756']){const sections=figma.getNodeById(pid).children.filter(n=>n.type==='SECTION').sort((a,b)=>a.y-b.y);for(let i=1;i<sections.length;i++)if(sections[i].y<sections[i-1].y+sections[i-1].height)result.sectionOverlaps.push([sections[i-1].id,sections[i].id]);}
result.disabledButtonMask=JSON.parse(figma.getNodeById('8:16538').getPluginData('cmsDeploymentButtonMask')||'null');
result.verified=result.policyMatches&&result.priorStatusLabelsPreserved&&!result.outside.length&&!result.overlaps.length&&!result.sectionOverlaps.length;
figma.root.setPluginData('cmsDeploymentPolicyVerification',JSON.stringify(result));report(result);
