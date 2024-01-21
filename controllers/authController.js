const User = require('../models/User');
const jwt = require('jsonwebtoken');

// handle error 
const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { email: '', password: '' };

    // incorrect email
    if(err.message === 'incorrect email'){
        errors.email = 'that email is not registered';
    }

    // incorrect password
    if(err.message === 'incorrect password'){
        errors.password = 'that password is incorrect';
    }

    // duplicate error code 
    if(err.code === 11000){
        errors.email = 'that email is already registered';
        return errors; 

    }

    // validation errors
    if(err.message.includes('user validation failed')){
        Object.values(err.errors).forEach(({properties}) => {
            // console.log(properties);
            errors[properties.path] = properties.message;
        })
    }
    return errors;

}

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id)=>{
    return jwt.sign({id}, 'tech_g  secret', {
        expiresIn: maxAge
    })
}

module.exports.signup_get = async (req, res) => {
    res.render('signup');
}


module.exports.login_get = async (req, res) => {
    res.render('login');
}


module.exports.signup_post = async (req, res) => {
    
    const { email, password } = req.body;
    // console.log(email, password);
    // res.send('new signup');
    try {
        const user = await User.create({ email, password });
        // create a token
        const token = createToken(user._id);
        // create a cookie
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000})
        // send back a json as user._id
        res.status(201).json({user: user._id});
    }
    catch(err){
        // console.log(err);
       const errors =  handleErrors(err);
        res.status(400).json({ errors});
    }


}

module.exports.login_post = async (req, res) => {
    // console.log(req.body);
    const { email, password } = req.body;
    // console.log(email, password);
    // res.send('user login');
    try {
        const user = await User.login(email, password);
        const token = createToken(user._id);
        // create a cookie
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000})
        // send back a json as user._id
        res.status(200).json({user: user._id})
        
    } catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({errors});
    }
}

module.exports.logout_get = (req, res) => {
    // delete the required jwt or replace it with a blank cookie
    res.cookie('jwt', '', { maxAge: 1})
    // redirect to homepage 
    res.redirect('/');
    
}