import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
import CustomerPayments from '../index';
import { Header, Steps } from '../../../components/customer-payments';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { CRYPTO_CURRENCIES } from '../../../constants/CustomerPayments';

describe('CustomerPaymentsPage', () => {
  let container: ReactWrapper;

  beforeEach(() => {
    container = mount(<CustomerPayments />);
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
  });
});
