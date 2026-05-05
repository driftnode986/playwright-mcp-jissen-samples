// spec: specs/todo-basic-operations.md
// seed: tests/seed-todo.spec.ts

import { test, expect } from './fixtures';

test.describe('Completing Todos', () => {
  test('Mark a Todo as Completed', async ({ page }) => {
    const taskInput = page.getByRole('textbox', { name: 'タスク' });

    // 1. Add a todo named "資料レビュー"
    await taskInput.click();
    await taskInput.fill('資料レビュー');
    await taskInput.press('Enter');

    // 2. Click the checkbox associated with "資料レビュー"
    const reviewCheckbox = page.getByRole('checkbox', {
      name: '資料レビュー を完了にする',
    });
    await reviewCheckbox.click();

    // Expected Results:
    // - The checkbox becomes checked
    await expect(reviewCheckbox).toBeChecked();

    // - The active counter decreases by 1
    await expect(page.locator('#active-count')).toHaveText('0');

    // - The todo text is visually struck through
    const reviewText = page
      .getByRole('listitem')
      .filter({ hasText: '資料レビュー' })
      .locator('span');
    await expect(reviewText).toHaveCSS('text-decoration', /line-through/);
  });
});
