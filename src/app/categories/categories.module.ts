import { Injectable, NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { CategoriesRoutingModule } from "./categories-routing.module";
import { CategoriesComponent } from "./categories.component";
import { CategoryItemComponent } from "./category-item/category-item.component";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from "@angular/forms";
import { CategoryEditComponent } from "./category-edit/category-edit.component";

@NgModule({
    declarations: [
        CategoriesComponent,
        CategoryItemComponent,
        CategoryEditComponent
    ],

    imports: [ RouterModule, SharedModule , ReactiveFormsModule, CategoriesRoutingModule, FontAwesomeModule ], // sve sto korismimo treba da importujemo, sem servisa koje je dovoljno importovati jednom u app
})

export class CategoriesModule {
    
}