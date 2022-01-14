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
        reponse.render("livres/liste.html.twig", { livres : livres, message: reponse.locals.message});
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

// Affichage détaillé d'un livre
routeur.get("/livres/:id", (requete,reponse) => {
    livreModel.findById(requete.params.id)
        .exec()
        .then(livre => {
            reponse.render("livres/livre.html.twig", {livre : livre, isModification:false});
        })
        .catch(error => {
            console.log(error);
        });
});

// Modification d'un livre (formulaire)
routeur.get("/livres/modification/:id", (requete,reponse) => {
    livreModel.findById(requete.params.id)
        .exec()
        .then(livre => {
            reponse.render("livres/livre.html.twig", {livre : livre, isModification:true});
        })
        .catch(error => {
            console.log(error);
        });
});

routeur.post("/livres/delete/:id", (requete,reponse) => {
    livreModel.remove({_id:requete.params.id})
    .exec()
    .then(resultat => {
        requete.session.message = {
            type : "success",
            contenu : "Suppression du livre effectuée"
        }
        reponse.redirect("/livres");
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