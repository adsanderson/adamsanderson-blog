import { expect, test } from '../fixtures';

test(
	'get visual snapshot of the home page and posts',
	{
		tag: ['@exploratory']
	},
	async ({ page, adamSandersonCoUk, logger }) => {
		test.slow();

		await adamSandersonCoUk.listPosts();
		await adamSandersonCoUk.expectPostsToExist();

		await expect(page).toHaveScreenshot('home.png');

		const postLinks = await page
			.getByRole('article', { name: 'Blog Posts' })
			.getByRole('link')
			.all()

		const postHrefs = await Promise.all(postLinks.map((x) => x.getAttribute('href')))

		for (const href of postHrefs) {
			if (!href) throw new Error('No href found on post link');

			logger.info(`Navigating to ${href}`);
			await page.goto(href)
			await expect(page).toHaveScreenshot(`${href}.png`);
		}
	}
);
