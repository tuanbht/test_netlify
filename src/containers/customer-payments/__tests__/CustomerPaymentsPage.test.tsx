import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
import CustomerPayments from '../index';
import { Header, Stepper, Steps } from '../../../components/customer-payments';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { CRYPTO_CURRENCIES } from '../../../constants/CustomerPayments';
import { Button } from '@material-ui/core';
import faker from 'faker';
import CancelOrder from '../../../components/cancel-order';
import { MemoryRouter } from 'react-router-dom';

describe('CustomerPaymentsPage', () => {
  let container: ReactWrapper;
  const id = faker.random.number();
  const token = faker.random.uuid();

  beforeEach(() => {
    container = mount(
      <MemoryRouter>
        <CustomerPayments match={{ params: { id, token } }} />
      </MemoryRouter>,
    );
  });

  describe('select a crypto currency', () => {
    beforeEach(() => {
      const { ETHEREUM } = CRYPTO_CURRENCIES;
      const button = container.find({ children: [container.find(ETHEREUM.logo), ETHEREUM.fullName] }).first();
      button.simulate('click');
    });

    it('leads to wallet step with selected crypto', () => {
      const walletStep = container.find(Steps.CryptoWallet);
      expect(walletStep.getDOMNode()).toBeVisible();
      expect(walletStep.props().crypto).toBe(CRYPTO_CURRENCIES.ETHEREUM);
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

      it('leads to crypto currency step', () => {
        expect(container.find(Steps.Processing).getDOMNode()).toBeVisible();
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
