import { Component, Input, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { Article } from "src/articles/articles.model";



@Component({
    selector: 'app-cart-item',
    templateUrl: './cart-item.component.html',
    styleUrls: ['./cart-item.component.css'],
  })
  export class CartItemComponent implements OnInit {
    
    @Input() article!: Article;
    subscription!: Subscription;
    
    ngOnInit(): void {
        //throw new Error("Method not implemented.");
    } 

  }