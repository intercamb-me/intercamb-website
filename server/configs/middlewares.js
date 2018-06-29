'use strict';

const logger = require('utils/logger');
const settings = require('configs/settings');
const prerender = require('prerender-node');

exports.configure = (app) => {
  logger.info('Configuring middlewares');
  if (settings.prerenderUrl) {
    app.use(prerender.set('prerenderServiceUrl', settings.prerenderUrl));
  }
};
