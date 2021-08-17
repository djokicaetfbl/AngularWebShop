import { Action } from "@ngrx/store";
import { Article } from "src/articles/articles.model";

// article trpamo u korpu :D: :D :D: D:D : D:D: :D D :D D

export const ADD_ARTICLE = 'ADD_ARTICLE';
export const ADD_ARTICLES_TO_CART = 'ADD_ARTICLES_TO_CART';
export const DELETE_ARTICLE_FROM_CART = 'DELETE_ARTICLE_FROM_CART';
export const UPDATE_ARTICLE = 'UPDATE_ARTICLE';
export const START_EDIT = 'START_EDIT'; // ZA EDIT :D
export const STOP_EDIT = 'STOP_EDIT';
export const DELETE_ALL_ARTICLES_FROM_CART = 'DELETE_ALL_ARTICLES_FROM_CART';

export class AddArticle implements Action {
    readonly type = ADD_ARTICLE;
    constructor(public payload: Article) {}
}

export class AddArticlesToCart implements Action {
    readonly type = ADD_ARTICLES_TO_CART;
    constructor(public payload: Article[]) {}
}

export class DeleteArticleFromCart implements Action {
    readonly type = DELETE_ARTICLE_FROM_CART;
}

export class UpdateArticle implements Action {
    readonly type = UPDATE_ARTICLE;
    constructor(public payload: Article) {}
}

export class StartEdit implements Action {
    readonly type = START_EDIT;

    constructor(public payload: number) {}

}

export class StopEdit implements Action {
    readonly type = STOP_EDIT;
}

export class DeleteAllArticlesFromCart implements Action {
    readonly type = DELETE_ALL_ARTICLES_FROM_CART;
}


export type CartActions = AddArticle
    | AddArticlesToCart
    | DeleteArticleFromCart
    | UpdateArticle
    | StartEdit
    | StopEdit
    | DeleteAllArticlesFromCart;
