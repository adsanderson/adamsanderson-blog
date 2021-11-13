import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { processBlogList } from '$lib/bloglist'

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function get(request) {
  const query = request.query;
  const fileNames = await fs.promises.readdir('src/posts')

  let blogs = await Promise.all(
    fileNames.map(async (fileName) => {
      const doc = await fs.promises.readFile(`src/posts/${fileName}`, 'utf8')

      const { data } = matter(doc)

      data.slug = path.basename(fileName, '.md');

      return data
    })
  )

  const filterState = query.get('filter');
  blogs = processBlogList(filterState, blogs);

  return {
    body: JSON.stringify(blogs)
  }
}

