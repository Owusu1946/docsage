import { CONFIG } from '../utils/config.js';

const templates = {
  minimal: {
    sections: ['Description', 'Installation', 'Usage', 'License'],
    badges: ['version', 'license'],
    emoji: false
  },
  detailed: {
    sections: ['Description', 'Features', 'Installation', 'Usage', 'API', 'Contributing', 'License'],
    badges: ['version', 'license', 'npm', 'build', 'coverage'],
    emoji: true
  },
  api: {
    sections: ['API Reference', 'Endpoints', 'Models', 'Authentication', 'Examples'],
    badges: ['version', 'api', 'docs'],
    emoji: true
  }
};

export function getTemplate(type) {
  return templates[type] || templates.detailed;
}

export function generatePrompt(template, projectInfo) {
  const sections = templates[template].sections;
  return `Generate documentation focusing on these sections: ${sections.join(', ')}...`;
}