import { type Page, test as base } from '@playwright/test';
import { AdamSandersonBlog } from './adamsanderson.dsl';
import { AdamSandersonCoUkWeb } from './adamsanderson.driver.web';
import { AdamSandersonBlogRSS } from './adamsanderson.driver.rss';
import { AdamSandersonCoUkWebKeyboard } from './adamsanderson.driver.web.keyboard';

type FixtureTestArgs = {
	adamSandersonCoUk: AdamSandersonBlog;
};

function getAdamSandersonBlog(projectName: string, page: Page) {
	if (projectName === 'RSS') {
		return new AdamSandersonBlogRSS();
	}
	if (projectName === 'chromium - keyboard') {
		return new AdamSandersonCoUkWebKeyboard(page);
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
