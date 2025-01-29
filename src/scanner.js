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
  '**/test/**',
  '**/*.test.*',
  '**/*.spec.*',
  '**/*.min.*',
  '**/*.map'
];

const PRIORITY_FILES = [
  'package.json',
  'tsconfig.json',
  'README.md',
  'LICENSE*',
  '.env.example',
  'docker-compose*.yml',
  'Dockerfile*',
  'src/index.*',
  'src/main.*',
  'src/app.*',
  'src/config.*',
  'docs/**/*',
  'api/**/*'
];

const CODE_FILE_PATTERNS = [
  // JavaScript/TypeScript
  '**/*.{js,jsx,ts,tsx}',
  // Documentation
  '**/*.{md,mdx}',
  // Configuration
  '**/*.{json,yaml,yml,toml}',
  // Web
  '**/*.{html,css,scss,sass}',
  // Shell scripts
  '**/*.{sh,bash}',
  // Python (if project includes Python files)
  '**/*.py',
  // Ruby
  '**/*.rb',
  // Go
  '**/*.go',
  // Rust
  '**/*.rs',
  // Java/Kotlin
  '**/*.{java,kt}',
  // C/C++
  '**/*.{c,cpp,h,hpp}'
];

export async function scanFiles(baseDir) {
  try {
    // Get priority files first
    const priorityPaths = await fg(PRIORITY_FILES, {
      cwd: baseDir,
      ignore: IGNORE_PATTERNS,
      dot: true,
      absolute: true,
      followSymbolicLinks: false
    });

    // Then get other relevant code files
    const codePaths = await fg(CODE_FILE_PATTERNS, {
      cwd: baseDir,
      ignore: [...IGNORE_PATTERNS, ...priorityPaths],
      dot: true,
      absolute: true,
      followSymbolicLinks: false,
      limit: 100 // Increased from 20 to 100 files
    });

    const allPaths = [...priorityPaths, ...codePaths];
    
    // Group files by type for better analysis
    const filesByType = new Map();
    
    const files = await Promise.all(
      allPaths.map(async (filePath) => {
        try {
          const fullPath = path.resolve(baseDir, filePath);
          const content = await fs.readFile(fullPath, 'utf-8');
          const relativePath = path.relative(baseDir, fullPath);
          const type = path.extname(filePath).slice(1) || 'txt';
          
          // Group files by type
          if (!filesByType.has(type)) {
            filesByType.set(type, 0);
          }
          filesByType.set(type, filesByType.get(type) + 1);
          
          return {
            path: relativePath,
            content: truncateContent(content),
            type,
            size: content.length,
            lastModified: (await fs.stat(fullPath)).mtime
          };
        } catch (error) {
          logger.warn(`Failed to read file ${filePath}: ${error.message}`);
          return null;
        }
      })
    );

    const validFiles = files.filter(Boolean);

    // Log scanning statistics
    logger.info(`📊 Scanning Statistics:`);
    logger.info(`Total files scanned: ${validFiles.length}`);
    filesByType.forEach((count, type) => {
      logger.info(`${type}: ${count} files`);
    });

    return validFiles;
  } catch (error) {
    throw new Error(`Failed to scan codebase: ${error.message}`);
  }
}

function truncateContent(content, maxLength = 10000) { // Increased from 5000 to 10000
  if (!content) return '';
  content = content.trim();
  if (content.length <= maxLength) return content;
  return content.slice(0, maxLength) + '\n... (content truncated)';
} 