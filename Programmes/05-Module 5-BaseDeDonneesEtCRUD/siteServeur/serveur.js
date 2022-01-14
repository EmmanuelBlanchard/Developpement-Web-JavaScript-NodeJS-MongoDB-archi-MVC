const express = require("express");
const server = express();
const morgan = require("morgan");
const router = require('./routeur');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

mongoose.connect("mongodb://localhost/biblio", {useNewUrlParser:true,useUnifiedTopology:true});

server.use(express.static("public"));
server.use(morgan("dev"));
// parse application/x-www-form-urlencoded
server.use(bodyParser.urlencoded({extended:false}));

server.use("/", router);
server.listen(3000);
