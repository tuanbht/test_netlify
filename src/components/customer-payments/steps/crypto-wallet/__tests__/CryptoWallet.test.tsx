import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
import CryptoWallet from '../index';
import { CryptoCurrencies } from '../../../../../constants/CustomerPayments';
import { Button, Modal } from '@material-ui/core';
import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import { testStore } from '../../../../../configurations/ConfigureTestStore';

jest.mock('copy-to-clipboard');

describe('CryptoWallet', () => {
  const CryptoLogo = () => React.createElement('svg');
  const crypto = CryptoCurrencies.initWithData('crypto-prefix', 'crypto-short-name', 'crypto-full-name', CryptoLogo);
  crypto.setWalletAddress('wallet-address');
  crypto.setAmount(0);
  const nextStep = jest.fn();
  let container: ReactWrapper;

  beforeEach(() => {
    jest.spyOn(global, 'setTimeout');
    HTMLCanvasElement.prototype.getContext = jest.fn();

    container = mount(
      <Provider store={testStore()}>
        <CryptoWallet crypto={crypto} nextStep={nextStep} />
      </Provider>,
    );
  });

  it('renders template correctly', () => {
    expect(container).toMatchSnapshot();
  });

  describe('click qr code button', () => {
    beforeEach(() => {
      container.find(Button).find({ children: 'QR Code' }).first().simulate('click');
    });

    it('should open qr code modal', () => {
      expect(container.find(Modal).props().open).toBe(true);
    });
  });

  describe('click outside of qr code modal', () => {
    beforeEach(() => {
      container.find(Button).find({ children: 'QR Code' }).first().simulate('click');
      expect(container.find(Modal).props().open).toBe(true);
      act(() => {
        container.find(Modal).props().onClose?.({}, 'backdropClick');
      });
    });

    it('should close qr code modal', async () => {
      container.update();
      expect(container.find(Modal).props().open).toBe(false);
    });
  });

  describe('click mark as paid button', () => {
    beforeEach(() => {
      container.find(Button).find({ children: 'Mark as Paid' }).first().simulate('click');
    });

    it('should call next step', () => {
      expect(nextStep).toBeCalled();
    });
  });

  describe('copy to clipboard', () => {
    describe('copy amount value', () => {
      const copyButton = (): ReactWrapper => (container as ReactWrapper).find(Button).find('#copy-amount').first();

      beforeEach(() => {
        jest.useFakeTimers();
        copyButton().simulate('click');
      });

      it('changes text of button to copied', () => {
        container.update();
        expect((copyButton().props() as { children: string }).children).toBe('Copied!');
      });

      it('will change to copy after 5 seconds', () => {
        act(() => {
          jest.runAllTimers();
        });
        expect(setTimeout).toBeCalled();
        container.update();
        expect((copyButton().props() as { children: string }).children).toBe('Copy');
      });

      describe('click on copied button', () => {
        beforeEach(() => {
          copyButton().simulate('click');
        });

        it('should not change any thing', () => {
          expect((copyButton().props() as { children: string }).children).toBe('Copied!');
        });
      });
    });

    describe('copy wallet address value', () => {
      const copyButton = (): ReactWrapper => (container as ReactWrapper).find(Button).find('#copy-wallet').first();

      beforeEach(() => {
        jest.useFakeTimers();
        copyButton().simulate('click');
      });

      it('changes text of button to copied', () => {
        expect((copyButton().props() as { children: string }).children).toBe('Copied!');
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
