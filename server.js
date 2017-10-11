var express = require('express');

var mongoose = require('mongoose');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var bodyParser = require('body-parser');
var settings = require('./settings');
var httpMsgs = require('./core/httpMsgs');

var app = express();


//connect to mongodb
mongoose.connect('mongodb://localhost/taniguchisitedb');
var db = mongoose.connection;

//handle mongo error
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function(){
    //connected
    console.log("connected");
});

//look for static files as html -- for frontend
app.use(express.static(__dirname + "/public"));

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


//include routes
var routes = require('./routes/router');
app.use('/', routes);

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