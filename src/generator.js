import fs from 'fs/promises';
import path from 'path';
import { logger } from './utils/logger.js';
import { generateBadges, getTemplate } from './utils/templates.js';
import { CONFIG } from './utils/config.js';
import { GitHubService } from './services/GitHubService.js';

export async function generateReadme(analysis, options) {
  const readmePath = 'README.md';
  let content;
  let files = [];

  try {
    const template = getTemplate(options.template);
    const exists = await fileExists(readmePath);
    
    if (exists && !options.force && !options.merge) {
      throw new Error('README.md already exists. Use --force to overwrite or --merge to merge.');
    }

    content = await formatReadmeContent(analysis, template);

    if (options.merge && exists) {
      const existingContent = await fs.readFile(readmePath, 'utf-8');
      content = await mergeReadme(existingContent, content, template);
    }

    files.push({ path: readmePath, content });

    if (options.addContributing) {
      const contribFiles = await generateContributionDocs(analysis.projectInfo);
      files = files.concat(contribFiles);
    }

    // Always write files locally first
    for (const file of files) {
      await fs.writeFile(file.path, file.content, 'utf-8');
    }

    // Then create PR if GitHub option is enabled
    if (CONFIG.options.github?.createPR) {
      const github = new GitHubService();
      await github.createPullRequest(files);
    }

  } catch (error) {
    throw new Error(`Failed to generate documentation: ${error.message}`);
  }
}

async function fileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function formatReadmeContent(analysis, template) {
  const projectInfo = analysis.projectInfo || {};
  const badges = template.badges ? await generateBadges(projectInfo, template.badges) : '';
  
  let content = analysis.analysis;
  
  // Filter sections based on template
  content = filterSections(content, template.sections);
  
  // Add emojis if enabled
  if (template.emoji) {
    content = addEmojis(content);
  }
  
  return content;
}

async function mergeReadme(existing, generated, template) {
  const sections = {
    existing: parseSections(existing),
    generated: parseSections(generated)
  };

  // Preserve user-modified sections, add new sections
  return Object.entries(sections.generated)
    .map(([header, content]) => {
      if (sections.existing[header]) {
        logger.info(`Preserving existing section: ${header}`);
        return sections.existing[header];
      }
      return content;
    })
    .join('\n\n');
}

function parseSections(content) {
  const sections = {};
  let currentHeader = 'top';
  let currentContent = [];

  content.split('\n').forEach(line => {
    if (line.startsWith('#')) {
      if (currentContent.length) {
        sections[currentHeader] = currentContent.join('\n');
      }
      currentHeader = line;
      currentContent = [line];
    } else {
      currentContent.push(line);
    }
  });

  if (currentContent.length) {
    sections[currentHeader] = currentContent.join('\n');
  }

  return sections;
}

// Add new function to generate contribution docs
export async function generateContributionDocs(projectInfo = {}) {
  const contributingContent = `# Contributing to ${projectInfo.name || 'this project'}

## Development Setup
\`\`\`bash
# Clone the repository
git clone [repository-url]
cd ${projectInfo.name || 'project'}

# Install dependencies
npm install

# Run tests
npm test

# Start development server
npm run dev
\`\`\`

## Code Style Guidelines
- Use ESLint and Prettier for code formatting
- Follow JavaScript Standard Style
- Use meaningful variable and function names
- Add JSDoc comments for functions
- Keep functions small and focused

## Commit Message Convention
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

## Pull Request Process
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to your fork
5. Open a Pull Request
6. Wait for review and address feedback`;

  return [
    {
      path: 'CONTRIBUTING.md',
      content: contributingContent
    }
  ];
}

function generateCodeOfConductContent() {
  // Implementation of generateCodeOfConductContent
} 