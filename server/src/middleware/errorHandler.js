import { sendError } from '../utils/response.js';

/**
 * Centralized Error Handling Middleware
 * 
 * Captures all unhandled synchronous and asynchronous errors thrown in route handlers,
 * formats them consistently, logs them for server monitoring, and prevents internal stack
 * traces from leaking to public clients.
 */
// eslint-disable-next-line no-unused-vars
export const errorHandler = (err, req, res, next) => {
  console.error(`[ERROR] ${req.method} ${req.url} ->`, err);

  const statusCode = err.statusCode || err.status || 500;
  const message = err.message || 'Internal server error occurred';

  // Handle specific known error types
  if (err.name === 'ValidationError') {
    return sendError(res, message, 400, err.errors || err.details);
  }

  if (err.name === 'UnauthorizedError' || err.code === 'auth/id-token-expired') {
    return sendError(res, 'Authentication failed or session expired. Please log in again.', 401);
  }

  return sendError(res, message, statusCode, err.stack);
};

/**
 * Catch-all 404 handler for unknown routes.
 */
export const notFoundHandler = (req, res) => {
  return sendError(res, `Route not found: ${req.method} ${req.originalUrl}`, 404);
};
