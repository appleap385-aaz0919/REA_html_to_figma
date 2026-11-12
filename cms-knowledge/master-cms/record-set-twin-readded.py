import json
from pathlib import Path
root=Path(__file__).resolve().parent
def read(n):return json.loads((root/n).read_text(encoding='utf-8'))
def ev(n):
 d=json.loads(next((root/'evidence').glob(str(n)+'-*.json')).read_text(encoding='utf-8'));assert d['action']['success'];return d['action']['data']['result']
baseline=ev(2552)['results'];after=ev(2592)['results'];expected_ids={2089242,2089243,2089244,2089245,2089358,2089359,2089360,2089361}
for old,new in zip(baseline,after):
 assert old['itemId']==new['itemId'] and old['histories']==new['histories']
 assert new['countNodes']==[{'id':'twinCountBadge','text':'2'},{'id':'twinCountText','text':'2개'}]
 assert len(new['tables'])==2 and all(len(t['rows'])==4 for t in new['tables'])
 assert {int(row['cells'][0]) for table in new['tables'] for row in table['rows']}==expected_ids
assert ev(2593)==ev(2549) and ev(2594)==ev(2551)
assert [(x['itemId'],x['viewFlag']) for x in ev(2595)['items']]==[(2089242,'Y'),(2089243,'Y'),(2089244,'Y'),(2089245,'Y'),(2089246,'R')]
assert all(x['viewFlag']=='R' for x in ev(2596)['items'])
assert ev(2581)['receipt']['httpStatus']==500 and ev(2583)==ev(2571)
assert ev(2585)['errorContainerVisible'] is False and ev(2585)['visibleAlerts']==[]
ledger=read('mutation-ledger.json');assert len(ledger['entries'])==59,'Already recorded or changed chronology; no replay.'
ledger['entries'].append({'operation':'Manually re-add original set through one candidate item to restore own two-set twin group','anchorItemId':2089358,'targetItemId':2089242,'anchorPassageId':2089357,'targetPassageId':2089241,'submitEvidence':2590,'readbackEvidence':[2591,2592,2593,2594,2595,2596],'afterMemberSetCountOnAllEightChildren':2,'afterChildRowCount':8,'originalAndCopyVersionsModelsOmrHmlAndStatusesUnchanged':True,'generationHistoriesUnchanged':True,'normalGroupMayContainApprovedOriginalAndDraftCopy':True,'serviceDeployment':False})
(root/'mutation-ledger.json').write_text(json.dumps(ledger,ensure_ascii=False,indent=2),encoding='utf-8')
p=root/'set-twin-membership-intent-20261110.json';d=read(p.name);d.update(status='unlink_readd_confirmed_same_passage_error_recorded',readdSubmitEvidence=2590,readdReadbackEvidence=[2592,2593,2594,2595,2596],currentMemberSetCount=2,logicalMembershipRestorationPending=False,confirmedMasterOperations=60)
d['samePassageCandidateProbe'].update(errorVisibilityEvidence=2585,errorContainerVisible=False,visibleAlerts=[],noObservedRelationshipChange=True)
p.write_text(json.dumps(d,ensure_ascii=False,indent=2),encoding='utf-8')
error={'schemaVersion':1,'scopeHost':'dev-exambank.dongahub.com','anchorItemId':2089358,'targetSiblingItemId':2089359,'sharedPassageId':2089357,'scenario':'Unlinked copy set, normal Twin Add tab, enabled sibling candidate in same passage','candidateEvidence':2579,'submitEvidence':2580,'xhrResponseEvidence':2581,'httpStatus':500,'hxTrigger':None,'membershipReadEvidence':2583,'relationshipCountBeforeAndAfter':0,'errorVisibilityEvidence':2585,'errorTargetHiddenCurrentPane':True,'activeAddPaneHadVisibleErrorAlert':False,'pixelViewedEvidence':2582,'positiveDifferentSetControlSubmit':2590,'positiveDifferentSetControlRead':2592,'positiveControlMemberSets':2,'backendRootCause':None,'backendLogsOrDatabaseInspected':False,'extraConfirmedMasterOperationForFailedProbe':False}
(root/'set-twin-same-passage-add-error-20261110.json').write_text(json.dumps(error,ensure_ascii=False,indent=2),encoding='utf-8')
print('Confirmed original/copy logical two-set membership restored; same-passage500/no visible active-tab error recorded; Master60.')
