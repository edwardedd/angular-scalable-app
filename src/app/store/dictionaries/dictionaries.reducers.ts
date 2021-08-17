import { Dictionaries } from './dictionaries.models';
import {Action, createReducer, on} from '@ngrx/store';
import * as fromActions from './dictionaries.actions';

export interface State {
    entities: Dictionaries;
    loading: boolean ;
    error: any;
}

const initialState: State = {
    entities: null,
    loading: true,
    error: null
};

const dictionariesReducer = createReducer(
    initialState,
    on(fromActions.Read,(state, action: Action) => ({
        ...state,
        loading: true,
        error: null
    })),
    on(fromActions.ReadSuccess,(state, {dictionaries}) => ({
        ...state,
        loading: false,
        entities: dictionaries,
    })),
    on(fromActions.ReadError,(state, {error}) => ({
        ...state,
        loading: false,
        error: error
    })),
);

export function reducer(state: State | undefined, action: Action) {
    return dictionariesReducer(state,action)
}

