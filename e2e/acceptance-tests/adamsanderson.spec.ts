import { test } from '../fixtures';

test('Expect to see a list of posts', async ({ adamSandersonCoUk }) => {
	await adamSandersonCoUk.listPosts();
	await adamSandersonCoUk.expectPostsToExist();
});

test('Expect to see a specific post', async ({ adamSandersonCoUk }) => {
	await adamSandersonCoUk.listPosts();
	await adamSandersonCoUk.expectPostsToExist();
});

test('Expect to see content for a selected post', async ({ adamSandersonCoUk }) => {
	await adamSandersonCoUk.listPosts();
	await adamSandersonCoUk.expectPostsToExist();
	await adamSandersonCoUk.accessPost({
		type: 'title',
		title: 'From Bootstrap - How to make a point with CSS'
	});
	await adamSandersonCoUk.expectPostExists({
		type: 'title',
		title: 'From Bootstrap - How to make a point with CSS'
	});
});
