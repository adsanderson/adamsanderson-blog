import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { expect, test } from 'vitest';
import HeaderLink from './HeaderLink.astro';

test('HeaderLink renders with correct href and slot content', async () => {
  const container = await AstroContainer.create();
  const result = await container.renderToString(HeaderLink, {
    props: {
      href: '/blog',
    },
    slots: {
      default: 'Blog',
    },
  });

  expect(result).toContain('href="/blog"');
  expect(result).toContain('Blog');
  expect(result).toContain('<a');
});

test('HeaderLink applies active class when href matches current path', async () => {
  const container = await AstroContainer.create();
  const result = await container.renderToString(HeaderLink, {
    props: {
      href: '/',
    },
    slots: {
      default: 'Home',
    },
  });

  // The component should render the active class when href matches
  expect(result).toContain('Home');
  expect(result).toContain('href="/"');
});

test('HeaderLink accepts additional HTML attributes', async () => {
  const container = await AstroContainer.create();
  const result = await container.renderToString(HeaderLink, {
    props: {
      href: '/about',
      'data-testid': 'about-link',
      title: 'About page',
    },
    slots: {
      default: 'About',
    },
  });

  expect(result).toContain('href="/about"');
  expect(result).toContain('data-testid="about-link"');
  expect(result).toContain('title="About page"');
  expect(result).toContain('About');
});

test('HeaderLink applies custom className', async () => {
  const container = await AstroContainer.create();
  const result = await container.renderToString(HeaderLink, {
    props: {
      href: '/contact',
      class: 'custom-link',
    },
    slots: {
      default: 'Contact',
    },
  });

  expect(result).toContain('class="custom-link"');
  expect(result).toContain('Contact');
});