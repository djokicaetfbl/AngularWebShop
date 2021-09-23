import { HttpClient } from "@angular/common/http";
import { Component, HostListener, Injectable, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ArticleService } from "../article.service";
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Article } from "../articles.model";
import { CategoryService } from "src/app/categories/category.service";
import { Category } from "src/app/categories/category.model";

@Component({
  selector: 'app-article-edit',
  templateUrl: './article-edit.component.html',
  styleUrls: ['./article-edit.component.css'],
  providers: [ArticleService, CategoryService], //da obezbjedim Category Service OBAVEZNO
})

//@Injectable() // DA DEFINISEMO KLASU KAO SERVIS
export class ArticleEditComponent implements OnInit {

  faUpload = faUpload;
  faArrowLeft = faArrowLeft;
  faSave = faSave;
  imageSrc: string = '';

  imgFile: string | undefined;
  id: number | undefined;
  editMode = false;
  articleForm!: FormGroup;

  categories: Category[] = [];

  categoryNameSelected = false;

  categoryNameNAME: any;
  isLoading = true;

  isLittleMobile = false;
  LITTLE_MOBILE_WIDTH = 361;

  @HostListener('window:resize', ['$event']) //If you wanna keep it updated on resize:
  onResize(event) {
    //this.innerWidth = window.innerWidth;
    if (window.screen.width < this.LITTLE_MOBILE_WIDTH) {
      this.isLittleMobile = true;
    } else {
      this.isLittleMobile = false;
    }
  }

  ngOnInit(): void {
    //this.initForm();
    if (window.screen.width < this.LITTLE_MOBILE_WIDTH) {
      this.isLittleMobile = true;
    } else {
      this.isLittleMobile = false;
    }
  }

  constructor(private route: ActivatedRoute, private articleService: ArticleService, private categoryService: CategoryService, private router: Router, private httpClient: HttpClient) {
    if (this.route.snapshot.paramMap.get('id')?.toString() !== null) {
      this.categoryNameNAME = this.route.snapshot.paramMap.get('categoryName')?.toString().trim();
      console.log("RUTA CATEGORY NAME 1: "+this.categoryNameNAME);
      //this.articleService.loadArticles(this.categoryName);
    }
    this.initForm();
  }

  onSubmit() {
    if (this.categoryNameNAME !== undefined) {
          console.log("UPDATE ARTICLE");
          this.articleService.updateArticle(this.articleForm.value);
        } else {
          console.log("CREATE ARTICLE");
          this.articleService.addArticle(this.articleForm.value);
        }
    setTimeout(() => {
      this.router.navigate(['']);
    }, 500);
  }

  onCancel() {
    if (this.route.snapshot.paramMap.get('id') !== null) {
      this.router.navigate(['categories/', this.categoryNameNAME ], /*{ relativeTo: this.route }*/);
    } else {
      this.router.navigate(['../'], { relativeTo: this.route }); // sa relativoTo govorimo trenutnu putanju :D 
    }
  }

  initUpdateForm(article: Article) {
    //console.log("ARTIKLE FILE: "+article.file);
    this.imageSrc = article.imageSrc;
    let file = '';
    this.articleForm = new FormGroup({
      'id': new FormControl(article.id),
      'articleName': new FormControl(article.articleName, Validators.required),
      'file': new FormControl(file, /*[Validators.required]*/),
      'imageSrc': new FormControl(this.imageSrc,),
      'active': new FormControl(true,),
      'describe': new FormControl(article.describe, [Validators.required]),
      'price': new FormControl(article.price, [Validators.required]),
      'categoryName': new FormControl(article.categoryName, Validators.required),
    });
  }

  private initForm() {
    let articleName = '';
    let file = '';
    let describe = '';
    let price = 0;
    let categoryName = '';


    if (this.route.snapshot.paramMap.get('id') !== null) {

      console.log("UPDATE ARTIKLE!!!"+this.route.snapshot.paramMap.get('categoryName')?.toString());
      let categoryName = '';
      let file = '';
      let imgSrc = '';

      var categories = [];
      this.categoryService.loadCategories().then( response => {
        categories = this.categoryService.getCategories();
        console.log("CATEG. LENGTH UPDATE: " + categories.length);
        this.categories = categories;
        this.isLoading = false;
      });
      
      /*setTimeout(() => {
        categories = this.categoryService.getCategories();
        console.log("CATEG. LENGTH UPDATE: " + categories.length);
        this.categories = categories;
        this.isLoading = false;
      }, 3000);*/

      this.articleForm = new FormGroup({
        'id': new FormControl('test',),
        'articleName': new FormControl('', Validators.required),
        'categoryName': new FormControl('', Validators.required),
        'file': new FormControl(file, [Validators.required]),
        'imageSrc': new FormControl(imgSrc),
        'active': new FormControl(true,),
        'describe': new FormControl('', [Validators.required]),
        'price': new FormControl('', [Validators.required]),
      });



      var tmpID = this.route.snapshot.paramMap.get('id')?.toString()!; // ovaj ! u slucajnu da nije assignabile ili null :D
      var article = new Article('', '', '', '', false, '', '', 0);
      if (this.route.snapshot.paramMap.get('categoryName')?.toString() !== null) {
        //this.articleService.loadArticles(this.categoryNameNAME,/*this.categoryName*/);
        this.articleService.loadArticles(this.categoryNameNAME).then( result => {
          article = this.articleService.getArticle(tmpID);
          console.log("ARTIKLE: "+article.categoryName);
          setTimeout(() => {
          this.initUpdateForm(article);
        }, 1000);
        })
      }
      /*
      setTimeout(() => {
        article = this.articleService.getArticle(tmpID);
        console.log("ARTIKLE: "+article.articleName);
        this.initUpdateForm(article);
      }, 10000);*/
    }
    else {
      console.log("CREATE ARTIKLE");
      var categories = [];
      this.categoryService.loadCategories().then( response => {
        categories = this.categoryService.getCategories();
        console.log("CATEG. LENGTH: " + categories.length);
        this.categories = categories;
        this.isLoading = false;
      });
      
      /*setTimeout(() => {
        categories = this.categoryService.getCategories();
        console.log("CATEG. LENGTH: " + categories.length);
        this.categories = categories;
        this.isLoading = false;
      }, 3000);*/

      this.articleForm = new FormGroup({
        'id': new FormControl('_' + Math.random().toString(36).substr(2, 9)),
        'articleName': new FormControl(articleName, Validators.required),
        'file': new FormControl(file, [Validators.required]),
        'imageSrc': new FormControl(this.imageSrc,),
        'active': new FormControl(true,),
        'describe': new FormControl(describe, [Validators.required]),
        'price': new FormControl(price, [Validators.required]),
        'categoryName': new FormControl(categoryName, [Validators.required])
      })
    }
  }

  get uf() {
    return this.articleForm.controls;
  }

  onImageChange(e: any) {
    const reader = new FileReader();

    if (e.target.files && e.target.files.length) {
      const [file] = e.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.imgFile = reader.result as string;
        this.articleForm.patchValue({
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

  onOptionsSelected(value: string) {
    console.log("the selected value is " + value);
    this.categoryNameSelected = true;
  }


}


