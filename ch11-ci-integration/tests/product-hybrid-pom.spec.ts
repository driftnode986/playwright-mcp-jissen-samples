import { test, expect } from '../fixtures.js';

test.describe('HybridProductPage 探索系メソッド', () => {
  test('discover で先頭の追加可能商品をカートに入れる', async ({ hybridProductPage }) => {
    await hybridProductPage.discoverAndAddFirstAvailable();
    await expect(hybridProductPage.cartCount).toHaveText('1');
  });

  test('findBy でキーワード一致をすべて追加', async ({ hybridProductPage }) => {
    await hybridProductPage.findByKeywordAndAddAll('マウス');
    await expect(hybridProductPage.cartCount).toHaveText('1');
  });
});
