import { test, expect } from '../fixtures';

test(
	'should get the load time of the page, and should load in less than one second',
	{
		tag: ['@exploratory']
	},
	async ({ adamSandersonCoUk, logger, performance }) => {
		await adamSandersonCoUk.listPosts();
		await adamSandersonCoUk.expectPostsToExist();

		const { duration } = (await performance.getEntriesByType('navigation'))[0];
		expect(duration).toBeLessThan(1000);
	}
);
