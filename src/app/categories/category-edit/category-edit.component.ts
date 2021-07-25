import { HttpClient } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CategoryService } from '../category.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { faArrowLeft }from '@fortawesome/free-solid-svg-icons';
import { faSave }from '@fortawesome/free-solid-svg-icons';
import { DataStorageService } from 'src/app/shared/data-storage.service';

@Component({
    selector: 'app-category-edit',
    templateUrl: './category-edit.component.html',
    styleUrls: ['./category-edit.component.css'],
    providers: [CategoryService], //da obezbjedim Category Service OBAVEZNO
})

@Injectable()
export class CategoryEditComponent implements OnInit {

  faUpload = faUpload;
  faArrowLeft = faArrowLeft;
  faSave = faSave;
  imageSrc: string = '';

    imgFile: string | undefined;
    id: number | undefined;
    editMode = false;
    categoryForm!: FormGroup;  // ovo  sam ja dodao uzvicnik pa da vidimo sta ce da bude :D, jer uzvicnik kaze da cu kasnije da izrvsim inicijalizacuj pa sad tu komapjelr kao to nesto zna
    /*
    2

  The default angular template now has strictPropertyInitialization set to true in the tsconfig file.

  You can do 2 things:

  apply the best practice of initializing the properties, either inline or in the constructor
  disable the strictPropertyInitialization flag in your tsconfig file (not recommended)
     */

    constructor(private route: ActivatedRoute, private categoryService: CategoryService, private router: Router, private httpClient: HttpClient) { }
  

    ngOnInit(): void {
        /*
            this.route.params
            .subscribe( 
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null; // bit ce undefined tj. razlit od null samo ako je u edit modu :D ,a ne ovde konkretno u new :D
        //console.log("DA LI JE EDIT MODE: "+this.editMode)*/
        this.initForm();
      /*} 
      );*/
         
    }

    onSubmit() {
         /*if (this.editMode){
           this.recipeService.updateRecipe(this.id,this.recipeForm.value);// jer value sa forme je ustvari nas recipe tu su njegovi argumenti :D
         } else {
           this.recipeService.addRecipe(this.recipeForm.value);
         }
         this.onCancel();*/
         //console.log("THIS CATEGORY FORM VALUE: "+JSON.stringify(this.categoryForm.value));
         this.categoryService.addCategory(this.categoryForm.value);
         this.onCancel();

       }

       onDeleteIngredient(index: number){
        //(<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
      }

      onCancel(){
        this.router.navigate(['../'], {relativeTo: this.route}); // sa relativoTo govorimo trenutnu putanju :D 
      }

      private initForm() {

        let articleName= '';
        let file = '';
        let imgSrc = '';
        this.categoryForm = new FormGroup({
          'articleName': new FormControl(articleName, Validators.required),
          'file': new FormControl(file, [Validators.required]),
          'imageSrc': new FormControl(this.imageSrc, /*[Validators.required]*/)
        })
        /*

        let recipeName= '';
        let recipeImagePath = '';
        let recipeDescription = '';
        let recipeIngredients = new FormArray([]);
    
        // od Angulara 8+ , postoji nacin da se 'clearing all items in FormArray' sa :  (<FormArray>this.recipeForm.get('ingredients')).clear(); video 238 :D
    
        if(this.editMode) {
          const recipe = this.recipeService.getRecipe(this.id);
          recipeName = recipe.name;
          recipeImagePath = recipe.imagePath;
          recipeDescription = recipe.description;
    
          if (recipe['ingredients']) {
            for(let ingredient of recipe.ingredients) { // dinamicko dodavanje recepata :D
              recipeIngredients.push(
                new FormGroup({
                  'name': new FormControl(ingredient.name), 
                  'amount': new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
                })
              );
            }
          }
        }
    
        this.recipeForm = new FormGroup({
          'name': new FormControl(recipeName, Validators.required),
          'imagePath': new FormControl(recipeImagePath, Validators.required),
          'description': new FormControl(recipeDescription, Validators.required),
          'ingredients':recipeIngredients
        });
            */
      }

      get uf(){
        return this.categoryForm.controls;
      }

      onImageChange(e: any) {
        const reader = new FileReader();
        
        if(e.target.files && e.target.files.length) {
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

      upload(){
        //console.log(this.categoryForm.value);
        /*this.httpClient.post('http://localhost:8888/file-upload.php', this.categoryForm.value)
          .subscribe(response => {
            alert('Image has been uploaded.');
          })*/
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