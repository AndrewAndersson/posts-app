const express = require('express');
const bodyParser = require('body-parser');

const Post = require('./models/post');
const mongoose = require('mongoose');

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

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, DELETE, PUT, OPTIONS"
    );
    next();
});

app.post('/api/posts', (req, res, next) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content
    });
    post.save()
        .then(result => {
            res.status(201).json({
                message: "create post OK",
                data: result
            });
        });
});

app.get('/api/posts', (req, res, next) => {
    Post.find()
        .then(documents => {
            res.status(200).json({
                message: 'posts return successfuly',
                data: documents
            });
        });
});

app.delete('/api/posts/:id', (req, res, next) => {
    Post.deleteOne({_id: req.params.id})
        .then(result => {
            console.log(res);
            res.status(200).json({
                message: 'Post deleted'
            });
        });
});

module.exports = app;