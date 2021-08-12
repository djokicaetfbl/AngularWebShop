import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
//import { DataStorageService } from '../shared/data-storage.service';
import { faCoffee, faPlus, faKey ,faShoppingCart } from '@fortawesome/free-solid-svg-icons';
//import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
//import { faKey} from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';

import * as fromApp from '../store/app.reducer';

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


  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute, private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;// ili !user ? false : true; // ako nemamo objekat user , tada nismo autenitifikovani (tj user = null)
    });
  }

  /*onNewCategory() {*/
    //console.log("THIS ROUTE (djole) : "+this.route);
    //this.router.navigate(['categories/new'] /*, {relativeTo: this.route}*/); // ovo je relativna putanja , posto smo vec na categories/ pa sad treba da obavjestimo router o nasoj trenutnoj ruti (recipes/) to radimo
      // sa route: ActivatedRoute kroz relativeTo :D
  /*    this.router.navigate(['newCategory'] /*, {relativeTo: this.route}*/ /*);
  }*/

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  goToCart(){
    this.router.navigate(['cart']); 
  }

//  onNewArticle() {
    //newArticle
 //   this.router.navigate(['newArticle'] /*, {relativeTo: this.route}*/);
//}

}
