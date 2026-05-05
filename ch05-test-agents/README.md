# ch05-test-agents — Playwright Test Agents 全貌

書籍「Claude Code × Playwright MCP 実践ガイド」第 5 章のサンプルコードです。

`npx playwright init-agents --loop=claude` で生成された 3 つの Agent definition と Test Agents 専用 MCP サーバー設定を、そのまま動作確認できる最小プロジェクトです。

## 検証バージョン

- `@playwright/test` 1.59.1（Test Agents は v1.56 から導入）
- `@playwright/mcp` 0.0.73（Ch02-04 と同版で固定。本章では使用しないが書籍全体で版を揃える）
- TypeScript 5.6+
- Node.js 20 LTS 以上（検証時は 22.9.0）
- Claude Code: MCP クライアントとして使用

## ファイル構成

```
ch05-test-agents/
├── .mcp.json                              # init-agents 生成物（Test Agents 用 MCP サーバー設定）
├── playwright.config.ts                   # 最小設定（Chromium 単体）
├── package.json
├── tsconfig.json
├── .claude/
│   └── agents/
│       ├── playwright-test-planner.md     # init-agents 生成物（公式 Planner agent definition）
│       ├── playwright-test-generator.md   # init-agents 生成物（公式 Generator agent definition）
│       └── playwright-test-healer.md      # init-agents 生成物（公式 Healer agent definition）
├── specs/
│   └── README.md                          # init-agents 生成物（test plan の置き場所）
└── tests/
    └── seed.spec.ts                       # init-agents 生成物（最小 stub）
```

## セットアップ

```bash
npm install
npx playwright install chromium
```

## init-agents の再生成手順

本ディレクトリは既に init-agents 実行済みですが、Playwright 更新時には再実行することが推奨されています（公式 doc「Agent definitions ... should be regenerated whenever Playwright is updated」）。

```bash
npx playwright init-agents --loop=claude
```

実行後、以下が生成されます。

```text
specs/README.md
seed.spec.ts                           # ※本リポジトリでは tests/ 配下に移動済み
.claude/agents/playwright-test-generator.md
.claude/agents/playwright-test-healer.md
.claude/agents/playwright-test-planner.md
.mcp.json
```

`--loop=` には `claude` / `vscode` / `opencode` が指定可能です。VS Code を使う場合は v1.105 以上が必要です。

## .mcp.json のポイント

```json
{
  "mcpServers": {
    "playwright-test": {
      "command": "npx",
      "args": [
        "playwright",
        "run-test-mcp-server"
      ]
    }
  }
}
```

- server name は `playwright-test`（Ch02-04 で使ってきた `playwright` とは別エントリ）
- 起動コマンドは `@playwright/test` 同梱の `playwright run-test-mcp-server`。`@playwright/mcp` パッケージは使用しない
- Claude Code から見ると、本章のプロジェクトでは「ブラウザ自動化用 MCP（`@playwright/mcp`）」と「Test Agents 用 MCP（`playwright run-test-mcp-server`）」を併用する構成になります（本章では Test Agents 側のみ使用）

## seed.spec.ts の役割

```typescript
import { test, expect } from '@playwright/test';

test.describe('Test group', () => {
  test('seed', async ({ page }) => {
    // generate code here.
  });
});
```

Generator が実機踏破を始める前に「初期状態」を作るための bootstrap です。本リポジトリは最小 stub のままですが、実プロジェクトでは事前ログインや事前データ投入を seed に集約します。

## Agent definitions の確認

3 つの Agent definition は init-agents が公式テンプレートからコピーしたものです。各ファイルの先頭にある front matter で Claude Code 側に必要な情報が宣言されます。

- `name`: Agent 名（`playwright-test-planner` / `playwright-test-generator` / `playwright-test-healer`）
- `description`: 起動条件
- `tools`: 使用する MCP ツール一覧（`mcp__playwright-test__*` プレフィックス）
- `model`: モデル指定（公式テンプレは `sonnet`）
- `color`: Claude Code UI 上の色

system prompt 本文には Planner の 5 step、Generator のワークフローと出力ファイル規約、Healer の 7 step workflow が記述されています。本書では front matter と workflow の概要を引用します。

## トラブルシューティング

1. **`init-agents` が ENOENT で失敗する**: `@playwright/test` のバージョンが 1.56 未満の可能性。`npm ls @playwright/test` で確認し、必要なら `npm install -D @playwright/test@latest`
2. **`.mcp.json` が認識されない**: Claude Code は project スコープの `.mcp.json` をプロジェクトルートで探す。サブディレクトリで起動した場合は cwd 直下の `.mcp.json` のみ有効
3. **`playwright run-test-mcp-server` が見つからない**: 同 npm パッケージ（`@playwright/test`）に同梱。`npx --no-install playwright run-test-mcp-server --help` で存在確認できる
4. **`tools:` の数値が膨大に見える**: 公式テンプレは 24 ツール前後を列挙。これは Claude Code が起動時に判断する allowlist。`mcp__playwright-test__*` のみ許可するため、別の MCP サーバーが提供する `mcp__playwright__*` 等は呼ばれない
5. **`init-agents` 実行後に `playwright.config.ts` が無い**: init-agents は config を生成しない。本リポジトリの `playwright.config.ts` を参考に最小設定を追加する

## 参考

- Test Agents 公式 doc: <https://playwright.dev/docs/test-agents>
- Version 1.56 release notes: <https://github.com/microsoft/playwright/blob/main/docs/src/release-notes-js.md>
- Agent definition のソース: <https://github.com/microsoft/playwright/tree/main/packages/playwright/src/agents>
