---
templateKey: blog-post
title: Adding an RSS feed to a Sveltekit Blog
publishDate: 2023-06-08T12:00:00.000Z
description: |
  'or: How I Learned to Keep the Feed Alive'
tags:
  - RSS
---

I still feel that RSS is still important. It's efficient, reliable, and above all, open. [Google Reader](https://en.wikipedia.org/wiki/Google_Reader) was my introduction to RSS and there are days I still want to open it. There are alternatives many of which I have use or have tried, but nothing quite captured the feeling I had while using Reader.

Still, RSS itself is important and after moving this blog to Sveltekit I felt some guilt that it didn't have a feed. This was in the early days of Sveltkit as well, so before the ➕ prefix. People were experimenting and no preferred solution.

So I built a simple feed for this blog, that you can find here: [https://www.adamsanderson.co.uk/rss.xml](https://www.adamsanderson.co.uk/rss.xml)

### Finding and Implementing the Feed Template

Firstly, I needed a suitable feed template. After some chatting with ChatGPT, I had a fitting one that I could adapt to my blog's needs. In my routes I set up a "RSS.xml/+server.js" endpoint in my application and implemented a GET method to serve the RSS feed.

The template looks like this:

```js
const website = 'https://www.adamsanderson.co.uk';
const feedTitle = 'Adam Sanderson - Blog';
const feedDescription = 'Thoughts, learnings, and updates from Adam Sanderson.';
const feedLink = 'https://www.adamsanderson.co.uk';
// Feed is rendered at build time
const feedUpdated = new Date();

/**
 *
 * @param {feedEntries[]} posts
 * @returns string
 */

export const xml = (posts) => `<?xml version="1.0" encoding="utf-8"?>
  <feed xmlns="http://www.w3.org/2005/Atom">
    <title>${feedTitle}</title>
    <link href="${feedLink}/rss.xml" rel="self"/>
    <link href="${feedLink}"/>
    <id>${feedLink}/</id>
    <updated>${feedUpdated.toISOString()}</updated>
    <author>
      <name>Adam Sanderson</name>
    </author>
    <subtitle>${feedDescription}</subtitle>
    <generator>JavaScript</generator>
${posts
	.map(
		(post) => `    <entry>
        <title>${post.title}</title>
        <link href="${website}/blog/${post.slug}/"/>
        <id>${website}/blog/${post.slug}/</id>
        <updated>${new Date(post.publishDate).toISOString()}</updated>
        <published>${new Date(post.publishDate).toISOString()}</published>
        <content type="html"><![CDATA[${post.content}]]></content>
      </entry>`
	)
	.join('\n')}
  </feed>`;
```

Using a similar mechanism to the blog post page, to convert my markdown blogposts to html. I tested this and it all worked. Confidently I pushed this to production expecting a working feed.

### First issue: When to build a feed

Trying in production I was not met with a working feed, but an error. Where I had used SSG to create my site but not the RSS feed. The code here was expecting the original markdown posts to be available to render.

The issue here was a quick way and right way fix. I could of deployed the original files and let the feed build each time it was run. This seemed wasteful though, the content rarely changes and if you are subscribed to the feed it likely will be called multiple time per subscription. The alternative was to match the reset of the site and generate the feed at build time

### Resolving the Issue: Embracing Prerendering

The solution lied in SvelteKit's prerendering feature. Prerendering in this context is to render the feed at build time rather than when a user fetches it. This meant the feed items would already be in the RSS feed before it was requested, statically serving it removing the need for dynamic rendering.

To do this in the `+server.js` file, I added the following line of code:

```js
export const prerender = true;
```

This enables prerendering, ensuring that the RSS feed was fully populated with blog posts when it hit the production server.

I tested again locally and with everything working deployed again, confident of the result.

### Second Issue: dev vs build

While using [mdsvex](https://mdsvex.pngwn.io/) worked perfectly for rendering the posts and worked perfectly for rendering while using `$ svelte dev`. I ran into issues when trying to build with prerendering. This led me to switch from mdsvex to remark just for the building the feed. This is where I got to:

```js
import fs from 'fs';
import { xml } from '$lib/rss';
import path from 'path';
import matter from 'gray-matter';
import { mdToHtml } from '../../lib/mdToHtml';

export const prerender = true;

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function GET() {
	const fileNames = await fs.promises.readdir('src/posts');

	const posts = (
		await Promise.all(
			fileNames.map(async (fileName) => {
				const doc = await fs.promises.readFile(`src/posts/${fileName}`, 'utf8');

				const { data, content } = matter(doc);

				data.slug = path.basename(fileName, '.md');
				data.content = await mdToHtml(content.toString());
				return data;
			})
		)
	)
		.filter((p) => p.publishDate)
		.toSorted((a, b) => {
			return a.publishDate > b.publishDate ? -1 : 1;
		});

	const headers = {
		'Cache-Control': 'max-age=0, s-maxage=3600',
		'Content-Type': 'application/xml'
	};

	const body = xml(posts);

	return new Response(body, { headers });
}
```

### In Conclusion

RSS may seem like a relic of the past to some, but for me, it embodies the freedom and user-centric approach that the web was built on. This journey of integrating an RSS feed into my blog was a reminder of the challenges and rewards that come with problem-solving in the digital space.

Despite a couple of hiccups, the feeling of seeing my blog posts populating the RSS feed was genuinely satisfying. It's my hope that this new feature enables my readers to connect with my content more conveniently, recapturing some of that Google Reader magic along the way.
