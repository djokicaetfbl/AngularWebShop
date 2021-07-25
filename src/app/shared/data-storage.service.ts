import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, tap, take, exhaustMap } from "rxjs/operators";
import { AuthService } from "../auth/auth.service";
import { Category } from "../categories/category.model";
import { CategoryService } from "../categories/category.service";


/*
We will be using HttpParams to add the URL Parameter, which is then used by the GET , POST , PUT & PATCH etc methods to send an HTTP request to the back end API
 */


/*

providedIn: 'root' When you provide the service at the root level, Angular creates a single, shared instance of  // objezbjedj. servisa na root levelu
service and injects it into any class that asks for it 
*/
@Injectable({providedIn: 'root'}) // navedemo ovdje da ne moramo u app.module.ts u providers[] 
export class DataStorageService {

    constructor(private http: HttpClient, private categoryService: CategoryService, private authService: AuthService) {}

    storeCategories() { //updateuj bazu :D :D
        const categories = this.categoryService.getCategories();
        this.http.put('https://webshopangulardiplomski-default-rtdb.europe-west1.firebasedatabase.app/categories.json', categories) // put overvriduje sve podatke koji su prije bili, dodajemo /recipes.json zbog firebase-a
        .subscribe(response => {
            console.log(response);
        }); 
        // ovde ne koristim return , jer mi ne treba loading ili tako nesto, vec samo da sacuvam podatke ;D
    }

    /*Pipe: Used to stitch together functional operators into a chain. Before we could just do observable.filter().map().scan(), but since every RxJS operator is a standalone function rather than an Observable's method, we need pipe() to make a chain of those operators (see example above).

    Tap: Can perform side effects with observed data but does not modify the stream in any way. Formerly called do(). You can think of it as if observable was an array over time, then tap() would be an equivalent to Array.forEach(). 
    */

    /*
    ZA MAP, (isto kao i standardni map, (f-ja koja mapira npr (1,2,3)->(x*2)) samo sto je ovdje rijec o observable ;D)    https://stackoverflow.com/questions/53759687/angular-map-what-is-it 
    */
}