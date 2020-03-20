const querystring = require("querystring");

function route(handle, SiteUrl, response, postData) {
    console.log("About to route a request for " + SiteUrl.pathname);
    if (typeof handle[SiteUrl.pathname] === 'function') {
        handle[SiteUrl.pathname](response, postData, querystring.parse(SiteUrl.query).key);
    } else {
        console.log("No request handler found for " + SiteUrl.pathname);
        response.writeHead(404, {"Content-Type": "text/plain"});
        response.write("404 Not found");
        response.end();
    }
}
exports.route = route;