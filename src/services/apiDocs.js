import { parse } from '@babel/parser';
import traverse from '@babel/traverse';

export async function generateApiDocs(files) {
  const apis = [];
  
  for (const file of files) {
    if (file.path.includes('/api/') || file.path.includes('/routes/')) {
      const ast = parse(file.content, {
        sourceType: 'module',
        plugins: ['jsx', 'typescript']
      });
      
      traverse(ast, {
        FunctionDeclaration(path) {
          const comments = path.node.leadingComments;
          if (comments) {
            apis.push({
              name: path.node.id.name,
              description: comments[0].value,
              params: path.node.params.map(p => p.name),
              file: file.path
            });
          }
        }
      });
    }
  }
  
  return apis;
}