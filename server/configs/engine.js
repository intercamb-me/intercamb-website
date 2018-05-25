'use strict';

const logger = require('../utils/logger');
const nunjucks = require('nunjucks');

exports.configure = (app) => {
  logger.info('Configuring view engine');
  app.engine('html', nunjucks.render);
  nunjucks.configure(app.get('views'), {
    autoescape: true,
    express: app,
  });
};
