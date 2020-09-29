import { SAVE_CREDENTIAL } from '../../constants/ReduxActions';
import CredentialReducer from '../CredentialReducer';
import { AnyAction } from '@reduxjs/toolkit';
import faker from 'faker';

describe('CredentialReducer', () => {
  describe('SAVE_CREDENTIAL', () => {
    let action: AnyAction;
    const token = faker.random.uuid();
    const orderId = faker.random.number();

    beforeEach(() => {
      action = {
        type: SAVE_CREDENTIAL,
        token,
        orderId,
      };
    });

    it('returns orderId and token', () => {
      expect(CredentialReducer({ orderId: null, token: null }, action)).toEqual({ token, orderId });
    });
  });
});
