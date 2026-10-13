import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import apiRoutes from './routes/index.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';
import { apiRateLimiter } from './middleware/rateLimiter.js';
import { initializeFirebase } from './config/firebase.js';

// Load environment variables
dotenv.config();

// Attempt Firebase initialization
initializeFirebase();

const app = express();

// ============================================================
// Security & Core Middleware
// ============================================================

// Set secure HTTP headers
app.use(helmet());

// Configure Cross-Origin Resource Sharing (CORS)
const allowedOrigins = process.env.CORS_ORIGIN 
  ? process.env.CORS_ORIGIN.split(',').map(origin => origin.trim())
  : ['http://localhost:5173', 'http://127.0.0.1:5173'];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g. mobile apps, curl, postman)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV !== 'production') {
        return callback(null, true);
      }
      return callback(new Error('Cross-Origin Request blocked by VendorLens CORS policy.'));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// HTTP request logging (concise in production, dev formatted in development)
if (process.env.NODE_ENV === 'production') {
  app.use(morgan('combined'));
} else {
  app.use(morgan('dev'));
}

// Body parsing with sane payload limits to prevent DOS
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// Apply rate limiting to all /api routes
app.use('/api', apiRateLimiter);

// ============================================================
// API Routing
// ============================================================
app.use('/api', apiRoutes);

// Root route friendly welcome
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the VendorLens API service. "Understand your business through your data."',
    health: '/api/health',
    status: 'active',
  });
});

// ============================================================
// Error Handling
// ============================================================
// 404 Handler for undefined routes
app.use(notFoundHandler);

// Centralized error handler
app.use(errorHandler);

export default app;
