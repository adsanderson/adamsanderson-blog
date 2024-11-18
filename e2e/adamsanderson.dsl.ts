export interface AdamSandersonBlog {
	goto: () => Promise<void>;
	expectToSeePosts: () => Promise<void>;
	viewPost: (postTitle: string) => Promise<void>;
	expectToSeePost: (postTitle: string) => Promise<void>;
}
