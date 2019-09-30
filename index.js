const express = require('express');
const config = require('./config');
const FontManager = require('./fonts');
const { cors } = require('./middlewares');

// Initialize Font Manager
const fontManager = new FontManager(config.FONT_DIRECTORIES);

// Initialize Express
const app = express();
app.use(cors);

app.get('/figma/font-files', (req, res) => {
  const fonts = fontManager.getFonts();

  const json = {
    version: config.FIGMA_VERSION,
    fontFiles: fonts,
  };

  res.json(json);
});

app.get('/figma/font-file', (req, res) => {
  const fontPath = req.query.file;

  if (!fontManager.isFontExists(fontPath)) {
    res.status(500).send('Failed get fonts');
  } else {
    res.sendFile(fontPath);
  }
});

app.get('*', (req, res) => res.status(404).send(''));

app.listen(config.HTTP_PORT, '127.0.0.1', () => {
  console.log(`Server started on port ${config.HTTP_PORT}`);
});
