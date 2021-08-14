import { Component, OnDestroy, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable, Subscription } from "rxjs";
import { Article } from "src/articles/articles.model";
import * as fromApp from '../store/app.reducer';
import * as CartActions from './store/cart-actions';

@Component({
    selector: 'app-cart-edit',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.css'],
  })

  export class Cart implements OnInit, OnDestroy  {
    articles: Observable<{articles: Article[]}>;   // SA NGRX je Observable

    summaryPriceXQuantity = 0.0;

    private subscription: Subscription;

    constructor (private store: Store<fromApp.AppState>) {}

    ngOnInit(): void {
      this.articles = this.store.select('cart'); // BITNO ZA NGRX STORE ! 
      this.store.select('cart').subscribe();  

      let tmpArticles: Article[]; 
      this.articles.subscribe(x => tmpArticles = x.articles); // BITNO DRAGANA POMOGLA :D
      let tmpsummaryPriceXQuantity = 0.0;

      console.log("tmpA: "+tmpArticles.length);
      //tmpA.length
      for(var i = 0; i < tmpArticles.length; i++ ){
        tmpsummaryPriceXQuantity = tmpArticles[i].quantiy * tmpArticles[i].price;
        this.summaryPriceXQuantity = this.summaryPriceXQuantity + tmpsummaryPriceXQuantity
      }
    }

    get getSummaryPriceXQuantity() {
      //this.store.dispatch(new CartActions.);
      /*let tmpArticles: Article[]; 
      this.articles.subscribe(x => tmpArticles = x.articles); // BITNO DRAGANA POMOGLA :D
      let tmpsummaryPriceXQuantity = 0.0;

      console.log("tmpA: "+tmpArticles.length);
      //tmpA.length
      for(var i = 0; i < tmpArticles.length; i++ ){
        tmpsummaryPriceXQuantity = tmpArticles[i].quantiy * tmpArticles[i].price;
        this.summaryPriceXQuantity = this.summaryPriceXQuantity + tmpsummaryPriceXQuantity
      }*/
      return this.summaryPriceXQuantity;
    }


  ngOnDestroy(): void {
    //this.subscription.unsubscribe();              // NI OVO MI NE TREBA ZA NGRX
  }
  }