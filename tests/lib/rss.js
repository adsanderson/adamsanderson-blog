import { test } from 'uvu';
import * as assert from 'uvu/assert';
import { xml } from '../../src/lib/rss.js';

test('filter to only published posts', async () => {
  // const blogs = base();
  const result = xml([{
    title: 'Title'
  }]);
  // assert.equal(result.length, 3);
  console.log(result);
  console.log(snapshot);
  assert.snapshot(result, snapshot)
})

const snapshot = `<rss xmlns:dc="https://purl.org/dc/elements/1.1/" xmlns:content="https://purl.org/rss/1.0/modules/content/" xmlns:atom="https://www.w3.org/2005/Atom" version="2.0">
<channel>
  <title>Devtings</title>
  <link>https://www.adamsanderson.co.uk</link>
  <atom:link href="https://www.adamsanderson.co.uk/rss.xml" rel="self" type="application/rss+xml" />
  <description>A blog built with SvelteKit about tech and stuff!</description>
  <item>
    <title>Title</title>
    <description>A blog built with SvelteKit about tech and stuff!</description>
    <link>https://www.adamsanderson.co.uk/blog/test-post/</link>
    <guid>https://www.adamsanderson.co.uk/blog/test-post/</guid>
    <pubDate>Wed, 02 Oct 2002 13:00:00 GMT</pubDate>
    <content:encoded>
        <![CDATA[
        <div style="margin-top: 50px; font-style: italic;">
        <strong>            
            Keep reading          
        </strong>  
        </div>
        ]]>
    </content:encoded>
  </item>
</channel>
</rss>`

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