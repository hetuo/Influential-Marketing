import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers/root-reducer';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import * as initialState from './constants/initialState';
import {whoami} from './reducers/auth';

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(createLogger(), thunkMiddleware)));

export default store;

// Set the auth info at start
store.dispatch(whoami());
