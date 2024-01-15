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


// fire a function after doc saved to db
userSchema.post('save', function(doc, next){
    console.log('new user was created and saved', doc);
    next(); // next is a function that we need to call to move to the next middleware
})

// fire a fuction before doc saved to db 
userSchema.pre('save', function(next){
    console.log('user about to be created and saved', this);
    next();
})

// lets create a model
const User = mongoose.model('user', userSchema);

module.exports = User;
