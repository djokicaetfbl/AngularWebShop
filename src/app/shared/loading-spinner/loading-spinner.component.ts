import { Component } from "@angular/core";

@Component({
    selector: 'app-loading-spinner',
    template: '<div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>', // to na sajtu loading.io/css za spinere dobijemo :D
    styleUrls: ['./loading-spinner.component.css']
}) // dodajmo novu komponentu u app.module NgModule
export class LoadingSpinnerComponent {

}