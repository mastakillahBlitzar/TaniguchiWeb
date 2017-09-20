var db = require("../core/db");
var httpMsgs = require("../core/httpMsgs");
var util = require('util');


exports.getUserList = function(req, resp){
    db.executeSql("SELECT * FROM [User]", function (data, err) {
        if(err) {
            httpMsgs.show500(req, resp, err);
        } else {
            httpMsgs.sendJson(req, resp, data);
        }
    });
};

//insert --> POST
exports.add = function (req, resp, reqBody) {
    try{
        if(!reqBody) throw new Error("Input not valid");
        var data = JSON.parse(reqBody);
        if(data){
            var sql = "INSERT INTO [User] (usr_name, usr_surname, usr_email) VALUES";
            sql+= util.format("('%s', '%s', '%s' )", data.Usr_name, data.Usr_surname, data.Usr_email)
            db.executeSql(sql, function(data, err){
                if(err){
                    httpMsgs.show500(req, resp, err);
                }else{
                    httpMsgs.send200(req, resp);                    
                }
            });
        } else {
            throw new Error("Input not valid")
        }
    } catch(ex) {
        httpMsgs.show500(req, resp, ex);
    }
};