import {writeToFile} from '../fs/file.js';
const createConfig = (input) => {
    let myConfig = {"project-name": input};
    writeToFile(`${process.cwd()}/newfile1.txt`, myConfig);
    // console.log(`path: ${path}`);
    // console.log(`input: ${input}`);
    // console.log(`Here: ${process.cwd()}`);
}

export default createConfig;