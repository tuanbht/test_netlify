import { ORDER_ID, PAYMENT_TOKEN } from '../constants/StoreKeys';

const setToken = (token: string): void => {
  localStorage.setItem(PAYMENT_TOKEN, token);
};

const setOrderId = (orderId: number): void => {
  localStorage.setItem(ORDER_ID, String(orderId));
};

const getToken = (): string | null => {
  return localStorage.getItem(PAYMENT_TOKEN);
};

const getOrderId = (): number => {
  return parseInt(localStorage.getItem(ORDER_ID) as string);
};

const clearAll = (): void => {
  localStorage.clear();
};

export default {
  setOrderId,
  setToken,
  getToken,
  getOrderId,
  clearAll,
};
