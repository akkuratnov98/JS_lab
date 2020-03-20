const path = require('path');
const server = require(path.resolve(__dirname, 'server1.3.js'));
const router = require(path.resolve(__dirname, 'router.js'));
const requestHandlers = require(path.resolve(__dirname, 'requestHandlers'));


var handle = {};
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/animals"] = requestHandlers.start;
handle["/upload"] = requestHandlers.upload;
handle["/favicon.ico"] = requestHandlers.favicon;
handle["/animals/antelope"] = requestHandlers.animalsAntelope;
handle["/animals/shark"] = requestHandlers.animalsShark;
handle["/animals/macaw"] = requestHandlers.animalsMacaw;

server.start(router.route, handle);

