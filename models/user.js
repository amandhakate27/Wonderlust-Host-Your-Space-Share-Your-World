
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
    email : {
        type : String,
        required : true,
    },

})
userSchema.plugin(passportLocalMongoose); // adds username , hash and salt fields to store username and hashed password

module.exports = mongoose.model('User', userSchema);

