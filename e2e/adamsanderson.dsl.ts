interface BlogPost {
	title: string;
	content: string;
	publishDate: Date;
	description?: string;
}

type PostSelector =
	| { type: 'title'; title: string }
	| { type: 'position'; position: number }
	| { type: 'date'; date: Date };

export interface AdamSandersonBlog {
	// Core behaviors
	accessPost: (selector: PostSelector) => Promise<void>;
	listPosts: () => Promise<void>;

	// Expectations
	expectPostsToExist: () => Promise<void>;
	expectPostExists: (selector: PostSelector) => Promise<void>;
	expectPostContent: (selector: PostSelector, expectedContent: string) => Promise<void>;
	expectPostsInOrder: (posts: BlogPost[]) => Promise<void>;
	expectAuthorToBe: (name: string) => Promise<void>;
}
