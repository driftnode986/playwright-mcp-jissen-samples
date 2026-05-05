import { test, expect } from '@playwright/test';
import { pathToFileURL } from 'node:url';
import path from 'node:path';

const signupUrl = pathToFileURL(
  path.resolve(__dirname, '../examples/signup.html')
).toString();

test.describe('登録フォームのバリデーション網羅', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(signupUrl);
  });

  test('未入力のまま送信すると 4 種のエラーが表示される', async ({ page }) => {
    await page.getByRole('button', { name: '登録する' }).click();

    await expect(
      page.getByRole('alert').filter({ hasText: '有効なメールアドレス' })
    ).toBeVisible();
    await expect(
      page.getByRole('alert').filter({ hasText: 'パスワードは 8 文字以上' })
    ).toBeVisible();
    await expect(
      page.getByRole('alert').filter({ hasText: '利用規約への同意が必要' })
    ).toBeVisible();
  });

  test('パスワード不一致を検出する', async ({ page }) => {
    await page.getByLabel('メールアドレス').fill('user@example.com');
    await page.getByLabel('パスワード（8 文字以上）').fill('Passw0rd!');
    await page.getByLabel('パスワードの確認').fill('Different!');
    await page.getByLabel('利用規約に同意する').check();

    await page.getByRole('button', { name: '登録する' }).click();

    await expect(
      page.getByRole('alert').filter({ hasText: 'パスワードが一致しません' })
    ).toBeVisible();
  });

  test('全項目が正しいと完了画面に遷移する', async ({ page }) => {
    await page.getByLabel('メールアドレス').fill('user@example.com');
    await page.getByLabel('パスワード（8 文字以上）').fill('Passw0rd!');
    await page.getByLabel('パスワードの確認').fill('Passw0rd!');
    await page.getByLabel('利用規約に同意する').check();

    await page.getByRole('button', { name: '登録する' }).click();

    await expect(
      page.getByRole('heading', { name: '登録が完了しました' })
    ).toBeVisible();
  });
});
