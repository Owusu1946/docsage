import fg from 'fast-glob';
import fs from 'fs/promises';
import path from 'path';
import { logger } from './utils/logger.js';

const IGNORE_PATTERNS = [
  '**/node_modules/**',
  '**/dist/**',
  '**/build/**',
  '**/.git/**',
  '**/coverage/**',
  '**/*.test.*',
  '**/*.spec.*',
  '**/*.min.*',
  '**/*.map'
];

const PRIORITY_FILES = [
  'package.json',
  'tsconfig.json',
  'README.md',
  '.env.example',
  'src/index.*',
  'src/main.*',
  'src/app.*'
];

export async function scanFiles(baseDir) {
  try {
    // First, get priority files
    const priorityPaths = await fg(PRIORITY_FILES, {
      cwd: baseDir,
      ignore: IGNORE_PATTERNS,
      dot: true,
      absolute: true
    });

    // Then get other relevant code files
    const codePaths = await fg(['**/*.{js,ts,jsx,tsx,json,md}'], {
      cwd: baseDir,
      ignore: [...IGNORE_PATTERNS, ...priorityPaths],
      dot: true,
      limit: 20 // Limit to avoid token limits with Gemini
    });

    const allPaths = [...priorityPaths, ...codePaths];
    const files = await Promise.all(
      allPaths.map(async (filePath) => {
        try {
          const fullPath = path.resolve(baseDir, filePath);
          const content = await fs.readFile(fullPath, 'utf-8');
          const relativePath = path.relative(baseDir, fullPath);
          return {
            path: relativePath,
            content: truncateContent(content),
            type: path.extname(filePath).slice(1) || 'txt'
          };
        } catch (error) {
          logger.warn(`Failed to read file ${filePath}: ${error.message}`);
          return null;
        }
      })
    );

    return files.filter(Boolean);
  } catch (error) {
    throw new Error(`Failed to scan codebase: ${error.message}`);
  }
}

function truncateContent(content, maxLength = 5000) {
  if (!content) return '';
  content = content.trim();
  if (content.length <= maxLength) return content;
  return content.slice(0, maxLength) + '\n... (content truncated)';
} 