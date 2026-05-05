# Shop Application - Search and Cart Test Plan

## Application Overview

The Shop application is a minimal product search UI used to
demonstrate Playwright MCP. It exposes the following features:

- **Keyword Search**: Filter the product catalog by keyword
- **Pagination**: Navigate paginated results with previous and next
- **Cart Counter**: Add products to the cart and observe a counter
- **Accessible Markup**: Form regions and live regions are role-based

## Test Scenarios

### 1. Browsing the Catalog

**Seed:** `tests/seed-shop.spec.ts`

#### 1.1 Render the Initial Catalog

**Steps:**
1. Open the shop page

**Expected Results:**
- The product list renders the first three products
- The page indicator shows "1 / 3"
- The "前のページ" button is disabled
- The "次のページ" button is enabled

#### 1.2 Move to the Next Page

**Steps:**
1. Open the shop page
2. Click "次のページ"

**Expected Results:**
- The product list renders the next three products
- The page indicator shows "2 / 3"
- The "前のページ" button is enabled

### 2. Searching by Keyword

**Seed:** `tests/seed-shop.spec.ts`

#### 2.1 Search for an Existing Product

**Steps:**
1. Type "キーボード" into the search field
2. Click the "検索" button

**Expected Results:**
- The product list shows only the keyboard products
- The page indicator shows "1 / 1"

#### 2.2 Search With No Match

**Steps:**
1. Type "存在しない商品" into the search field
2. Click the "検索" button

**Expected Results:**
- The product list is empty
- The page indicator shows "1 / 1"

### 3. Adding Products to the Cart

**Seed:** `tests/seed-shop.spec.ts`

#### 3.1 Add a Single Product

**Steps:**
1. Open the shop page
2. Click "黒色のキーボードをカートに追加"

**Expected Results:**
- The cart counter shows "1"

#### 3.2 Add Multiple Products

**Steps:**
1. Open the shop page
2. Click "黒色のキーボードをカートに追加"
3. Click "白色のキーボードをカートに追加"
4. Click "ワイヤレスマウスをカートに追加"

**Expected Results:**
- The cart counter shows "3"
