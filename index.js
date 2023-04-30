#!/usr/bin/env node
import { spawn, exec } from 'child_process';
import config from './config/index.js';
import alert from './src/utils/alert.js';
// const { exec } = require('child_process');
import cli from './src/meow/meow.js';
import { homedir } from 'os';
import {
    setUp,
    addPlugin,
    removePlugin,
    logPlugin
} from './src/index.js';

const userHomeDir = homedir();
const { preload } = cli.flags;
console.log('cli', cli.input, cli.flags);
init();
function init() {
    if(!cli.flags.name) {
        alert({ type: 'error', msg: 'Name flag and its value is required' });
        process.exitCode = 1;
        process.exit();
    }
    if(cli.input.indexOf('setup') !=-1) {
        setUp();
    }
    if(cli.input.indexOf('addPlugin') !=-1) {
        addPlugin();
    }
    if(cli.input.indexOf('removePlugin') !=-1) {
        removePlugin();
    }
    if(cli.input.indexOf('logPlugin') !=-1) {
        logPlugin();
    }
    console.log(`init`);
}

function setEnvVars() {
    const pathToScript = new URL('.', import.meta.url).pathname;
    const home = process.env.HOME || '/c/Users/gvika';
    process.env.CURRENT_DIR = pathToScript;
    process.env.CLIENT_BUILD_DIR = `${home}/${config.PROJECT_NAME}`;
    process.env.PROJECT_NAME = config.PROJECT_NAME;
}
setEnvVars();
function executeBashScript(path) {
    const pathToDockerScript = new URL(path, import.meta.url).pathname;
    const child = exec('sh ' + path);
    // const child = spawn(pathToDockerScript, [], { shell: true });
    child.stdout.setEncoding('utf8');
    child.stdout.on('data', (chunk) => {
        console.log('chunk', chunk);
    });
    child.on('close', console.log);
    child.on('error', console.error);
}
executeBashScript('./run.sh');