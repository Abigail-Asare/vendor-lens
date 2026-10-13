# VendorLens

> **Tagline:** *Understand your business through your data.*

VendorLens is a full-stack small-business management and business intelligence platform designed initially for Ghanaian small and medium-sized enterprises (SMEs).

It empowers merchants and shop owners to record sales, track inventory in real-time, monitor categorized expenses, prevent stockouts with low-stock warnings, and calculate their true **Gross Profit** and **Estimated Net Operating Profit** using visual analytics.

---

## 🌟 Key Features

- **Daily Sales Management:** Fast point-of-sale recording with support for Cash, Mobile Money (MTN MoMo, Telecel Cash, AT Money), Bank Transfer, and atomic stock decrements.
- **Inventory & Stock Tracking:** SKU management, cost and selling price tracking, category categorization, restock history, and automated low-stock alerts.
- **Operating Expense Tracking:** Monitor recurring operational costs (Rent, Utilities, Transport, Salaries, Packaging, Marketing).
- **Business Intelligence & Analytics:**
  - **Revenue** vs. **Cost of Goods Sold (COGS)**
  - **Gross Profit** (`Revenue - COGS`)
  - **Estimated Net Operating Profit** (`Gross Profit - Operating Expenses`)
  - Sales volume trends and best/least-selling products.
- **Auditable & Safe:** Integer-pesewa monetary calculations eliminate floating-point rounding errors; atomic transactions prevent inventory overselling; full void audit trail.

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 18, Vite, JavaScript (ES6+), Tailwind CSS, React Router v6, Axios, Chart.js, React-Chartjs-2, Lucide Icons |
| **Backend** | Node.js, Express.js REST API, Firebase Admin SDK, Helmet, Morgan, Rate Limiting |
| **Database & Auth** | Google Cloud Firestore (NoSQL), Firebase Authentication |
| **Deployment Target**| Vercel (Frontend Client), Render (Backend API) |

---

## 📁 Repository Structure

```
vendorlens/
├── client/                     # Frontend Single Page Application (React + Vite)
│   ├── public/
│   ├── src/
│   │   ├── assets/             # Logos, static assets
│   │   ├── components/         # Reusable UI components
│   │   │   ├── common/         # Base atoms (Card, Button, Badge, Modal)
│   │   │   ├── dashboard/      # KPI cards, charts, activity summary
│   │   │   ├── inventory/      # Products table, modals, stock badges
│   │   │   ├── sales/          # POS register, cart, receipt modal
│   │   │   ├── expenses/       # Expense tracker, category pills
│   │   │   └── analytics/      # Profit breakdown, trends, charts
│   │   ├── layouts/            # Dashboard layout (Sidebar + Mobile Nav)
│   │   ├── pages/              # Route views
│   │   ├── hooks/              # Custom React hooks
│   │   ├── context/            # Global context (Auth, Business)
│   │   ├── services/           # Axios HTTP client & API callers
│   │   ├── utils/              # Currency (pesewas/cedis) & date formatters
│   │   ├── App.jsx             # Route definitions
│   │   └── main.jsx            # React root entry
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
│
├── server/                     # Backend REST API Service (Node.js + Express)
│   ├── src/
│   │   ├── config/             # Firebase Admin SDK & environment config
│   │   ├── controllers/        # HTTP request & response handlers
│   │   ├── middleware/         # Auth verification, rate limiting, error handling
│   │   ├── routes/             # REST endpoint route declarations
│   │   ├── services/           # Domain business logic & atomic transactions
│   │   ├── utils/              # Pesewas currency arithmetic & response helpers
│   │   ├── app.js              # Express app definition
│   │   └── server.js           # HTTP server bootstrap & graceful shutdown
│   ├── .env.example
│   └── package.json
│
├── docs/                       # Architecture diagrams & API documentation
│   ├── ARCHITECTURE.md         # Detailed system design, data flows, Firestore schema
│   └── API.md                  # REST API contract and endpoint specifications
│
├── .gitignore                  # Git ignore rules for node_modules, keys, and envs
├── package.json                # Monorepo root workspace and concurrent dev scripts
└── README.md                   # Project overview & documentation
```

---

## 📐 Key Engineering Decisions

### 1. Integer Pesewa Storage
JavaScript represents numbers using IEEE 754 floating-point format, which introduces rounding artifacts (e.g. `0.1 + 0.2 === 0.30000000000000004`). In financial software, this is unacceptable.  
VendorLens stores **all** monetary amounts as **integer pesewas** (`100 pesewas = 1 GHS`). Conversion to Ghana Cedis is performed strictly at the display boundary.

### 2. Atomic Server-Side Inventory Transactions
When a sale is recorded, the client never directly modifies product quantities in the database. Instead:
1. The Express server executes a **Firestore Transaction**.
2. Current product stock is read and validated.
3. If stock is insufficient, the transaction aborts with an informative error.
4. If valid, the sale document is created, product quantities are atomically decremented, and an immutable entry is written to `stockMovements`.

### 3. Clear Financial Differentiation
Revenue is **not** profit:
- **Revenue:** Total sales recorded (`Σ Sale Totals`)
- **Gross Profit:** `Revenue - Cost of Goods Sold (COGS)`
- **Estimated Net Operating Profit:** `Gross Profit - Operating Expenses`

---

## 🚀 Getting Started

### Prerequisites

You need **Node.js (v18 or v20 LTS recommended)** and **npm** installed on your system.

#### Installing Node.js on Windows:
1. Download the LTS installer from [https://nodejs.org/](https://nodejs.org/) and run it.
2. *Or* install via Windows PowerShell:
   ```powershell
   winget install OpenJS.NodeJS.LTS
   ```
3. Restart your terminal or IDE so that `node` and `npm` are added to your system `PATH`.
4. Verify by running:
   ```bash
   node -v
   npm -v
   ```

---

### Installation

1. Clone or open the repository:
   ```bash
   cd "smooth operator"
   ```

2. Install all dependencies across root, server, and client:
   ```bash
   npm run install:all
   ```

3. Configure environment variables:
   - Server: Copy `server/.env.example` to `server/.env`
   - Client: Copy `client/.env.example` to `client/.env`

---

### Running Locally

Run both the React frontend and Express backend concurrently with one command:

```bash
npm run dev
```

- **Frontend Client:** [http://localhost:5173](http://localhost:5173)
- **Backend API:** [http://localhost:5000](http://localhost:5000)
- **API Health Check:** [http://localhost:5000/api/health](http://localhost:5000/api/health)

To run either service independently:
```bash
# Server only
npm run dev:server

# Client only
npm run dev:client
```

---

## 🗺️ Milestone Roadmap

- [x] **Milestone 1:** Project Setup & Monorepo Foundation *(Current)*
- [ ] **Milestone 2:** Frontend Dashboard & Navigation (with clearly labeled mock data)
- [ ] **Milestone 3:** Firebase Authentication & Token Verification Middleware
- [ ] **Milestone 4:** Business Onboarding & Inventory Management
- [ ] **Milestone 5:** Sales Management & Atomic Inventory Updates
- [ ] **Milestone 6:** Expense Management & Operational Cost Tracking
- [ ] **Milestone 7:** Business Analytics & Visual BI Charts
- [ ] **Milestone 8:** Comprehensive Testing, Documentation & Cloud Deployment

---

## 📄 License
This project is developed as a Computer Science portfolio project. Built with clean software architecture principles.
