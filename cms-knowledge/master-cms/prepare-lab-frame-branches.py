import json
from pathlib import Path
r=Path(__file__).resolve().parent
steps=[
 ('1461-lab-frame-activate-iframe-for-choice',['eval',"(() => {document.querySelector('a[href=\"#frameTabFrame\"]').click();return {action:'Activate iframe test pane'};})()"]),
 ('1462-lab-frame-local-choice-on',['eval',"(() => {document.querySelector('[data-side=frame] [data-call=mcOn]').click();return {action:'Enable multiple choice in iframe test only'};})()"]),
 ('1463-lab-frame-changed-compare',['eval',"(() => {document.querySelector('#frameDocCompare').click();return {action:'Compare after enabling choices on one side'};})()"]),
 ('1464-lab-frame-changed-state',['eval','--file','sources/runtime/lab-editor-frame-observation.js']),
 ('1465-lab-frame-direct-switch-after-change',['eval',"(() => {document.querySelector('a[href=\"#frameTabDirect\"]').click();return {action:'Switch direct without reload'};})()"]),
 ('1466-lab-frame-after-switch-compare',['eval',"(() => {document.querySelector('#frameDocCompare').click();return {action:'Compare after returning to direct'};})()"]),
 ('1467-lab-frame-reopen-changed-iframe',['eval',"(() => {document.querySelector('a[href=\"#frameTabFrame\"]').click();return {action:'Reopen modified iframe without reload'};})()"]),
 ('1468-lab-frame-change-retained-state',['eval','--file','sources/runtime/lab-editor-frame-observation.js']),
 ('1469-lab-frame-reload-for-reset',['eval',"(() => {document.querySelector('#frameDocLoad').click();return {action:'Reset both panes from original input'};})()"]),
 ('1470-lab-frame-direct-reset-remount',['eval',"(() => {document.querySelector('a[href=\"#frameTabDirect\"]').click();return {action:'Mount direct original after reset'};})()"]),
 ('1471-lab-frame-reset-both-compare',['eval',"(() => {document.querySelector('#frameDocCompare').click();return {action:'Compare reset documents'};})()"]),
 ('1472-lab-frame-passage-json-input',['fill','#frameDocInput',json.dumps(json.loads((r/'lab-passage-seed.json').read_text(encoding='utf-8')),ensure_ascii=False)]),
 ('1473-lab-frame-passage-load',['eval',"(() => {document.querySelector('#frameDocLoad').click();return {action:'Load retained set passage document locally'};})()"]),
 ('1474-lab-frame-passage-direct-save',['eval',"(() => {document.querySelector('[data-side=direct] [data-call=save]').click();return {action:'Validate passage editor save locally'};})()"]),
 ('1475-lab-frame-passage-iframe-open',['eval',"(() => {document.querySelector('a[href=\"#frameTabFrame\"]').click();return {action:'Open passage iframe editor'};})()"]),
 ('1476-lab-frame-passage-compare',['eval',"(() => {document.querySelector('#frameDocCompare').click();return {action:'Compare passage document render methods'};})()"]),
 ('1477-lab-frame-passage-state',['eval','--file','sources/runtime/lab-editor-frame-observation.js'])]
(r/'scenarios/lab-frame-state-and-passage.json').write_text(json.dumps({'steps':[{'label':a,'command':b} for a,b in steps],'tailChars':1100},ensure_ascii=False,indent=2),encoding='utf-8')
print('Prepared17localteststeps')
