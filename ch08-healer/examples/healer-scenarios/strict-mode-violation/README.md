# Healer Scenario: strict-mode-violation

## 修復前 (before.spec.ts.example)

`getByText('カート')` で取った要素が、ヘッダの `<p>カート: <span>0</span> 件</p>`
のテキストと、aria-live の `<span id="cart-count">` の両方にマッチして
**strict mode violation** で fail する。

```text
Error: locator.click: Error: strict mode violation:
  getByText('カート') resolved to 2 elements:
      1) <p>カート: <span id="cart-count">0</span> 件</p>
      2) <span id="cart-count">0</span>
```

## Healer のアクション

1. `test_run` で strict mode violation を検出
2. `test_debug` で `browser_snapshot` を取得、複数要素が一致していることを確認
3. Root Cause = selector specificity（曖昧な Locator）
4. `browser_generate_locator` で代替候補を取得
5. `Edit` で `getByText('カート')` を `page.locator('#cart-count')` に置き換え
6. assertion も「visible なだけ」から「'0' を表示」のように具体化
7. `test_run` で再実行、PASS を確認

## 修復後 (after.spec.ts.example)

ID セレクタ `#cart-count` で一意に解決し、`toHaveText('0')` で意味のある
assertion を残している。Healer は曖昧さの解消だけでなく、test の意図が
読み取れる形に組み直すこともある。
