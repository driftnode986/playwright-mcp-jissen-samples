import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { test, expect } from '@playwright/test';

const RENAMED_URL = pathToFileURL(
  path.resolve(__dirname, '..', '..', 'apps', 'shop-renamed.html'),
).toString();

test.describe('getByTestId の安定性（text/CSS 変更でも pass）', () => {
  test('text 変更後も同じ testid で操作できる', async ({ page }) => {
    await page.goto(RENAMED_URL);
    await page.getByTestId('add-to-cart-p001').click();
    await expect(page.getByText('カート: 1 件')).toBeVisible();
  });
});
