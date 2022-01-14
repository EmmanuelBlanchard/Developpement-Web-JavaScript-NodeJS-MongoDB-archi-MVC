const express = require("express");
const server = express();
const morgan = require("morgan");
const router = require('./routeur');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const session = require('express-session')
server.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}))

mongoose.connect("mongodb://localhost/biblio", {useNewUrlParser:true,useUnifiedTopology:true});

server.use(express.static("public"));
server.use(morgan("dev"));
// parse application/x-www-form-urlencoded
server.use(bodyParser.urlencoded({extended:false}));
server.set('trust proxy', 1) // trust first proxy

// Bascule le message dans la réponse
// Permet de supprimer le message Flash 
server.use((requete,reponse,next) => {
    reponse.locals.message = requete.session.message;
    delete requete.session.message;
    next();
});

server.use("/", router);
server.listen(3000);
