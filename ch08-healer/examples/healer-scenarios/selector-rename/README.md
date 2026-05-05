# Healer Scenario: selector-rename

## 修復前 (before.spec.ts.example)

`getByRole('button', { name: '7 日' })` で 7 日ボタンを取っている。
アプリが「7 日」→「7days」に表記変更された結果、この Locator は要素を
解決できず timeout で fail する。

## Healer のアクション

1. `test_run` で「Default Range Shows 7 Day KPIs」が timeout で失敗を検出
2. `test_debug` で test を pause、`browser_snapshot` で現在の page state を取得
3. accessibility tree を見ると button が "7days" / "30days" / "90days" になっている
4. Root Cause = selector 変更（アプリの UI 変更）
5. `Edit` で `'7 日'` → `'7days'` に置換
6. `test_run` で再実行、PASS を確認

## 修復後 (after.spec.ts.example)

`getByRole('button', { name: '7days' })` に更新済み。
本書 §8.5 で diff を解説する。
