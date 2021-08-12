import { ActionReducerMap } from '@ngrx/store';
import * as fromCart from '../cart/store/cart.reducer';
import * as fromAuth from '../auth/store/auth.reducer';

export interface AppState {
    cart: fromCart.State,
    auth: fromAuth.State;
}


export const appReducer: ActionReducerMap<AppState> = {
    cart: fromCart.cartReducer, // stavio sma typescript u tsconfig da je strict mode to false :D
    auth: fromAuth.authReducer
};