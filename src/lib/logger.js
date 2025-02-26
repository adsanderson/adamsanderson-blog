import pino from 'pino';

/**
 *
 * @param {unknown} message
 */
export function log(message) {
	console.log(message);
}

console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~', process.env.CI)

const loggerConfig =
	process.env.NODE_ENV === 'development' || process.env.CI === true
		? {
				transport: {
					target: 'pino-pretty'
				}
			}
		: {};

export const logger = pino({
	...loggerConfig
});
