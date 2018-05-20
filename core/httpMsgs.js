var settings = require("../settings");

exports.show500 = function(req, res, err) {
    if(settings.httpMsgsFormat === "HTML") {
        res.writeHead(500, "Internal Error Ocurred", {"Content-Type": "text/html"});
        res.write("<html><head><title>500</title></head><body>500: Internal Error. Details: " + err + "</body></html>");
            
    } else {
        res.writeHead(500, "Internal Error Ocurred", {"Content-Type": "application/json"});
        res.write(JSON.stringify({ data: "ERROR ocurred" + err}));
    }
    res.end();
};

exports.sendJson = function(req, res, data) {
    res.writeHead(200, {"Content-Type": "application/json"});
    if(data) {
        res.write(JSON.stringify(data.recordset)); 
    }
    res.end();
};

exports.show405 = function(req, res) {
    if(settings.httpMsgsFormat === "HTML") {
        res.writeHead(405, "Method not supported", {"Content-Type": "text/html"});
        res.write("<html><head><title>405</title></head><body>405: Method not supported. Details: </body></html>");
            
    } else {
        res.writeHead(405, "Method not supported", {"Content-Type": "application/json"});
        res.write(JSON.stringify({ data: "ERROR ocurred" + err}));
    }
    res.end();
};

exports.show404 = function(req, res, err) {
    if(settings.httpMsgsFormat === "HTML") {
        res.writeHead(404, "Resource not found", {"Content-Type": "text/html"});
        res.write("<html><head><title>404</title></head><body>404: Resource not found. Details: " + err + "</body></html>");
            
    } else {
        res.writeHead(404, "Resource not found", {"Content-Type": "application/json"});
        res.write(JSON.stringify({ data: "ERROR ocurred" + err}));
    }
    res.end();
};

exports.show413 = function(req, res) {
    if(settings.httpMsgsFormat === "HTML") {
        res.writeHead(413, "Request entity too large", {"Content-Type": "text/html"});
        res.write("<html><head><title>413</title></head><body>413: Request entity too large. Details: </body></html>");
            
    } else {
        res.writeHead(413, "Request entity too large", {"Content-Type": "application/json"});
        res.write(JSON.stringify({ data: "ERROR ocurred" + err}));
    }
    res.end();
};

exports.send200 = function(req, res) {
    res.writeHead(200, {"Content-Type": "application/json"});
    res.end();
};



