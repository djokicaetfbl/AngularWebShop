
export class Category {
    //public name: string;
    public categoryName: string;
    public imageSrc: string;
    public active: boolean;
    public id: string;
    public file: string;
    /*public ingredients: Ingredient[];*/


    constructor(id: string, categoryName: string, imageSrc: string, active: boolean, file: string){
        //this.name = name;
        this.id = id;
        this.categoryName = categoryName;
        this.imageSrc = imageSrc;
        this.active = active;
        this.file = file;
        //this.ingredients = ingredients;
    }
}