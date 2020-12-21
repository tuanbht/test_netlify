import { Button, Divider, Grid } from '@material-ui/core';
import React from 'react';
import CryptoCurrencyStyle from './styles';
import { ButtonStyle } from 'styles/CommonStyle';
import { Color } from 'styles/Varriables';
import { func } from 'prop-types';
import { CRYPTO_CURRENCIES, CryptoCurrencies } from 'constants/CustomerPayments';
import { useSelector } from 'react-redux';
import { RootStateReducer } from 'reducers';

const CryptoCurrency = (props: { selectedCrypto: (crypto: CryptoCurrencies) => void }): React.ReactElement => {
  const { selectedCrypto } = props;
  const { ETHEREUM, USDT, USDC } = CRYPTO_CURRENCIES;
  const styles = CryptoCurrencyStyle();
  const IconETH = ETHEREUM.logo;
  const IconUSDT = USDT.logo;
  const IconUSDC = USDC.logo;

  const orderDetails = useSelector((state: RootStateReducer) => state.OrderDetails);

  return (
    <div>
      <Grid container justify='space-between'>
        <Grid item>
          <div className={styles.merchantName}>{orderDetails.storeName}</div>
          <div className={styles.orderName}>Order #{orderDetails.orderNumber}</div>
        </Grid>
        <Grid item>
          <span className={styles.amount}>${orderDetails.price} USD</span>
        </Grid>
      </Grid>
      <Divider className={styles.divider} />
      <div className={styles.selectCrypto}>
        <div className={styles.selectTitle}>Select a Cryptocurrency</div>
        <Button
          classes={ButtonStyle({ color: Color.cornflowerBlue, isUppercase: true })}
          onClick={() => selectedCrypto(ETHEREUM)}
          disabled={ETHEREUM.amount === 0}
        >
          <IconETH className={styles.iconCrypto} />
          {ETHEREUM.fullName}
        </Button>
        <Button
          classes={ButtonStyle({ color: Color.jungleGreen, isUppercase: true })}
          onClick={() => selectedCrypto(USDT)}
          disabled={USDT.amount === 0}
        >
          <IconUSDT className={styles.iconCrypto} />
          {USDT.fullName}
        </Button>
        <Button
          classes={ButtonStyle({ color: Color.mariner, isUppercase: true })}
          onClick={() => selectedCrypto(USDC)}
          disabled={USDC.amount === 0}
        >
          <IconUSDC className={styles.iconCrypto} />
          {USDC.fullName}
        </Button>
      </div>
    </div>
  );
};

CryptoCurrency.propTypes = {
  selectedCrypto: func.isRequired,
};

export default CryptoCurrency;
