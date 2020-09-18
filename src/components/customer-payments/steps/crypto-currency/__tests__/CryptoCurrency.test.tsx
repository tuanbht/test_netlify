import React from 'react';
import { shallow } from 'enzyme';
import CryptoCurrency from '../index';
import { CRYPTO_CURRENCIES } from '../../../../../constants/CustomerPayments';

describe('CryptoCurrency', () => {
  const selectedCrypto = jest.fn();
  const container = shallow(<CryptoCurrency selectedCrypto={selectedCrypto} />);
  const { BITCOIN, ETHEREUM, USDT } = CRYPTO_CURRENCIES;
  it('renders template correctly', () => {
    expect(container).toMatchSnapshot();
  });

  describe('select a crypto currency', () => {
    describe('select BITCOIN crypto', () => {
      beforeEach(() => {
        const button = container.find({ children: [container.find(BITCOIN.logo), BITCOIN.fullName] });
        button.simulate('click');
      });

      it('should not be called with crypto BITCOIN', () => {
        expect(selectedCrypto).not.toBeCalledWith(CRYPTO_CURRENCIES.BITCOIN);
      });
    });

    describe('select ETHEREUM crypto', () => {
      beforeEach(() => {
        const button = container.find({ children: [container.find(ETHEREUM.logo), ETHEREUM.fullName] });
        button.simulate('click');
      });

      it('should be called with crypto ETHEREUM', () => {
        expect(selectedCrypto).toBeCalledWith(CRYPTO_CURRENCIES.ETHEREUM);
      });
    });

    describe('select USD TETHER crypto', () => {
      beforeEach(() => {
        const button = container.find({ children: [container.find(USDT.logo), USDT.fullName] });
        button.simulate('click');
      });

      it('should not be called with crypto USD TETHER', () => {
        expect(selectedCrypto).not.toBeCalledWith(CRYPTO_CURRENCIES.USDT);
      });
    });
  });
});
