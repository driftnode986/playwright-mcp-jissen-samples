# ch12-complete-project

第 12 章 (実践: 既存サイト導入の完成形プロジェクト) の companion repo.
Ch02-Ch11 で導入した要素を 1 つの動くプロジェクトに統合し, Phase 1/2/3 の
段階導入を読者が手元で再現できる形に揃えてある.

## 構成

```
ch12-complete-project/
├── apps/todomvc.html              # ローカル TodoMVC fixture (Phase 1-3 共通の対象)
├── pages/
│   ├── TodoPage.ts                # 純 POM (Phase 2 出発点)
│   └── HybridTodoPage.ts          # ハイブリッド POM (Phase 2 到達点)
├── fixtures.ts                    # todoPage / hybridTodoPage の 2 fixture
├── tests/
│   ├── smoke/                     # Phase 1 成果物 (@smoke タグ)
│   ├── pure-pom/                  # Phase 2 出発点
│   ├── hybrid-pom/                # Phase 2 到達点
│   └── generated/                 # Phase 3 成果物 (Generator 出力想定の手書き)
├── specs/                         # Phase 3 Planner 出力プラン
├── prompts/                       # Phase 1/2/3 のプロンプト型
├── .claude/agents/                # init-agents 生成物 (Ch05 と同じ)
├── seed.spec.ts                   # init-agents 生成物
├── .mcp.json                      # @playwright/mcp + playwright-test の 2 サーバー
├── playwright.config.ts           # Smoke / Default project 分離 + CI 条件分岐
└── .github/workflows/             # PR / main / nightly の 3 ワークフロー
```

## ローカル実行

```bash
npm install
npx playwright install --with-deps chromium
npx playwright test
```

期待結果: `9 passed` (Smoke 1 + Pure POM 4 + Hybrid POM 2 + Generated 3 - 重複なし).

Smoke のみ:

```bash
npx playwright test --project=Smoke
```

Default のみ:

```bash
npx playwright test --project=Default
```

CI 条件分岐の動作確認:

```bash
CI=true npx playwright test --shard=1/2
CI=true npx playwright test --shard=2/2
npx playwright merge-reports --reporter html ./blob-report
```

## Phase 1/2/3 の進め方

### Phase 1 - smoke の MCP 化

`prompts/phase1-smoke.md` を Claude Code セッションに貼り付けて実行する. 出力された
spec を `tests/smoke/` に保存し, `npx playwright test --project=Smoke` で安定 PASS
することを確認する. 終了条件: smoke 1 本が CI で連続 10 回以上 fail 0.

### Phase 2 - 既存 POM のハイブリッド化

`prompts/phase2-pom-hybrid.md` を実行する. `pages/HybridTodoPage.ts` のパターンに
従って既存 Page Object に探索系メソッドを追加する. 終了条件: 既存テスト全 PASS の
まま Page クラスの少なくとも 1 つがハイブリッド化されている.

### Phase 3 - Test Agents で未カバー領域を埋める

`prompts/phase3-planner.md` を実行する. Planner -> Generator -> Healer の 3 段階を
Claude Code subagent で起動し, 生成物を人間レビューしてから commit する. 終了
条件: Planner プランがレビュー済みで, 採用シナリオが tests/generated/ に PR 化
されている.

## 自社プロジェクトへの移植チェックリスト

1. `package.json` のバージョン pinning を写経 (`@playwright/mcp@0.0.73` /
   `@playwright/test@1.59.1`)
2. `playwright.config.ts` の Smoke / Default project 分離を写経
3. `.mcp.json` を `--caps=testing` で写経 (Ch04 で確立)
4. `pages/` の純 POM クラスを既存資産から 1 つ選んでハイブリッド化 (Ch10)
5. `.github/workflows/` の playwright-pr.yml を写経 -> CI で smoke が走ることを確認
6. `.claude/agents/` を `npx playwright init-agents --loop=claude` で生成

## TodoMVC を選んだ理由

`apps/todomvc.html` はローカル fixture. オンライン版は `https://demo.playwright.dev/todomvc/`
で公式 Playwright チームが運用する demo 環境を使う. 自社プロジェクトに移植する際は
自社のステージング環境 URL に置き換える.

## 一次ソース

- Best Practices: <https://playwright.dev/docs/best-practices>
- Test Annotations / Tag Tests: <https://playwright.dev/docs/test-annotations>
- Test Projects: <https://playwright.dev/docs/test-projects>
- Test Agents: <https://playwright.dev/docs/test-agents>
- Page Object Model: <https://playwright.dev/docs/pom>
- Test Sharding: <https://playwright.dev/docs/test-sharding>
- CI Intro: <https://playwright.dev/docs/ci-intro>
- TodoMVC demo (公式): <https://demo.playwright.dev/todomvc/>
