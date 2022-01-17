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

exports.auteurs_ajout = (requete,reponse) => {
    const auteur = new auteurModel({
        _id: new mongoose.Types.ObjectId(),
        nom: requete.body.nom,
        prenom: requete.body.prenom,
        age: requete.body.age,
        sexe: (requete.body.sexe) ? true : false,
    })
    auteur.save()
    .then(resultat => {
        console.log(resultat);
        reponse.redirect("/auteurs");
    })
    .catch(error => {
        console.log(error);
        requete.session.message = {
            type : "danger",
            contenu : error.message
        }
        reponse.redirect("/auteurs");
    });
}

exports.auteur_affichage = (requete, reponse) => {
    auteurModel.findById(requete.params.id)
    // appel au virtual dans auteurs.model
    .populate("livres")
    .exec()
    .then(auteur => {
        console.log(auteur);
        reponse.render("auteurs/auteur.html.twig", {auteur : auteur});
    })
    .catch(error => {
        console.log(error);
    });
}
