import { Container } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Header, Stepper, Steps } from '../../components/customer-payments';
import Styles from './styles';
import { CryptoCurrencies, ORDER_STATUS, STEPS } from '../../constants/CustomerPayments';
import CancelOrder from '../../components/cancel-order';
import { useDispatch, useSelector } from 'react-redux';
import OrderActions from '../../actions/OrderActions';
import CredentialActions from '../../actions/CredentialActions';
import { RootStateReducer } from '../../reducers';

const CustomerPayments = (props: { match: { params: { orderId: number; token: string } } }): React.ReactElement => {
  const steps = ['Crypto', 'Price/Wallet', 'Processing', 'Complete'];
  const styles = Styles();
  const { orderId, token } = props.match.params;
  const dispatch = useDispatch();

  const [step, setStep] = useState(STEPS.UNDEFINED);
  const [crypto, setCrypto] = useState(new CryptoCurrencies());
  const [isCancelled, setIsCancelled] = useState(false);

  const orderDetails = useSelector((state: RootStateReducer) => state.OrderDetails);

  useEffect(() => {
    dispatch(CredentialActions.saveCredentialAction(token, orderId));
    dispatch(OrderActions.getOrderDetailsAction(orderId));
  }, [orderId, token, dispatch]);

  useEffect(() => {
    switch (orderDetails.status) {
      case ORDER_STATUS.undefined:
        setStep(STEPS.UNDEFINED);
        break;
      case ORDER_STATUS.inProgress:
      case ORDER_STATUS.completed:
        setStep(STEPS.PROCESSING);
        break;
      case ORDER_STATUS.delivered:
        setStep(STEPS.COMPLETE);
        break;
      default:
        setStep(orderDetails.markAsPaid ? STEPS.PROCESSING : STEPS.CRYPTO);
        break;
    }
  }, [orderDetails]);

  const selectedCrypto = (crypto: CryptoCurrencies) => {
    setStep(STEPS.WALLET);
    setCrypto(crypto);
  };

  const activeStep = (): React.ReactElement => {
    switch (step) {
      case STEPS.WALLET:
        return <Steps.CryptoWallet crypto={crypto} nextStep={() => setStep(STEPS.PROCESSING)} />;
      case STEPS.PROCESSING:
        return <Steps.Processing />;
      case STEPS.COMPLETE:
        return <Steps.Complete />;
      default:
        return <Steps.CryptoCurrency selectedCrypto={selectedCrypto} />;
    }
  };

  return orderDetails.isEmpty() ? (
    <></>
  ) : (
    <div className={styles.root}>
      <Header goBack={() => setStep(STEPS.CRYPTO)} showBack={!isCancelled && step === STEPS.WALLET} />
      {isCancelled ? (
        <>
          <CancelOrder />
          <div className={styles.cancelOrder} onClick={() => setIsCancelled(false)}>
            Return to payment
          </div>
        </>
      ) : (
        <>
          <Container>
            <Stepper stepper={steps} activeStep={step}>
              {step !== STEPS.UNDEFINED ? activeStep() : <></>}
            </Stepper>
          </Container>
          {step < STEPS.PROCESSING && (
            <div className={styles.cancelOrder} onClick={() => setIsCancelled(true)}>
              Cancel Order
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CustomerPayments;
