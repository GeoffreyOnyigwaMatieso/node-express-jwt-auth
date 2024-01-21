//lets require the routes from express package
// destructuring the routes from the express package

const {Router } = require('express');

const authController = require('../controllers/authController');

// lets create a router instance

const  router = Router();

router.get('/signup',authController.signup_get);

router.post('/signup',authController.signup_post);

router.get('/login', authController.login_get); 

router.post('/login', authController.login_post); 

router.get('/logout', authController.logout_get); 


module.exports = router;

