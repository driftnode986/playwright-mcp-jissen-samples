# Ch10 POM ハイブリッド設計

書籍『Claude Code × Playwright MCP 実践ガイド』第 10 章 POM + AI ハイブリッド設計のサンプル。

## 構成

- `apps/login.html` — Ch04 から流用するログインフォーム
- `apps/dashboard.html` — 認証後ダッシュボード（新規）
- `apps/shop.html` — Ch09 から流用する商品検索アプリ
- `pages/LoginPage.ts` — 純 POM（ログイン）
- `pages/DashboardPage.ts` — 純 POM（ダッシュボード）
- `pages/ProductPage.ts` — 純 POM（商品検索）
- `pages/HybridProductPage.ts` — ハイブリッド POM（ProductPage を継承し AI 操作メソッドを追加）
- `fixtures.ts` — 4 つの POM フィクスチャ（loginPage / dashboardPage / productPage / hybridProductPage）
- `tests/login-pure-pom.spec.ts` — LoginPage を使ったログインフロー
- `tests/dashboard-pure-pom.spec.ts` — `storageState` で認証済み開始
- `tests/product-pure-pom.spec.ts` — ProductPage で検索 → カート
- `tests/product-hybrid-pom.spec.ts` — HybridProductPage の探索系メソッド
- `auth/admin.json` — Ch04 から流用する pre-baked storageState

## セットアップ

```bash
cd ch10-pom-hybrid
npm install
npx playwright install --with-deps chromium
```

## 実行

```bash
npx playwright test
```

すべて PASS する設計（8 tests）。

## ハイブリッド POM の AI 操作メソッド

`HybridProductPage` の探索系メソッド（`discoverAndAddFirstAvailable`、
`findByKeywordAndAddAll`）は、Claude Code セッション経由で
`browser_*` ツールを使った「AI 操作版」を持つ想定。本サンプルでは
`npx playwright test` 単独で動かせるように、フォールバック実装として
Locator 操作で再現している。本文 Ch10 では「AI 操作版」と
「フォールバック実装」を Before / After で並べて読む。
