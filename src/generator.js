import fs from 'fs/promises';
import path from 'path';
import { logger } from './utils/logger.js';
import { generateBadges } from './utils/templates.js';
import { CONFIG } from './utils/config.js';

export async function generateReadme(analysis, options) {
  const readmePath = 'README.md';
  let content;

  try {
    const exists = await fileExists(readmePath);
    
    if (exists && !options.force && !options.merge) {
      throw new Error('README.md already exists. Use --force to overwrite or --merge to merge.');
    }

    content = await formatReadmeContent(analysis);

    if (options.merge && exists) {
      const existingContent = await fs.readFile(readmePath, 'utf-8');
      content = await mergeReadme(existingContent, content);
    }

    await fs.writeFile(readmePath, content, 'utf-8');

    if (options.addContributing) {
      await generateContributionDocs(analysis.projectInfo);
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

// Add new function to generate contribution docs
export async function generateContributionDocs(projectInfo = {}) {
  const contributingPath = 'CONTRIBUTING.md';
  const codeOfConductPath = 'CODE_OF_CONDUCT.md';
  
  const contributingContent = `# Contributing to ${projectInfo.name || 'the project'}

## 🌟 Welcome!

Thank you for considering contributing to ${projectInfo.name || 'our project'}! This document provides guidelines and steps for contributing.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Process](#development-process)
- [Pull Request Guidelines](#pull-request-guidelines)
- [Community](#community)

## 📜 Code of Conduct

This project follows our [Code of Conduct](./CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## 🚀 Getting Started

1. Fork the repository
2. Clone your fork:
   \`\`\`bash
   git clone https://github.com/your-username/${projectInfo.name}.git
   cd ${projectInfo.name}
   \`\`\`
3. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`
4. Create a branch:
   \`\`\`bash
   git checkout -b feature/amazing-feature
   \`\`\`

## 💻 Development Process

1. Write your code following our style guidelines
2. Add or update tests as needed
3. Update documentation
4. Run tests locally:
   \`\`\`bash
   npm test
   \`\`\`
5. Commit your changes:
   \`\`\`bash
   git commit -m "feat: Add amazing feature"
   \`\`\`

## 🔍 Pull Request Guidelines

1. Update the README.md with details of changes if needed
2. Update the CHANGELOG.md following semantic versioning
3. The PR should work for all supported Node.js versions
4. Include screenshots for UI changes
5. Include tests for new functionality

## 👥 Community

- Join our [Discord server](https://discord.gg/your-server)
- Follow us on [Twitter](https://twitter.com/your-handle)
- Read our [blog](https://your-blog.com)

## 🎯 Where to Contribute

- Check our [issue tracker](https://github.com/owner/${projectInfo.name}/issues)
- Look for \`good first issue\` labels
- Improve documentation
- Add tests
- Fix bugs
- Implement requested features

## 🏆 Recognition

Contributors will be:
- Listed in our README
- Mentioned in release notes
- Given credit in documentation

Thank you for contributing! 🙏
`;

  const codeOfConductContent = `# Code of Conduct

## Our Pledge

We as members, contributors, and leaders pledge to make participation in our
community a harassment-free experience for everyone.

## Our Standards

Examples of behavior that contributes to a positive environment:

* Using welcoming and inclusive language
* Being respectful of differing viewpoints and experiences
* Gracefully accepting constructive criticism
* Focusing on what is best for the community
* Showing empathy towards other community members

## Enforcement Responsibilities

Project maintainers are responsible for clarifying and enforcing our standards of
acceptable behavior and will take appropriate and fair corrective action in
response to any behavior that they deem inappropriate.

## Scope

This Code of Conduct applies within all community spaces, and also applies when
an individual is officially representing the community in public spaces.

## Enforcement

Instances of abusive, harassing, or otherwise unacceptable behavior may be
reported to the community leaders responsible for enforcement at
[INSERT CONTACT METHOD].

## Attribution

This Code of Conduct is adapted from the [Contributor Covenant][homepage],
version 2.0, available at
https://www.contributor-covenant.org/version/2/0/code_of_conduct.html.
`;

  try {
    await fs.writeFile(contributingPath, contributingContent, 'utf-8');
    await fs.writeFile(codeOfConductPath, codeOfConductContent, 'utf-8');
    logger.success('Generated contribution documentation');
    return true;
  } catch (error) {
    throw new Error(`Failed to generate contribution documentation: ${error.message}`);
  }
} 