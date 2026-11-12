"""Prepare UI inputs from a retained CMS question document; no browser/network."""
import json
from pathlib import Path
from bs4 import BeautifulSoup
r=Path(__file__).resolve().parent
s=BeautifulSoup((r/'sources/item-edit-20261109.html').read_text(encoding='utf-8'),'html.parser')
seed=json.loads(s.select_one('#questionEditorData').get_text())
(r/'lab-question-seed.json').write_text(json.dumps(seed,ensure_ascii=False,indent=2),encoding='utf-8')
steps=[
 ('1432-lab-frame-compare-before-load',['eval',"(() => {document.querySelector('#frameDocCompare').click();return {action:'Compare before loading editors'};})()"]),
 ('1433-lab-frame-invalid-json-input',['fill','#frameDocInput','{broken']),
 ('1434-lab-frame-invalid-json-load',['eval',"(() => {document.querySelector('#frameDocLoad').click();return {action:'Load invalid JSON'};})()"]),
 ('1435-lab-frame-question-json-input',['fill','#frameDocInput',json.dumps(seed,ensure_ascii=False)]),
 ('1436-lab-frame-question-load',['eval',"(() => {document.querySelector('#frameDocLoad').click();return {action:'Load retained question document into local test only'};})()"]),
 ('1437-lab-frame-direct-loaded',['eval','--file','sources/runtime/lab-editor-frame-observation.js']),
 ('1438-lab-frame-direct-get-document',['eval',"(() => {document.querySelector('[data-side=direct] [data-call=getDocument]').click();return {action:'Direct getDocument UI'};})()"]),
 ('1439-lab-frame-direct-save',['eval',"(() => {document.querySelector('[data-side=direct] [data-call=save]').click();return {action:'Direct save API test UI, no CMS save endpoint'};})()"]),
 ('1440-lab-frame-iframe-tab-open',['eval',"(() => {document.querySelector('a[href=\"#frameTabFrame\"]').click();return {action:'Show iframe tab'};})()"]),
 ('1441-lab-frame-iframe-loaded',['eval','--file','sources/runtime/lab-editor-frame-observation.js']),
 ('1442-lab-frame-compare-loaded',['eval',"(() => {document.querySelector('#frameDocCompare').click();return {action:'Compare both loaded documents'};})()"]),
 ('1443-lab-frame-height-fixed',['select','#frameHeightMode','fixed']),
 ('1444-lab-frame-fixed-state',['eval','--file','sources/runtime/lab-editor-frame-observation.js']),
 ('1445-lab-frame-iframe-get-document',['eval',"(() => {document.querySelector('[data-side=frame] [data-call=getDocument]').click();return {action:'Iframe getDocument UI'};})()"]),
 ('1446-lab-frame-iframe-save',['eval',"(() => {document.querySelector('[data-side=frame] [data-call=save]').click();return {action:'Iframe save API test UI, no CMS save endpoint'};})()"]),
 ('1447-lab-frame-save-readback',['eval','--file','sources/runtime/lab-editor-frame-observation.js'])]
plan={'steps':[{'label':label,'command':command} for label,command in steps],'tailChars':900}
(r/'scenarios/lab-frame-question-runtime.json').write_text(json.dumps(plan,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps({'scenario':'lab-frame-question-runtime.json','seedSource':'sources/item-edit-20261109.html#questionEditorData','seedCharacters':len(json.dumps(seed,ensure_ascii=False)),'steps':len(steps)}))
