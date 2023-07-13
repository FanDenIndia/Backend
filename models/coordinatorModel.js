const mongoose = require("mongoose");
var validator = require('validator');

const coordinatorSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please add the name"],
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
            required: [true, "Please add the password"],
        },
        events: {
            type: [String],
        },
        isCoordinator: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Coordinator", coordinatorSchema);