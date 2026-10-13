/**
 * Standardized API Response Utilities
 * 
 * DESIGN PRINCIPLE:
 * Consistent JSON response shapes make frontend consumption predictable,
 * reduce conditional branching in Axios interceptors, and simplify error handling.
 */

/**
 * Sends a standardized success response.
 * 
 * @param {import('express').Response} res - Express response object
 * @param {any} data - Payload to send
 * @param {string} message - Human-readable success message
 * @param {number} statusCode - HTTP status code (default 200)
 */
export const sendSuccess = (res, data = null, message = 'Operation successful', statusCode = 200) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
    timestamp: new Date().toISOString(),
  });
};

/**
 * Sends a standardized error response.
 * 
 * @param {import('express').Response} res - Express response object
 * @param {string} message - Error description
 * @param {number} statusCode - HTTP status code (default 500)
 * @param {any} details - Additional debugging or validation details (hidden in production)
 */
export const sendError = (res, message = 'An error occurred', statusCode = 500, details = null) => {
  const isProduction = process.env.NODE_ENV === 'production';
  
  return res.status(statusCode).json({
    success: false,
    error: {
      message,
      code: statusCode,
      // Only disclose internal error details during local development
      ...(details && !isProduction ? { details } : {}),
    },
    timestamp: new Date().toISOString(),
  });
};
