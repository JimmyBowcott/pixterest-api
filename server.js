const express = require('express');
const app = express();
const path = require('path');
const connectDB = require('./config/db');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const MongoStore = require('connect-mongo');
require('dotenv').config();

const axios = require('axios');
axios.defaults.withCredentials = true;

// Database connection
connectDB();

// CORS
const corsOptions = {
  origin: ['http://localhost:5173', 'https://localhost:5173', 'https://localhost:3000', 'http://localhost:3000', 'https://pixterest.onrender.com/'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// Session setup
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
  cookie: { maxAge: 1000 * 60 * 60 * 24 }
}));

// Passport initialization
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use((req, res, next) => {
  console.log(`${req.method} request for '${req.url}'`);
  next();
});

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
});

app.use('/api/sign-up', require('./routes/signUp'));
app.use('/api/sign-in', require('./routes/signIn'));
app.use('/api/user', require('./routes/user'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
