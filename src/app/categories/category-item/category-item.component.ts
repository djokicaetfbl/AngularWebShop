import { Component, Input, OnInit, Output } from '@angular/core';
import { Category } from '../category.model';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { CategoryService } from '../category.service';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-category-item',
    templateUrl: './category-item.component.html',
    styleUrls: ['./category-item.component.css'],
    providers: [CategoryService],
  })

  export class CategoryItemComponent implements OnInit {

    faPencilAlt = faPencilAlt;
    faTrash = faTrash;

    constructor(private authService: AuthService, private categoryService: CategoryService, private route: ActivatedRoute, private router: Router) {}

    private userSub: Subscription = new Subscription;
    isAuthenticated = false;

    @Input() category!: Category; // ovo undefined sam ja dodao zar ce da radi dobro :D
  
    @Input() index!: number ; // sada mogu index-u dodjeliti vrijednost 'form outside' i to cemo uraditi iz recipe-list.componentnt.html


    categories!: Category[];
    subscription!: Subscription;
  
    ngOnInit(): void {
      this.userSub = this.authService.user.subscribe(user => {
        this.isAuthenticated = !!user;// ili !user ? false : true; // ako nemamo objekat user , tada nismo autenitifikovani (tj user = null)
      });

      this.subscription = this.categoryService.categoriesChanged
      .subscribe(
        (categories: Category[]) => {
         /* for(var i = 0; i < categories.length; i++){
            console.log("------------");
            console.log(categories[i].categoryName);
            console.log("------------");
        }*/
            this.categories = categories; // prati promjenu niza recepata, tj nasu listu recepata :D
        }
      );

    }

    onDeleteCategory() {
      console.log("Category: "+JSON.stringify(this.category.id));
      this.category.active = false;
      this.categoryService.deleteCategory(this.category);
    }

    onUpdateCategory() {
      //console.log("THIS ROUTE111 (djole) : "+this.route);
      this.router.navigate(['updateCategory', this.category.id] , {relativeTo: this.route}); // ovo je relativna putanja , posto smo vec na categories/ pa sad treba da obavjestimo router o nasoj trenutnoj ruti (recipes/) to radimo
        // sa route: ActivatedRoute kroz relativeTo :D

        //https://stackoverflow.com/questions/44864303/send-data-through-routing-paths-in-angular
    }
  
  }