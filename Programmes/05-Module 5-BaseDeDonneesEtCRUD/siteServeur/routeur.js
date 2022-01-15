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
        requete.session.message = {
            type : "danger",
            contenu : error.message
        }
        reponse.redirect("/livres");
    });
});

// Affichage détaillé d'un livre
routeur.get("/livres/:id", (requete,reponse) => {
    livreModel.findById(requete.params.id)
        .exec()
        .then(livre => {
            console.log(livre)
            if(livre === null) {
                throw new Error("La demande d'affichage détaillé du livre a échouée !");
            }
            reponse.render("livres/livre.html.twig", {livre : livre, isModification:false});
        })
        .catch(error => {
            console.log(error);
            requete.session.message = {
                type : "danger",
                contenu : error.message
            }
            reponse.redirect("/livres");
        });
});

// Modification d'un livre (formulaire)
routeur.get("/livres/modification/:id", (requete,reponse) => {
    livreModel.findById(requete.params.id)
        .exec()
        .then(livre => {
            console.log(livre)
            if(livre === null) {
                throw new Error("La demande de modification du livre provenant du formulaire a échouée !");
            }
            reponse.render("livres/livre.html.twig", {livre : livre, isModification:true});
        })
        .catch(error => {
            console.log(error);
            requete.session.message = {
                type : "danger",
                contenu : error.message
            }
            reponse.redirect("/livres");
        });
});

// Modification du livre Traitement du formulaire dans le model et BDD
routeur.post("/livres/modificationServer", (requete,reponse) => {
    // console.log(requete.body);
    const livreUpdate = {
        nom : requete.body.titre,
        auteur : requete.body.auteur,
        nombreDePages : requete.body.nombreDePages,
        description : requete.body.description,
    }
    /* 
    Error
    (node:7420) [MONGODB DRIVER] Warning: collection.update is deprecated. Use updateOne, updateMany, or bulkWrite instead.
    */
    // livreModel.update({_id:requete.body.identifiant}, livreUpdate)
    livreModel.updateOne({_id:requete.body.identifiant}, livreUpdate)
    .exec()
    .then(resultat => {
        console.log(resultat)
        if(resultat.modifiedCount < 1) {
            throw new Error("La requête de modification du livre a échouée !");
        }
        requete.session.message = {
            type : "success",
            contenu : "Modification du livre effectuée"
        }
        reponse.redirect("/livres");
    })
    .catch(error => {
        console.log(error);
        requete.session.message = {
            type : "danger",
            contenu : error.message
        }
        reponse.redirect("/livres");
    });
});

routeur.post("/livres/delete/:id", (requete,reponse) => {
    /* 
    Error
    (node:14048) [MONGODB DRIVER] Warning: collection.remove is deprecated. Use deleteOne, deleteMany, or bulkWrite instead.
    */
    // livreModel.remove({_id:requete.params.id})
    livreModel.deleteOne({_id:requete.params.id})
    .exec()
    .then(resultat => {
        console.log(resultat)
        if(resultat.deletedCount < 1) {
            throw new Error("La requête de suppression du livre a échouée !");
        }
        requete.session.message = {
            type : "success",
            contenu : "Suppression du livre effectuée"
        }
        reponse.redirect("/livres");
    })
    .catch(error => {
        console.log(error);
        requete.session.message = {
            type : "danger",
            contenu : error.message
        }
        reponse.redirect("/livres");
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