import { test, expect } from '../fixtures.js';

test.describe('ProductPage 純 POM', () => {
  test('検索 → カートに追加 → 件数確認', async ({ productPage }) => {
    await productPage.search('キーボード');
    await productPage.addToCartByName('黒色のキーボード');
    await expect(productPage.cartCount).toHaveText('1');
  });

  test('test id で確実にカートへ', async ({ productPage }) => {
    await productPage.addToCartByTestId('p001');
    await productPage.addToCartByTestId('p002');
    await expect(productPage.cartCount).toHaveText('2');
  });
});
