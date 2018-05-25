'use strict';

const path = require('path');
const yaml = require('yamljs');
const _ = require('lodash');

const config = yaml.load(path.resolve('client', 'config.yml'));

module.exports = (env) => {
  const settings = {env};
  if (env === 'production') {
    settings.apiUrl = 'https://api.intercambioargentina.com.br';
  } else {
    settings.apiUrl = _.get(config, 'api.url', 'http://localhost:3000');
  }
  return settings;
};
