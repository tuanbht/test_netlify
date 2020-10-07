import React from 'react';
import Styles from './styles';
import { useSelector } from 'react-redux';
import { RootStateReducer } from 'reducers';
import { ReactComponent as Checked } from 'assets/images/icons/icon-checked.svg';

const Complete = (): React.ReactElement => {
  const styles = Styles();

  const orderDetails = useSelector((state: RootStateReducer) => state.OrderDetails);

  return (
    <div>
      <div className={styles.root}>
        <div className={styles.orderLayout}>
          <div>
            <div className={styles.merchantName}>{orderDetails.storeName}</div>
            <div className={styles.orderName}>Order #{orderDetails.orderNumber}</div>
          </div>
          <div className={styles.amount}>${orderDetails.price} USD</div>
        </div>
        <div className={styles.messageLayout}>
          <div className={styles.titleMessage}>
            <Checked className={styles.iconChecked} />
            <span>Order #{orderDetails.orderNumber}</span>
          </div>
          <div className={styles.subMessage1}>Your order has been confirmed and is out for delivery!</div>
          <div className={styles.subMessage2}>
            If you have an issues, please contact {orderDetails.storeName} at {orderDetails.storePhoneNumber}.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Complete;
