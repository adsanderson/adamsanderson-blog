import { test as base } from '@playwright/test'
import { AdamSandersonCoUk } from './adamsanderson.dsl'
import { AdamSandersonCoUkWeb } from './adamsanderson.drivers'

type FixtureTestArgs = {
    adamSandersonCoUk: AdamSandersonCoUk
}

export const test = base.extend<FixtureTestArgs>({
    adamSandersonCoUk: async ({ page }, use) => {
        const adamSandersonCoUk = new AdamSandersonCoUkWeb(page);
        await use(adamSandersonCoUk);
    }
})

export { expect } from '@playwright/test' 