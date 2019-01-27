const express = require('express');
const Post = require('../models/post');
const router = express.Router();

router.post('', (req, res, next) => {
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

router.put('/:id', (req, res, next) => {
    const post = new Post({
        _id: req.body.id,
        title: req.body.title,
        content: req.body.content
    });
    Post.updateOne({_id: req.params.id}, post)
        .then(result => {
            res.status(200).json({
                message: "post updated",
            });
        });
});

router.get('/:id', (req, res, next) => {
    Post.findById(req.params.id)
        .then(result => {
            if (result) {
                res.status(200).json(result);
            } else {
                res.status(404).json({message: '404 not found!!!'});
            }
        });
});

router.get('', (req, res, next) => {
    Post.find()
        .then(documents => {
            res.status(200).json({
                message: 'posts return successfuly',
                data: documents
            });
        });
});

router.delete('/:id', (req, res, next) => {
    Post.deleteOne({_id: req.params.id})
        .then(result => {
            res.status(200).json({
                message: 'Post deleted'
            });
        });
});

module.exports = router;