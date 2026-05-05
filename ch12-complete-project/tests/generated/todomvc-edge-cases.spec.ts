// spec: specs/todomvc-coverage-gap.plan.md
// seed: tests/seed.spec.ts
//
// Phase 3 成果物: Ch07 Generator が specs/todomvc-coverage-gap.plan.md から
// 生成する想定のスペック. companion repo では Generator を実機実行できないため,
// 公式 example の規約 (H3=describe / H4=test / step コメント / Expected -> expect)
// に従って手書きで再現している.
import { test, expect } from '../../fixtures.js';

test.describe('Edge Cases', () => {
  test('Reject empty input on Enter', async ({ todoPage }) => {
    // 1. Focus the new todo input
    await todoPage.newTodoInput.click();
    // 2. Press Enter without typing anything
    await todoPage.newTodoInput.press('Enter');
    // - Todo list remains empty
    await expect(todoPage.todoItems).toHaveCount(0);
  });

  test('Trim whitespace before saving', async ({ todoPage }) => {
    // 1. Type a title with trailing whitespace
    await todoPage.newTodoInput.fill('   trimmed   ');
    // 2. Press Enter
    await todoPage.newTodoInput.press('Enter');
    // - Todo is saved with whitespace trimmed
    await expect(todoPage.todoItems).toHaveText(['trimmed']);
  });

  test('Toggle all flips every todo', async ({ todoPage }) => {
    // 1. Add three todos
    await todoPage.addTodo('A');
    await todoPage.addTodo('B');
    await todoPage.addTodo('C');
    // 2. Click the toggle-all checkbox
    await todoPage.toggleAll.click();
    // - All items move to completed and counter shows 0
    await expect(todoPage.todoCount).toHaveText('0');
  });
});
