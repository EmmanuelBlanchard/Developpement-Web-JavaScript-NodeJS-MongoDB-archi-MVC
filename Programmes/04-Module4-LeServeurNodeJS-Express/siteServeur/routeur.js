const express = require("express");
const routeur = express.Router();
const twig = require("twig");

routeur.get("/", (requete,reponse) => {
    reponse.render("accueil.html.twig");
});

routeur.get("/test", (requete,reponse) => {
    console.log("Demande reçue avec la méthode GET sur l'url /test");
    reponse.end("Page test méthode GET recue !");
});

routeur.post("/test", (requete,reponse) => {
    console.log("Demande reçue avec la méthode POST sur l'url /test");
    reponse.end("Page test méthode POST recue !");
});

// Gère l'erreur 404
routeur.use((requete,reponse,suite) => {
    const error = new Error("Page non trouvee ! ");
    error.status = 404;
    suite(error); // envoi a la route ci-dessous avec "error" générée
});

// Gère toutes les erreurs
routeur.use((error,requete,reponse) => {
    reponse.status(error.status || 500);
    reponse.end(error.message);
});

module.exports = routeur;