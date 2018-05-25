'use strict';

const appService = require('../services/app');
const logger = require('../utils/logger');
const errors = require('../utils/errors');

async function getConfigs(req, res) {
  try {
    const config = await appService.getConfigs();
    res.json(config);
  } catch (err) {
    logger.error(err);
    errors.respondWithError(res, err);
  }
}

module.exports = (router, app) => {
  router.get('/configs', getConfigs);

  app.use('/apps', router);
};
