export class User {
    
    constructor(public email: string, public id: string, private _token: string, private _tokenExpirationDate: Date, isAdmin?: boolean) {}

    get token() { // geter je specijalna vrsta propertija , pa jos pritupam kao pozivu atributa , a ne metoda . npr user.token a ne user.token()
        if(!this._tokenExpirationDate || new Date() > this._tokenExpirationDate){
            return null;
        }
        return this._token
    } 
}