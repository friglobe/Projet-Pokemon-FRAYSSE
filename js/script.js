class Type{
    constructor(data){
        this.name =data.name;
        this.image = data.image;
        this.color = this.getColorHexa();
    }
    getColorHexa(){
        switch (this.name) {
            case "Normal":   return "#A8A77A";
            case "Feu":      return "#EE8130";
            case "Eau":      return "#6390F0";
            case "Plante":   return "#7AC74C";
            case "Électrik": return "#F7D02C";
            case "Glace":    return "#96D9D6";
            case "Combat":   return "#C22E28";
            case "Poison":   return "#A33EA1";
            case "Sol":      return "#E2BF65";
            case "Vol":      return "#A98FF3";
            case "Psy":      return "#F95587";
            case "Insecte":  return "#A6B91A";
            case "Roche":    return "#B6A136";
            case "Spectre":  return "#735797";
            case "Dragon":   return "#6F35FC";
            case "Ténèbres": return "#705746";
            case "Acier":    return "#B7B7CE";
            case "Fée":      return "#D685AD";
            default:         return "#808080";
        }
    }
}

class Pokemon{
    constructor(data){
        this.id = data.pokedex_id;
        this.image = data.sprites.regular;
        this.name = data.name.fr;
        this.apiTypes =data.types ?? []; 
        this.arrTypes = this.apiTypes.map(t => new Type(t));
        this.attack = data.stats.atk;
        this.defense = data.stats.def;
        this.special_attack = data.stats.spe_atk;
        this.speed = data.stats.vit;
    }
    displayCard(){
        const carte = document.createElement("article");
        
        const couleur = this.arrTypes[0]?.color ?? "#808080";
        carte.style.border = `3px solid ${couleur}`;
        carte.style.backgroundColor = `${couleur}33`;

        const badges = this.arrTypes
            .map(t => `<span class="badge-type" style="background:${t.color}">${t.name}</span>`)
            .join("");

            carte.innerHTML = `
            <figure>
              <picture>
                <img src="${this.image}" alt="Image ${this.name}" />
              </picture>
              <figcaption>
                <div class="types">${badges}</div>
                <h2>#${this.id} ${this.name}</h2>
                <ol>
                  <li>Attaque : ${this.attack}</li>
                  <li>Défense : ${this.defense}</li>
                  <li>Attaque spéciale : ${this.special_attack}</li>
                  <li>Vitesse : ${this.speed}</li>
                </ol>
              </figcaption>
            </figure>`;

        return carte;
    }
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

    liste.forEach(pokemon => main.appendChild(pokemon.displayCard()));
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
    bouton.style.backgroundColor = new Type({ name: unType }).color; //bonus
    bouton.addEventListener("click",()=>{
        const pokemonsFiltres = pokemonsActuels.filter(pokemon => pokemon.arrTypes.some(t => t.name === unType));
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
        switch (critere) {
    case "nom":     return a.name.localeCompare(b.name);
    case "hp":      return b.hp - a.hp;
    case "attaque": return b.attack - a.attack;
    case "defense": return b.defense - a.defense;
    case "vitesse": return b.speed - a.speed;
    default:        return 0;
    }})
    afficherPokemons(listeTriee);
});


loadData(1);

list.addEventListener("change", function (event) {
    const generationChoisie = event.target.value;
    loadData(generationChoisie);
});