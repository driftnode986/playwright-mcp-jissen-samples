import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { test, expect } from '@playwright/test';

const RENAMED_URL = pathToFileURL(
  path.resolve(__dirname, '..', '..', 'apps', 'shop-renamed.html'),
).toString();

test.describe('CSS class の壊れ方（class 変更で 0 件）', () => {
  test('元の class は 0 件マッチになる', async ({ page }) => {
    await page.goto(RENAMED_URL);
    const oldClass = page.locator('button.product-button');
    await expect(oldClass).toHaveCount(0);
  });

  test('新しい class に追従しないと操作不能', async ({ page }) => {
    await page.goto(RENAMED_URL);
    const newClass = page.locator('button.btn-cart');
    await expect(newClass).toHaveCount(3);
  });
});
