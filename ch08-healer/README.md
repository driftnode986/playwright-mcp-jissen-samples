# ch08-healer

Healer で失敗テストを自己修復するための companion repo。Ch07 の Generator 出力サンプル
を Healer 修復後の状態として継承し、`examples/healer-scenarios/` に「修復前 / 修復後」
の対比サンプルを配置している。

## 構成

```text
ch08-healer/
  apps/
    todo.html
    shop.html
    saas.html
    saas-renamed.html              # selector-rename シナリオ用（"7 日" → "7days"）
  specs/                           # Ch07 から流用
  tests/                           # Ch07 から流用（Healer 修復後の状態 = PASS する版）
    seed*.spec.ts
    todo/ shop/ saas/
  examples/
    healer-scenarios/
      selector-rename/
        before.spec.ts.example     # 修復前（broken）
        after.spec.ts.example      # 修復後（fixed）
        README.md                  # diff 解説
      dynamic-data/
        before.spec.ts.example
        after.spec.ts.example
        README.md
      strict-mode-violation/
        before.spec.ts.example
        after.spec.ts.example
        README.md
  .claude/agents/                  # Ch05 init-agents 生成物
  .mcp.json                        # Test Agents 用 MCP サーバー登録
  playwright.config.ts
  tsconfig.json
  package.json
```

## サンプルの性質

`examples/healer-scenarios/*/before.spec.ts.example` と `after.spec.ts.example` は
**手書きの Before/After 対比サンプル**で、Healer agent が実機で生成する diff を
再現したものではない。Healer agent は対話型のため出力に揺らぎがある。本書は
agent definition の 7-step workflow と Key principles に則った「Healer が選ぶ
であろう修復案」をハンドクラフトしている。

`.spec.ts.example` 拡張子で `tests/` 配下にも置かないため、`npx playwright test`
の対象にはならない。本書のコード片として参照する用途専用。

## 実行

```bash
npm install
npm run test:seed         # seed 4 本のみ
npm run test:healed       # tests/<app>/ 配下 6 本のみ（Ch07 の healed 版）
npm test                  # 全 10 本（seed + healed）
```

期待値: 全 10 件 PASS（Healer が修復し終えた状態）。

## 3 つの修復シナリオ

| シナリオ | Root Cause（agent definition の分類）| 修復パターン |
|---|---|---|
| selector-rename | selector 変更（UI rename）| `Edit` で Locator 文字列を新表記に更新 |
| dynamic-data | data dependency | 固定値 → 正規表現で resilient 化 |
| strict-mode-violation | selector specificity | `browser_generate_locator` で unique な代替を採用 |

各シナリオの詳細は `examples/healer-scenarios/*/README.md` を参照。

## 実機 Healer を試す

```bash
npm install
claude
# Claude Code セッション内で:
#   "Use playwright-test-healer to fix the failing test
#    'Default Range Shows 7 Day KPIs' in tests/saas/default-range-7d.spec.ts
#    after replacing tests/saas/fixtures.ts to navigate apps/saas-renamed.html"
```

実機 Healer は対話型 subagent UI からのみ起動可能。本 repo の examples/ は
agent definition の workflow に則った「期待される出力」を hand-crafted で
記録した参考資料。
