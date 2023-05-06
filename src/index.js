import { writeToFile, readFile, checkFileExist } from './fs/file.js';
import alert from './utils/alert.js';

const setUp = async (cli, configPath) => {
    const [checkError, exists] = await checkFileExist(configPath);
    console.log(`checkError`, checkError);
    if (checkError) {
      console.log('An error occurred while checking if file exists:', checkError);
    } else if (exists) {
      alert({ type: 'error', msg: 'Setup is already done!' });
      process.exit(0);
    } else {
      const myConfig = { 
          "projectName": cli.flags.name,
          "initializeDirectory": process.cwd().split('\\').at(-1)
      };
      writeToFile(configPath, myConfig);
    }
    // if (checkFileExist(configPath)) {
    // }
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
    setUp,
    addPlugin,
    removePlugin,
}