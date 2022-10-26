class DishRecipe {
    constructor(name, ingredients, time, cookingMethod, imageUrl) {
        this.name = name;
        this.ingredients = ingredients;
        this.time = time;
        this.cookingMethod = cookingMethod;
        this.imageUrl = imageUrl;
    }

    // Note ! --- this.ingredients ---
    // The ingredients field of this class is an object that:
    // its key represent the ingredient id and the value represent the quantity
    // {key: value} => {ingredient id: quantity}

    render = function () {
        let card = document.createElement('div');
        card.setAttribute('class', 'card');

        let img = document.createElement('img');
        img.setAttribute('src', this.imageUrl);
        card.appendChild(img);

        let div = document.createElement('div');
        div.setAttribute('class', 'container');
        let h4 = document.createElement('h4');
        h4.innerHTML = this.name;
        div.appendChild(h4);

        let p1 = document.createElement('p');
        p1.innerHTML = this.ingredientsToString();
        div.appendChild(p1);

        let p2 = document.createElement('p');
        p2.innerHTML = 'Time: ' + this.time;
        div.appendChild(p2);

        let p3 = document.createElement('p');
        p3.innerHTML = 'Calories: ' + this.calcCalories();
        div.appendChild(p3);

        let p4 = document.createElement('p');
        p4.innerHTML = this.cookingMethod;
        div.appendChild(p4);

        card.appendChild(div);
        return card;
    };

    ingredientsToString() {
        let allIngredients = JSON.parse(localStorage.getItem('ingredients'));
        let ingredientStr = '';
        let ingKeys = Object.keys(this.ingredients);
        console.log(ingKeys);

        for (let i = 0; i < ingKeys.length; i++) {
            let ing = allIngredients.find((ingredient) => ingredient.id == ingKeys[i]);
            let s = ing.name + ' x ' + this.ingredients[ing.id] + ' ';
            ingredientStr += s;
        }
        return ingredientStr;
    }

    calcCalories() {
        let allIngredients = JSON.parse(localStorage.getItem('ingredients'));
        let ingKeys = Object.keys(this.ingredients);
        let calories = 0;
        for (let i = 0; i < ingKeys.length; i++) {
            let ing = allIngredients.find((ingredient) => ingredient.id == ingKeys[i]);
            calories += ing.calories * this.ingredients[ing.id];
        }
        return calories;
    }
}
