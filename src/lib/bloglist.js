import { readdir, readFile } from 'fs/promises';
import { basename } from 'path';
import matter from 'gray-matter';

/**
 * 
 * @returns Promise<{
    [key: string]: any;
}[]>
 */
export async function getBlogList() {
    const fileNames = await readdir('src/posts')

    let blogs = await Promise.all(
        fileNames.map(async (fileName) => {
            const doc = await readFile(`src/posts/${fileName}`, 'utf8')

            const { data } = matter(doc)

            data.slug = basename(fileName, '.md');

            return data
        })
    )

    blogs = blogs.filter(post => post.publishDate);

    blogs.sort((a, b) => b.publishDate - a.publishDate);

    return blogs;
}