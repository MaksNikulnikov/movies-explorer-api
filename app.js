require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');
const helmet = require('helmet');

const { NODE_ENV, DB_ADRESS } = process.env;
const router = require('./routes/index');
const errorHandler = require('./middlewares/errors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { limiter } = require('./utils');
const { MODE_PRODUCTION } = require('./constants');

const { PORT = 3000 } = process.env;
const app = express();

app.use(cors());
app.use(helmet());
app.use(limiter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);
app.use('/', router);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

mongoose.connect(NODE_ENV === MODE_PRODUCTION ? DB_ADRESS : 'mongodb://127.0.0.1:27017/devdb', {
  autoIndex: true,
});
app.listen(PORT, () => {
});
