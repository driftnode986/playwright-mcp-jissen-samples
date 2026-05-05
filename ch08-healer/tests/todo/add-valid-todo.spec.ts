// spec: specs/todo-basic-operations.md
// seed: tests/seed-todo.spec.ts

import { test, expect } from './fixtures';

test.describe('Adding Todos', () => {
  test('Add a Valid Todo', async ({ page }) => {
    // 1. Click the input field labeled "タスク"
    const taskInput = page.getByRole('textbox', { name: 'タスク' });
    await taskInput.click();

    // 2. Type "牛乳を買う"
    await taskInput.fill('牛乳を買う');

    // 3. Press Enter
    await taskInput.press('Enter');

    // Expected Results:
    // - The new todo appears in the list with an unchecked checkbox
    const newTodoCheckbox = page.getByRole('checkbox', {
      name: '牛乳を買う を完了にする',
    });
    await expect(newTodoCheckbox).toBeVisible();
    await expect(newTodoCheckbox).not.toBeChecked();

    // - The active counter shows "1"
    await expect(page.locator('#active-count')).toHaveText('1');

    // - The input field is cleared and ready for the next entry
    await expect(taskInput).toHaveValue('');
  });
});
