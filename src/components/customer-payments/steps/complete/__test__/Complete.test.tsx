import { mount } from 'enzyme';
import React from 'react';
import Complete from '../index';
import { Provider } from 'react-redux';
import { testStore } from 'configurations/ConfigureTestStore';
import { HardCodedOrderDetails } from 'factories/OrderDetails';
import { CRYPTO_CURRENCIES } from 'constants/CustomerPayments';

describe('Complete', () => {
  const orderDetails: OrderDetails = HardCodedOrderDetails;

  const renderContainer = (orderDetails: OrderDetails) => {
    const store = testStore({
      OrderDetails: orderDetails,
    });

    return mount(
      <Provider store={store}>
        <Complete />
      </Provider>,
    );
  };

  describe('order is paid', () => {
    beforeEach(() => {
      CRYPTO_CURRENCIES.ETHEREUM.amount = 1;
      CRYPTO_CURRENCIES.ETHEREUM.paidAmount = 1;
    });

    it('renders template correctly', () => {
      expect(renderContainer(orderDetails)).toMatchSnapshot();
    });
  });

  describe('order is underpaid', () => {
    beforeEach(() => {
      CRYPTO_CURRENCIES.ETHEREUM.amount = 1;
      CRYPTO_CURRENCIES.ETHEREUM.paidAmount = 0.8;
    });

    it('renders template correctly', () => {
      expect(renderContainer(orderDetails)).toMatchSnapshot();
    });
  });

  describe('order is overpaid', () => {
    beforeEach(() => {
      CRYPTO_CURRENCIES.ETHEREUM.amount = 1;
      CRYPTO_CURRENCIES.ETHEREUM.paidAmount = 1.2;
    });

    it('renders template correctly', () => {
      expect(renderContainer(orderDetails)).toMatchSnapshot();
    });
  });
});
