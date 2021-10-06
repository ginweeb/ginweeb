const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');

const app = express();
const appMiddleware = require('./api/middleware/app_middleware')

const userRoutes = require('./api/routes/user');
const receiptRoutes = require('./api/routes/receipt');
const areatRoutes = require('./api/routes/area');

//mongoose.connect('mongodb+srv://'+process.env.MONGO_USERNAME+':'+process.env.MONGO_PASSWORD+'@cluster0.il9sy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');
mongoose.connect('mongodb+srv://gingin:gingin@cluster0.il9sy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');

mongoose.Promise = global.Promise;

app.use(morgan('dev'));// Log all request
app.use('/uploads', express.static('uploads'));
app.use(express.urlencoded({extended: false}));// Accept url encoded data
app.use(express.json()); // Accept json data
app.use(appMiddleware.app_add_headers);
app.use('/user', userRoutes);
app.use('/receipt', receiptRoutes);
app.use('/areatRoutes', receiptRoutes);
app.use(appMiddleware.app_no_route); 
app.use(appMiddleware.app_error);

module.exports = app;