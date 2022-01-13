var express = require("express");
var server= express();
var morgan = require("morgan");

server.use(morgan("dev"));

server.listen(3000);

server.get("/", (requete,reponse) => {
    console.log("Page d'accueil demandée");
    reponse.end("Page d'accueil demandée !");
});

server.get("/test", (requete,reponse) => {
    console.log("Demande reçue avec la méthode GET sur l'url /test");
    reponse.end("Demande GET recue !");
});

server.post("/test", (requete,reponse) => {
    console.log("Demande reçue avec la méthode POST sur l'url /test");
    reponse.end("Demande POST recue !");
});

// Gère l'erreur 404
server.use((requete,reponse,suite) => {
    const error = new Error("Page non trouvee ! ");
    error.status = 404;
    suite(error); // envoi a la route ci-dessous avec "error" générée
});

// Gère toutes les erreurs
server.use((error,requete,reponse) => {
    reponse.status(error.status || 500);
    reponse.end(error.message);
});
