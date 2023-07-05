const mongoose = require("mongoose");
var validator = require('validator');
// const isEmail = require('isEmail')

// var validateEmail = function (email) {
//     var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
//     return re.test(email)
// };

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
            unique: true,
            unique: [true, "Email address already taken!"],
            required: 'Email address is required',
            validate: [validator.isEmail, 'Please fill a valid email address'],
            // match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
        },


        password: {
            type: String,
            required: [true, "Please add the user password"],
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("User", userSchema);