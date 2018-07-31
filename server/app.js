'use strict';

require('app-module-path/register');

const settings = require('configs/settings');
const engine = require('configs/engine');
const middlewares = require('configs/middlewares');
const routes = require('configs/routes');
const logger = require('utils/logger');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const compression = require('compression');
require('json.date-extensions');

// Parse string to date when call JSON.parse
JSON.useDateParser();

const app = express();

app.set('env', settings.env);
app.set('port', settings.port);
app.set('views', settings.distPath);
app.set('trust proxy', 1);

app.use(express.static(settings.distPath));
app.use('/public', express.static(settings.publicPath));
app.use(morgan('tiny', {stream: {write: message => logger.console.debug(message)}}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(compression());

logger.info(`Using ${settings.env} environment settings`);
logger.info(`Debug mode is ${settings.debug ? 'ON' : 'OFF'}`);

engine.configure(app);
middlewares.configure(app);
routes.configure(express, app);

app.listen(app.get('port'), () => {
  logger.info(`Intercamb.me Website server is listening on port ${app.get('port')}`);
});
