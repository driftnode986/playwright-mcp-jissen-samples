# ch07-generator

Generator でテストファイルを自動生成するための companion repo。第 6 章で生成した
Markdown plan を入力に、Generator が出力する `.spec.ts` のハンドクラフト版を配置している。

## 構成

```text
ch07-generator/
  apps/                          # ch06-planner から流用した最小 SPA
    todo.html
    shop.html
    saas.html
  specs/                         # ch06-planner から流用した Markdown plan
    todo-basic-operations.md
    shop-search-and-checkout.md
    saas-dashboard-basic.md
  tests/
    seed.spec.ts                 # init-agents 生成物（最小 stub）
    seed-todo.spec.ts            # todo アプリ用 seed
    seed-shop.spec.ts            # shop アプリ用 seed
    seed-saas.spec.ts            # saas アプリ用 seed
    todo/
      fixtures.ts                # todo.html へ navigate するフィクスチャ
      add-valid-todo.spec.ts     # 1.1 Add a Valid Todo
      mark-as-completed.spec.ts  # 2.1 Mark a Todo as Completed
    shop/
      fixtures.ts                # shop.html へ navigate するフィクスチャ
      search-product.spec.ts     # 2.1 Search for an Existing Product
      add-to-cart.spec.ts        # 3.1 Add a Single Product
    saas/
      fixtures.ts                # saas.html へ navigate するフィクスチャ
      default-range-7d.spec.ts   # 1.1 Default Range Shows 7 Day KPIs
      open-alert-detail.spec.ts  # 2.2 Open an Alert Detail
  .claude/agents/                # Ch05 init-agents 生成物
  .mcp.json                      # Test Agents 用 MCP サーバー登録
  playwright.config.ts
  tsconfig.json
  package.json
```

## サンプルの性質

`tests/<app>/*.spec.ts` は **手書きのハンドクラフト版** で、Microsoft 公式
[test-agents-js.md](https://github.com/microsoft/playwright/blob/main/docs/src/test-agents-js.md)
の `tests/add-valid-todo.spec.ts` example の構造に厳密準拠している。

Generator agent を実機で起動して生成した出力ではない理由:

- Generator agent は対話型で Claude Code subagent UI からのみ起動可能
- 生成結果は LLM の揺らぎでセッションごとに変動するため再現性がない
- Companion repo は読者が `npm test` で確実に検証できる固定コードである必要がある

実機の Generator agent を試すには、Claude Code を起動して下記の手順を踏む（本書 7.5 節
で詳述）:

```bash
npm install
claude
# Claude Code セッション内で:
#   "Use playwright-test-generator to generate tests from
#    specs/todo-basic-operations.md"
```

## fixtures の構造

公式 example は `import { test, expect } from '../fixtures';` を使う。本 repo は
3 アプリ並行のため、各アプリ配下に専用の `fixtures.ts` を置いて
`import { test, expect } from './fixtures';` で読み込む。fixtures.ts は seed test
と同じく file:// URL への navigate を担う。

## 実行

```bash
npm install
npm run test:seed         # seed 4 本のみ
npm run test:generated    # tests/<app>/ 配下 6 本のみ
npm test                  # 全 10 本（seed + generated）
```

期待値: 全 10 件 PASS。

## 公式テンプレートとの対応

各 spec は以下の構造を厳守:

- 1 行目: `// spec: specs/<plan>.md`
- 2 行目: `// seed: tests/seed-<app>.spec.ts`
- 3 行目: 空行
- 4 行目: `import { test, expect } from './fixtures';`
- describe wrapper: plan の H3 タイトル（連番なし）
- test wrapper: plan の H4 タイトル（連番なし）
- 各 step 直前に `// <N>. <Step text verbatim>`
- 期待結果直前に `// Expected Results:` ヘッダ + bullet を `// - <text>`
