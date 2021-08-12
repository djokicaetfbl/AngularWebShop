import { Component, OnInit } from "@angular/core";
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


  constructor(private articleService: ArticleService, private route: ActivatedRoute, private router: Router, private store: Store<fromApp.AppState>) {
    if (this.route.snapshot.paramMap.get('id')?.toString() !== null && this.route.snapshot.paramMap.get('categoryName')?.toString() !== null) {
      //console.log("BLA: " + this.route.snapshot.paramMap.get('id')?.toString());
      //console.log("BLA1: " + this.route.snapshot.paramMap.get('categoryName')?.toString());
      this.articleId = this.route.snapshot.paramMap.get('id')?.toString().trim();
      this.articleCategoryName = this.route.snapshot.paramMap.get('categoryName')?.toString().trim();
      this.articleService.loadArticles(this.articleCategoryName);
      setTimeout(() => {
        this.article = this.articleService.getArticle(this.articleId);
        this.initForm();
      }, 1000);
      this.subscription = this.store.select('cart').subscribe();
    }

  }

  ngOnInit(): void {
    this.articles = this.store.select('cart'); // BITNO ZA NGRX STORE ! 
    this.store.select('cart').subscribe();
  }

  initForm() {
    this.articleName = this.article.articleName;
    this.describe = this.article.describe;
    this.price = this.article.price;
    this.categoryName = this.article.categoryName;
    this.imageSrc = this.article.imageSrc;
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
    var newArticle = new Article(this.articleId, this.categoryName, this.articleName, this.imageSrc, true, this.file, this.describe, this.price, this.articleCounterState);
    this.store.dispatch(new CartActions.AddArticle(newArticle));
    /*
    this.cart = this.cartService.getCart();
    var tmpArticle = new Article(this.articleId,this.categoryName, this.articleName, this.imageSrc, true, this.file, this.describe, this.price, this.articleCounterState);
    this.cart.push(tmpArticle);
    for(let i = 0; i < this.cart.length; i++) {
      console.log("JSON djole: "+JSON.stringify(this.cart[i].articleName));
    }
    this.cartService.setCart(this.cart);*/
  }


}
