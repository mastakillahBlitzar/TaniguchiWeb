var express = require('express');
var app = express();
var settings = require('./settings');
var httpMsgs = require('./core/httpMsgs');

//look for static files as html -- for frontend
app.use(express.static(__dirname + "/public"));


app.listen(settings.webPort, function(){
    console.log("running on :" + settings.webPort);
});