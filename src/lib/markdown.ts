import fs from 'fs';

import * as unified from 'unified';
// import parse from 'remark-parse';
// import gfm from 'remark-gfm';
// import remark2rehype from 'remark-rehype';
// import rehypeStringify from 'rehype-stringify';
// import frontmatter from 'remark-frontmatter';
// import highlight from 'rehype-highlight';
// import yaml from 'js-yaml';
// import dayjs from 'dayjs';
import type { Markdown } from './types';



// const parser = unified()
//   .use(parse)
//   .use(gfm)
//   .use(frontmatter, ['yaml']);

// const runner = unified()
//   .use(remark2rehype)
//   .use(highlight)
//   .use(rehypeStringify);

export function process(filename: string): Markdown {
  console.log(111111111111111)
  console.log('AAAA', unified)
  const file = fs.readFileSync(filename, 'utf8');
  // const tree = parser.parse(file);
  // console.log(222222222222222)
  // let metadata = null;
  // if (tree.children.length > 0 && tree.children[0].type == "yaml") {
  //   metadata = yaml.load(tree.children[0].value);
  //   tree.children = tree.children.slice(1, tree.children.length);
  //   metadata.date = dayjs(metadata.date).format("MMM D, YYYY");
  // }
  // let content = runner.stringify(runner.runSync(tree));
  // if (!metadata) {
  //   metadata = {
  //     title: "Error!",
  //     date: "?",
  //     excerpt: "Missing Frontmatter! Expected at least a title and a date!"
  //   };
  //   content = "Missing Frontmatter! Expected at least a title and a date!"
  // }
  // return { metadata, content };
  return {
    metadata: {
      date: "",
      excerpt: "",
      title: ""
    },
    content: file.toString()
  }
}
