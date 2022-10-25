$(Document).ready(() => {
    // Init idCounter or load
    if (!localStorage.getItem('idCounter')) {
        idCounter = 1;
        localStorage.setItem('idCounter', JSON.stringify(idCounter));
    }

    // Init ingredients array or load
    if (!localStorage.getItem('ingredients')) {
        ingredients = [];
        localStorage.setItem('ingredients', JSON.stringify(ingredients));
    }

    $('#ingredientFrm').hide().submit(submitIngredient);

    $('#addIngredient').click(addIngredientCLick);
});

function addIngredientCLick() {
    $('#action').html('Add Ingredient');
    $('#ingredientFrm').show();
}

function submitIngredient() {
    const name = $('#ingredientName').val();
    const imageUrl = $('#imageUrl').val();
    const calories = $('#ingredientCalories').val();
    const id = JSON.parse(localStorage.getItem('idCounter'));

    const ing = new Ingredient(id, name, imageUrl, calories);
    console.log(ing);
    localStorage.setItem('idCounter', JSON.stringify(id + 1));

    let ingredients = JSON.parse(localStorage.getItem('ingredients'));
    ingredients.push(ing);
    localStorage.setItem('ingredients', JSON.stringify(ingredients));

    return false;
}

class Ingredient {
    constructor(id, name, imageUrl, calories) {
        this.id = id;
        this.name = name;
        this.imageUrl = imageUrl;
        this.calories = calories;
    }

    render() {}

    toJson() {
        return { id: this.id, name: this.name, imageUrl: this.imageUrl, calories: this.calories };
    }
}
