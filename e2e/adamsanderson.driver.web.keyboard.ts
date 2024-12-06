import { type AdamSandersonBlog } from './adamsanderson.dsl';
import { type Locator, type Page } from '@playwright/test';
import { AdamSandersonCoUkWeb } from './adamsanderson.driver.web';

export class AdamSandersonCoUkWebKeyboard extends AdamSandersonCoUkWeb {
	constructor(page: Page, baseURL: string) {
		super(page, baseURL);
	}

	private async keyboardSelect(locator: Locator, maxIterations = 50): Promise<void> {
		for (let i = 0; i < maxIterations; i++) {
			const isFocused = await locator.evaluate((el) => el === document.activeElement);

			if (isFocused) {
				await this.page.keyboard.press('Enter');
				return;
			}
			await this.page.keyboard.press('Tab');
		}
		throw new Error(`Could not focus element within ${maxIterations} tabs`);
	}

	accessPost: AdamSandersonBlog['accessPost'] = async (selector) => {
		if (selector.type === 'title') {
			await this.keyboardSelect(this.page.getByRole('link', { name: selector.title }));
			return;
		}
		throw new Error('Selector not implemented');
	};
}
