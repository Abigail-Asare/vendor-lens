import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Receipt,
  BarChart3,
  Menu,
  X,
  Store,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';
import { formatDate } from '../utils/formatters';

const navigationLinks = [
  { name: 'Dashboard', path: '/', icon: LayoutDashboard },
  { name: 'Inventory', path: '/inventory', icon: Package },
  { name: 'Sales', path: '/sales', icon: ShoppingCart },
  { name: 'Expenses', path: '/expenses', icon: Receipt },
  { name: 'Analytics', path: '/analytics', icon: BarChart3 },
];

export default function DashboardLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const todayFormatted = formatDate(new Date(), { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });

  return (
    <div className="min-h-screen flex bg-navy-50 text-navy-900">
      {/* Mobile menu backdrop */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-navy-900/50 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-navy-200/80 flex flex-col transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-navy-100">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-700 to-brand-500 flex items-center justify-center text-white font-bold text-lg shadow-sm">
              VL
            </div>
            <div>
              <span className="font-bold text-lg tracking-tight text-navy-900 block leading-tight">
                Vendor<span className="text-brand-600">Lens</span>
              </span>
              <span className="text-[10px] uppercase font-semibold text-navy-400 tracking-wider">
                SME Platform
              </span>
            </div>
          </div>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="lg:hidden p-1.5 rounded-lg text-navy-400 hover:text-navy-700 hover:bg-navy-50"
            aria-label="Close navigation"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Business Context Badge */}
        <div className="p-4 mx-3 my-3 rounded-xl bg-navy-50/70 border border-navy-200/60">
          <div className="flex items-center gap-2 text-xs font-semibold text-navy-500 uppercase tracking-wider mb-1">
            <Store className="w-3.5 h-3.5 text-brand-600" />
            <span>Active Business</span>
          </div>
          <p className="font-medium text-sm text-navy-800 truncate">
            Accra Central Provisions
          </p>
          <div className="mt-1 flex items-center gap-1.5 text-[11px] text-navy-500">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Currency: <strong>GHS (₵)</strong></span>
          </div>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 px-3 space-y-1 overflow-y-auto py-2">
          {navigationLinks.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/'}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-brand-50 text-brand-700 border-l-4 border-brand-600 font-semibold'
                      : 'text-navy-600 hover:bg-navy-50 hover:text-navy-900'
                  }`
                }
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-navy-100 text-xs text-navy-500 space-y-2">
          <div className="flex items-center gap-1.5 text-navy-600">
            <ShieldCheck className="w-4 h-4 text-brand-600" />
            <span className="font-medium">Milestone 1 Ready</span>
          </div>
          <p className="text-[11px] text-navy-400">
            Built for Ghanaian Small Businesses
          </p>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-navy-200/80 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30 shadow-soft">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-lg text-navy-600 hover:text-navy-900 hover:bg-navy-100"
              aria-label="Open navigation"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="hidden sm:block">
              <span className="text-xs text-navy-400 font-medium uppercase tracking-wider">Date</span>
              <p className="text-xs font-semibold text-navy-700">{todayFormatted}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-3 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs font-medium flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-brand-600"></span>
              <span>Dev Environment</span>
            </div>
          </div>
        </header>

        {/* Dynamic Page Outlet */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
