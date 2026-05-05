import { test, expect } from '@playwright/test';
import { pathToFileURL } from 'node:url';
import path from 'node:path';

const loginUrl = pathToFileURL(
  path.resolve(__dirname, '../examples/login.html')
).toString();

test.describe('既存ログインテストへのカバレッジ補強（Phase 4 生成テスト）', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(loginUrl);
  });

  test('既存テスト: 正しい資格情報でようこそ画面に遷移する', async ({ page }) => {
    await page.getByLabel('メールアドレス').fill('user@example.com');
    await page.getByLabel('パスワード').fill('Passw0rd!');
    await page.getByRole('button', { name: 'ログイン' }).click();

    await expect(
      page.getByRole('heading', { name: /ようこそ/ })
    ).toBeVisible();
  });

  test('補強 1: パスワードが 8 文字未満なら警告が出る', async ({ page }) => {
    await page.getByLabel('メールアドレス').fill('user@example.com');
    await page.getByLabel('パスワード').fill('short');
    await page.getByRole('button', { name: 'ログイン' }).click();

    await expect(
      page
        .getByRole('alert')
        .filter({ hasText: 'メールアドレスまたはパスワードが正しくありません' })
    ).toBeVisible();
  });

  test('補強 2: ログイン後のリロードで状態が永続化される', async ({ page }) => {
    await page.getByLabel('メールアドレス').fill('user@example.com');
    await page.getByLabel('パスワード').fill('Passw0rd!');
    await page.getByRole('button', { name: 'ログイン' }).click();
    await expect(
      page.getByRole('heading', { name: /ようこそ/ })
    ).toBeVisible();

    await page.reload();

    await expect(
      page.getByRole('heading', { name: /ようこそ/ })
    ).toBeVisible();
    await expect(page.locator('#login-form')).toBeHidden();
  });

  test('補強 3: 商品検索ページへのリンクが提示される', async ({ page }) => {
    await page.getByLabel('メールアドレス').fill('user@example.com');
    await page.getByLabel('パスワード').fill('Passw0rd!');
    await page.getByRole('button', { name: 'ログイン' }).click();

    await expect(
      page.getByRole('link', { name: '商品検索ページへ' })
    ).toHaveAttribute('href', './shop.html');
  });
});
