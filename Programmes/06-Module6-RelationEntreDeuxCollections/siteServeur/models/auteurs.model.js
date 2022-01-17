const mongoose = require("mongoose");

const auteurSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    nom: String,
    prenom: String,
    age: Number,
    sexe: Boolean,
});

// Ajout d'un virtual : faire le lien entre un auteur et les livres qu'il a écrit
// ref : la collection concernée => livres
// localField: le champ qui sert a faire le lien => _id
// foreignField: la clé étrangère présente dans chaque ligne de livre => le champ auteur
auteurSchema.virtual("livres", {
    ref: "Livre",
    localField: "_id",
    foreignField: "auteur"
})

// Association entre le schema et la BD, Export du model
module.exports = mongoose.model("Auteur",auteurSchema);