# Phase 3 - Test Agents で未カバー領域を埋める

Ch06 Planner -> Ch07 Generator -> Ch08 Healer の 3 段階を Claude Code subagent
として起動する. companion repo の specs/ と tests/generated/ に成果物を保存する.

## Planner 起動

```
@playwright-test-planner

apps/todomvc.html を seed (tests/seed.spec.ts 経由で page.goto file://...) で
渡す. 既存テスト (tests/pure-pom + tests/hybrid-pom + tests/smoke) を読んで
未カバーの edge case を 3 件抽出した Markdown プランを specs/todomvc-coverage-gap.plan.md
として保存して.
```

期待出力: H1 タイトル + Application Overview + Test Scenarios (H2) + カテゴリ (H3) +
個別シナリオ (H4 + Steps + Expected Results) の構造.

## Generator 起動

```
@playwright-test-generator

specs/todomvc-coverage-gap.plan.md を読んで, tests/generated/todomvc-edge-cases.spec.ts
を生成して. 規約:
- 冒頭に // spec: と // seed: のコメント
- import は ../../fixtures.js から
- describe は H3 名, test は H4 名と一致
- step テキストは // 1. ... コメントで挿入
- Expected Results は // - ... コメント + expect()
```

## Healer 起動 (失敗時)

```
@playwright-test-healer

tests/generated/todomvc-edge-cases.spec.ts を test_run で実行. 失敗テストが
あれば selector 変更 / timing / data dependency / アプリ変更 のいずれかに分類し,
selector 変更と timing は修復案を Edit ツールで適用. data dependency は seed の
更新を提案. アプリ変更は test.fixme() で skip しコメントを残して.
```

## レビューと PR 化

Healer の修復案は人間レビューを経て git commit する. 完全自動化された PR 作成は
本書スコープ外 (Ch08 の方針踏襲).
