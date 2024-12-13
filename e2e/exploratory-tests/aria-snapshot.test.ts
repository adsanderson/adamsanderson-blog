import { test } from '../fixtures';

test(
	'should display the page in different color schemes',
	{
		tag: ['@exploratory']
	},
	async ({ page, adamSandersonCoUk, logger }) => {
		await adamSandersonCoUk.listPosts();
		await adamSandersonCoUk.expectPostsToExist();

		const homeBody = await page.locator('body').ariaSnapshot();
		logger.info(homeBody);

		const postLinks = await page
			.getByRole('article', { name: 'Blog Posts' })
			.getByRole('link')
			.all();

		for (const link of postLinks) {
			await link.click();
			const postBody = await page.locator('body').ariaSnapshot();
			logger.info(postBody);
		}
	}
);
