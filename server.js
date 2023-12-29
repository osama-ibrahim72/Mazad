//const path = require('path');

const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');

dotenv.config({ path: 'config.env' });
const ApiError = require('./utils/apiError');
const globalError = require('./middlewares/errorMiddleware');
const dbConnection = require('./config/database');




//routes
const authRoute = require('./routes/authRoute');
const categoriesRoute = require('./routes/categoryRoute');
const subCategoriesRoute = require('./routes/subCategoryRoute');
const carBrandRoute = require('./routes/carBrandRoute');
const carSubBrandRoute = require('./routes/carSubBrandRoute');
const shapeRoute = require('./routes/shapeRoute');
const mazadRoute = require('./routes/mazadRoute');
const areaRoute = require('./routes/areaRoute');
const cityRoute = require('./routes/cityRoute');
const modelYearRoute = require('./routes/modelYearRoute');
const walletRoute = require('./routes/walletRoute');










// Connect with db
dbConnection();

// express app
const app = express();

// Middlewares
app.use(express.json({limit :'90000000'}));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
  console.log(`mode: ${process.env.NODE_ENV}`);
}

// Mount Routes
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/categories', categoriesRoute);
app.use('/api/v1/subCategories', subCategoriesRoute);
app.use('/api/v1/carBrands', carBrandRoute);
app.use('/api/v1/carSubBrands', carSubBrandRoute);
app.use('/api/v1/shapes', shapeRoute);
app.use('/api/v1/mazad', mazadRoute);
app.use('/api/v1/area', areaRoute);
app.use('/api/v1/city', cityRoute);
app.use('/api/v1/models', modelYearRoute);
app.use('/api/v1/wallet', walletRoute);









app.all('*', (req, res, next) => {
  next(new ApiError(`Can't find this route: ${req.originalUrl}`, 400));
});

// Global error handling middleware for express
app.use(globalError);

const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
  console.log(`App running running on port ${PORT}`);
});

// Handle rejection outside express
process.on('unhandledRejection', (err) => {
  console.error(`UnhandledRejection Errors: ${err.name} | ${err.message}`);
  server.close(() => {
    console.error(`Shutting down....`);
    process.exit(1);
  });
});