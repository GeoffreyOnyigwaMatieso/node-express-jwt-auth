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

module.exports = { requireAuth };