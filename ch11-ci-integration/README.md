# ch11-ci-integration

第 11 章（CI 統合）のサンプル。Ch10 の純 POM テスト 4 spec を流用し、CI 上で動かす
ためのワークフロー 4 種と playwright.config.ts の CI 条件分岐を提供する。

## 構成

```
ch11-ci-integration/
├── package.json
├── tsconfig.json
├── playwright.config.ts          # CI 条件分岐（forbidOnly / retries / workers / blob reporter）
├── apps/                         # Ch10 から流用
├── pages/                        # Ch10 から流用（純 POM 4 クラス）
├── fixtures.ts                   # Ch10 から流用
├── auth/admin.json               # Ch10 から流用
├── tests/                        # Ch10 から流用（4 spec / 8 tests）
└── .github/workflows/
    ├── playwright-basic.yml      # PR / push トリガー、Chromium 単一ジョブ
    ├── playwright-sharded.yml    # matrix で 4 並列 + merge-reports で HTML 統合
    ├── playwright-matrix.yml     # 3 ブラウザ × 2 shard、main マージ時のみ
    └── playwright-nightly.yml    # cron で毎日 03:00 JST にフルリグレッション
```

## ローカル実行

```bash
npm install
npx playwright install --with-deps chromium
npx playwright test --project=chromium
```

期待結果: `8 passed`（Chromium 単一プロジェクト）。Firefox / WebKit を加える場合は
`npx playwright install firefox webkit` 後に `npx playwright test` で全 24 tests。

## CI 条件分岐の動作確認

`CI=true` を指定するとレポーターが blob に切り替わる。

```bash
CI=true npx playwright test --project=chromium --shard=1/2
CI=true npx playwright test --project=chromium --shard=2/2
npx playwright merge-reports --reporter html ./blob-report
npx playwright show-report
```

shard 2 回実行で `blob-report/` に 2 ファイル分の blob が出力され、merge-reports で
HTML レポートが `playwright-report/` に統合される。GitHub Actions では shard ごとに
別ジョブで blob を出力 → merge-reports ジョブでダウンロード → HTML 化、という流れ。

## ワークフローの使い分け

- `playwright-basic.yml`: PR の最低限の検証。Chromium のみ。実行時間 5〜10 分が目安
- `playwright-sharded.yml`: PR で並列実行が必要な場合。4 shard で実行時間を 1/4 に
  圧縮できるが、ジョブ数 4 倍 + merge-reports 1 ジョブで GitHub Actions 課金が増える
- `playwright-matrix.yml`: main マージ時の本格検証。3 ブラウザ × 2 shard = 6 ジョブ +
  merge-reports 1 ジョブで全ブラウザ互換性を確認
- `playwright-nightly.yml`: 毎日 1 回のフルリグレッション。失敗時は test-results/
  も artifact 化して翌朝レビュー

## トラブルシューティング

### `actions/upload-artifact@v4` と `@v5` が混在している

Playwright 公式ドキュメント自体で混在しているため、本書では sharding 系（blob /
HTML）は `@v4`（公式 sharding doc verbatim）、基本ワークフローと nightly は `@v5`
（公式 ci-intro doc に揃える）で統一している。

### `merge-reports` が「No blob reports found」で失敗する

shard ジョブ側で blob reporter が動いていないか、download-artifact の
`pattern: blob-report-*` が一致していない。`actions/download-artifact@v5` の
`merge-multiple: true` で複数 shard の blob を 1 ディレクトリに展開できる。

### secrets が trace / screenshot / video に漏出する

公式 ci-intro doc が明示している警告: trace ファイル / HTML レポート / コンソール
ログには認証情報やアクセストークンが含まれる可能性がある。アップロード前にマスキ
ングするか、artifacts のアクセス制御を厳密に設定する。

## 一次ソース

- CI セットアップ: <https://playwright.dev/docs/ci>
- CI Intro: <https://playwright.dev/docs/ci-intro>
- Test Sharding: <https://playwright.dev/docs/test-sharding>
- Test Reporters: <https://playwright.dev/docs/test-reporters>
- Test Retries: <https://playwright.dev/docs/test-retries>
- Trace Viewer Intro: <https://playwright.dev/docs/trace-viewer-intro>
