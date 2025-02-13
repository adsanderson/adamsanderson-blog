import { expect, test as base, describe } from 'vitest'
import { render } from 'vitest-browser-svelte'
import HomeLink from './HomeLink.svelte'
import type { ComponentProps } from 'svelte'

const test = base.extend<{
  homeLink: (props: ComponentProps<typeof HomeLink>) => ReturnType<typeof render<typeof HomeLink>>
}>({
  homeLink: async ({ }, use) => {
    await use((props) => render(HomeLink, props))
  }
});

test('should show the title of the blog post', async ({ homeLink }) => {
  const screen = homeLink({
    post: {
      description: 'Hi',
      title: 'A post title',
      slug: '/hello',
    }
  })
  await expect.element(screen.getByText('A post title')).toBeInTheDocument()
})

test('should show the description of the blog post', async ({ homeLink }) => {
  const screen = homeLink({
    post: {
      description: 'This is a test description',
      title: 'Test Title',
      slug: '/test-title',
    }
  })
  await expect.element(screen.getByText('This is a test description')).toBeInTheDocument()
})

test('should create an hyperlink reference from the slug', async ({ homeLink }) => {
  const screen = homeLink({
    post: {
      description: 'Another description',
      title: 'Another Title',
      slug: 'another-title',
    }
  })
  await expect.element(screen.getByRole('link', { name: 'Another Title' })).toHaveAttribute('href', '/blog/another-title')
})

test('should format the post slug correctly by replacing spaces with underscores and converting to lowercase', async ({ homeLink }) => {
  const screen = homeLink({
    post: {
      description: '',
      title: 'Another Title',
      slug: 'another TITLE with spaces',
    }
  })

  const link = screen.getByRole('link', { name: 'Another Title' })

  const href = link.element().getAttribute('href')

  await expect(href).toBe('/blog/another_title_with_spaces')
})
