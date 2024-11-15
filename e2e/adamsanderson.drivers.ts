import { type Page } from 'playwright';
import { type AdamSandersonBlog } from './adamsanderson.dsl';
import { expect } from '@playwright/test';

export class AdamSandersonCoUkWeb implements AdamSandersonBlog {
	private page: Page;

	constructor(page: Page) {
		this.page = page;
	}
	async goto() {
		await this.page.goto('https://adamsanderson.co.uk');
	}
	async expectToSeePosts() {
		await expect(
			this.page.getByRole('link', { name: 'From Bootstrap - How to make a point with CSS' })
		).toBeVisible();
	}
	async expectToSeePost(postTitle: string) {}

	async viewPost(postTitle: string) {
		await this.page.goto(`/posts/${postTitle}`);
	}
}

