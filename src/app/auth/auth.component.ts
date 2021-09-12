import { Component, ComponentFactoryResolver, HostListener, OnDestroy, ViewChild } from "@angular/core";
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
    isMobile = false;
    MOBILE_WIDTH = 500;

    @HostListener('window:resize', ['$event']) //If you wanna keep it updated on resize:
    onResize(event) {
        if (window.screen.width < this.MOBILE_WIDTH) {
            this.isMobile = true;
        } else {
            this.isMobile = false;
        }

    }

    ngOnInit() {
        if (window.screen.width < this.MOBILE_WIDTH) {
            this.isMobile = true;
        } else {
            this.isMobile = false;
        }
    }

    private closeSub: Subscription | undefined;  // ovo undefined je dodao angular sam , nova verzija itd...

    constructor(private authService: AuthService, private router: Router, private componentFactoryResolver: ComponentFactoryResolver) { } // componentFactory koristi se za pravljenje komponenata

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

        if (this.isLoginMode) {
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

    ngOnDestroy(): void {
        if (this.closeSub) {
            this.closeSub.unsubscribe();
        }
    }

}
