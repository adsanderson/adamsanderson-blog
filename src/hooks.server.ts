import { sequence } from '@sveltejs/kit/hooks';
import * as Sentry from '@sentry/sveltekit';
import { logger } from '$lib/logger';

Sentry.init({
	dsn: 'https://f58d6e56c275f1974b3200170ecb311f@o4507613218799616.ingest.de.sentry.io/4508494498103376',
	tracesSampleRate: 1
});

export const handleError = Sentry.handleErrorWithSentry(async function _handleError({
	error,
	event,
	status,
	message
}) {
	const errorId = crypto.randomUUID();

	logger.error(error, `Error ID: ${message} ${errorId}`);

	return {
		message: 'Whoops!',
		errorId
	};
});

export const handle = sequence(Sentry.sentryHandle());
