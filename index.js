const express = require('express');
const app = express();

//Add routes
const authRoute = require('./routes/auth');
const dataRoute = require('./routes/webData');

//Connect to database
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
mongoose.connect(process.env.DB_AUTHENTICATION,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  () => console.log('Connected to Mongo Atlas')
);

//Middleware
app.use(express.json());

//Middleware routes
app.use('/api/user', authRoute);
app.use('/api/data', dataRoute);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is running at port ${port}`));
