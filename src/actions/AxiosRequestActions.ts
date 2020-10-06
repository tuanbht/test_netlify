import { Action, createAction } from '@reduxjs/toolkit';

export const get = (action: string, url: string, params = {}, configs = {}): Action =>
  createAction(action, () => ({
    payload: {
      request: {
        method: 'get',
        url,
        params,
        ...configs,
      },
    },
  }))();

export const patch = (action: string, url: string, data = {}, configs = {}): Action =>
  createAction(action, () => ({
    payload: {
      request: {
        method: 'patch',
        url,
        data,
        ...configs,
      },
    },
  }))();
