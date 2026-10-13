/**
 * Currency & Monetary Utilities for VendorLens
 * 
 * DESIGN PRINCIPLE:
 * In financial software, never use floating-point numbers (e.g. 12.50) for arithmetic
 * or database storage. In JavaScript, floating-point math causes precision errors:
 * (0.1 + 0.2 === 0.30000000000000004).
 * 
 * Therefore, VendorLens stores all monetary values in Cloud Firestore as INTEGER PESEWAS.
 * 1 Ghana Cedi (GHS) = 100 Pesewas.
 * Example: GHS 12.50 is stored in Firestore as the integer 1250.
 */

/**
 * Converts Ghana Cedis (decimal) to Pesewas (integer).
 * Rounds safely to the nearest whole pesewa to avoid fractional cent artifacts.
 * 
 * @param {number|string} cedis - Amount in Cedis (e.g. 15.50 or "15.50")
 * @returns {number} Amount in integer pesewas (e.g. 1550)
 */
export const toPesewas = (cedis) => {
  const numeric = typeof cedis === 'string' ? parseFloat(cedis) : cedis;
  if (isNaN(numeric) || numeric < 0) {
    throw new Error(`Invalid monetary amount: ${cedis}. Must be a non-negative number.`);
  }
  return Math.round(numeric * 100);
};

/**
 * Converts Pesewas (integer) to Ghana Cedis (decimal number).
 * 
 * @param {number} pesewas - Amount in integer pesewas
 * @returns {number} Amount in Cedis as a floating number
 */
export const toCedis = (pesewas) => {
  if (typeof pesewas !== 'number' || isNaN(pesewas)) {
    return 0;
  }
  return pesewas / 100;
};

/**
 * Formats integer pesewas into a human-readable GHS currency string.
 * Example: 1550 pesewas -> "GHS 15.50"
 * 
 * @param {number} pesewas - Amount in integer pesewas
 * @param {string} currencyCode - Currency code (default 'GHS')
 * @returns {string} Formatted currency string
 */
export const formatPesewas = (pesewas, currencyCode = 'GHS') => {
  const cedis = toCedis(pesewas);
  return `${currencyCode} ${cedis.toLocaleString('en-GH', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};
