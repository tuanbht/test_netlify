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
