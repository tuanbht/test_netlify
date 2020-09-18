import { shallow } from 'enzyme';
import React from 'react';
import CryptoWallet from '../index';
import { CryptoCurrencies } from '../../../../../constants/CustomerPayments';

describe('CryptoWallet', () => {
  it('renders template correctly', () => {
    const crypto = new CryptoCurrencies();
    crypto.fullName = 'crypto-full-name';
    crypto.shortName = 'crypto-short-name';
    expect(shallow(<CryptoWallet crypto={crypto} />)).toMatchSnapshot();
  });
});
