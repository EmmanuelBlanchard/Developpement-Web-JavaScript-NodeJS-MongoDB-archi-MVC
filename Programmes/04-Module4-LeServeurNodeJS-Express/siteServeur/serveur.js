var express = require("express");
var server = express();
var morgan = require("morgan");
var router = require('./routeur');

server.use(morgan("dev"));
server.use("/", router);

server.listen(3000);
