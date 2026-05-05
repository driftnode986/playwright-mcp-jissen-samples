// Phase 1 成果物: 対話型ワークフロー (Ch04) で構築する想定の smoke test.
// 実機では Claude Code セッションで「TodoMVC を開いて 1 件追加 → 完了 → 削除を確認して」
// と指示し, AI が出力したコードをここに貼る.
import { test, expect } from '../../fixtures.js';

test.describe('TodoMVC happy path', () => {
  test(
    'add complete delete in single flow',
    { tag: '@smoke' },
    async ({ todoPage }) => {
      await todoPage.addTodo('write smoke test');
      await expect(todoPage.todoItems).toHaveCount(1);

      await todoPage.toggleByTitle('write smoke test');
      await expect(todoPage.todoCount).toHaveText('0');

      await todoPage.deleteByTitle('write smoke test');
      await expect(todoPage.todoItems).toHaveCount(0);
    },
  );
});
