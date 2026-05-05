import { test as base, expect } from '@playwright/test';
import { pathToFileURL } from 'node:url';
import path from 'node:path';

export const test = base.extend({
  page: async ({ page }, use) => {
    const url = pathToFileURL(
      path.resolve(__dirname, '..', '..', 'apps', 'saas.html'),
    ).toString();
    await page.goto(url);
    await use(page);
  },
});

export { expect };
