import { test } from '../fixtures';

test('AdamSanderson.co.uk', async ({ adamSandersonCoUk }) => {
	await adamSandersonCoUk.listPosts();
	await adamSandersonCoUk.expectPostsToExist();
});

