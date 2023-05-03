import chalk from 'chalk';
import sym from 'log-symbols';
const log = console.log;
const alertTypes = [
  'error',
  'success',
  'warning',
  'info'
]
const defaultOptions = {
  type: 'error',
  msg: 'You have missed some options'
}
const alert = (options) => {
  const {type, msg} = { ...defaultOptions, ...options };
  if (type === 'error') {
    log(`${sym.error} ${chalk.red.bold.underline(`${type.toUpperCase()}`)} ${msg}\n`);
  }
  if (type === 'success') {
    log(`${sym.success} ${chalk.green.italic.underline(`${type.toUpperCase()}`)} ${msg}\n`);
  }
  if (type === 'warning') {
    log(`${sym.warning} ${chalk.yellow.italic.underline(`${type.toUpperCase()}`)} ${msg}\n`);
  }
  if (type === 'info') {
    log(`${sym.info} ${chalk.bgBlue.italic.underline(`${type.toUpperCase()}`)} ${msg}\n`);
  }
}
export default alert;