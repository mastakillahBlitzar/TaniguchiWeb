var express = require('express');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var bodyParser = require('body-parser');
var settings = require('../settings');
var httpMsgs = require('./httpMsgs');
const path = require('path');
var hash = require('bcrypt');
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;

var app = express();


//connect to mongodb
mongoose.connect('mongodb://localhost/taniguchisitedb');
var db = mongoose.connection;

//get model
var User = require('./schemas/user');

//handle mongo error
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function(){
    //connected
    console.log("connected");
});

//define middleware
app.use(express.static(__dirname + "/../public"));

//use sessions for tracking logins
app.use(session({
    secret: 'work-hard',
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
        mongooseConnection: db
    })
}));

//parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

//cookieparser
app.use(cookieParser());

//passport
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//include routes
var routes = require('./routes/router');
app.use('/user/', routes);

var articleroutes = require('./routes/articlerouter');
app.use('/user/edit/', articleroutes);

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
  });

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('sssFile Not Found');
    err.status = 404;
    next(err);
  });
  
// error handler
// define as the last app.use callback
app.use(function (err, req, res, next) {
res.status(err.status || 500);
res.send(err.message);
});
  

app.listen(settings.webPort, function(){
    console.log("running on :" + settings.webPort);
});