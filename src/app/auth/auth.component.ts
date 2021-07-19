import { Component, ComponentFactoryResolver, OnDestroy, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable, Subscription } from "rxjs";
import { AuthResponseData, AuthService } from "./auth.service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnDestroy {

  
    isLoginMode = true;
    isLoading = false; // za spinner
    error: any = null; // mozda type string
    /*
    @ViewChild(PlaceHolderDirective) alertHost; // pronaci ce prvi PlaceHolderDirective element koji koristimo :D
  */

    private closeSub: Subscription | undefined;  // ovo undefined je dodao angular sam , nova verzija itd...

    constructor(private authService: AuthService, private router: Router, private componentFactoryResolver: ComponentFactoryResolver) {} // componentFactory koristi se za pravljenje komponenata

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;

    }

    onSubmit(form: NgForm) {
      //console.log(form.value);
      if (!form.valid) { // sto se kaze za svaki slucaj :D        
          return;
      }
      const email = form.value.email;
      const password = form.value.password;

      let authObs: Observable<AuthResponseData>; //OBservable je genericki tip // form rxjs/Observable 

      this.isLoading = true;

      if(this.isLoginMode) {
          authObs = this.authService.login(email, password);
      } else {
        
      authObs = this.authService.signup(email, password);
      }

      authObs.subscribe(resData => { 
              console.log(resData);
              this.isLoading = false;
              this.router.navigate(['./categories']);
          },
              errorMessage => {
                 console.log(errorMessage);
                  this.error = errorMessage;
                  this.isLoading = false;
              }
          );

      form.reset();
  }

  onHandleError() {
    this.error = null;

}

/*
    private showErrorAlert(message: string) { // ovo je za programsko pravljenje alerta :D
       // const alertCmp = new AlertComponent(); ovo nece da radi , jer angular ne kreira komponente na ovakav nacin
        const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);// ovako Angular pravi komponentu
        const hosViewContainerRef = this.alertHost.viewContainerRef;
        hosViewContainerRef.clear();

        const componentRef = hosViewContainerRef.createComponent(alertCmpFactory); // u app.moduelt.ts posto rucno kreiramo komponentu treba dodati: entryComponents: [  // 
                                                                                                                                                     //AlertComponent
        componentRef.instance.message = message;  // ovo je kontkretna instanca nase komponente alert komponenente,i treba da ima atribute koje smo definisali a to su message i close :D                                                                                                                                         // ], 
        this.closeSub = componentRef.instance.close.subscribe( () => {
            this.closeSub.unsubscribe(); // posto imama subsrcibe treba mi i interfejs onDestry() :D
            hosViewContainerRef.clear(); // sa ovim clear nasa komponenta ne staje :D
        });
        }
 */

  ngOnDestroy(): void {
    if(this.closeSub) {
        this.closeSub.unsubscribe();
    }
}

}
