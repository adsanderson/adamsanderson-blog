import { type AdamSandersonBlog } from './adamsanderson.dsl';
import { expect, type Page } from '@playwright/test';

export class AdamSandersonCoUkWeb implements AdamSandersonBlog {
	private baseURL: string;
	protected page: Page;

	constructor(page: Page, baseURL: string) {
		this.page = page;
		this.baseURL = baseURL;
	}
	accessPost: AdamSandersonBlog['accessPost'] = async (selector) => {
		if (selector.type === 'title') {
			await this.page.getByText(selector.title).click();
			return;
		}
		throw new Error('Selector not implemented');
	};
	listPosts: AdamSandersonBlog['listPosts'] = async () => {
		await this.page.goto(this.baseURL);
	};
	expectPostsToExist: AdamSandersonBlog['expectPostsToExist'] = async () => {
		await expect(
			this.page.getByRole('link', { name: 'From Bootstrap - How to make a point with CSS' })
		).toBeVisible();
	};
	expectPostExists: AdamSandersonBlog['expectPostExists'] = async (selector) => {
		if (selector.type === 'title') {
			await expect(this.page.getByRole('heading', { name: selector.title })).toBeVisible();
		}
	};
	expectPostContent: AdamSandersonBlog['expectPostContent'] = async (selector) => {
		throw new Error('Not implemented' + selector);
	};
	expectPostsInOrder: AdamSandersonBlog['expectPostsInOrder'] = async (posts) => {
		throw new Error('Not implemented' + posts);
	};
	expectAuthorToBe: AdamSandersonBlog['expectAuthorToBe'] = async (name) => {
		await expect(this.page.getByText('Adam Sanderson')).toBeVisible();
	};
}
