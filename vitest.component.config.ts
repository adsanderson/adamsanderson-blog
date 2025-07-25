/// <reference types="vitest" />
import { getViteConfig } from 'astro/config';

export default getViteConfig({
  test: {
    globals: true,
    exclude: ['**/node_modules/**', '**/e2e/**'],
    include: ['src/**/*.astro.test.{js,ts}'],
    environment: 'node',
  },
});