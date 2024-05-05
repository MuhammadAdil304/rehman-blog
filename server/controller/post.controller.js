const { SendResponse } = require("../helpers/helper");
const Post = require("../models/post.model");

const PostController = {
    createPost: async (req, res) => {
        const id = req.params.id;
        if (!req.body.title || !req.body.content) {
            return res.status(400).send(SendResponse(false, 'Title and Content are required', null))
        }
        const checkUniqueTitle = await Post.findOne({ title: req.body.title })
        if (checkUniqueTitle) {
            return res.send(SendResponse(false, 'Title already exist', null))
        }
        const slug = req.body.title.split(' ').join('-').toLowerCase().replace(/[^a-zA-Z0-9-]/g, '-')
        const newPost = new Post({
            ...req.body, slug, userId: id
        })
        try {
            const savePost = await newPost.save()
            res.status(200).send(SendResponse(true, 'Post created successfully', savePost))
        }
        catch (error) {
            res.status(500).send(SendResponse(false, error.message, null))
        }
    }
}

module.exports = PostController;