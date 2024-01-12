const User = require('../models/User');

// handle error 
const handleErrors = (err) => {
    console.log(err.message, err.code);

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
        res.status(201).json(user);
    }
    catch(err){
        // console.log(err);
        handleErrors(err);
        res.status(400).send('error, user not created');
    }


}

module.exports.login_post = async (req, res) => {
    // console.log(req.body);
    const { email, password } = req.body;
    console.log(email, password);
    res.send('user login');
}