import { Component, HostListener } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { AuthService } from "src/app/auth/auth.service";
import { ArticleService } from "./article.service";
import { Article } from "./articles.model";


@Component({
    selector: 'app-articles',
    templateUrl: './articles.component.html',
    styleUrls: ['./articles.component.css'],
    providers: [ArticleService], // posto i .ts pozivan u konstruktoru ovu klasu ovdje ga provide-ujem :D
})
export class ArticlesComponent {
    private userSub: Subscription = new Subscription; // ovo new Subscription sma dodao :D
    isAuthenticated = false;

    articles!: Article[];
    subscription!: Subscription;
    categoryName: any;
    searchValue = '';

    public innerWidth: any;
    isMobile = false;
    MOBILE_WIDTH = 500;
    isLoading = true;

    @HostListener('window:resize', ['$event']) //If you wanna keep it updated on resize:
    onResize(event) {
      this.innerWidth = window.screen.width; //= window.innerWidth;
    }
  
    ngOnInit() {
      this.innerWidth = window.innerWidth;     
      //document.getElementById("allToShow").remove();
      if(window.screen.width < this.MOBILE_WIDTH ) {
        document.getElementById("allToShow").style.visibility = 'hidden';
        document.getElementById("allToShow").style.display = 'none';
        //document.getElementById("allToShow").remove();
        this.isMobile = true;
      } else {
          this.isMobile = false;
      }
    }

    constructor(private articleService: ArticleService, private authService: AuthService, private router: Router, private route: ActivatedRoute) {

        this.router.routeReuseStrategy.shouldReuseRoute = function () { // INACE IDE OVA IMPLEMENTACIJA U OnInit
            return false;
        };
        this.router.onSameUrlNavigation = 'reload';

        route.params.subscribe(val => { //https://stackoverflow.com/questions/41678356/router-navigate-does-not-call-ngoninit-when-same-page     // KADA POZVIAM NAVIGATE NA ISTOJ STRANI PREMA ISTOJ STRANI
            if (!this.route.snapshot.paramMap.get('id')?.toString() !== null) {
                this.categoryName = this.route.snapshot.paramMap.get('categoryName')?.toString().trim();
                this.articleService.loadArticles(this.categoryName);
                
                //console.log("DJOKICAAA")
            }
            this.userSub = this.authService.user.subscribe(user => {
                this.isAuthenticated = !!user;// ili !user ? false : true; // ako nemamo objekat user , tada nismo autenitifikovani (tj user = null)
            });

            this.subscription = this.articleService.articlesChanged
                .subscribe(
                    (categories: Article[]) => {
                        this.articles = categories; // prati promjenu niza recepata, tj nasu listu recepata :D
                    }
                );
            this.articles = this.articleService.getArticles();
            this.isLoading = false;
        });
    }


    searchArticleInCategory() {
        console.log("SEARCH VALUE: "+this.searchValue);
        if (this.searchValue !== '') {
            this.isLoading = true;
            //this.articles = [];
            this.articleService.setArticles([]); // dodao
            this.articleService.loadArticles(this.categoryName); // dodao
            setTimeout(() => { // dodao
                var articlesTMP = [];

                for (var i = 0; i < this.articles.length; i++) {
                    if (this.articles[i].articleName.toString().trim().toLowerCase().startsWith(this.searchValue.toString().trim().toLowerCase())) {
                        console.log("DA: " + this.articles[i].articleName);
                        articlesTMP.push(this.articles[i]);
                    }
                }
                this.articles.length = 0;
                this.articles.push.apply(this.articles, articlesTMP);
                //this.articles.splice(0, articlesTMP.length, ... articlesTMP);
                //this.articles = articlesTMP;
                this.isLoading = false;
            }, 1000);   //dodao
        } else {
            this.articleService.setArticles([]);
            this.articleService.loadArticles(this.categoryName);
        }

    }
}

