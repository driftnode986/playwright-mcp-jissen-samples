import { test, expect } from '@playwright/test';
import { pathToFileURL } from 'node:url';
import path from 'node:path';

const loginUrl = pathToFileURL(
  path.resolve(__dirname, '../examples/login-form.html')
).toString();
const duplicateUrl = pathToFileURL(
  path.resolve(__dirname, '../examples/duplicate-buttons.html')
).toString();

test('getByRole / getByLabel でログインフォームを操作できる', async ({ page }) => {
  await page.goto(loginUrl);

  await page.getByLabel('メールアドレス').fill('user@example.com');
  await page.getByLabel('パスワード').fill('s3cret');
  await page.getByRole('checkbox', { name: 'ログイン状態を保存する' }).check();

  await expect(page.getByRole('button', { name: 'ログイン' })).toBeEnabled();
});

test('同名のボタンは ancestor の見出しで disambiguate する', async ({ page }) => {
  await page.goto(duplicateUrl);

  const productB = page
    .getByRole('listitem')
    .filter({ has: page.getByRole('heading', { name: '商品 B' }) });

  await productB.getByRole('button', { name: 'カートに追加' }).click();
});
