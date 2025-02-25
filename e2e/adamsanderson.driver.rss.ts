import { type AdamSandersonBlog } from './adamsanderson.dsl';
import { expect } from '@playwright/test';
import { warn } from 'console';
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
  private baseURL: string;
  private rssParser: RssParser<RssFeed, RssFeedItem>;
  private feed: RssFeed | undefined;
  private activeFeedItem: RssFeedItem | undefined;

  constructor(baseURL: string) {
    this.rssParser = new RssParser({
      customFields: {
        feed: ['author']
      }
    });
    this.baseURL = baseURL;
  }

  accessPost: AdamSandersonBlog['accessPost'] = async (selector) => {
    if (this.feed) {
      throw new Error('Can\'t find feed')
    }

    if (selector.type === 'title') {
      this.activeFeedItem = this.feed.items.find((item) => item.title === selector.title);
      return;
    }
    throw new Error('Selector not implemented');
  };
  listPosts: AdamSandersonBlog['listPosts'] = async () => {
    this.feed = await this.rssParser.parseURL(`${this.baseURL}/rss.xml`);
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
  expectAuthorToBe: AdamSandersonBlog['expectAuthorToBe'] = async (name) => {
    expect(this.feed.author.name[0]).toBe(name);
  };
}
