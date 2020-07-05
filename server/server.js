require('dotenv').config();

const cors = require('cors');

const express = require('express');
const mongoose = require('mongoose');
const bookmarks = require('./routes/api/bookmarks');
const users = require('./routes/api/users')
const cookieParser = require('cookie-parser');

const app = express();

// Use CORS
app.use(cors());

// use express middleware for easier cookie handling
app.use(cookieParser());

// Needed to be able to read body data
app.use(express.json()); // to support JSON encoded bodies
app.use(express.urlencoded({ extended: true })); // support URL-encoded bodies

// Use Routes
app.use('/api/bookmarks', bookmarks);
app.use('/api/users', users);

// DB Config
const db = process.env.MONGO_URI;

// Connect to Mongo
mongoose
	.connect(db, { useNewUrlParser: true, useUnifiedTopology: true, serverSelectionTimeoutMS: 5000 })
	.then(() => {
    console.log('MongoDB Connected')
  })
	.catch(err => console.log(err));


app.listen(process.env.SERVER_PORT, () =>
  console.log(`Server listening on port ${process.env.SERVER_PORT}`)
);

