import fs from 'fs';
import alert from '../utils/alert.js';

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
  await fs.promises.writeToFile(filePath, data);
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
export {
  readFile,
  deleteFile,
  writeToFile,
  checkFileExist
};