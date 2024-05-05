const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    profilePicture: {
        type: String,
        default: 'https://www.google.com/imgres?q=profile%20image&imgurl=https%3A%2F%2Fcdn.pixabay.com%2Fphoto%2F2015%2F10%2F05%2F22%2F37%2Fblank-profile-picture-973460_960_720.png&imgrefurl=https%3A%2F%2Fpixabay.com%2Fvectors%2Fblank-profile-picture-mystery-man-973460%2F&docid=wg0CyFWNfK7o5M&tbnid=IFTclT_pNlD0eM&vet=12ahUKEwj_qpKL3eyFAxW1QvEDHaf4ArYQM3oECHQQAA..i&w=720&h=720&hcb=2&ved=2ahUKEwj_qpKL3eyFAxW1QvEDHaf4ArYQM3oECHQQAA'
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

const User = mongoose.model('User', userSchema)

module.exports = User