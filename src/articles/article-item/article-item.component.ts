import { Component, Input, OnInit } from "@angular/core";
import { ArticleService } from "../article.service";
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from "src/app/auth/auth.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { Article } from "../articles.model";

@Component({
    selector: 'app-article-item',
    templateUrl: './article-item.component.html',
    styleUrls: ['./article-item.component.css'],
    providers: [ArticleService],
  })
  export class ArticleItemComponent implements OnInit {
    
    faPencilAlt = faPencilAlt;
    faTrash = faTrash;

    constructor(private authService: AuthService, private articleService: ArticleService, private route: ActivatedRoute, private router: Router) {}

    private userSub: Subscription = new Subscription;
    isAuthenticated = false;

    @Input() article!: Article; // ovo undefined sam ja dodao zar ce da radi dobro :D
  
    @Input() index!: number ; // sada mogu index-u dodjeliti vrijednost 'form outside' i to cemo uraditi iz recipe-list.componentnt.html


    articles!: Article[];
    subscription!: Subscription;
    
    ngOnInit(): void {
        this.userSub = this.authService.user.subscribe(user => {
            this.isAuthenticated = !!user;// ili !user ? false : true; // ako nemamo objekat user , tada nismo autenitifikovani (tj user = null)
          });
        
          this.subscription = this.articleService.articlesChanged
          .subscribe(
            (articles: Article[]) => {
             /* for(var i = 0; i < categories.length; i++){
                console.log("------------");
                console.log(categories[i].categoryName);
                console.log("------------");
            }*/
                this.articles = articles; // prati promjenu niza recepata, tj nasu listu recepata :D
            }
          );
    }
    
    onDeleteArticle() {
      /*console.log("Category: "+JSON.stringify(this.category.id));*/
      this.article.active = false;
      this.articleService.deleteArticle(this.article);
    }

    onUpdateArticle() {
      //console.log("THIS ROUTE111 (djole) : "+this.route);
      this.router.navigate(['../updateArticle/'+this.article.categoryName, this.article.id] , {relativeTo: this.route}); // ovo je relativna putanja , posto smo vec na categories/ pa sad treba da obavjestimo router o nasoj trenutnoj ruti (recipes/) to radimo
        
      // sa route: ActivatedRoute kroz relativeTo :D
     
        //https://stackoverflow.com/questions/44864303/send-data-through-routing-paths-in-angular
    }

  }