# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Development Commands

### Development Server
- `pnpm dev` - Start Astro development server on http://localhost:4321
- `pnpm preview` - Preview production build locally using Wrangler

### Build & Deploy
- `pnpm build` - Build production version for Cloudflare Workers
- `pnpm deploy` - Deploy to Cloudflare Workers using Wrangler
- `pnpm check` - Check build and TypeScript types, dry-run deploy

### Code Quality
- `pnpm lint` - Run linting (not yet configured)
- `pnpm format` - Format code (not yet configured)

### Testing
- `pnpm test` - Run all Playwright tests
- `pnpm test:e2e` - Run acceptance/end-to-end tests
- `pnpm test:exploratory` - Run exploratory tests (visual, performance, accessibility)
- `pnpm test:headed` - Run tests in headed mode (visible browser)
- `pnpm test:debug` - Run tests in debug mode
- `pnpm test:unit` - Run Vitest unit tests in watch mode
- `pnpm test:unit:run` - Run Vitest unit tests once
- `pnpm test:unit:ui` - Run Vitest with UI interface
- `pnpm test:component` - Run Astro component tests in watch mode
- `pnpm test:component:run` - Run Astro component tests once

## Architecture Overview

This is an Astro-based blog application deployed to Cloudflare Workers with the following key architectural patterns:

### Content Management
- **Blog Posts**: Stored as `.md` files in `src/content/blog/`
- **Content Collections**: Uses Astro's content collections for type-safe blog post handling
- **Dynamic Routing**: Blog posts accessible via `/blog/[...slug]` pattern
- **Frontmatter**: Posts include frontmatter for metadata (title, description, pubDate, tags)

### Core Framework
- **Astro**: Static site generator with islands architecture
- **Cloudflare Workers**: Serverless deployment target
- **MDX Support**: Enhanced markdown with embedded components
- **RSS Generation**: Automatic RSS feed generation at `/rss.xml`

### Styling & UI
- **Tailwind CSS**: Primary styling framework with plugins:
  - `@tailwindcss/typography` - Enhanced typography for markdown content
  - `@tailwindcss/container-queries` - Container-based responsive design
  - `@tailwindcss/aspect-ratio` - Aspect ratio utilities
- **Global Styles**: Custom CSS variables for light/dark mode support
- **Fonts**: Fira Mono for code, system fonts for body text
- **Nord Theme**: Code highlighting theme

### Testing Strategy
- **Playwright**: End-to-end testing framework
- **Acceptance Tests**: Core user journey tests in `e2e/acceptance-tests/`
- **Exploratory Tests**: Advanced testing including:
  - Visual regression testing
  - Accessibility snapshot testing
  - Performance testing
- **Test Drivers**: Domain-specific language for blog testing
- **Multi-browser**: Tests run across Chromium, Firefox, WebKit, and mobile
- **Vitest**: Unit testing framework with Astro component support
- **Component Testing**: Uses Astro's container API for testing components with `*.astro.test.ts` naming
- **Unit Testing**: Standard Vitest for utility functions with `*.test.ts` naming

### Data Flow
1. Markdown files in `src/content/blog/` are processed by Astro content collections
2. Content collections provide type-safe data access
3. Blog posts are rendered via dynamic routing
4. RSS feed is generated from content collections
5. Static site generation optimizes performance

### Performance & Deployment
- **Static Generation**: Pre-rendered pages for optimal performance
- **Cloudflare Workers**: Edge deployment for global performance
- **Image Optimization**: Astro's built-in image optimization
- **RSS Feed**: Automated feed generation with proper caching headers
- **Error Monitoring**: Sentry integration for error tracking and performance monitoring
- **CI/CD Pipeline**: GitHub Actions for automated testing and deployment

## Key Files to Understand

- `src/content/blog/` - Blog post markdown files
- `src/content.config.ts` - Content collection schema and configuration
- `src/pages/blog/[...slug].astro` - Dynamic blog post page template
- `src/pages/rss.xml.js` - RSS feed generation
- `src/styles/global.css` - Global styles with CSS variables
- `astro.config.mjs` - Astro configuration with integrations
- `tailwind.config.mjs` - Tailwind CSS configuration
- `playwright.config.ts` - Playwright testing configuration
- `vitest.config.ts` - Vitest unit testing configuration
- `wrangler.json` - Cloudflare Workers deployment configuration
- `src/sentry.client.config.ts` - Sentry client-side configuration
- `src/sentry.server.config.ts` - Sentry server-side configuration
- `.github/workflows/` - GitHub Actions CI/CD workflows

## Development Notes

### Content Collection Schema
Blog posts support the following frontmatter fields:
- `title` (required) - Post title
- `description` (optional) - Post description/summary
- `pubDate` (optional) - Publication date
- `publishDate` (optional) - Alternative publication date field
- `tags` (optional) - Array of tag strings
- `heroImage` (optional) - Hero image URL

### Testing Patterns
- Tests use a domain-specific language (DSL) pattern
- Page Object Model with driver classes for different interfaces
- Comprehensive snapshot testing for regressions
- Performance testing with Lighthouse integration
- Accessibility testing with aria-snapshot comparisons

### Deployment
- Production deployment to Cloudflare Workers
- Wrangler CLI for deployment management
- Site URL: https://www.adamsanderson.co.uk
- RSS feed available at /rss.xml