import React from 'react';
import { ReactComponent as IconBTC } from '../assets/images/icons/icon-btc.svg';
import { ReactComponent as IconETH } from '../assets/images/icons/icon-eth.svg';
import { ReactComponent as IconUSDT } from '../assets/images/icons/icon-usdt.svg';
import moment from 'moment';

export const STEPS = {
  CRYPTO: 0,
  WALLET: 1,
  PROCESSING: 2,
  COMPLETE: 3,
};

export const buildProcessingSteps = (
  confirmedTime: moment.MomentInput,
  linkToBlockchain: string,
): Array<{ title: string; timer?: string; hyperLink?: { label: string; link: string } }> => [
  {
    title: 'Crypto Request received by Ohana',
  },
  {
    title: 'Crypto Payment link sent',
  },
  {
    title: 'Customer Payment Confirmed',
    timer: moment(confirmedTime).format('LT').toLocaleLowerCase(),
  },
  {
    title: 'Payment processing on blockchain',
    hyperLink: {
      label: '(view on Block Explorer)',
      link: linkToBlockchain,
    },
  },
  {
    title: 'Payment Confirmed!',
  },
  {
    title: 'Order out for delivery',
  },
];

export interface CryptoCurrencies {
  shortName: string;
  fullName: string;
  logo: React.FC<React.SVGProps<SVGSVGElement>>;
  walletAddress: string;
  amount: number;

  setWalletAddress(walletAddress: string): void;
  setAmount(amount: number): void;
}

export class CryptoCurrencies implements CryptoCurrencies {
  static initWithData(
    shortName: string,
    fullName: string,
    logo: React.FC<React.SVGProps<SVGSVGElement>>,
  ): CryptoCurrencies {
    const crypto = new CryptoCurrencies();
    crypto.shortName = shortName;
    crypto.fullName = fullName;
    crypto.logo = logo;
    return crypto;
  }
  setWalletAddress(walletAddress: string): void {
    this.walletAddress = walletAddress;
  }
  setAmount(amount: number): void {
    this.amount = amount;
  }
}

export const CRYPTO_CURRENCIES = {
  BITCOIN: CryptoCurrencies.initWithData('BTC', 'Bitcoin', IconBTC),
  ETHEREUM: CryptoCurrencies.initWithData('ETH', 'Ethereum', IconETH),
  USDT: CryptoCurrencies.initWithData('USDT', 'USD Tether', IconUSDT),
};
