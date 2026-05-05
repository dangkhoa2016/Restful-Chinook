'use strict';

const fs = require('fs');
const path = require('path');

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');

const config = require('./config');
const api = require('./api');
const errorHandler = require('./api/libs/error-handler');
const db = require('./api/libs/db-connection');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// log to file
app.use(morgan('combined', {
  stream: fs.createWriteStream(
    path.join(__dirname, 'access.log'),
    { flags: 'a' }
  )
}));
// log to console
app.use(morgan('dev'));

// Serve static files from the /client folder
app.use(express.static(path.join(__dirname, 'client')));

// Swagger definition
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Restful Chinook API',
      version: '1.0.0',
      description: 'A RESTful API for the Chinook database',
    },
    servers: [
      {
        url: `http://localhost:${config.PORT}`,
      },
    ],
  },
  apis: ['./api/routes.js', './api/models/*/route.js'], // paths to files with annotations
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// API routes
app.use('/api', api);

// favicon
const iconPath = path.join(__dirname, 'client/favicon.ico');
app.use('/favicon.ico', (req, res) => {
  res.type('image/x-icon');
  res.sendFile(iconPath);
});
const pngPath = path.join(__dirname, 'client/favicon.png');
app.use('/favicon.png', (req, res) => {
  res.type('image/png');
  res.sendFile(pngPath);
});

// Serve the index.html file for all other requests
app.get('{*path}', (req, res) => {
  const indexHtml = path.join(__dirname, 'client/index.html');
  res.sendFile(indexHtml);
});

// Error handling middleware should be last
app.use(errorHandler);

const server = app.listen(config.PORT, () => {
  console.log( // skipcq: JS-0002
    `listening at http://localhost:${config.PORT} (${config.MODE} mode)`
  );
});

// Graceful shutdown
const shutdown = () => {
  console.log('Shutdown signal received. Closing HTTP server...');
  server.close(async () => {
    console.log('HTTP server closed.');
    try {
      console.log('Closing database connection...');
      await db.asyncClose();
      console.log('Database connection closed.');
      process.exit(0);
    } catch (err) {
      console.error('Error closing database connection:', err);
      process.exit(1);
    }
  });
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
