
import {Injectable} from 'angular2/core';
import {createStore, applyMiddleware} from 'redux';
import {todoApp, initialUiState} from '../reducers/todoReducers';
import {List} from 'immutable';
const createLogger = require('redux-logger');
import {ReduxStore} from "angular2-redux-store";

const logger = createLogger({
    stateTransformer: (state) => {
        return {
            todos: state.todos.toJS(),
            uiState: state.uiState
        }
    }
    });

const createStoreWithMiddleware = applyMiddleware(logger)(createStore);
const store = createStoreWithMiddleware(
    todoApp,
    {
        todos:List([]),
        uiState: initialUiState,
    },
    window.devToolsExtension ? window.devToolsExtension() : f => f
  );


@Injectable()
export class TodoStore extends ReduxStore {

    constructor() {
        super(store);
    }

}
