import { unified } from 'unified'
import remarkParse from 'remark-parse'

import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'

/**
 * 
 */
export async function mdToHtml(content) {
    return unified()
        .use(remarkParse)
        .use(remarkRehype)
        .use(rehypeStringify)
        .use(rehypeStringify)
        .process(content)
}