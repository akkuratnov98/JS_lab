const express = require("express");
const app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extend:true}));

app.use("/", require("./api"));


app.listen(8888, ()=>{
    console.log("Server listening 8888 port");
});

