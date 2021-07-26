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
        /*for(var i = 0; i < categories.length; i++){
            console.log("------------");
            console.log(categories[i].categoryName);
            console.log("------------");
        }*/
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

        const categories = this.getCategories(); // sa put kao radi :d
        this.http.post('https://webshopangulardiplomski-default-rtdb.europe-west1.firebasedatabase.app/categories.json', /*categories*/category) // put overvriduje sve podatke koji su prije bili, dodajemo /recipes.json zbog firebase-a
        .subscribe(response => {
            //console.log(response);
            //this.categoriesChanged.next(this.categories.slice());
            this.setCategories(this.categories);
           
        });
            
    }

    loadCategories() {
        console.log("FAK!");
        this.http.get<any>('https://webshopangulardiplomski-default-rtdb.europe-west1.firebasedatabase.app/categories.json') // put overvriduje sve podatke koji su prije bili, dodajemo /recipes.json zbog firebase-a
        .subscribe(response => {
            //console.log(response);

            for(var i in response){
                //console.log("RESPONSE: "+JSON.stringify(response[i].categoryName));
                this.categories.push(response[i]);
            }
            //this.categoriesChanged.next(this.categories.slice());  
            this.setCategories(this.categories);      // mora ovdje u subscribe biti ovo setCategories               
        }); 

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