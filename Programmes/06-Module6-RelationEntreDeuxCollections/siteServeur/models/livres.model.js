const mongoose = require("mongoose");

const livreSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    nom: String,
    // auteur: String,
    auteur: {
        type: mongoose.Schema.Types.ObjectId,
        // Quelle est la collection concernée
        ref: "Auteur",
        required: true
    },
    nombreDePages: Number,
    description: String,
    image: String,
});

// Association entre le schema et la BD, Export du model
module.exports = mongoose.model("Livre",livreSchema);