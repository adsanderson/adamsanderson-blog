import { test } from '../fixtures'

test('AdamSanderson.co.uk', async ({ adamSandersonCoUk }) => {
    await adamSandersonCoUk.goto();
    await adamSandersonCoUk.expectToSeePosts();
});