function start() {
    console.log("Request handler 'start' was called.");
}
function upload() {
    console.log("Request handler 'upload' was called.");
}
function favicon() {
    console.log("Request handler 'favicon' was called.");
}
function animals() {
    console.log("Request handler 'animals' was called.");
}

exports.start = start;
exports.upload = upload;
exports.favicon = favicon;
exports.animals = animals;