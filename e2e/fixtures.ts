import { test as base } from '@playwright/test';
import { AdamSandersonBlog } from './adamsanderson.dsl';
import { AdamSandersonCoUkWeb } from './adamsanderson.drivers';

type FixtureTestArgs = {
	adamSandersonCoUk: AdamSandersonBlog;
};

export const test = base.extend<FixtureTestArgs>({
	adamSandersonCoUk: async ({ page }, use) => {
		const adamSandersonCoUk = new AdamSandersonCoUkWeb(page);
		await use(adamSandersonCoUk);
	}
});

export { expect } from '@playwright/test';

