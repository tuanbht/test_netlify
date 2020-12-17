import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
import CustomerPayments from '../index';
import { Header, Stepper, Steps } from 'components/customer-payments';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { CRYPTO_CURRENCIES, ORDER_STATUS } from 'constants/CustomerPayments';
import { Button } from '@material-ui/core';
import faker from 'faker';
import CancelOrder from 'components/cancel-order';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { mockAxios, testStore } from 'configurations/ConfigureTestStore';
import { ORDER_DETAILS_PATH } from 'constants/ApiPaths';
import { replace } from 'lodash';
import { wait } from '@testing-library/react';
import { buildOrderDetailsResponse } from 'factories/OrderDetails';

describe('CustomerPaymentsPage', () => {
  let container: ReactWrapper;
  const orderId = faker.random.number();
  const token = faker.random.uuid();
  const orderDetailsPath = replace(ORDER_DETAILS_PATH, ':id', String(orderId));
  const store = testStore({ Credential: { orderId, token } });

  const buildContainer = (response: any): void => {
    jest.spyOn(window.location, 'assign').mockImplementation(jest.fn());
    mockAxios.onGet(orderDetailsPath).reply(200, response);

    container = mount(
      <Provider store={store}>
        <MemoryRouter>
          <CustomerPayments match={{ params: { orderId, token } }} />
        </MemoryRouter>
      </Provider>,
    );
  };

  afterEach(() => {
    mockAxios.reset();
  });

  describe('order status is in-progress', () => {
    beforeEach(() => {
      const props = {
        status: ORDER_STATUS.inProgress,
      };
      buildContainer(buildOrderDetailsResponse(props));
    });

    it('should show processing step', async () => {
      await wait(() => {
        container.update();
        expect(container.find(Steps.Processing)).toHaveLength(1);
      });
    });
  });

  describe('order status is completed', () => {
    beforeEach(() => {
      const props = {
        status: ORDER_STATUS.completed,
      };
      buildContainer(buildOrderDetailsResponse(props));
    });

    it('should show processing step', async () => {
      await wait(() => {
        container.update();
        expect(container.find(Steps.Processing)).toHaveLength(1);
      });
    });
  });

  describe('order status is delivered', () => {
    beforeEach(() => {
      const props = {
        status: ORDER_STATUS.delivered,
      };
      buildContainer(buildOrderDetailsResponse(props));
    });

    it('should show complete step', async () => {
      await wait(() => {
        container.update();
        expect(container.find(Steps.Complete)).toHaveLength(1);
      });
    });
  });

  describe('order has status is initialized and is marked as paid', () => {
    beforeEach(() => {
      const props = {
        status: ORDER_STATUS.initialized,
        markAsPaid: true,
      };
      buildContainer(buildOrderDetailsResponse(props));
    });

    it('should show processing step', async () => {
      await wait(() => {
        container.update();
        expect(container.find(Steps.Processing)).toHaveLength(1);
      });
    });
  });

  describe('order has all details', () => {
    beforeEach(() => {
      const props = {
        status: ORDER_STATUS.initialized,
        hasStoreDetails: true,
        hasCryptoUSDT: true,
        hasCryptoETH: true,
      };
      buildContainer(buildOrderDetailsResponse(props));
    });

    describe('select a crypto currency', () => {
      beforeEach(async () => {
        const { ETHEREUM } = CRYPTO_CURRENCIES;
        let button: ReactWrapper;
        await wait(() => {
          container.update();
          button = container
            .find(Button)
            .find({ children: [container.find(ETHEREUM.logo), ETHEREUM.fullName] })
            .first();
          expect(button).toHaveLength(1);
          button.simulate('click');
        });
      });

      it('leads to wallet step with selected crypto', async () => {
        await wait(() => {
          const walletStep = container.find(Steps.CryptoWallet);
          expect(walletStep).toHaveLength(1);
          expect(walletStep.props().crypto).toBe(CRYPTO_CURRENCIES.ETHEREUM);
        });
      });

      describe('go back after selected a crypto', () => {
        beforeEach(() => {
          container.find(Header).find(ArrowBackIcon).simulate('click');
        });

        it('leads to crypto currency step', () => {
          expect(container.find(Steps.CryptoCurrency).getDOMNode()).toBeVisible();
        });
      });

      describe('click mark as paid', () => {
        beforeEach(() => {
          container.find(Button).find({ children: 'Mark as Paid' }).first().simulate('click');
        });

        it('leads to processing step', () => {
          expect(container.find(Steps.Processing)).toHaveLength(1);
        });

        it('hides back button', () => {
          expect(container.find(Header).find(ArrowBackIcon)).toHaveLength(0);
        });

        it('hides cancel order button', () => {
          expect(container.find({ children: 'Cancel Order' })).toHaveLength(0);
        });
      });
    });

    describe('click on cancel button', () => {
      beforeEach(() => {
        container.find({ children: 'Cancel Order' }).first().simulate('click');
      });

      it('leads to cancel order confirmation page', () => {
        expect(container.find(CancelOrder)).toHaveLength(1);
      });

      describe('click on return to payment', () => {
        beforeEach(() => {
          container.find({ children: 'Return to payment' }).first().simulate('click');
        });

        it('returns to the previous step', () => {
          expect(container.find(Stepper)).toHaveLength(1);
        });
      });
    });
  });
});
