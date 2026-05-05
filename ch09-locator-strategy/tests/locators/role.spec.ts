import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { test, expect } from '@playwright/test';

const SHOP_URL = pathToFileURL(
  path.resolve(__dirname, '..', '..', 'apps', 'shop.html'),
).toString();

test.describe('getByRole 主体（推奨）', () => {
  test('検索 → role と name でカートに追加', async ({ page }) => {
    await page.goto(SHOP_URL);
    await page.getByRole('searchbox', { name: '検索ワード' }).fill('キーボード');
    await page.getByRole('button', { name: '検索' }).click();

    const target = page.getByRole('button', {
      name: '黒色のキーボードをカートに追加',
    });
    await target.click();

    await expect(page.getByText('カート: 1 件')).toBeVisible();
  });

  test('filter で listitem を絞り込んでから操作', async ({ page }) => {
    await page.goto(SHOP_URL);
    const item = page
      .getByRole('listitem')
      .filter({ hasText: 'ワイヤレスマウス' });
    await item.getByRole('button').click();
    await expect(page.getByText('カート: 1 件')).toBeVisible();
  });
});
