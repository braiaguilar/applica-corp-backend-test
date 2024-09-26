require('dotenv').config();
const express = require('express');
const postRoutes = require('./routes/postRoutes');
const { errorHandler } = require('./utils/errorHandler');
const app = express();

app.use(express.json());

//Routes
app.use('/posts', postRoutes);

// Middleware error handler
app.use(errorHandler);

// Server start
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
