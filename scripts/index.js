$(Document).ready(() => {
    // Init idCounter if necessary
    if (!localStorage.getItem('idCounter')) {
        let idCounter = 1;
        localStorage.setItem('idCounter', JSON.stringify(idCounter));
    }

    // Init ingredients array if necessary
    if (!localStorage.getItem('ingredients')) {
        let ingredients = [];
        localStorage.setItem('ingredients', JSON.stringify(ingredients));
    }

    // Init recipes array if necessary
    if (!localStorage.getItem('recipes')) {
        let recipes = [];
        localStorage.setItem('recipes', JSON.stringify(recipes));
    }

    // Hide forms
    $('#ingredientFrm').hide().submit(submitIngredient);
    $('#recipeFrm').hide().submit(submitRecipe);

    // Set events
    $('#addIngredient').click(addIngredientCLick);
    $('#showIngredients').click(showingredients);
    $('#addRecipe').click(addRecipeClick);
    $('#showRecipes').click(showrecipes);
});

// Add ingridient click event
function addIngredientCLick() {
    $('#action').html('Add Ingredient');
    $('#ingredientFrm').show();
    $('#recipeFrm').hide();
    $('#ph').html('');
}

// Submit ingridient form event
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

// Show ingridients click event
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

// Add recipe click event
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

// Add ingredient to recipe method
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

// Support function for rendering the added ingredients to recipe
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

// Submit recipe form event
function submitRecipe() {
    let name = $('#recipeName').val();
    let ingredients = JSON.parse(localStorage.getItem('recipeIngredients'));
    let time = $('#time').val();
    let imageUrl = $('#recipeImageUrl').val();
    let cookingMethod = $('#cookingMethod').val();

    let rec = new DishRecipe(name, ingredients, time, cookingMethod, imageUrl);
    let recipes = JSON.parse(localStorage.getItem('recipes'));
    recipes.push(rec);
    localStorage.setItem('recipes', JSON.stringify(recipes));

    return false;
}

// Show recipes click event
function showrecipes() {
    $('#ingredientFrm').hide();
    $('#recipeFrm').hide();
    $('#action').html('Recipes');
    $('#ph').html('');

    let recs = JSON.parse(localStorage.getItem('recipes'));
    let recipes = [];
    for (let i = 0; i < recs.length; i++) {
        recipes.push(new DishRecipe(recs[i].name, recs[i].ingredients, recs[i].time, recs[i].cookingMethod, recs[i].imageUrl));
    }

    let ph = $('#ph').html('');
    for (let i = 0; i < recipes.length; i++) {
        ph.append(recipes[i].render());
    }
}
