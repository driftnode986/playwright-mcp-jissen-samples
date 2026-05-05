import { test, expect } from '../fixtures.js';

test.describe('LoginPage 純 POM', () => {
  test('成功ログインで welcome 表示', async ({ loginPage }) => {
    await loginPage.login('user@example.com', 'password123');
    await expect(loginPage.welcomeHeading).toBeVisible();
  });

  test('短いパスワードでエラー表示', async ({ loginPage }) => {
    await loginPage.login('user@example.com', 'short');
    await expect(loginPage.errorAlert).toBeVisible();
    await expect(loginPage.errorAlert)
      .toContainText('正しくありません');
  });
});
