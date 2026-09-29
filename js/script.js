class Type{
    constructor(nom){
        this.nom =nom;
        this.image = image;
        this.color = this.getColorHexa();
    }
    getColorHexa(){
        switch (this.arrTypes[0].color) {
            case "Plante":
                couleurFond = "lightgreen";
                couleurBourdure = "green";
                break;
            case "Feu":
                couleurFond = "navajowhite";
                couleurBourdure = "orangered";
                break;
            case "Eau":
                couleurFond = "lightblue";
                couleurBourdure = "blue";
                break;
            case "Électrik":
                couleurFond = "lightyellow";
                couleurBourdure = "gold";
                break;
            case "Glace":
                couleurFond = "#e0ffff";
                couleurBourdure = "cyan";
                break;
            case "Combat":
                couleurFond = "#f4cccc";
                couleurBourdure = "darkred";
                break;
            case "Poison":
                couleurFond = "plum";
                couleurBourdure = "purple";
                break;
            case "Sol":
                couleurFond = "#e6d3b3";
                couleurBourdure = "peru";
                break;
            case "Vol":
                couleurFond = "#e6e6fa";
                couleurBourdure = "cornflowerblue";
                break;
            case "Psy":
                couleurFond = "#ffd1e8";
                couleurBourdure = "deeppink";
                break;
            case "Insecte":
                couleurFond = "#e2f0cb";
                couleurBourdure = "olivedrab";
                break;
            case "Roche":
                couleurFond = "#d9c9a3";
                couleurBourdure = "saddlebrown";
                break;
            case "Spectre":
                couleurFond = "#d3c0e3";
                couleurBourdure = "indigo";
                break;
            case "Dragon":
                couleurFond = "#c3b1e1";
                couleurBourdure = "darkslateblue";
                break;
            case "Ténèbres":
                couleurFond = "#c2c2c2";
                couleurBourdure = "black";
                break;
            case "Acier":
                couleurFond = "#dce1e6";
                couleurBourdure = "slategray";
                break;
            case "Fée":
                couleurFond = "#ffe0f0";
                couleurBourdure = "hotpink";
                break;
            case "Normal":
                couleurFond = "#f0f0d8";
                couleurBourdure = "tan";
                break;
            default:
                couleurFond = "lightgrey";
                couleurBourdure = "grey";
        }
        carte.style.backgroundColor = couleurFond;
        carte.style.borderColor = couleurBourdure;
        carte.style.borderWidth = "3px";
        carte.style.borderStyle = "solid";
    };
    

}

const body = document.querySelector("body");
const main = document.querySelector("main");

let i;
const list = document.createElement("select");
for (i = 1; i <= 8; i++) {
    list.innerHTML += `<option value="${i}">Génération ${i}</option>`;
}
body.prepend(list);


let pokemonsActuels = [];
let pokemonsAffiches = [];

// NOUVEAU : fonction qui NE FAIT QUE L'AFFICHAGE, à partir d'un tableau reçu en paramètre
function afficherPokemons(liste) {
    pokemonsAffiches = liste;
    main.innerHTML = "";

    liste.forEach(pokemon => {
        const carte = document.createElement("article");
        const type = pokemon.types[0].name;
        let couleurFond = "lightgrey";
        let couleurBourdure = "grey";

        switch (type) {
            case "Plante":
                couleurFond = "lightgreen";
                couleurBourdure = "green";
                break;
            case "Feu":
                couleurFond = "navajowhite";
                couleurBourdure = "orangered";
                break;
            case "Eau":
                couleurFond = "lightblue";
                couleurBourdure = "blue";
                break;
            case "Électrik":
                couleurFond = "lightyellow";
                couleurBourdure = "gold";
                break;
            case "Glace":
                couleurFond = "#e0ffff";
                couleurBourdure = "cyan";
                break;
            case "Combat":
                couleurFond = "#f4cccc";
                couleurBourdure = "darkred";
                break;
            case "Poison":
                couleurFond = "plum";
                couleurBourdure = "purple";
                break;
            case "Sol":
                couleurFond = "#e6d3b3";
                couleurBourdure = "peru";
                break;
            case "Vol":
                couleurFond = "#e6e6fa";
                couleurBourdure = "cornflowerblue";
                break;
            case "Psy":
                couleurFond = "#ffd1e8";
                couleurBourdure = "deeppink";
                break;
            case "Insecte":
                couleurFond = "#e2f0cb";
                couleurBourdure = "olivedrab";
                break;
            case "Roche":
                couleurFond = "#d9c9a3";
                couleurBourdure = "saddlebrown";
                break;
            case "Spectre":
                couleurFond = "#d3c0e3";
                couleurBourdure = "indigo";
                break;
            case "Dragon":
                couleurFond = "#c3b1e1";
                couleurBourdure = "darkslateblue";
                break;
            case "Ténèbres":
                couleurFond = "#c2c2c2";
                couleurBourdure = "black";
                break;
            case "Acier":
                couleurFond = "#dce1e6";
                couleurBourdure = "slategray";
                break;
            case "Fée":
                couleurFond = "#ffe0f0";
                couleurBourdure = "hotpink";
                break;
            case "Normal":
                couleurFond = "#f0f0d8";
                couleurBourdure = "tan";
                break;
            default:
                couleurFond = "lightgrey";
                couleurBourdure = "grey";
        }
        carte.style.backgroundColor = couleurFond;
        carte.style.borderColor = couleurBourdure;
        carte.style.borderWidth = "3px";
        carte.style.borderStyle = "solid";

        carte.innerHTML = `
            <figure>
              <picture>
                <img src="${pokemon.sprites.regular}" alt="Image ${pokemon.name.fr}" />
              </picture>
              <figcaption>
                <span class="types">${pokemon.types[0].name}</span>
                <h2>${pokemon.name.fr}</h2>
                <ol>
                  <li>Points de vie : ${pokemon.stats.hp}</li>
                  <li>Attaque : ${pokemon.stats.atk}</li>
                  <li>Défense : ${pokemon.stats.def}</li>
                  <li>Attaque spécial : ${pokemon.stats.spe_atk}</li>
                  <li>Vitesse : ${pokemon.stats.vit}</li>
                </ol>
              </figcaption>
            </figure>`;

        main.appendChild(carte);
    });
}


async function loadData(generation) {
    const data = await fetch(`https://tyradex.app/api/v1/gen/${generation}`)
        .then(response => response.json())
        .catch(error => alert("Erreur : " + error));

    pokemonsActuels = data;
    afficherPokemons(pokemonsActuels);
}

const typesPokemon = ["Normal", "Feu", "Eau", "Plante", "Électrik", "Glace",
    "Combat", "Poison", "Sol", "Vol", "Psy", "Insecte",
    "Roche", "Spectre", "Dragon", "Ténèbres", "Acier", "Fée"];

const conteneurBoutons =document.createElement("div");
conteneurBoutons.id ="filtres-types";
body.insertBefore(conteneurBoutons, main);

const boutonTous = document.createElement("button");
boutonTous.textContent ="Tous";
boutonTous.addEventListener("click",() =>{
    afficherPokemons(pokemonsActuels);
});

conteneurBoutons.appendChild(boutonTous);

typesPokemon.forEach(unType =>{
    const bouton = document.createElement("button");
    bouton.textContent = unType;

    bouton.addEventListener("click",()=>{
        const pokemonsFiltres = pokemonsActuels.filter(pokemon => pokemon.types.some(t => t.name ===unType));
        afficherPokemons(pokemonsFiltres);
    });
    conteneurBoutons.appendChild(bouton);
});

const selectTri = document.createElement("select");
selectTri.innerHTML=`
<option value ="nom">Trier par nom</option>
<option value ="hp">Trier par point de vie</option>
<option value ="attaque">Trier par attaque</option>
<option value ="defense">Trier par défense</option>
<option value ="vitesse">Trier par vitesse</option>`;

body.insertBefore(selectTri, conteneurBoutons);

selectTri.addEventListener("change",function(event){
    const critere =event.target.value;

    const listeTriee = [...pokemonsAffiches].sort((a,b)=>{
        switch(critere){
            case "nom":
                return a.name.fr.localeCompare(b.name.fr);
            case "hp":
                return b.stats.hp - a.stats.hp;
            case "attaque":
                return b.stats.atk - a.stats.atk;
            case "defense":
                return b.stats.def - a.stats.def;
            case "vitesse":
                return b.stats.vit - a.stats.vit; default:
                return 0;
        }
    })
    afficherPokemons(listeTriee);
});


loadData(1);

list.addEventListener("change", function (event) {
    const generationChoisie = event.target.value;
    loadData(generationChoisie);
});