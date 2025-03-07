/**
 * Can be made globally available by placing this
 * inside `global.d.ts` and removing `export` keyword
 */
export interface Locals {
	userid: string;
}

export type Markdown = {
	metadata: { [key: string]: unknown };
	content: string;
};

export type Blog = {
	title: string;
	slug: string;
	publishDate?: string;
};
