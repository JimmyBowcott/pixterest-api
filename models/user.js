const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    src: { type: String, required: true },
    height: { type: String, required: true },
    width: { type: String, required: true },
    description: { type: String, required: true },
    link: { type: String, required: true },
    isAdult: { type: Boolean, required: true },
    author: { type: String, required: true },
    authorIcon: { type: String, required: true },
    copyright: { type: String, required: true },
    filename: { type: String, required: true },
    searchTerm: { type: String, required: true },
    index: { type: Number, required: true },
});

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    savedPosts: [postSchema],
});

const User = mongoose.model('User', userSchema);

module.exports = User;