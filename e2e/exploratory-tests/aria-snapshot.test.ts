import { expect, test } from '../fixtures';

test(
	'should display the page in different color schemes',
	{
		tag: ['@exploratory']
	},
	async ({ page, adamSandersonCoUk, logger }) => {
		test.slow();

		await adamSandersonCoUk.listPosts();
		await adamSandersonCoUk.expectPostsToExist();

		const homeBody = await page.locator('body')

		expect(homeBody).toMatchAriaSnapshot({ name: 'home' });

		const postLinks = await page
			.getByRole('article', { name: 'Blog Posts' })
			.getByRole('link')
			.all()

		const postHrefs = await Promise.all(postLinks.map((x) => x.getAttribute('href')))

		for (const href of postHrefs) {
			if (!href) throw new Error('No href found on post link');
			
			await page.goto(href)
			const postBody = await page.locator('body')
			await expect(postBody).toMatchAriaSnapshot({ name: href });
		}
	}
);
