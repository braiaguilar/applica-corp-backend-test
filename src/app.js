require('dotenv').config();
const express = require('express');
const postRoutes = require('./routes/postRoutes');
const app = express();

app.use(express.json());

//Routes
app.use('/posts', postRoutes);

// Middleware for 404 errors
app.use((req, res, next) => {
    res.status(404).json({ message: 'Not Found' });
});

// Middleware for 500 errors
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
});

// Server start
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
