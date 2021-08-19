import { Component, HostListener, OnInit } from "@angular/core";
import { CategoryService } from "src/app/categories/category.service";
import { ArticleService } from "../article.service";
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faInfo } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Router } from "@angular/router";
import { Article } from "../articles.model";

import { Store } from "@ngrx/store";
import * as fromApp from '../../app/store/app.reducer';
import { Observable, Subscription } from "rxjs";
import * as CartActions from '../../app/cart/store/cart-actions';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.css'],
  providers: [ArticleService, CategoryService], //da obezbjedim Category Service OBAVEZNO
})
export class ArticleDetailComponent implements OnInit {

  faPencilAlt = faPencilAlt;
  faTrash = faTrash;
  faInfo = faInfo;
  faPlus = faPlus;

  subscription: Subscription;

  article!: Article;
  articleId!: any;
  articleCategoryName!: any;

  articleName = '';
  file = '';
  describe = '';
  price = 0;
  categoryName = '';
  imageSrc = '';

  articleCounterState = 1;

  cart = Array<Article>();

  articles: Observable<{ articles: Article[] }>;   // SA NGRX je Observable

  editedArticle: Article;

  closeResult: string = '';

  isLoading = true;

  isMobile = false;
  isMobileHrizontal = false;
  MOBILE_WIDTH = 500;
  MOBILE_WIDTH_HORIZONTAL_MIN = 700;
  MOBILE_WIDTH_HORIZONTAL_MAX = 920;
  /*
  @ViewChild(PlaceHolderDirective) alertHost; // pronaci ce prvi PlaceHolderDirective element koji koristimo :D
*/
  @HostListener('window:resize', ['$event']) //If you wanna keep it updated on resize:
  onResize(event) {
    //this.innerWidth = window.innerWidth;
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

  constructor(private articleService: ArticleService, private route: ActivatedRoute, private router: Router, private store: Store<fromApp.AppState>, private modalService: NgbModal) {
    this.isLoading = true;
    if (this.route.snapshot.paramMap.get('id')?.toString() !== null && this.route.snapshot.paramMap.get('categoryName')?.toString() !== null) {
      this.articleId = this.route.snapshot.paramMap.get('id')?.toString().trim();
      this.articleCategoryName = this.route.snapshot.paramMap.get('categoryName')?.toString().trim();
      this.articleService.loadArticles(this.articleCategoryName);
      setTimeout(() => {
        this.article = this.articleService.getArticle(this.articleId);
        this.initForm();
        this.isLoading = false;
      }, 2000);
      this.subscription = this.store.select('cart').subscribe();
    }

  }

  ngOnInit(): void {
    this.articles = this.store.select('cart'); // BITNO ZA NGRX STORE ! 
    this.store.select('cart').subscribe();

    if (window.screen.width < this.MOBILE_WIDTH) {
      this.isMobile = true;
    } else {
      this.isMobile = false;
    }
  }

  initForm() {
    this.articleName = this.article.articleName;
    this.describe = this.article.describe;
    this.price = this.article.price;
    this.categoryName = this.article.categoryName;
    this.imageSrc = this.article.imageSrc;
  }

  open(content: any) {
    let tmpArticles: Article[];
    this.articles.subscribe(x => tmpArticles = x.articles);

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }


  plusArticleToCart() {
    this.articleCounterState = this.articleCounterState + 1;
  }

  minusArticleToCart() {
    if (this.articleCounterState > 1) {
      this.articleCounterState = this.articleCounterState - 1;
    }
  }

  notificationAboutShooping(name: string) {
    if (confirm("Uspjesno ste dodali artikal " + this.article.articleName + " u korpu.")) {
    }
  }

  addArticleToCart() { // probaj sa localeStrorage ako ne pamti ovako stanje :D

    let tmpArticles: Article[];
    this.articles.subscribe(x => tmpArticles = x.articles); // BITNO DRAGANA POMOGLA :D

    var newArticle = new Article(this.articleId, this.categoryName, this.articleName, this.imageSrc, true, this.file, this.describe, this.price, this.articleCounterState);
    var findUpdate = false;
    var i = 0
    if (tmpArticles.length === 0) {
      // inicijalni slucaj:
      this.store.dispatch(new CartActions.AddArticle(newArticle));
    }
    else {
      for (; i < tmpArticles.length; i++) {
        if (tmpArticles[i].id.toString().trim().localeCompare(newArticle.id.toString().trim()) === 0) {
          findUpdate = true;
          this.store.dispatch(new CartActions.StartEdit(i));

          var summaryQuantity = tmpArticles[i].quantiy + this.articleCounterState;
          var newArticle2 = new Article(this.articleId, this.categoryName, this.articleName, this.imageSrc, true, this.file, this.describe, this.price, summaryQuantity);
          this.store.dispatch(new CartActions.UpdateArticle(newArticle2));
        }
      }
    }

    if (!findUpdate && i === tmpArticles.length) {
      this.store.dispatch(new CartActions.AddArticle(newArticle));
    }
    this.articleCounterState = 1;
  }
}
