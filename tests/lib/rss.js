import { test } from 'uvu';
import * as assert from 'uvu/assert';
import { xml } from '../../src/lib/rss.js';

test('filter to only published posts', async () => {
  // const blogs = base();
  const result = xml([{
    title: 'Title',
    slug: "test-post",
    publishDate: "2002-10-02",
    content: `<div style="margin-top: 50px; font-style: italic;">
<strong>
    Keep reading
</strong>  
</div>`
  }]);
  // assert.equal(result.length, 3);
  console.log(result);
  console.log(snapshot);
  assert.snapshot(result, snapshot)
})

const snapshot = `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">

  <title>Example Feed</title>
  <link href="https://adamsanderson.co.uk/"/>
  <updated>2022-05-21T18:30:02Z</updated>
  <author>
    <name>Adam Sanderson</name>
  </author>
  <id>adamsanderson.co.uk</id>
    <entry>
      <title>Title</title>
      <link href="https://www.adamsanderson.co.uk/blog/test-post/"/>
      <id>https://www.adamsanderson.co.uk/blog/test-post/</id>
      <updated>Wed, 02 Oct 2002 00:00:00 GMT</updated>
      <content><![CDATA[<div style="margin-top: 50px; font-style: italic;">
<strong>
    Keep reading
</strong>  
</div>]]></content>
    </entry>
  </feed>`

test.run();

/*

<item>
  <title>Title</title>
  <description>A blog built with SvelteKit about tech and stuff!</description>
  <link>https://ad.com/posts/a/</link>
  <pubDate>Wed, 02 Oct 2002 13:00:00</pubDate>
  <content:encoded>
      <div style="margin-top: 50px; font-style: italic;">
      <strong>
          Keep reading
      </strong>
      </div>
  </content:encoded>
  </item>

*/