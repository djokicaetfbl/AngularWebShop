import { Component, OnInit } from "@angular/core";
import { CategoryService } from "src/app/categories/category.service";
import { ArticleService } from "../article.service";
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faInfo } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Router } from "@angular/router";
import { Article } from "../articles.model";


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

  article!: Article;
  articleId!: any;
  articleCategoryName!: any;

   articleName = '';
   file = '';
   describe = '';
   price = 0;
   categoryName = '';
   imageSrc = '';

   articleCounterState= 1;

  ngOnInit(): void {
  }

  constructor(private articleService: ArticleService, private route: ActivatedRoute, private router: Router) {
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
    }
    
  }

  initForm() {
    this.articleName = this.article.articleName;
    this.describe = this.article.describe;
    this.price = this.article.price;
    this.categoryName = this.article.categoryName;
    this.imageSrc = this.article.imageSrc;
  }


  plusArticleToCart(){
  this.articleCounterState = this.articleCounterState + 1;
  }

  minusArticleToCart() {
    if(this.articleCounterState > 1) {
      this.articleCounterState = this.articleCounterState - 1;
    }
  }


}
