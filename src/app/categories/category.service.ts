import { HttpClient } from "@angular/common/http";
import { EventEmitter, Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { DataStorageService } from "../shared/data-storage.service";
import { Category } from "./category.model";
import { map, tap, take, exhaustMap } from "rxjs/operators";


/*The @Injectable decorator aims to actually set some metadata about which dependencies to inject into the constructor of the associated class. 
It's a class decorator that doesn't require parameters. Without this decorator no dependency will be injected...    
tip ubacim  u konstruktor constructor(private slService: ShoppingListService) {}
*/

@Injectable()
export class CategoryService {
    categoriesChanged = new Subject<Category[]>();

    //We will be using HttpParams to add the URL Parameter, which is then used by the GET , POST , PUT & PATCH etc methods to send an HTTP request to the back end API

    /*
    Subject.
    The subject next method is used to send messages to an observable which are then sent to all angular components that are subscribers (a.k.a. observers) of that observable.
     */

    private categories: Category[] = []; // pazi da inicijalizujes ovdje u nizu :D

    constructor(private http: HttpClient,/* private slService: ShoppingListService */ /*private dataStorageService: DataStorageService*/) {}

    setCategories(categories: Category[]){
        this.categories = categories;
        this.categoriesChanged.next(this.categories.slice());
        /*
        he slice() method returns selected elements in an array, as a new array. slice() selects the elements starting at the given start argument, and ends at, 
        but does not include, the given end argument. slice() does not change the original array.
         */
    }

    getCategories() {
        return this.categories.slice();
    }

    getCtegory(index: number) {
        return this.categories[index];
    }

    addCategory(category: Category) {
        this.categories.push(category);
        this.categoriesChanged.next(this.categories.slice());

        //this.dataStorageService.storeCategories();

        const categories = this.getCategories();
        this.http.post('https://webshopangulardiplomski-default-rtdb.europe-west1.firebasedatabase.app/categories.json', category) // put overvriduje sve podatke koji su prije bili, dodajemo /recipes.json zbog firebase-a
        .subscribe(response => {
            console.log(response);
        });      
    }

    loadCategories() {
        return this.http.get<Category[]>('https://webshopangulardiplomski-default-rtdb.europe-west1.firebasedatabase.app/categories.json',
        )
        .pipe(
            map(categories => { // ovdje je map kao rxjs operator 
                return categories.map( category => {
                    return {...category/*, ingredients: recipe.ingredients ? recipe.ingredients : [] */} // kopiram sve dobijene podatke u recipe, i ako nema ingredients neka taj niz sa ingredients bude prazan,, ovo mogu da vidim u konzoli kao response pa onda znam sta kako 
                }); // ovde je map poziv javascript metode :D // sa ... rijec je o nizu
            }), // kako bismo osigurali da svaki put dobijamo i 'ingredients'
            tap(categories => {
                this.setCategories(categories);
            })
            );
    }

    updateCategory(index: number, newCategory: Category) {
        this.categories[index] = newCategory;
        this.categoriesChanged.next(this.categories.slice());
    }

    deleteCategory(index: number) {
        this.categories.splice(index,1); // na poziciji index izbrisi 1 element :D
        this.categoriesChanged.next(this.categories.slice());
    }

}