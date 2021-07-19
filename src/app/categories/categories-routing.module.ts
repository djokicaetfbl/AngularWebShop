import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../auth/auth-guard";
//import { CategoriesResolverService } from "./categories-resolver.service";
import { CategoriesComponent } from "./categories.component";

const routes: Routes = [
    {
        path: '', component: CategoriesComponent, /*canActivate: [AuthGuard],*/ // i pomocu ovoga canActivate ne mozemo direkt da pristupimo preko url /recipes
        // moram da imam praznu putanju radi lazy loading-a , a ukljucili smo u app-routing.module.ts putanju /recipes
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)], // forRoot ide samo jednom i to u app.module.ts
    exports: [RouterModule]
})

export class CategoriesRoutingModule {

}