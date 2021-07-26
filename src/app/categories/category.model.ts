
export class Category {
    //public name: string;
    public categoryName: string;
    public imageSrc: string;
    public active: boolean;
    /*public ingredients: Ingredient[];*/


    constructor(/*name: string,*/ categoryName: string, imageSrc: string, active: boolean/*,  ingredients: Ingredient[]*/){
        //this.name = name;
        this.categoryName = categoryName;
        this.imageSrc = imageSrc;
        this.active = active;
        //this.ingredients = ingredients;
    }
}