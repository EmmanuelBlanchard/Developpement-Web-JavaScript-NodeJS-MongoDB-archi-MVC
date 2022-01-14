const express = require("express");
const routeur = express.Router();
const twig = require("twig");
const mongoose = require("mongoose");
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

routeur.post("/livres", (requete,reponse) => {
    const livre = new livreModel({
        _id: new mongoose.Types.ObjectId(),
        nom: requete.body.titre,
        auteur: requete.body.auteur,
        nombreDePages: requete.body.nombreDePages,
        description: requete.body.description,
    })
    livre.save()
    .then(resultat => {
        console.log(resultat);
        reponse.redirect("/livres");
    })
    .catch(error => {
        console.log(error);
    });
});

routeur.get("/livres/:id", (requete,reponse) => {
    livreModel.findById(requete.params.id)
        .exec()
        .then(livre => {
            reponse.render("livres/livre.html.twig", {livre : livre});
        })
        .catch(error => {
            console.log(error);
        });
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