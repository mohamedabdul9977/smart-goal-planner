const express = require("express");
const path = require("path");
const jsonServer = require("json-server");

const server = express();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

const PORT = process.env.PORT || 3000;

// Serve static React files
server.use(express.static(path.join(__dirname, "build")));

// JSON Server routes under /api
server.use("/api", middlewares, router);

// For all other routes, serve index.html from React build
server.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
