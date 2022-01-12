// document.querySelector("div").innerHTML = "Hello World";

let texte = "";
for(let i = 1 ; i < 11 ; i++) {
    texte += 5 + " * " + i + " = " + (i*5) + " <br>"; 
}
//document.querySelector("div").innerHTML = texte;

document.querySelector(".resultatDeLaTableDeMuliplicationDe5").innerHTML = texte;

//alert("Hello World !");
// Debut presentation de l'affichage via pop-up
/*
let texte = "";
for(let i = 1 ; i < 11 ; i++) {
    texte += i + " * " + 5 + " = " + (i*5) + " \n"; 
}
alert(texte);
*/