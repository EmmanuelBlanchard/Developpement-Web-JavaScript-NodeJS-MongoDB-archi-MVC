const mongoose = require("mongoose");
const fs = require("fs");
const livreModel = require("../models/livres.model");

exports.livres_affichage = (requete, reponse) => {
    var livres = livreModel.find()
    .exec()
    .then(livres => {
        //console.log(livres);
        reponse.render("livres/liste.html.twig", { livres : livres, message: reponse.locals.message});
    })
    .catch(error => {
        console.log(error);
    });
}

exports.livres_ajout = (requete,reponse) => {
    const livre = new livreModel({
        _id: new mongoose.Types.ObjectId(),
        nom: requete.body.titre,
        auteur: requete.body.auteur,
        nombreDePages: requete.body.nombreDePages,
        description: requete.body.description,
        image: requete.file.path.substring(14) // Supprimer /public/images/ du path
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
}

exports.livre_affichage = (requete,reponse) => {
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
}

exports.livre_modification = (requete,reponse) => {
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
}

exports.livre_modification_validation = (requete,reponse) => {
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
}

exports.livre_modification_validation_image = (requete,reponse) => {
    // Supppression de l'ancienne image en physique du serveur du dossier /images/
    var livre = livreModel.findById(requete.body.identifiant)
    .select("image")
    .exec()
    .then(livre => {
        console.log(livre)
        fs.unlink("./public/images/"+livre.image, error => {
            console.log(error);
        });
        const livreUpdate = {
            image: requete.file.path.substring(14) // Supprimer /public/images/ du path
        };
        // Mise a jour de la BD pour mettre le nouveau nom de l'image du livre en physique du serveur du dossier /images/
        livreModel.updateOne({_id:requete.body.identifiant}, livreUpdate)
        .exec()
        .then(resultat => {
            console.log(resultat);
            if(resultat.modifiedCount < 1) {
                throw new Error("La requête de modification de l'image du livre a échouée !");
            }
            requete.session.message = {
                type : "success",
                contenu : "Modification de l'image du livre effectuée"
            }
            reponse.redirect("/livres/modification/"+requete.body.identifiant);
        })
        .catch(error => {
            console.log(error);
            requete.session.message = {
                type : "danger",
                contenu : error.message
            }
            reponse.redirect("/livres/modification/"+requete.body.identifiant);
        });
    })
    .catch(error => {
        console.log(error);
    });
}

exports.livre_suppression = (requete,reponse) => {
    /* 
    Error
    (node:14048) [MONGODB DRIVER] Warning: collection.remove is deprecated. Use deleteOne, deleteMany, or bulkWrite instead.
    */
    // livreModel.remove({_id:requete.params.id})
    var livre = livreModel.findById(requete.params.id)
    .select("image")
    .exec()
    .then(livre => {
        console.log(livre)
        fs.unlink("./public/images/"+livre.image, error => {
            console.log(error);
        });
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
    })
    .catch(error => {
        console.log(error);
    });
}