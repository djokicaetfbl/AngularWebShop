
export class Category {
    public categoryName: string;
    public imageUrl: string;
    public active: boolean;
    /*public ingredients: Ingredient[];*/


    constructor(categoryName: string, imageUrl: string, active: boolean/*,  ingredients: Ingredient[]*/){
        this.categoryName = categoryName;
        this.imageUrl = imageUrl;
        this.active = active;
        //this.ingredients = ingredients;
    }
}