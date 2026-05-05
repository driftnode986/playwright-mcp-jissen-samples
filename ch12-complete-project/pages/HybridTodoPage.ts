import { TodoPage } from './TodoPage.js';

/**
 * TodoPage を継承して探索系メソッドを追加するハイブリッド POM.
 * 命名規約: 探索系は discover / findBy プレフィックス, 確定系は通常の動詞 (Ch10).
 *
 * 実運用では本クラスのメソッド本体を Claude Code セッション経由の AI 操作で
 * 実装する. companion repo は npx playwright test で動かすため, ここでは
 * Locator 操作のフォールバック実装を提供して常時 PASS させる.
 */
export class HybridTodoPage extends TodoPage {
  /**
   * 探索系: 「未完了の todo を 1 件選んで完了状態に切り替えて」を AI 操作で実装する想定.
   * フォールバック: 未完了 li を絞り込み, 最初の checkbox を click.
   */
  async discoverAndCompleteFirstActive() {
    const active = this.todoItems.filter({
      hasNot: this.page.locator('.completed'),
    });
    await active.first().getByRole('checkbox').click();
  }

  /**
   * 探索系: 「タイトルにキーワードを含む todo を全件削除して」を AI 操作で実装する想定.
   * フォールバック: hasText で絞り込み, destroy ボタンを順次 click.
   */
  async findByKeywordAndDeleteAll(keyword: string) {
    const matches = this.todoItems.filter({ hasText: keyword });
    let count = await matches.count();
    while (count > 0) {
      await matches.first().getByRole('button').click();
      count = await matches.count();
    }
  }
}
