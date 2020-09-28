import { createReducer } from '@reduxjs/toolkit';
import { SAVE_CREDENTIAL } from '../constants/ReduxActions';

const initialState = { orderId: null, token: null };

const CredentialReducer = createReducer(initialState, {
  [SAVE_CREDENTIAL]: (state, action) => {
    const { orderId, token } = action;

    return { orderId, token };
  },
});

export default CredentialReducer;
