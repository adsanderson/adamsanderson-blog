import { test, expect } from '../fixtures';

test(
	'should get the load time of the page, and should load in less than one second',
	{
		tag: ['@exploratory']
	},
	async ({ adamSandersonCoUk, logger, performance }) => {
		await adamSandersonCoUk.listPosts();
		await adamSandersonCoUk.expectPostsToExist();

		const [initialNavigationEvent] = await performance.getEntriesByType('navigation');
		expect(initialNavigationEvent.duration).toBeLessThan(1000);
	}
);
