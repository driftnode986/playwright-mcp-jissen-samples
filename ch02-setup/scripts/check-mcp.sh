#!/usr/bin/env bash
# claude CLI から playwright MCP サーバーが登録されているかを確認する。
# 戻り値: 0 = 登録あり / 1 = claude CLI 未インストール / 2 = playwright サーバー未登録
set -euo pipefail

if ! command -v claude >/dev/null 2>&1; then
  echo "[check-mcp] claude CLI が見つかりません。Claude Code をインストールしてください。" >&2
  exit 1
fi

if ! claude mcp list 2>/dev/null | grep -qE '^playwright:[[:space:]]'; then
  echo "[check-mcp] playwright MCP サーバーが登録されていません。.mcp.json を確認してください。" >&2
  exit 2
fi

echo "[check-mcp] playwright MCP サーバーが登録されています。"
