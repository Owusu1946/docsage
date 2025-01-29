import chalk from 'chalk';
import ora from 'ora';
import gradient from 'gradient-string';
import boxen from 'boxen';
import figlet from 'figlet';
import { createSpinner } from 'nanospinner';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const ui = {
  async showWelcome() {
    console.clear();
    const title = await new Promise((resolve) => {
      figlet('DOCSAGE', {
        font: 'Big',
        horizontalLayout: 'full',
        verticalLayout: 'default',
      }, (err, data) => {
        resolve(data);
      });
    });

    const gradientColors = gradient(['#2563eb', '#3b82f6', '#60a5fa']);
    console.log(gradientColors.multiline(title));
    
    console.log(boxen(
      chalk.blue.bold('📚 Professional Documentation Generator\n') +
      chalk.gray('Powered by Google Gemini AI'),

      chalk.blue('🚀 AI-Powered Documentation Generator\n') +
      chalk.dim('Made with ❤️ by @Okenneth1964 and @OseiAnsah'),

      {
        padding: { top: 1, bottom: 1, left: 2, right: 2 },
        margin: { top: 1, bottom: 1 },
        borderStyle: 'round',
        borderColor: '#3b82f6',
        float: 'center',
        backgroundColor: '#f8fafc',
        title: '✨ Welcome',
        titleAlignment: 'center',
      }
    ));
    await sleep(1000);
  },

  createSpinner(text) {
    const spinner = createSpinner(chalk.blue(text)).start();
    return {
      update(text) {
        spinner.update({ text: chalk.blue('⏳ ' + text) });
      },
      succeed(text) {
        spinner.success({ text: chalk.green('✓ ' + text) });
      },
      fail(text) {
        spinner.error({ text: chalk.red('✗ ' + text) });
      },
      warn(text) {
        spinner.warn({ text: chalk.yellow('⚠ ' + text) });
      }
    };
  },

  showStats(stats) {
    console.log(boxen(
      chalk.bold('📊 Analysis Summary\n\n') +
      Object.entries(stats).map(([key, value]) => 
        `${chalk.blue('◆')} ${chalk.bold(key)}: ${chalk.white(value)}`
      ).join('\n'),
      {
        padding: { top: 1, bottom: 1, left: 2, right: 2 },
        margin: { top: 1, bottom: 1 },
        borderStyle: 'round',
        borderColor: '#3b82f6',
        backgroundColor: '#f8fafc',
        title: '📈 Stats',
        titleAlignment: 'center',
      }
    ));
  },

  showSuccess(message) {
    console.log(boxen(
      chalk.green.bold('✨ Success!\n\n') + 
      chalk.white(message),
      {
        padding: { top: 1, bottom: 1, left: 2, right: 2 },
        margin: 1,
        borderStyle: 'round',
        borderColor: '#22c55e',
        backgroundColor: '#f0fdf4',
        title: '🎉 Complete',
        titleAlignment: 'center',
      }
    ));
  },

  showError(error) {
    console.log(boxen(
      chalk.red.bold('❌ Error Occurred\n\n') + 
      chalk.white(error.message),
      {
        padding: { top: 1, bottom: 1, left: 2, right: 2 },
        margin: 1,
        borderStyle: 'round',
        borderColor: '#ef4444',
        backgroundColor: '#fef2f2',
        title: '⚠️ Error',
        titleAlignment: 'center',
      }
    ));
  }
}; 