import { shallow, ShallowWrapper } from 'enzyme';
import React from 'react';
import CryptoWallet from '../index';
import { CryptoCurrencies } from '../../../../../constants/CustomerPayments';
import { Button, Modal } from '@material-ui/core';

describe('CryptoWallet', () => {
  const nextStep = jest.fn();
  let container: ShallowWrapper;

  beforeEach(() => {
    const CryptoLogo = () => React.createElement('svg');
    const crypto = CryptoCurrencies.initWithData('crypto-short-name', 'crypto-full-name', CryptoLogo);

    container = shallow(<CryptoWallet crypto={crypto} nextStep={nextStep} />);
  });

  it('renders template correctly', () => {
    expect(container).toMatchSnapshot();
  });

  describe('click qr code button', () => {
    beforeEach(() => {
      container.find(Button).find({ children: 'QR Code' }).simulate('click');
    });

    it('should open qr code modal', () => {
      expect(container.find(Modal).props().open).toBe(true);
    });
  });

  describe('click outside of qr code modal', () => {
    beforeEach(() => {
      container.find(Button).find({ children: 'QR Code' }).simulate('click');
      expect(container.find(Modal).props().open).toBe(true);
      container.find(Modal).props().onClose?.({}, 'backdropClick');
    });

    it('should close qr code modal', () => {
      expect(container.find(Modal).props().open).toBe(false);
    });
  });

  describe('click mark as paid button', () => {
    beforeEach(() => {
      container.find(Button).find({ children: 'Mark as Paid' }).simulate('click');
    });

    it('should call next step', () => {
      expect(nextStep).toBeCalled();
    });
  });
});
