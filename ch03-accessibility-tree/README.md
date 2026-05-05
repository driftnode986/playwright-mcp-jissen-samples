# ch03-accessibility-tree — accessibility tree と自然言語操作

書籍「Claude Code × Playwright MCP 実践ガイド」第 3 章のサンプルコードです。

## 検証バージョン

- `@playwright/test` 1.59.1
- `@playwright/mcp` 0.0.73
- TypeScript 5.6+
- Node.js 20 LTS 以上（検証時は 22.9.0）

## ファイル

- `examples/login-form.html` — ARIA / label / role が適切に振られたフォーム（ローカル file:// で配信）
- `examples/duplicate-buttons.html` — 同じ accessible name の要素が複数あるページ
- `tests/aria-snapshot.spec.ts` — `toMatchAriaSnapshot` でテンプレートとアサーションする例
- `tests/snapshot-introspect.spec.ts` — `locator.ariaSnapshot()` の YAML 出力を `console.log` に流す
- `tests/get-by-role.spec.ts` — `getByRole` / `getByLabel` の操作と disambiguation
- `playwright.config.ts` — Chromium のみ、`reporter: list`
- `tsconfig.json` — TypeScript 5.x、`module: NodeNext`、`strict: true`

## セットアップ

```bash
npm install
npx playwright install chromium
```

## テスト実行

```bash
npm test
```

期待出力（抜粋）:

```
Running 4 tests using 4 workers
  ✓ aria-snapshot.spec.ts:11:5 › ログインフォームの ARIA snapshot がテンプレートと一致する
  ✓ get-by-role.spec.ts:13:5 › getByRole / getByLabel でログインフォームを操作できる
  ✓ get-by-role.spec.ts:23:5 › 同名のボタンは ancestor の見出しで disambiguate する
  ✓ snapshot-introspect.spec.ts:10:5 › ARIA snapshot の YAML 出力をログに残す
  4 passed
```

## ARIA snapshot の YAML を眺める

`tests/snapshot-introspect.spec.ts` は accessibility tree の生 YAML を `console.log` に書き出します。本文の YAML 例はこの出力をそのまま引用しています。

```bash
npm run dump-snapshot
```

## 参考

- Playwright ARIA snapshots: <https://playwright.dev/docs/aria-snapshots>
- Playwright MCP README: <https://github.com/microsoft/playwright-mcp/blob/main/README.md>
