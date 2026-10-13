import http from 'http';
import app from './app.js';

const PORT = process.env.PORT || 5000;

// Create HTTP server
const server = http.createServer(app);

// Start listening
server.listen(PORT, () => {
  console.log(`
  ======================================================
  🚀 VendorLens Backend API is running!
  📡 URL:         http://localhost:${PORT}
  🩺 Health:      http://localhost:${PORT}/api/health
  🌱 Environment: ${process.env.NODE_ENV || 'development'}
  ======================================================
  `);
});

// Graceful shutdown handling
const shutdown = (signal) => {
  console.log(`\n🛑 Received ${signal}. Gracefully shutting down VendorLens server...`);
  server.close(() => {
    console.log('✅ HTTP server closed. Process exiting.');
    process.exit(0);
  });

  // Force shutdown after 10 seconds if hanging connections persist
  setTimeout(() => {
    console.error('⚠️ Could not close connections in time, forcefully terminating.');
    process.exit(1);
  }, 10000);
};

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));
