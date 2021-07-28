import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { AuthService } from "src/app/auth/auth.service";
import { ArticleService } from "./article.service";


@Component({
    selector: 'app-articles',
    templateUrl: './articles.component.html',
    styleUrls: ['./articles.component.css'],
    providers: [ArticleService], // posto i .ts pozivan u konstruktoru ovu klasu ovdje ga provide-ujem :D
})
export class ArticlesComponent {
    private userSub: Subscription = new Subscription; // ovo new Subscription sma dodao :D
    isAuthenticated = false;

    constructor(private categoryService: ArticleService, private authService: AuthService, private router: Router, private route: ActivatedRoute) {
        this.router.routeReuseStrategy.shouldReuseRoute = function () { // INACE IDE OVA IMPLEMENTACIJA U OnInit
            return false;
        };
        this.router.onSameUrlNavigation = 'reload';
        // this.categoryService.loadCategories();
        this.userSub = this.authService.user.subscribe(user => {
            this.isAuthenticated = !!user;// ili !user ? false : true; // ako nemamo objekat user , tada nismo autenitifikovani (tj user = null)
          });

    }

    


}

