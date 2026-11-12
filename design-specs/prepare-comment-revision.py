import json,copy,re
from pathlib import Path
root=Path(__file__).resolve().parent
old=json.loads((root/'revision-consolidated-plan.json').read_text(encoding='utf-8'))
original=[];copies=[]
for name in ['item-home-lab','registration-twin','paper-source']:
 original+=json.loads((root/f'revision-{name}-plan.json').read_text(encoding='utf-8'))['screens']
 copies+=json.loads((root/f'revision-{name}-copy.json').read_text(encoding='utf-8'))['screens']
copy_index={s['id']:s for s in copies}
original_index={s['id']:s for s in original}
new=copy.deepcopy(old)
removed=[]
for s in new['screens']:
 originals=[original_index[s['id']]]
 if s['id']=='REV_ITM_02':originals.append(original_index['MST_TWN_C03'])
 notes=[]
 for src in originals:
  cp=copy_index[src['id']];prefix='T' if src['id']=='MST_TWN_C03' else ''
  for n in src['notes']:
   key=prefix+n['key'];existing=next(x for x in s['notes'] if x['key']==key)
   polished=next(x for x in cp['notes'] if x['key']==n['key'])
   item=copy.deepcopy(existing);item.update(label=polished['label'],body=polished['body']);notes.append(item)
 for m in s['modals']:
  bodies=[]
  for src in originals:
   cp=copy_index[src['id']]
   for sm in src['modals']:
    if sm['title']==m['title']:
     cm=next(x for x in cp['modals'] if x['id']==sm['id'])
     if cm['body'] not in bodies:bodies.append(cm['body'])
  m['body']='\n'.join(bodies)
 # Give each physical trigger a single numbered note. A broad group description
 # is replaced by its individual button descriptions only when all its content
 # is retained by those rows.
 groups={}
 for m in s['modals']:groups.setdefault(m['triggerKey'],[]).append(m)
 for key,ms in groups.items():
  existing=next(n for n in notes if n['key']==key)
  if len(ms)==1:
   m=ms[0]
   existing['body']+='\n'+m['body'] if m['body'] not in existing['body'] else ''
   existing['anchor']=m['anchor'];m['noteKey']=key
   existing['sourceStates']=list(dict.fromkeys(existing.get('sourceStates',[])+m.get('sourceStates',[])))
  else:
   keep_group=(s['id']=='REV_ITM_03' and key=='03') or (s['id']=='REV_LAB_02')
   if not keep_group:notes.remove(existing)
   for i,m in enumerate(ms):
    n={'key':m['id'],'label':m['title'],'body':m['body'],'anchor':m['anchor'],'sourceStates':m.get('sourceStates',[])}
    if not keep_group and i==0:n['body']=existing['body']+'\n'+n['body'];n['sourceStates']=list(dict.fromkeys(existing.get('sourceStates',[])+n['sourceStates']))
    notes.append(n);m['noteKey']=n['key']
 # Related-detail policies are attached to the same actual controls.
 if s['id']=='REV_ITM_02':
  for source,target in [('T03','T02'),('T04','T02'),('T06','REV_ITM_STATUS_SAVE')]:
   a=next((n for n in notes if n['key']==source),None);b=next((n for n in notes if n['key']==target),None)
   if a and b:
    b['body']+='\n'+a['body'];b['sourceStates']=list(dict.fromkeys(b.get('sourceStates',[])+a.get('sourceStates',[])));notes.remove(a)
 for i,n in enumerate(notes):n['number']=i+1
 for m in s['modals']:m['noteNumber']=next(n['number']for n in notes if n['key']==m['noteKey'])
 removed += [{'screen':s['id'],'key':n['key']}for n in s['notes']if n['key'] not in {x['key']for x in notes}]
 s['notes']=notes
 # Restore corrections established by visual review.
 if s['id']=='REV_HOME_01':
  for i,f in enumerate(s['flows']):
   f['anchor']={'x':8,'y':[116,160,204,248][i],'w':240,'h':44}
  s['flows'][0]['label']='문항 관리 → 전체 문항';s['flows'][0]['action']='문항 관리 펼침 후 전체 문항 선택'
corrections={'REV_ITM_03':{'04':(1571.15625,1710.14)},'REV_ITM_05':{'03':(314,557.14)},'REV_ITM_06':{'03':(314,371.14),'04':(596,371.14),'06':(1605.156,484.14)}}
for s in new['screens']:
 for n in s['notes']:
  if n['key']in corrections.get(s['id'],{}):
   x,y=corrections[s['id']][n['key']];n['anchor']={'x':x,'y':y,'w':20,'h':20}
 # A repeated body paragraph is unnecessary after a merged modal variant.
 for n in s['notes']:
  n['body']='\n'.join(dict.fromkeys(n['body'].split('\n')))
new['commentRevision']={'commentsRead':7,'duplicateNotesRemoved':len(removed),'removed':removed}
(root/'revision-comment-plan.json').write_text(json.dumps(new,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps({'screens':len(new['screens']),'notesBefore':sum(len(s['notes'])for s in old['screens']),'notesAfter':sum(len(s['notes'])for s in new['screens']),'removed':len(removed)},ensure_ascii=False))
