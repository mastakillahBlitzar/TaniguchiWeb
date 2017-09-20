var db = require("../core/db");
var httpMsgs = require("../core/httpMsgs");
var jwt = require('jsonwebtoken');
var secret = 'thelordoftherings';
var util = require('util');

exports.verify = function(req, resp, reqBody) {
    try{
        if(!reqBody) throw new Error("Input not valid");
        var data = JSON.parse(reqBody);
        if(data){
            db.executeSql("SELECT * FROM Auth WHERE auth_username='" + data.username + "' and auth_password='" + data.password + "' ", function(data, err){
                if(err){
                        httpMsgs.show500(req, resp, "Error interno en el servidor");
                }else{
                    if(!isEmptyObject(data.recordset)){
                        var object= data.recordset;
                        //console.log(object[0].auth_username);
                        var token = jwt.sign({
                            username: object[0].auth_username,
                            userid: object[0].auth_usr_id }, 
                            secret, { expiresIn: '24h'}
                        );
                        resp.json({ success: true, user: object[0].auth_username, token: token });
                    } else {
                        var error = " Usuario o contrase;a incorrecta";
                        httpMsgs.show500(req, resp, error);
                    }
                }
            }); 
        } else {
            throw new Error("Data not valid");
        }
    } catch(ex) {
        httpMsgs.show500(req, resp, ex);
    }
       
};

function isEmptyObject(obj) {
    for(var key in obj){
        if(Object.prototype.hasOwnProperty.call(obj, key)) {
            return false;
        }
    }
    return true;
}