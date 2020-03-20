const exec = require("child_process").exec;
const path = require('path');
const fs = require("fs");
const querystring = require("querystring");

function start(response, postData, Key) {
    console.log("Request handler 'start' was called.");
    const page = fs.readFileSync(path.resolve(__dirname, 'Start.html'));
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write(page);
    response.end();
}

function upload(response, postData, Key) {
    console.log("Request handler 'animals' was called.");
    let animalAndKey = querystring.parse(postData).text.split(' '); //animalAndKey[0]- название животного
                                                                    //animalAndKey[1] - Номер изображения животного
    if (animalAndKey.length === 1)  animalAndKey[1] = (Math.floor(Math.random() * (9 - 1 + 1)) + 1).toString();
    let newUrl = `http://localhost:8888/animals/${animalAndKey[0]}?key=${animalAndKey[1]}`;
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(`<script> document.location.href = "${newUrl}"; </script>`);
    response.end();
}

function favicon(response, postData, Key){
    console.log("Request handler 'favicon' was called.");
    let icon = fs.readFileSync(path.resolve(path.dirname(__dirname), 'IMG/favicon.ico'));
    response.writeHead(200, {'Content-Type': 'image/x-icon'});
    response.write(icon);
    response.end();
}

function animals(response,postData) {
    console.log("Request handler 'animals' was called.");
    var body = '<html lang="en">'+
        '<head>'+
        '<meta http-equiv="Content-Type" content="text/html; '+
        'charset=UTF-8" />'+
        '<title> Лабораторная 5</title>' +
        '</head>'+
        '<script> document.location.href = "http://localhost:8888/animals"; </script>'+
        '<body>'+
        '<form action="/upload" method="post">'+
        '<input  id="text" type="text"  />' +
        '<input type="submit" value="Submit" />' +
        '</form>'+
        '</body>'+
        '</html>';
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();
}

function animalsAntelope(response, postData, Key){

    console.log("Request handler 'animalsAntelope' was called.");
    let image = fs.readFileSync(path.resolve(path.dirname(__dirname), `IMG/Antelopes/Antelope-${Key}.jpg`));
    response.writeHead(200, {'Content-Type': 'image/jpeg'});
    response.write(image);
    response.end();
}

function animalsShark(response, postData, Key){
    console.log("Request handler 'animalsShark' was called.");
    let image = fs.readFileSync(path.resolve(path.dirname(__dirname), `IMG/Sharks/Shark-${Key}.jpg`));
    response.writeHead(200, {'Content-Type': 'image/jpeg'});
    response.write(image);
    response.end();
}

function animalsMacaw(response, postData, Key){
    console.log("Request handler 'animalsMacaw' was called.");
    let image = fs.readFileSync(path.resolve(path.dirname(__dirname), `IMG/Macaws/Macaw-${Key}.jpg`));
    response.writeHead(200, {'Content-Type': 'image/jpeg'});
    response.write(image);
    response.end();
}

exports.start = start;
exports.upload = upload;
exports.favicon = favicon;
exports.animals = animals;
exports.animalsAntelope = animalsAntelope;
exports.animalsShark = animalsShark;
exports.animalsMacaw = animalsMacaw;