import { createReducer } from '@reduxjs/toolkit';
import { CRYPTO_CURRENCIES, ORDER_STATUS, OrderDetails as OrderDetailsModel } from 'constants/CustomerPayments';
import { ActionFailure, ActionSuccessfully, GET_ORDER_DETAILS } from 'constants/ReduxActions';
import { NOT_FOUND_PATH, ORDER_CANCELLED_PATH, ORDER_EXPIRED_PATH } from 'constants/RouterPaths';
import { find, get } from 'lodash';
import moment from 'moment';

const OrderDetails = createReducer(new OrderDetailsModel(), {
  [ActionSuccessfully(GET_ORDER_DETAILS)]: (state: OrderDetailsModel, action) => {
    const { data } = action.payload;
    const orderDetails: OrderDetailsModel = new OrderDetailsModel();

    orderDetails.status = get(data.data.attributes, 'status', ORDER_STATUS.undefined);

    if (orderDetails.status === ORDER_STATUS.cancelled) {
      window.location.assign(ORDER_CANCELLED_PATH);
      return state;
    }
    if (orderDetails.status === ORDER_STATUS.expired) {
      window.location.assign(ORDER_EXPIRED_PATH);
      return state;
    }

    const expiredTime = data.data.attributes['expire-at'] * 1000;
    const remainTime = moment(expiredTime).diff(moment.now());

    if (remainTime > 0) {
      setTimeout(() => {
        window.location.assign(ORDER_EXPIRED_PATH);
        return state;
      }, remainTime);
    }

    orderDetails.orderNumber = get(data.data.attributes, 'external-order-id', 0);
    orderDetails.markAsPaid = get(data.data.attributes, 'marked-as-paid', false);
    orderDetails.markAsPaidTime = get(data.data.attributes, 'marked-as-paid-at', '');
    orderDetails.price = get(data.data.attributes, 'price', 0);

    const storeDetails = find(data.included, { type: 'stores' });
    if (storeDetails) {
      orderDetails.storeName = get(storeDetails.attributes, 'name', '');
      orderDetails.storePhoneNumber = get(storeDetails.attributes, 'phone-number', '');
    }

    const cryptoETH = find(data.included, {
      type: 'payments',
      attributes: { 'payment-type': CRYPTO_CURRENCIES.ETHEREUM.shortName },
    });
    const cryptoBTC = find(data.included, {
      type: 'payments',
      attributes: { 'payment-type': CRYPTO_CURRENCIES.BITCOIN.shortName },
    });
    const cryptoUSDT = find(data.included, {
      type: 'payments',
      attributes: { 'payment-type': CRYPTO_CURRENCIES.USDT.shortName },
    });

    if (cryptoETH) {
      CRYPTO_CURRENCIES.ETHEREUM.setCryptoInformation(getCryptoInformation(cryptoETH));
      orderDetails.setCrypto('ETHEREUM');
    }
    if (cryptoBTC) {
      CRYPTO_CURRENCIES.BITCOIN.setCryptoInformation(getCryptoInformation(cryptoBTC));
      if (CRYPTO_CURRENCIES.BITCOIN.txHash) {
        orderDetails.setCrypto('BITCOIN');
      }
    }
    if (cryptoUSDT) {
      CRYPTO_CURRENCIES.USDT.setCryptoInformation(getCryptoInformation(cryptoUSDT));
      if (CRYPTO_CURRENCIES.USDT.txHash) {
        orderDetails.setCrypto('USDT');
      }
    }

    return state.equal(orderDetails) ? state : orderDetails;
  },
  [ActionFailure(GET_ORDER_DETAILS)]: (state) => {
    window.location.assign(NOT_FOUND_PATH);
    return state;
  },
});

const getCryptoInformation = (crypto: { attributes: any }) => {
  const amount = parseFloat(get(crypto.attributes, 'amount', 0) || 0);
  const paidAmount = parseFloat(get(crypto.attributes, 'paid-amount', 0) || 0);
  const walletAddress = get(crypto.attributes, 'destination-wallet', '');
  const txHash = get(crypto.attributes, 'tx-hash', '');
  return { amount, paidAmount, walletAddress, txHash };
};

export default OrderDetails;
