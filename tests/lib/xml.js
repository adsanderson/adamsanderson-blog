import { test } from 'uvu';
import * as assert from 'uvu/assert';
import { xml } from '../../src/lib/rss.js';

test('filter to only published posts', async () => {
    // const blogs = base();
    const result = xml([]);
    // assert.equal(result.length, 3);
    console.log(result);
    console.log(snapshot);
    assert.snapshot(result, snapshot)
})

const snapshot = `<rss xmlns:dc="https://purl.org/dc/elements/1.1/" xmlns:content="https://purl.org/rss/1.0/modules/content/" xmlns:atom="https://www.w3.org/2005/Atom" version="2.0">
<channel>
  <title>Devtings</title>
  <link>https://www.adamsanderson.co.uk</link>
  <description>A blog built with SvelteKit about tech and stuff!</description>

</channel>
</rss>`

test.run();
