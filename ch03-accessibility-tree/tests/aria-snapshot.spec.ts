import { test, expect } from '@playwright/test';
import { pathToFileURL } from 'node:url';
import path from 'node:path';

const loginUrl = pathToFileURL(
  path.resolve(__dirname, '../examples/login-form.html')
).toString();

test('ログインフォームの ARIA snapshot がテンプレートと一致する', async ({ page }) => {
  await page.goto(loginUrl);

  await expect(page.locator('main')).toMatchAriaSnapshot(`
    - main:
      - heading "ログイン" [level=1]
      - form "アカウント情報":
        - heading "アカウント情報" [level=2]
        - text: メールアドレス
        - textbox "メールアドレス"
        - text: パスワード
        - textbox "パスワード"
        - checkbox "ログイン状態を保存する"
        - text: ログイン状態を保存する
        - button "ログイン"
        - paragraph:
          - link "パスワードを忘れた場合":
            - /url: /forgot
  `);
});
