import json
from pathlib import Path
r=Path(__file__).resolve().parent
fixture=json.loads((r/'lab-passage-seed.json').read_text(encoding='utf-8'))
doc={'contentVersion':'v3','outType':'split','content':{'passageHtml':fixture['content']['passageHtml']},'assets':[],'passageKey':''}
(r/'lab-passage-normalized-test-input.json').write_text(json.dumps({'provenance':'Local test input normalized from retained malformed development fixture; not a CMS mutation or original document claim. Required keys from captured editor validation lines79050-79104.','document':doc},ensure_ascii=False,indent=2),encoding='utf-8')
steps=[
 ('1487-lab-passage-normalize-direct-tab',['eval','--file','sources/runtime/lab-select-direct-tab.js']),
 ('1488-lab-passage-normalized-json-input',['fill','#frameDocInput',json.dumps(doc,ensure_ascii=False)]),
 ('1489-lab-passage-normalized-load',['eval',"(() => {document.querySelector('#frameDocLoad').click();return {action:'Load locally normalized passage test JSON'};})()"]),
 ('1490-lab-passage-normalized-direct-state',['eval','--file','sources/runtime/lab-editor-frame-observation.js']),
 ('1491-lab-passage-normalized-direct-save',['eval',"(() => {document.querySelector('[data-side=direct] [data-call=save]').click();return {action:'Validate normalized direct passage locally'};})()"]),
 ('1492-lab-passage-normalized-frame-tab',['eval','--file','sources/runtime/lab-select-frame-tab.js']),
 ('1493-lab-passage-normalized-frame-state',['eval','--file','sources/runtime/lab-editor-frame-observation.js']),
 ('1494-lab-passage-normalized-compare',['eval',"(() => {document.querySelector('#frameDocCompare').click();return {action:'Compare normalized passage test documents'};})()"]),
 ('1495-lab-passage-normalized-frame-save',['eval',"(() => {document.querySelector('[data-side=frame] [data-call=save]').click();return {action:'Validate normalized iframe passage locally'};})()"]),
 ('1496-lab-passage-normalized-final',['eval','--file','sources/runtime/lab-editor-frame-observation.js']),
 ('1497-lab-passage-normalized-source',['eval','--file','sources/runtime/sanitized-page-source.js'])]
(r/'scenarios/lab-normalized-passage.json').write_text(json.dumps({'steps':[{'label':a,'command':b} for a,b in steps],'tailChars':600},ensure_ascii=False,indent=2),encoding='utf-8')
print('Prepared11localteststeps')
