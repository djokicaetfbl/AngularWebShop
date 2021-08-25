import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { faCoffee, faPlus, faKey ,faShoppingCart,  } from '@fortawesome/free-solid-svg-icons';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';

import * as fromApp from '../store/app.reducer';
import { Article } from 'src/articles/articles.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy  {

  faCoffee = faCoffee;
  faShoppingCart = faShoppingCart;
  faKey = faKey;
  faPlus = faPlus;

  private userSub: Subscription = new Subscription; // ovo new Subscription sma dodao :D
  isAuthenticated = false;

  articles: Observable<{ articles: Article[] }>;
  cartLength = 0;


  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute, private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;// ili !user ? false : true; // ako nemamo objekat user , tada nismo autenitifikovani (tj user = null)
    });
  }

  get getCartLength() {
    this.articles = this.store.select('cart'); // BITNO ZA NGRX STORE ! 
    this.store.select('cart').subscribe();
    let tmpArticles: Article[];
    this.articles.subscribe(x => tmpArticles = x.articles); 

    //console.log("ARTIKLES CART LENGTH: "+tmpArticles.length);

    this.cartLength = tmpArticles.length;
    return this.cartLength;
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  goToCart(){
    this.router.navigate(['cart']); 
  }

}
