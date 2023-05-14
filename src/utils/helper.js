import chalk from 'chalk';

/**
 * Formats a list of plugins with colors and text styles.
 * @param {Object[]} plugins - The list of plugins to format.
 * @param {string} plugins[].name - The name of the plugin.
 * @param {string} plugins[].path - The path of the plugin.
 * @returns {string} The formatted list as a string.
 */
const formatPluginList = (plugins) => {
  const title = chalk.blue(`\n\nList of Plugins:\n\n`);
  const formattedPlugins = plugins.map((plugin, index) => (
    `${chalk.yellow(index + 1)} ${chalk.green.bold(plugin.name)} => ${chalk.blue.italic(plugin.path)}\n\n`
  )).join('');
  return title + formattedPlugins;
}

export default formatPluginList;