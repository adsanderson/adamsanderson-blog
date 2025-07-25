# AGENTS.md

This file provides guidance for agentic coding agents working with this Astro blog codebase.

## Build/Test Commands
- `pnpm dev` - Start development server on http://localhost:4321
- `pnpm build` - Build production version for Cloudflare Workers
- `pnpm check` - Build, typecheck, and dry-run deploy
- `pnpm test` - Run all Playwright tests
- `pnpm test:e2e` - Run acceptance tests only
- `pnpm test:exploratory` - Run visual/performance/accessibility tests
- `playwright test e2e/acceptance-tests/adamsanderson.spec.ts` - Run single test file
- `playwright test --grep "test name"` - Run specific test by name

## Code Style Guidelines
- **TypeScript**: Strict mode enabled, use proper types for all interfaces
- **Imports**: Use Astro content collections (`astro:content`) for blog data
- **Naming**: camelCase for variables/functions, PascalCase for types/interfaces
- **Formatting**: Tabs for indentation, single quotes preferred
- **Error Handling**: Use optional chaining and proper type guards
- **Components**: Astro components use `.astro` extension, TypeScript interfaces in separate files
- **Testing**: Use domain-specific language pattern with driver classes for complex test scenarios

## Architecture Notes
- Blog posts are markdown files in `src/content/blog/` managed by Astro content collections
- Deployment target is Cloudflare Workers via Wrangler
- Testing uses Playwright with visual regression, accessibility, and performance testing