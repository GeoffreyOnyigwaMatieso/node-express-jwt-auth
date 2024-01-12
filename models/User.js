const mongoose = require('mongoose');

// lets create a schema
const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password:{
        type:String,
        required: true,
        minLength: 6,

    }
});

// lets create a model
const User = mongoose.model('user', userSchema);

module.exports = User;
