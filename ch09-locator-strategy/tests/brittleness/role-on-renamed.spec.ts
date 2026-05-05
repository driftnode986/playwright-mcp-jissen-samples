import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { test, expect } from '@playwright/test';

const RENAMED_URL = pathToFileURL(
  path.resolve(__dirname, '..', '..', 'apps', 'shop-renamed.html'),
).toString();

test.describe('getByRole の壊れ方（accessible name 変更で fail）', () => {
  test('元の name は 0 件マッチになる', async ({ page }) => {
    await page.goto(RENAMED_URL);
    const oldName = page.getByRole('button', {
      name: '黒色のキーボードをカートに追加',
    });
    await expect(oldName).toHaveCount(0);
  });

  test('新しい name に書き換えれば pass する', async ({ page }) => {
    await page.goto(RENAMED_URL);
    const newName = page.getByRole('button', {
      name: '黒色のキーボードをカゴに入れる',
    });
    await newName.click();
    await expect(page.getByText('カート: 1 件')).toBeVisible();
  });
});
