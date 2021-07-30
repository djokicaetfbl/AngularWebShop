import { Component, OnInit } from "@angular/core";
import { CategoryService } from "src/app/categories/category.service";
import { ArticleService } from "../article.service";
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faInfo } from '@fortawesome/free-solid-svg-icons';

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
    
    ngOnInit(): void {
        
    }
      
  }
