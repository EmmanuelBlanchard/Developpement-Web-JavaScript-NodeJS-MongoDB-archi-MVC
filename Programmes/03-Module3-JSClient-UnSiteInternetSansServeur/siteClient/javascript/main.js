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

    livre.innerHTML = `<td>${tableauLivres[i].nom}</td>
            <td>${tableauLivres[i].auteur}</td>
            <td>${tableauLivres[i].nombreDePages}</td>
            <td><button type="button" class="btn btn-warning m-2">Modifier</button></td>
            <td><button type="button" class="btn btn-danger m-2">Supprimer</button></td>`;

    table.appendChild(livre);
}

function AjouterFormulaire() {
    if(!document.querySelector("#formulaireAjout")) {
        var monFormulaire = document.createElement("form");
        monFormulaire.setAttribute("id","formulaireAjout");

        monFormulaire.innerHTML = `
        <fieldset>
            <legend>Création d'un livre</legend>
            <div class="mb-3">
                <label for="titre" class="form-label">Titre</label>
                <input type="text" class="form-control" id="titre">
            </div>
            <div class="mb-3">
                <label for="auteur" class="form-label">Auteur</label>
                <input type="text" class="form-control" id="auteur">
            </div>
            <div class="mb-3">
                <label for="nombreDePages" class="form-label">Nombre de pages</label>
                <input type="number" class="form-control" id="nombreDePages">
            </div>
            <button type="submit" class="btn btn-primary">Valider</button>
        </fieldset>
    `;
    document.querySelector("main.container").appendChild(monFormulaire);
    }
}