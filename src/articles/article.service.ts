import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subject } from "rxjs";
import { Article } from "./articles.model";


@Injectable()
export class ArticleService { 
    articlesChanged = new Subject<Article[]>();
    
    private articles: Article[] = []; // pazi da inicijalizujes ovdje u nizu :D

    categoryName: any;

    constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) { 

        if (!this.route.snapshot.paramMap.get('categoryName')?.toString() !== null) {
            this.categoryName = this.route.snapshot.paramMap.get('categoryName')?.toString().trim();
            //this.articleService.loadArticles(this.categoryName);
        }
    }

    setArticles(articles: Article[]) {
        this.articles = articles;
        this.articlesChanged.next(this.articles.slice());
    }

    getArticles() {
        return this.articles.slice();
    }

     getArticle(index: string/*, categoryName: any*/) {

            console.log("TMP ID: "+index);
            //console.log("CAT NAME: "+categoryName);
            console.log("LENNNNGTH: "+this.articles.length);
            var article = new Article('', '', '', '', false, '', '', 0);
            for(var i = 0; i < this.articles.length; i++)
            {
               if(this.articles[i].id.toString().trim().localeCompare(index) === 0){
                    article = this.articles[i];
                }
            }

            return article;     
    }

    addArticle(article: Article) {
        const categories = this.getArticles(); // sa put kao radi :d
        this.http.post('https://webshopangulardiplomski-default-rtdb.europe-west1.firebasedatabase.app/articles.json', article) // put overvriduje sve podatke koji su prije bili, dodajemo /recipes.json zbog firebase-a
            .subscribe(response => {
                var tmpString = JSON.stringify(response).toString();
                var mySubString = tmpString.substring(
                    tmpString.lastIndexOf('-') + 1,
                    tmpString.lastIndexOf('"')
                );

                var fullID = "-" + mySubString
                article.id = fullID;
                this.updateArticleID(article, fullID);
                this.articles.push(article);
                this.articlesChanged.next(this.articles.slice());
                this.setArticles(this.articles);

            });
    }

    updateArticleID(article: Article, tmpID: string) {
        this.http.put('https://webshopangulardiplomski-default-rtdb.europe-west1.firebasedatabase.app/articles/' + tmpID + '/.json', article) // put overvriduje sve podatke koji su prije bili, dodajemo /recipes.json zbog firebase-a
            .subscribe(response => {
            });
    }

    async loadArticles(categoryName: any) {
        console.log("STIGAO: "+categoryName);
            const response = await this.http.get<any>('https://webshopangulardiplomski-default-rtdb.europe-west1.firebasedatabase.app/articles.json').toPromise();
            for (var i in response) {
                if (response[i].active && response[i].categoryName.toString().trim().localeCompare(categoryName.toString().trim()) === 0) {
                    this.articles.push(response[i]);
                }
            }
            this.setArticles(this.articles); 
    }

    updateArticle(article: Article) { 
        this.http.put('https://webshopangulardiplomski-default-rtdb.europe-west1.firebasedatabase.app/articles/' + article.id + '/.json', article) // put overvriduje sve podatke koji su prije bili, dodajemo /recipes.json zbog firebase-a
        .subscribe(response => {
         });
         setTimeout(() => {
            this.router.navigate(['categories']);
        }, 500);
    }

    deleteArticle(article: Article) {
        this.loadArticles(this.categoryName);
        this.http.put('https://webshopangulardiplomski-default-rtdb.europe-west1.firebasedatabase.app/articles/' + article.id + '/.json', article) // put overvriduje sve podatke koji su prije bili, dodajemo /recipes.json zbog firebase-a
            .subscribe(response => {
                for (var i = 0; i < this.articles.length; i++) {
                    if (this.articles[i].id === article.id) {
                        this.articles.splice(i, 1); // na poziciji index izbrisi 1 element :D
                        this.articlesChanged.next(this.articles.slice());
                    }
                }
                this.articlesChanged.next(this.articles.slice());
                this.setArticles(this.articles);
            });

        setTimeout(() => {
            this.router.navigate(['categories']);
        }, 500);
    }

}