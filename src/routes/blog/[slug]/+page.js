import { error } from '@sveltejs/kit'



export const prerender = true;

// export async function load({ params }) {
	// 	const slug = params.slug;

	// 	const post = await fetch(`${base}/blog/${slug}.json`).then((r) => r.json());
	
	// 	return { post };
	// }
	
/**
 * @type {import('./$types').PageLoad}
 */
export const load = async ({ params }) => {
	try {	
		const post = await import(`../../../posts/${params.slug}.md`)

		console.log(post);

		return {
			postcontent: post.default.render().html,
			metadata: { ...post.metadata, slug: params.post } 
		}
	} catch(err) {
		throw error(404, err)
	}
}