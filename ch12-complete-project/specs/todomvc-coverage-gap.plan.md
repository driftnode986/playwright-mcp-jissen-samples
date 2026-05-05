# TodoMVC Coverage Gap - Phase 3 Test Plan

## Application Overview

- **Task Management**: TodoMVC ローカルフィクスチャ (apps/todomvc.html) を対象とする
- **Existing Coverage**: smoke 1 件 + pure POM 4 件 + hybrid POM 2 件 = 7 件
- **Coverage Gap**: 入力バリデーション, トグルオール挙動, 空入力処理が未カバー

## Test Scenarios

### Edge Cases

**Seed:** `tests/seed.spec.ts`

#### 1.1 Reject empty input on Enter

**Steps:**

1. Focus the new todo input
2. Press Enter without typing anything

**Expected Results:**

- Todo list remains empty

#### 1.2 Trim whitespace before saving

**Steps:**

1. Type a title with trailing whitespace
2. Press Enter

**Expected Results:**

- Todo is saved with whitespace trimmed

#### 1.3 Toggle all flips every todo

**Steps:**

1. Add three todos
2. Click the toggle-all checkbox

**Expected Results:**

- All items move to completed and counter shows 0
