import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function get() {
  const fileNames = await fs.promises.readdir('src/posts')

  let blogs = await Promise.all(
    fileNames.map(async (fileName) => {
      const doc = await fs.promises.readFile(`src/posts/${fileName}`, 'utf8')

      const { data } = matter(doc)

      data.slug = path.basename(fileName, '.md');

      return data
    })
  )

  blogs = blogs.filter(post => post.publishDate);

  blogs.sort((a, b) => b.publishDate - a.publishDate);

  return {
    body: JSON.stringify(blogs)
  }
}