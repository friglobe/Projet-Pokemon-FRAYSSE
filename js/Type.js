export default class Type {
    constructor(name, image) {
        this.name = name;
        this.image = image;
        this.color = this.getColorHexa();
    }

    getColorHexa() {
        switch (this.name) {
            case "Plante": return "#78c850";
            case "Feu": return "#f08030";
            case "Eau": return "#6890f0";
            case "Électrik": return "#f8d030";
            case "Glace": return "#98d8d8";
            case "Combat": return "#c03028";
            case "Poison": return "#a040a0";
            case "Sol": return "#e0c068";
            case "Vol": return "#a890f0";
            case "Psy": return "#f85888";
            case "Insecte": return "#a8b820";
            case "Roche": return "#b8a038";
            case "Spectre": return "#705898";
            case "Dragon": return "#7038f8";
            case "Ténèbres": return "#705848";
            case "Acier": return "#b8b8d0";
            case "Fée": return "#ee99ac";
            case "Normal": return "#a8a878";
            default: return "#a8a878";
        }
    }
}