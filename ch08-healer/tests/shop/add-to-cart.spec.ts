// spec: specs/shop-search-and-checkout.md
// seed: tests/seed-shop.spec.ts

import { test, expect } from './fixtures';

test.describe('Adding Products to the Cart', () => {
  test('Add a Single Product', async ({ page }) => {
    // 1. Open the shop page
    //   (handled by the shop fixture in tests/shop/fixtures.ts)

    // 2. Click "黒色のキーボードをカートに追加"
    await page
      .getByRole('button', { name: '黒色のキーボードをカートに追加' })
      .click();

    // Expected Results:
    // - The cart counter shows "1"
    await expect(page.locator('#cart-count')).toHaveText('1');
  });
});
