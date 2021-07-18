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

@Injectable({providedIn: 'root'}) // autentikacija kroz rest api
export class AuthService {
    user = new BehaviorSubject<User>(null); // ideja je da emitujemo novog user-a kada se logujemo ili odjavljujemo, sa behaviour subject moze 
    //da se pritupi vrijednosti prije nego li je emitovana

    private tokenExpirationTimer: any;

    constructor(private http: HttpClient, private router: Router) {}


}