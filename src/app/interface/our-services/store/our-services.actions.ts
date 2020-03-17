import { Action } from "@ngrx/store";

import { OurServices } from '../our-services.model';

export const GET_SERVICES = 'GET_SERVICES';
export const SET_SERVICES = 'SET_SERVICES';
export const ADD_SERVICE = 'ADD_SERVICE';
export const EDIT_SERVICE = 'EDIT_SERVICE';
export const DELETE_SERVICE = 'DELETE_SERVICE';


export class GetServices {
    readonly type = GET_SERVICES;
}

export class SetServices {
    readonly type = SET_SERVICES;

    constructor(public payload: [OurServices]) { }
}

export class AddService implements Action {
    readonly type = ADD_SERVICE;

    constructor(public payload:OurServices) { }
}

export class EditService {
    readonly type = EDIT_SERVICE;

    constructor(public payload: { index: number,key:string,value:OurServices }) { }
}

export class DeleteService {
    readonly type = DELETE_SERVICE;

    constructor(public payload: { index: number,key:string }) { }
}

export type ServicesActions = GetServices | SetServices | AddService | EditService | DeleteService ;
