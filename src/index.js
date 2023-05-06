import { writeToFile, readFile, checkFileExist } from './fs/file.js';
import alert from './utils/alert.js';
import config from './../config/index.js';
import {basename} from 'path';

function getFolderInfo() {
    const folderPath = process.cwd();
    const folderName = basename(folderPath);
    return { folderName, folderPath };
}

const setup = (option) => {
    const {vip_path} = config;
    console.log('vip_path:', vip_path);
    const {projectName} = option;
    const {folderName, folderPath} = getFolderInfo();
    // vip_path check exists

    // let myConfig = { "project-name": cli.flags.name };
    // myConfig["initialize-directory"] = process.cwd().split('\\').at(-1);
    // writeToFile(configPath, myConfig);
    // console.log("🚀 ~ file: index.js:4 ~ setUp ~ setUp:");
}

const addPlugin = (cli, configPath) => {
    let config;
    try {
        config = readFile(configPath);
    } catch (e) {
        alert({ type: 'error', msg: 'File not found. Try setup first.' });
        process.exit(0);
    }
    config['mountedPlugin'] = [...(config['mountedPlugin'] || []).filter(({ name }) => name !== cli.flags.name), { name: cli.flags.name, path: process.cwd() }];
    writeToFile(configPath, config);
}

const removePlugin = (cli, configPath) => {
    let myConfig;
    try {
        myConfig = readFile(configPath);
    } catch (e) {
        alert({ type: 'error', msg: 'File not found. Try setup first.' });
        process.exit(0);
    }
    myConfig['mountedPlugin'] = [...(myConfig['mountedPlugin'] || []).filter(({ name }) => name !== cli.flags.name)];
    writeToFile(configPath, myConfig);
}

export {
    setup,
    addPlugin,
    removePlugin,
}