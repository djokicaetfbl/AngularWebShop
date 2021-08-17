import { Component, OnDestroy, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable, Subscription } from "rxjs";
import { Article } from "src/articles/articles.model";
import * as fromApp from '../store/app.reducer';
import * as CartActions from './store/cart-actions';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-cart-edit',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})

export class Cart implements OnInit, OnDestroy {
  articles: Observable<{ articles: Article[] }>;   // SA NGRX je Observable

  summaryPriceXQuantity = 0.0;

  private subscription: Subscription;

  
  closeResult: string = '';

  constructor(private store: Store<fromApp.AppState>, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.articles = this.store.select('cart'); // BITNO ZA NGRX STORE ! 
    this.store.select('cart').subscribe();
    /* suma za placanje */
    let tmpArticles: Article[];
    this.articles.subscribe(x => tmpArticles = x.articles); // BITNO DRAGANA POMOGLA :D
    let tmpsummaryPriceXQuantity = 0.0;

    for (var i = 0; i < tmpArticles.length; i++) {
      tmpsummaryPriceXQuantity = tmpArticles[i].quantiy * tmpArticles[i].price;
      this.summaryPriceXQuantity = this.summaryPriceXQuantity + tmpsummaryPriceXQuantity
    }
    /* */
  }

  open(content:any) {
    let tmpArticles: Article[];
    this.articles.subscribe(x => tmpArticles = x.articles); 

    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      this.store.dispatch(new CartActions.DeleteAllArticlesFromCart());
      this.summaryPriceXQuantity = 0.0;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      this.store.dispatch(new CartActions.DeleteAllArticlesFromCart());
      this.summaryPriceXQuantity = 0.0;
    });
  }
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  get getSummaryPriceXQuantity() {
    return this.summaryPriceXQuantity;
  }

  ngOnDestroy(): void {
    //this.subscription.unsubscribe();              // NI OVO MI NE TREBA ZA NGRX
  }

  deleteArticleFromCart(index: number) {
    console.log("Pozvao :D");
    this.store.dispatch(new CartActions.StartEdit(index));
    this.store.dispatch(new CartActions.DeleteArticleFromCart());
    this.summaryPriceXQuantity = 0.0;
    this.ngOnInit();
  }
  
}