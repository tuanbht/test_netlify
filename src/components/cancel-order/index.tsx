import React from 'react';
import { Link } from 'react-router-dom';
import Styles from './styles';
import { Button } from '@material-ui/core';
import { ButtonStyle } from 'styles/CommonStyle';
import { Color } from 'styles/Varriables';
import { ORDER_CANCELLED_PATH } from 'constants/RouterPaths';
import { useDispatch, useSelector } from 'react-redux';
import OrderActions from 'actions/OrderActions';
import { RootStateReducer } from 'reducers';

const CancelOrder = (): React.ReactElement => {
  const styles = Styles();
  const dispatch = useDispatch();

  const { orderId } = useSelector((state: RootStateReducer) => state.Credential);

  return (
    <div className={styles.root}>
      <div className={styles.content}>
        <div className={styles.title}>Quit the payment system?</div>
        <div className={styles.subtitle}>
          If you quit now, your crypto payment will be cancelled and you’ll have to contact your merchant to complete
          the order with cash.
        </div>
        <Link to={ORDER_CANCELLED_PATH} className={styles.cancelButton}>
          <Button
            classes={ButtonStyle({ color: Color.froly })}
            onClick={() => dispatch(OrderActions.cancelOrderAction(orderId))}
          >
            Quit Crypto Payment
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default CancelOrder;
