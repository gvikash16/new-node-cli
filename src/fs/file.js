import fs from 'fs';
import { execa } from 'execa';

/**
 * Asynchronously reads the contents of a file.
 * @async
 * @function
 * @param {string} filePath - The path of the file to read.
 * @returns {Promise<[Error|null, string|null]>} A Promise that resolves with an array containing an Error object if an error occurred or null if the operation was successful, and the contents of the file as a string or null if an error occurred.
 */
const readFile = async (filePath) => {
  try {
    const data = await fs.promises.readFile(filePath, 'utf8');
    return [null, data];
  } catch (error) {
    return [error, null];
  }
}

/**
 * Asynchronously writes data to a file.
 * @async
 * @function
 * @param {string} filePath - The path of the file to write to.
 * @param {string} data - The data to write to the file.
 * @returns {Promise<[Error|null]>} A Promise that resolves with an array containing an Error object if an error occurred or null if the operation was successful.
 */
const writeToFile = async (filePath, data) => {
  try {
    await fs.promises.writeFile(filePath, data);
    return [null];
  } catch (error) {
    return [error];
  }
}

/**
 * Asynchronously checks if a file exists.
 * @async
 * @function
 * @param {string} filePath - The path of the file to check.
 * @returns {Promise<[Error|null, boolean|null]>} A Promise that resolves with an array containing an Error object if an error occurred or null if the operation was successful, and a boolean indicating whether the file exists or null if an error occurred.
 */
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

/**
 * Asynchronously deletes a file.
 * @async
 * @function
 * @param {string} filePath - The path of the file to delete.
 * @returns {Promise<[Error|null]>} A Promise that resolves with an array containing an Error object if an error occurred or null if the operation was successful.
 */
const deleteFile = async (filePath) => {
  try {
    await fs.promises.unlink(filePath);
    return [null];
  } catch (error) {
    return [error];
  }
}

/**
 * Asynchronously creates a new folder with the specified name.
 * @async
 * @function
 * @param {string} folderPath - The path of the folder to create.
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