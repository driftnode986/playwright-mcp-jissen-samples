# SaaS Dashboard Application - Basic Operations Test Plan

## Application Overview

The SaaS Dashboard application surfaces operational KPIs and recent alerts for an internal user. It demonstrates a dashboard pattern frequently encountered in B2B SaaS products. Key features include:

- **KPI Tiles**: Active users, revenue (JPY), and churn rate are displayed for a selected time range
- **Range Filter**: Switch between 7 day, 30 day, and 90 day windows
- **Alert List**: Browse recent alerts and open a detail panel
- **Detail Drawer**: Reveal alert body text in a dedicated section that can be dismissed

## Test Scenarios

### 1. Inspecting KPIs

**Seed:** `tests/seed-saas.spec.ts`

#### 1.1 Default Range Shows 7 Day KPIs

**Steps:**
1. Open the SaaS dashboard page

**Expected Results:**
- The "7 日" range button has aria-pressed="true"
- The active users tile shows "1230"
- The revenue tile shows "482000"
- The churn rate tile shows "2.1%"

#### 1.2 Switch to 30 Day Range

**Steps:**
1. Open the SaaS dashboard page
2. Click the range button "30 日"

**Expected Results:**
- The "30 日" button has aria-pressed="true"
- The active users tile shows "4840"
- The revenue tile shows "1985000"
- The churn rate tile shows "3.4%"

### 2. Browsing Alerts

**Seed:** `tests/seed-saas.spec.ts`

#### 2.1 List Recent Alerts

**Steps:**
1. Open the SaaS dashboard page

**Expected Results:**
- The alert list shows three alert buttons
- The first alert is titled "API レイテンシ高騰"
- The detail section is hidden by default

#### 2.2 Open an Alert Detail

**Steps:**
1. Open the SaaS dashboard page
2. Click the alert titled "API レイテンシ高騰"

**Expected Results:**
- The detail section becomes visible
- The detail body text matches "直近 5 分で p95 が 800ms を超えています。"

#### 2.3 Close an Alert Detail

**Steps:**
1. Open the SaaS dashboard page
2. Click the alert titled "API レイテンシ高騰"
3. Click the "閉じる" button inside the detail section

**Expected Results:**
- The detail section is hidden again
- The detail body text is cleared
