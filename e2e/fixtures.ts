import { type Page, test as base } from '@playwright/test';
import { AdamSandersonBlog } from './adamsanderson.dsl';
import { AdamSandersonBlogRSS, AdamSandersonCoUkWeb } from './adamsanderson.drivers';

type FixtureTestArgs = {
	adamSandersonCoUk: AdamSandersonBlog;
};

function getAdamSandersonBlog(projectName: string, page: Page) {
	if (projectName === 'RSS') {
		return new AdamSandersonBlogRSS();
	}
	return new AdamSandersonCoUkWeb(page);
}

export const test = base.extend<FixtureTestArgs>({
	adamSandersonCoUk: async ({ page }, use) => {
		const adamSandersonCoUk = getAdamSandersonBlog(test.info().project.name, page);
		await use(adamSandersonCoUk);
	}
});

export { expect } from '@playwright/test';
