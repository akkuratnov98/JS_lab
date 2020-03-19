const path = require('path');
const server = require(path.resolve(__dirname, 'server1.2.js'));
const router = require(path.resolve(__dirname, 'router.js'));
const requestHandlers = require(path.resolve(__dirname, 'requestHandlers'));


var handle = {};
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/upload"] = requestHandlers.upload;
handle["/favicon.ico"] = requestHandlers.favicon;
handle["/animals"] = requestHandlers.animals;

server.start(router.route, handle);

