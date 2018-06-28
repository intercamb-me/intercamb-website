'use strict';

const settings = require('../configs/settings');
const path = require('path');
const winston = require('winston');

const level = settings.debug ? 'debug' : 'info';

const consoleLogger = new (winston.Logger)();
consoleLogger.add(winston.transports.Console, {
  level,
  timestamp: true,
  colorize: true,
});

const fileLogger = new (winston.Logger)();
fileLogger.add(winston.transports.Console, {
  level,
  timestamp: true,
  colorize: true,
});
fileLogger.add(winston.transports.File, {
  level,
  filename: path.resolve('intercambio-website.log'),
});

exports.file = fileLogger;
exports.console = consoleLogger;

exports.debug = fileLogger.debug;
exports.info = fileLogger.info;
exports.warn = fileLogger.warn;
exports.error = fileLogger.error;
