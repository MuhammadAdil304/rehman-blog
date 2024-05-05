const express = require('express');
const PostController = require('../controller/post.controller');

const router = express.Router();

router.post('/createPost/:id', PostController.createPost)

module.exports = router;