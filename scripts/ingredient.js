class Ingredient {
    constructor(id, name, imageUrl, calories) {
        this.id = id;
        this.name = name;
        this.imageUrl = imageUrl;
        this.calories = calories;
    }

    render = function () {
        let card = document.createElement('div');
        card.setAttribute('class', 'card');
        card.setAttribute('data', this.id);
        let img = document.createElement('img');
        img.setAttribute('src', this.imageUrl);
        card.appendChild(img);
        let div = document.createElement('div');
        div.setAttribute('class', 'container');
        let h4 = document.createElement('h4');
        h4.innerHTML = this.name;
        div.appendChild(h4);
        let p = document.createElement('p');
        p.innerHTML = this.calories + 'Calories';
        div.appendChild(p);
        card.appendChild(div);
        return card;
    };
}
