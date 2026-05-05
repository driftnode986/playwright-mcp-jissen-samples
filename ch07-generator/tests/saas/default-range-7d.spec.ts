// spec: specs/saas-dashboard-basic.md
// seed: tests/seed-saas.spec.ts

import { test, expect } from './fixtures';

test.describe('Inspecting KPIs', () => {
  test('Default Range Shows 7 Day KPIs', async ({ page }) => {
    // 1. Open the SaaS dashboard page
    //   (handled by the saas fixture in tests/saas/fixtures.ts)

    // Expected Results:
    // - The "7 日" range button has aria-pressed="true"
    const range7d = page.getByRole('button', { name: '7 日' });
    await expect(range7d).toHaveAttribute('aria-pressed', 'true');

    // - The active users tile shows "1230"
    await expect(page.locator('#kpi-users')).toHaveText('1230');

    // - The revenue tile shows "482000"
    await expect(page.locator('#kpi-revenue')).toHaveText('482000');

    // - The churn rate tile shows "2.1%"
    await expect(page.locator('#kpi-churn')).toHaveText('2.1%');
  });
});
