"""Connect an offline review page to its existing Orca conversation. No HTTP server.

python -X utf8 master-cms-mockup/review_agent.py launch
python -X utf8 master-cms-mockup/review_agent.py begin --job <job.json>
python -X utf8 master-cms-mockup/review_agent.py result --job <job.json> --summary <text> --evidence <text> (--policy-changes <text> | --no-policy-change) [--after <image>]
python -X utf8 master-cms-mockup/review_agent.py synced --job <job.json> --figma-status done --figma-evidence <url> --policy-status done --policy-evidence <file>
"""
from pathlib import Path
import argparse, base64, hashlib, json, os, shutil, subprocess, sys, time
from datetime import datetime, timezone
from urllib.parse import unquote, urlsplit

ROOT = Path(__file__).resolve().parent.parent
MOCK = ROOT/'master-cms-mockup'
WORK = ROOT/'review-work'
SCHEMA = 'master-cms-review-agent-job/1'
EPOCH='review-reset-20261119-1'
PROJECT='master-cms-demo21-review'
NO_WINDOW = getattr(subprocess, 'CREATE_NO_WINDOW', 0)

def now():
    return datetime.now(timezone.utc).isoformat()

def load(path):
    return json.loads(Path(path).read_text(encoding='utf-8-sig'))

def write(path, value):
    path = Path(path); path.parent.mkdir(parents=True, exist_ok=True)
    temp = path.with_name(path.name+'.'+str(time.time_ns())+'.tmp')
    temp.write_text(json.dumps(value, ensure_ascii=False, indent=2), encoding='utf-8')
    # Windows briefly locks files while Chrome reads a FileSystemFileHandle snapshot.
    for attempt in range(30):
        try:
            os.replace(temp, path)
            break
        except PermissionError:
            if attempt==29:raise
            time.sleep(.05)

class Bridge:
    def __init__(self, page='', target_tab='', exe=None):
        self.exe = exe or shutil.which('orca')
        if not self.exe or (os.name == 'nt' and Path(self.exe).suffix.lower() != '.exe'):
            raise RuntimeError('Orca CLI 실행 파일을 찾지 못했습니다.')
        self.page, self.target_tab = page, target_tab

    def cli(self, *args):
        # Each argument is passed directly to the executable, never through a shell.
        proc = subprocess.run([self.exe, *args, '--json'], cwd=ROOT, capture_output=True,
                              text=True, encoding='utf-8', timeout=35, creationflags=NO_WINDOW)
        try:
            receipt = json.loads(proc.stdout)
        except (ValueError, TypeError):
            raise RuntimeError('Orca 응답을 확인하지 못했습니다. 자동 재전송하지 않습니다.')
        if proc.returncode or not receipt.get('ok'):
            raise RuntimeError(str(receipt.get('error', 'Orca 연결을 확인하세요.'))[:800])
        return receipt.get('result', {})

    def evaluate(self, expression):
        result = self.cli('eval', '--worktree', 'path:'+str(ROOT), '--page', self.page,
                          '--expression', expression)
        value = result.get('result')
        if isinstance(value,str):
            try:return json.loads(value)
            except ValueError:return None if value=='undefined' else value
        return value

    def target(self):
        rows = self.cli('terminal', 'list', '--worktree', 'path:'+str(ROOT)).get('terminals', [])
        candidates = [r for r in rows if Path(r.get('worktreePath', '')).resolve() == ROOT.resolve()
                      and r.get('agentIdentity') == 'codex' and r.get('writable') and not r.get('orphaned')]
        if self.target_tab:
            candidates = [r for r in candidates if r.get('tabId') == self.target_tab]
        if len(candidates) != 1:
            raise RuntimeError('연결할 이 프로젝트의 대화를 하나로 확인하지 못했습니다. 해당 대화에서 검수 연결을 다시 실행하세요.')
        self.target_tab = candidates[0]['tabId']
        return candidates[0]['handle']

    def find_page(self):
        tabs = self.cli('tab', 'list', '--worktree', 'path:'+str(ROOT)).get('tabs', [])
        for tab in tabs:
            page_id = tab.get('browserPageId')
            if not page_id: continue
            self.page = page_id
            try:
                value = self.evaluate('location.href')
                parts = urlsplit(value)
                path = unquote(parts.path).lstrip('/') if os.name == 'nt' else unquote(parts.path)
                if parts.scheme == 'file' and Path(path).resolve() == (MOCK/'index.html').resolve():
                    return self.page
            except Exception:
                continue
        result = self.cli('tab', 'create', '--worktree', 'path:'+str(ROOT), '--url', (MOCK/'index.html').as_uri())
        self.page = result['browserPageId']
        return self.page

    def update(self, value):
        return self.evaluate('CMSReview.agentUpdate('+json.dumps(value, ensure_ascii=False)+')')

    def outbox(self):
        return self.evaluate('(()=>{if(typeof CMSReview!=="object"||!CMSReview.agentOutbox)return null;CMSReview.agentHeartbeat();return CMSReview.agentOutbox();})()')

    def tick(self, ledger):
        # Pending real results are applied before new work is considered.
        for path in sorted((WORK/'updates').glob('*.json')):
            value = load(path)
            try:
                outcome = self.update(value)
                if outcome and outcome.get('applied'):
                    path.rename(path.with_suffix('.applied'))
            except Exception as error:
                write(WORK/'runtime-status.json', {'at':now(),'status':'result_waiting','message':str(error)})
        jobs = self.outbox()
        if jobs is None:
            raise RuntimeError('화면을 새로고침해 검수 도구를 불러오세요.')
        self.dispatch(jobs,ledger)
        write(WORK/'runtime-status.json',{'at':now(),'status':'connected','page':self.page,'targetTab':self.target_tab,'pid':os.getpid()})

    def dispatch(self,jobs,ledger):
        for job in jobs:
            if job.get('phase') not in ('html','sync') or not isinstance(job.get('token'),str):
                continue
            key = hashlib.sha256((job['id']+'|'+job['token']).encode()).hexdigest()[:24]
            if key in ledger:
                # An accepted receipt is durable. Reapply the UI acknowledgement after a page reload.
                if ledger[key]['state']=='accepted':
                    self.update({'id':job['id'],'phase':job['phase'],'token':job['token'],'state':'sent'})
                continue
            try:
                handle = self.target()  # Fresh handle from the target's current tab; never a stored PTY id.
            except Exception as error:
                # No send was attempted. Show the failure in the original browser and retry discovery later.
                self.update({'id':job['id'],'phase':job['phase'],'token':job['token'],'state':'error','error':str(error)[:900]})
                continue
            path = WORK/'jobs'/(key+'.json')
            write(path, {'schema':SCHEMA,'at':now(),'page':self.page,'targetTab':self.target_tab,**job})
            phase = 'HTML·동작 수정' if job['phase']=='html' else '사용자 확인 후 Figma·정책 반영'
            prompt = (f'화면 검수 도구에서 사용자 요청 #{job["number"]}의 {phase} 작업을 전달했습니다. '
                      f'작업 원본: {path}\n'
                      f'{WORK/"AGENT_WORKFLOW.md"}와 세션 인계 문서를 읽고 기존 요청을 이어서 처리하세요. '
                      '실제 작업 시작/결과를 review_agent.py begin/result/synced로 기록하면 패널에 자동 전달됩니다. '
                      '사용자 확인을 대신 완료하지 마세요. 이 요청은 같은 프로젝트의 현재 대화로 전달된 연속 작업입니다.')
            # Write intent before submission. Ambiguous delivery is never blindly sent a second time.
            ledger[key]={'state':'submitting','at':now(),'job':str(path)};write(WORK/'runtime-ledger.json',ledger)
            try:
                receipt = self.cli('terminal','send','--terminal',handle,'--text',prompt,'--enter')
                accepted = self.accepted(receipt)
                ledger[key].update(state='accepted' if accepted else 'unconfirmed',receipt=receipt)
                write(WORK/'runtime-ledger.json',ledger)
                self.update({'id':job['id'],'phase':job['phase'],'token':job['token'],
                             'state':'sent' if accepted else 'error',
                             'error':'대화로의 전달 상태를 확인하고 있습니다. 중복 전송하지 않습니다.'})
            except Exception as error:
                ledger[key].update(state='unconfirmed',error=str(error));write(WORK/'runtime-ledger.json',ledger)
                self.update({'id':job['id'],'phase':job['phase'],'token':job['token'],'state':'error','error':str(error)[:900]})

    @staticmethod
    def accepted(receipt):
        if isinstance(receipt,dict):
            if receipt.get('accepted') is True or receipt.get('stage') in ('input_accepted','turn_started'):
                return True
            return any(Bridge.accepted(v) for v in receipt.values())
        if isinstance(receipt,list):
            return any(Bridge.accepted(v) for v in receipt)
        return receipt in ('input_accepted','turn_started') if isinstance(receipt,str) else False

class FileBridge(Bridge):
    """Exchange JSON with a browser-granted folder; never drive or open an Orca browser."""
    def __init__(self, target_tab='', exe=None):
        super().__init__(target_tab=target_tab,exe=exe)
        self.folder=WORK/'runtime-browser'
        self.queue_path=WORK/'runtime-file-queue.json'
        self.queue=load(self.queue_path) if self.queue_path.exists() else {}
        self.client=''

    def update(self,value):
        key=hashlib.sha256(json.dumps(value,sort_keys=True).encode()).hexdigest()[:32]
        self.queue[key]={'client':self.client,'value':value}
        write(self.queue_path,self.queue)
        return {'applied':False,'status':'awaiting_browser'}

    def tick(self,ledger):
        write(self.folder/'heartbeat.json',{'epoch':EPOCH,'at':now()})
        session_path=self.folder/'session.json';outbox_path=self.folder/'outbox.json'
        if not session_path.exists() or not outbox_path.exists():
            write(WORK/'runtime-status.json',{'at':now(),'status':'waiting_for_browser_folder','mode':'files','pid':os.getpid()})
            return
        if outbox_path.stat().st_size>16*1024*1024:raise ValueError('검수 요청 파일이 너무 큽니다.')
        session=load(session_path);outbox=load(outbox_path)
        if session.get('project')!=PROJECT or session.get('epoch')!=EPOCH:return
        self.client=session.get('client','')
        if not self.client or outbox.get('client')!=self.client or outbox.get('epoch')!=EPOCH or outbox.get('project')!=PROJECT:return
        if abs((datetime.now(timezone.utc)-datetime.fromisoformat(outbox['at'].replace('Z','+00:00'))).total_seconds())>25:return
        for ack in outbox.get('ack',[]):
            key=ack.get('key');entry=self.queue.get(key)
            if entry and entry['client']==self.client:
                source=entry.get('source')
                if source:
                    path=WORK/'updates'/source
                    if path.exists():path.rename(path.with_suffix('.applied' if ack.get('status')=='applied' else '.obsolete'))
                del self.queue[key]
        references={(r['id'],r['phase'],r['token']) for r in outbox.get('references',[])}
        for path in sorted((WORK/'updates').glob('*.json')):
            value=load(path)
            if (value.get('id'),value.get('phase'),value.get('token')) not in references:continue
            key=hashlib.sha256(json.dumps(value,sort_keys=True).encode()).hexdigest()[:32]
            self.queue[key]={'client':self.client,'value':value,'source':path.name}
        jobs=outbox.get('jobs',[])
        if not isinstance(jobs,list) or len(jobs)>500:raise ValueError('검수 요청 형식 오류')
        for job in jobs:
            item=job.get('item',{})
            if not isinstance(job.get('id'),str) or not isinstance(job.get('token'),str) or not isinstance(item.get('request'),str):raise ValueError('검수 요청 형식 오류')
        self.dispatch(jobs,ledger)
        write(self.queue_path,self.queue)
        write(self.folder/'inbox.json',{'epoch':EPOCH,'client':self.client,'updates':[{'key':k,'value':v['value']} for k,v in self.queue.items() if v['client']==self.client]})
        write(WORK/'runtime-status.json',{'at':now(),'status':'connected','mode':'files','targetTab':self.target_tab,'pid':os.getpid()})

def result_command(args):
    job = load(args.job)
    if job.get('schema') != SCHEMA: raise ValueError('검수 작업 파일이 아닙니다.')
    value = {'id':job['id'],'phase':job['phase'],'token':job['token']}
    if args.command=='begin': value['state']='working'
    elif args.command=='question':
        if job['phase']!='html' or not args.question or not args.question.strip():raise ValueError('확인할 질문을 입력하세요.')
        value.update(state='question',question=args.question.strip())
    elif args.command=='result':
        if job['phase']!='html' or not args.summary or not args.evidence: raise ValueError('HTML 작업의 실제 요약과 검증 근거를 입력하세요.')
        value.update(state='result',summary=args.summary,evidence=args.evidence,changedAt=now())
        changes=getattr(args,'policy_changes',None)
        if changes is not None:value['policyChanges']=changes
        elif getattr(args,'no_policy_change',False):value['policyChanges']=''
        if args.after:
            path=Path(args.after);mime={'.jpg':'jpeg','.jpeg':'jpeg','.png':'png','.webp':'webp'}.get(path.suffix.lower())
            if not mime: raise ValueError('지원하는 화면 이미지가 아닙니다.')
            value['after']='data:image/'+mime+';base64,'+base64.b64encode(path.read_bytes()).decode()
    else:
        if job['phase']!='sync': raise ValueError('사용자 화면 확인을 마친 뒤 문서를 반영하세요.')
        value.update(state='synced',figma={'status':args.figma_status,'evidence':args.figma_evidence or ''},
                     policy={'status':args.policy_status,'evidence':args.policy_evidence or ''})
        for k in ('figma','policy'):
            if value[k]['status']!='pending' and not value[k]['evidence']: raise ValueError('실제 반영 근거가 필요합니다.')
        if args.figma_status=='done':
            from publish_descriptions import SOURCE, publish, build
            source=getattr(args,'description_export',None) or SOURCE
            descriptions=build(source)
            if datetime.fromisoformat(descriptions['capturedAt'].replace('Z','+00:00')) < datetime.fromisoformat(job['at'].replace('Z','+00:00')):
                raise ValueError('이 작업을 반영한 최신 Figma Description을 다시 내보낸 뒤 --description-export로 지정하세요. 완료 기록은 아직 전달하지 않았습니다.')
            published=publish(source)
            value['figma']['evidence']+='\nHTML Description 동기화: '+published['revision']
    path=WORK/'updates'/(str(time.time_ns())+'.json');write(path,value);print(path)

def watch(args):
    WORK.mkdir(exist_ok=True)
    lock = (WORK/'runtime.lock').open('a+b');lock.seek(0);lock.write(b'0');lock.flush();lock.seek(0)
    try:
        if os.name=='nt':
            import msvcrt
            msvcrt.locking(lock.fileno(),msvcrt.LK_NBLCK,1)
        else:
            import fcntl
            fcntl.flock(lock,fcntl.LOCK_EX|fcntl.LOCK_NB)
    except OSError:
        return
    bridge=FileBridge(target_tab=args.target_tab) if args.mode=='files' else Bridge(args.page,args.target_tab);ledger_path=WORK/'runtime-ledger.json'
    ledger=load(ledger_path) if ledger_path.exists() else {}
    while not (WORK/'runtime.stop').exists():
        try:
            config=WORK/'runtime-config.json'
            if config.exists():
                value=load(config);bridge.target_tab=value['targetTab']
                if isinstance(bridge,FileBridge):
                    if value.get('mode')!='files':break
                else:
                    if value.get('mode')=='files':break
                    bridge.page=value['page']
            bridge.tick(ledger)
        except Exception as error:
            write(WORK/'runtime-status.json',{'at':now(),'status':'disconnected','message':str(error)[:900],'pid':os.getpid()})
        time.sleep(6)
    lock.close()

def main():
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument('command',choices=['launch','watch','begin','question','result','synced','stop'])
    parser.add_argument('--mode',choices=['files','orca'],default='files')
    parser.add_argument('--page',default='');parser.add_argument('--target-tab',default='')
    parser.add_argument('--question');parser.add_argument('--job',type=Path);parser.add_argument('--summary');parser.add_argument('--evidence');parser.add_argument('--after',type=Path)
    parser.add_argument('--description-export',type=Path,help='이번 작업 후 실제 Figma에서 내보낸 Description JSON. synced의 Figma 완료 시 HTML에도 함께 게시합니다.')
    policy=parser.add_mutually_exclusive_group()
    policy.add_argument('--policy-changes',help='실제로 바뀐 정책: 이전 기준과 변경 기준, 적용 조건')
    policy.add_argument('--no-policy-change',action='store_true',help='수정 내용을 검토했고 정책 변경 없음')
    for key in ('figma','policy'):
        parser.add_argument('--'+key+'-status',choices=['done','na','pending'],default='pending')
        parser.add_argument('--'+key+'-evidence')
    args=parser.parse_args()
    if args.command=='launch':
        bridge=Bridge(target_tab=os.environ.get('ORCA_TAB_ID',''));bridge.target()
        if args.mode=='orca':bridge.find_page()
        WORK.mkdir(exist_ok=True);(WORK/'runtime.stop').unlink(missing_ok=True)
        write(WORK/'runtime-config.json',{'mode':args.mode,'page':bridge.page,'targetTab':bridge.target_tab})
        write(WORK/'runtime-project.json',{'project':PROJECT,'epoch':EPOCH})
        subprocess.Popen([sys.executable,str(Path(__file__).resolve()),'watch','--mode',args.mode,'--page',bridge.page,'--target-tab',bridge.target_tab],
                         cwd=ROOT,stdin=subprocess.DEVNULL,stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL,creationflags=NO_WINDOW)
        print('검수 연결을 시작했습니다. HTML의 작업 폴더 연결에서 프로젝트의 review-work 폴더를 선택하세요.' if args.mode=='files' else 'Orca 내부 화면을 연결했습니다.')
        if args.mode=='orca':print('page:',bridge.page)
    elif args.command=='watch':watch(args)
    elif args.command=='stop':WORK.mkdir(exist_ok=True);(WORK/'runtime.stop').touch();print('검수 연결 종료를 요청했습니다.')
    else:
        if not args.job:parser.error('--job is required')
        if args.command=='result' and args.policy_changes is None and not args.no_policy_change:
            parser.error('정책 영향을 검토한 뒤 --policy-changes 또는 --no-policy-change를 지정하세요.')
        result_command(args)

if __name__=='__main__':
    main()
