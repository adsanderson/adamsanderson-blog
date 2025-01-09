import { type Page, test as base } from '@playwright/test';
import { AdamSandersonBlog } from './adamsanderson.dsl';
import { AdamSandersonCoUkWeb } from './adamsanderson.driver.web';
import { AdamSandersonBlogRSS } from './adamsanderson.driver.rss';
import { AdamSandersonCoUkWebKeyboard } from './adamsanderson.driver.web.keyboard';
import { logger } from './tools/test-logger';
import { PagePerformance } from './tools/performance';

type FixtureTestArgs = {
	adamSandersonCoUk: AdamSandersonBlog;
	logger: typeof logger;
	performance: PagePerformance;
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
			baseURL || 'http://localhost:5173'
		);
		await use(adamSandersonCoUk);
	},
	logger: async ({}, use) => {
		await use(logger);
	},
	performance: async ({ page }, use) => {
		await use(new PagePerformance(page));
	}
});

export { expect } from '@playwright/test';
