// src/store.js
import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers';

const store = createStore(
    rootReducer,
    composeWithDevTools() // Remove applyMiddleware since there's no middleware to apply
);

export default store;
