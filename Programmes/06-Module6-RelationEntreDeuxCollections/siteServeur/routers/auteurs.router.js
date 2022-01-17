const express = require("express");
const router = express.Router();
const twig = require("twig");
const auteurController = require("../controllers/auteur.controller");

// Affichage détaillé d'un auteur
router.get("/:id", auteurController.auteur_affichage);

module.exports = router;