require('dotenv').config();

const cors = require('cors');

const express = require('express');
const mongoose = require('mongoose');
const bookmarks = require('./routes/api/bookmarks');

const app = express();

// Use CORS
app.use(cors());

// Use Routes
app.use('/api/bookmarks', bookmarks);

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

