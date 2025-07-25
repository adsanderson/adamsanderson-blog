/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    exclude: ['**/node_modules/**', '**/e2e/**', 'src/**/*.astro.test.{js,ts}'],
    include: ['src/**/*.test.{js,ts}'],
    environment: 'node',
  },
});
