import { test } from 'uvu';
import * as assert from 'uvu/assert';
import { processBlogList } from '../../src/lib/bloglist.js';

test('filter to only published posts', async () => {
    const blogs = base();
    const result = processBlogList("", blogs);
    assert.equal(result.length, 3);
})

test('filter to only published posts', async () => {
    const blogs = base();
    const result = processBlogList("published", blogs);
    assert.equal(result.length, 3);
})

test('filter to only published posts', async () => {
    const blogs = base();
    const result = processBlogList("all", blogs);
    assert.equal(result.length, 4);
})

test('filter to only published posts', async () => {
    const blogs = base();
    const result = processBlogList("unpublished", blogs);
    assert.equal(result.length, 1);
})


test('filter to only published posts', async () => {
    const blogs = base();
    const result = processBlogList("junk", blogs);
    assert.equal(result.length, 3, "should use default as ");
})

test('sort blog list by published', async () => {
    const blogs = base();
    const expected = base();

    const result = processBlogList("hi", blogs);

    console.log(result)

    assert.equal(result.length, 3);
    assert.equal(result[0].publishDate, expected[1].publishDate);
    assert.equal(result[1].publishDate, expected[3].publishDate);
    assert.equal(result[2].publishDate, expected[0].publishDate);
});

test.run();

const base = () => [
    {
        title: 'Blog 1',
        slug: 'blog-1',
        publishDate: '2020-01-01',
    },
    {
        title: 'Blog 2',
        slug: 'blog-2',
        publishDate: '2022-12-31',
    },
    {
        title: 'Blog 3',
        slug: 'blog-3',
    },
    {
        title: 'Blog 4',
        slug: 'blog-0',
        publishDate: '2020-01-03',
    },
];