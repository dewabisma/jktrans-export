const express = require('express');
const dotenv = require('dotenv').config();
const ejs = require('ejs');
const cookieParser = require('cookie-parser');

const app = express();

// view engine
app.set('view engine', ejs);

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index.ejs');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`Server is running at port ${PORT}`));
