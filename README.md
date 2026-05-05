# Claude Code × Playwright MCP 実践ガイド — サンプルコード

書籍「Claude Code × Playwright MCP 実践ガイド — AI ネイティブな E2E テスト自動化」（牧野 誠 著）のサンプルコードリポジトリです。

## ディレクトリ構成

| ディレクトリ | 章 | 内容 |
|-------------|-----|------|
| `ch02-setup/` | 第2章 | Playwright MCP のセットアップ（`mcp.json` 設定例 + 接続確認） |
| `ch03-accessibility-tree/` | 第3章 | accessibility tree と自然言語操作 |
| `ch04-interactive-workflow/` | 第4章 | 対話型 UI テスト構築ワークフロー |
| `ch05-test-agents/` | 第5章 | Playwright Test Agents セットアップ |
| `ch06-planner/` | 第6章 | Planner 実行例（todo / EC / SaaS） |
| `ch07-generator/` | 第7章 | Generator 出力サンプル |
| `ch08-healer/` | 第8章 | Healer 修復実例 |
| `ch09-locator-strategy/` | 第9章 | Locator 戦略の比較 |
| `ch10-pom-hybrid/` | 第10章 | POM + AI ハイブリッド設計 |
| `ch11-ci-integration/` | 第11章 | GitHub Actions ワークフロー |
| `ch12-complete-project/` | 第12章 | 既存サイトに導入する完成形プロジェクト |

第1章は概念中心のためサンプルコードはありません。

## 動作環境

| パッケージ | バージョン |
|-----------|-----------|
| Node.js | 20 LTS+ |
| `@playwright/test` | 1.50+ |
| `@playwright/mcp` | v0.0.68+ |
| TypeScript | 5.x |

## 使い方

```bash
git clone https://github.com/driftnode986/playwright-mcp-jissen-samples.git
cd playwright-mcp-jissen-samples/ch02-setup
npm install
# 各章の README に従う
```

## ライセンス

MIT License
