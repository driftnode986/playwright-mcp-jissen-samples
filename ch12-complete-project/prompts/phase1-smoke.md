# Phase 1 - smoke の MCP 化

対話型ワークフロー (Ch04 の 4 フェーズ) を Claude Code セッションで実行する.

## 探索

```
TodoMVC (apps/todomvc.html を file:// で開く) を browser_navigate で開いて,
browser_snapshot で accessibility tree を取得して. 主な操作 (input / button / list)
を列挙して.
```

## シナリオ抽出

```
今取得した tree から「ユーザーが最初に試す happy path」を 1 本抽出して. そのまま
smoke test として CI で安定実行できる粒度を意識して.
```

## 期待動作の確認

```
todo を 1 件追加 → 完了マーク → 削除. 各ステップ後に accessible name で要素が
変化することを確認して. 期待値が断言できる箇所だけ列挙して.
```

## コード化

```
次の規約で typescript の Playwright Test を出力して.
- import は ../../fixtures.js から
- test 関数の第 2 引数で { tag: '@smoke' } を付ける
- TodoPage の addTodo / toggleByTitle / deleteByTitle を使う
- expect は web-first assertion (toHaveCount, toHaveText) のみ
- ファイル名は tests/smoke/todomvc-happy-path.spec.ts
```

## セルフレビュー

```
今書いた spec を Ch09 の Locator 戦略 7 軸で自己レビューして. accessible name 依存,
strict mode 違反, retry 不要な箇所の点検結果を箇条書きで返して.
```
