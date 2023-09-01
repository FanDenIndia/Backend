const mongoose = require("mongoose");
var validator = require('validator');

const promoterSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please add the Promoter name"],
        },

        email: {
            type: String,
            trim: true,
            lowercase: true,
            unique: [true, "Email address already taken!"],
            required: 'Email address is required',
            validate: [validator.isEmail, 'Please fill a valid email address']
        },

        sales:{
            type:Number,
            default:0,
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Promoter", promoterSchema);