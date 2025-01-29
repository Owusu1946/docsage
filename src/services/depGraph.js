import { createGraph } from '@mermaid-js/mermaid';

export async function generateDependencyGraph(files) {
  const dependencies = new Map();
  
  files.forEach(file => {
    if (file.type === 'js' || file.type === 'ts') {
      const imports = extractImports(file.content);
      dependencies.set(file.path, imports);
    }
  });

  return createMermaidGraph(dependencies);
}