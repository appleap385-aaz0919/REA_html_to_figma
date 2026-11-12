"""Record completed HML observations through1110. One-shot: do not replay browser scenarios."""
import json
from pathlib import Path
from urllib.parse import parse_qs, urlsplit

root = Path(__file__).resolve().parent
phase_path = root / 'session-20261109-phase16.json'
if phase_path.exists():
    raise SystemExit('Phase16 already recorded; do not append duplicate mutations.')

def read(name):
    return json.loads((root / name).read_text(encoding='utf-8'))

def write(name, obj):
    (root / name).write_text(json.dumps(obj, ensure_ascii=False, indent=2), encoding='utf-8')

phase = {
    'schemaVersion':1, 'date':'2026-11-09', 'status':'evidence_recorded',
    'evidenceRange':[1002,1110], 'testItemId':2088985, 'savedDetailId':2088701,
    'observations':[
        {'evidence':[1004,1010,1012,1013], 'result':'Definition set2088663, passage2088658, has no HML in any slot. Passage/translation buttons disabled. Clicking Question creates a blank one-page document with 새 문서입니다. 작성 후 저장하세요. No editor or CMS save submitted for this set.'},
        {'evidence':[1017,1019,1023,1024,1027,1028,1034], 'result':'HML conversion source filter:11760 results at this observation;100rows/page reveals set2088355, passage2088353. A list link pointer action1024 was blocked by covering td; keyboard focus+Enter1027-28 navigated successfully. Do not call the blocked pointer action a CMS defect without reproduction.'},
        {'evidence':[1036,1037,1038,1039,1040,1041,1043,1044,1045,1048,1049], 'result':'HML set2088355/detail2087012 loads Question2088355_Q.hml, common Passage2088353_J.hml and Answer2088355_A.hml. Translation has no file and remains disabled. Parent distinguishes missing-file text from image-load error. Vendor renders actual originals despite failed parent preview images. Each sampled document status1/1page; passage/question/answer actual scroller bottom549+613=1162, with top/bottom pixels retained.'},
        {'evidence':[1059,1064,1065,1067,1068,1069,1070], 'result':'On test copy2088985, real canvas keyboard insertion of [QA-HML-20261109] succeeded. Switching to Answer without saving and back to Question showed no warning and removed the marker. This is an observed loss of unsaved edits in this selected flow; broader dirty-state behavior remains untested.'},
        {'evidence':[1075,1076,1077,1078,1079,1081,1083], 'result':'Reinserted marker and used editor Save. Received HML and PNG temporary URLs in parent question pending fields, confirmation asks for CMS Temporary Save or Full Apply. Parent detail ID remains2088700 before CMS commit. Editor keeps/reopens saved content; no permanent Master revision inferred from editor success alone.'},
        {'evidence':[1084,1085,1087,1088,1089,1095,1101,1103], 'result':'CMS Full Apply then confirmation Save1087 creates detail2088701.1088 still showed busy overlay; no resubmission.1089 completed detail navigation. Reentry1095 pending fields empty; question path changed from parent2038004/1 to /item/208/2088985/2088701/hml/2088985_Q.hml. Answer retains original reference. Parent PNG1101 and newly opened editor1103 visibly retain marker.'},
        {'evidence':[1109], 'result':'After HML commit, HTML question editor and its viewer still show original question without the HML test marker. This sample shows no automatic HML-to-HTML replacement in this flow. Intended synchronization policy is not established.'},
        {'evidence':[1110], 'result':'Refreshed declared HML glue from live editor HTML: webhwp-e082bada3ae14916759b8d44db43d953.js,HTTP200,18032bytes,SHA25648c4aff20257ca91cc7641022149ff75fa063338fd6d599091181d24c1132cf6. Older Nov6 hashed URL now404. New save success notifies parent then reopens pre-image-layout HML in same slot; reopen failure clears document with warning. Source diff retained; this explains runtime saved-content restoration, superseding historical clear-after-save description.'}
    ],
    'mutations':{'confirmedMasterOperationsAdded':1,'totalConfirmedMasterOperations':18,
                 'vendorTemporaryOperations':'One HML SaveAs plus preview image creation succeeded; recorded separately from Master operations/DBrows.'},
    'remaining':['Translation slot with an actual existing file; translation/passage actual save and shared-passage propagation.',
                 'Answer edit/save, repeated-save behavior, save/reopen failures, CMS temporary-save variant and discarded pending results.',
                 'Vendor menu commands/dialogs, objects/tables/formats, multi-page documents and dirty close behavior.',
                 'Remaining OMR branches; twin groups, papers, sources, Lab and deployment/service propagation.'],
    'qualityNotes':['No production CMS tab was inspected or modified.','No save was submitted for sampled existing sets.',
                    'Historical targetId fields for tab transitions are corrected from observed post-URLs below; original configuredTargetId retained.',
                    'Latest helper observes actual selected target for each action; screenshots/AX can observe different transient render stages.']
}

ledger = read('mutation-ledger.json')
assert len(ledger['entries']) == 17
ledger['entries'].append({'operation':'Full apply edited HML Question','itemId':2088985,
 'submitEvidence':1087,'readbackEvidence':[1089,1095,1101,1103], 'detailId':2088701,
 'submittedValues':{'slot':'question','insertedText':'[QA-HML-20261109] ',
                    'oldPath':'/item/203/2038004/1/hml/2038004_Q.hml',
                    'newPath':'/item/208/2088985/2088701/hml/2088985_Q.hml'},
 'status':'Committed HML and parent preview retain marker after reentry/new editor; test item remains draft and undeployed.'})
write('mutation-ledger.json', ledger)
write(phase_path.name, phase)

note = 'HML question edit/editor save/CMS full apply and reentry verified,detail2088701. Existing set passage/question/answer loads and true scroll bottom observed; translation-file case and vendor commands remain. Current tab HTML; no unsaved changes or popup.'
resume = read('resume-state.json')
resume.update({'lastRetainedEvidence':'1110-hml-current-glue-source', 'testCurrentDetailId':2088701,
 'latestSessionEvidence':phase_path.name, 'resumeNote':note,'unsavedState':None,
 'nextActions':phase['remaining']})
resume['sessionEvidence'].append(phase_path.name)
resume['liveBrowserLastKnownState'].update({'tab':'HTML modification after HML restoration verification','modal':None,
 'lastEvidence':'1110-hml-current-glue-source','persistentSiteMutations':18,
 'targetId':'0EFB900C688AC111C33EDFA475104F9D'})
write('resume-state.json',resume)
status = read('inspection-status.json')
status.update({'summary':note,'lastRetainedEvidence':'1110-hml-current-glue-source',
 'latestSessionEvidence':phase_path.name,'resumeNote':note,'nextSteps':phase['remaining'],
 'unknowns':['Remaining pages, state variants and detailed role-dependent permissions.',
             'Deployment/service propagation and remaining editor/OMR branches.',
             'Server/DB implementation and intended cross-channel synchronization policy.']})
status['counts']['siteDataMutations']=18
write('inspection-status.json',status)
knowledge = read('knowledge.json')
knowledge['currentEvidenceIndex'].update({'asOfEvidence':1110,'sessionObservationCutoff':1110,
 'persistentTestDetail':2088701,'confirmedServerOperations':18,'latestSession':phase_path.name,
 'latestHmlGlue':'sources/hml-glue-20261109.manifest.json'})
knowledge['currentEvidenceIndex']['readingOrder'].insert(0,phase_path.name)
write('knowledge.json',knowledge)

# Correct only metadata inferred unambiguously from already-observed URLs; no UI actions.
for path in sorted((root/'evidence').glob('*.json')):
    try: number=int(path.name.split('-',1)[0])
    except ValueError: continue
    if not 1002 <= number <= 1110: continue
    record=json.loads(path.read_text(encoding='utf-8'))
    url=(record.get('snapshot',{}).get('data') or {}).get('origin') or (record.get('before',{}).get('data') or {}).get('url','')
    parsed=urlsplit(url); query=parse_qs(parsed.query); item=query.get('itemId',[''])[0]
    target=None
    if '/item/webhwp/editor.donga' in parsed.path:
        if item=='2088663': target='D5B2FC8962D733382D9AAFA94AF15DAE'
        elif item=='2088355': target='DE767F26D12D138B6395D12D0CDBC099'
        elif item=='2088985': target='82FDB43F2AB519910BB4558E40557D29' if number<1103 else '91982538E0B4DACA85D08CABD50CBB61'
    elif item=='2088985': target='0EFB900C688AC111C33EDFA475104F9D'
    elif parsed.hostname=='dev-exambank.dongahub.com': target='C06F56F8973F594BE8196DCB15B2DEBC'
    if target and record.get('targetId') != target:
        record['configuredTargetId']=record.get('targetId');record['targetId']=target
        record['targetMetadataCorrection']='From captured post-URL and observed tab inventory; phase16 checkpoint.'
        path.write_text(json.dumps(record,ensure_ascii=False,indent=2),encoding='utf-8')

report=root/'research/hml-editor-behavior.md'
previous=report.read_text(encoding='utf-8')
update='''2026-11-09 업데이트: 최신 런타임 조사와 소스 변경 내역은 `../session-20261109-phase16.json`과 `../sources/hml-glue-20261109.manifest.json`에 기록했습니다. 아래 본문은 11월 6일의 정적 조사 기록이므로 최신 결과가 우선합니다.

세트 문항 2088355에서 공통 지문·문제·해답 HML을 실제로 열고, 각 문서의 내부 스크롤 끝까지 확인했습니다. 지문해석 파일은 이 표본에 없어 해당 버튼은 비활성 상태였습니다. 문항 2088663처럼 HML이 전혀 없는 표본에서는 문제·해답의 새 문서 기능을 확인했습니다.

복제 테스트 문항 2088985에서 `[QA-HML-20261109]`를 입력했습니다. 저장하지 않고 해답으로 이동한 뒤 문제로 돌아오면 경고 없이 입력 내용이 사라졌습니다. 문구를 다시 입력하여 편집기 저장, CMS 전체 반영, 수정 화면 재진입, 새 편집기 열기를 차례로 실행했고, 상세 버전 2088701과 저장된 문구의 복원을 확인했습니다. 편집기 저장 직후에는 부모의 대기 결과에 HML·PNG 임시 URL만 들어오며 CMS에서 한 번 더 저장해야 반영됩니다. 이 흐름에서 HTML 문제 본문은 HML 문구로 자동 교체되지 않았습니다. 의도된 동기화 정책은 미확인입니다.

현재 연결 스크립트는 `webhwp-e082bada3ae14916759b8d44db43d953.js`입니다. 이미지 생성 후 문서를 비운다는 아래의 과거 설명과 달리, 최신 소스는 이미지용 레이아웃 변경 전에 저장한 HML을 같은 슬롯에 다시 엽니다. 다시 열기에 실패할 때만 문서를 비우고 경고합니다. 성공 경로는 실제 화면에서도 확인했으며 실패 경로는 소스만 확인했습니다. 지문해석의 실제 파일 로드, 지문·해답 저장, 공유 지문의 반영 범위, 기안기 내부 명령 전체는 아직 확인하지 않았습니다.

---

'''
report.write_text(update+previous,encoding='utf-8')
print(json.dumps({'phase':phase_path.name,'lastEvidence':1110,'MasterOperations':18,'testDetail':2088701},ensure_ascii=False))
