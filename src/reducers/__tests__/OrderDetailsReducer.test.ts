import { ActionSuccessfully, GET_ORDER_DETAILS } from 'constants/ReduxActions';
import { AnyAction } from '@reduxjs/toolkit';
import { CRYPTO_CURRENCIES, ORDER_STATUS, OrderDetails } from 'constants/CustomerPayments';
import OrderDetailsReducer from '../OrderDetailsReducer';
import { ORDER_CANCELLED_PATH, ORDER_EXPIRED_PATH } from 'constants/RouterPaths';
import { buildOrderDetailsResponse } from 'factories/OrderDetails';

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

    describe('order has expired time', () => {
      beforeEach(() => {
        jest.useFakeTimers();
      });

      describe('expired time is valid', () => {
        beforeEach(() => {
          action = {
            type: ActionSuccessfully(GET_ORDER_DETAILS),
            payload: {
              data: buildOrderDetailsResponse({ isExpired: false }),
            },
          };
          OrderDetailsReducer(new OrderDetails(), action);
        });

        it('redirects to expired page when expired time come', () => {
          jest.runAllTimers();
          expect(window.location.assign).toBeCalledWith(ORDER_EXPIRED_PATH);
        });
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

    describe('transaction hash', () => {
      describe('has none', () => {
        beforeEach(() => {
          action = {
            type: ActionSuccessfully(GET_ORDER_DETAILS),
            payload: {
              data: buildOrderDetailsResponse({
                hasCryptoETH: true,
                hasCryptoUSDT: true,
              }),
            },
          };
        });

        it('returns order details with empty transaction hash', () => {
          expect(OrderDetailsReducer(new OrderDetails(), action)).toMatchSnapshot();
        });
      });

      describe('has one', () => {
        describe('transaction hash ETH', () => {
          beforeEach(() => {
            action = {
              type: ActionSuccessfully(GET_ORDER_DETAILS),
              payload: {
                data: buildOrderDetailsResponse({ hasCryptoETH: true, hasHashETH: true }),
              },
            };
          });

          it('returns order details with transaction hash ETH', () => {
            expect(OrderDetailsReducer(new OrderDetails(), action)).toMatchSnapshot();
          });
        });

        describe('transaction hash USDT', () => {
          beforeEach(() => {
            action = {
              type: ActionSuccessfully(GET_ORDER_DETAILS),
              payload: {
                data: buildOrderDetailsResponse({ hasCryptoUSDT: true, hasHashUSDT: true }),
              },
            };
          });

          it('returns order details with transaction hash USDT', () => {
            expect(OrderDetailsReducer(new OrderDetails(), action)).toMatchSnapshot();
          });
        });
      });

      describe('has many', () => {
        beforeEach(() => {
          action = {
            type: ActionSuccessfully(GET_ORDER_DETAILS),
            payload: {
              data: buildOrderDetailsResponse({
                hasCryptoETH: true,
                hasHashETH: true,
                hasCryptoUSDT: true,
                hasHashUSDT: true,
              }),
            },
          };
        });

        it('returns order details with the first transaction hash', () => {
          expect(OrderDetailsReducer(new OrderDetails(), action)).toMatchSnapshot();
        });
      });
    });
  });
});
