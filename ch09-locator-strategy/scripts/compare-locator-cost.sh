#!/usr/bin/env bash
#
# 4 種の Locator スタイルを順番に実行し、所要時間を集計する。
# 実行時間は Playwright が出す `passed (XXX ms)` を grep で抜き出して合計する。
#
set -euo pipefail

cd "$(dirname "$0")/.."

for style in role text testid css-class; do
  echo "=== $style ==="
  npx playwright test "tests/locators/${style}.spec.ts" --reporter=list
done
