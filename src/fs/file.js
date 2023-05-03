import fs from 'fs';

const readFile = (path) => {
    let data = fs.readFileSync(path);
    let parsed_data = JSON.parse(data.toString());
    return parsed_data;
}

const deleteFile = (path) => {
  if (fs.existsSync(path)) {
    fs.unlinkSync(path)
  }
}

function writeToFile(path, data) {
  data = data || CONFIG;
  fs.writeFileSync(path, JSON.stringify(data, null, 4));
}

const checkFileExist = (path) => {

}

const checkFilePathExist = (path) => {
  
}

const copyFile = (path) => {

}
export {
  readFile,
  deleteFile,
  writeToFile
};