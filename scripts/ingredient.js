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
