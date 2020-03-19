const path = require('path');
const fs = require("fs");
const http = require("http");
const URL = require("url");

function start(route, handle) {
    function onRequest(request, response) {
        let pathname = URL.parse(request.url).pathname;
        console.log("Request for " + pathname + " received.");
        route(handle, pathname, response);
        let page = fs.readFileSync(path.resolve(__dirname, 'Start.html'));
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.write(page);
        response.end();
    }
    http.createServer(onRequest).listen(8888);
    console.log("Server has started.");
}

exports.start = start;
