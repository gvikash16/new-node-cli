import { writeToFile, readFile, checkFileExist, createFolder } from './fs/file.js';
import alert from './utils/alert.js';
import config from './../config/index.js';
import { basename } from 'path';
import { homedir } from 'os';
import { execa } from 'execa';

function getFolderInfo() {
    const folderPath = process.cwd();
    const folderName = basename(folderPath);
    return { folderName, folderPath };
}

const execProcess = async (process, args) => {
    try {
        await execa(process, args.split(' '), { stdio: 'inherit' });
    } catch (error) {
        console.error(`Error: ${error}`);
    }
}
const setup = async (option) => {
    const { vip_path, branch_name, remote_git_url, auth_env_config_file_name, folder_name, media_redirect_domain } = config;
    //TODO need to add method where it can do some string clan up
    const { projectName } = option;
    const clonedProjectPath = `${homedir()}/${folder_name}/${projectName}`;
    const { folderName, folderPath } = getFolderInfo();
    const configPathForProject = `${homedir()}/${vip_path}/${projectName}/${auth_env_config_file_name}`
    const [error, isFileExist] = await checkFileExist(configPathForProject);
    //TODO: add error handelander
    if (!isFileExist) {
        // const projectPath = `${homedir()}/${vip_path}/${projectName}`;
        // await createFolder(projectPath);
        await createFolder(clonedProjectPath);
        const github_token = process.env.GITHUB_TOKEN;
        const git_url = `https://${github_token}@github.com/${remote_git_url} -b ${branch_name} ${clonedProjectPath} --depth 1`
        await execProcess('git', `clone ${git_url}`)
        await execProcess('vip', `dev-env create  --elasticsearch=false --mailhog=false --media-redirect-domain=${media_redirect_domain} --mu-plugins=image --multisite=true --php=8.0 --phpmyadmin=false --slug=${projectName} --title=${projectName} --wordpress=6.1.1 --xdebug=false --app-code=${clonedProjectPath}`)
        await execProcess('vip', `dev-env start --slug ${projectName}`)
        //TODO:
         let myConfig = { "project_name": projectName, "initialize-directory": folderPath};
        await writeToFile(configPathForProject, myConfig);
        console.log('done')
    }
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