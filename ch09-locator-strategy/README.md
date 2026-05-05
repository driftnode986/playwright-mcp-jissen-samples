# Ch09 Locator 戦略

書籍『Claude Code × Playwright MCP 実践ガイド』第 9 章 Locator 戦略のサンプル。

## 構成

- `apps/shop.html` — オリジナル商品検索アプリ（getByRole / getByText / getByTestId / CSS class すべて対応）
- `apps/shop-renamed.html` — text を「カートに追加」→「カゴに入れる」、CSS class を `product-button`→`btn-cart` に変更したリネーム版
- `tests/locators/role.spec.ts` — `getByRole` 主体（推奨パターン）
- `tests/locators/text.spec.ts` — `getByText` 主体（テキスト依存）
- `tests/locators/testid.spec.ts` — `getByTestId` 主体（DOM 構造非依存）
- `tests/locators/css-class.spec.ts` — CSS class 依存（アンチパターン、shop.html では PASS する）
- `tests/brittleness/role-on-renamed.spec.ts` — `getByRole` が name 変更で 0 件マッチになる挙動
- `tests/brittleness/testid-on-renamed.spec.ts` — `getByTestId` が text 変更後も pass する安定性
- `tests/brittleness/css-on-renamed.spec.ts` — CSS class が class 変更で 0 件マッチになる挙動
- `prompts/ai-explore-export.md` — Claude Code から `browser_generate_locator` で Locator を取得するプロンプト例
- `scripts/compare-locator-cost.sh` — Locator スタイル 4 種を順番に実行する計測スクリプト

## セットアップ

```bash
cd ch09-locator-strategy
npm install
npx playwright install --with-deps chromium
```

## 実行

```bash
npx playwright test
```

すべて PASS する設計（壊れ方を検証する `tests/brittleness/` も
「期待どおり 0 件マッチであること」を `expect(locator).toHaveCount(0)`
で確認する形に統一しているため、PASS 扱い）。

## Playwright MCP の `browser_generate_locator` を試す

`.mcp.json` で `--caps=testing` を有効化済み。
Claude Code を起動すると `browser_generate_locator` /
`browser_verify_element_visible` が利用可能になる。
詳細は `prompts/ai-explore-export.md` を参照。

## 検証時の Tips

- 各 Locator スタイルの所要時間は
  `bash scripts/compare-locator-cost.sh` で順次比較できる
- 計測値は実機環境に依存するため、参考値として扱う
