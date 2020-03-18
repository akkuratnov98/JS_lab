
var fs = require("fs");
var http = require("http");
var URL = require("url");

function start(route) {
    functiononRequest(request, response)
    {
        var pathname = URL.parse(request.url).pathname;
        console.log("Request for" + pathname + "received");
        route(pathname);
        var page = fs.readFileSync('HelloWorld.html');
        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.write(page);
        response.end();
    }
    http.createServer(onRequest).listen(8888);
    console.log("Server has started");
}

exports.start = start;