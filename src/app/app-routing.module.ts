import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { ArticleEditComponent } from "src/articles/article-edit/article-edit.component";
import { AuthGuard } from "./auth/auth-guard";
import { Cart } from "./cart/cart.component";
import { CategoriesComponent } from "./categories/categories.component";
import { CategoryEditComponent } from "./categories/category-edit/category-edit.component";
import { PageNotFound } from './pagenotfound/pagenotfound.component';

const appRoutes: Routes = [
    { path: '', redirectTo: '/categories', pathMatch: 'full' },
                        // ovo component: CategoriesComponent nije htjelo da radi bez component a valjda uspiejm napravit sa PreloadAllModules sa autentikacijom korisnika
    { path: 'categories', /*component: CategoriesComponent,*/ loadChildren: () => import('./categories/categories.module').then( m => m.CategoriesModule) },
    /*{ path: 'categories', loadChildren: './categories/categories.module#CategoriesModule'}*/
    { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
   // { path: 'newArticle', loadChildren: () => import('./categories/categories.module').then( m => m.CategoriesModule)},
   { path: 'newCategory', component: CategoryEditComponent, canActivate: [AuthGuard]},
   { path: 'newArticle', component: ArticleEditComponent, canActivate: [AuthGuard], },
   { path: 'cart', component: Cart },
   { path: '**', pathMatch: 'full', component: PageNotFound },
];

@NgModule({             // pretvara normalnu typescript klasu u Angular modul
    imports: [RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules }),],// drugi argument u forRoot() omogucava da konfigurisemo root router i da podesimo preloading strategy , sa ovim dobijamo brz inicijalni load  i bry naknadni load (ono sto se poslije inicijalno ucitava :D)  inicijalno ce ucitati auth a naknadno i recipes i shopping-list :D
    exports: [RouterModule] // exportovati u main, tj, u app module.ts :D, svaki modul radi sam za sebe i svaki treba da bude exportovan ! , moduli ne komuniciraju jedni sa drugima
    // ako neku komponentu definisemo u nekom modulu onda je ona dostupna samo u tom modulu ( npr RecipesCCategoriesModuleOmponent u app.module.ts je samo dostupna u app.module.ts :D )
    // kada importujemo modul u drugi modul tada importujemo i sve iz toga modula :D
    // podjele aplikacije u module utice na performanse nase aplikacije 
})

export class AppRoutingModule {

}