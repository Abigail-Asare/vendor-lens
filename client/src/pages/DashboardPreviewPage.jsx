import React, { useState } from 'react';
import {
  TrendingUp,
  Package,
  ShoppingCart,
  Receipt,
  Server,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Sparkles,
  Activity,
  Layers,
  ShieldAlert,
} from 'lucide-react';
import api from '../services/api';
import { formatCurrency } from '../utils/formatters';

export default function DashboardPreviewPage() {
  const [healthStatus, setHealthStatus] = useState(null);
  const [loadingHealth, setLoadingHealth] = useState(false);
  const [healthError, setHealthError] = useState(null);

  const testBackendHealth = async () => {
    setLoadingHealth(true);
    setHealthError(null);
    try {
      const response = await api.get('/health');
      setHealthStatus(response);
    } catch (err) {
      setHealthError(err.message || 'Failed to connect to backend server. Make sure server is running on port 5000.');
    } finally {
      setLoadingHealth(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-navy-900 via-navy-800 to-brand-900 text-white p-6 sm:p-8 shadow-elevated">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-medium text-brand-200 border border-white/10">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Milestone 1 Foundation Initialized</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            VendorLens Dashboard
          </h1>
          <p className="text-navy-200 text-sm sm:text-base leading-relaxed">
            <em>"Understand your business through your data."</em> Clean architecture,
            integer-pesewa financial calculations, and modular full-stack structure ready for development.
          </p>
        </div>
      </div>

      {/* Backend Connectivity Test Card */}
      <div className="vl-card">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-navy-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-50 border border-brand-100 flex items-center justify-center text-brand-600">
              <Server className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-navy-900">
                Backend REST API Connectivity
              </h2>
              <p className="text-xs text-navy-500">
                Verifies client-to-server proxy communication on <code>/api/health</code>
              </p>
            </div>
          </div>
          <button
            onClick={testBackendHealth}
            disabled={loadingHealth}
            className="vl-btn-primary self-start sm:self-auto"
          >
            <Activity className={`w-4 h-4 ${loadingHealth ? 'animate-spin' : ''}`} />
            <span>{loadingHealth ? 'Connecting...' : 'Test Backend Health'}</span>
          </button>
        </div>

        {healthStatus && (
          <div className="mt-4 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div className="space-y-1 text-xs">
                <p className="font-semibold text-emerald-800">
                  Backend Connected Successfully: {healthStatus.message}
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-emerald-700">
                  <div>Status: <span className="font-mono font-medium">{healthStatus.data?.status}</span></div>
                  <div>Version: <span className="font-mono font-medium">{healthStatus.data?.version}</span></div>
                  <div>Env: <span className="font-mono font-medium">{healthStatus.data?.environment}</span></div>
                  <div>Uptime: <span className="font-mono font-medium">{healthStatus.data?.uptimeSeconds}s</span></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {healthError && (
          <div className="mt-4 p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div className="space-y-1 text-xs">
                <p className="font-semibold text-amber-800">Notice on Backend Connection</p>
                <p className="text-amber-700">{healthError}</p>
                <p className="text-amber-600 pt-1">
                  Once Node.js is installed and you run <code>npm run dev</code> from the root, both client and server will run concurrently.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* KPI Cards Preview */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold text-navy-900">
            SaaS Metric Cards (Architecture Preview)
          </h2>
          <span className="text-xs text-navy-400">Formatted with integer pesewas</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="vl-card-hover">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-navy-500">
                Today's Sales
              </span>
              <div className="p-2 rounded-lg bg-brand-50 text-brand-600">
                <ShoppingCart className="w-4 h-4" />
              </div>
            </div>
            <p className="text-xl font-bold text-navy-900">
              {formatCurrency(185000)}
            </p>
            <p className="text-xs text-emerald-600 font-medium mt-1 flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>18 completed sales</span>
            </p>
          </div>

          <div className="vl-card-hover">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-navy-500">
                Est. Net Profit
              </span>
              <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>
            <p className="text-xl font-bold text-navy-900">
              {formatCurrency(62000)}
            </p>
            <p className="text-xs text-navy-500 mt-1">
              Revenue - COGS - Expenses
            </p>
          </div>

          <div className="vl-card-hover">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-navy-500">
                Total Products
              </span>
              <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600">
                <Package className="w-4 h-4" />
              </div>
            </div>
            <p className="text-xl font-bold text-navy-900">142</p>
            <p className="text-xs text-navy-500 mt-1">Across 8 categories</p>
          </div>

          <div className="vl-card-hover">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-navy-500">
                Low Stock Alerts
              </span>
              <div className="p-2 rounded-lg bg-amber-50 text-amber-600">
                <ShieldAlert className="w-4 h-4" />
              </div>
            </div>
            <p className="text-xl font-bold text-amber-600">3 Items</p>
            <p className="text-xs text-navy-500 mt-1">Below safety threshold</p>
          </div>
        </div>
      </div>

      {/* Roadmap & Milestones */}
      <div className="vl-card">
        <h2 className="text-base font-bold text-navy-900 mb-3 flex items-center gap-2">
          <Layers className="w-4 h-4 text-brand-600" />
          <span>Development Milestones Roadmap</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="p-3 rounded-lg bg-brand-50/70 border border-brand-200">
            <span className="font-bold text-brand-900">Milestone 1: Project Setup & Foundation</span>
            <p className="text-brand-700 mt-1">Monorepo architecture, Express REST engine, Tailwind theme, and project docs.</p>
          </div>
          <div className="p-3 rounded-lg bg-navy-50 border border-navy-200/60 text-navy-600">
            <span className="font-semibold text-navy-800">Milestone 2: Frontend Dashboard & Navigation</span>
            <p className="mt-1">Interactive mock dataset, KPI cards, Chart.js visualizations, and responsive drawer.</p>
          </div>
          <div className="p-3 rounded-lg bg-navy-50 border border-navy-200/60 text-navy-600">
            <span className="font-semibold text-navy-800">Milestone 3: Firebase Setup & Authentication</span>
            <p className="mt-1">Firebase Auth, login/register, token verification middleware, and protected routes.</p>
          </div>
          <div className="p-3 rounded-lg bg-navy-50 border border-navy-200/60 text-navy-600">
            <span className="font-semibold text-navy-800">Milestone 4: Business Onboarding & Inventory</span>
            <p className="mt-1">Business setup, products CRUD, low-stock warnings, and category filtering.</p>
          </div>
          <div className="p-3 rounded-lg bg-navy-50 border border-navy-200/60 text-navy-600">
            <span className="font-semibold text-navy-800">Milestone 5: Sales & Atomic Inventory Updates</span>
            <p className="mt-1">Firestore atomic transactions, stock movement audit trail, voiding sales.</p>
          </div>
          <div className="p-3 rounded-lg bg-navy-50 border border-navy-200/60 text-navy-600">
            <span className="font-semibold text-navy-800">Milestone 6: Expense Management</span>
            <p className="mt-1">Categorized business expenses, operating cost tracking, audit trail.</p>
          </div>
          <div className="p-3 rounded-lg bg-navy-50 border border-navy-200/60 text-navy-600">
            <span className="font-semibold text-navy-800">Milestone 7: Analytics & Visual BI Charts</span>
            <p className="mt-1">COGS, Gross vs Net profit, Accra timezone sales trends, Chart.js graphs.</p>
          </div>
          <div className="p-3 rounded-lg bg-navy-50 border border-navy-200/60 text-navy-600">
            <span className="font-semibold text-navy-800">Milestone 8: Testing, Docs & Deployment</span>
            <p className="mt-1">End-to-end testing, Vercel frontend, Render backend, portfolio README.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
