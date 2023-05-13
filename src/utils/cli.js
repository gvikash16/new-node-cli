import chalk from 'chalk';
import meow from 'meow';
import config from '../../config/index.js';

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
    ${yellow(`-n`)}, ${yellow(`--project-name`)}  Provide project project-name to the plugin

	Examples
	  ${green(`auth-e2e`)} ${cyan(`setup`)} ${yellow(`--project-name=`)}${yellow(`"project-name"`)}
	  ${green(`auth-e2e`)} ${cyan(`addPlugin`)} ${yellow(`--project-name=`)}${yellow(`"plugin-name"`)}
	  ${green(`auth-e2e`)} ${cyan(`removePlugin`)} ${yellow(`--project-name=`)}${yellow(`"plugin-name"`)}
`;

const meowFlags = {
  importMeta: import.meta,
  default: { projectName: 'en' },
  flags: {
    branch: {
      type: 'boolean',
      shortFlag: 'b',
      default: false
    },
    projectName: {
      type: 'string',
      shortFlag: 'p',
      default: config.defaultProjectName,
    },
    addPath: {
      type: 'string',
      shortFlag: 'a',
      required: true
    }
  
  }
}

export default meow(meowHelp, meowFlags);