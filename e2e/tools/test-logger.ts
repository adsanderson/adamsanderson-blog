import pino from 'pino';

const loggerConfig = {
	transport: {
		target: 'pino-pretty'
	}
};

export const logger = pino({
	...loggerConfig
});
