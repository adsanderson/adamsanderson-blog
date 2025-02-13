import { expect, test as base } from 'vitest'
import { render } from 'vitest-browser-svelte'
import Hero from './Hero.svelte'

const test = base.extend<{
  hero: ReturnType<typeof render>
}>({
  hero: async ({ }, use) => {
    const renderResult = render(Hero)
    await use(renderResult)
  }
});

test('should show blogs name', async ({ hero }) => {
  await expect.element(hero.getByText('Devtings')).toBeInTheDocument()
})

test('shouild show my name as author', async ({ hero }) => {
  await expect.element(hero.getByText('Adam Sanderson')).toBeInTheDocument()
})
