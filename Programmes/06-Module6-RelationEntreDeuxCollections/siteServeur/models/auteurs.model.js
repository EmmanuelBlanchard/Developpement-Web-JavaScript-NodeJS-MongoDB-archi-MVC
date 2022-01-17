const mongoose = require("mongoose");

const auteurSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    nom: String,
    prenom: String,
    age: Number,
    sexe: Boolean,
});

// Association entre le schema et la BD, Export du model
module.exports = mongoose.model("Auteur",auteurSchema);