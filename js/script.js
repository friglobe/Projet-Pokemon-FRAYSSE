import Pokemon from "./Pokemon.js";
import Type from "./Type.js";

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

function afficherPokemons(liste) {
    pokemonsAffiches = liste;
    main.innerHTML = "";

    liste.forEach(pokemon => {
        const carte = pokemon.displayCard(); // directement, pas de "new Pokemon" ici
        main.appendChild(carte);
    });
}

async function loadData(generation) {
    try {
        const response = await fetch(`https://tyradex.app/api/v1/gen/${generation}`);
        const data = await response.json();
        pokemonsActuels = data.map(p => new Pokemon(p));
        afficherPokemons(pokemonsActuels);
    } catch (error) {
        alert("Erreur : " + error);
    }
}

const typesPokemon = ["Normal", "Feu", "Eau", "Plante", "Électrik", "Glace",
    "Combat", "Poison", "Sol", "Vol", "Psy", "Insecte",
    "Roche", "Spectre", "Dragon", "Ténèbres", "Acier", "Fée"];

const conteneurBoutons = document.createElement("div");
conteneurBoutons.id = "filtres-types";
body.insertBefore(conteneurBoutons, main);

const boutonTous = document.createElement("button");
boutonTous.textContent = "Tous";
boutonTous.addEventListener("click", () => {
    afficherPokemons(pokemonsActuels);
});
conteneurBoutons.appendChild(boutonTous);

typesPokemon.forEach(unType => {
    const bouton = document.createElement("button");
    bouton.textContent = unType;
    bouton.style.backgroundColor = new Type(unType).color;

    bouton.addEventListener("click", () => {
        const pokemonsFiltres = pokemonsActuels.filter(pokemon =>
            pokemon.arrTypes.some(t => t.name === unType)
        );
        afficherPokemons(pokemonsFiltres);
    });
    conteneurBoutons.appendChild(bouton);
});

const selectTri = document.createElement("select");
selectTri.innerHTML = `
<option value="nom">Trier par nom</option>
<option value="attaque">Trier par attaque</option>
<option value="defense">Trier par défense</option>
<option value="vitesse">Trier par vitesse</option>`;
body.insertBefore(selectTri, conteneurBoutons);

selectTri.addEventListener("change", function (event) {
    const critere = event.target.value;

    const listeTriee = [...pokemonsAffiches].sort((a, b) => {
        switch (critere) {
            case "nom": return a.name.localeCompare(b.name);
            case "hp": return b.hp - a.hp;
            case "attaque": return b.attack - a.attack;
            case "defense": return b.defense - a.defense;
            case "vitesse": return b.speed - a.speed;
            default: return 0;
        }
    });

    afficherPokemons(listeTriee);
});

loadData(1);

list.addEventListener("change", function (event) {
    const generationChoisie = event.target.value;
    loadData(generationChoisie);
});