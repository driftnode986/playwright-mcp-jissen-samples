// Phase 2 出発点: 既存の純 POM で書かれた CRUD テスト.
// このスタイルは Ch10 の純 POM テンプレを踏襲. AI 操作は含まない.
import { test, expect } from '../../fixtures.js';

test.describe('TodoMVC CRUD (pure POM)', () => {
  test('add multiple todos and assert count', async ({ todoPage }) => {
    await todoPage.addTodo('item A');
    await todoPage.addTodo('item B');
    await todoPage.addTodo('item C');
    await expect(todoPage.todoItems).toHaveCount(3);
    await expect(todoPage.todoCount).toHaveText('3');
  });

  test('edit existing todo', async ({ todoPage }) => {
    await todoPage.addTodo('original title');
    await todoPage.editByTitle('original title', 'updated title');
    await expect(todoPage.todoItems.filter({ hasText: 'updated title' })).toHaveCount(1);
  });

  test('clear completed removes only completed', async ({ todoPage }) => {
    await todoPage.addTodo('keep me');
    await todoPage.addTodo('drop me');
    await todoPage.toggleByTitle('drop me');
    await todoPage.clearCompleted.click();
    await expect(todoPage.todoItems).toHaveCount(1);
    await expect(todoPage.todoItems).toHaveText(['keep me']);
  });

  test('filter by status', async ({ todoPage }) => {
    await todoPage.addTodo('active task');
    await todoPage.addTodo('done task');
    await todoPage.toggleByTitle('done task');

    await todoPage.filterActive.click();
    await expect(todoPage.todoItems).toHaveCount(1);
    await expect(todoPage.todoItems).toHaveText(['active task']);

    await todoPage.filterCompleted.click();
    await expect(todoPage.todoItems).toHaveCount(1);
    await expect(todoPage.todoItems).toHaveText(['done task']);

    await todoPage.filterAll.click();
    await expect(todoPage.todoItems).toHaveCount(2);
  });
});
