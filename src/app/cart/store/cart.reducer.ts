import { Action } from "@ngrx/store"; // pazi da je iz @ngrx/store !!!
import { Article } from "src/articles/articles.model";
import * as CartActions from './cart-actions';

export interface State {
    articles: Article[];
    editedArticleIndex: number;
    editedArticle: Article;
}

const initialState: State = {
    articles: [
       /* new Article('a1', 'Racunari', 'artikal 1', 'image base 64 neki', true, 'fileneki', 'describe1', 100, 2),
        new Article('a2', 'Racunari 2', 'artikal 2', 'image base 64 neki', true, 'fileneki2', 'describe1', 100, 2),*/
    ],
    editedArticle: null,
    editedArticleIndex: -1,
};

export function cartReducer(    // U REDUCER-u nema asinhronog koda samo sinhroni
    state: State = initialState,
    action: CartActions.CartActions
) {
    switch (action.type) {
        case CartActions.ADD_ARTICLE:
            return {
                ...state,
                articles: [...state.articles, action.payload]
            };

        case CartActions.ADD_ARTICLES_TO_CART:
            return {
                ...state,
                articles: [...state.articles, ...action.payload]
            };

        case CartActions.DELETE_ARTICLE_FROM_CART:
            return {
                ...state,
                articles: state.articles.filter((art, artIndex) => {
                    return artIndex !== state.editedArticleIndex;
                })
            };
            
        case CartActions.UPDATE_ARTICLE:
            const article = state.articles[state.editedArticleIndex];
            const updatedArticle = {
                ...article,
                ...action.payload
            };

            const updatedArticles = [...state.articles];
            updatedArticles[state.editedArticleIndex] = updatedArticle;

            return {
                ...state,
                articles: updatedArticles,
                editedArticleIndex: -1,
                editedArticle: null,
            };

            case CartActions.START_EDIT:
                return {
                    ...state,
                    editedArticleIndex: action.payload,
                    editedArticle: {...state.articles[action.payload]}
                };
            
            case CartActions.STOP_EDIT:
                return {
                    ...state,
                    editedArticle: null,
                    editedArticleIndex: -1,
                };

            
        default:
            return state;
    }
}