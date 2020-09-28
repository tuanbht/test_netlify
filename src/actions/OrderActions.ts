import { CANCEL_ORDER_PATH, MARK_AS_PAID_PATH, ORDER_DETAILS_PATH } from '../constants/ApiPaths';
import { replace } from 'lodash';
import { Action } from 'redux';
import { CANCEL_ORDER, GET_ORDER_DETAILS, MARK_AS_PAID_ORDER } from '../constants/ReduxActions';
import { get, put } from './AxiosRequestActions';
import { store } from '../configurations/ReduxStore';

const buildUrl = (url: string) => {
  return replace(url, ':id', String(store.getState().Credential.orderId));
};

const getOrderDetailsAction = (): Action => {
  return get(GET_ORDER_DETAILS, buildUrl(ORDER_DETAILS_PATH));
};

const cancelOrderAction = (): Action => {
  return put(CANCEL_ORDER, buildUrl(CANCEL_ORDER_PATH));
};

const markAsPaidOrderAction = (): Action => {
  return put(MARK_AS_PAID_ORDER, buildUrl(MARK_AS_PAID_PATH));
};

export default {
  getOrderDetailsAction,
  cancelOrderAction,
  markAsPaidOrderAction,
};
