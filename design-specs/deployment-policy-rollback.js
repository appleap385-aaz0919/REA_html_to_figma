// Explicit rollback only: restore existing frame IDs and their previous descriptions.
const value=JSON.parse(figma.root.getPluginData('cmsDeploymentPolicyApplied')||'null');if(!value)throw Error('No deployment-policy rollback record');
const backup=figma.getNodeById(value.backup);if(!backup)throw Error('Backup missing');const record=JSON.parse(backup.getPluginData('cmsDeploymentPolicyRollback'));
for(const saved of record.copies){const original=figma.getNodeById(saved.original),copy=figma.getNodeById(saved.backup);if(!original||!copy)throw Error('Missing original/backup '+saved.original);
 if(original.type==='FRAME'){for(const child of [...original.children])child.remove();for(const child of copy.children)original.appendChild(child.clone());original.resize(saved.w,saved.h);original.fills=copy.fills;original.clipsContent=copy.clipsContent;}
 else if(original.type==='VECTOR'){original.vectorPaths=copy.vectorPaths;original.strokes=copy.strokes;original.fills=copy.fills;}
 original.x=saved.x;original.y=saved.y;
 for(const key of original.getPluginDataKeys())if(!copy.getPluginDataKeys().includes(key))original.setPluginData(key,'');for(const key of copy.getPluginDataKeys())original.setPluginData(key,copy.getPluginData(key));
}
for(const saved of record.sectionBefore){const section=figma.getNodeById(saved.id);section.x=saved.x;section.y=saved.y;section.resizeWithoutConstraints(saved.w,saved.h);}
figma.root.setPluginData('cmsDeploymentPolicyApplied','');figma.root.setPluginData('cmsDeploymentPolicyVerification','');print('DEPLOYMENT_ROLLBACK restored existing frames and descriptions. Local artifacts must be restored from the verified ZIP separately.');
