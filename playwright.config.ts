import { defineConfig, devices, PlaywrightTestConfig } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

const baseURL =
	process.env.TEST_ENV !== 'live' ? 'http://localhost:4321' : 'https://www.adamsanderson.co.uk';

const localTestConfig: PlaywrightTestConfig = {
	webServer: {
		command: 'pnpm dev --host',
		stdout: 'pipe',
		url: baseURL,
		reuseExistingServer: !process.env.CI
	}
};

const extendedConfig = process.env.TEST_ENV !== 'live' ? localTestConfig : {};

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
	testDir: './e2e',
	/* Run tests in files in parallel */
	fullyParallel: true,
	/* Fail the build on CI if you accidentally left test.only in the source code. */
	forbidOnly: !!process.env.CI,
	/* Retry on CI only */
	retries: process.env.CI ? 2 : 0,
	/* Opt out of parallel tests on CI. */
	workers: process.env.CI ? 1 : undefined,
	/* Reporter to use. See https://playwright.dev/docs/test-reporters */
	reporter: 'html',
	expect: {
		toHaveScreenshot: {
			pathTemplate: '{testDir}/__screenshots__{/projectName}/{testFilePath}/{arg}{ext}',
		},
		toMatchAriaSnapshot: {
			pathTemplate: '{testDir}/__snapshots__/{testFilePath}/{arg}{ext}',
		},
	},
	/* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
	use: {
		/* Base URL to use in actions like `await page.goto('/')`. */
		// baseURL: 'http://127.0.0.1:3000',

		/* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
		trace: 'on-first-retry'
	},

	/* Configure projects for major browsers */
	projects: [
		{
			name: 'chromium',
			use: { ...devices['Desktop Chrome'], baseURL }
		},

		{
			name: 'RSS',
			testMatch: 'e2e/acceptance-tests/**/*.spec.ts',
			use: { baseURL }
		},

		{
			name: 'chromium - keyboard',
			use: { ...devices['Desktop Chrome'], baseURL }
		},
		{
			name: 'firefox',
			use: { ...devices['Desktop Firefox'], baseURL }
		},

		{
			name: 'webkit',
			use: { ...devices['Desktop Safari'], baseURL }
		},

		/* Test against mobile viewports. */
		{
			name: 'Mobile Chrome',
			use: { ...devices['Pixel 5'], baseURL }
		},
		{
			name: 'Mobile Safari',
			use: { ...devices['iPhone 12'], baseURL }
		}

		/* Test against branded browsers. */
		// {
		// 	name: 'Microsoft Edge',
		// 	use: { ...devices['Desktop Edge'], channel: 'msedge' }
		// },
		// {
		// 	name: 'Google Chrome',
		// 	use: { ...devices['Desktop Chrome'], channel: 'chrome' }
		// }
	],

	...extendedConfig
});
