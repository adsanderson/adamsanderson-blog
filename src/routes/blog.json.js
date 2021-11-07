import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function get() {
  const fileNames = await fs.promises.readdir('src/posts')
  // const articles = fileNames.filter((fileName) => /.+\.md$/.test(fileName))

  const blogs = await Promise.all(
    fileNames.map(async (fileName) => {
      const doc = await fs.promises.readFile(`src/posts/${fileName}`, 'utf8')

      const { data } = matter(doc)

      data.slug = path.basename(fileName, '.md');

      return data
    })
  )



  blogs.sort((a, b) => b.publishDate - a.publishDate)
  console.log('b', blogs, "logs")

  return {
    body: JSON.stringify(blogs)
  }
}