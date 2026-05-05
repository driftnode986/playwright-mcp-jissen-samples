# ch02-setup — Playwright MCP のセットアップ

書籍「Claude Code × Playwright MCP 実践ガイド」第 2 章のサンプルコードです。

## 検証バージョン

- `@playwright/test` 1.59.1
- `@playwright/mcp` 0.0.73
- TypeScript 5.6+
- Node.js 20 LTS 以上（検証時は 22.9.0）

## ファイル

- `package.json` — 依存関係をバージョン固定で宣言
- `tsconfig.json` — TypeScript 5.x、`strict: true`、`module: NodeNext`
- `.mcp.json` — Claude Code が読むプロジェクトスコープの最小設定
- `playwright-mcp.json` — `npx @playwright/mcp --config` 用の高度な設定例
- `playwright.config.ts` — Playwright Test ランナー設定
- `tests/sanity.spec.ts` — example.com を開いてタイトルを取得する動作確認
- `scripts/check-mcp.sh` — `claude mcp list` で playwright サーバーの登録を確認

## セットアップ

```bash
npm install
npx playwright install chromium
```

## Playwright 自体の動作確認

```bash
npm test
```

期待出力:

```
Running 1 test using 1 worker
  ✓ 1 [chromium] › sanity.spec.ts:3:5 › example.com に遷移してタイトルを取得できる
  1 passed
```

## Playwright MCP の接続確認

Claude Code を本ディレクトリで起動した状態で実行する。

```bash
npm run check-mcp
```

期待出力:

```
[check-mcp] playwright MCP サーバーが登録されています。
```

## トラブルシューティング 5 パターン

### 1. `npm install` で `EACCES` が出る

`sudo` で `npm` を実行していないか確認する。`nvm` または `Volta` で Node.js を管理し、`~/.npm` のオーナーをユーザーに戻す。

### 2. `npx playwright install` でブラウザがダウンロードできない

社内プロキシで TLS が遮断されている可能性。`HTTPS_PROXY` を設定するか、`PLAYWRIGHT_DOWNLOAD_HOST` で社内ミラーを指定する。

### 3. `claude mcp list` に playwright が出ない

`.mcp.json` の配置場所を確認する。Claude Code はカレントディレクトリの `.mcp.json` を `project` スコープとして読む。`~/.claude.json` に書いた場合は `user` スコープで認識される。

### 4. `npm test` で `Browser was not found` エラー

`npx playwright install chromium` を再実行する。`devDependencies` に `@playwright/test` が入っていれば `npx` で同じバージョンが解決される。

### 5. `playwright-mcp.json` を反映させたい

`.mcp.json` の `args` に `"--config"`、`"./playwright-mcp.json"` を順に追加する。`@playwright/mcp` 0.0.73 のヘルプでは `--config <path>` の書式で渡す。

```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["@playwright/mcp@0.0.73", "--config", "./playwright-mcp.json"]
    }
  }
}
```
