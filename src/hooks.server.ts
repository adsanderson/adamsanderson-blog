import { logger } from '$lib/logger';

/** @type {import('@sveltejs/kit').HandleServerError} */
export async function handleError({ error, event, status, message }) {
	const errorId = crypto.randomUUID();

	logger.error(error, `Error ID: ${message} ${errorId}`);

	return {
		message: 'Whoops!',
		errorId
	};
}
