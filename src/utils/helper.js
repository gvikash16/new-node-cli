import chalk from 'chalk';
const decorateList = (list) => {
    let str = chalk.blue(`\n\nList of Plugins:\n\n`);
    list.forEach((item, index) => {
        str += `${chalk.yellow(index+1)} ${chalk.green.bold(item.name)} => ${chalk.blue.italic(item.path)}\n\n`;
    });
    return str;
}

export default decorateList;