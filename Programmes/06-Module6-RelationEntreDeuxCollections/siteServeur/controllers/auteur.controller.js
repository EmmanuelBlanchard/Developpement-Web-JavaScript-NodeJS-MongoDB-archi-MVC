const mongoose = require("mongoose");
const fs = require("fs");
const auteurModel = require("../models/auteurs.model");

exports.auteurs_affichage = (requete, reponse) => {
    auteurModel.find()
    // appel au virtual dans auteurs.model
    .populate("livres")
    .exec()
    .then(auteurs => {
        console.log(auteurs);
        reponse.render("auteurs/liste.html.twig", {auteurs : auteurs});
    })
    .catch(error => {
        console.log(error);
    });
}

exports.auteur_affichage = (requete, reponse) => {
    auteurModel.findById(requete.params.id)
    .exec()
    .then(auteur => {
        console.log(auteur);
        reponse.render("auteurs/auteur.html.twig", {auteur : auteur});
    })
    .catch(error => {
        console.log(error);
    });
}
