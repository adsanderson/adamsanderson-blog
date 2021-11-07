import { process } from '$lib/markdown';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async (request) => {
  const { slug } = request.params;

  const { metadata, content } = await process(slug);
  const body = JSON.stringify({ metadata, content });

  return {
    body
  }
}