import { test, expect } from '@playwright/test';
import { pathToFileURL } from 'node:url';
import path from 'node:path';

test('seed', async ({ page }) => {
  const url = pathToFileURL(
    path.resolve(__dirname, '..', 'apps', 'todo.html'),
  ).toString();
  await page.goto(url);
  await expect(page.getByRole('heading', { name: 'Todo アプリ' })).toBeVisible();
});
