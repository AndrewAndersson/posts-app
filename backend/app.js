const express = require('express');

const app = express();

app.use((req, res, next) => {
    console.log('first word');
    next();
});

app.use((req, res, next) => {
    res.send('Hello WORLD');
});

module.exports = app;