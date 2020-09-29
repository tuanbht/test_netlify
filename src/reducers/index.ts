import { combineReducers } from 'redux';
import OrderDetails from './OrderDetailsReducer';
import { OrderDetails as OrderDetailsModel } from '../constants/CustomerPayments';
import Credential from './CredentialReducer';

export interface RootStateReducer {
  OrderDetails: OrderDetailsModel;
  Credential: {
    orderId: number;
    token: string;
  };
}
export default combineReducers({
  OrderDetails,
  Credential,
});
