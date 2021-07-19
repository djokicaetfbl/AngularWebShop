import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { CategoriesRoutingModule } from "./categories-routing.module";
import { CategoriesComponent } from "./categories.component";

@NgModule({
    declarations: [
        CategoriesComponent,

    ],

    imports: [ RouterModule, SharedModule , /*ReactiveFormsModule, */CategoriesRoutingModule ], // sve sto korismimo treba da importujemo, sem servisa koje je dovoljno importovati jednom u app
})

export class CategoriesModule {
    
}