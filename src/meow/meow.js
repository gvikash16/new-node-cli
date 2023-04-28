import chalk from 'chalk';
import meow from 'meow';

const { yellow } = chalk;

const meowHelp = `
  ${yellow(`--preload`)}     To preload the already defined set up
  ${yellow(`--no-preload`)}  It will ask you to setup manually
`;

const meowFlags = {
  importMeta: import.meta,
  flags: {
    preload: {
      type: 'boolean',
      alias: 'p',
      default: false
    },
    branch: {
      type: 'boolean',
      alias: 'b',
      default: false
    }
  }
}

export default meow(meowHelp, meowFlags);



// const flags = process.argv.slice(2)[0];
// const input = process.argv.slice(2)[1];
// if(flags || input) {
//   console.log('flags', flags);
//   console.log('input', input);
// } else{
//   alert({type: 'error', msg: 'You have not entered any flag or input'});
// }