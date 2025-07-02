# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Development Commands

### Development Server
- `pnpm dev` - Start development server
- `pnpm preview` - Preview production build locally

### Build & Deploy
- `pnpm build` - Build production version
- `pnpm start` - Start production server from build

### Code Quality
- `pnpm check` - Run Svelte type checking
- `pnpm format` - Format code with Prettier
- `pnpm lint` - Run ESLint and Prettier checks

### Testing
- `pnpm test` - Run all tests (unit + e2e)
- `pnpm test:unit` - Run unit tests with Vitest
- `pnpm test:e2e` - Run Playwright end-to-end tests (excludes exploratory tests)
- `pnpm test:browser` - Run browser-based component tests

## Architecture Overview

This is a SvelteKit-based blog application with the following key architectural patterns:

### Content Management
- **Markdown Posts**: Blog posts are stored as `.md` files in `src/posts/`
- **MDSvex Integration**: Uses MDSvex for processing markdown with Svelte components
- **Dynamic Routing**: Blog posts accessible via `/blog/[slug]` pattern
- **Metadata Handling**: Posts include frontmatter for metadata (title, date, tags)

### Core Components
- **Blog List Processing**: `src/lib/bloglist.js` handles filtering and sorting posts
- **RSS Generation**: Automatic RSS feed generation at `/rss.xml`
- **Component Library**: Reusable components in `src/lib/Components/`

### Data Flow
1. Markdown files in `src/posts/` are processed by MDSvex
2. `bloglist.js` filters and sorts posts based on publish state
3. SvelteKit's file-based routing serves content via dynamic routes
4. Components render structured content with proper metadata

### Styling & UI
- **Tailwind CSS**: Primary styling framework
- **Component-scoped styles**: Svelte's scoped CSS for specific components
- **Typography**: Tailwind Typography plugin for markdown content
- **Responsive Design**: Mobile-first approach with container queries

### Testing Strategy
- **Unit Tests**: Vitest for component and utility testing
- **E2E Tests**: Playwright for full application testing
- **Browser Tests**: Vitest browser mode for component integration tests
- **Exploratory Tests**: Separate test suite for experimental features (marked with `@exploratory`)

### Performance & Monitoring
- **OpenTelemetry**: Distributed tracing for performance monitoring
- **Sentry**: Error tracking and performance monitoring
- **Prerendering**: Static generation for better performance

### Deployment
- **Fly.io**: Production deployment configuration in `fly.toml`
- **Node.js Adapter**: Uses SvelteKit's Node adapter for server-side rendering
- **Dockerized**: Includes Dockerfile for containerized deployment

## Key Files to Understand

- `src/routes/+page.js` - Home page data loading
- `src/routes/blog/[slug]/+page.server.ts` - Dynamic blog post loading
- `src/lib/bloglist.js` - Core blog filtering and sorting logic
- `mdsvex.config.js` - Markdown processing configuration
- `playwright.config.ts` - E2E testing configuration with multiple browser projects