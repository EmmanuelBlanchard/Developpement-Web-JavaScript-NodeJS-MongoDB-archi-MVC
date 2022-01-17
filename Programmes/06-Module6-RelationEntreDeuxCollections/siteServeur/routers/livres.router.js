const express = require("express");
const router = express.Router();
const twig = require("twig");
const livreController = require("../controllers/livre.controller");

const multer =  require("multer");

const storage = multer.diskStorage({
  destination: function (requete, file, cb) {
    cb(null, './public/images/');
  },
  filename: function (requete, file, cb) {
    //   var date = new Date().toLocaleDateString();
    //   console.log(date);

    // Error: ENOENT: no such file or directory, open 
    // cb(null, date+'-'+(Math.round(Math.random() * 1E9))+'-'+file.originalname);
      
    // cb(null, Date.now() + '-' + Math.round(Math.random() * 1E9) + '-' + file.originalname);
    // cb(null, file.originalname);
    
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();

    cb(null, day + '-' + month + '-' + year + '-' + Math.round(Math.random() * 1E9) + '-' + file.originalname);
  }
});

const fileFilter = (requete, file, cb) => {
    if(file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
        cb(null, true); // Accepter le fichier
    } else {
        cb(new Error("Le format de l'image n'est pas acceptée"), false);
    }
};

const upload = multer({
    storage : storage,
    limits : {
        fileSize : 1024 * 1024 * 5 // 5mo
    },
    fileFilter: fileFilter 
});

router.get("/", livreController.livres_affichage);

router.post("/", upload.single("image"), livreController.livres_ajout);

// Affichage détaillé d'un livre
router.get("/:id", livreController.livre_affichage);

// Modification d'un livre (formulaire)
router.get("/modification/:id", livreController.livre_modification);

// Modification du livre Traitement du formulaire dans le model et BDD
router.post("/modificationServer", livreController.livre_modification_validation);

router.post("/updateImage", upload.single("image"), livreController.livre_modification_validation_image);

router.post("/delete/:id", livreController.livre_suppression);

module.exports = router;