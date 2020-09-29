import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
import MockAdapter from 'axios-mock-adapter';
import axiosMiddleware from 'redux-axios-middleware';
import RootReducer from '../reducers';
import axiosClient from './ApiClient';

export const testStore = (initialState = {}): EnhancedStore =>
  configureStore({
    preloadedState: initialState,
    reducer: RootReducer,
    middleware: [axiosMiddleware(axiosClient)],
  });

export const mockAxios = new MockAdapter(axiosClient);
