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
      figlet('docsage', {
        font: 'Big',
        horizontalLayout: 'default',
        verticalLayout: 'default',
      }, (err, data) => {
        resolve(data);
      });
    });

    console.log(gradient.pastel.multiline(title));
    console.log(boxen(
      chalk.blue('🚀 AI-Powered Documentation Generator\n') +
      chalk.dim('Made with ❤️ by @Okenneth1964 and @OseiAnsah'),
      {
        padding: 1,
        margin: 1,
        borderStyle: 'round',
        borderColor: 'blue',
      }
    ));
    await sleep(1000);
  },

  createSpinner(text) {
    const spinner = createSpinner(text).start();
    return {
      update(text) {
        spinner.update({ text });
      },
      succeed(text) {
        spinner.success({ text });
      },
      fail(text) {
        spinner.error({ text });
      },
      warn(text) {
        spinner.warn({ text });
      }
    };
  },

  showStats(stats) {
    console.log(boxen(
      chalk.bold('📊 Analysis Stats\n\n') +
      Object.entries(stats).map(([key, value]) => 
        `${chalk.blue(key)}: ${chalk.white(value)}`
      ).join('\n'),
      {
        padding: 1,
        margin: { top: 1, bottom: 1 },
        borderStyle: 'round',
        borderColor: 'cyan',
      }
    ));
  },

  showSuccess(message) {
    console.log(boxen(
      chalk.green('✨ Success!\n\n') + message,
      {
        padding: 1,
        margin: 1,
        borderStyle: 'round',
        borderColor: 'green',
      }
    ));
  },

  showError(error) {
    console.log(boxen(
      chalk.red('❌ Error\n\n') + error.message,
      {
        padding: 1,
        margin: 1,
        borderStyle: 'round',
        borderColor: 'red',
      }
    ));
  }
}; 