
const fs = require("fs");
const http = require("http");
const querystring = require('querystring');
const URL = require('url');
const path = require('path');

function start() {
    function onRequest(request, response) {
        console.log("Request received");
        const page = fs.readFileSync(path.resolve(__dirname, 'lab2.html'));

        if (URL.parse(request.url).search != null) {
            var queryVal = querystring.parse(URL.parse(request.url).query);                     
            request.on('data', () => { });

            request.on('end', () => {
                response.writeHead(200);                
                response.write(
                    JSON.stringify({ 
                       amount : isNaN(filterInt(queryVal.param1) + filterInt(queryVal.param2)) ? "Error!" : 
                       `Сумма = ${Number.parseInt(queryVal.param1) + Number.parseInt(queryVal.param2)}`
                    })
                );
                response.end();
            });                      
        } else {
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.write(page);
            response.end();
        }
    }
    
    http.createServer(onRequest).listen(8888);
    console.log("Server has started");
}

filterInt = function (value) {
    //if(/^(\-|\+)?([0-9]+|Infinity)$/.test(value))
    if(/\d/g.test(value))
      return Number(value);
    return NaN;
};

exports.start = start;