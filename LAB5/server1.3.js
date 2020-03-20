const http = require("http");
const URL = require("url");

function start(route, handle) {
    function onRequest(request, response) {
        var postData = "";
        var SiteUrl = URL.parse(request.url);
        console.log("Request for " + SiteUrl + " received.");
        request.setEncoding("utf8");
        request.addListener("data", (postDataChunk) => {
            postData += postDataChunk;
            console.log(`Received POST data chunk ' ${postDataChunk}' .`);
        });
        request.addListener("end", () => {
            route(handle, SiteUrl, response, postData);
        });
    }
    http.createServer(onRequest).listen(8888);
    console.log("Server has started.");
}
exports.start = start;


