const mongoose = require("mongoose");
var validator = require('validator');

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please add the user name"],
        },

        email: {
            type: String,
            trim: true,
            lowercase: true,
            unique: [true, "Email address already taken!"],
            required: 'Email address is required',
            validate: [validator.isEmail, 'Please fill a valid email address']
        },


        password: {
            type: String,
            required: [true, "Please add the user password"],
        },
        events: {
            type: [String],
        },
        isPromoter: {
            type: Boolean,
            default: false,
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("User", userSchema);