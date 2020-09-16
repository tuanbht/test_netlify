import React from 'react';
import { ReactComponent as IconBTC } from '../assets/images/icons/icon-btc.svg';
import { ReactComponent as IconETH } from '../assets/images/icons/icon-eth.svg';
import { ReactComponent as IconUSDT } from '../assets/images/icons/icon-usdt.svg';

export const STEPS = {
  CRYPTO: 0,
  WALLET: 1,
  PROCESSING: 2,
  COMPLETE: 3,
};

export interface CryptoCurrencies {
  shortName: string;
  fullName: string;
  logo: React.FC<React.SVGProps<SVGSVGElement>>;
}

export class CryptoCurrencies implements CryptoCurrencies {
  constructor() {
    this.fullName = '';
    this.shortName = '';
  }
}

export const CRYPTO_CURRENCIES = {
  BITCOIN: {
    shortName: 'BTC',
    fullName: 'Bitcoin',
    logo: IconBTC,
  } as CryptoCurrencies,
  ETHEREUM: {
    shortName: 'ETH',
    fullName: 'Ethereum',
    logo: IconETH,
  } as CryptoCurrencies,
  USDT: {
    shortName: 'USDT',
    fullName: 'USD Tether',
    logo: IconUSDT,
  } as CryptoCurrencies,
};
