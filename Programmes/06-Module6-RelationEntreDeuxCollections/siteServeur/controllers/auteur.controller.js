const mongoose = require("mongoose");
const fs = require("fs");
// const livreModel = require("../models/livres.model");

exports.auteur_affichage = (requete, reponse) => {
    reponse.render("auteurs/auteur.html.twig");
}
