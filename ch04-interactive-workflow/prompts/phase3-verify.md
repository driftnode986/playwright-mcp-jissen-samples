# Phase 3: 期待動作確認プロンプト

Phase 2 で抽出したシナリオを実機で踏破して、期待される最終状態を確認してください。

実施事項:

1. シナリオごとに `browser_snapshot` で初期状態を確認する
2. 操作ツールでステップを実行する:
   - 入力: `browser_type` または `browser_fill_form`
   - クリック: `browser_click`
   - キー: `browser_press_key`
   - 選択: `browser_select_option`
   - ダイアログ: `browser_handle_dialog`
3. 状態変化の待機は `browser_wait_for` を使う（固定 sleep は最後の手段）
4. 各ステップ後に `browser_snapshot` で観察される変化を記録する
5. 期待される最終状態と実際の accessibility tree を突き合わせる

前提条件の整え方:

- 認証状態が必要なシナリオでは `browser_set_storage_state` で `./auth/admin.json` から復元する
- 起動時に渡したい場合は `--storage-state=./auth/admin.json` を `mcp.json` に書く
- データクリーンアップが必要なら、シナリオ末尾で逆操作（削除・サインアウト等）を行う

出力フォーマット:

```
## シナリオ: <名前>

前提:
- <前提 1>
- <前提 2>

実行ステップと観察:
1. <ツール呼び出し> → <観察された変化>
2. ...

期待状態との一致: PASS | DIFF（差分は箇条書き）

副作用:
- console.error: <件数> 件
- network: <api endpoint と status code>
```

注意:

- ステップが失敗したら止めて差分を報告する。勝手に代替操作で繋がない
- 「ボタンが見つかりません」と返したい場合は、`browser_snapshot` で実際に存在する近い役割の候補を列挙する
