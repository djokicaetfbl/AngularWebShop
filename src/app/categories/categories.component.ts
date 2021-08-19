import { Component, HostListener, Input, NgModule, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Category } from './category.model';
import { CategoryService } from './category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
  providers: [CategoryService], // posto i .ts pozivan u konstruktoru ovu klasu ovdje ga provide-ujem :D
})
export class CategoriesComponent implements OnInit { // nisam koristio ngOnInit radi navigacije na istu stranicu

  faPlus = faPlus;
  private userSub: Subscription = new Subscription; // ovo new Subscription sma dodao :D
  isAuthenticated = false;
  isAdmin = false;
  isMobile = false;
  isMobileHrizontal = false;
  MOBILE_WIDTH = 500;
  MOBILE_WIDTH_HORIZONTAL_MIN = 700;
  MOBILE_WIDTH_HORIZONTAL_MAX = 920;
  isLoading = true;

  //@Input() category!: Category;
  categories!: Category[];
  subscription!: Subscription;

  public innerWidth: any;

  @HostListener('window:resize', ['$event']) //If you wanna keep it updated on resize:
  onResize(event) {
    //this.innerWidth = window.innerWidth;
    if (window.screen.width > this.MOBILE_WIDTH_HORIZONTAL_MIN && window.screen.width < this.MOBILE_WIDTH_HORIZONTAL_MAX) {
      console.log("DADADA!!!");
      this.isMobileHrizontal = true;
    }
    if (window.screen.width < this.MOBILE_WIDTH) {
      this.isMobile = true;
    } else {
      this.isMobile = false;
    }

    if (window.screen.width > this.MOBILE_WIDTH_HORIZONTAL_MAX) {
      this.isMobile = false;
      this.isMobileHrizontal = false;
    }
  }

  ngOnInit() {
    //this.innerWidth = window.innerWidth;
    //console.log("DJOLE: "+this.innerWidth);
    if (window.screen.width < this.MOBILE_WIDTH) {
      this.isMobile = true;
    } else {
      this.isMobile = false;
    }

    if (window.screen.width > this.MOBILE_WIDTH_HORIZONTAL_MIN && window.screen.width < this.MOBILE_WIDTH_HORIZONTAL_MAX) {
      console.log("DADADA!!!");
      this.isMobileHrizontal = true;
    }
  }


  constructor(private categoryService: CategoryService, private authService: AuthService, private router: Router, private route: ActivatedRoute) {
    this.isLoading = true;

    this.userSub = this.authService.user.subscribe(user => {
      const userData: {
        email: string;
        id: string;
        _token: string; // _token ova _ (donja crtica) jer imamo get token() a njega pozivamo sa token :D
        _tokenExpirationDate: string;
        isAdmin?: string;

      } = JSON.parse(localStorage.getItem('userData') || '{}');

      this.isAuthenticated = !!user;// ili !user ? false : true; // ako nemamo objekat user , tada nismo autenitifikovani (tj user = null)
      if (userData.isAdmin !== undefined && userData.isAdmin.toString().toLowerCase().trim().localeCompare("true") === 0) {
        this.isAdmin = true;
      } else {
        this.isAdmin = false;
      }
    });


    this.router.routeReuseStrategy.shouldReuseRoute = function () { // INACE IDE OVA IMPLEMENTACIJA U OnInit
      return false;
    };
    this.router.onSameUrlNavigation = 'reload'; //https://stackoverflow.com/questions/41678356/router-navigate-does-not-call-ngoninit-when-same-page
    route.params.subscribe(val => { //https://stackoverflow.com/questions/41678356/router-navigate-does-not-call-ngoninit-when-same-page     // KADA POZVIAM NAVIGATE NA ISTOJ STRANI PREMA ISTOJ STRANI
      this.categoryService.loadCategories();
      this.userSub = this.authService.user.subscribe(user => {
        this.isAuthenticated = !!user;// ili !user ? false : true; // ako nemamo objekat user , tada nismo autenitifikovani (tj user = null)
      });

      this.subscription = this.categoryService.categoriesChanged
        .subscribe(
          (categories: Category[]) => {
            this.categories = categories; // prati promjenu niza recepata, tj nasu listu recepata :D
          }
        );
      this.categories = this.categoryService.getCategories();
      this.isLoading = false;
    });

  }

  onNewCategory() {
    //console.log("THIS ROUTE111 (djole) : "+this.route);
    /*this.router.navigate(['new'] , {relativeTo: this.route});*/ // ovo je relativna putanja , posto smo vec na categories/ pa sad treba da obavjestimo router o nasoj trenutnoj ruti (recipes/) to radimo
    // sa route: ActivatedRoute kroz relativeTo :D
    this.router.navigate(['newCategory'] /*, {relativeTo: this.route}*/);
  }

  onNewArticle() {
    //newArticle
    this.router.navigate(['newArticle'] /*, {relativeTo: this.route}*/);
  }

}
