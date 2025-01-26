#!/usr/bin/env node

import { Command } from 'commander';
import dotenv from 'dotenv';
import inquirer from 'inquirer';
import { analyzeCodebase } from './analyzer.js';
import { generateReadme } from './generator.js';
import { scanFiles } from './scanner.js';
import { ui } from './utils/ui.js';

dotenv.config();

const program = new Command();

program
  .name('gen-readme')
  .description('AI-powered README generator')
  .version('1.0.0')
  .option('-c, --codebase [path]', 'Path to codebase', '.')
  .option('-f, --force', 'Force overwrite existing README.md')
  .option('-m, --merge', 'Merge with existing README.md')
  .option('-i, --interactive', 'Interactive mode')
  .addHelpText('after', `
Examples:
  $ gen-readme                    # Generate README for current directory
  $ gen-readme --codebase ./path  # Generate README for specific path
  $ gen-readme -i                # Interactive mode
  $ gen-readme --force           # Overwrite existing README
  $ gen-readme --merge           # Merge with existing README
  `)
  .action(async (options) => {
    try {
      await ui.showWelcome();

      if (!process.env.GEMINI_API_KEY) {
        ui.showError(new Error('Missing GEMINI_API_KEY. Please set it in your .env file'));
        process.exit(1);
      }

      if (options.interactive) {
        const answers = await inquirer.prompt([
          {
            type: 'input',
            name: 'codebase',
            message: '📁 Enter the path to your codebase:',
            default: '.',
          },
          {
            type: 'confirm',
            name: 'force',
            message: '⚠️  Overwrite existing README if it exists?',
            default: false,
          },
          {
            type: 'confirm',
            name: 'merge',
            message: '🔄 Merge with existing README if it exists?',
            default: true,
            when: (answers) => !answers.force,
          },
        ]);
        Object.assign(options, answers);
      }

      const spinner = ui.createSpinner('🔍 Scanning codebase...');
      const files = await scanFiles(options.codebase);
      
      if (files.length === 0) {
        spinner.fail('No relevant files found in codebase');
        process.exit(1);
      }

      ui.showStats({
        'Files Scanned': files.length,
        'Priority Files': files.filter(f => f.path.includes('package.json')).length,
        'Code Files': files.filter(f => /\.(js|ts|jsx|tsx)$/.test(f.path)).length,
      });

      spinner.update('🤖 Analyzing code...');
      const analysis = await analyzeCodebase(files);

      spinner.update('📝 Generating README...');
      await generateReadme(analysis, {
        force: options.force,
        merge: options.merge
      });

      spinner.succeed('README.md generated successfully!');
      
      ui.showSuccess(
        '🎉 README.md has been generated!\n\n' +
        `📊 Stats:\n` +
        `   • Files analyzed: ${files.length}\n` +
        `   • Sections generated: ${analysis.analysis.split('\n').filter(l => l.startsWith('#')).length}\n` +
        `   • Generated at: ${new Date().toLocaleString()}`
      );
    } catch (error) {
      ui.showError(error);
      process.exit(1);
    }
  });

program.parse(); 