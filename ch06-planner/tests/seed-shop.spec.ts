import { test, expect } from '@playwright/test';
import { pathToFileURL } from 'node:url';
import path from 'node:path';

test('seed: shop app boots', async ({ page }) => {
  const url = pathToFileURL(
    path.resolve(__dirname, '..', 'apps', 'shop.html'),
  ).toString();
  await page.goto(url);
  await expect(page.getByRole('heading', { name: '商品検索', level: 1 })).toBeVisible();
  await expect(page.getByRole('search', { name: '商品検索' })).toBeVisible();
  await expect(page.getByLabel('商品一覧')).toBeVisible();
});
