#!/usr/bin/env node
import { spawn, exec } from 'child_process';
import config from './config/index.js';
// const { exec } = require('child_process');
import cli from './src/meow/meow.js';
import { homedir } from 'os'

const userHomeDir = homedir()
// const { preload } = cli.flags;
// console.log('cli', cli.input, cli.flags);
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
console.log('rahul-vikash');