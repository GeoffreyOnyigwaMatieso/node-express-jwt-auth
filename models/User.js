const mongoose = require('mongoose');
// email validation
const { isEmail } = require('validator');

//enctrypting our password
const bcrypt = require('bcrypt');


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


// fire a fuction before doc saved to db 
userSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    console.log('user about to be created and saved', this);
    next();
})


// fire a function after doc saved to db
userSchema.post('save', function(doc, next){
    console.log('new user was created and saved', doc);
    next(); // next is a function that we need to call to move to the next middleware
})

// static method to login user
userSchema.statics.login = async function(email, password){
    const user = await this.findOne({email});
    if(user){
        const auth = await bcrypt.compare(password, user.password);
        if(auth){
            return user;
        }
        throw Error('incorrect password');
    }

    throw Error('incorrect email');
}

// lets create a model
const User = mongoose.model('user', userSchema);

module.exports = User;
