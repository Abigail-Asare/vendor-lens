import React from 'react';

/**
 * Reusable Card component adhering to VendorLens minimal SaaS styling.
 */
export default function Card({ children, className = '', hover = false, ...props }) {
  return (
    <div
      className={`bg-white rounded-xl border border-navy-200/70 p-5 ${
        hover ? 'transition-all duration-200 hover:shadow-card hover:border-navy-300' : 'shadow-soft'
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
