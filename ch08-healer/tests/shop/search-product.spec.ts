// spec: specs/shop-search-and-checkout.md
// seed: tests/seed-shop.spec.ts

import { test, expect } from './fixtures';

test.describe('Searching by Keyword', () => {
  test('Search for an Existing Product', async ({ page }) => {
    // 1. Type "キーボード" into the search field
    const searchField = page.getByLabel('検索ワード');
    await searchField.fill('キーボード');

    // 2. Click the "検索" button
    await page.getByRole('button', { name: '検索' }).click();

    // Expected Results:
    // - The product list shows only the keyboard products
    const items = page.getByLabel('商品一覧').getByRole('listitem');
    await expect(items).toHaveCount(2);
    await expect(items.nth(0)).toContainText('黒色のキーボード');
    await expect(items.nth(1)).toContainText('白色のキーボード');

    // - The page indicator shows "1 / 1"
    await expect(page.locator('#page-indicator')).toHaveText('1 / 1');
  });
});
