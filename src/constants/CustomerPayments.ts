import React from 'react';
import { ReactComponent as IconETH } from 'assets/images/icons/icon-eth.svg';
import { ReactComponent as IconUSDT } from 'assets/images/icons/icon-usdt.svg';
import { ReactComponent as IconUSDC } from 'assets/images/icons/icon-usdc.svg';
import moment from 'moment';
import { VIEW_CRYPTO_TRANSACTION } from './Common';

export const RETRIEVE_ORDER_DETAILS_INTERVAL = 5000; //ms

export const STEPS = {
  UNDEFINED: -1,
  CRYPTO: 0,
  WALLET: 1,
  PROCESSING: 2,
  COMPLETE: 3,
};

export const COMPLETED_STATUS = {
  PAID: 'paid',
  UNDERPAID: 'underpaid',
  OVERPAID: 'overpaid',
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
  txHash: string,
): Array<{
  title: string;
  timer?: string;
  hyperLink?: { label: string; link: string } | null;
}> => [
  {
    title: 'Crypto Request received by ' + storeName,
  },
  {
    title: 'Crypto Payment link sent',
  },
  {
    title: 'Customer Payment Confirmed',
    timer: markAsPaidTime ? moment(markAsPaidTime * 1000).format('MMM Do YYYY, h:mm a') : '',
  },
  {
    title: 'Payment processing on blockchain',
    hyperLink: txHash
      ? {
          label: '(view on Block Explorer)',
          link: VIEW_CRYPTO_TRANSACTION + txHash,
        }
      : null,
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
  crypto: string;

  setCrypto(crypto: string): void;
  isEmpty: () => boolean;
  equal: (orderDetails: OrderDetails) => boolean;
}

export class OrderDetails {
  constructor() {
    this.status = ORDER_STATUS.undefined;
    this.storeName = '';
    this.storePhoneNumber = '';
    this.orderNumber = 0;
    this.markAsPaid = false;
    this.markAsPaidTime = 0;
    this.crypto = 'ETHEREUM';
  }

  setCrypto(crypto: string): void {
    this.crypto = crypto;
  }

  isEmpty = (): boolean => this.orderNumber === 0 && this.status === ORDER_STATUS.undefined;

  equal = (orderDetails: OrderDetails): boolean => {
    return (
      this.status === orderDetails.status &&
      this.storePhoneNumber === orderDetails.storePhoneNumber &&
      this.storeName === orderDetails.storeName &&
      this.orderNumber === orderDetails.orderNumber &&
      this.markAsPaid === orderDetails.markAsPaid &&
      this.markAsPaidTime === orderDetails.markAsPaidTime
    );
  };
}

export interface CryptoCurrencies {
  prefix: string;
  shortName: string;
  fullName: string;
  logo: React.FC<React.SVGProps<SVGSVGElement>>;
  walletAddress: string;
  amount: number;
  paidAmount: number;
  txHash: string;

  setCryptoInformation(information: {
    amount: number;
    walletAddress: string;
    paidAmount: number;
    txHash: string;
  }): void;
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
    crypto.paidAmount = 0;
    crypto.walletAddress = '';
    crypto.txHash = '';
    return crypto;
  }

  setCryptoInformation(information: {
    amount: number;
    walletAddress: string;
    paidAmount: number;
    txHash: string;
  }): void {
    const { amount, paidAmount, walletAddress, txHash } = information;
    if (walletAddress) this.walletAddress = walletAddress;
    if (amount) this.amount = amount;
    if (paidAmount) this.paidAmount = paidAmount;
    if (txHash) this.txHash = txHash;
  }
}

export const CRYPTO_CURRENCIES = {
  ETHEREUM: CryptoCurrencies.initWithData('ethereum', 'ETH', 'Ethereum', IconETH),
  USDT: CryptoCurrencies.initWithData('usdt', 'USDT', 'USD Tether', IconUSDT),
  USDC: CryptoCurrencies.initWithData('usdc', 'USDC', 'USD Coin', IconUSDC),
};
