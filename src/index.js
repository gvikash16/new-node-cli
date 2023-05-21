import { writeToFile, readFile, checkFileExist, createFolder,copyDirectory } from './fs/file.js';
import alert from './utils/alert.js';
import formatPluginList from './utils/helper.js';
import handleError from './utils/handleError.js';
import config from './../config/index.js';
import { basename } from 'path';
import { homedir } from 'os';
import { execa } from 'execa'
import yaml from 'js-yaml';
import fs from 'fs';
import chalk from 'chalk';
import path from 'path';
import { fileURLToPath } from 'url';

/**
 * Returns an object containing information about the application.
 * @param {Object} options - The options object.
 * @param {string} options.projectName - The name of the project.
 * @returns {Object} An object containing information about the application.
 */
function getApplicationInformation(options) {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const { vipDirectory, authConfigFileName, appDirectory, docker_file_name, vip_config_path } = config;
    const vipWpConfigPathSetting = path.join(__dirname, vip_config_path);
    const { projectName } = options;
    const currentDirectoryPath = process.cwd();
    const currentDirectoryName = basename(currentDirectoryPath);
    const applicationCodePath = `${homedir()}/${appDirectory}/${projectName}`;
    const vipDirectoryPath = `${homedir()}/${vipDirectory}/${projectName}/`
    const authConfigFile = `${homedir()}/${vipDirectory}/${projectName}/${authConfigFileName}`
    const logsPath = `${homedir()}/${vipDirectory}/${projectName}/log/debug.log`;
    const vipDockerFile = `${homedir()}/${vipDirectory}/${projectName}/${docker_file_name}`;
    return { currentDirectoryName, currentDirectoryPath, applicationCodePath, vipDirectoryPath, authConfigFile, logsPath, vipDockerFile, vipWpConfigPathSetting };
}

const execProcess = async (process, args) => {
    try {
        await execa(process, args.split(' '), { stdio: 'inherit' });
    } catch (error) {
        console.error(`Error: ${error}`);
    }
}
/**
 * Sets up a development environment by cloning a git repository and creating a VIP dev environment.
 * @param {Object} options - The options object containing information about the project and file paths.
 * 
 * This function performs the following steps:
 * 1. Checks if the VIP config file already exists. If it does, an error is thrown.
 * 2. Creates the app code folder if it does not already exist.
 * 3. Clones the specified git repository into the app code folder.
 * 4. Creates a VIP dev environment using the specified options.
 * 5. Starts the VIP dev environment.
 * 6. Writes the project name and initialize-directory to the VIP config file.
 */
const setup = async (options) => {
    const { branch, repositoryUrl, redirectDomain, php_version, wp_version } = config;
    const { projectName } = options;
    const { currentDirectoryPath, applicationCodePath, authConfigFile, vipWpConfigPathSetting } = getApplicationInformation(options);
    const github_token = process.env.GITHUB_TOKEN;
    try {
        const [error, isFileExist] = await checkFileExist(authConfigFile);
        error && handleError(`You have already have project with this project name ${projectName}`, error);
        if (!isFileExist) {
            await createFolder(applicationCodePath);
            const git_url = `https://${github_token}@github.com/${repositoryUrl} -b ${branch} ${applicationCodePath} --depth 1`
            await execProcess('git', `clone ${git_url}`)
            // await copyDirectory('cp',`-R ${vipWpConfigPathSetting} ${applicationCodePath}`);
            await execProcess('composer', `install --working-dir=${applicationCodePath}`);
            await execProcess('vip', `dev-env create  --elasticsearch=false --mailpit=false --media-redirect-domain=${redirectDomain} --mu-plugins=image --multisite=true --php=${php_version} --phpmyadmin=false --slug=${projectName} --title=${projectName} --wordpress=${wp_version} --xdebug=false --app-code=${applicationCodePath}`)
            const myConfig = JSON.stringify({ "project-name": projectName, "initialize-directory": currentDirectoryPath }, null, 4);
            await execProcess('vip', `dev-env start --slug ${projectName}`)
            await writeToFile(authConfigFile, myConfig);
            alert({ type: 'success', msg: `${projectName} setup done successfully` });
            // add message how to see the logs
            // import data base
        }
    }
    catch (error) {
        alert({ type: 'error', msg: `${error.message}` });
        // console.error(`An error occurred while setting up the development environment: ${error.message}`);
    }
}



/**
 * Removes an object from an array based on the value of a specified property.
 * @param {Array} array - The array to remove the object from.
 * @param {string} propertyName - The name of the property to match.
 * @param {any} propertyValue - The value of the property to match.
 * @returns {Array} The updated array after removing the object.
 * @throws {TypeError} If `array` is not an array or `propertyName` is not a string.
 */
const removeObjectByProperty = (array, propertyName, propertyValue) => {
    if (!Array.isArray(array)) {
        throw new TypeError('The "array" parameter must be an array.');
    }
    if (typeof propertyName !== 'string') {
        throw new TypeError('The "propertyName" parameter must be a string.');
    }
    const index = array.findIndex(obj => obj[propertyName] === propertyValue);
    if (index !== -1) {
        array.splice(index, 1);
    }
    return array;
}
/**
 * Updates a list in a JSON file by adding or removing an item or clearing the list.
 * @param {Object} options - The options object containing information about the item and file paths.
 * @param {string} action - The action to perform: 'add', 'remove', or 'clear'.
 * @param {string} [itemNameProperty='name'] - The name of the property to use for the item name.
 * @param {string} [itemPathProperty='path'] - The name of the property to use for the item path.
 * @throws {TypeError} If `options` is not an object or `action` is not a string.
 */
const updateList = async (options, action, itemNameProperty = 'name', itemPathProperty = 'path') => {
    if (typeof options !== 'object' || options === null) {
        throw new TypeError('The "options" parameter must be an object.');
    }
    if (typeof action !== 'string') {
        throw new TypeError('The "action" parameter must be a string.');
    }
    const { currentDirectoryName, currentDirectoryPath, authConfigFile, vipDockerFile } = getApplicationInformation(options);
    const [error, data] = await readFile(authConfigFile);
    // const [errorInDocker, yamlData] = await readFile(vipDockerFile);
    const yamlData = yaml.load(fs.readFileSync(vipDockerFile, 'utf8'));

    let jsonData = JSON.parse(data);
    let list = jsonData['mountedPluginList'] || [];
    const hasItem = list.some(obj => obj[itemNameProperty] === currentDirectoryName);
    let message = '';
    switch (action) {
        case 'add':
            if (!hasItem) {
                list.push({ [itemNameProperty]: currentDirectoryName, [itemPathProperty]: currentDirectoryPath });
                message = 'added current directory';
            }
            break;
        case 'remove':
            if (hasItem) {
                list = removeObjectByProperty(list, itemNameProperty, currentDirectoryName);
                message = 'removed current directory';
            }
            break;
        case "mountedPluginList":
            if (hasItem) {
                message = "Listed all the mounted plugins above";
                listAllMountedPlugins(list);
            }
            break;
        case 'clear':
            list = [];
            message = 'cleared mountedPluginList';
            break;
        default:
            throw new Error(`Invalid action: ${action}`);
    }
    jsonData['mountedPluginList'] = list;
    await writeToFile(authConfigFile, JSON.stringify(jsonData, null, 4));
    const yamlDump = await modifyDockerVolumes(list, yamlData);
    // await writeToFile(vipDockerFile, yamlDump);
    fs.writeFileSync(vipDockerFile, yamlDump, 'utf8');

    alert({ type: 'success', msg: `${message}` });
}
/**
 * Adds a plugin to the mounted plugin list in a JSON file.
 * @param {Object} option - The option object containing information about the plugin and file paths.
 */
const addPlugin = async (options) => {
    updateList(options, 'add');
}
/**
 * Removes a plugin from the mounted plugin list in a JSON file.
 * @param {Object} option - The option object containing information about the plugin and file paths.
 */
const removePlugin = async (options) => {
    updateList(options, 'remove');
}


/**
 * Removes a plugin from the mounted plugin list in a JSON file.
 * @param {Object} option - The option object containing information about the plugin and file paths.
 */
const removeAllPlugin = async (options) => {
    updateList(options, 'clear');
}

/**
 * List all the mounted plugins from a JSON file.
 * @param {Object} option - The option object containing information about the plugin and file paths.
 */
const listMountedPlugins = async (options) => {
    updateList(options, "mountedPluginList");
};

/**
 * Asynchronously lists all mounted plugins.
 * @async
 * @function
 * @param {Object[]} list - An array of plugin objects.
 * @param {string} list[].name - The name of the plugin.
 * @param {string} list[].path - The path of the plugin.
 */
const listAllMountedPlugins = async (list) => {
    console.log(formatPluginList(list));
};


/**
 * Displays the contents of a log file in real-time using the `tail` command.
 * @param {Object} options - The options object containing information about the log file path.
 */
const logs = async (options) => {
    const { logsPath } = getApplicationInformation(options);
    await execProcess('tail', `-f ${logsPath}`)
}

const updatePluginList = (options) => {
    const { vipDockerFile } = getApplicationInformation(options);
    console.log('vipDockerFile:', vipDockerFile);
}

/**
 * Modifies the volumes in a Docker YAML file based on data from a JSON file.
 * @param {string} jsonFile - The path to the JSON file.
 * @param {string} yamlFile - The path to the YAML file.
 */
function modifyDockerVolumes(mountedPluginList, yamlData) {
    // Get mountedPluginList paths from JSON data
    const mountedPluginListPaths = mountedPluginList.map(({ path, name }) => `${path}:/wp/wp-content/plugins/${name}`);

    // Add mountedPluginList paths to volumes in YAML data
    yamlData.services.php.services.volumes.push(...mountedPluginListPaths);
    yamlData.services.nginx.services.volumes.push(...mountedPluginListPaths);
    return yaml.dump(yamlData);
}

export {
    setup,
    addPlugin,
    removePlugin,
    removeAllPlugin,
    logs,
    listMountedPlugins
}