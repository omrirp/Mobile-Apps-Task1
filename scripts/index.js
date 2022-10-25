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
    $('#recipeFrm').hide();

    $('#addIngredient').click(addIngredientCLick);
    $('#showIngredients').click(showingredients);
    $('#addRecipe').click(addRecipeClick);
});

function addIngredientCLick() {
    $('#action').html('Add Ingredient');
    $('#ingredientFrm').show();
    $('#recipeFrm').hide();
    $('#ph').html('');
}

function submitIngredient() {
    const name = $('#ingredientName').val();
    const imageUrl = $('#ingredientImageUrl').val();
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

function showingredients() {
    $('#ingredientFrm').hide();
    $('#recipeFrm').hide();
    $('#action').html('Ingredients');

    let ings = JSON.parse(localStorage.getItem('ingredients'));
    if (!ings) {
        return $('#ph').html('No ingredients added!');
    }

    let ingredients = [];
    for (let i = 0; i < ings.length; i++) {
        ingredients.push(new Ingredient(ings[i].id, ings[i].name, ings[i].imageUrl, ings[i].calories));
    }

    let ph = $('#ph').html('');
    for (let i = 0; i < ingredients.length; i++) {
        ph.append(ingredients[i].render());
    }
}

function addRecipeClick() {
    $('#ingredientFrm').hide();
    showingredients();
    $('#action').html('Create Recipe');
    $('#recipeFrm').show();
    localStorage.setItem('recipeIngredients', JSON.stringify({}));

    let cards = document.getElementsByClassName('card');

    for (let index = 0; index < cards.length; index++) {
        cards[index].setAttribute('onclick', 'addToRecipe(' + cards[index].getAttribute('data') + ')');
    }
}

function addToRecipe(id) {
    let recipeIngredients = JSON.parse(localStorage.getItem('recipeIngredients'));
    let allIngredients = JSON.parse(localStorage.getItem('ingredients'));
    if (!recipeIngredients) {
        recipeIngredients = {};
        localStorage.setItem('recipeIngredients', JSON.stringify(recipeIngredients));
    }

    let ing = allIngredients.find((i) => i.id === id);

    if (!recipeIngredients[ing.id]) {
        recipeIngredients[ing.id] = 1;
    } else {
        recipeIngredients[ing.id]++;
    }
    localStorage.setItem('recipeIngredients', JSON.stringify(recipeIngredients));
    renderIngredients();
}

function renderIngredients() {
    let recipeIngredients = JSON.parse(localStorage.getItem('recipeIngredients'));
    let allIngredients = JSON.parse(localStorage.getItem('ingredients'));
    let list = '';

    for (const id in recipeIngredients) {
        let ing = allIngredients.find((i) => i.id == id);
        let s = ing.name + ' x ' + recipeIngredients[id] + '\n';
        list += s;
    }

    $('#ingList').html(list);
}
