# VendorLens REST API Documentation

Base URL: `/api`  
Standard Response Envelopes:
- **Success:** `{ "success": true, "message": "...", "data": { ... }, "timestamp": "..." }`
- **Error:** `{ "success": false, "error": { "message": "...", "code": 400 }, "timestamp": "..." }`

All monetary values are accepted and returned in **integer pesewas** (`1 GHS = 100 pesewas`).

---

## 1. System & Diagnostics

### `GET /api/health`
Returns runtime diagnostic health of the API server.
- **Access:** Public
- **Response:**
  ```json
  {
    "success": true,
    "message": "VendorLens API service is healthy and operational.",
    "data": {
      "service": "VendorLens REST API",
      "status": "online",
      "version": "1.0.0",
      "environment": "development",
      "uptimeSeconds": 142,
      "timestamp": "2026-10-14T00:00:00.000Z"
    }
  }
  ```

---

## 2. Authentication

### `POST /api/auth/register`
Creates or synchronizes an authenticated user profile following Firebase client signup.
- **Headers:** `Authorization: Bearer <Firebase-ID-Token>`
- **Request Body:**
  ```json
  {
    "displayName": "Ama Osei",
    "email": "ama@example.com"
  }
  ```
- **Response (201 Created):** User record.

### `GET /api/auth/me`
Retrieves current authenticated user profile and associated business ID.
- **Headers:** `Authorization: Bearer <Firebase-ID-Token>`
- **Response (200 OK):** `{ "user": { "uid": "...", "email": "...", "businessId": "..." } }`

---

## 3. Business Profile & Onboarding

### `POST /api/business`
Initializes a new business during onboarding.
- **Headers:** `Authorization: Bearer <Firebase-ID-Token>`
- **Request Body:**
  ```json
  {
    "name": "Accra Central Provisions",
    "category": "Retail & Groceries",
    "description": "Wholesale and retail provisions store",
    "currency": "GHS",
    "location": "Makola Market, Accra"
  }
  ```

### `GET /api/business`
Retrieves active business configuration for the authenticated merchant.

### `PUT /api/business`
Updates business information.

---

## 4. Products & Inventory

### `GET /api/products`
Retrieves paginated product catalog with category and search filtering.
- **Query Params:**
  - `category` (optional, string)
  - `search` (optional, string)
  - `lowStockOnly` (optional, boolean)
  - `page` (default `1`)
  - `limit` (default `20`)
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "data": {
      "products": [
        {
          "id": "prod_101",
          "name": "Milo Tin 400g",
          "sku": "MLO-400-TN",
          "category": "Beverages",
          "costPricePesewas": 3800,
          "sellingPricePesewas": 4500,
          "quantity": 24,
          "lowStockThreshold": 10,
          "isLowStock": false,
          "isArchived": false
        }
      ],
      "pagination": {
        "page": 1,
        "limit": 20,
        "total": 1
      }
    }
  }
  ```

### `POST /api/products`
Creates a new product.
- **Request Body:**
  ```json
  {
    "name": "Ideal Milk 160g",
    "sku": "IDL-160-MLK",
    "description": "Evaporated milk can",
    "category": "Dairy",
    "costPricePesewas": 1200,
    "sellingPricePesewas": 1500,
    "quantity": 48,
    "lowStockThreshold": 12
  }
  ```

### `GET /api/products/:id`
Retrieves a single product by ID.

### `PUT /api/products/:id`
Updates product metadata and prices.

### `DELETE /api/products/:id`
Soft-archives a product (`isArchived: true`), ensuring historical sales records remain intact.

### `POST /api/products/:id/restock`
Restocks product inventory and logs an immutable `stockMovements` entry.
- **Request Body:**
  ```json
  {
    "quantityAdded": 24,
    "notes": "Weekly batch restock from supplier"
  }
  ```

---

## 5. Sales & Orders

### `POST /api/sales`
Creates an atomic sale, validates stock availability, deducts inventory, and records stock movements.
- **Request Body:**
  ```json
  {
    "items": [
      {
        "productId": "prod_101",
        "quantity": 2
      }
    ],
    "paymentMethod": "momo",
    "notes": "MTN MoMo transaction"
  }
  ```
- **Response (201 Created):**
  ```json
  {
    "success": true,
    "message": "Sale completed successfully.",
    "data": {
      "saleId": "sale_98231",
      "totalPesewas": 9000,
      "itemsCount": 2,
      "status": "completed"
    }
  }
  ```

### `GET /api/sales`
Retrieves sales history with date range and status filters.
- **Query Params:** `startDate`, `endDate`, `status`, `page`, `limit`

### `GET /api/sales/:id`
Retrieves complete sale receipt details with cost-price and selling-price snapshots.

### `POST /api/sales/:id/void`
Voids a sale with an audit reason and automatically restores deducted quantities back into product inventory.
- **Request Body:**
  ```json
  {
    "reason": "Customer returned unopened items due to wrong size"
  }
  ```

---

## 6. Expenses

### `GET /api/expenses`
Retrieves categorized expense records for the selected period.

### `POST /api/expenses`
Records a business expense.
- **Request Body:**
  ```json
  {
    "description": "Electricity prepaid token for shop",
    "category": "utilities",
    "amountPesewas": 15000,
    "date": "2026-10-14",
    "notes": "ECG prepaid meter reload"
  }
  ```

### `PUT /api/expenses/:id`
Updates an expense entry.

### `DELETE /api/expenses/:id`
Deletes/archives an expense record.

---

## 7. Business Intelligence Analytics

### `GET /api/analytics/summary`
Calculates high-level business intelligence KPIs over a given date range:
- `startDate`, `endDate`
- **Output:**
  - `revenuePesewas`: Gross completed sales
  - `cogsPesewas`: Cost of goods sold
  - `grossProfitPesewas`: `revenuePesewas - cogsPesewas`
  - `operatingExpensesPesewas`: Total expenses
  - `netOperatingProfitPesewas`: `grossProfitPesewas - operatingExpensesPesewas`
  - `totalTransactions`: Count of completed sales
  - `lowStockCount`: Number of products at or below threshold

### `GET /api/analytics/trends`
Provides daily and monthly sales/revenue data points for Chart.js graphs.

### `GET /api/analytics/products`
Identifies top-performing and least-performing products ranked by volume and revenue contribution.

### `GET /api/analytics/expenses`
Provides category percentage breakdown of operating expenses for pie/doughnut visualization.
