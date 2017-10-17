var express = require('express');
var router = express.Router();
var User = require('../schemas/user');
var passport = require('passport');




/* router.all('/*', function(req, resp, next){

    console.log('he caido aca');
    next();
});  */

//POST route
router.post('/auth', function(req, res, next){
    
    console.log('route working')    
    if(req.body.username && req.body.password){
        passport.authenticate('local', function(err, user, info){
            if(err){
                return next(err);
            }
            if(!user){
                return res.status(401).json({
                    err: info
                });
            }
            req.logIn(user, function(err){
                if(err){
                    return res.status(500).json({
                        err: 'Could not login user'
                    });
                }
                res.status(200).json({
                    status: 'Login Successful'
                });
            });
        })(req, res, next);
    } else {
        var err = new Error('All fields required.');
        err.status = 400;
        return next(err);
    }
});

//POST route for registering new user
router.post('/register', function(req, resp, next){
    if(req.body.username && req.body.password){
        User.register(new User({ username: req.body.username }),
        req.body.password, function(err, account) {
         if (err) {
          return resp.status(500).json({
            err: err
          });
        }
        passport.authenticate('local')(req, resp, function () {
          return resp.status(200).json({
            status: 'Registration successful!'
          });
        });
      });
    }
})

// GET for logout logout
router.get('/logout', function (req, res, next) {
    if (req.session) {
      // delete session object
      req.session.destroy(function (err) {
        if (err) {
          return next(err);
        } else {
          return res.redirect('/');
        }
      });
    }
  });


  router.get('/status', function(req, res) {
    if (!req.isAuthenticated()) {
      return res.status(200).json({
        status: false
      });
    }
    res.status(200).json({
      status: true
    });
  });
  

module.exports = router;