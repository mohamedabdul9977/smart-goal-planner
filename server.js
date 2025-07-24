const jsonServer = require('json-server');
const path = require('path');
const fs = require('fs');
const server = jsonServer.create();
const dbPath = path.join(__dirname, 'db.json');

// Check if db.json exists, create if it doesn't
if (!fs.existsSync(dbPath)) {
  fs.writeFileSync(dbPath, JSON.stringify({ goals: [] }));
}

const router = jsonServer.router(dbPath);
const middlewares = jsonServer.defaults();

// Determine if we're in development mode
const isDev = process.argv.includes('--dev');

if (isDev) {
  // Development configuration
  server.use(middlewares);
  server.use(jsonServer.bodyParser);
  server.use('/api', router);
  
  const PORT = process.env.PORT || 4000;
  server.listen(PORT, () => {
    console.log(`
    🚀 JSON Server is running in development mode!
    🔗 API: http://localhost:${PORT}/api
    `);
  });
} else {
  // Production configuration
  // Serve static files from React build
  server.use(jsonServer.static(path.join(__dirname, 'build')));
  
  // API routes
  server.use('/api', router);
  server.use(middlewares);
  server.use(jsonServer.bodyParser);
  
  // Handle React routing
  server.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
  
  const PORT = process.env.PORT || 4000;
  server.listen(PORT, () => {
    console.log(`
    🚀 Server is running in production mode!
    🔗 API: https://your-render-url.onrender.com/api
    🌍 Web: https://your-render-url.onrender.com
    `);
  });
}

module.exports = server;