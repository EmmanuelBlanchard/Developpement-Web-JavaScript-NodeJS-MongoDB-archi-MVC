const mongoose = require("mongoose");
const fs = require("fs");
const auteurModel = require("../models/auteurs.model");

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
