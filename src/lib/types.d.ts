/**
 * Can be made globally available by placing this
 * inside `global.d.ts` and removing `export` keyword
 */
export interface Locals {
	userid: string;
}

export type Markdown = {
	metadata: {
		title: string;
		date: string;
		excerpt: string;
	}
	content: string;
}