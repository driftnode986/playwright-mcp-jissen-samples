# Phase 1: 探索プロンプト

このページに対する E2E テストを書きたいので、まず構造を把握してください。

対象 URL: <PASTE_URL>

実施事項:

1. `browser_navigate` で対象 URL を開く
2. `browser_snapshot` で accessibility tree を取得する
3. 主要な `role` と accessible name を箇条書きで列挙する
4. ナビゲーションで遷移する次画面の URL 候補があれば、その URL も列挙する

出力フォーマット:

- 画面名: <H1 の accessible name>
- ランドマーク（banner / main / nav / form / search 等）と各々の accessible name
- 主要な操作要素（button / link / textbox / checkbox / select 等）の role と accessible name
- 観測した次画面 URL（ある場合）

注意:

- 出力は事実のみ。推測で「ボタンを押すと XXX が起きる」と書かない（Phase 3 で検証する）
- 同名の要素が複数ある場合はその旨を明示する
