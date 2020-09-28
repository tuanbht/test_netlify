import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { createBrowserHistory } from 'history';
import axiosMiddleware from 'redux-axios-middleware';
import axiosClient from './ApiClient';
import rootReducer from '../reducers';
import logger from 'redux-logger';

const history = createBrowserHistory();

const middleware = [
  axiosMiddleware(axiosClient),
  ...getDefaultMiddleware({
    serializableCheck: false,
  }),
  logger,
];

const store = configureStore({
  reducer: rootReducer,
  middleware: middleware,
});

export { history, store };
