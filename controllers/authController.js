const User = require('../models/User');
const jwt = require('jsonwebtoken');

// handle error 
const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { email: '', password: '' };

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
    console.log(email, password);
    res.send('user login');
}