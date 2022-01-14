const express = require("express");
const routeur = express.Router();
const twig = require("twig");
const livreModel = require('./models/livres.model');

routeur.get("/", (requete,reponse) => {
    reponse.render("accueil.html.twig");
});

routeur.get("/livres", (requete,reponse) => {
    livreModel.find()
    .exec()
    .then(livres => {
        //console.log(livres);
        reponse.render("livres/liste.html.twig", { livres : livres});
    })
    .catch(error => {
        console.log(error);
    });
});

routeur.get("/livres/:nom", (requete,reponse) => {
    console.log(requete.params.nom);
    reponse.render("livres/livre.html.twig", {nom:requete.params.nom});
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