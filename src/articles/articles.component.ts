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
    //articlesTMP = [];

    public innerWidth: any;
    isMobile = false;
    isLoading = true;
    isMobileHrizontal = false;
    isLittleMob = false;

    //MOBILE_WIDTH = 500;
    MOBILE_WIDTH = 708; // DJUKA
    //MOBILE_WIDTH_HORIZONTAL_MIN = 700;
    MOBILE_WIDTH_HORIZONTAL_MIN = 706; // DJUKA
    //MOBILE_WIDTH_HORIZONTAL_MAX = 920;
    MOBILE_WIDTH_HORIZONTAL_MAX = 1450; // DJUKA
    LITTLE_MOB = 450;

    @HostListener('window:resize', ['$event']) //If you wanna keep it updated on resize:
    onResize(event) {
        this.innerWidth = window.screen.width; //= window.innerWidth;

        if (window.screen.width < this.MOBILE_WIDTH) {
            document.getElementById("allToShow").style.visibility = 'hidden';
            document.getElementById("allToShow").style.display = 'none';
            //document.getElementById("allToShow").remove();
            this.isMobile = true;
        } else {
            this.isMobile = false;
        }

        if (window.screen.width > this.MOBILE_WIDTH_HORIZONTAL_MIN && window.screen.width < this.MOBILE_WIDTH_HORIZONTAL_MAX) {
            this.isMobileHrizontal = true;
        }
        if (window.screen.width > this.MOBILE_WIDTH_HORIZONTAL_MAX) {
            this.isMobileHrizontal = false;
            this.isMobile = false;
        }

        if (window.screen.width < this.LITTLE_MOB) {
            this.isLittleMob = true;
        } else {
            this.isLittleMob = false;

        }
    }

    ngOnInit() {

        console.log("JEBEMU: " + window.screen.width);

        this.innerWidth = window.innerWidth;
        //document.getElementById("allToShow").remove();
        if (window.screen.width < this.MOBILE_WIDTH) {
            document.getElementById("allToShow").style.visibility = 'hidden';
            document.getElementById("allToShow").style.display = 'none';
            //document.getElementById("allToShow").remove();
            this.isMobile = true;
        } else {
            this.isMobile = false;
        }

        if (window.screen.width > this.MOBILE_WIDTH_HORIZONTAL_MIN && window.screen.width < this.MOBILE_WIDTH_HORIZONTAL_MAX) {
            this.isMobileHrizontal = true;
        }
        if (window.screen.width > this.MOBILE_WIDTH_HORIZONTAL_MAX) {
            this.isMobileHrizontal = false;
            this.isMobile = false;
        }
        if (window.screen.width < this.LITTLE_MOB) {
            this.isLittleMob = true;
        } else {
            this.isLittleMob = false;
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

    searchArticleInCategory(searchValue) {
        this.isLoading = true;
        let articlesTMP = [];
        console.log("SEARCH VALUE: " + searchValue);

        this.articleService.setArticles([]);
        this.articleService.loadArticles(this.categoryName).then(respone => {
            console.log("RESPONSE: " + this.articles);

            for (let i = 0; i < this.articles.length; i++) {
                if (this.articles[i].articleName.toString().toLowerCase().startsWith(searchValue.toString().toLowerCase())) {
                    console.log("DA");
                    articlesTMP.push(this.articles[i]);
                }
            }
            this.articles = [];
            this.articles.push.apply(this.articles, articlesTMP);
            this.isLoading = false;
        });
    }
}

