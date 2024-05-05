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
    },
    getPosts: async (req, res) => {
        try {
            const startIndex = parseInt(req.query.startIndex) || 0
            const limit = parseInt(req.query.limit) || 9
            const sortDirection = req.query.order === 'asc' ? 1 : -1
            const conditions = [];

            if (req.query.userId) conditions.push({ userId: req.query.userId });
            if (req.query.category) conditions.push({ category: req.query.category });
            if (req.query.slug) conditions.push({ slug: req.query.slug });
            if (req.query.postId) conditions.push({ _id: req.query.postId });
            if (req.query.searchTerm) {
                conditions.push({
                    $or: [
                        { title: { $regex: req.query.searchTerm, $options: 'i' } },
                        { content: { $regex: req.query.searchTerm, $options: 'i' } }
                    ]
                });
            }

            const posts = await Post.find(
                conditions.length > 0 ? { $and: conditions } : {}
            ).sort({ updatedAt: sortDirection }).skip(startIndex).limit(limit);

            const totalPosts = await Post.countDocuments()

            const now = new Date()

            const oneMonthAgo = new Date(
                now.getFullYear(),
                now.getMonth() - 1,
                now.getDate(),
            )

            const lastMonthPosts = await Post.countDocuments({
                updatedAt: {
                    $gte: oneMonthAgo
                }
            })
            res.status(200).send(SendResponse(true, null, { posts, totalPosts, lastMonthPosts }))
        }
        catch (error) {
            res.status(500).send(SendResponse(false, error.message, null))
        }
    }
}

module.exports = PostController;