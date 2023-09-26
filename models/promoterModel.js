const mongoose = require("mongoose");
var validator = require('validator');

const promoterSchema = new mongoose.Schema(
    {
        details:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
        },
        registrations:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:"EventRegis",        
        }],
        events:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Event",        
            
        }]
    },
);

module.exports = mongoose.model("Promoter", promoterSchema);