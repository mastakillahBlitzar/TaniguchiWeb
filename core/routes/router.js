var express = require('express');
var router = express.Router();
var User = require('../schemas/user');
var passport = require('passport');
const nodemailer = require('nodemailer');



/* router.all('/*', function(req, resp, next){

    console.log('he caido aca');
    next();
});  */

/* contact Email route */
router.post('/contact/send%form', function (req, res, next) {
    console.log('contact form route working');
    const output = `
            <p>You have a new request</p>
            <h3>Contact details</h3>
            <ul>
                <li>Name: ${req.body.message.name}</li>
                <li>Email: ${req.body.message.email}</li>
                <li>Phone: ${req.body.message.phone}</li>
                <li>Fax: ${req.body.message.fax}</li>
            </ul>
            <h3>Message</h3>
            <p>${req.body.message.content}</p>
        `;

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: "gmail",
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
            user: req.body.email, // generated ethereal user
            pass: 'j1u2a3n4camilo'  // generated ethereal password
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"Gs Taniguchi contact services 👻" <juano.diy@gmail.com>', // sender address
        to: 'juano.diy@gmail.com', // list of receivers
        subject: 'Hello! New inquiry ✔', // Subject line
        text: 'Hello world?', // plain text body
        html: output // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
            res.status(error.responseCode).json({
                msg: error.message
            })
        }
            console.log('Message sent: %s', info.messageId);
            // Preview only available when sending through an Ethereal account
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

            res.status(200).json({
                status: 'Email Sent! Will contact you shortly'
            });
        });
});

//POST route
router.post('/auth', function (req, res, next) {

    if (req.body.username && req.body.password) {
        passport.authenticate('local', function (err, user, info) {
            if (err) {
                return next(err);
            }
            if (!user) {
                return res.status(401).json({
                    err: info
                });
            }
            req.logIn(user, function (err) {
                if (err) {
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
router.post('/register', function (req, resp, next) {
    if (req.body.username && req.body.password) {
        User.register(new User({ username: req.body.username }),
            req.body.password, function (err, account) {
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


router.get('/status', function (req, res) {
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