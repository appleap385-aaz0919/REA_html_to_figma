import ast,json,subprocess,time
from pathlib import Path
from bs4 import BeautifulSoup
root=Path(__file__).resolve().parent;out=root/'revision-captures'
cfg=json.loads((root.parent/'cms-knowledge/master-cms/agent-browser-session.json').read_text(encoding='utf-8'))
base=[cfg['executable'],'--session','cms-storyboard-revision','--cdp',cfg['cdp'],'--pin-tab','--no-auto-dialog','--json']
def call(a,code=None):
 r=json.loads(subprocess.run(base+a,input=code,capture_output=True,encoding='utf-8',timeout=60).stdout)
 if not r.get('success'):raise RuntimeError(r)
 return r['data']
def ev(s):return call(['eval','--stdin'],s)['result']
tree=ast.parse((root/'revision-capture.py').read_text(encoding='utf-8'))
geometry=next(n.value.args[0].value for n in ast.walk(tree) if isinstance(n,ast.Assign) and any(isinstance(t,ast.Name) and t.id=='data' for t in n.targets))
for name,source in [('hml-review','hml665-set-draft-20261109.html'),('difi-review','definition695-control-draft-20261110.html')]:
 soup=BeautifulSoup((root.parent/'cms-knowledge/master-cms/sources'/source).read_text(encoding='utf-8'),'html.parser')
 for e in soup.select('script,base'):e.decompose()
 for e in soup.find_all(True):
  for key in list(e.attrs):
   if key.startswith('on'):del e.attrs[key]
 b=soup.new_tag('base',href='https://dev-exambank.dongahub.com/');soup.head.insert(0,b)
 style=soup.new_tag('style');style.string='html,body,.page,.page-wrapper{height:auto!important;min-height:100vh!important;overflow:visible!important}body{pointer-events:none}';soup.head.append(style)
 path=out/(name+'-readonly.html');path.write_text(str(soup),encoding='utf-8')
 call(['tab','new',path.as_uri()] if name=='hml-review' else ['open',path.as_uri()]);call(['set','viewport','1800','1100']);time.sleep(2)
 ev("(()=>{for(const e of document.querySelectorAll('body *')){if(e.clientHeight>60&&e.scrollHeight>e.clientHeight+15&&/(auto|scroll|hidden)/.test(getComputedStyle(e).overflowY)&&!['TEXTAREA','SELECT','INPUT','IFRAME'].includes(e.tagName)){e.style.height='auto';e.style.maxHeight='none';e.style.overflow='visible'}}return true})()")
 data=ev(geometry);data['provenance']='Read-only render of preserved DOM; scripts and event handlers removed.';data['source']=source
 (out/(name+'.json')).write_text(json.dumps(data,ensure_ascii=False,indent=2),encoding='utf-8');call(['screenshot',str(out/(name+'.png')),'--full'])
 print(name,data['width'],data['height'],len(data['controls']),flush=True)
