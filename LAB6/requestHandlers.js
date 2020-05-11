const fs = require("fs");
const { Image } = require('image-js');
const path = require('path');

async function firstHandler(body, res) {
    let name = body.name.split(' ');
    let img = await Image.load(path.resolve(path.dirname(__dirname), `IMG/${name[0]}s/${name[0]}-${name[1]}.jpg`));
    if (!(body.weight === "") && !(body.height === "")){
        img = img.resize(
           {width: body.width,
               height : body.height}
           );
    }
    if (!(body.width === "") && (body.height === "")){
        img = img.resize({width: body.width});
    }
    if ((body.width === "") && !(body.height === "")){
        img = img.resize({height: body.height});
    }

    await img.save('toSend.png');
    res.sendfile('toSend.png');
}

async function secondHandler(body, res) {
    let name = body.name;
    let find = false;
    let i = 1;
    let img;
    while (find === false && i<10){
       img = await Image.load(path.resolve(path.dirname(__dirname), `IMG/${name}s/${name}-${i}.jpg`));
       if (findColor(img) === body.colour) find = true;
       i++;
    }
    if (find === false) {
        res.sendStatus(404);
        return null;
    }

    if (!(body.weight === "") && !(body.height === "")){
        img = img.resize(
            {width: body.width,
                height : body.height}
        );
    }
    if (!(body.width === "") && (body.height === "")){
        img = img.resize({width: body.width});
    }
    if ((body.width === "") && !(body.height === "")){
        img = img.resize({height: body.height});
    }

    await img.save('toSend.png');
    res.sendfile('toSend.png');
}

function findColor(img){
     let pixelCount = 0, redPixel = 0, greenPixel = 0, bluePixel = 0;
     for (let i = 0; i<img.size; i=i+4){
         pixelCount++;
         let pixel = img.getPixel(i);
         redPixel += pixel[0];
         greenPixel += pixel[1];
         bluePixel += pixel[2];
     }
     if (redPixel > greenPixel && redPixel > bluePixel) return 'red';
     if (greenPixel > redPixel && greenPixel > bluePixel) return 'green';
     if (bluePixel > greenPixel && bluePixel > redPixel) return 'blue';
}

exports.firstHandler = firstHandler;
exports.secondHandler = secondHandler;

