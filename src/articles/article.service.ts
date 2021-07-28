import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subject } from "rxjs";
import { Article } from "./articles.model";


@Injectable()
export class ArticleService { 
    articlesChanged = new Subject<Article[]>();
    
    private articles: Article[] = []; // pazi da inicijalizujes ovdje u nizu :D

    constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) { }

    

}