// spec: specs/saas-dashboard-basic.md
// seed: tests/seed-saas.spec.ts

import { test, expect } from './fixtures';

test.describe('Browsing Alerts', () => {
  test('Open an Alert Detail', async ({ page }) => {
    // 1. Open the SaaS dashboard page
    //   (handled by the saas fixture in tests/saas/fixtures.ts)

    // 2. Click the alert titled "API レイテンシ高騰"
    await page
      .getByRole('button', { name: 'API レイテンシ高騰' })
      .click();

    // Expected Results:
    // - The detail section becomes visible
    const detailHeading = page.getByRole('heading', {
      name: 'アラート詳細',
    });
    await expect(detailHeading).toBeVisible();

    // - The detail body text matches the alert payload
    await expect(page.locator('#detail-body')).toHaveText(
      '直近 5 分で p95 が 800ms を超えています。',
    );
  });
});
