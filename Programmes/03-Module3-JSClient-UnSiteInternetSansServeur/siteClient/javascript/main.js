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
                        <td><button type="button" class="btn btn-warning m-2">Modifier</button></td>
                        <td><button type="button" onclick="supprimerLivre(${i})" class="btn btn-danger m-2">Supprimer</button></td>
                    </tr>`;
    }
    livresAffichageTableTbody.innerHTML = livres;
}

function AjouterFormulaire() {
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
