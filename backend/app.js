const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');

const postRoutes = require('./routes/post');
const authRoutes = require('./routes/auth');

const app = express();

mongoose.connect("mongodb+srv://andrew:sTnPbOGfyLiUF1Bu@cluster0-oudwc.mongodb.net/posts-database?retryWrites=true")
        .then(() => {
            console.log('Connection to db is successfuly!');
        })
        .catch(() => {
            console.log('Failed of db connection!!!');
        });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use("/images", express.static(path.join("backend/images")));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, PUT, DELETE, PUT, OPTIONS"
    );
    next();
});

app.use("/api/posts", postRoutes);
app.use("/api/auth", authRoutes);


module.exports = app;