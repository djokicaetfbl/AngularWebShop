import { HttpClient } from '@angular/common/http';
import { Component, HostListener, Injectable, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CategoryService } from '../category.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { Category } from '../category.model';
import { ArticleService } from 'src/articles/article.service';
import { Article } from 'src/articles/articles.model';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css'],
  providers: [CategoryService, ArticleService], //da obezbjedim Category Service OBAVEZNO
})

@Injectable()
export class CategoryEditComponent implements OnInit {

  faUpload = faUpload;
  faArrowLeft = faArrowLeft;
  faSave = faSave;
  imageSrc: string = '';
  categoryNameOLD: string = '';
  categoryNameNEW: string = '';

  imgFile: string | undefined;
  id: number | undefined;
  editMode = false;
  categoryForm!: FormGroup;  // ovo  sam ja dodao uzvicnik pa da vidimo sta ce da bude :D, jer uzvicnik kaze da cu kasnije da izrvsim inicijalizacuj pa sad tu komapjelr kao to nesto zna
  private articles: Article[] = [];

  isLittleMobile = false;
  LITTLE_MOBILE_WIDTH = 361;

  /*
  2

The default angular template now has strictPropertyInitialization set to true in the tsconfig file.

You can do 2 things:

apply the best practice of initializing the properties, either inline or in the constructor
disable the strictPropertyInitialization flag in your tsconfig file (not recommended)
   */

  @HostListener('window:resize', ['$event']) //If you wanna keep it updated on resize:
  onResize(event) {
    //this.innerWidth = window.innerWidth;
    if (window.screen.width < this.LITTLE_MOBILE_WIDTH) {
      this.isLittleMobile = true;
    } else {
      this.isLittleMobile = false;
    }
  }

  constructor(private route: ActivatedRoute, private categoryService: CategoryService, private router: Router, private httpClient: HttpClient, private articleService: ArticleService) { }

  ngOnInit(): void {
    this.initForm(); //https://stackoverflow.com/questions/44864303/send-data-through-routing-paths-in-angular
    if (window.screen.width < this.LITTLE_MOBILE_WIDTH) {
      this.isLittleMobile = true;
    } else {
      this.isLittleMobile = false;
    }
  }

  onSubmit() {
    //if (!this.route.snapshot.paramMap.get('id')?.toString() !== null) {
    if (this.route.snapshot.paramMap.get('id') !== null) {
      this.categoryNameNEW = JSON.stringify(this.categoryForm.value.categoryName);

      let tmpCategoryName = this.categoryNameNEW.replace(/['"]+/g, '');
      this.articleService.loadArticles(this.categoryNameOLD).then(response => {
        this.articles = this.articleService.getArticles();
        for (let i = 0; i < this.articles.length; i++) {
          /*console.log("HHN: "+this.articles[i].articleName);      
          console.log("HHC: "+this.articles[i].categoryName);
          console.log("HHID: "+this.articles[i].id);*/
          this.articles[i].categoryName = tmpCategoryName;
          this.articleService.updateArticle(this.articles[i]);
        }
      });

      /* updateuj kategoriju za sve artikle :D */
      /*setTimeout(() => {
        this.articles = this.articleService.getArticles();
        for(let i = 0; i < this.articles.length; i++){         
          console.log("HH: "+this.articles[i].categoryName);
          this.articles[i].categoryName = tmpCategoryName;
          this.articleService.updateArticle(this.articles[i]);
        }
    }, 2000);*/

      // }
      console.log("POZVAO UPDATE CATEGORY");
      this.categoryService.updateCategory(this.categoryForm.value);
    } else {
      console.log("POZVAO CREATE CATEGORY");
      this.categoryService.addCategory(this.categoryForm.value);
    }
    /*setTimeout(() => {                           // <<<---using ()=> syntax
      this.router.navigate(['']);
    }, 500);*/
  }

  onDeleteIngredient(index: number) {
    //(<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  onCancel() {
    if (this.route.snapshot.paramMap.get('id') !== null) {
      this.router.navigate(['../../'], { relativeTo: this.route });
    } else {
      this.router.navigate(['../'], { relativeTo: this.route }); // sa relativoTo govorimo trenutnu putanju :D 
    }
  }

  initUpdateForm(category: Category) {
    this.imageSrc = category.imageSrc;
    let file = '';
    this.categoryForm = new FormGroup({
      'id': new FormControl(category.id),
      'categoryName': new FormControl(category.categoryName, Validators.required),
      'file': new FormControl(file,/* [Validators.required]*/),
      'imageSrc': new FormControl(this.imageSrc,),
      'active': new FormControl(true,)
    });
    this.categoryNameOLD = category.categoryName;
  }

  private initForm() {

    console.log("DJOKAS:: " + this.route.snapshot.paramMap.get('id'));

    let categoryName = '';
    let file = '';
    if (this.route.snapshot.paramMap.get('id') !== null) {

      let categoryName = '';
      let file = '';
      let imgSrc = '';

      this.categoryForm = new FormGroup({
        'id': new FormControl('test',),
        'categoryName': new FormControl('', Validators.required),
        'file': new FormControl(file, [Validators.required]),
        'imageSrc': new FormControl(imgSrc),
        'active': new FormControl(true,)
      });
      var tmpID = this.route.snapshot.paramMap.get('id')?.toString()!; // ovaj ! u slucajnu da nije assignabile ili null :D
      //console.log("TMPID RUTA: "+tmpID);
      var category = new Category('', '', '', false, '');
      this.categoryService.loadCategories().then(response => {
        category = this.categoryService.getCategory(tmpID);
        this.initUpdateForm(category);
      });

      /*setTimeout(() => {
        category = this.categoryService.getCategory(tmpID);
        this.initUpdateForm(category);
      }, 500);*/
    }
    else {
      //nova kategorija
      //console.log("NEWW!!");
      this.categoryForm = new FormGroup({
        'id': new FormControl('_' + Math.random().toString(36).substr(2, 9)),
        'categoryName': new FormControl(categoryName, Validators.required),
        'file': new FormControl(file, [Validators.required]),
        'imageSrc': new FormControl(this.imageSrc, /*[Validators.required]*/),
        'active': new FormControl(true,)
      })
    }
  }

  get uf() {
    return this.categoryForm.controls;
  }

  onImageChange(e: any) {
    const reader = new FileReader();

    if (e.target.files && e.target.files.length) {
      const [file] = e.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.imgFile = reader.result as string;
        this.categoryForm.patchValue({
          imgSrc: reader.result
        });
      };
    }
  }

  upload() {
    alert('Image has been uploaded.');
  }

  handleInputChange(e: any) {
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    var pattern = /image-*/;
    var reader = new FileReader();
    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }
  _handleReaderLoaded(e: any) {
    let reader = e.target;
    this.imageSrc = reader.result;
    //console.log(this.imageSrc);
  }
}