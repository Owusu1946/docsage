import chalk from 'chalk';
import ora from 'ora';

export const logger = {
  spin: (text) => ora(text).start(),
  
  success: (message) => {
    console.log(chalk.green(`✓ ${message}`));
  },
  
  error: (message, details = '') => {
    console.error(chalk.red(`✗ ${message}`));
    if (details) console.error(chalk.red(details));
  },
  
  warn: (message) => {
    console.warn(chalk.yellow(`⚠ ${message}`));
  },
  
  info: (message) => {
    console.info(chalk.blue(`ℹ ${message}`));
  }
}; 