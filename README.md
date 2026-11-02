# Expense Tracker (React Native / Expo)

A minimalist, offline-first mobile expense tracking application built with **React Native**, **Expo (Managed Workflow)**, **Expo Router**, **Zustand**, and **React Native Paper**.

The application helps users track daily income and expenses, monitor spending habits by category, and visualize financial summaries through a clean dashboard and monthly analytics charts.

---

## Features

- **Offline-First & Persistent**: All transaction data is saved locally on device storage using Zustand and AsyncStorage. No network connection required.
- **Dashboard**:
  - Net balance card with total income and total expense summaries.
  - Recent transactions list (last 5 entries).
  - Floating Action Button (FAB) for fast transaction entry.
- **Transaction Management**:
  - Add transaction with type toggle (Expense / Income), amount with ₹ currency formatting, category picker chips, native date picker, and optional description (max 100 characters).
  - Edit existing transactions with pre-populated form values.
  - Swipe/Long-press delete with confirmation dialog and haptic feedback.
  - Form validation: enforces amounts > 0, required categories, and prevents future dates.
- **Filterable & Searchable History**:
  - Full list of all historical transactions sorted newest first.
  - Live search bar filtering by description and category.
  - Filter by transaction type (All / Income / Expense) and category.
- **Monthly Analytics & Visualizations**:
  - Month-by-month navigation (prev/next month controls, restricted to current/past dates).
  - High-level monthly metrics: total transaction count and highest spending category.
  - **Bar Chart**: Income vs Expenses comparison for the selected month.
  - **Pie Chart**: Category-wise expense breakdown with proportional legend and percentages.
- **Minimalist Aesthetic**:
  - Strict Black/White/Grey Material Design 3 palette.
  - Strategic green (`#2E7D32`) and red (`#C62828`) color accents reserved exclusively for income and expense amounts.
  - Subtle elevations and responsive touch targets (≥ 48dp).

---

## Tech Stack & Architecture

| Layer | Technology | Description |
|---|---|---|
| **Framework** | Expo (SDK 58+, Managed) | Native runtime & tooling |
| **Language** | JavaScript (ES6+) | Application code |
| **Routing** | Expo Router | File-based navigation with stack & tab navigators |
| **UI Components** | React Native Paper (MD3) | Accessible UI component library |
| **State Management** | Zustand | Global store with persist middleware |
| **Persistence** | `@react-native-async-storage/async-storage` | Local asynchronous key-value storage |
| **Charts** | `react-native-chart-kit` & `react-native-svg` | SVG-based bar and pie charts |
| **Form Inputs** | `@react-native-community/datetimepicker` | Native date pickers |
| **Haptics** | `expo-haptics` | Subtle tactile feedback for user actions |
| **Icons** | `@expo/vector-icons` | Monochrome Material Community Icons |

---

## Design System

### Color Palette

| Token | Hex Value | Usage |
|---|---|---|
| `background` | `#FFFFFF` | Screen backgrounds |
| `surface` | `#F5F5F5` | Card surfaces, input fields, search bar |
| `surfaceVariant` | `#EEEEEE` | Borders, dividers, pressed states |
| `onBackground` | `#1A1A1A` | Primary text and headings |
| `onSurface` | `#333333` | Secondary text |
| `outline` | `#CCCCCC` | Borders and dividers |
| `muted` | `#999999` | Placeholders, inactive icons, captions |
| `primary` | `#1A1A1A` | Primary action buttons, active tab indicators |
| `onPrimary` | `#FFFFFF` | Text/icons on primary surfaces |
| `income` | `#2E7D32` | Income amounts and positive totals |
| `expense` | `#C62828` | Expense amounts and negative totals |
| `error` | `#B00020` | Form validation error alerts |

---

## Project Directory Structure

```
expense-tracker-native/
├── app/                          # Expo Router routes
│   ├── _layout.js                # Root stack layout (Theme + Safe Area Provider)
│   ├── (tabs)/                   # Bottom tab navigator
│   │   ├── _layout.js            # Tab bar configuration & icons
│   │   ├── index.js              # Dashboard screen
│   │   ├── transactions.js       # Transaction list screen with filters
│   │   └── analytics.js          # Monthly analytics & charts screen
│   └── transaction/
│       ├── add.js                # Add transaction modal screen
│       └── [id].js               # Edit transaction dynamic route
├── src/
│   ├── components/               # Reusable UI components
│   │   ├── BalanceSummary.js     # Balance, income, expense overview cards
│   │   ├── CategoryPicker.js     # Horizontal category chip selector
│   │   ├── DeleteConfirmDialog.js# Confirmation dialog for deletion
│   │   ├── EmptyState.js         # Placeholder for empty lists
│   │   ├── FilterBar.js          # Segmented type & category filter bar
│   │   ├── TransactionCard.js    # Single transaction row card
│   │   ├── TransactionList.js    # FlatList wrapper with empty & header support
│   │   └── charts/
│   │       ├── MonthlyBarChart.js   # Income vs Expense bar chart
│   │       └── SpendingPieChart.js  # Category breakdown pie chart
│   ├── constants/
│   │   ├── categories.js         # Predefined income and expense categories
│   │   └── theme.js              # React Native Paper MD3 theme tokens
│   ├── hooks/
│   │   ├── useFilteredTransactions.js # Search, type, and category filter hook
│   │   └── useMonthlyStats.js         # Monthly data aggregation hook
│   ├── store/
│   │   └── useTransactionStore.js # Zustand store with AsyncStorage persistence
│   └── utils/
│       ├── calculations.js       # Balance and category percentage math
│       ├── filters.js            # Filter and sort algorithms
│       └── formatters.js         # Currency and date string formatters
├── assets/                       # App icons, splashes, and adaptive images
├── docs/
│   ├── PS.md                     # Problem statement and requirements
│   ├── plans/
│   │   └── plan.md               # Step-by-step phased implementation plan
│   └── specs/
│       └── design.md             # Technical design specifications
├── app.json                      # Expo application configuration
├── babel.config.js               # Babel configuration with Reanimated plugin
├── package.json                  # Dependencies and scripts
└── README.md                     # Project documentation
```

---

## Data Model & State Management

### Transaction Model

```typescript
interface Transaction {
  id: string;               // Unique ID (UUID v4)
  type: "income" | "expense";// Transaction type
  amount: number;           // Value > 0
  category: string;         // Predefined category name
  description: string;      // Optional note (max 100 characters)
  date: string;             // ISO date string (YYYY-MM-DD)
  createdAt: string;        // ISO timestamp
}
```

### Predefined Categories

- **Expense**: `Food`, `Transport`, `Shopping`, `Bills`, `Entertainment`, `Health`, `Education`, `Other`
- **Income**: `Salary`, `Freelance`, `Investment`, `Gift`, `Other`

### Store Actions (`useTransactionStore`)

- `addTransaction(data)`: Generates a unique ID and ISO timestamp, prepending the new transaction to state.
- `updateTransaction(id, data)`: Merges updated fields into the matching transaction.
- `deleteTransaction(id)`: Removes the matching transaction by ID.
- Automatically persisted to local storage under key `expense-tracker-storage`.

---

## Getting Started

### Prerequisites

- Node.js (v22.13.0+ LTS recommended)
- npm or bun

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd expense-tracker-native

# Install dependencies
npm install --legacy-peer-deps
```

### Running the App

```bash
# Start the Expo development server
npx expo start

# Run on Android emulator / connected device
npx expo run:android
# Or press 'a' in the interactive terminal

# Run on iOS simulator (macOS required)
npx expo run:ios
# Or press 'i' in the interactive terminal

# Run in web browser
npx expo start --web
```

### Verification & Health Checks

```bash
# Verify project dependencies and configuration
npx expo-doctor
```

---

## 📜 Implementation Phases & Git Commit History

The project was constructed following a structured 9-phase implementation plan:

```text
a41e167 (tag: v1.0.0) feat: add tab bar icons and final UI polish
438d9e1 feat: analytics screen with monthly navigation, pie chart, and bar chart
aeaa2e0 feat: transactions screen with search, type and category filters
a5eae1f feat: dashboard screen with balance summary, recent transactions, and FAB
c17718f feat: edit transaction screen with pre-filled form and delete action
fa5652c feat: add transaction screen with form validation and haptic feedback
814bf64 feat: add shared UI components — BalanceSummary, TransactionCard, FilterBar, etc.
a5f32df feat: add Zustand store with AsyncStorage persistence and utility functions
6f1b5d1 feat: project scaffolding with Expo Router, Paper theme, and categories
```

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
