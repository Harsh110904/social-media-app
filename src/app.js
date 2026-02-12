const express = require("express");
const authRoutes = require('./routes/auth.routes');
const postRoutes = require('./routes/post.routes');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000', // Update with your frontend URL
    credentials: true
}));

// Routes
app.use('/auth', authRoutes);
app.use('/posts', postRoutes);

module.exports = app;
