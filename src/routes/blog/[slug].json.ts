import { process } from '$lib/markdown';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async (request) => {
  const { slug } = request.params;

  const { metadata, content } = process(`src/posts/${slug}.md`);
  console.log('METADATA:', metadata)
  const body = JSON.stringify({ metadata, content });

  console.log('BOFY', body);

  return {
    body
  }
}