var express = require("express");
var server= express();

server.listen(3000);

// server.use("/", function() {
//     console.log("Reception d'une demande cliente");
// });

// server.use("/test", function(requete,reponse) {
//     console.log("Reception d'une demande cliente");
//     console.log("Route de la requête : ");
//     console.log(requete.path);
//     console.log("OriginalUrl de la requête : ");
//     console.log(requete.originalUrl);
//     console.log("ParsedUrl : search de la requête : ");
//     console.log(requete._parsedUrl.search);
//     console.log("Informations sur la requête : ");
//     console.log(requete);
//     console.log("Liste des paramètres reçus : ");
//     console.log(requete.query);
//     reponse.end("Bonjour client : Ici le serveur !");
// });

server.get("/", (requete,reponse) => {
    console.log("Demande reçue avec la méthode GET sur l'url /");
    reponse.end("Demande GET recue !");
});

server.get("/test", (requete,reponse) => {
    console.log("Demande reçue avec la méthode GET sur l'url /test");
    reponse.end("Demande GET recue !");
});

server.post("/test", (requete,reponse) => {
    console.log("Demande reçue avec la méthode POST sur l'url /test");
    reponse.end("Demande POST recue !");
});