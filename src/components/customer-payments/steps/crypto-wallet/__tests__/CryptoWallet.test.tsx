import { mount, ReactWrapper, shallow, ShallowWrapper } from 'enzyme';
import React from 'react';
import CryptoWallet from '../index';
import { CryptoCurrencies } from '../../../../../constants/CustomerPayments';
import { Button, Modal } from '@material-ui/core';
import { act } from 'react-dom/test-utils';

jest.mock('copy-to-clipboard');

describe('CryptoWallet', () => {
  const CryptoLogo = () => React.createElement('svg');
  const crypto = CryptoCurrencies.initWithData('crypto-short-name', 'crypto-full-name', CryptoLogo);
  const nextStep = jest.fn();
  let container: ReactWrapper | ShallowWrapper;

  beforeEach(() => {
    jest.spyOn(global, 'setTimeout');
    jest.useFakeTimers();

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

  describe('copy to clipboard', () => {
    beforeEach(() => {
      container = mount(<CryptoWallet crypto={crypto} nextStep={nextStep} />);
    });

    describe('copy amount value', () => {
      const copyButton = (): ReactWrapper => (container as ReactWrapper).find(Button).find('#copy-amount').first();

      beforeEach(() => {
        copyButton().simulate('click');
      });

      it('changes text of button to copied', () => {
        expect((copyButton().props() as { children: string }).children).toBe('Copied');
      });

      it('will change to copy after 5 seconds', () => {
        act(() => {
          jest.runAllTimers();
        });
        container.update();
        expect(setTimeout).toBeCalled();
        expect((copyButton().props() as { children: string }).children).toBe('Copy');
      });
    });

    describe('copy wallet address value', () => {
      const copyButton = (): ReactWrapper => (container as ReactWrapper).find(Button).find('#copy-wallet').first();

      beforeEach(() => {
        copyButton().simulate('click');
      });

      it('changes text of button to copied', () => {
        expect((copyButton().props() as { children: string }).children).toBe('Copied');
      });

      it('will change to copy after 5 seconds', () => {
        act(() => {
          jest.runAllTimers();
        });
        container.update();
        expect(setTimeout).toBeCalled();
        expect((copyButton().props() as { children: string }).children).toBe('Copy');
      });
    });
  });
});
