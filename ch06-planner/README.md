# Ch06 Planner サンプル

Claude Code × Playwright MCP 実践ガイド 第 6 章「Planner で探索的テストプランを生成する」のサンプル一式。

## 構成

```text
ch06-planner/
  apps/
    todo.html                    # 最小 Todo アプリ
    shop.html                    # 商品検索 + カート（Ch04 から流用）
    saas.html                    # 最小 SaaS ダッシュボード
  tests/
    seed.spec.ts                 # 共通 seed（todo を起点）
    seed-todo.spec.ts            # todo アプリ起動確認
    seed-shop.spec.ts            # shop アプリ起動確認
    seed-saas.spec.ts            # saas アプリ起動確認
  specs/
    README.md                    # init-agents 生成物
    todo-basic-operations.md     # Planner 出力サンプル
    shop-search-and-checkout.md  # Planner 出力サンプル
    saas-dashboard-basic.md      # Planner 出力サンプル
  .claude/agents/                # init-agents 生成物
  .mcp.json                      # init-agents 生成物
  playwright.config.ts
  tsconfig.json
  package.json
```

## セットアップ

```bash
cd ch06-planner
npm install
npx playwright install chromium
```

## seed test 実行

3 種の seed test がすべて pass することを確認する。

```bash
npx playwright test
```

期待出力:

```text
Running 4 tests using 4 workers
  ✓  chromium > seed.spec.ts:5:1 › seed
  ✓  chromium > seed-todo.spec.ts:5:1 › seed: todo app boots
  ✓  chromium > seed-shop.spec.ts:5:1 › seed: shop app boots
  ✓  chromium > seed-saas.spec.ts:5:1 › seed: saas dashboard boots
  4 passed
```

## Planner agent の起動

`.mcp.json` と `.claude/agents/` は Ch05 で `npx playwright init-agents --loop=claude` を実行して取得した公式生成物を流用している。再生成したいときは:

```bash
npm run agents:init
```

Claude Code を起動した後、自然言語で Planner agent を指名する。

```text
Use the playwright-test-planner agent to generate a test plan for
the todo app. The seed test is tests/seed-todo.spec.ts. The app URL
is file:///<absolute>/ch06-planner/apps/todo.html. Save the plan to
specs/todo-basic-operations.md.
```

Planner は `specs/<name>.md` を保存する。本リポジトリの `specs/*.md` は公式 Planner 出力構造に厳密準拠したサンプルで、構造の参照用として手動でコミットしている。実機実行で生成された出力と差し替えるときは git diff で構造の一致を確認する。

## 注意

- `.mcp.json` の `playwright-test` サーバーは `@playwright/test` 同梱の `playwright run-test-mcp-server` を利用する。Ch02-04 で使った `@playwright/mcp` の汎用ブラウザ自動化サーバーとは別物
- seed test は `file://` プロトコルで `apps/*.html` を読み込む。HTTP サーバーを別に起動する必要はない
- Planner agent definition の `tools` リストには 22 個の MCP ツールが列挙されている。本書は減らさず公式生成物のまま利用する
