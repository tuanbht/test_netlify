import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import CryptoCurrency from '../index';
import { CRYPTO_CURRENCIES, OrderDetails } from 'constants/CustomerPayments';
import { testStore } from 'configurations/ConfigureTestStore';
import { Provider } from 'react-redux';
import faker from 'faker';

describe('CryptoCurrency', () => {
  const selectedCrypto = jest.fn();
  const store = testStore({
    OrderDetails: new OrderDetails(),
  });
  let container: ReactWrapper;

  describe('crypto currencies are unavailable', () => {
    it('should be disabled', () => {
      container = mount(
        <Provider store={store}>
          <CryptoCurrency selectedCrypto={selectedCrypto} />
        </Provider>,
      );

      expect(container).toMatchSnapshot();
    });
  });

  describe('crypto currencies are available', () => {
    const { ETHEREUM, USDT, USDC } = CRYPTO_CURRENCIES;

    beforeEach(() => {
      const cryptoInformation = () => ({
        amount: faker.random.number(),
        paidAmount: faker.random.number(),
        walletAddress: faker.random.uuid(),
        txHash: faker.random.uuid(),
      });

      ETHEREUM.setCryptoInformation(cryptoInformation());
      USDT.setCryptoInformation(cryptoInformation());
      USDC.setCryptoInformation(cryptoInformation());

      container = mount(
        <Provider store={store}>
          <CryptoCurrency selectedCrypto={selectedCrypto} />
        </Provider>,
      );
    });

    describe('select a crypto currency', () => {
      describe('select ETHEREUM crypto', () => {
        beforeEach(() => {
          const button = container.find({ children: [container.find(ETHEREUM.logo), ETHEREUM.fullName] }).first();
          button.simulate('click');
        });

        it('should be called with crypto ETHEREUM', () => {
          expect(selectedCrypto).toBeCalledWith(CRYPTO_CURRENCIES.ETHEREUM);
        });
      });

      describe('select USD TETHER crypto', () => {
        beforeEach(() => {
          const button = container.find({ children: [container.find(USDT.logo), USDT.fullName] }).first();
          button.simulate('click');
        });

        it('should be called with crypto USD TETHER', () => {
          expect(selectedCrypto).toBeCalledWith(CRYPTO_CURRENCIES.USDT);
        });
      });

      describe('select USD COIN crypto', () => {
        beforeEach(() => {
          const button = container.find({ children: [container.find(USDC.logo), USDC.fullName] }).first();
          button.simulate('click');
        });

        it('should be called with crypto USD COIN', () => {
          expect(selectedCrypto).toBeCalledWith(CRYPTO_CURRENCIES.USDC);
        });
      });
    });
  });
});
