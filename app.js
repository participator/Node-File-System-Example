var connect = require("connect");
var http = require("http");
var serveStatic = require("serve-static");
var util = require('util');
var fs = require("fs");

var app = connect();

var staticMiddleware = serveStatic("public", {index:["index.html", "index.htm"]});

// user agent
// language
// path 

function logit(req, res, next) {
    //util.log(util.format('Request received: %s, %s', req.method, req.url));
    writeFile(req, res);
    next();
}

function writeFile(req, res){
    var writeStream = fs.createWriteStream("./access.log", {flags:"a"});
    var headers = req.headers;
    writeStream.write(`${new Date()} | ${headers["user-agent"]} | ${headers["accept-language"]} | ${req.originalUrl} | ${req.method}\n`);
    req.pipe(writeStream);
    req.on('end', function() {        
        res.writeHead(200, {"content-type":"text/javascript"});
        //res.end('<h1>Oh Yeah!</h1>');
        res.end("{requestAmount: 1}");
    })
}

app.use(logit).use(staticMiddleware).listen(3333);
console.log("static web server started on port 3333");