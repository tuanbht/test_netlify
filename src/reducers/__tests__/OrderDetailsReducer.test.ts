import { ActionSuccessfully, GET_ORDER_DETAILS } from '../../constants/ReduxActions';
import { AnyAction } from '@reduxjs/toolkit';
import { CRYPTO_CURRENCIES, ORDER_STATUS, OrderDetails } from '../../constants/CustomerPayments';
import OrderDetailsReducer from '../OrderDetailsReducer';
import { ORDER_CANCELLED_PATH, ORDER_EXPIRED_PATH } from '../../constants/RouterPaths';
import { buildOrderDetailsResponse } from '../../factories/OrderDetails';

describe('OrderDetails', () => {
  beforeEach(() => {
    jest.spyOn(window.location, 'assign').mockReturnValue();
  });

  describe('GET_ORDER_DETAILS_SUCCESS', () => {
    let action: AnyAction;

    describe('order status is cancelled', () => {
      beforeEach(() => {
        action = {
          type: ActionSuccessfully(GET_ORDER_DETAILS),
          payload: {
            data: buildOrderDetailsResponse({ status: ORDER_STATUS.cancelled }),
          },
        };
        OrderDetailsReducer(new OrderDetails(), action);
      });

      it('redirects to cancelled page', () => {
        expect(window.location.assign).toBeCalledWith(ORDER_CANCELLED_PATH);
      });
    });

    describe('order status is expired', () => {
      beforeEach(() => {
        action = {
          type: ActionSuccessfully(GET_ORDER_DETAILS),
          payload: {
            data: buildOrderDetailsResponse({ status: ORDER_STATUS.expired }),
          },
        };
        OrderDetailsReducer(new OrderDetails(), action);
      });

      it('redirects to expired page', () => {
        expect(window.location.assign).toBeCalledWith(ORDER_EXPIRED_PATH);
      });
    });

    describe('does not have store details and crypto payment details', () => {
      beforeEach(() => {
        action = {
          type: ActionSuccessfully(GET_ORDER_DETAILS),
          payload: {
            data: buildOrderDetailsResponse({ status: ORDER_STATUS.initialized }),
          },
        };
      });

      it('returns orderDetails without store details and crypto payment details', () => {
        expect(OrderDetailsReducer(new OrderDetails(), action)).toMatchSnapshot();
        expect(CRYPTO_CURRENCIES).toMatchSnapshot();
      });
    });

    describe('has store details', () => {
      beforeEach(() => {
        action = {
          type: ActionSuccessfully(GET_ORDER_DETAILS),
          payload: {
            data: buildOrderDetailsResponse({ hasStoreDetails: true }),
          },
        };
      });

      it('returns orderDetails with store details', () => {
        expect(OrderDetailsReducer(new OrderDetails(), action)).toMatchSnapshot();
      });
    });

    describe('has crypto ETH details', () => {
      beforeEach(() => {
        action = {
          type: ActionSuccessfully(GET_ORDER_DETAILS),
          payload: {
            data: buildOrderDetailsResponse({ hasCryptoETH: true }),
          },
        };
        OrderDetailsReducer(new OrderDetails(), action);
      });

      it('returns crypto ETH details', () => {
        expect(CRYPTO_CURRENCIES).toMatchSnapshot();
      });
    });

    describe('has crypto BTC details', () => {
      beforeEach(() => {
        action = {
          type: ActionSuccessfully(GET_ORDER_DETAILS),
          payload: {
            data: buildOrderDetailsResponse({ hasCryptoBTC: true }),
          },
        };
        OrderDetailsReducer(new OrderDetails(), action);
      });

      it('returns crypto BTC details', () => {
        expect(CRYPTO_CURRENCIES).toMatchSnapshot();
      });
    });

    describe('has crypto USDT details', () => {
      beforeEach(() => {
        action = {
          type: ActionSuccessfully(GET_ORDER_DETAILS),
          payload: {
            data: buildOrderDetailsResponse({ hasCryptoUSDT: true }),
          },
        };
        OrderDetailsReducer(new OrderDetails(), action);
      });

      it('returns crypto USDT details', () => {
        expect(CRYPTO_CURRENCIES).toMatchSnapshot();
      });
    });
  });
});
