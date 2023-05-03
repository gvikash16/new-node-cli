import { writeToFile, readFile } from './fs/file.js';
import alert from './utils/alert.js';
const setUp = (cli, configPath) => {
    let myConfig = { "project-name": cli.flags.name };
    myConfig["initialize-directory"] = process.cwd().split('\\').at(-1);
    writeToFile(configPath, myConfig);
    console.log("🚀 ~ file: index.js:4 ~ setUp ~ setUp:");
}
const addPlugin = (cli, configPath) => {
    let myConfig;
    try {
        myConfig = readFile(configPath);
    } catch (e) {
        alert({ type: 'error', msg: 'File not found. Try setup first.' });
        process.exitCode = 0;
        process.exit();
    }
    myConfig["mounted-plugin"] = myConfig["mounted-plugin"] ?? [];
    myConfig["mounted-plugin"] = myConfig["mounted-plugin"].filter((plugin) => {
        if (plugin.name !== cli.flags.name) {
            return plugin;
        }
    });
    myConfig["mounted-plugin"].push({
        "name": cli.flags.name,
        "path": process.cwd()
    });
    writeToFile(configPath, myConfig);
}
const removePlugin = (cli, configPath) => {
    let myConfig;
    try {
        myConfig = readFile(configPath);
    } catch (e) {
        alert({ type: 'error', msg: 'File not found. Try setup first.' });
        process.exitCode = 0;
        process.exit();
    }
    myConfig["mounted-plugin"] = myConfig["mounted-plugin"] ?? [];
    myConfig["mounted-plugin"] = myConfig["mounted-plugin"].filter((plugin) => {
        if (plugin.name !== cli.flags.name) {
            return plugin;
        }
    })
    writeToFile(configPath, myConfig);
    console.log("🚀 ~ file: index.js:4 ~ removePlugin ~ removePlugin:")
}
const logPlugin = () => {

    console.log("🚀 ~ file: index.js:4 ~ logPlugin ~ logPlugin:")
}

export {
    setUp,
    addPlugin,
    removePlugin,
    logPlugin
}

