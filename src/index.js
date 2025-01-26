#!/usr/bin/env node

import { Command } from 'commander';
import inquirer from 'inquirer';
import { analyzeCodebase } from './analyzer.js';
import { generateReadme } from './generator.js';
import { scanFiles } from './scanner.js';
import { ui } from './utils/ui.js';

const program = new Command();

program
  .name('docsage')
  .description('AI-powered documentation generator using Google Gemini')
  .version('1.2.1')
  .option('-c, --codebase [path]', 'Path to codebase', '.')
  .option('-f, --force', 'Force overwrite existing README.md')
  .option('-m, --merge', 'Merge with existing README.md')
  .option('-i, --interactive', 'Interactive mode')
  .addHelpText('after', `
Examples:
  $ docsage                    # Generate README for current directory
  $ docsage --codebase ./path  # Generate README for specific path
  $ docsage -i                # Interactive mode
  $ docsage --force           # Overwrite existing README
  $ docsage --merge           # Merge with existing README
  `)
  .action(async (options) => {
    try {
      await ui.showWelcome();
  
      // Always prompt for API key first
      const apiKeyResponse = await inquirer.prompt([
        {
          type: 'password',
          name: 'apiKey',
          message: '🔑 Please enter your Gemini API key:',
          validate: (input) => {
            if (!input) return 'API key is required';
            return true;
          }
        }
      ]);
  
      let codebasePath = options.codebase;
      let force = options.force;
      let merge = options.merge;
  
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
        codebasePath = answers.codebase;
        force = answers.force;
        merge = answers.merge;
      }
  
      const spinner = ui.createSpinner('🔍 Scanning codebase...');
      const files = await scanFiles(codebasePath);
      
      if (files.length === 0) {
        spinner.fail('No relevant files found in codebase');
        process.exit(1);
      }
      spinner.succeed('Codebase scanned successfully');
  
      spinner.start('🤖 Analyzing codebase...');
      const analysis = await analyzeCodebase(files, apiKeyResponse.apiKey);
      spinner.succeed('Analysis complete');
  
      spinner.start('📝 Generating README...');
      await generateReadme(analysis, { force, merge });
      spinner.succeed('✨ README generated successfully!');
  
    } catch (error) {
      logger.error('Failed to generate documentation', error.message);
      process.exit(1);
    }
  });
program.parse(); 