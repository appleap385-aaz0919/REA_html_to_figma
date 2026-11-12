"""Consolidate already-observed phase32 evidence; never replays browser actions."""
import json
from pathlib import Path

root = Path(__file__).resolve().parent
def read(name):
    return json.loads((root/name).read_text(encoding='utf-8'))
def write(name, obj):
    (root/name).write_text(json.dumps(obj, ensure_ascii=False, indent=2), encoding='utf-8')
def evidence(n):
    files=list((root/'evidence').glob(f'{n}-*.json'))
    assert len(files)==1, (n, files)
    return files[0], json.loads(files[0].read_text(encoding='utf-8'))

viewed=[2127,2128,2129,2131,2133,2135,2137,2139,2140,2141,2142,2143,2145,2146,2147,2148,2149,2150,2151,2152,2153]
frames=[]
for n in viewed:
    file, data=evidence(n)
    assert data['screenshot']['success'] is True, n
    assert file.with_suffix('.png').exists(), n
    result=data['action'].get('data',{}).get('result')
    scroll=result.get('scroll', result) if isinstance(result,dict) else None
    if n==2127:
        scroll={'top':0,'height':1015,'total':2214,'positionBasis':'top heading visible in reviewed PNG; dimensions confirmed in following two frames'}
    frames.append({'evidence':n,'png':f'evidence/{file.stem}.png','visuallyReviewed':True,'scroll':scroll})

groups=[
    ('Master2089216 Y',[2127,2128,2129]),
    ('Source registration',[2131]),('Source199 detail',[2133]),('Source134 modify unchanged',[2135]),
    ('Source list 60 rows',[2137,2139,2140,2141,2142,2143]),
    ('Paper531 detail 120 members',[2145,2146,2147,2148,2149,2150,2151,2152,2153])
]
coverage=[]
for name, ids in groups:
    selected=[x for x in frames if x['evidence'] in ids]
    end=0
    for frame in selected:
        s=frame['scroll']
        assert s['top']<=end, (name,s,end)
        end=max(end,s['top']+s['height'])
    assert end>=selected[-1]['scroll']['total'], name
    coverage.append({'state':name,'evidence':ids,'fullVerticalCoverageAtCapturedViewport':True,'total':selected[-1]['scroll']['total']})

write('phase32-pixel-review-20261109.json',{
    'schemaVersion':1,'asOfEvidence':2154,'reviewMethod':'Primary agent directly viewed each listed PNG with view_image; scroll intervals independently checked against retained action results.',
    'viewportWidth':1810,'wrapperHeight':1015,'frames':frames,'coverage':coverage,
    'limits':['이번 6개 상태의 현재 화면에 한정한다. 다른 해상도·권한·모달·모든 데이터 행의 상세 페이지까지 검증했다는 뜻은 아니다.','2105의 비활성 탭 캡처 실패는 그대로 남기며 2131의 새 성공 근거와 구별한다.','평가지 목록의 문항 요약에서 보이는 LaTex 및 HTML 엔티티 문자열을 실제 화면 그대로 기록한다.']})

assert read('live-capture-cursor.json')['evidence']=='2154-paper531-current-detail-readback'
assert len(read('mutation-ledger.json')['entries'])==34
phase={
    'schemaVersion':1,'date':'2026-11-09','status':'evidence_recorded_with_remaining_branches',
    'evidenceRange':[2104,2154],'lastEvidence':'2154-paper531-current-detail-readback',
    'summary':'Master 상태 변경에서 OMR 누락의 승인 차단과 정상 문항의 실제 R→Y 승인을 확인했다. 승인된 QA 문항2089216은 쌍둥이 생성·배포 버튼이 활성화되고, Y 상태에서는 R/F로 직접 변경할 수 없다. 사용자가 허용한 조사 탭 활성화 후 출처 60건 목록·등록·상세·수정, 승인 문항, 120문항 평가지531의 전체 세로 화면을 직접 검토했다. 확정 Master 업무변경은 34회이며 서비스 배포는 수행하지 않았다.',
    'observations':[
        {'evidence':[2104,2105],'result':'비활성 탭에서 출처 등록 화면의 DOM은 수집됐지만 스크린샷은 시간 초과로 실패했다. 권한 미승인이나 CMS 기능 실패로 단정하지 않는다.'},
        {'evidence':list(range(2106,2116)),'result':'QA 단건2089238은 저장된 OMR이 없는 R 상태다. 실제 상태 수정에서 Y를 선택하고 저장을 누르자 승인 불가/OMR 미입력 안내가 나왔고 최종 확인창과 저장 요청으로 진행하지 않았다. 변경 중 목록 이동은 미저장 상태 이탈창을 띄웠다. 이동 취소는 로컬 Y 선택을 유지했고 상태 취소는 R로 초기화·잠금 처리했다. 독립 GET에서도 R/OMR null을 확인했다. 이 경로의 업무 변경은 0회다.'},
        {'evidence':list(range(2116,2125)),'result':'QA 문항2089216은 OMR 5개와 정답④ 및 필수 메타가 있는 R 문항이었다. 실제 상태 저장 확인을 한 번 수행한 뒤 Y 승인(사용)으로 재조회됐다. 콘텐츠 상세ID2088849는 같고 onlineFlag N/serviceUsage T를 유지했다. 쌍둥이 생성·배포 버튼이 활성화됐다. Y에서 R/F 라디오는 개별 비활성이고 Y/N/D는 허용된다. 즉 단순 Y→R 복원 경로는 현재 UI에 없다.'},
        {'evidence':[2125,2126],'result':'사용자가 조사 탭을 크롬의 선택 탭으로 전환해도 된다고 답한 뒤 기존 연결과 동일한 t21만 활성화했다. visibility가 visible로 바뀌었고 이후 캡처가 성공했다. 새 연결·네이티브 마우스 조작은 하지 않았다.'},
        {'evidence':viewed,'result':'PNG 21개를 직접 열어 검토했고 스크롤 구간을 계산해 6개 현재 상태의 세로 범위가 끊기지 않음을 확인했다. 출처 폼3종은 1015px 한 화면, 60건 출처 목록은 총4353px, 평가지531은 총7104px이다. 상세한 위치·이미지는 별도 pixel review에 기록했다.'},
        {'evidence':[2138,2154],'result':'출처 목록은 60행/13열이다. 평가지531은 detail564/초안/120문항이며 배포 버튼이 비활성이고 수정이 활성이다. 원래 평가지의 데이터 변경은 수행하지 않았다.'}
    ],
    'artifacts':['phase32-pixel-review-20261109.json','master-qa-status-approval-intent.json','sources/hml664-success-item2089216-20261109.html','sources/hml665-single2089238-20261109.html','sources/assets/itemValidate-7275b6d68481b3ac74a2f86ada386528.js'],
    'persistentChanges':{'confirmedMasterOperations':34,'newMasterChangesInThisPhase':1,'operation':'Own QA item2089216 R→Y','itemId':2089216,'detailId':2088849,'state':'Y','originalRestorationPending':False,'serviceDeployment':False,'twinGenerationSubmitted':False},
    'remaining':[
        '승인된 자체 QA 문항2089216에서 쌍둥이 생성과 배포 대상 선택의 활성 조건·입력값·안내·취소 경로를 확인한다. 서비스 배포는 수행하지 않는다.',
        '쌍둥이 생성은 아직 요청하지 않았다. 실제 입력 조건과 작업 범위를 확인한 다음 개발 서버에서 최소 범위의 양성 경로를 검토한다.',
        '활성 세트의 개별 자식 수정과 공유 지문 HML 저장, 실제 번역 탭 파일, Definition 복합 자료·일부 실패 및 권한별 분기는 남아 있다.',
        '원본 문항·문서·평가지와 자체 QA 자료를 구분하고, 승인 문서Y/검토S·D/Master 문항Y/평가지 상태/Service 배포 상태를 각각 기록한다.'
    ],
    'resume':{'url':'https://dev-exambank.dongahub.com/paper/detail.donga?paperId=531&curriculum=22&pageNum=1&pageSize=30','tab':'t21 pinned research; Paper531 at bottom','targetId':'C06F56F8973F594BE8196DCB15B2DEBC','modal':None,'unsavedState':None},
    'evidenceLimits':['전체 CMS 또는 모든 분기의 100% 완료를 주장하지 않는다.','클라이언트 소스의 검증 조건과 실제 두 표본의 결과를 서버 전체 정책으로 확대하지 않는다.','현재 화면 전체의 픽셀 검토와 모든 데이터의 상세 검토는 다르다.','기존 historical coverage inventory의 수치를 현재 조사 완료율로 사용하지 않는다.']
}
write('session-20261109-phase32.json',phase)
print(json.dumps({'phase':'32','viewedPNGs':len(frames),'fullyCoveredStates':len(coverage),'lastEvidence':phase['lastEvidence']},ensure_ascii=False))
