import { HttpClient } from "@angular/common/http";
import { Component, Injectable, Input, OnInit } from "@angular/core";
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

@Injectable()
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
    
    ngOnInit(): void {
        this.initForm();
    }

    constructor(private route: ActivatedRoute, private articleService: ArticleService, private categoryService: CategoryService  ,private router: Router, private httpClient: HttpClient) { }

    onSubmit() {
        /*
        if (!this.route.snapshot.paramMap.get('id')?.toString() !== null) {
          this.categoryService.updateCategory(this.categoryForm.value);
        } else {
          this.categoryService.addCategory(this.categoryForm.value);
        }
        setTimeout(() => {  
          this.router.navigate(['']);
        }, 500);        */
      }

      onCancel() {
        if (this.route.snapshot.paramMap.get('id') !== null) {
          this.router.navigate(['../../'], { relativeTo: this.route });
        } else {
          this.router.navigate(['../'], { relativeTo: this.route }); // sa relativoTo govorimo trenutnu putanju :D 
        }
      }
    
      initUpdateForm(article: Article) {
       /* this.imageSrc = category.imageSrc;
        let file = '';
        this.categoryForm = new FormGroup({
          'id': new FormControl(category.id),
          'categoryName': new FormControl(category.categoryName, Validators.required),
          'file': new FormControl(file, [Validators.required]),
          'imageSrc': new FormControl(this.imageSrc,),
          'active': new FormControl(true,)
        });*/
      }
    
      private initForm() {
        let articleName = '';
        let file = '';
        let describe = '';
        let price = 0;
        let chooseCategory = '';

        /*
        if (this.route.snapshot.paramMap.get('id') !== null) {
    
          //console.log("UPDATE!!!");
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
          var category = new Category('', '', '', false, '');
          this.categoryService.loadCategories();
          setTimeout(() => {
            category = this.categoryService.getCategory(tmpID);
            this.initUpdateForm(category);
          }, 500);
        }
        else {
*/
          var categories = [];
          this.categoryService.loadCategories();
          setTimeout(() => {
          categories = this.categoryService.getCategories();
          console.log("CATEG. LENGTH: "+categories.length);
          this.categories = categories;
        }, 500);
          
          this.articleForm = new FormGroup({
            'id': new FormControl('_' + Math.random().toString(36).substr(2, 9)),
            'articleName': new FormControl(articleName, Validators.required),
            'file': new FormControl(file, [Validators.required]),
            'imageSrc': new FormControl(this.imageSrc,),
            'active': new FormControl(true,),
            'describe': new FormControl(describe, [Validators.required]),
            'price': new FormControl(price, [Validators.required]),
            'chooseCategory': new FormControl(chooseCategory, [Validators.required])
          })
       // }
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

}


