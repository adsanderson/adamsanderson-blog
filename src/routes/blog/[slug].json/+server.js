import { process } from '$lib/markdown';

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function GET(request) {
	const { slug } = request.params;

	const { metadata, content } = await process(slug);
	const body = JSON.stringify({ metadata, content });

	return new Response(body);
}
