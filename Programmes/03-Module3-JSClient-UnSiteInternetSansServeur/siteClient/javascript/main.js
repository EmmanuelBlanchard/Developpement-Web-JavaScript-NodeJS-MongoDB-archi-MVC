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

for(var i = 0 ; i <= tableauLivres.length - 1 ; i++) {
    var livre = document.createElement("tr");

    livre.innerHTML = ` <td>${tableauLivres[i].nom}</td>
                        <td>${tableauLivres[i].auteur}</td>
                        <td>${tableauLivres[i].nombreDePages}</td>
                        <td><button type="button" class="btn btn-warning m-2">Modifier</button></td>
                        <td><button type="button" class="btn btn-danger m-2">Supprimer</button></td>`;
    table.appendChild(livre);
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
    console.log(tableauLivres);
}

document.querySelector("#validationFormulaireAjout").addEventListener("click", function(event) {
    event.preventDefault();

    var titre = document.querySelector("#ajoutFormulaire #titre").value;
    var auteur = document.querySelector("#ajoutFormulaire #auteur").value;
    var nombreDePages = parseInt(document.querySelector("#ajoutFormulaire #nombreDePages").value);
    ajoutLivre(titre,auteur,nombreDePages);
});
