const express = require("express");
const router = express.Router();
const twig = require("twig");

router.get("/", (requete,reponse) => {
    reponse.render("accueil.html.twig");
});

// Gère l'erreur 404
router.use((requete,reponse,suite) => {
    const error = new Error("Page non trouvee ! ");
    error.status = 404;
    suite(error); // envoi a la route ci-dessous avec "error" générée
});

// Gère toutes les erreurs
router.use((error,requete,reponse) => {
    reponse.status(error.status || 500);
    reponse.end(error.message);
});

module.exports = router;