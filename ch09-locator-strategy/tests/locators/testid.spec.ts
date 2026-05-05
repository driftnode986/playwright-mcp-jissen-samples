import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { test, expect } from '@playwright/test';

const SHOP_URL = pathToFileURL(
  path.resolve(__dirname, '..', '..', 'apps', 'shop.html'),
).toString();

test.describe('getByTestId 主体（DOM 構造非依存）', () => {
  test('data-testid で要素を一意特定', async ({ page }) => {
    await page.goto(SHOP_URL);
    await page.getByTestId('add-to-cart-p001').click();
    await page.getByTestId('add-to-cart-p002').click();

    await expect(page.getByText('カート: 2 件')).toBeVisible();
  });

  test('複数要素の testid を ID 部分で絞り込み', async ({ page }) => {
    await page.goto(SHOP_URL);
    const allCartButtons = page.locator('[data-testid^="add-to-cart-"]');
    await expect(allCartButtons).toHaveCount(3);
  });
});
