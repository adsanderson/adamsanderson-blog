import { type Page, test as base } from '@playwright/test';
import { AdamSandersonBlog } from './adamsanderson.dsl';
import { AdamSandersonCoUkWeb } from './adamsanderson.driver.web';
import { AdamSandersonBlogRSS } from './adamsanderson.driver.rss';
import { AdamSandersonCoUkWebKeyboard } from './adamsanderson.driver.web.keyboard';

type FixtureTestArgs = {
	adamSandersonCoUk: AdamSandersonBlog;
};

function getAdamSandersonBlog(projectName: string, page: Page, baseURL: string) {
	if (projectName === 'RSS') {
		return new AdamSandersonBlogRSS(baseURL);
	}
	if (projectName === 'chromium - keyboard') {
		return new AdamSandersonCoUkWebKeyboard(page, baseURL);
	}
	return new AdamSandersonCoUkWeb(page, baseURL);
}

export const test = base.extend<FixtureTestArgs>({
	adamSandersonCoUk: async ({ page, baseURL }, use) => {
		const adamSandersonCoUk = getAdamSandersonBlog(
			test.info().project.name,
			page,
			baseURL || 'https://www.adamsanderson.co.uk'
		);
		await use(adamSandersonCoUk);
	}
});

export { expect } from '@playwright/test';
