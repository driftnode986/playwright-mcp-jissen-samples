import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { test, expect } from '@playwright/test';

const SHOP_URL = pathToFileURL(
  path.resolve(__dirname, '..', '..', 'apps', 'shop.html'),
).toString();

test.describe('CSS class 依存（アンチパターン）', () => {
  test('CSS class で要素を取得できる（壊れやすい）', async ({ page }) => {
    await page.goto(SHOP_URL);
    const buttons = page.locator('button.product-button');
    await expect(buttons).toHaveCount(3);

    await buttons.first().click();
    await expect(page.getByText('カート: 1 件')).toBeVisible();
  });
});
