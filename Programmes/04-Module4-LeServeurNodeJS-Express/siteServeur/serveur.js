var express = require("express");
var server= express();

server.listen(3000);

server.use("/", function() {
    console.log("Reception d'une demande cliente");
});

