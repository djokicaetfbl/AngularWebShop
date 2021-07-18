import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { map, take } from "rxjs/operators";
import { AuthService } from "./auth.service";

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) {}
    
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        // u app-routing treba da dodamo canActivate: [AuthGuard] da bismo zastitili pristup linku, korisnicima koji nisu prijavljeni :D
        return this.authService.user.pipe(
            take(1), // da osiguramo da uvijek uzmamo zadnjeg korisnika i da se onda unsubscrbieujemo (to sam odradi take) :D
            map(user => {
           const isAuth = !!user; // ako nije korisnik vrati false , tj ako sam logovan, jer po user-u znam da li sam logovan :D
           if(isAuth) {
               return true;
           }
           return this.router.createUrlTree(['/auth']);
        }));
    }
}