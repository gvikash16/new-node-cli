import chalk from 'chalk';
import sym from 'log-symbols';
const log = console.log;
const defaultOptions = {
  type: 'error',
  msg: 'You have missed some options'
}
const alert = (options) => {
  const opt = {...defaultOptions, ...options};
  if(opt.type==='error'){
    log(`${sym.error} ${chalk.red.bold.underline(`ERROR`)} ${opt.msg}\n`);
  }
  if(opt.type==='success'){
    log(`${sym.success} ${chalk.green.italic.underline(`SUCCESS`)} ${opt.msg}\n`);
  }
  if(opt.type==='warning'){
    log(`${sym.warning} ${chalk.yellow.italic.underline(`WARNING`)} ${opt.msg}\n`);
  }
  if(opt.type==='info'){
    log(`${sym.info} ${chalk.bgBlue.italic.underline(`INFO`)} ${opt.msg}\n`);
  }
}
export default alert;