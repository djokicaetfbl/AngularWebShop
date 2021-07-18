import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
//import { CoreModule } from './core.module';
//import { AuthComponent } from './auth/auth.component';
//import { CategoriesComponent } from './categories/categories.component';

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
    //CoreModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
