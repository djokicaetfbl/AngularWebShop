import { Component } from "@angular/core";
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

    constructor(private articleService: ArticleService, private authService: AuthService, private router: Router, private route: ActivatedRoute) {


       /* if (!this.route.snapshot.paramMap.get('id')?.toString() !== null) {
            this.categoryName = this.route.snapshot.paramMap.get('categoryName')?.toString().trim();
            console.log("BRE: " + this.route.snapshot.paramMap.get('categoryName')?.toString().trim());
        }*/

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
        });
    }




}

