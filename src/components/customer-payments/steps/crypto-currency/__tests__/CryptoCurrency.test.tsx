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
  const { BITCOIN, ETHEREUM, USDT } = CRYPTO_CURRENCIES;
  let container: ReactWrapper;

  beforeEach(() => {
    const cryptoInformation = () => ({
      amount: faker.random.number(),
      paidAmount: faker.random.number(),
      walletAddress: faker.random.uuid(),
      txHash: faker.random.uuid(),
    });

    BITCOIN.setCryptoInformation(cryptoInformation());
    ETHEREUM.setCryptoInformation(cryptoInformation());
    USDT.setCryptoInformation(cryptoInformation());

    container = mount(
      <Provider store={store}>
        <CryptoCurrency selectedCrypto={selectedCrypto} />
      </Provider>,
    );
  });

  describe('select a crypto currency', () => {
    describe('select BITCOIN crypto', () => {
      beforeEach(() => {
        const button = container.find({ children: [container.find(BITCOIN.logo), BITCOIN.fullName] }).first();
        button.simulate('click');
      });

      it('should be called with crypto BITCOIN', () => {
        expect(selectedCrypto).toBeCalledWith(CRYPTO_CURRENCIES.BITCOIN);
      });
    });

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
  });
});
