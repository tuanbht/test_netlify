import { shallow } from 'enzyme';
import React from 'react';
import Processing from '../index';

describe('CryptoWallet', () => {
  it('renders template correctly', () => {
    expect(shallow(<Processing />)).toMatchSnapshot();
  });
});
