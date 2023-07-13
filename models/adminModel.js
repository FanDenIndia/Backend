const mongoose = require("mongoose");
var validator = require('validator');

const adminSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please add the admin name"],
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
            required: [true, "Please add the admin password"],
        },
        events: {
            type: [String],
        },
        isAdmin: {
            type: Boolean,
            default:true
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Admin", adminSchema);