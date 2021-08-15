import { User } from "../user.model";
import * as  AuthActions from "./auth.actions";


export interface State {        // define interface that describe my state
    user: User;
    admin: string;
}

const initialState = {
    user: null,
    admin: "UuoMDdxjpLOYjWSlmAEpPqofvpA2", // u auth service provjeri
};

export function authReducer(state = initialState, action: AuthActions.AuthActions) { // PAZI GORE NA IMPORT ZA AuthActions as *
    switch (action.type) {
        case AuthActions.LOGIN:
            console.log(" I OVDE :D ");
            var user = new User(action.payload.email, action.payload.userId, action.payload.token, action.payload.expirationDate, false);
            if (action.payload.userId.toString().trim().localeCompare(state.admin) === 0) {
                 user = new User(action.payload.email, action.payload.userId, action.payload.token, action.payload.expirationDate,true)
            }
            return {
                ...state,
                //user: user // firt user is a state user , second is const user :D
                user // moze i ovako odma ce dodjeliti useru iz initialState :D
            };
        case AuthActions.LOGOUT:
            return {
                ...state,
                user: null
            };
        default:
            return state;
    }
}