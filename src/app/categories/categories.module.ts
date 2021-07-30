import { Injectable, NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { CategoriesRoutingModule } from "./categories-routing.module";
import { CategoriesComponent } from "./categories.component";
import { CategoryItemComponent } from "./category-item/category-item.component";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from "@angular/forms";
import { CategoryEditComponent } from "./category-edit/category-edit.component";
import { ArticlesComponent } from "src/articles/articles.component";
import { ArticleItemComponent } from "src/articles/article-item/article-item.component";
import { ArticleEditComponent } from "src/articles/article-edit/article-edit.component";
import { ArticleDetailComponent } from "src/articles/article-detail/article-detail.component";

@NgModule({
    declarations: [
        CategoriesComponent,
        CategoryItemComponent,
        CategoryEditComponent,
        ArticlesComponent, // nisam pravio poseban articles.module.ts jer mi se ucitava na istoj stranici :D
        ArticleItemComponent, // jer je ovaj roditelj od njega :D
        ArticleEditComponent,
        ArticleDetailComponent
    ],

    imports: [ RouterModule, SharedModule , ReactiveFormsModule, CategoriesRoutingModule, FontAwesomeModule ], // sve sto korismimo treba da importujemo, sem servisa koje je dovoljno importovati jednom u app
})

export class CategoriesModule {
    
}