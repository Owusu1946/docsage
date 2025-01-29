export const CONFIG = {
  API_KEY: 'AIzaSyCHLQZMZAGidlbTnTIZKQfoTTNna8wHSIA',
  MODEL_NAME: 'gemini-pro',
  MAX_RETRIES: 3,
  MAX_FILES: 100,
  CONTENT_TRUNCATE_LENGTH: 10000,
  IGNORE_PATTERNS: [
    '**/node_modules/**',
    '**/dist/**',
    '**/build/**',
    '**/.git/**',
    '**/coverage/**',
    '**/test/**',
    '**/*.test.*',
    '**/*.spec.*',
    '**/*.min.*',
    '**/*.map'
  ],
  options: {
    template: 'detailed',  // default template
    emoji: true,          // use emoji by default
    badges: true,         // include badges by default
    style: 'flat',        // default badge style
    github: {
      prTemplate: `## Description
This PR updates the project documentation.

## Changes
- Generated/Updated README.md
- Generated/Updated CONTRIBUTING.md
- Generated/Updated CODE_OF_CONDUCT.md

## Checklist
- [ ] Documentation is clear and comprehensive
- [ ] All links are valid
- [ ] Code examples are correct
- [ ] Installation steps are accurate
`
    }
  }
}; 