import { GoogleGenerativeAI } from '@google/generative-ai';
import { logger } from './utils/logger.js';
import { CONFIG } from './utils/config.js';

export async function analyzeCodebase(files) {
  const genAI = new GoogleGenerativeAI(CONFIG.API_KEY);
  const model = genAI.getGenerativeModel({ model: CONFIG.MODEL_NAME });

  const projectInfo = extractProjectInfo(files);
  const codeContext = prepareCodeContext(files);

  const prompt = generateAnalysisPrompt(projectInfo, codeContext);
  
  for (let attempt = 1; attempt <= CONFIG.MAX_RETRIES; attempt++) {
    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const analysis = response.text();
      
      if (!isValidAnalysis(analysis)) {
        throw new Error('Invalid analysis format');
      }
      
      return {
        projectInfo,
        analysis,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      if (attempt === CONFIG.MAX_RETRIES) {
        throw new Error(`Failed to analyze code after ${CONFIG.MAX_RETRIES} attempts: ${error.message}`);
      }
      logger.warn(`Analysis attempt ${attempt} failed, retrying...`);
    }
  }
}

function extractProjectInfo(files) {
  const packageJson = files.find(f => f.path.toLowerCase() === 'package.json');
  if (!packageJson) {
    logger.warn('package.json not found');
    return {};
  }

  try {
    const pkg = JSON.parse(packageJson.content.trim());
    return {
      name: pkg.name || '',
      version: pkg.version || '1.0.0',
      description: pkg.description || '',
      author: pkg.author || '',
      license: pkg.license || 'MIT',
      dependencies: pkg.dependencies || {},
      devDependencies: pkg.devDependencies || {}
    };
  } catch (error) {
    logger.warn(`Failed to parse package.json: ${error.message}`);
    return {};
  }
}

function prepareCodeContext(files) {
  return files.map(file => ({
    path: file.path,
    content: file.content,
    type: file.type
  }));
}

function generateAnalysisPrompt(projectInfo, codeContext) {
  return `Analyze this codebase and generate a comprehensive README.md in Markdown format.

Project Information:
${JSON.stringify(projectInfo, null, 2)}

Code Files:
${codeContext.map(file => `${file.path} (${file.type})`).join('\n')}

Please include:
1. Project name and description
2. Installation instructions
3. Usage examples
4. Key features
5. API documentation (if applicable)
6. Dependencies
7. License information
8. Contributing guidelines

Use appropriate Markdown syntax, emojis, and formatting. Include code blocks where relevant.
Base all information strictly on the provided code context.`;
}

function isValidAnalysis(analysis) {
  const requiredSections = [
    '# ',           // Must have at least one header
    'Installation', // Must have installation section
    '```'          // Must have at least one code block
  ];
  
  return requiredSections.every(section => 
    analysis.includes(section)
  );
} 