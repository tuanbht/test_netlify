import React from 'react';
import { object } from 'prop-types';
import { CryptoCurrencies } from '../../../../constants/CustomerPayments';

const CryptoWallet = (props: { crypto: CryptoCurrencies }): React.ReactElement => {
  const { crypto } = props;

  return (
    <div>
      <div className="title">To make a payment, send {crypto.shortName} to the address below</div>
    </div>
  );
};

CryptoWallet.propTypes = {
  crypto: object.isRequired,
};

export default CryptoWallet;
