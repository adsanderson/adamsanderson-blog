import { defineWorkspace } from 'vitest/config'

export default defineWorkspace([
  {
    extends: 'vite.config.ts',
    test: {
      // an example of file based convention,
      // you don't have to follow it
      include: [
        'src/**/*.unit.{test,spec}.{js,ts}',
      ],
      name: 'unit',
      environment: 'node',
    },
  },
  {
    extends: 'vite.config.ts',
    test: {
      // an example of file based convention,
      // you don't have to follow it
      include: [
        'src/**/*.browser.{test,spec}.ts',
      ],
      name: 'browser',
      browser: {
        enabled: true,
        provider: 'playwright',
        instances: [
          { browser: 'chromium' },
        ],
        headless: true,
      },
      setupFiles: ['./vitest.setup.ts'],
    },
  },
])
