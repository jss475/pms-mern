const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config()
const connectDB = require('./config/db')
const port = process.env.PORT || 5001
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const {errorHandler} = require("./middleware/errorMiddleware")

connectDB()

const app = express();
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());
app.use(cookieParser());

//create route variables
const ownerRouter = './routes/ownerRoutes'
const tenantRouter = './routes/tenantRoutes'
const propertyRouter = './routes/propertyRoutes'
const leaseRouter = './routes/leaseRoutes'


app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use('/owners', require(ownerRouter));
app.use('/tenants', require(tenantRouter));
app.use('/properties', require(propertyRouter));
app.use('/lease', require(leaseRouter));

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`))