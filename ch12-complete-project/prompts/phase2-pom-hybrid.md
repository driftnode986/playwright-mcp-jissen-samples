# Phase 2 - 既存 POM のハイブリッド化

Ch10 のハイブリッド POM 設計指針に従って, 既存の純 POM (TodoPage) に AI 操作の
探索系メソッドを追加する.

## 探索

```
pages/TodoPage.ts の現状を読んで, 確定系メソッド (addTodo, toggleByTitle 等) と
未実装の探索系を整理して.
```

## ハイブリッド版設計

```
TodoPage を継承する HybridTodoPage を設計して. 命名規約は次のとおり:
- 探索系: discover / findBy プレフィックス
- 確定系: 通常の動詞
2 つの探索系メソッドを提案して (例: discoverAndCompleteFirstActive,
findByKeywordAndDeleteAll). 各メソッドの I/O と AI 操作プロンプトを書いて.
```

## フォールバック実装

```
companion repo は npx playwright test で動かすため, AI 操作の代わりに Locator
操作で同じ結果になる「フォールバック実装」を書いて. テスト側からは AI 版と
同じ呼び出し方ができることを確認して.
```

## テストの追加

```
HybridTodoPage の 2 メソッドそれぞれに 1 件ずつ test を書いて. ファイル名は
tests/hybrid-pom/todomvc-explore.spec.ts. import は ../../fixtures.js から.
expect は web-first assertion のみ.
```

## セルフレビュー

```
Ch10 のアンチパターン 4 種に該当しないか自己レビューして. 特に「同じ機能の純 POM 版
と AI 操作版が並存して片方しか保守されない設計」になっていないか確認して.
```
