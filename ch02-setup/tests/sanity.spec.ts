import { test, expect } from '@playwright/test';

test('example.com のタイトルを取得できる', async ({ page }) => {
  await page.goto('https://example.com/');
  await expect(page).toHaveTitle('Example Domain');
});
