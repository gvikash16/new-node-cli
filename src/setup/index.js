#!/usr/bin/env node
import tasks from './../tasks/index.js';
import alert from '../utils/alert.js';
import config from '../config/index.js';
import { createSpinner } from 'nanospinner';
import { ReplaceText, getProjectName } from '../utils/helper.js';
import { readFile, deleteFile } from '../fs/file.js';
import { addPackage, updateItemsInJsonFile } from '../package/package.js';

const spinner = createSpinner();

function setEnvVars(root, config) {
   const home = process.env.HOME?process.env.HOME:'';
   process.env.CLIENT_BUILD_DIR = `${home}/${config.PROJECT_NAME}`;
}

const setup = () => {
   let isError = false;
   alert({ type: 'info', msg: 'Loading from preset config' });
   const pathToScript = new URL('.', import.meta.url).pathname;
   // CLIENT_BUILD_DIR
   setEnvVars(pathToScript, config);
   const pwd = process.env.PWD ? process.env.PWD + '/': '';
   const pathToFile = `${pwd}${config.DEFAULT_JSON_FILE}`;
   // console.log('pathToFile', pathToFile);
   // process.exit();
   // starts for getProjectName--------
   // const filePath = `${pwd}${config.DEPENDENCIES.filePath}`;
   // const projectName = getProjectName(filePath);
   // process.env.PROJECT_NAME =  projectName;
   // ends for getProjectName----------
   //  starts for addPackage-----------
   // let {filePath, keyToBeUpdated, toBeAdded} = config.DEPENDENCIES;
   // filePath = `${pwd}${filePath}`;
   // addPackage(filePath, keyToBeUpdated, toBeAdded);
   //  ends for addPackage-----------
   // deleteFile(pathToFile);
   // console.log('pathToFileWhereStrToBeReplaced', pathToFileWhereStrToBeReplaced)
   // ReplaceText(pathToFileWhereStrToBeReplaced, string_to_be_replaced);
   tasks.forEach(async ({ title, task, success, error }, index, tasks) => {
      try {
         spinner.start()
         // starts for updateItemsInJsonFile-------------------
         let {filePath, keyToBeUpdated, itemsToBeAdded, itemsToBeRemoved} = config.PACKAGE;
         filePath = `${pwd}${filePath}`;
         updateItemsInJsonFile(filePath, keyToBeUpdated, itemsToBeAdded, itemsToBeRemoved);
         // ends for updateItemsInJsonFile---------------------
         await task().then(()=>{
            alert({type: 'success', msg: title+' '+success});
            (tasks.length-1 === index) &&
            !isError &&
            alert({type: 'info', msg: 'Project has been setup successfully.'});
         });
         spinner.reset();
      } catch(error) {
         isError = true;
         alert({type: 'error', msg: error.stack});
         console.log(`catch block`);
         spinner.stop();
      }
   })
}

export default setup;