const cors = (req, res, next) => {
  res.header({
    'Access-Control-Allow-Origin': 'https://www.figma.com',
  });

  next();
};

module.exports = { cors };
