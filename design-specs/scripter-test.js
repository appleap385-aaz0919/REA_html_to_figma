print({page:figma.currentPage.name,file:figma.fileKey,sections:figma.currentPage.children.map(n=>({id:n.id,type:n.type,name:n.name}))});
