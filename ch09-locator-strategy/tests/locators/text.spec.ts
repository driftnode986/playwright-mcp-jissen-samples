import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { test, expect } from '@playwright/test';

const SHOP_URL = pathToFileURL(
  path.resolve(__dirname, '..', '..', 'apps', 'shop.html'),
).toString();

test.describe('getByText 主体（テキスト依存）', () => {
  test('テキスト一致でリンクや見出しを検証', async ({ page }) => {
    await page.goto(SHOP_URL);
    await expect(page.getByText('検索結果')).toBeVisible();
    await expect(page.getByText('カート: 0 件')).toBeVisible();
  });

  test('正規表現で部分一致', async ({ page }) => {
    await page.goto(SHOP_URL);
    const pattern = /黒色のキーボードをカートに追加/;
    const button = page.getByText(pattern);
    await button.click();
    await expect(page.getByText('カート: 1 件')).toBeVisible();
  });
});
