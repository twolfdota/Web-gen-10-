const mongoose = require('mongoose');
const validator = require('mongoose-validator');

const comSchema = mongoose.Schema({
    email: { type: String, required: true, validate: emailValidator },
    comment: { type: String, required: true, validate: commentValidator },
    rating: { type: Number, default: 0 }
});

var commentValidator = [
    validate({
        validator: 'isLength',
        arguments: [3, 50],
        message: 'Comment should be between 30 and 300 characters'
    })
];
var emailValidator = [
    validate({
        validator: 'matches',
        arguments: ['^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$', 'i']
    })
];
module.exports = mongoose.model("comments", AcSchema);