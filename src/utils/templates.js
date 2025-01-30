import { makeBadge } from 'badge-maker';
import { CONFIG } from '../utils/config.js';

export async function generateBadges(projectInfo = {}) {
  const badges = [
    makeBadge({
      label: 'version',
      message: (projectInfo.version || '1.0.0').toString(),
      color: 'blue'
    }),
    makeBadge({
      label: 'license',
      message: (projectInfo.license || 'MIT').toString(),
      color: 'green'
    }),
    makeBadge({
      label: 'node',
      message: process.version.slice(1),
      color: 'brightgreen'
    })
  ];

  return badges.join(' ');
}

export const DEFAULT_README_TEMPLATE = `# Project Name

## Description

## Installation

## Usage

## Features

## License

## Contributing
`;

export const TEMPLATES = {
  minimal: {
    sections: ['title', 'description', 'installation', 'usage', 'license'],
    badges: ['version', 'license'],
    emoji: false,
    style: 'compact'
  },
  standard: {
    sections: ['title', 'badges', 'description', 'features', 'installation', 'usage', 'api', 'contributing', 'license'],
    badges: ['version', 'license', 'npm', 'node', 'prs'],
    emoji: true,
    style: 'detailed'
  },
  enterprise: {
    sections: ['title', 'badges', 'description', 'features', 'installation', 'usage', 'api', 'architecture', 'security', 'contributing', 'license', 'support'],
    badges: ['version', 'license', 'npm', 'build', 'coverage', 'docs'],
    emoji: true,
    style: 'comprehensive'
  }
};

export function getTemplate(type = 'standard') {
  return TEMPLATES[type] || TEMPLATES.standard;
}

export function validateTemplate(template) {
  return Object.keys(TEMPLATES).includes(template);
} 