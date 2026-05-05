// Phase 2 到達点: ハイブリッド POM の探索系メソッドを使うテスト.
// テスト側のインターフェイスは純 POM と同じシグネチャで, 実装が AI 操作 (本来は
// Claude Code 経由) に切り替わっている. ここではフォールバック実装を呼ぶ.
import { test, expect } from '../../fixtures.js';

test.describe('TodoMVC explore (hybrid POM)', () => {
  test('discover first active and complete it', async ({ hybridTodoPage }) => {
    await hybridTodoPage.addTodo('alpha');
    await hybridTodoPage.addTodo('beta');
    await hybridTodoPage.addTodo('gamma');

    await hybridTodoPage.discoverAndCompleteFirstActive();

    await expect(hybridTodoPage.todoCount).toHaveText('2');
  });

  test('find by keyword and delete all matches', async ({ hybridTodoPage }) => {
    await hybridTodoPage.addTodo('buy milk');
    await hybridTodoPage.addTodo('buy bread');
    await hybridTodoPage.addTodo('call mom');

    await hybridTodoPage.findByKeywordAndDeleteAll('buy');

    await expect(hybridTodoPage.todoItems).toHaveCount(1);
    await expect(hybridTodoPage.todoItems).toHaveText(['call mom']);
  });
});
