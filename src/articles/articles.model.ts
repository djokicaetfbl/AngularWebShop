
export class Article {
    //public name: string;
    public categoryName: string;
    public articleName: string
    public imageSrc: string;
    public active: boolean;
    public id: string;
    public file: string;
    public describe: string;
    public price: number;
    /*public ingredients: Ingredient[];*/


    constructor(id: string, categoryName: string, articleName: string, imageSrc: string, active: boolean, file: string, describe: string, price: number){
        //this.name = name;
        this.id = id;
        this.categoryName = categoryName;
        this.articleName = articleName;
        this.imageSrc = imageSrc;
        this.active = active;
        this.file = file;
        this.describe = describe;
        this.price = price;
        //this.ingredients = ingredients;
    }
}