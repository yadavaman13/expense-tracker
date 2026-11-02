# Expense Tracker — Design Specification

**Version:** 1.0
**Date:** 2026-11-02
**Platform:** Android (iOS-ready)
**Tech Stack:** React Native, Expo (Managed, SDK 52+), JavaScript, Expo Router, Zustand, React Native Paper, AsyncStorage

---

## 1. Product Overview

A simple offline-first mobile app for recording daily income and expenses, monitoring spending habits, and viewing financial summaries through a clean dashboard.

## 2. Architecture

**Pattern:** Feature-based folder structure with file-based routing.

- **Routing:** Expo Router — file-based, tab navigator with modal screens
- **State:** Zustand with `persist` middleware → AsyncStorage (auto-sync)
- **UI:** React Native Paper (Material Design 3) with custom minimalist theme
- **Charts:** react-native-chart-kit for analytics visualizations

**Data Flow:**
```
User Action → Screen (Expo Router) → Zustand Store Action → State Update → AsyncStorage (auto-persist)
                                                                ↓
                                                    Selectors trigger re-render
```

## 3. Design System — Minimalist B/W/Grey

### Color Palette

| Token             | Value     | Usage                              |
|--------------------|-----------|------------------------------------|
| `background`       | `#FFFFFF` | Screen backgrounds                 |
| `surface`          | `#F5F5F5` | Cards, input fields                |
| `surfaceVariant`   | `#EEEEEE` | Dividers, secondary surfaces       |
| `onBackground`     | `#1A1A1A` | Primary text                       |
| `onSurface`        | `#333333` | Secondary text                     |
| `outline`          | `#CCCCCC` | Borders, dividers                  |
| `muted`            | `#999999` | Placeholder text, disabled states  |
| `primary`          | `#1A1A1A` | Primary buttons, active tabs       |
| `onPrimary`        | `#FFFFFF` | Text on primary buttons            |
| `income`           | `#2E7D32` | Income amounts (green accent)      |
| `expense`          | `#C62828` | Expense amounts (red accent)       |
| `error`            | `#B00020` | Validation errors                  |

### Typography

- **Font:** System default (San Francisco on iOS, Roboto on Android)
- **Hierarchy:**
  - Balance display: 32px, bold, `#1A1A1A`
  - Section headers: 16px, semibold, `#1A1A1A`
  - Body text: 14px, regular, `#333333`
  - Captions: 12px, regular, `#999999`

### Design Principles

1. **Generous whitespace** — let content breathe, no visual clutter
2. **Flat cards** — subtle elevation (elevation: 1), rounded corners (12px)
3. **Monochrome icons** — outlined style, `#333333`
4. **Green/Red only** for income/expense amounts — the only color accents
5. **No gradients, no shadows heavier than elevation 1**

## 4. Folder Structure

```
expense-tracker-native/
├── app/                          # Expo Router file-based routes
│   ├── _layout.js                # Root layout (PaperProvider, theme, fonts)
│   ├── (tabs)/                   # Tab navigator group
│   │   ├── _layout.js            # Tab bar config (3 tabs)
│   │   ├── index.js              # Dashboard screen
│   │   ├── transactions.js       # Transaction list screen
│   │   └── analytics.js          # Analytics screen
│   └── transaction/
│       ├── add.js                # Add transaction (modal/push)
│       └── [id].js               # Edit transaction (dynamic route)
├── src/
│   ├── components/               # Shared UI components
│   │   ├── BalanceSummary.js      # Balance, income, expense cards
│   │   ├── TransactionCard.js    # Single transaction row
│   │   ├── TransactionList.js    # FlatList of TransactionCards
│   │   ├── CategoryPicker.js     # Category selection chips
│   │   ├── FilterBar.js          # Type/category/month filter controls
│   │   ├── EmptyState.js         # Empty list placeholder
│   │   ├── DeleteConfirmDialog.js # Confirm delete dialog
│   │   └── charts/
│   │       ├── SpendingPieChart.js    # Category breakdown pie chart
│   │       └── MonthlyBarChart.js     # Monthly income vs expense bars
│   ├── store/
│   │   └── useTransactionStore.js # Zustand store (all transaction state + actions)
│   ├── constants/
│   │   ├── categories.js         # Predefined income/expense categories
│   │   └── theme.js              # Paper theme overrides (B/W/Grey palette)
│   ├── utils/
│   │   ├── calculations.js       # Balance, totals, category sums
│   │   ├── formatters.js         # Currency formatting, date formatting
│   │   └── filters.js            # Filter and sort transaction arrays
│   └── hooks/
│       ├── useFilteredTransactions.js  # Filtered + sorted transactions
│       └── useMonthlyStats.js         # Monthly aggregation for analytics
├── assets/                       # App icon, splash, static images
├── docs/                         # PRD, specs, plans
├── app.json                      # Expo configuration
├── babel.config.js               # Babel config
└── package.json
```

## 5. Data Model

### Transaction

```js
{
  id: "uuid-v4",              // string — unique identifier
  type: "income" | "expense", // string — transaction type
  amount: 250,                // number — must be > 0
  category: "Food",           // string — from predefined list
  description: "Lunch",       // string — optional, max 100 chars
  date: "2026-11-02",         // string — ISO date (YYYY-MM-DD)
  createdAt: "2026-11-02T10:30:00Z" // string — ISO timestamp
}
```

### Categories

**Expense:** Food, Transport, Shopping, Bills, Entertainment, Health, Education, Other
**Income:** Salary, Freelance, Investment, Gift, Other

## 6. Zustand Store Shape

```js
{
  // State
  transactions: [],           // Transaction[]

  // Actions
  addTransaction: (data) => void,
  updateTransaction: (id, data) => void,
  deleteTransaction: (id) => void,

  // Selectors (derived in hooks, not store)
}
```

The store uses Zustand's `persist` middleware with AsyncStorage. Derived data (balance, totals, filtered lists) is computed in custom hooks, not stored.

## 7. Screen Specifications

### Screen 1: Dashboard (`app/(tabs)/index.js`)
- **BalanceSummary** — total balance (large), income total (green), expense total (red)
- **Recent Transactions** — last 5 transactions as TransactionCards
- **FAB** (Floating Action Button) — navigates to Add Transaction
- Pull-to-refresh not needed (local data, always fresh)

### Screen 2: Add/Edit Transaction (`app/transaction/add.js`, `app/transaction/[id].js`)
- **Type toggle** — Income / Expense (segmented button)
- **Amount input** — numeric keyboard, required, must be > 0
- **Category picker** — chips filtered by selected type
- **Date picker** — native date picker, defaults to today
- **Description input** — optional text field, max 100 chars
- **Save button** — validates, saves to store, navigates back
- Edit screen pre-fills form with existing transaction data

### Screen 3: Transactions (`app/(tabs)/transactions.js`)
- **FilterBar** — filter by type (All/Income/Expense), category, month
- **TransactionList** — FlatList with TransactionCards, sorted by date (newest first)
- **Swipe-to-delete** or long-press → delete confirmation dialog
- **Tap** → navigate to edit screen
- **EmptyState** when no transactions match filters

### Screen 4: Analytics (`app/(tabs)/analytics.js`)
- **Month selector** — previous/next month arrows with month label
- **SpendingPieChart** — category-wise expense breakdown
- **MonthlyBarChart** — income vs expense comparison for selected month
- **Stats cards** — highest spending category, total transactions count

## 8. Validation Rules

| Field       | Rule                                      | Error Message                    |
|-------------|-------------------------------------------|----------------------------------|
| amount      | Required, number, > 0                     | "Amount must be greater than 0"  |
| type        | Required, "income" or "expense"           | "Select transaction type"        |
| category    | Required, must be from predefined list    | "Select a category"              |
| date        | Required, valid date, not in future       | "Select a valid date"            |
| description | Optional, max 100 characters              | "Description too long"           |

## 9. Dependencies

| Package                                    | Purpose                          |
|--------------------------------------------|----------------------------------|
| `expo` (SDK 52+)                           | Framework                        |
| `expo-router`                              | File-based navigation            |
| `react-native-paper`                       | UI component library             |
| `react-native-safe-area-context`           | Safe area handling               |
| `react-native-screens`                     | Native screen containers         |
| `zustand`                                  | State management                 |
| `@react-native-async-storage/async-storage`| Local persistence                |
| `react-native-chart-kit`                   | Charts for analytics             |
| `react-native-svg`                         | SVG support (chart-kit dep)      |
| `@react-native-community/datetimepicker`   | Native date picker               |
| `uuid`                                     | Transaction ID generation        |
| `expo-haptics`                             | Subtle haptic feedback on delete |

## 10. Non-Functional Requirements

- Responsive layouts for different screen sizes
- Smooth 60fps navigation between screens
- Data persists locally via AsyncStorage (survives app close)
- No internet required for any feature
- All form inputs validated before save
- Accessible: proper labels, contrast ratios, touch targets ≥ 48dp

## 11. Out of Scope (v1)

- User authentication
- Cloud sync / backend
- Multi-currency
- Recurring transactions
- Export to CSV/PDF
- Dark mode (future enhancement)

