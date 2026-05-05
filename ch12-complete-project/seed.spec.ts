import { test, expect } from '@playwright/test';

// init-agents が生成する seed.spec.ts. Test Agents (Planner / Generator) は
// 本ファイルから page fixture を共有するための bootstrap として参照する.
test.describe('Test group', () => {
  test('seed', async ({ page }) => {
    await page.goto('about:blank');
    await expect(page).toHaveURL('about:blank');
  });
});
