import axiosClient from './ApiClient';
import { CANCEL_ORDER_PATH } from '../constants/ApiPaths';
import { replace } from 'lodash';
import DataStorage from '../configurations/DataStorage';

const cancelOrder = (): void => {
  const orderId = DataStorage.getOrderId();

  if (orderId) {
    const url = replace(CANCEL_ORDER_PATH, ':id', String(orderId));
    axiosClient.put(url).then();
  } else window.location.assign('/');
};

export default {
  cancelOrder,
};
