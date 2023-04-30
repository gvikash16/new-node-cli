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
  const opt = { ...defaultOptions, ...options };
  if (opt.type === 'error') {
    log(`${sym.error} ${chalk.red.bold.underline(`${opt.type.toUpperCase()}`)} ${opt.msg}\n`);
  }
  if (opt.type === 'success') {
    log(`${sym.success} ${chalk.green.italic.underline(`${opt.type.toUpperCase()}`)} ${opt.msg}\n`);
  }
  if (opt.type === 'warning') {
    log(`${sym.warning} ${chalk.yellow.italic.underline(`${opt.type.toUpperCase()}`)} ${opt.msg}\n`);
  }
  if (opt.type === 'info') {
    log(`${sym.info} ${chalk.bgBlue.italic.underline(`${opt.type.toUpperCase()}`)} ${opt.msg}\n`);
  }
}
export default alert;