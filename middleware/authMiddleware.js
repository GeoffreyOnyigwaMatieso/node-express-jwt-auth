const jwt = require('jsonwebtoken');

// check for authentication 
const requireAuth = (req, res, next) => {
    // get token from request cookies 
    const token = req.cookies.jwt;
    // checks json web token exists and is verified
    if(token){
        jwt.verify(token, 'tech_g  secret', (err, decodedToken) => {
            if(err){
                console.log(err.message);
                res.redirect('/login');
            }
            else{
                console.log(decodedToken);
                next();
            }
        })
    }
    else{
        res.redirect('/login')
    }
}

// check current user 
const checkUser = (req, res, next) => {
    const token =  req.cookies.jwt

    if(token) {
        jwt.verify(token, 'tech_g  secret', async (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.locals.user = null;
                next();
            } else {
            console.log(decodedToken);
            let user = await User.findById(decodedToken.id);
            res.locals.user = user;
            next();
            }
        })

    } else {
        res.locals.user = null;
        next();


    }
}
module.exports = { requireAuth, checkUser };