import { Component, HostListener, Input, OnInit } from "@angular/core";
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

  isMobileVeryLittle = false;
  //MOBILE_WIDTH = 500;
  MOBILE_WIDTH = 375; // DJUKA

  @HostListener('window:resize', ['$event']) //If you wanna keep it updated on resize:
  onResize(event) {
    //this.innerWidth = window.innerWidth;

    if (window.screen.width < this.MOBILE_WIDTH) {
      this.isMobileVeryLittle = true;
    } else {
      this.isMobileVeryLittle = false;
    }
  }

  ngOnInit(): void {
    //throw new Error("Method not implemented.");
    if (window.screen.width < this.MOBILE_WIDTH) {
      this.isMobileVeryLittle = true;
    } else {
      this.isMobileVeryLittle = false;
    }
  }

}