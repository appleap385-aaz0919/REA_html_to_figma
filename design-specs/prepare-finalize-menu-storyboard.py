import json
from pathlib import Path
root=Path(__file__).resolve().parent
ids=[]
provenance={}
for p in [root/"item-storyboard-states.json",root/"hml-storyboard-states.json",root/"definition-storyboard-states.json",root/"twin-storyboard-states.json"]:
    for screen in json.loads(p.read_text(encoding="utf-8"))["screens"]:
        ids.extend(screen["id"]+"_"+str(i+1).zfill(2) for i in range(len(screen["states"])))
        provenance.update({screen['id']+'_'+str(i+1).zfill(2):s.get('evidence',[]) for i,s in enumerate(screen['states'])})
template=(root/"finalize-menu-storyboard.template.js").read_text(encoding="utf-8")
(root/"finalize-menu-storyboard.js").write_text(template.replace("EXPECTED",json.dumps(ids)).replace('PROVENANCE',json.dumps(provenance,ensure_ascii=False)),encoding="utf-8")
print(len(ids))

