import { process } from '$lib/markdown';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async (request) => {
  console.log('SLUG ------------------------------');
  const { slug } = request.params;



  const { metadata, content } = process(`src/posts/${slug}.md`);
  const body = JSON.stringify({ metadata, content });

  return {
    body
  }
}