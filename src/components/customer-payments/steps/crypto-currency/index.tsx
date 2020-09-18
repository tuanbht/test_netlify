import { Button, Divider, Grid } from '@material-ui/core';
import React from 'react';
import CryptoCurrencyStyle from './styles';
import { ButtonStyle } from '../../../../styles/CommonStyle';

import { Color } from '../../../../styles/Varriables';
import { func } from 'prop-types';
import { CRYPTO_CURRENCIES, CryptoCurrencies } from '../../../../constants/CustomerPayments';

const CryptoCurrency = (props: { selectedCrypto: (crypto: CryptoCurrencies) => void }): React.ReactElement => {
  const { selectedCrypto } = props;
  const { BITCOIN, ETHEREUM, USDT } = CRYPTO_CURRENCIES;
  const styles = CryptoCurrencyStyle();
  const IconBTC = BITCOIN.logo;
  const IconETH = ETHEREUM.logo;
  const IconUSDT = USDT.logo;

  return (
    <div>
      <Grid container justify="space-between">
        <Grid item>
          <div className={styles.merchantName}>Ohana</div>
          <div className={styles.orderName}>Order #8867</div>
        </Grid>
        <Grid item>
          <span className={styles.amount}>$76.25 USD</span>
        </Grid>
      </Grid>
      <Divider className={styles.divider} />
      <div className={styles.selectCrypto}>
        <div className={styles.selectTitle}>Select a Cryptocurrency</div>
        <Button className={ButtonStyle({ color: Color.treePoppy }).root} disabled>
          <IconBTC className={styles.iconCrypto} />
          {BITCOIN.fullName}
        </Button>
        <Button className={ButtonStyle({ color: Color.cornflowerBlue }).root} onClick={() => selectedCrypto(ETHEREUM)}>
          <IconETH className={styles.iconCrypto} />
          {ETHEREUM.fullName}
        </Button>
        <Button className={ButtonStyle({ color: Color.jungleGreen }).root} disabled>
          <IconUSDT className={styles.iconCrypto} />
          {USDT.fullName}
        </Button>
      </div>
    </div>
  );
};

CryptoCurrency.propTypes = {
  selectedCrypto: func.isRequired,
};

export default CryptoCurrency;
