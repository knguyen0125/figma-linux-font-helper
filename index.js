const express = require('express');
const config = require('./config');
const FontManager = require('./fonts');

// Initialize Font Manager
const fontManager = new FontManager();

// Initialize Express
const app = express();

app.get('/figma/font-files', (req, res) => {
  const fonts = fontManager.getFonts();

  const json = {
    version: config.FIGMA_VERSION,
    fontFiles: fonts,
  };

  res
    .header({
      'Access-Control-Allow-Origin': 'https://www.figma.com',
      'Content-Type': 'application/json',
    })
    .send(json);
});

app.get('/figma/font-file', (req, res) => {
  const fontPath = req.query.file;

  if (!fontManager.isFontExists(fontPath)) {
    res.status(500).send('Failed get fonts');
  } else {
    res
      .header({
        'Access-Control-Allow-Origin': 'https://www.figma.com',
      })
      .sendFile(fontPath);
  }
});

app.get('*', (req, res) => res.status(404).send(''));

app.listen(config.PORT, '127.0.0.01', () => {
  console.log(`Server started on port ${config.PORT}`);
});
