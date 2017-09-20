var db = require("../core/db");
var httpMsgs = require("../core/httpMsgs");
var util = require('util');

exports.getEventList = function (req, resp) {
    db.executeSql("SELECT * FROM Event", function (data, err) {
        if(err) {
            httpMsgs.show500(req, resp, err);
        } else {
            httpMsgs.sendJson(req, resp, data);
        }
    });
};

exports.get = function (req, resp, eventid) {
    db.executeSql("SELECT * FROM Event WHERE ev_id=" + eventid, function(data, err){
        if(err) {
            httpMsgs.show500(req, resp, err);
        }else{
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
            
            var sql = "INSERT INTO Event (ev_usr_id, ev_longitude, ev_latitude, ev_address, ev_description, ev_dateat) VALUES";
            sql+= util.format("(%d, %d, %d, '%s', '%s', '%s' )", data.ev_usr_id, data.ev_longitude, data.ev_latitude, data.ev_address, data.ev_description, data.ev_dateat)
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

exports.update = function (req, resp, reqBody) {
    try{
        if(!reqBody) throw new Error("Input not valid");
        var data = JSON.parse(reqBody);
        if(data){
            if(!data.Ev_id) throw new Error("Event ID not provided");
            
            var sql = "UPDATE Event SET"
            
            var isDataProvided = false;
            
            if(data.ev_longitude){
                sql += " ev_longitude = " + data.ev_longitude + ",";
                isDataProvided = true;
            }
            
            if(data.ev_latitude){
                sql += " ev_latitude = " + data.ev_latitude + ",";
                isDataProvided = true;
            }
            
            if(data.ev_address){
                sql += " ev_address= '" + data.ev_address + "',";
                isDataProvided = true;
            }
            
            if(data.ev_description){
                sql += " ev_description = '" + data.ev_description + "',";
                isDataProvided = true;
            }
            
            if(data.ev_dateat){
                sql += " ev_dateat = '" + data.ev_dateat + "',";
                isDataProvided = true;
            }
            
            sql = sql.slice(0, -1); //remove last coma
            sql += " WHERE ev_id = " + data.ev_id;
            
            db.executeSql(sql, function(data, err){
                if(err){
                    httpMsgs.show500(req, resp, err);
                }else{
                    httpMsgs.send200(req, resp);                    
                }
            })
        } else {
            throw new Error("Input not valid")
        }
    } catch(ex) {
        httpMsgs.show500(req, resp, ex);
    }
};

exports.delete = function (req, resp, reqBody) {
    try{
        if(!reqBody) throw new Error("Input not valid");
        var data = JSON.parse(reqBody);
        if(data){
            if(!data.ev_id) throw new Error("Event ID not provided");
            
            var sql = "DELETE FROM Event ";
            sql += " WHERE ev_id =" + data.ev_id;   
    
            db.executeSql(sql, function(data, err){
                if(err){
                    httpMsgs.show500(req, resp, err);
                }else{
                    httpMsgs.send200(req, resp);                    
                }
            })
        } else {
            throw new Error("Input not valid")
        }
    } catch(ex) {
        httpMsgs.show500(req, resp, ex);
    }
};