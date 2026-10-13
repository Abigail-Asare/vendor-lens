import { Router } from 'express';
import { sendSuccess } from '../utils/response.js';

const router = Router();

/**
 * @route   GET /api/health
 * @desc    API Health & Diagnostic Status Check
 * @access  Public
 */
router.get('/', (req, res) => {
  const healthData = {
    service: 'VendorLens REST API',
    status: 'online',
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development',
    uptimeSeconds: Math.floor(process.uptime()),
    timestamp: new Date().toISOString(),
  };

  return sendSuccess(res, healthData, 'VendorLens API service is healthy and operational.');
});

export default router;
