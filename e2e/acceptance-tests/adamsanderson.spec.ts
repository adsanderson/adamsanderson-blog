import { test } from '../fixtures';

test('Expect to get a list of posts', async ({ adamSandersonCoUk }) => {
	await adamSandersonCoUk.listPosts();
	await adamSandersonCoUk.expectPostsToExist();
});

test('Expect to get content for a selected post', async ({ adamSandersonCoUk }) => {
	await adamSandersonCoUk.listPosts();
	await adamSandersonCoUk.expectPostsToExist();
	const selectPost = {
		type: 'title',
		title: 'From Bootstrap - How to make a point with CSS'
	} as const;
	await adamSandersonCoUk.accessPost(selectPost);
	await adamSandersonCoUk.expectPostExists(selectPost);
});

test('Expect that I am identified as the author', async ({ adamSandersonCoUk }) => {
	await adamSandersonCoUk.listPosts();
	await adamSandersonCoUk.expectPostsToExist();
	await adamSandersonCoUk.expectAuthorToBe('Adam Sanderson');
});
