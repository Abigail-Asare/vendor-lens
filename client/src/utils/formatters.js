/**
 * VendorLens Client Formatting Utilities
 * 
 * Consistent financial and date/time formatting across all components.
 */

/**
 * Formats integer pesewas into Ghana Cedis (GHS) string.
 * Example: 45000 pesewas -> "GHS 450.00"
 * 
 * @param {number} pesewas - Value in integer pesewas
 * @param {string} currencyCode - Defaults to 'GHS'
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (pesewas = 0, currencyCode = 'GHS') => {
  const cedis = (Number(pesewas) || 0) / 100;
  return `${currencyCode} ${cedis.toLocaleString('en-GH', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

/**
 * Formats a raw cedi decimal to pesewas integer.
 * Useful for form submission inputs (e.g., input type="number" step="0.01")
 * 
 * @param {number|string} cedis
 * @returns {number}
 */
export const toPesewas = (cedis) => {
  const numeric = typeof cedis === 'string' ? parseFloat(cedis) : Number(cedis);
  if (isNaN(numeric) || numeric < 0) return 0;
  return Math.round(numeric * 100);
};

/**
 * Formats dates adhering to the Ghana / Africa/Accra timezone.
 * 
 * @param {string|Date|number} dateInput
 * @param {Intl.DateTimeFormatOptions} options
 * @returns {string}
 */
export const formatDate = (dateInput, options = {}) => {
  if (!dateInput) return '—';
  const date = new Date(dateInput);
  if (isNaN(date.getTime())) return '—';

  const defaultOptions = {
    timeZone: 'Africa/Accra',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    ...options,
  };

  return new Intl.DateTimeFormat('en-GH', defaultOptions).format(date);
};

/**
 * Formats date and time together.
 * 
 * @param {string|Date|number} dateInput
 * @returns {string} Example: "Oct 14, 2026, 2:30 PM"
 */
export const formatDateTime = (dateInput) => {
  return formatDate(dateInput, {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
};
