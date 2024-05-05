const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    userId: {
        type: String,
        require: true
    },
    content: {
        type: String,
        require: true
    },
    title: {
        type: String,
        require: true,
    },
    image: {
        type: String,
        default: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fsproutsocial.com%2Finsights%2Fhow-to-write-a-blog-post%2F&psig=AOvVaw1MLUsxLc3biRdz8ZDopAXd&ust=1714925522629000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCKCpo8ex9IUDFQAAAAAdAAAAABAE'
    },
    category: {
        type: String,
        default: 'uncategorized'
    },
    slug: {
        type: String,
        require: true,
    },
}, {
    timestamps: true
})

const Post = mongoose.model('Post', postSchema)
module.exports = Post