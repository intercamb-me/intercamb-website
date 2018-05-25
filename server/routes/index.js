'use strict';

module.exports = (router, app) => {
  app.get('/*', (req, res) => {
    res.render('index.html');
  });
};
