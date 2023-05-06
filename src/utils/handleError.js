import { red, yellow } from 'chalk';
import sym from 'log-symbols';

/**
 * Node Cli Handle Error.
 * @param {String} heading
 * @param {Error} err
 * @param {Boolean} displayError
 * @param {Boolean} exit
 */
export default function handleError(heading = `ERROR: `, err, displayError = true, exit = true) {
	if (err) {
		if (displayError) {
			console.log(`${sym.error} ${red(heading)}`);
			console.log(`${sym.error} ${red(`ERROR →`)} ${err.name}`);
			console.log(`${sym.info} ${red(`REASON →`)} ${err.message}`);
			console.log(`${sym.info} ${red(`ERROR STACK ↓ \n`)} ${err.stack}\n`);
		} else {
			console.log(`${sym.warning}  ${yellow(heading)}\n`);
		}
		if (exit) {
			process.exit(0);
		} else {
			return false;
		}
	}
}