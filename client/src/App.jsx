import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import DashboardPreviewPage from './pages/DashboardPreviewPage';
import NotFoundPage from './pages/NotFoundPage';

// Placeholder view for future milestones
const UpcomingMilestonePlaceholder = ({ title, milestone, description }) => (
  <div className="vl-card max-w-xl mx-auto my-8 text-center py-12 px-6">
    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-brand-50 text-brand-600 mb-4 font-bold text-lg">
      M{milestone}
    </div>
    <h2 className="text-xl font-bold text-navy-900 mb-2">{title}</h2>
    <p className="text-sm text-navy-500 mb-6">{description}</p>
    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy-100 text-xs font-medium text-navy-700">
      Scheduled for Milestone {milestone}
    </div>
  </div>
);

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<DashboardPreviewPage />} />
          <Route
            path="inventory"
            element={
              <UpcomingMilestonePlaceholder
                title="Inventory Management"
                milestone={4}
                description="Products CRUD, SKU generator, low-stock warnings, and category filtering."
              />
            }
          />
          <Route
            path="sales"
            element={
              <UpcomingMilestonePlaceholder
                title="Sales Management"
                milestone={5}
                description="Point of sale recorder, atomic Firestore stock reductions, and receipt audits."
              />
            }
          />
          <Route
            path="expenses"
            element={
              <UpcomingMilestonePlaceholder
                title="Expense Tracking"
                milestone={6}
                description="Categorized operational expenditure, Ghana Cedi cost allocation, and audit trails."
              />
            }
          />
          <Route
            path="analytics"
            element={
              <UpcomingMilestonePlaceholder
                title="Business Intelligence & Analytics"
                milestone={7}
                description="Visual revenue vs COGS, Gross and Net profit calculation, Chart.js trends."
              />
            }
          />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
