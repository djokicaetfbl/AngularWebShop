// koristimo ga eto radi da kazemo da moze da postoji, al svakkao je preporuka da se servise unutar kreiranja fajla (samog sebe) obezbjedi sa @Injectable providedIn('root')

import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { AuthInterceptorService } from "./auth/auth-interceptor.service";
//import { RecipeService } from "./recipes/recipe.service";
//import { ShoppingListService } from "./shopping-list/shoping-list.service";

@NgModule({
    providers: [
        //ShoppingListService, RecipeService, // ovdje definisemo sve servise koje zelimo da pruzamo :D, servise mozemo da ukljucimo unutar klase sa @Injectable({ providedIn: 'root' })
    {
      provide:  HTTP_INTERCEPTORS, // svakako je preporuka da se koristi providedIn za servise a ne da ga ovako u app module.ts  definisemo 
      useClass: AuthInterceptorService,
      multi: true
    },
    ]
})
export class CoreModule {

}