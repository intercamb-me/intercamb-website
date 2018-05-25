'use strict';

const settings = require('../configs/settings');
const Promise = require('bluebird');

exports.getConfigs = () => {
  return Promise.resolve({
    appToken: settings.appToken,
  });
};
