'use strict';

const fs = require('fs');
const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

const config = require('./config');
const api = require('./api');

const app = express();

app.use(cors());
app.use(bodyParser.json());

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
app.get('*', (req, res) => {
  const indexHtml = path.join(__dirname, 'client/index.html');
  res.sendFile(indexHtml);
});

app.use((err, req, res/*, next*/) => {
  console.error(`[AppError: ${err.stack}`);
  res.status(500).end();
});

app.listen(config.PORT, () => {
  console.log( // skipcq: JS-0002
    `listening at http://localhost:${config.PORT} (${config.MODE} mode)`
  );
});
