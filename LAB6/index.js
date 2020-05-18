const express = require("express");
const app = express();
var cors = require('cors');
var bodyParser = require('body-parser');

//middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extend:true}));

app.use("/", require("./api"));


app.listen(8888, ()=>{
    console.log("Server listening 8888 port");
});

