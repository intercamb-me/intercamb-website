'use strict';

const path = require('path');
const yaml = require('yamljs');
const _ = require('lodash');

const config = yaml.load(path.resolve('server', 'config.yml'));

exports.env = _.get(config, 'app.env', 'development');
exports.port = _.get(config, 'app.port', 4000);
exports.debug = _.get(config, 'app.debug', false);
exports.distPath = path.resolve('dist');
exports.publicPath = path.resolve('server', 'public');

exports.prerenderUrl = _.get(config, 'prerender.url');
