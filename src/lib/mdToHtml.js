import { unified } from 'unified'
import remarkParse from 'remark-parse'
import frontmatter from 'remark-frontmatter'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import { matter } from 'vfile-matter'

/**
 * 
 */
export async function mdToHtml(content) {


    return unified()
        .use(remarkParse)
        .use(frontmatter, ['yaml'], (data) => {
            console.log(data)
        })
        .use(() => (_, file) => { matter(file) })
        .use(remarkRehype)
        .use(rehypeStringify)
        .process(content)
}