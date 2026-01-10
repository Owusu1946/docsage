import fs from 'fs/promises';
import path from 'path';
import inquirer from 'inquirer';
import { exec } from 'child_process';
import { promisify } from 'util';
import { logger } from './utils/logger.js';
import { generateBadges, getTemplate } from './utils/templates.js';
import { filterSections, addEmojis, openFile } from './utils/helpers.js';
import { generateCompactDiff } from './utils/diff.js';
import { CONFIG } from './utils/config.js';
import { GitHubService } from './services/GitHubService.js';

const execAsync = promisify(exec);

export async function generateReadme(analysis, options) {
  const readmePath = 'README.md';
  let content;
  let files = [];

  try {
    const template = getTemplate(options.template);
    const exists = await fileExists(readmePath);

    // Generate initial content
    content = await formatReadmeContent(analysis, template);

    // If file exists, we handle the smart merge and diff
    if (exists) {
      const existingContent = await fs.readFile(readmePath, 'utf-8');

      // Perform smart merge (preserve manual sections)
      const mergedContent = await mergeReadme(existingContent, content, template);

      // Calculate diff between Existing and Merged
      logger.info('Calculating changes...');
      const diff = generateCompactDiff(existingContent, mergedContent);

      if (diff.trim()) {
        console.log('\nProposed Changes (Compact View):');
        console.log(diff);
        console.log('\n');

        // Ask for confirmation loop
        while (true) {
          const { action } = await inquirer.prompt([
            {
              type: 'list',
              name: 'action',
              message: 'How would you like to proceed?',
              choices: [
                { name: '👀 View Diff in Editor (VS Code)', value: 'view_diff' },
                { name: '✅ Apply changes (Smart Merge)', value: 'apply' },
                { name: '❌ Cancel', value: 'cancel' }
              ],
              default: 'view_diff'
            }
          ]);

          if (action === 'view_diff') {
            const conflictContent = createConflictContent(existingContent, mergedContent);
            const tempFile = '.README.diff.md';

            await fs.writeFile(tempFile, conflictContent, 'utf-8');
            try {
              logger.info('Opening diff with conflict markers...');
              await openFile(tempFile);

              await inquirer.prompt([{
                type: 'input',
                name: 'continue',
                message: 'Press Enter after you have reviewed the diff to continue...'
              }]);
            } catch (e) {
              logger.warn('Failed to open file automatically.');
              logger.info(`You can manually open "${tempFile}" to view changes.`);

              await inquirer.prompt([{
                type: 'input',
                name: 'continue',
                message: 'Press Enter to continue...'
              }]);
            }
            // Loop continues to let user decide after viewing
            // Cleanup temp file after viewing? Maybe keep it until they decide.
            try { await fs.unlink(tempFile); } catch { }
            // Loop continues to let user decide after viewing
          } else if (action === 'cancel') {
            logger.warn('Operation cancelled by user.');
            try { await fs.unlink('.README.new.md'); } catch { }
            return;
          } else {
            // Apply changes
            content = mergedContent;
            try { await fs.unlink('.README.new.md'); } catch { }
            break;
          }
        }
      } else {
        logger.info('No changes detected after merge.');
        return;
      }
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

function createConflictContent(existing, generated) {
  const existingSections = parseSections(existing);
  const generatedSections = parseSections(generated);

  const allHeaders = new Set([
    ...Object.keys(existingSections),
    ...Object.keys(generatedSections)
  ]);

  let conflictOutput = '';

  // Helper to normalize content for comparison (trim whitespace)
  const normalize = (str) => str ? str.trim() : '';

  allHeaders.forEach(header => {
    const oldContent = existingSections[header];
    const newContent = generatedSections[header];

    if (!oldContent && newContent) {
      // New section
      conflictOutput += `<<<<<<< Existing
=======
${newContent}
>>>>>>> Generated
\n`;
    } else if (oldContent && !newContent) {
      // Removed section
      conflictOutput += `<<<<<<< Existing
${oldContent}
=======
>>>>>>> Generated
\n`;
    } else if (normalize(oldContent) !== normalize(newContent)) {
      // Modified section
      conflictOutput += `<<<<<<< Existing
${oldContent}
=======
${newContent}
>>>>>>> Generated
\n`;
    } else {
      // Unchanged
      conflictOutput += oldContent + '\n\n';
    }
  });

  return conflictOutput;
}