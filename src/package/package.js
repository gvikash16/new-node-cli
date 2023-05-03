import { readFile, deleteFile, writeToFile} from '../fs/file.js';

const updateItemsInJsonFile = (filePath, keyToBeUpdated, itemsToBeAdded=[], itemsToBeRemoved=[]) => {
    let content = readFile(filePath);
    let packageList = content[keyToBeUpdated];
    packageList.push(...itemsToBeAdded);
    itemsToBeRemoved.forEach((value, index)=> {
      let findItemIndexInPkgList = packageList.indexOf(value);
      if(findItemIndexInPkgList!==-1) {
        packageList.splice(findItemIndexInPkgList, 1);
      }
    })
    packageList = [...new Set(packageList)];
    content[keyToBeUpdated] = packageList;
    writeToFile(filePath, content)
}
// const removeElementFromJson = (path, element, operation = 'add') => {
//   try {
//     let data = fs.readFileSync(path);
//     let parsed_data = JSON.parse(data.toString());
//     let packageList = parsed_data['package-list'];
//     if (operation === 'add') {
//       packageList.push(element);
//     } else {
//       let index = packageList.indexOf(element);
//       packageList.splice(index, 1);
//     }
//     fs.writeFileSync(path, JSON.stringify(parsed_data, null, 4));
//   } catch (e) {
//     console.log('Error', e);
//   }
// }

const addPackage = (filePath, keyToBeUpdated, toBeAdded) => {
  // try {
    let content = readFile(filePath);
    for (let pkg in toBeAdded) {
      if (toBeAdded[pkg]['version-name']) {
        // this will add/update package 
        content[keyToBeUpdated][toBeAdded[pkg]['package-name']] = '^' + toBeAdded[pkg]['version-name'];
      } else {
        // this will delete the package if version name not given
        delete content[keyToBeUpdated][toBeAdded[pkg]['package-name']];
      }
    }
    writeToFile(filePath, content);
  // } catch (e) {
  //   console.log(e);
  // }
}

export { addPackage, updateItemsInJsonFile };