import Type from "./Type.js";

export default class Pokemon {
    constructor(data) {
        this.id = data.pokedex_id;
        this.image = data.sprites?.regular ?? "";
        this.name = data.name?.fr ?? "Inconnu";
        this.apiTypes = data.types ?? [];
        this.arrTypes = (data.types ?? []).map(unType => new Type(unType.name, unType.image));
        this.attack = data.stats?.atk ?? 0;
        this.defense = data.stats?.def ?? 0;
        this.special_attack = data.stats?.spe_atk ?? 0;
        this.speed = data.stats?.vit ?? 0;
    }

    displayCard() {
        const article = document.createElement("article");

        const couleur = this.arrTypes[0]?.color ?? "grey";
        const nomType = this.arrTypes[0]?.name ?? "Inconnu";

        article.style.backgroundColor = couleur + "33";
        article.style.borderColor = couleur;
        article.style.borderWidth = "3px";
        article.style.borderStyle = "solid";

        article.innerHTML = `
            <figure>
              <picture>
                <img src="${this.image}" alt="Image ${this.name}" />
              </picture>
              <figcaption>
                <span class="types">${nomType}</span>
                <h2>${this.name}</h2>
                <ol>
                  <li>Attaque : ${this.attack}</li>
                  <li>Défense : ${this.defense}</li>
                  <li>Attaque spécial : ${this.special_attack}</li>
                  <li>Vitesse : ${this.speed}</li>
                </ol>
              </figcaption>
            </figure>`;

        return article;
    }
}