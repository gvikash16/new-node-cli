import chalk from 'chalk';
import meow from 'meow';

const { green, yellow, cyan } = chalk;

const meowHelp = `
  Usage
	  ${green(`auth-e2e`)} ${cyan(`<command>`)} ${yellow(`[--option]`)}

	Commands
	  ${cyan(`setup`)}            Create a config file in root folder
	  ${cyan(`addPlugin`)}        Add entry to the mounted plugin
	  ${cyan(`removePlugin`)}     Remove entry from the mounted plugin

	Options
    ${yellow(`-p`)}, ${yellow(`--preload`)}      To preload the already defined set up
    ${yellow(`-np`)}, ${yellow(`--no-preload`)}  It will ask you to setup manually
    ${yellow(`-n`)}, ${yellow(`--name`)}         Provide project name to the plugin

	Examples
	  ${green(`auth-e2e`)} ${cyan(`setup`)} ${yellow(`--name=`)}${yellow(`"project-name"`)}
	  ${green(`auth-e2e`)} ${cyan(`addPlugin`)} ${yellow(`--name=`)}${yellow(`"plugin-name"`)}
	  ${green(`auth-e2e`)} ${cyan(`removePlugin`)} ${yellow(`--name=`)}${yellow(`"plugin-name"`)}
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
    },
    name: {
      type: 'string',
      alias: 'n',
      isRequired: true
    }
  
  }
}

export default meow(meowHelp, meowFlags);