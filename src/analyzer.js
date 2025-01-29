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
3. Usage examples with detailed CLI commands
4. Key features with detailed explanations
5. API documentation (if applicable)
6. Dependencies with version requirements
7. License information
8. Detailed Contributing Guidelines including:
   - Development setup
   - Code style guidelines
   - Commit message conventions
   - Pull request process
   - Bug reporting guidelines
   - Feature request process
   - Code review process
   - Testing requirements
   - Documentation requirements
   - Community guidelines
   - Code of conduct reference

Use appropriate Markdown syntax, emojis, and formatting. Include code blocks where relevant.
Make the documentation detailed and comprehensive.
Base all information strictly on the provided code context.

For the contributing section, include this template:

## Contributing 🤝

### Development Setup
\`\`\`bash
# Clone the repository
git clone [repository-url]
cd [project-name]

# Install dependencies
npm install

# Run tests
npm test

# Start development server
npm run dev
\`\`\`

### Code Style Guidelines
- Use ESLint and Prettier for code formatting
- Follow JavaScript Standard Style
- Use meaningful variable and function names
- Add JSDoc comments for functions
- Keep functions small and focused

### Commit Message Convention
Follow the Conventional Commits specification:
\`\`\`
feat: Add new feature
fix: Fix bug
docs: Update documentation
style: Format code
refactor: Refactor code
test: Add tests
chore: Update build tasks
\`\`\`

### Pull Request Process
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to your fork
5. Open a Pull Request
6. Wait for review and address feedback

### Bug Reports
- Use the issue tracker
- Include reproduction steps
- Include system information
- Include relevant logs

### Feature Requests
- Use the issue tracker
- Describe the feature in detail
- Explain the use case
- Provide examples if possible`;
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