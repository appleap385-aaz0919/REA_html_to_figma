const f=figma.getNodeById('8:16538'),partial=figma.getNodeById('9:25076');
for(const [no,x,y] of [[14,1460,partial.y+350],[8,1410,partial.y+355+42+14]])for(const n of f.children.filter(n=>n.name==='요소 번호 '+no)){n.x=x;n.y=y+(n.type==='TEXT'?4:0);}
const out={date:'2026-11-19',frame:f.id,partial:partial.id,policy:JSON.parse(figma.root.getPluginData('cmsItemStatusApprovedPolicy')),notes:JSON.parse(f.getPluginData('cmsRevisionNotes')),outside:[],overlaps:[],imageAspectErrors:[],obsoleteText:[],visibleFrames:[]};
const frames=[f,...f.findAll(n=>n.type==='FRAME'&&n.visible)];
for(const frame of frames){out.visibleFrames.push(frame.id);const ts=frame.children.filter(n=>n.type==='TEXT'&&n.visible);for(const t of ts){if(t.x<-.5||t.y<-.5||t.x+t.width>frame.width+2||t.y+t.height>frame.height+2)out.outside.push({id:t.id,text:t.characters.slice(0,50)});if(/수정을 누르면 On-line|편집 전 값을 복원하고 상태 필드를 다시 잠급니다/.test(t.characters))out.obsoleteText.push(t.id);}
const comparable=ts.filter(t=>!/^요소 번호/.test(t.name)&&(frame.id!==f.id||t.x>=1980));for(let a=0;a<comparable.length;a++)for(let b=a+1;b<comparable.length;b++){const p=comparable[a],q=comparable[b];if(Math.min(p.x+p.width,q.x+q.width)-Math.max(p.x,q.x)>3&&Math.min(p.y+p.height,q.y+q.height)-Math.max(p.y,q.y)>3)out.overlaps.push({a:p.id,b:q.id});}}
for(const n of f.findAll(n=>!!n.getPluginData('request1ApprovedImage'))){if(Math.abs(n.width/n.height-1497/183)>.001)out.imageAspectErrors.push(n.id);}
out.approvedImages=f.findAll(n=>!!n.getPluginData('request1ApprovedImage')).map(n=>({id:n.id,key:n.getPluginData('request1ApprovedImage'),x:n.x,y:n.y,w:n.width,h:n.height}));
out.backupVisible=figma.getNodeById(out.policy.backup).visible;
print('REQUEST1_VERIFY '+JSON.stringify(out));figma.root.setPluginData('cmsItemStatusApprovalVerification',JSON.stringify(out));
figma.viewport.scrollAndZoomIntoView([f]);
