const { urlencoded } = require('express');

const parseForm = urlencoded({
  extended: false,
  limit: '1kb',
  verify: (req, res, buf) => {
    if (buf.length > 1024) {
      req.unpipe();
      res.status(413).send('Payload too large');
    }
  },
});

module.exports = parseForm;

// Rado: this should have removed the extended flag since it defaults to false