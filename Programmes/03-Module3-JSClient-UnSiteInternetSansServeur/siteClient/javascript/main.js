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

console.log(tableauLivres);

var table = document.querySelector("#tableauLivres");

var livre1 = document.createElement("tr");

livre1.innerHTML = `<td>L'Algorithmique selon H2PROG</td>
        <td>Matthieu GASTON</td>
        <td>200</td>
        <td><button type="button" class="btn btn-warning m-2">Modifier</button></td>
        <td><button type="button" class="btn btn-danger m-2">Supprimer</button></td>`;

table.appendChild(livre1);
