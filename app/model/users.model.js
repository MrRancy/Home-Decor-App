const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema ({
    name : {
        type : String,
        required : true,
        min : 3,
        lowercase : true
    },
    email : {
        type : String,
        required : true,
        min : 3
    },
    gender : {
        type : String,
        required : true,
        lowercase : true
    },
    password : {
        type : String,
        required : true,
        min : 8
    },
    role : {
        type : Number,
        default : 0,
        required : true,
    },
    date : {
        type : Date,
        default : Date.now
    },
    token : {
        type : String,
        default : null
    }
});

module.exports = User = mongoose.model("users", userSchema);