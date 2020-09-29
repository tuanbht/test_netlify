import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { createBrowserHistory } from 'history';
import axiosMiddleware from 'redux-axios-middleware';
import axiosClient from './ApiClient';
import rootReducer from '../reducers';

const history = createBrowserHistory();

const middleware = [
  axiosMiddleware(axiosClient),
  ...getDefaultMiddleware({
    serializableCheck: false,
  }),
];

const store = configureStore({
  reducer: rootReducer,
  middleware: middleware,
});

export { history, store };
