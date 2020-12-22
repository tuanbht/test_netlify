import { createReducer } from '@reduxjs/toolkit';
import { CRYPTO_CURRENCIES, ORDER_STATUS, OrderDetails as OrderDetailsModel } from 'constants/CustomerPayments';
import { ActionFailure, ActionSuccessfully, GET_ORDER_DETAILS } from 'constants/ReduxActions';
import { NOT_FOUND_PATH, ORDER_CANCELLED_PATH, ORDER_EXPIRED_PATH } from 'constants/RouterPaths';
import { find, get } from 'lodash';

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

    orderDetails.orderNumber = get(data.data.attributes, 'external-order-id', 0);
    orderDetails.markAsPaid = get(data.data.attributes, 'marked-as-paid', false);
    orderDetails.markAsPaidTime = get(data.data.attributes, 'marked-as-paid-at', '');
    orderDetails.price = get(data.data.attributes, 'price', 0);

    const storeDetails = find(data.included, { type: 'stores' });
    if (storeDetails) {
      orderDetails.storeName = get(storeDetails.attributes, 'name', '');
      orderDetails.storePhoneNumber = get(storeDetails.attributes, 'phone-number', '');
    }

    const { ETHEREUM, USDT, USDC } = CRYPTO_CURRENCIES;

    data.included.forEach((coin: any) => {
      if (coin && coin.type === 'payments') {
        switch (coin.attributes['payment-type']) {
          case ETHEREUM.shortName: {
            ETHEREUM.setCryptoInformation(getCryptoInformation(coin));
            orderDetails.setCrypto(coin.attributes['payment-type']);
            break;
          }
          case USDT.shortName: {
            USDT.setCryptoInformation(getCryptoInformation(coin));
            if (USDT.txHash) {
              orderDetails.setCrypto(coin.attributes['payment-type']);
            }
            break;
          }
          case USDC.shortName: {
            USDC.setCryptoInformation(getCryptoInformation(coin));
            if (USDC.txHash) {
              orderDetails.setCrypto(coin.attributes['payment-type']);
            }
            break;
          }
        }
      }
    });

    return state.equal(orderDetails) ? state : orderDetails;
  },
  [ActionFailure(GET_ORDER_DETAILS)]: (state, action) => {
    window.location.assign(NOT_FOUND_PATH);
    return state;
  },
});

const getCryptoInformation = (crypto: { attributes: any }) => {
  const amount = parseFloat(get(crypto.attributes, 'amount', 0) || 0);
  const paidAmount = parseFloat(get(crypto.attributes, 'paid-amount', 0) || 0);
  const walletAddress = get(crypto.attributes, 'destination-address', '');
  const txHash = get(crypto.attributes, 'tx-hash', '');
  return { amount, paidAmount, walletAddress, txHash };
};

export default OrderDetails;
