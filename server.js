const jsonServer = require('json-server');
const fs = require('fs');
const path = require('path');

// Database file path
const dbPath = path.join(__dirname, 'db.json');

// Create server
const server = jsonServer.create();

// Create router using existing db.json
const router = jsonServer.router(dbPath);

// Default middlewares
const middlewares = jsonServer.defaults();

// Set default middlewares
server.use(middlewares);
server.use(jsonServer.bodyParser);

// Add delay to simulate real API (remove in production)
server.use((req, res, next) => {
  setTimeout(next, 500);
});

// API routes
server.use('/api', router);

// Error handling
server.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`
  🚀 JSON Server is running!
  🔗 Local: http://localhost:${PORT}
  📁 Using database: ${dbPath}
  `);
});

// Export for testing
module.exports = server;