import { Component, OnDestroy, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable, Subscription } from "rxjs";
import { Article } from "src/articles/articles.model";
import * as fromApp from '../store/app.reducer';
import * as cartActions from './store/cart-actions';

@Component({
    selector: 'app-cart-edit',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.css'],
  })

  export class Cart implements OnInit, OnDestroy  {
    articles: Observable<{articles: Article[]}>;   // SA NGRX je Observable

    private subscription: Subscription;

    constructor (private store: Store<fromApp.AppState>) {}

    ngOnInit(): void {
      this.articles = this.store.select('cart'); // BITNO ZA NGRX STORE ! 
      this.store.select('cart').subscribe();  
    }


  ngOnDestroy(): void {
    //this.subscription.unsubscribe();              // NI OVO MI NE TREBA ZA NGRX
  }
  }