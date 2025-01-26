import fs from 'fs/promises';
import path from 'path';
import { logger } from './utils/logger.js';
import { generateBadges } from './utils/templates.js';

export async function generateReadme(analysis, options) {
  const readmePath = 'README.md';
  
  try {
    // Check if README exists
    const exists = await fileExists(readmePath);
    
    if (exists && !options.force && !options.merge) {
      throw new Error('README.md already exists. Use --force to overwrite or --merge to merge.');
    }

    let content = await formatReadmeContent(analysis);

    if (options.merge && exists) {
      const existingContent = await fs.readFile(readmePath, 'utf-8');
      content = await mergeReadme(existingContent, content);
    }

    await fs.writeFile(readmePath, content, 'utf-8');
    
  } catch (error) {
    throw new Error(`Failed to generate README: ${error.message}`);
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

async function formatReadmeContent(analysis) {
  // Add null check for analysis.projectInfo
  const projectInfo = analysis.projectInfo || {};
  const badges = await generateBadges(projectInfo);
  
  // Add badges below the title
  const lines = analysis.analysis.split('\n');
  const titleIndex = lines.findIndex(line => line.startsWith('# '));
  
  if (titleIndex !== -1) {
    lines.splice(titleIndex + 1, 0, '', badges, '');
  }

  return lines.join('\n');
}

async function mergeReadme(existing, generated) {
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