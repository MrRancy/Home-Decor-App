const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema ({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    gender : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    role : {
        type : Number,
        default : 0,
        required : true
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