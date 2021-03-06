const table = document.querySelector("#tableauLivres");

var livre1 = {
    nom : "L'Algorithmique selon H2PROG",
    auteur : "Matthieu GASTON",
    nombreDePages : 200, 
}

var livre2 = {
    nom : "La France du 19ème",
    auteur : "Albert Patrick",
    nombreDePages : 500, 
}

var livre3 = {
    nom : "Le monde des animaux",
    auteur : "Marc Merlin",
    nombreDePages : 250, 
}

var livre4 = {
    nom : "Le virus d'Asie",
    auteur : "Tya Milo",
    nombreDePages : 120, 
}

var tableauLivres = [livre1,livre2,livre3,livre4];
afficherLivres();

function afficherLivres() {
    var livresAffichageTableTbody = document.querySelector("#tableauLivres tbody");
    var livres = "";
    for(var i = 0 ; i < tableauLivres.length ; i++) {
        livres += ` <tr>
                        <td>${tableauLivres[i].nom}</td>
                        <td>${tableauLivres[i].auteur}</td>
                        <td>${tableauLivres[i].nombreDePages}</td>
                        <td><button type="button" onclick="afficherFormulaireModification(${i})" class="btn btn-warning m-2">Modifier</button></td>
                        <td><button type="button" onclick="supprimerLivre(${i})" class="btn btn-danger m-2">Supprimer</button></td>
                    </tr>`;
    }
    livresAffichageTableTbody.innerHTML = livres;
}

function afficherFormulaire() {
    document.querySelector("#modificationLivreFormulaire").className = "d-none";
    document.querySelector("#ajoutFormulaire").removeAttribute("class");
}

function ajoutLivre(titre,auteur,nombreDePages) {
    var livre = {
        nom : titre,
        auteur : auteur,
        nombreDePages : nombreDePages, 
    }
    tableauLivres.push(livre);
    afficherLivres();
}

function supprimerLivre(position) {
    if(confirm("Voulez-vous vraiment supprimer ce livre ? ")) {
        tableauLivres.splice(position,1);
        afficherLivres();
        alert("Suppression du livre effectuée");
    } else {
        alert("Action de suppression du livre annulée");
    }
}

function afficherFormulaireModification(positionLivre) {
    document.querySelector("#ajoutFormulaire").className = "d-none";
    
    var livre = tableauLivres[positionLivre];

    document.querySelector("#modificationLivreFormulaire").removeAttribute("class");

    document.querySelector("#modificationLivreFormulaire #titre").value = livre.nom;
    document.querySelector("#modificationLivreFormulaire #auteur").value = livre.auteur;
    document.querySelector("#modificationLivreFormulaire #nombreDePages").value = livre.nombreDePages;
    document.querySelector("#modificationLivreFormulaire #identifiant").value = positionLivre;
}

document.querySelector("#validationFormulaireAjout").addEventListener("click", function(event) {
    event.preventDefault();

    var titre = document.querySelector("#ajoutFormulaire #titre").value;
    var auteur = document.querySelector("#ajoutFormulaire #auteur").value;
    var nombreDePages = parseInt(document.querySelector("#ajoutFormulaire #nombreDePages").value);
    ajoutLivre(titre,auteur,nombreDePages);
    const formulaire = document.querySelector("#ajoutFormulaire")
    formulaire.reset();
    formulaire.className = "d-none";
});


document.querySelector("#validationFormulaireModification").addEventListener("click", function(event) {
    event.preventDefault();
    
    var titre = document.querySelector("#modificationLivreFormulaire #titre").value;
    var auteur = document.querySelector("#modificationLivreFormulaire #auteur").value;
    var nombreDePages = parseInt(document.querySelector("#modificationLivreFormulaire #nombreDePages").value);
    var positionLivre = document.querySelector("#modificationLivreFormulaire #identifiant").value;

    var livre = tableauLivres[positionLivre];

    livre.nom = titre;
    livre.auteur = auteur;
    livre.nombreDePages = nombreDePages;
    
    afficherLivres();
    document.querySelector("#modificationLivreFormulaire").className = "d-none";
});

/* Documentation 

    Problèmatiques

        => Comment réaliser une structure commune pour ne pas dupliquer le menu, le design global, la structure du DOM ?

        => Comment réaliser les actions du CRUD ( Ajout / Modification / Suppression) ?

        => Comment conserver les données de notre site ?

    JavaScript Client : 

    => Le JavaScript client est executé sur la machine de l'utilisateur au travers du navigateur. Il est donc impossible que le client stocke de manière perenne des données dont le site internet a besoin.
    
    => Le stockage des données doit donc se faire à l'extérieur du client, c'est à dire sur le serveur.

    
    Quel site avons nous créé ?

    => Tout ce que nous venons de programmer se situe au niveau du client, c'est le navigateur qui travaille !

    => Au rechargement de la page, nous perdons tout ce que nous avons fait puisque cela n'a jamais étét << sauvergardé >>

    => Pour sauvegarder les informations, nous avons besoin d'un serveur et d'un espace de stockage (une base de données)

    => Il est donc nécessaire d'envisager un autre type de programmation

*/