export const CONFIG = {
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
      createPR: false,
      token: process.env.GITHUB_TOKEN // Read from environment variable
    }
  }
}; 