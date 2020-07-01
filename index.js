const express = require('express');
const app = express();

//Add routes
const authRoute = require('./routes/auth');
const dataRoute = require('./routes/webData');
const albumRoute = require('./routes/album');
const pictureRoute = require('./routes/picture');

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
app.use('/api/album', albumRoute);
app.use('/api/pictures', pictureRoute);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is running at port ${port}`));
