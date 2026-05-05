# AI 操作で Locator をエクスポートするプロンプト例

Claude Code の MCP セッションで `--caps=testing` を有効化したうえで、
以下のプロンプトを送ると `browser_generate_locator` 経由で
Playwright Locator コードが返る。

## ステップ 1: ページ snapshot

```
ブラウザで file:///<absolute-path>/apps/shop.html を開いて
accessibility tree の snapshot を取得してください。
```

Claude が `browser_navigate` → `browser_snapshot` を呼び、
各要素に `[ref=eN]` が振られた YAML が返る。

## ステップ 2: 対象要素の Locator を生成

```
カートに追加ボタン（黒色のキーボード）の
Playwright Locator を browser_generate_locator で取得してください。
```

Claude が ref を解決し、`browser_generate_locator` の戻り値として
以下のような Locator コードを提示する:

```typescript
page.getByRole('button', { name: '黒色のキーボードをカートに追加' });
```

## ステップ 3: テストファイルへ転記

返ってきた Locator をそのまま `tests/locators/role.spec.ts`
のような Playwright Test ファイルに転記する。`browser_generate_locator`
は実行時にしか動かないため、CI でテストを回すぶんには
通常の Playwright Test として動く。
