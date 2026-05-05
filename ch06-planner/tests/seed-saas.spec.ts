import { test, expect } from '@playwright/test';
import { pathToFileURL } from 'node:url';
import path from 'node:path';

test('seed: saas dashboard boots', async ({ page }) => {
  const url = pathToFileURL(
    path.resolve(__dirname, '..', 'apps', 'saas.html'),
  ).toString();
  await page.goto(url);
  await expect(page.getByRole('heading', { name: '運用ダッシュボード' })).toBeVisible();
  await expect(page.getByRole('button', { name: '7 日', pressed: true })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'KPI' })).toBeVisible();
  await expect(page.getByRole('heading', { name: '最近のアラート' })).toBeVisible();
});
