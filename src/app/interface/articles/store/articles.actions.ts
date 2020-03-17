import { Action } from "@ngrx/store";

import { Article } from '../article.model';

export const GET_ARTICLES = 'GET_ARTICLES';
export const SET_ARTICLES = 'SET_ARTICLES';
export const ADD_ARTICLE = 'ADD_ARTICLE';
export const EDIT_ARTICLE = 'EDIT_ARTICLE';
export const DELETE_ARTICLE = 'DELETE_ARTICLE';


export class GetArticles {
    readonly type = GET_ARTICLES;
}

export class SetArtiles {
    readonly type = SET_ARTICLES;

    constructor(public payload: [Article]) { }
}

export class AddArticle implements Action {
    readonly type = ADD_ARTICLE;

    constructor(public payload:Article) { }
}

export class EditArticle {
    readonly type = EDIT_ARTICLE;

    constructor(public payload: { index: number,key:string,value:Article }) { }
}

export class DeleteArticle {
    readonly type = DELETE_ARTICLE;

    constructor(public payload: { index: number,key:string }) { }
}

export type ArticlesActions = GetArticles | SetArtiles | AddArticle | EditArticle | DeleteArticle ;
