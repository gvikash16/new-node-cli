import fs from 'fs';
import alert from '../utils/alert.js';
import { execa } from 'execa';



const readFile = async (filePath) => {
  try {
    const data = await fs.promises.readFile(filePath, 'utf8');
    return [null, data];
  } catch (error) {
    return [error, null];
  }
}

const writeToFile = async (filePath, data) => {
  try {
    await fs.promises.writeFile(filePath, data);
    return [null];
  } catch (error) {
    return [error];
  }
}

const checkFileExist = async (filePath) => {
  try {
    await fs.promises.access(filePath);
    return [null, true];
  } catch (error) {
    if (error.code === 'ENOENT') {
      return [null, false];
    } else {
      return [error, null];
    }
  }
}

const deleteFile = async (filePath) => {
  try {
    await fs.promises.unlink(filePath);
    return [null];
  } catch (error) {
    return [error];
  }
}

// const readFile = (filePath) => {
//     try {
//       let data = fs.readFileSync(filePath);
//       let parsed_data = JSON.parse(data.toString());
//       return parsed_data;
//     } catch(e) {
//       alert({type:'error', msg:e.message})
//     }
// }

// const deleteFile = (filePath) => {
//   if (fs.existsSync(filePath)) {
//     fs.unlinkSync(filePath)
//   }
// }

// function writeToFile(filePath, data) {
//   try {
//     fs.writeFileSync(filePath, JSON.stringify(data, null, 4));
//   } catch(e) {
//     alert({type:'error', msg:e.message})
//   }
// }

// const checkFileExist = (filePath) => {
//   return fs.existsSync(filePath);
// }

const checkFilePathExist = (filePath) => {

}

const copyFile = (filePath) => {

}
/**
 * Creates a new folder with the specified name.
 * @param {string} folderName - The name of the folder to create.
 * @returns {Promise<void>} A Promise that resolves when the folder has been created.
 */
async function createFolder(folderPath) {
  try {
    if (!fs.existsSync(folderPath)) {
      await execa('mkdir', ['-p', folderPath]);
    }
  } catch (error) {
    console.error(`An error occurred: ${error.message}`);
  }
}

export {
  readFile,
  deleteFile,
  writeToFile,
  checkFileExist,
  createFolder
};