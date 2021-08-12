import { Action } from "@ngrx/store";
import { Article } from "src/articles/articles.model";

// article trpamo u korpu :D: :D :D: D:D : D:D: :D D :D D

export const ADD_ARTICLE = 'ADD_ARTICLE';
export const ADD_ARTICLES_TO_CART = 'ADD_ARTICLES_TO_CART';
export const DELETE_ARTICLE_FROM_CART = 'DELETE_ARTICLE_FROM_CART';

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

export type CartActions = AddArticle
    | AddArticlesToCart
    | DeleteArticleFromCart;
