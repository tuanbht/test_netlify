import React, { useState, useEffect } from 'react';
import Styles from './styles';
import { useSelector } from 'react-redux';
import { RootStateReducer } from 'reducers';
import { Divider, Grid } from '@material-ui/core';
import { COMPLETED_STATUS, CRYPTO_CURRENCIES } from 'constants/CustomerPayments';
import { ReactComponent as Checked } from 'assets/images/icons/icon-checked.svg';
import { ReactComponent as Warning } from 'assets/images/icons/icon-warning.svg';
import { ReactComponent as Error } from 'assets/images/icons/icon-error.svg';
import classnames from 'classnames';
import { get } from 'lodash';

const Complete = (): React.ReactElement => {
  const { PAID, OVERPAID, UNDERPAID } = COMPLETED_STATUS;
  const styles = Styles();
  const [status, setStatus] = useState(PAID);

  const orderDetails = useSelector((state: RootStateReducer) => state.OrderDetails);

  const crypto = get(CRYPTO_CURRENCIES, orderDetails.crypto, CRYPTO_CURRENCIES.ETHEREUM);

  useEffect(() => {
    if (crypto.amount > crypto.paidAmount) setStatus(UNDERPAID);
    else if (crypto.amount < crypto.paidAmount) setStatus(OVERPAID);
  }, [crypto, UNDERPAID, OVERPAID]);

  const renderMessage = () => {
    let confirmMessage = 'Order payment has been confirmed.';
    let statusBadge = <Checked className={styles.iconChecked} />;

    if (status === UNDERPAID) {
      confirmMessage = 'Order payment has been confirmed as underpaid.';
      statusBadge = <Error />;
    } else if (status === OVERPAID) {
      confirmMessage = 'Order payment has been confirmed as overpaid.';
      statusBadge = <Warning />;
    }

    return (
      <>
        <div className={styles.iconLayout}>{statusBadge}</div>
        <div className={styles.subMessage1}>
          {confirmMessage}
          You should receive an update from {orderDetails.storeName} about your order shortly.
        </div>
        <div className={styles.subMessage2}>
          If you have an issues, please contact {orderDetails.storeName} at {orderDetails.storePhoneNumber}.
        </div>
      </>
    );
  };

  return (
    <div>
      <Grid container>
        <Grid item xs={7}>
          <div className={styles.merchantName}>{orderDetails.storeName}</div>
          <div className={styles.orderName}>Order #{orderDetails.orderNumber}</div>
          <div className={styles.orderName}>Amount Paid</div>
        </Grid>
        <Grid item xs={5}>
          <span className={styles.price}>${orderDetails.price} USD</span>
          <div className={styles.amount}>
            {crypto.amount} {crypto.shortName}
          </div>
          <div className={classnames(styles.amount, status)}>
            {crypto.paidAmount} {crypto.shortName}
          </div>
        </Grid>
      </Grid>
      <Divider className={styles.line} />
      <div className={styles.messageLayout}>{renderMessage()}</div>
    </div>
  );
};

export default Complete;
