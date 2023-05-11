#!/usr/bin/env node
import cli from './src/utils/cli.js';
import {
    setup,
    addPlugin,
    removePlugin,
    removeAllPlugin,
    logs,
    listMountedPlugins
} from './src/index.js';

/**
 * Validate an option
 * @param {string} name - The name of the option
 * @param {string} value - The value of the option
 * @returns {string} The validated value of the option
 */
function validationWrapper(name, value) {
    switch (name) {
        case 'projectName':
            // Trim the project name
            value = value.trim();
            // Check if the project name is valid
            if (!/^[\w-]+$/.test(value)) {
                console.log('Error: Invalid project name');
                process.exit(1);
            }
            return value;
        default:
            return value;
    }
}

/**
 * Validate the options
 * @param {Object} options - The options to validate
 */
function validateOptions(options) {
    for (const [name, value] of Object.entries(options)) {
        options[name] = validationWrapper(name, value);
    }
}

/**
 * Handle a command from the CLI
 * @param {string} command - The command to handle
 * @param {string[]} args - The arguments for the command
 */
async function handleCommand(command, options) {
    validateOptions(options);
    // add check for docker is ruining and node version 
    switch (command) {
        case 'setup':
        case 'init':
            setup(options);
            break;
        case 'addPlugin':
        case 'add':
            addPlugin(options);
            break;
        case 'removePlugin':
        case 'rm':
            removePlugin(options);
            break;
        case 'removeAllPlugin':
        case 'clear':
            removeAllPlugin(options);
            break;
        case 'logs':
            logs(options);
            break;
        // case 'resetDB':
        //     reset(options);
        //     break;
        case 'mountedPluginList':
        case 'mpl':
            listMountedPlugins(options);
            break;
        // path
        // case 'folder': // 1 level deep
        //     reset(options);
        //     break;
    
        default:
            console.log(`Unknown command: ${command}`);
    }
}

(async () => {
    const { input, flags: options } = cli;
    const [command] = input;
    await handleCommand(command, options);
})();
