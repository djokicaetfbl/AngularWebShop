import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, tap } from "rxjs/operators";
import { BehaviorSubject, Subject, throwError } from "rxjs"; // rxjs uvijek vraca observable :D
import { User } from "./user.model";
import { Router } from "@angular/router";

import { environment } from '../../environments/environment';

export interface AuthResponseData { // ovo je sa firebase rest apija za response body, ovi podaci svako trebat ce mi za observable :D
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean; // sa ? kazemo da je ovaj argument optional, jer req.  response za signup nema to polje, dok za login ima, po firebase rest API-ju
}

@Injectable({ providedIn: 'root' }) // autentikacija kroz rest api
export class AuthService {
    
    //user = new BehaviorSubject<User>(null); // ideja je da emitujemo novog user-a kada se logujemo ili odjavljujemo, sa behaviour subject moze 
    //da se pritupi vrijednosti prije nego li je emitovana
    user = new BehaviorSubject<any>(null); // pazi ovo sam umjesto  user = new BehaviorSubject<User>(null) , stavio ANY PITANJE DA LI CE RADITI :D

    private tokenExpirationTimer: any;

    constructor(private http: HttpClient, private router: Router) { }

    signup(email: string, password: string) { // koristit cemo return , da se mozemo subscribe i da bi mogli da upravljamo rezultatom :D
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseAPIKey, // u forebase rest api-ju pise da ide post metoda , pa je zato i koristimo :D                                                                                                                                // AIzaSyD_NWyz1KpJgtqp4aIR5gQyFBhX6-5iOwE moj API key
            {  //API KEY: AIzaSyD_NWyz1KpJgftqp4aIR5gQyFBhX6-5iOwE

                // email, password,returnSecureToken je request body od strane firebase rest API-a
                email: email,
                password: password,
                returnSecureToken: true             //Whether or not to return an ID and refresh token. Should always be true
            }
        ).pipe(catchError(this.handleError), //import { catchError, tap } from "rxjs/operators";
            tap(resData => { // tap nam omogucava da izvrsimo akciju bez promjene responsea :D to je sto je :D   
                this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn); // + oznacava da je u pitanju number :D
            }));
    }

    login(email: string, password: string) {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseAPIKey, // key je dodat iz environmetns foldera
        {  //API KEY: AIzaSyD_NWyz1KpJgtqp4aIR5gQyFBhX6-5iOwE
            email: email,
            password: password,
            returnSecureToken: true             //Whether or not to return an ID and refresh token. Should always be true
        }
        )
        .pipe(catchError(this.handleError),
        tap(resData => { // tap nam omogucava da izvrsimo akciju bez promjene responsea :D to je sto je :D   
            this.handleAuthentication(resData.email,resData.localId, resData.idToken, +resData.expiresIn); // + oznacava da je u pitanju number :D
        }));  
         
    }

    autoLogin() { // ovo cemo pozvati u app.component.ts (NgOnInit) jer se to uvjek prvo pokrece pri refresu ili ucitavanju aplikacije :D
        const userData: {
            email: string;
            id: string;
            _token: string; // _token ova _ (donja crtica) jer imamo get token() a njega pozivamo sa token :D
            _tokenExpirationDate: string;

        } = JSON.parse(localStorage.getItem('userData') || '{}'); // daj nam normalan JavaScript objekat :D, OVO JE PROBLEMATICNO! // https://stackoverflow.com/questions/66713585/typescript-error-type-null-is-not-assignable-to-type
        if (!userData) {
            return;
        }

        const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));

        if (loadedUser.token) {
            this.user.next(loadedUser);
            const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime(); // sa getTime() da dobijemo vrijeme u milisekundama :D// to je ta razlika od trenutka kad se prijavim do vremena trajanja tokena :D
            this.autologout(expirationDuration);
        }
    }

    logout() {
        this.user.next(null);
        this.router.navigate(['/categories']);
        localStorage.removeItem('userData');

        if (this.tokenExpirationTimer) { // ako imamo aktivan tajemr to jest jos je ostalo vrmenea za token ,onda ga ponistimo, posto se rucno odjavljujemo
            clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer = null;
    }

    autologout(expirationDuration: number) {
        console.log("TOKEN TRAJE: " + expirationDuration);
        this.tokenExpirationTimer = setTimeout(() => { // kada token istekne odjavi se :D, setTimeout() je odvojena nit koja se zasebno izvrsava u pozadini, i ovde konkretno logout izvrsit ce se nakon sto protekne tokenExpirationTimer
            this.logout(); // kada istekne expirationDuration , odjavi se :D
        }, expirationDuration);
    }

    private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        const user = new User(email, userId, token, expirationDate);
        this.user.next(user); // emitujemo naseg novog korisnika koji se logovao :D
        this.autologout(expiresIn * 1000) // da posaljemo koliko nam traje token
        localStorage.setItem('userData', JSON.stringify(user)); // i ovako sacuvamo podatke o korisniku i zivjet ce u browseru

    }

    private handleError(errorRes: HttpErrorResponse) {
        let errorMessage = 'An unknown error occured!';
        if (!errorRes.error || !errorRes.error.error) { // ako eror dobijanmo u drugacijem formatu od : errorRes.error.error ili errorRes.error
            return throwError(errorMessage);
        }
        switch (errorRes.error.error.message) {// u konzoli tako ga dohvatimo , slicno kad sam iz ip-a json podatak dohvatao koji je ugnezdjen 
            case 'EMAIL_EXISTS': errorMessage = 'This email exists already'; // u konzoli pise EMAIL_EXIST pa tako znam :D
                break;
            case 'EMAIL_NOT_FOUND': errorMessage = 'This email does not exist.';
                break;
            case 'INVALID_PASSWORD': errorMessage = 'This password is not correct';
                break;

        }
        return throwError(errorMessage);
    }

}