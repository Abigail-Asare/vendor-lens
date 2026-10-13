import rateLimit from 'express-rate-limit';

/**
 * Basic API Rate Limiter
 * 
 * Protects the API against brute-force attacks and abuse.
 * Allows 200 requests per 15-minute window per IP in standard mode.
 */
export const apiRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200, // Limit each IP to 200 requests per windowMs
  standardHeaders: true, // Return standard `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: {
    success: false,
    error: {
      message: 'Too many requests from this IP address, please try again after 15 minutes.',
      code: 429,
    },
    timestamp: new Date().toISOString(),
  },
});

/**
 * Stricter Rate Limiter for Authentication and sensitive endpoints.
 * Limits login/register attempts to 20 per 15 minutes per IP.
 */
export const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: {
      message: 'Too many authentication attempts. Please try again after 15 minutes.',
      code: 429,
    },
    timestamp: new Date().toISOString(),
  },
});
