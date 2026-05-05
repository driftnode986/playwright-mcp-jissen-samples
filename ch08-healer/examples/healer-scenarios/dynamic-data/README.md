# Healer Scenario: dynamic-data

## 修復前 (before.spec.ts.example)

KPI 値を `toHaveText('1230')` のように固定値で assertion している。
アプリ側がデモデータから本番データ（毎回変動）に切り替わると、この
test は値の不一致で毎回 fail する。

## Healer のアクション

1. `test_run` で値の不一致を検出
2. `test_debug` で `browser_snapshot` を取得し、KPI 値が変動していることを確認
3. Root Cause = data dependency（テストが固定値を前提に書かれている）
4. agent definition Step 5: "For inherently dynamic data, utilize regular
   expressions to produce resilient locators"
5. `Edit` で固定値を正規表現に置き換え（`'1230'` → `/^\d+$/`）
6. `test_run` で再実行、PASS を確認

## 修復後 (after.spec.ts.example)

`toHaveText(/^\d+$/)` のように「数値が表示されている」事実だけを検証する。
データ変動には強くなったが、「正しい値が表示されているか」は別 test で
固定 fixture を仕込んで検証する設計にする。
