import { test, expect } from '../fixtures';

const COLOR_SCHEMES = ['light', 'dark'] as const;

COLOR_SCHEMES.forEach((colorScheme) => {
	test.describe(
		`Visual view - ${colorScheme} color scheme`,
		{
			tag: ['@exploratory']
		},
		() => {
			test.use({ colorScheme });

			test('should display the page in different color schemes', async ({ adamSandersonCoUk }) => {
				await adamSandersonCoUk.listPosts();
				await adamSandersonCoUk.expectPostsToExist();
			});
		}
	);
});
