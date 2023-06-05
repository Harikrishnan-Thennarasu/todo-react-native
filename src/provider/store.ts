import { compose, combineReducers } from 'redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import state from '../provider/reducer'


const rootReducer = combineReducers({ state });

export const store = createStore(rootReducer, compose(applyMiddleware(thunk)));