import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';
import { HeaderComponent } from './header/header.component';
//import { CoreModule } from './core.module';
//import { AuthComponent } from './auth/auth.component';
//import { CategoriesComponent } from './categories/categories.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
//import { ArticleEditComponent } from 'src/articles/article-edit/article-edit.component';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';

import * as fromApp from './store/app.reducer';
//import { CartItemComponent } from './cart/cart-item/cart-item.component';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    //CategoriesComponent ovo po automatizmu sa ng g c kreira ovu komponentu
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, // communicating with backend services using HTTP,
    SharedModule,
    CoreModule,
    FontAwesomeModule,
    FormsModule,
    StoreModule.forRoot(
      fromApp.appReducer
    ),
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
