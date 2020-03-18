/*
var http = require("http");
var fs = require("fs");

http.createServer( function(request, response) {
    console.log("Request received");

    var page = fs.readFileSync('HelloWorld.html');
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write(page);
    response.end();
    


}).listen(8888);
*/

var fs = require("fs");
url = require('url'),
http = require('http'),
qs = require('querystring');

var server = http.createServer(
    function (request, response) {
        console.log("Request received");
        if (request.method == 'POST') {
                console.log("POST");
                var body = '';
                request.on('data', function (data) {
                    body += data;
                });
                
                request.on('end',function() {
                    console.log(body);
                    response.writeHead(200);
                    response.write(
                        JSON.stringify({ 
                            numberOfSpaces: body.split(' ').length - 1 == 0 ?  "NO" : body.split(' ').length - 1 
                        })
                    );
                    response.end();
                });
        }
       // else {
        if (request.method == 'GET') {
            var params = url.parse(request.url);
            console.log("Returned HTML file");
            console.log(params);
            var page = fs.readFileSync('LAB1.html');
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.write(page);
            response.end();
        }
    }
);

server.listen(8888);
console.log("Server started!");