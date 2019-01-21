const express = require('express');
const bodyParser = require('body-parser');

const app = express();

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
    const post = req.body;
    console.log(post);
    res.status(201).json({
        message: "create post OK",
        data: post
    });
});

app.get('/api/posts', (req, res, next) => {
    posts = [
        { 
            id: 'hsw344goo5y94',
            title: 'Lorem ipsum dolor',
            content: 'sit amet, consectetur adipiscing elit. Maecenas eleifend imperdiet diam quis vulputate. Mauris egestas enim luctus '
        },
        { 
            id: 'hsw344dso5y94',
            title: 'eros facilisis,',
            content: 'vel vehicula risus semper. Vestibulum hendrerit pharetra sagittis.'
        },
        { 
            id: 'hsw344dso5ga4',
            title: 'Vivamus pharetra velit',
            content: 'et maximus ultricies. Duis ac dui in nisl vulputate cursus. Proin commodo nec neque ut vehicula. Nam sagittis '
        }
    ];
    res.status(200).json({
        message: 'posts return successfuly',
        data: posts
    });
});

module.exports = app;