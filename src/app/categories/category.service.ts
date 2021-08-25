import { HttpClient } from "@angular/common/http";
import { EventEmitter, Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { DataStorageService } from "../shared/data-storage.service";
import { Category } from "./category.model";
import { map, tap, take, exhaustMap } from "rxjs/operators";
import { ActivatedRoute, Router } from "@angular/router";


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

    constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) { }

    setCategories(categories: Category[]) {
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

    getCategory(index: string) {

        var category = new Category('', '', '', false, '');
        for (var i = 0; i < this.categories.length; i++) {
            if (this.categories[i].id.toString().trim().localeCompare(index) === 0) {
                category = this.categories[i];
            }
        }

        return category;
    }

    addCategory(category: Category) {
        const categories = this.getCategories(); // sa put kao radi :d
        this.http.post('https://webshopangulardiplomski-default-rtdb.europe-west1.firebasedatabase.app/categories.json', /*categories*/category) // put overvriduje sve podatke koji su prije bili, dodajemo /recipes.json zbog firebase-a
            .subscribe(response => {
                console.log("RESPONSE: "+JSON.stringify(response));
                var tmpString = JSON.stringify(response).toString();
                var mySubString = tmpString.substring(
                    //tmpString.lastIndexOf('-') + 1,
                    tmpString.indexOf('-') + 1,
                    tmpString.lastIndexOf('"')
                );

                var fullID = "-" + mySubString
                category.id = fullID;
                this.updateCategoryID(category, fullID);
                this.categories.push(category);
                this.categoriesChanged.next(this.categories.slice());
                this.setCategories(this.categories);
                
                this.router.navigate(['categories']);
            });
                

    }

    updateCategoryID(category: Category, tmpID: string) {
        this.http.put('https://webshopangulardiplomski-default-rtdb.europe-west1.firebasedatabase.app/categories/' + tmpID + '/.json', /*categories*/category) // put overvriduje sve podatke koji su prije bili, dodajemo /recipes.json zbog firebase-a
            .subscribe(response => {
                // console.log(response);
            });
    }

    async loadCategories() {
        const response = await this.http.get<any>('https://webshopangulardiplomski-default-rtdb.europe-west1.firebasedatabase.app/categories.json').toPromise();
        for (var i in response) {
            if (response[i].active) {
                this.categories.push(response[i]);
            }
        }
        this.setCategories(this.categories);
    }

    updateCategory(category: Category) {
        this.http.put('https://webshopangulardiplomski-default-rtdb.europe-west1.firebasedatabase.app/categories/' + category.id + '/.json', /*categories*/category) // put overvriduje sve podatke koji su prije bili, dodajemo /recipes.json zbog firebase-a
            .subscribe(response => {
                // console.log(response);
                this.router.navigate(['categories']);
            });
    }

    deleteCategory(category: Category) {
        this.loadCategories();
        this.http.put('https://webshopangulardiplomski-default-rtdb.europe-west1.firebasedatabase.app/categories/' + category.id + '/.json', /*categories*/category) // put overvriduje sve podatke koji su prije bili, dodajemo /recipes.json zbog firebase-a
            .subscribe(response => {
                //console.log(response);

                for (var i = 0; i < this.categories.length; i++) {
                    if (this.categories[i].id === category.id) {
                        this.categories.splice(i, 1); // na poziciji index izbrisi 1 element :D
                        this.categoriesChanged.next(this.categories.slice());
                    }
                }
                this.categoriesChanged.next(this.categories.slice());
                this.setCategories(this.categories);
            });

        setTimeout(() => {
            this.router.navigate(['categories']);
        }, 500);
    }

}