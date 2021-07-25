import { Component, Input, OnInit, Output } from '@angular/core';
import { Category } from '../category.model';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-category-item',
    templateUrl: './category-item.component.html',
    styleUrls: ['./category-item.component.css']
  })

  export class CategoryItemComponent implements OnInit {

    faPencilAlt = faPencilAlt;
    faTrash = faTrash;

    @Input() category: Category | undefined; // ovo undefined sam ja dodao zar ce da radi dobro :D
  
    @Input() index: number | undefined; // sada mogu index-u dodjeliti vrijednost 'form outside' i to cemo uraditi iz recipe-list.componentnt.html
  
    ngOnInit(): void {
    }
  
  }