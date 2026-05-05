import { test, expect } from '@playwright/test';

test('example.com に遷移してタイトルを取得できる', async ({ page }) => {
  await page.goto('https://example.com/');
  await expect(page).toHaveTitle('Example Domain');
});
