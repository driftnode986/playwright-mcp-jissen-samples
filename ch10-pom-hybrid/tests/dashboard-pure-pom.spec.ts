import { test, expect } from '../fixtures.js';

test.describe('DashboardPage 純 POM（認証済み）', () => {
  test('addInitScript 経由でユーザー名が表示される', async ({ authenticatedDashboardPage }) => {
    await expect(authenticatedDashboardPage.userEmail)
      .toHaveText('user@example.com');
  });

  test('KPI 値とナビゲーションが揃っている', async ({ authenticatedDashboardPage }) => {
    await expect(authenticatedDashboardPage.ordersKpi).toHaveText('12');
    await expect(authenticatedDashboardPage.cartKpi).toHaveText('3');
    await expect(authenticatedDashboardPage.shopLink).toBeVisible();
  });
});
