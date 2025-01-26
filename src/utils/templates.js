import { makeBadge } from 'badge-maker';

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