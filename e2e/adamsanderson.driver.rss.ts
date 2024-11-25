import { type AdamSandersonBlog } from './adamsanderson.dsl';
import { expect } from '@playwright/test';
import RssParser from 'rss-parser';

type RssFeedItem = {
	title: string;
	content: string;
	publishedDate: string;
	link: string;
};
type RssFeed = {
	title: string;
	author: {
		name: string;
	};
	items: RssFeedItem[];
};

export class AdamSandersonBlogRSS implements AdamSandersonBlog {
	private rssParser: RssParser<RssFeed, RssFeedItem>;
	private feed: RssFeed;
	private activeFeedItem: RssFeedItem | undefined;

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
		expect(this.feed).toBeDefined();
	};
	expectPostExists: AdamSandersonBlog['expectPostExists'] = async (selector) => {
		expect(this.activeFeedItem).toBeDefined();
	};
	expectPostContent: AdamSandersonBlog['expectPostContent'] = async (selector) => {
		expect(this.activeFeedItem?.content).toBeDefined();
	};
	expectPostsInOrder: AdamSandersonBlog['expectPostsInOrder'] = async (posts) => {
		throw new Error('Not implemented' + posts);
	};
}
