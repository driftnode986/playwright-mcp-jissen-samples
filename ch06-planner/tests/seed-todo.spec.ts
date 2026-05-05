import { test, expect } from '@playwright/test';
import { pathToFileURL } from 'node:url';
import path from 'node:path';

test('seed: todo app boots', async ({ page }) => {
  const url = pathToFileURL(
    path.resolve(__dirname, '..', 'apps', 'todo.html'),
  ).toString();
  await page.goto(url);
  const heading = page.getByRole('heading', { name: 'Todo アプリ' });
  const input = page.getByPlaceholder('What needs to be done?');
  const allFilter = page.getByRole('button', { name: 'All', pressed: true });
  await expect(heading).toBeVisible();
  await expect(input).toBeVisible();
  await expect(allFilter).toBeVisible();
});
