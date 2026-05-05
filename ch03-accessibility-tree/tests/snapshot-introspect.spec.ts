import { test } from '@playwright/test';
import { pathToFileURL } from 'node:url';
import path from 'node:path';

const loginUrl = pathToFileURL(
  path.resolve(__dirname, '../examples/login-form.html')
).toString();

test('ARIA snapshot の YAML 出力をログに残す', async ({ page }) => {
  await page.goto(loginUrl);

  const snapshot = await page.locator('main').ariaSnapshot();
  console.log('--- ariaSnapshot (default) ---');
  console.log(snapshot);
});
