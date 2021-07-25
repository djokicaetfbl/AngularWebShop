import { Component, NgModule, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Category } from './category.model';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {

  faPlus = faPlus;
  private userSub: Subscription = new Subscription; // ovo new Subscription sma dodao :D
  isAuthenticated = false;

  categories!: Category[];
  subscription!: Subscription;


  constructor(/*private dataStorageService: DataStorageService, kada dodam dataStorageService */ private authService: AuthService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;// ili !user ? false : true; // ako nemamo objekat user , tada nismo autenitifikovani (tj user = null)
    });
  }

  onNewCategory() {
    //console.log("THIS ROUTE111 (djole) : "+this.route);
    this.router.navigate(['new'] , {relativeTo: this.route}); // ovo je relativna putanja , posto smo vec na categories/ pa sad treba da obavjestimo router o nasoj trenutnoj ruti (recipes/) to radimo
      // sa route: ActivatedRoute kroz relativeTo :D
  }

}
