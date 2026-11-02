# you asked

message time: 2026-11-02 14:28:56

make a prd for 2nd ps

---

# chatgpt response

Here’s a beginner-friendly **Product Requirements Document (PRD)** for the 2nd project idea: Expense Tracker App, built using React Native.

# Expense Tracker — PRD

Version 1.0 · Beginner React Native Project

**Project type\:** Personal finance mobile application

**Platform\:** Android (iOS-ready)

**Tech stack\:** React Native, Expo, JavaScript, AsyncStorage

## 1. Product Overview

The Expense Tracker is a simple mobile application that helps users record their daily income and expenses, monitor their spending habits, and understand their financial status through a clean dashboard.

The app focuses on offline-first functionality and a simple user experience, making it suitable for beginners learning React Native.

## 2. Problem Statement

People often lose track of their daily spending because they do not maintain a proper record of their transactions.

The application provides a simple way to\:

- Record income and expenses.
- Track available balance.
- Categorize spending.
- Review transaction history.
- Understand monthly spending patterns.

## 3. Target Users

- Students managing monthly allowances.
- Individuals tracking personal expenses.
- Beginners who want a simple budgeting tool.

## 4. Core Features (MVP)

| Feature | Description |
|--------|--------|
| Dashboard | Display balance, income, and expenses |
| Add Transaction | Record income or expense |
| Transaction History | View all recorded transactions |
| Categories | Food, Travel, Shopping, Bills, Salary, etc. |
| Edit/Delete | Modify or remove transactions |
| Filters | Filter by type, category, and date |
| Monthly Summary | View monthly income and expenses |
| Local Storage | Persist data using AsyncStorage |

## 5. Application Screens

**Screen 1: Dashboard**

- Total balance
- Income and expense summary
- Recent transactions
- Monthly spending overview
- Floating Add button

**Screen 2: Add Transaction**

- Transaction type: Income / Expense
- Amount
- Category
- Date
- Description
- Save transaction

**Screen 3: Transactions**

- Complete transaction list
- Search and filter
- Edit and delete actions
- Sort by date

**Screen 4: Analytics**

- Monthly expense breakdown
- Category-wise spending chart
- Income vs expense comparison
- Highest spending category

## 6. Functional Requirements

**FR-01: Transaction Management**

- Users can add, edit, and delete transactions.
- Amount must be greater than zero.
- Each transaction must have a type, amount, category, and date.

**FR-02: Balance Calculation**

`Balance = Total Income − Total Expenses`

**FR-03: Category Management**

- Transactions must be assigned to predefined categories.
- Income and expense categories should be separate.

**FR-04: Filtering**

\- Filter transactions by month, category, and transaction type.

**FR-05: Data Persistence**

- Transactions must remain available after closing and reopening the app.
- Data is stored locally on the device.

## 7. Data Model

```js
{
  id: "unique-id",
  type: "expense",
  amount: 250,
  category: "Food",
  description: "Lunch",
  date: "2026-11-02",
  createdAt: "2026-11-02T10:30:00Z"
}
```

## 8. Technology Stack

| Layer | Technology |
|--------|--------|
| Mobile framework | React Native |
| Development | Expo |
| Language | JavaScript |
| Navigation | React Navigation |
| State management | React Context / useState |
| Local database | AsyncStorage |
| Charts | React Native Chart Kit |
| UI | React Native Paper |

## 9. Non-Functional Requirements

- Responsive layouts for different mobile screen sizes.
- Smooth navigation between screens.
- Data should persist locally.
- Simple and accessible UI.
- No internet connection required for core features.
- Basic validation and error handling.

## 10. Out of Scope for Version 1

To keep the project beginner-friendly, these features are excluded initially\:

- User authentication
- Cloud synchronization
- Bank account integration
- AI financial recommendations
- Multi-currency conversion
- Shared wallets

## 11. Development Roadmap

| Phase | Tasks |
|--------|--------|
| Day 1 | Expo setup, navigation, UI design |
| Day 2 | Add transaction form and validation |
| Day 3 | Transaction list, edit, delete |
| Day 4 | AsyncStorage integration |
| Day 5 | Dashboard calculations and filters |
| Day 6 | Charts and analytics |
| Day 7 | Testing, polishing, and APK build |

## 12. Success Criteria

The MVP is complete when users can\:

- Add income and expenses.
- View an accurate balance.
- Edit and delete transactions.
- Filter transaction history.
- View monthly spending analytics.
- Close and reopen the app without losing data.

**Future upgrade\:** Connect the app to a Node.js + Express backend with SQL database, JWT authentication, and cloud synchronization to turn it into a full-stack portfolio project.

![Personal Finance App by Sajon for Fireart Studio on Dribbble](https://images.openai.com/static-rsc-4/4WjKWHcZ-NY4FhyLNg0sU9N8A5dACvUXm_CL19Xu_73_OMr-OSdhDxqqNjwSsiOzUHnr-kn10OrhmILh7H7BQJww2bBrSk1nvWR1IQlegDrE2aA80PEj-kIv2GGALbcN26g6TehwaeUyeLiwo-ot_0py-lYNM5VBFYYiE8syhKDnNQWc2Nl0FTRyQnQS099-?purpose=fullsize)

![Expense Tracker & Budget App for iOS & Android](https://images.openai.com/static-rsc-4/Pa7FQPQIev54mzc_BXHTzHtFeHKUdsZLgEkpse_Sd-SEor8ycmLhW6gBQ7FRupTUtYA-uSAnUl1JFTqY_Uwtnf6mwtpC-T_qofI2MQw3O8gQWQ2D-wPYCuhrp0gLpY95KaJ4yz0cNSt0DBtrFlBRrEeKrP3_VHoBh9SVa-HToGqtvWIu1e4TXrlDVTNMNStw?purpose=fullsize)

![Lumo - Fintech Mobile app by Wuraola Olaibi on Dribbble](https://images.openai.com/static-rsc-4/g3xanPDcqtofeAVPXFUg8xyQtFy5LgyYV8eYa0sqwYLuPSY36o1KPHfAtCp1kjrZZI3-uUGhz8bOL9xhkqGXadh0Zcd_5L-TkGR2ewJpyZKfr6SHDGSZ1-VmnBEaFh03nLcP_gEfrVWAxAvBXjY3lANbdqE7TaaT74qv0YyNxZN2Mfi3NH87E6ymK-a5s4M4?purpose=fullsize)

![2025 年記帳理財 App 推薦：PTT 網友也推的 13 款記帳軟體 - 蘋果仁 - 果仁 iPhone/iOS/好物推薦科技媒體](https://images.openai.com/static-rsc-4/HdGjG2U2Sl-i-BUtoaoixh_5yEO0lQZYDzQSrhpDR4cJxUq0rjzn8E_TkMP3wo32j656qERcZtF5iIVGVgh7USW7VbSlL9imUmvuH0V9eRt60pg0MFFfzMEC0fk3h4HhhSHBqEiHNFHX_nQ0FURjdyDWAICBo6xD985CfCkWF6mGGSzU61Y0oFD40Dnqxz2d?purpose=fullsize)

---
Powered by [AI Exporter](https://saveai.net)