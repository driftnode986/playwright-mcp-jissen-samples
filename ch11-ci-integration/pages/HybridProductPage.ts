import { ProductPage } from './ProductPage.js';

/**
 * ProductPage を継承して AI 操作メソッドを追加するハイブリッド POM。
 *
 * 探索系メソッドは命名規約として `discover` / `findBy` プレフィックスを使う。
 * AI 操作の本体は Claude Code セッション内で `browser_*` 経由で実行されるため、
 * `npx playwright test` での再現性確保のために本クラスでは Locator 操作で
 * 実装した「フォールバック実装」を提供する。本文 Ch10 のサンプルとしては
 * 「AI 操作版」と「フォールバック実装」を Before / After で並べて読む。
 */
export class HybridProductPage extends ProductPage {
  /**
   * 探索系: AI 操作版では「カートに追加できる商品を 1 つ見つけて押して」と
   * プロンプトする。フォールバックでは accessible name 付き button の最初の要素を
   * 押す（getByRole('button', { name: /カートに追加$/ }).first()）。
   */
  async discoverAndAddFirstAvailable() {
    const candidate = this.page
      .getByRole('button', { name: /カートに追加$/ })
      .first();
    await candidate.click();
  }

  /**
   * 探索系: AI 操作版では「商品一覧から 'マウス' を含む商品をすべてカートに
   * 追加して」とプロンプトする。フォールバックでは listitem を hasText で絞り、
   * 内側の button をすべて click する。
   */
  async findByKeywordAndAddAll(keyword: string) {
    const matches = this.page
      .getByRole('listitem')
      .filter({ hasText: keyword });
    const count = await matches.count();
    for (let i = 0; i < count; i++) {
      await matches.nth(i).getByRole('button').click();
    }
  }
}
