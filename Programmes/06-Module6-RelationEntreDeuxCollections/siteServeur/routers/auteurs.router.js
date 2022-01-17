const express = require("express");
const router = express.Router();
const twig = require("twig");
const auteurController = require("../controllers/auteur.controller");

// Affichage de la liste des auteurs
router.get("/", auteurController.auteurs_affichage);

// Ajout d'un auteur
router.post("/", auteurController.auteurs_ajout);

// Affichage détaillé d'un auteur
router.get("/:id", auteurController.auteur_affichage);

// Modification d'un auteur (formulaire)
router.get("/modification/:id", auteurController.auteur_modification);

// Modification d'un auteur : Traitement du formulaire dans le model et BDD
router.post("/modificationServer", auteurController.auteur_modification_validation);

// Suppression d'un auteur
router.post("/delete/:id", auteurController.auteur_suppression);

module.exports = router;