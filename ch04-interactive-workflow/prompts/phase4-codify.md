# Phase 4: テストコード化プロンプト

Phase 3 で PASS したシナリオを Playwright Test の `.spec.ts` に落としてください。

実施事項:

1. シナリオごとに 1 ファイル、または関連するシナリオを `test.describe` でまとめる
2. ロケータは `browser_generate_locator` を使って、Phase 3 で採取した ref から取得する
3. アサーションには Playwright Test 標準の `expect` を使う
4. 副作用の検証が必要なら `page.waitForResponse` を使う（Phase 3 で観察した URL とステータスを根拠にする）

出力ルール:

- ファイルパス: `tests/<シナリオ群>.spec.ts`
- import: `@playwright/test` の `test` と `expect` のみ。MCP 関連の import は含めない
- ベース URL は `playwright.config.ts` の `use.baseURL`、または相対 URL ベタ書きでよい
- ロケータは可能な限り `getByRole` / `getByLabel` / `getByText`。`getByTestId` は対象 HTML が用意している場合のみ
- `test.beforeEach` で共通の `page.goto` をまとめる
- `test.describe.configure({ mode: 'parallel' })` は付けない（既定 `fullyParallel: true` を尊重）

品質チェック観点（生成後に self-review に渡すための事前チェック）:

1. 同一 ref を複数のテストで使い回していないか（ref はセッション境界でリセットされる）
2. アサーションは「最終状態の accessibility tree」を見ているか（中間状態を assert していないか）
3. ハードコードされた待機時間（`page.waitForTimeout`）を使っていないか
4. テストが他テストの状態に依存していないか（`fullyParallel` 下で安全か）
5. console.error の検出が必要なシナリオでは `page.on('console', ...)` を仕込んでいるか
6. 認証が必要なシナリオで storage state 注入が漏れていないか
7. ファイル命名と `test.describe` の名前が読み手に伝わるか
