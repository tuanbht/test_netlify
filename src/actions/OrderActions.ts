import { CANCEL_ORDER_PATH, MARK_AS_PAID_PATH, ORDER_DETAILS_PATH } from '../constants/ApiPaths';
import { replace } from 'lodash';
import { Action } from 'redux';
import { CANCEL_ORDER, GET_ORDER_DETAILS, MARK_AS_PAID_ORDER } from '../constants/ReduxActions';
import { get, put } from './AxiosRequestActions';

const buildUrl = (url: string, orderId: number) => {
  return replace(url, ':id', String(orderId));
};

const getOrderDetailsAction = (orderId: number): Action => {
  return get(GET_ORDER_DETAILS, buildUrl(ORDER_DETAILS_PATH, orderId));
};

const cancelOrderAction = (orderId: number): Action => {
  return put(CANCEL_ORDER, buildUrl(CANCEL_ORDER_PATH, orderId));
};

const markAsPaidOrderAction = (orderId: number): Action => {
  return put(MARK_AS_PAID_ORDER, buildUrl(MARK_AS_PAID_PATH, orderId));
};

export default {
  getOrderDetailsAction,
  cancelOrderAction,
  markAsPaidOrderAction,
};
