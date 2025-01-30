#!/usr/bin/env node

import { Command } from 'commander';
import inquirer from 'inquirer';
import { analyzeCodebase } from './analyzer.js';
import { generateReadme, generateContributionDocs } from './generator.js';
import { scanFiles } from './scanner.js';
import { ui } from './utils/ui.js';
import { CONFIG } from './utils/config.js';
import { logger } from './utils/logger.js';

const program = new Command();

program
  .name('docsage')
  .description('AI-powered documentation generator using Google Gemini')
  .version('1.2.1')
  .option('-c, --codebase [path]', 'Path to codebase', '.')
  .option('-i, --interactive', 'Run in interactive mode')
  .option('-f, --force', 'Force overwrite existing README')
  .option('-m, --merge', 'Merge with existing README')
  .option('-t, --template <type>', 'Documentation template (minimal, standard, enterprise)', 'standard')
  .option('-s, --style <style>', 'Badge style (flat, plastic, social)', 'flat')
  .option('--screenshots', 'Generate usage screenshots')
  .option('--api-docs', 'Generate API documentation')
  .option('--dep-graph', 'Include dependency graph')
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
  
      // Get API key from env or prompt
      let apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        const apiKeyResponse = await inquirer.prompt([
          {
            type: 'input',
            name: 'apiKey',
            message: '🔑 Please enter your Gemini API key:',
            validate: (input) => {
              if (!input) return 'API key is required';
              if (input.length < 10) return 'API key seems too short';
              return true;
            },
            transformer: (input) => {
              return input ? '*'.repeat(input.length) : '';
            }
          }
        ]);
        apiKey = apiKeyResponse.apiKey;
      }
  
      let githubToken = process.env.GITHUB_TOKEN;
      if (!githubToken) {
        const tokenResponse = await inquirer.prompt([
          {
            type: 'input',
            name: 'token',
            message: '🔑 Enter your GitHub token (optional, for PR creation):',
            transformer: (input) => input ? '*'.repeat(input.length) : ''
          },
          {
            type: 'confirm',
            name: 'createPR',
            message: '🔄 Create a pull request with the changes?',
            default: false,
            when: (answers) => !!answers.token
          }
        ]);
        
        if (tokenResponse.token) {
          githubToken = tokenResponse.token;
          CONFIG.options.github = {
            createPR: tokenResponse.createPR,
            token: githubToken
          };
        }
      }
  
      let codebasePath = options.codebase;
      let force = options.force;
      let merge = options.merge;
  
      if (options.interactive) {
        const answers = await inquirer.prompt([
          {
            type: 'list',
            name: 'template',
            message: '📋 Select a documentation template:',
            choices: [
              { name: 'Minimal - Basic project information', value: 'minimal' },
              { name: 'Standard - Comprehensive documentation (recommended)', value: 'standard' },
              { name: 'Enterprise - Full technical documentation', value: 'enterprise' }
            ],
            default: 'standard'
          },
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
        options.template = answers.template;
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

      ui.showStats({
        'Files Scanned': files.length,
        'Priority Files': files.filter(f => f.path.includes('package.json')).length,
        'Code Files': files.filter(f => /\.(js|ts|jsx|tsx)$/.test(f.path)).length,
      });

      spinner.update('🤖 Analyzing code...');
      const analysis = await analyzeCodebase(files, apiKey);

      spinner.update('📝 Generating README...');
      await generateReadme(analysis, {
        force: options.force || force,
        merge: options.merge || merge,
        addContributing: true // Always generate contribution docs
      });

      spinner.succeed('Documentation generated successfully!');

      // Ask about contribution docs
      const { generateContrib } = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'generateContrib',
          message: '📝 Would you like to generate detailed contribution guidelines?',
          default: true
        }
      ]);

      if (generateContrib) {
        const contribSpinner = ui.createSpinner('Generating contribution guidelines...');
        try {
          await generateContributionDocs(analysis.projectInfo);
          contribSpinner.succeed('Contribution guidelines generated!');
        } catch (error) {
          contribSpinner.fail('Failed to generate contribution guidelines');
          throw error;
        }
      }
      
      ui.showSuccess(
        '🎉 Documentation has been generated!\n\n' +
        `📊 Stats:\n` +
        `   • Files analyzed: ${files.length}\n` +
        `   • Sections generated: ${analysis.analysis.split('\n').filter(l => l.startsWith('#')).length}\n` +
        `   • Generated at: ${new Date().toLocaleString()}\n` +
        (generateContrib ? '   • Contribution guidelines added ✨\n' : '')
      );
    } catch (error) {
      ui.showError(error);
      logger.error('Failed to generate documentation:', error);
      process.exit(1);
    }
  });
program.parse(); 