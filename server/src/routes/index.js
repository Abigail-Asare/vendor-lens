import { Router } from 'express';
import healthRoutes from './health.js';

const router = Router();

/**
 * Root API router:
 * Mounts sub-routers under `/api/`
 * As subsequent milestones are implemented, auth, business, products, sales,
 * expenses, and analytics routers will be attached here.
 */
router.use('/health', healthRoutes);

// Placeholder endpoints returning friendly milestone status
router.get('/', (req, res) => {
  res.json({
    name: 'VendorLens API Gateway',
    version: '1.0.0',
    documentation: '/docs/API.md',
    status: 'Ready for Milestone 2',
  });
});

export default router;
