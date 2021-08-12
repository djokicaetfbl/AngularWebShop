import { Component, EventEmitter, Input, Output } from "@angular/core";


@Component({
    selector: 'app-alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.css']
})
export class AlertComponent { //ALERT JE BEZ NGINIT I KONSTRUKTORA :D
   @Input()
    message!: string; // ovo input znaci da je atribut message setable from outside, odnosno da mu mozemo podesiti vrijednost s vama, (vidljiv je vanjskom svijetu :D)
 // ovo input znaci da je atribut message setable from outside, odnosno da mu mozemo podesiti vrijednost s vama, (vidljiv je vanjskom svijetu :D)
   @Output() close = new EventEmitter<void>();

   onClose() {
       this.close.emit();
   }
 }