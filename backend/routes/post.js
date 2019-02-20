const express = require('express');
const multer = require('multer');
const Post = require('../models/post');
const router = express.Router();

const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg'
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const isValid = MIME_TYPE_MAP[file.mimetype];
        const error = new Error("Invalid mimetype");
        if(isValid) {
            error = null;
        }
        cb(error, "backend/images");
    },
    filename: (req, file, cb) => {
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const ext = MIME_TYPE_MAP[file.mimetype];
        cb(null, name + '-' + Date.now() + '.' + ext);
    }
});
router.post('', multer({storage: storage}).single('image'), (req, res, next) => {
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