import { test, expect } from 'vitest';
import { processBlogList } from './bloglist.js';

test('filter to only published posts', async () => {
	const blogs = base();
	const result = processBlogList('', blogs);
	expect(result.length).toBe(3);
});

test('filter to only published posts', async () => {
	const blogs = base();
	const result = processBlogList('published', blogs);
	expect(result.length).toBe(3);
});

test('filter to only published posts', async () => {
	const blogs = base();
	const result = processBlogList('all', blogs);
	expect(result.length).toBe(4);
});

test('filter to only published posts', async () => {
	const blogs = base();
	const result = processBlogList('unpublished', blogs);
	expect(result.length).toBe(1);
});

test('filter to only published posts', async () => {
	const blogs = base();
	const result = processBlogList('junk', blogs);
	expect(result.length).toBe(3);
});

test('sort blog list by published', async () => {
	const blogs = base();
	const expected = base();

	const result = processBlogList('hi', blogs);

	console.log(result);

	expect(result.length).toBe(3);
	expect(result[0].publishDate).toBe(expected[1].publishDate);
	expect(result[1].publishDate).toBe(expected[3].publishDate);
	expect(result[2].publishDate).toBe(expected[0].publishDate);
});

const base = () => [
	{
		title: 'Blog 1',
		slug: 'blog-1',
		publishDate: '2020-01-01'
	},
	{
		title: 'Blog 2',
		slug: 'blog-2',
		publishDate: '2022-12-31'
	},
	{
		title: 'Blog 3',
		slug: 'blog-3'
	},
	{
		title: 'Blog 4',
		slug: 'blog-0',
		publishDate: '2020-01-03'
	}
];
