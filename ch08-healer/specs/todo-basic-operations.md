# Todo Application - Basic Operations Test Plan

## Application Overview

The Todo application is a minimal task management UI built with vanilla JavaScript. It mirrors the TodoMVC patterns and provides the following features:

- **Task Management**: Add, complete, and delete individual todos via an input field and inline buttons
- **Bulk Cleanup**: Clear all completed todos with a single button
- **Filtering System**: View todos by All, Active, or Completed status using filter buttons
- **Active Counter**: Display the number of incomplete todos in real time
- **Keyboard-Driven**: Submit a todo with Enter to keep hands on the keyboard

## Test Scenarios

### 1. Adding Todos

**Seed:** `tests/seed-todo.spec.ts`

#### 1.1 Add a Valid Todo

**Steps:**
1. Click the input field labeled "タスク"
2. Type "牛乳を買う"
3. Press Enter

**Expected Results:**
- The new todo appears in the list with an unchecked checkbox
- The active counter shows "1"
- The input field is cleared and ready for the next entry

#### 1.2 Reject Empty Submission

**Steps:**
1. Click the input field labeled "タスク"
2. Submit the form without entering text by pressing Enter

**Expected Results:**
- No new item is added to the todo list
- The active counter remains unchanged

### 2. Completing Todos

**Seed:** `tests/seed-todo.spec.ts`

#### 2.1 Mark a Todo as Completed

**Steps:**
1. Add a todo named "資料レビュー"
2. Click the checkbox associated with "資料レビュー"

**Expected Results:**
- The checkbox becomes checked
- The active counter decreases by 1
- The todo text is visually struck through

#### 2.2 Toggle a Completed Todo Back to Active

**Steps:**
1. Add a todo named "資料レビュー" and mark it completed
2. Click the checkbox again

**Expected Results:**
- The checkbox becomes unchecked
- The active counter increases by 1

### 3. Filtering Todos

**Seed:** `tests/seed-todo.spec.ts`

#### 3.1 Filter to Active Only

**Steps:**
1. Add three todos: "A", "B", "C"
2. Mark "B" as completed
3. Click the filter button labeled "Active"

**Expected Results:**
- The list shows only "A" and "C"
- The "Active" button has aria-pressed="true"

#### 3.2 Filter to Completed Only

**Steps:**
1. Add three todos: "A", "B", "C"
2. Mark "B" as completed
3. Click the filter button labeled "Completed"

**Expected Results:**
- The list shows only "B"
- The "Completed" button has aria-pressed="true"

### 4. Clearing Completed Todos

**Seed:** `tests/seed-todo.spec.ts`

#### 4.1 Clear All Completed Items

**Steps:**
1. Add three todos: "A", "B", "C"
2. Mark "A" and "C" as completed
3. Click the button "完了済みをクリア"

**Expected Results:**
- The list shows only "B"
- The active counter shows "1"
