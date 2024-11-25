import { type AdamSandersonBlog } from './adamsanderson.dsl';
import { expect, type Page } from '@playwright/test';
import RssParser from 'rss-parser';

export class AdamSandersonCoUkWeb implements AdamSandersonBlog {
	private page: Page;

	constructor(page: Page) {
		this.page = page;
	}
	accessPost: AdamSandersonBlog['accessPost'] = async (selector) => {
		if (selector.type === 'title') {
			await this.page.getByText(selector.title).click();
			return;
		}
		throw new Error('Selector not implemented');
	};
	listPosts: AdamSandersonBlog['listPosts'] = async () => {
		await this.page.goto('https://adamsanderson.co.uk');
	};
	expectPostsToExist: AdamSandersonBlog['expectPostsToExist'] = async () => {
		await expect(
			this.page.getByRole('link', { name: 'From Bootstrap - How to make a point with CSS' })
		).toBeVisible();
	};
	expectPostExists: AdamSandersonBlog['expectPostExists'] = async (selector) => {
		await expect(this.page.getByRole('heading', { name: selector.title })).toBeVisible();
	};
	expectPostContent: AdamSandersonBlog['expectPostContent'] = async (selector) => {
		throw new Error('Not implemented' + selector);
	};
	expectPostsInOrder: AdamSandersonBlog['expectPostsInOrder'] = async (posts) => {
		throw new Error('Not implemented' + posts);
	};

	async goto() {}
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

export class AdamSandersonBlogRSS implements AdamSandersonBlog {
	private rssParser: RssParser;
	private feed: unknown;
	private activeFeedItem: unknown;

	constructor() {
		this.rssParser = new RssParser();
	}

	accessPost: AdamSandersonBlog['accessPost'] = async (selector) => {
		if (selector.type === 'title') {
			this.activeFeedItem = this.feed.items.find((item) => item.title === selector.title);
			return;
		}
		throw new Error('Selector not implemented');
	};
	listPosts: AdamSandersonBlog['listPosts'] = async () => {
		this.feed = await this.rssParser.parseURL('https://adamsanderson.co.uk/rss.xml');
	};
	expectPostsToExist: AdamSandersonBlog['expectPostsToExist'] = async () => {
		await expect(this.feed).toBeDefined();
	};
	expectPostExists: AdamSandersonBlog['expectPostExists'] = async (selector) => {
		expect(this.activeFeedItem).toBeDefined();
	};
	expectPostContent: AdamSandersonBlog['expectPostContent'] = async (selector) => {
		expect(this.activeFeedItem.content).toBeDefined();
	};
	expectPostsInOrder: AdamSandersonBlog['expectPostsInOrder'] = async (posts) => {
		throw new Error('Not implemented' + posts);
	};
}
