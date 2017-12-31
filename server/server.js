const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const Bundler = require('parcel-bundler');
const favicon = require('serve-favicon');
const api = require('./api');

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(express.static(path.join(__dirname, '../dist')));

app.use('/api', api);

const bundler = new Bundler('index.html');
app.use(bundler.middleware());

app.listen(3000, (error) => {
  if (!error) {
    console.log('started');
  } else console.log(error);
});

module.exports = app;
