import React from 'react';
import { ReactComponent as IconBTC } from '../assets/images/icons/icon-btc.svg';
import { ReactComponent as IconETH } from '../assets/images/icons/icon-eth.svg';
import { ReactComponent as IconUSDT } from '../assets/images/icons/icon-usdt.svg';
import moment from 'moment';

export const RETRIEVE_ORDER_DETAILS_INTERVAL = 5000; //ms

export const STEPS = {
  UNDEFINED: -1,
  CRYPTO: 0,
  WALLET: 1,
  PROCESSING: 2,
  COMPLETE: 3,
};

export const ORDER_STATUS = {
  undefined: 'undefined',
  initialized: 'initialized',
  inProgress: 'in_progress',
  completed: 'completed',
  delivered: 'delivered',
  cancelled: 'cancelled',
  expired: 'expired',
};

export const buildProcessingSteps = (
  storeName: string,
  markAsPaidTime: number,
): Array<{
  title: string;
  timer?: string;
  hyperLink?: { label: string; link: string };
}> => [
  {
    title: 'Crypto Request received by ' + storeName,
  },
  {
    title: 'Crypto Payment link sent',
  },
  {
    title: 'Customer Payment Confirmed',
    timer: markAsPaidTime
      ? moment(markAsPaidTime * 1000)
          .format('LT')
          .toLocaleLowerCase()
      : '',
  },
  {
    title: 'Payment processing on blockchain',
    hyperLink: {
      label: '(view on Block Explorer)',
      // TODO: This link will be replaced with real data from api when it's available
      link: 'https://etherscan.io/',
    },
  },
  {
    title: 'Payment Confirmed!',
  },
  {
    title: 'Order out for delivery',
  },
];

export interface OrderDetails {
  status: string;
  orderNumber: number;
  price: number;
  storeName: string;
  storePhoneNumber: string;
  markAsPaid: boolean;
  markAsPaidTime: number;
  isEmpty: () => boolean;
}

export class OrderDetails {
  constructor() {
    this.status = ORDER_STATUS.undefined;
    this.storeName = '';
    this.storePhoneNumber = '';
    this.orderNumber = 0;
    this.markAsPaid = false;
    this.markAsPaidTime = 0;
  }

  isEmpty = (): boolean => this.orderNumber === 0 && this.status === ORDER_STATUS.undefined;
}

export interface CryptoCurrencies {
  prefix: string;
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
    prefix: string,
    shortName: string,
    fullName: string,
    logo: React.FC<React.SVGProps<SVGSVGElement>>,
  ): CryptoCurrencies {
    const crypto = new CryptoCurrencies();
    crypto.prefix = prefix;
    crypto.shortName = shortName;
    crypto.fullName = fullName;
    crypto.logo = logo;
    crypto.amount = 0;
    crypto.walletAddress = '';
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
  BITCOIN: CryptoCurrencies.initWithData('bitcoin', 'BTC', 'Bitcoin', IconBTC),
  ETHEREUM: CryptoCurrencies.initWithData('ethereum', 'ETH', 'Ethereum', IconETH),
  USDT: CryptoCurrencies.initWithData('usdt', 'USDT', 'USD Tether', IconUSDT),
};
