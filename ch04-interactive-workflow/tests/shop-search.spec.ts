import { test, expect } from '@playwright/test';
import { pathToFileURL } from 'node:url';
import path from 'node:path';

const shopUrl = pathToFileURL(
  path.resolve(__dirname, '../examples/shop.html')
).toString();

test.describe('商品検索フロー（Phase 4 で生成されたテストの最終形）', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(shopUrl);
  });

  test('検索ワードに一致する商品だけが表示される', async ({ page }) => {
    await page.getByLabel('検索ワード').fill('キーボード');
    await page.getByRole('button', { name: '検索' }).click();

    const items = page.getByRole('list', { name: '商品一覧' }).getByRole('listitem');
    await expect(items).toHaveCount(2);
    await expect(items.first()).toContainText('黒色のキーボード');
    await expect(items.last()).toContainText('白色のキーボード');
  });

  test('該当が PAGE_SIZE を超えるとページ送りで残りを参照できる', async ({ page }) => {
    await page.getByLabel('検索ワード').fill('');
    await page.getByRole('button', { name: '検索' }).click();

    await expect(page.getByText('1 / 3')).toBeVisible();
    await page.getByRole('button', { name: '次のページ' }).click();
    await expect(page.getByText('2 / 3')).toBeVisible();
    await expect(
      page.getByRole('list', { name: '商品一覧' })
    ).toContainText('有線マウス');
  });

  test('カートに追加するとヘッダーの件数が更新される', async ({ page }) => {
    await page
      .getByRole('button', { name: '黒色のキーボードをカートに追加' })
      .click();
    await page
      .getByRole('button', { name: 'ワイヤレスマウスをカートに追加' })
      .click();

    await expect(page.locator('#cart-count')).toHaveText('2');
  });
});
