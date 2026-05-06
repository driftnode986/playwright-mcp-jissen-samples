# ch04-interactive-workflow — 対話型 UI テスト構築ワークフロー

書籍「Claude Code × Playwright MCP 実践ガイド」第 4 章のサンプルコードです。

## 検証バージョン

- `@playwright/test` 1.59.1
- `@playwright/mcp` 0.0.73
- TypeScript 5.6+
- Node.js 20 LTS 以上（検証時は 22.9.0）

## ファイル構成

```
ch04-interactive-workflow/
├── .mcp.json                    # 2 サーバー併記 (@playwright/mcp + playwright-test)
├── playwright.config.ts
├── package.json
├── tsconfig.json
├── examples/                    # 対話型構築の対象となるデモページ
│   ├── login.html
│   ├── shop.html
│   └── signup.html
├── prompts/                     # 4 段階ワークフローのプロンプトテンプレ
│   ├── phase1-explore.md
│   ├── phase2-extract.md
│   ├── phase3-verify.md
│   ├── phase4-codify.md
│   └── self-review.md
├── auth/                        # storage state のサンプル
│   └── admin.json
└── tests/                       # Phase 4 で生成された Playwright Test
    ├── shop-search.spec.ts
    ├── signup-validation.spec.ts
    └── coverage-boost.spec.ts
```

## セットアップ

```bash
npm install
npx playwright install chromium
```

## テスト実行

```bash
npm test
```

`tests/` 配下は Phase 4（テストコード化）の最終出力です。実機で踏破できる小さな HTML を `examples/` に同梱しており、Playwright Test だけでも完結します。

## 4 段階ワークフローの試し方

Claude Code から Playwright MCP に繋いだ状態で、`prompts/` のテンプレートを順に貼り付けます。

```
Phase 1: prompts/phase1-explore.md   → 構造把握
Phase 2: prompts/phase2-extract.md   → シナリオ抽出
Phase 3: prompts/phase3-verify.md    → 実機踏破
Phase 4: prompts/phase4-codify.md    → .spec.ts 生成
レビュー: prompts/self-review.md     → 別セッションで点検
```

各 phase のプロンプトには `<PASTE_URL>` のようなプレースホルダーがあります。`examples/login.html` を `file://` で開くなどして対象 URL を埋めてから渡してください。

## `.mcp.json` のポイント

```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": [
        "@playwright/mcp@0.0.73",
        "--isolated",
        "--storage-state=./auth/admin.json"
      ]
    },
    "playwright-test": {
      "command": "npx",
      "args": ["playwright", "run-test-mcp-server"]
    }
  }
}
```

- `playwright` (`@playwright/mcp`) はブラウザ操作の主役。`browser_navigate` / `browser_snapshot` / `browser_click` などの基本ツールを提供する
- `playwright-test` (`run-test-mcp-server`) は Test Agents 用 MCP。Phase 4 で使う `browser_generate_locator` / `browser_verify_*` と、認証保存用の `browser_storage_state` / `browser_set_storage_state` がここに含まれる
- 両者は独立した MCP サーバーで、ツール名空間も別。Claude Code からは `mcp__playwright__*` と `mcp__playwright-test__*` の prefix で区別される
- `--isolated` を併用すると毎回クリーンな context で起動する。`--storage-state` を渡すと起動時に cookie と localStorage がロードされる
- `@playwright/mcp` 側の `--caps` は `vision` / `pdf` / `devtools` の 3 種のみで、`testing` / `storage` という caps は実機で存在しない（v0.0.73 検証）

## storage state の事前生成

`auth/admin.json` は最小例です。実プロジェクトでは UI ログインを通した後に保存するのが一般的です。

```javascript
// MCP セッション内で
await client.callTool({
  name: 'browser_storage_state',
  arguments: { filename: './auth/admin.json' }
});
```

または Playwright Test の global setup で生成して同じ JSON を共有します。

## トラブルシューティング

1. **`browser_generate_locator` が見つからない**: `.mcp.json` に `playwright-test` (`run-test-mcp-server`) エントリが登録されているか確認する。`@playwright/mcp` 側にはこのツールがない
2. **`browser_storage_state` が見つからない**: 同上。`run-test-mcp-server` 経由で利用する
3. **`--storage-state` のファイルが読めない**: 相対パスは `npx` の起動 cwd 基準。絶対パスに直すと安定する
4. **`file://` の `localStorage` が共有されない**: ブラウザは `file://` を origin 単位で隔離する。`auth/admin.json` の `origins[].origin` を `file://` のままで良いが、別 host へ展開したら origin を書き換える
5. **`[ref=eN]` が次のセッションでズレる**: ref はページ初回 snapshot で採番される。Phase 3 と Phase 4 をまたぐときは Phase 4 で再採取する

## 参考

- Playwright MCP README: <https://github.com/microsoft/playwright-mcp/blob/main/README.md>
- Capability グループ一覧: README の `Tools` セクション参照
- Playwright Test docs: <https://playwright.dev/docs/intro>
