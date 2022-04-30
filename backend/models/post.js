const mongoose = require("mongoose")
const Joi = require("joi");
const { string, number } = require("joi");


const postSchema = new mongoose.Schema({
    name: {type: String, default: ""},
    uID: {type: String, default: ""},
    post: {type: String, required: true, minlength: 1, maxlength: 420},
    likes: {type: Number, default: 0},
    dislikes: {type: Number, default: 0},
    dateAdded: { type: Date, default: Date.now()},

});

const Post = mongoose.model("Post", postSchema);

function validatePost(post) {
    const schema = Joi.object({
        post: Joi.string().required(),
        likes: Joi.number(),
        dislikes: Joi.number(),
    });
    return schema.validate(reply);
}

module.exports = {
    postSchema,
    Post,
    validatePost,
};
