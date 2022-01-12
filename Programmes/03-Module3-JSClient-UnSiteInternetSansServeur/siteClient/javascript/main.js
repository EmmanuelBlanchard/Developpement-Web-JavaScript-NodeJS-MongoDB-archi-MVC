var tableauLivres = document.querySelector("#tableauLivres");

var livre1 = document.createElement("tr");
/*
livre1.innerHTML = `<td>L'Algorithmique selon H2PROG</td>
                    <td>Matthieu GASTON</td>
                    <td>200</td>
                    <td><button class="btn btn-warning">Modifier</button></td>
                    <td><button class="btn btn-danger">Supprimer</button></td>`;
*/
livre1.innerHTML = `<td>L'Algorithmique selon H2PROG</td>
        <td>Matthieu GASTON</td>
        <td>200</td>
        <td><button type="button" class="btn btn-warning m-2">Modifier</button></td>
        <td><button type="button" class="btn btn-danger m-2">Supprimer</button></td>`;

tableauLivres.appendChild(livre1);
