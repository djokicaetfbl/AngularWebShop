import { Component, HostListener, Input, OnInit, Output } from '@angular/core';
import { Category } from '../category.model';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { CategoryService } from '../category.service';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-category-item',
  templateUrl: './category-item.component.html',
  styleUrls: ['./category-item.component.css'],
  providers: [CategoryService],
})

export class CategoryItemComponent implements OnInit {

  faPencilAlt = faPencilAlt;
  faTrash = faTrash;

  public innerWidth: any;

  isMobile = false;
  isMobileHrizontal = false;
  MOBILE_WIDTH = 500;
  MOBILE_WIDTH_HORIZONTAL_MIN = 700;
  MOBILE_WIDTH_HORIZONTAL_MAX = 920;

  @HostListener('window:resize', ['$event']) //If you wanna keep it updated on resize:
  onResize(event) {
    if (window.screen.width > this.MOBILE_WIDTH_HORIZONTAL_MIN && window.screen.width < this.MOBILE_WIDTH_HORIZONTAL_MAX) {
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

  constructor(private authService: AuthService, private categoryService: CategoryService, private route: ActivatedRoute, private router: Router) { }

  private userSub: Subscription = new Subscription;
  isAuthenticated = false;
  isAdmin = false;

  @Input() category!: Category; // ovo undefined sam ja dodao zar ce da radi dobro :D

  @Input() index!: number; // sada mogu index-u dodjeliti vrijednost 'form outside' i to cemo uraditi iz recipe-list.componentnt.html


  categories!: Category[];
  subscription!: Subscription;

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;

    if (window.screen.width > this.MOBILE_WIDTH_HORIZONTAL_MIN && window.screen.width < this.MOBILE_WIDTH_HORIZONTAL_MAX) {
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

    //console.log("TEST");
    this.userSub = this.authService.user.subscribe(user => {
      const userData: {
        email: string;
        id: string;
        _token: string; // _token ova _ (donja crtica) jer imamo get token() a njega pozivamo sa token :D
        _tokenExpirationDate: string;
        isAdmin?: string;

      } = JSON.parse(localStorage.getItem('userData') || '{}');

      // console.log("SANJKO LIJEPI: "+userData.email);
      this.isAuthenticated = !!user;// ili !user ? false : true; // ako nemamo objekat user , tada nismo autenitifikovani (tj user = null)
      if (userData.isAdmin !== undefined && userData.isAdmin.toString().toLowerCase().trim().localeCompare("true") === 0) {
        this.isAdmin = true;
      } else {
        this.isAdmin = false;
      }
    });

    this.subscription = this.categoryService.categoriesChanged
      .subscribe(
        (categories: Category[]) => {
          this.categories = categories; // prati promjenu niza recepata, tj nasu listu recepata :D
        }
      );

  }

  onDeleteCategory() {
    this.category.active = false;
    this.categoryService.deleteCategory(this.category);
  }

  onUpdateCategory() {
    this.router.navigate(['updateCategory', this.category.id], { relativeTo: this.route }); // ovo je relativna putanja , posto smo vec na categories/ pa sad treba da obavjestimo router o nasoj trenutnoj ruti (recipes/) to radimo
    // sa route: ActivatedRoute kroz relativeTo :D
    //https://stackoverflow.com/questions/44864303/send-data-through-routing-paths-in-angular
  }

  onShowArticlesForCategory() {
    this.router.navigate(['../categories', this.category.categoryName], { relativeTo: this.route });
  }

}