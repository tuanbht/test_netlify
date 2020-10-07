import { AnyAction } from 'redux';
import { SAVE_CREDENTIAL } from 'constants/ReduxActions';

const saveCredentialAction = (token: string, orderId: number): AnyAction => ({
  type: SAVE_CREDENTIAL,
  token,
  orderId,
});

export default {
  saveCredentialAction,
};
