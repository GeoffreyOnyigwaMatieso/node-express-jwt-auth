const mongoose = require('mongoose');
// email validation
const { isEmail } = require('validator');

// lets create a schema
const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
        lowercase: true,
        validate: [ isEmail, 'Please enter a valid email']
    },
    password:{
        type:String,
        required: [true, 'Please enter password'],
        minlength:[6,'Minimum password length is 6 characters'] ,

    }
});

// lets create a model
const User = mongoose.model('user', userSchema);

module.exports = User;
