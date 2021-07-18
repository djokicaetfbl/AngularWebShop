import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from '@angular/common/http';
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";
import { exhaustMap, take } from "rxjs/operators";

@Injectable()
export class AuthInterceptorService implements  HttpInterceptor {

    constructor(private authService: AuthService) {}
    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> { // treba  da uradimo provide HTTP_INTERCEPTORS u app. module
        return this.authService.user.pipe(take(1), exhaustMap( user => { // exhaustMap ceka prvi observable  ( nakon sto sa take(1) uzmemo korisnika (samo jednog :D) ) i vrati novi (mapirani) taj observable , tog usera :D
            if(!user) { // ako je user null, proslijedit cemo originalni request bez modifikacije ( dodavanja auth i token :D)
                return next.handle(req);
            }
            const modifiedReq = req.clone({
                params: new HttpParams().set('auth', user.token)
            });
            return next.handle(modifiedReq); // sada ce interceptor da doda ovaj query user token na sve odlazece zahtjeve :D
        })); // ovo ce da radi i za storingRecipes jer se koristi isti interceptor :D,
             // npr mi uradimo fetch recipes ili store recipes ovaj dio automatski se doda na postojeci url i to nam je super stvar ya autentikaciju :D, jer svi odlazeci zahtjevi treba da budu autentikovani kako bismo mogli da pristupimo bazi podataka
    }

}