import { Container } from '@material-ui/core';
import React, { useState } from 'react';
import { Header, Stepper, Steps } from '../../components/customer-payments';
import Styles from './styles';
import { CryptoCurrencies, STEPS } from '../../constants/CustomerPayments';

const CustomerPayments = (): React.ReactElement => {
  const steps = ['Crypto', 'Price/Wallet', 'Processing', 'Complete'];
  const styles = Styles();

  const [step, setStep] = useState(STEPS.CRYPTO);
  const [crypto, setCrypto] = useState(new CryptoCurrencies());

  const canBack = step !== STEPS.CRYPTO;

  const selectedCrypto = (crypto: CryptoCurrencies) => {
    setStep(STEPS.WALLET);
    setCrypto(crypto);
  };

  const activeStep = (): React.ReactElement => {
    switch (step) {
      case STEPS.WALLET:
        return <Steps.CryptoWallet crypto={crypto} />;
      default:
        return <Steps.CryptoCurrency selectedCrypto={selectedCrypto} />;
    }
  };

  const goBackStep = (): void => {
    switch (step) {
      case STEPS.WALLET:
        setStep(STEPS.CRYPTO);
        break;
    }
  };

  return (
    <div className={styles.root}>
      <Header goBack={goBackStep} canBack={canBack} />
      <Container>
        <Stepper stepper={steps} activeStep={step}>
          {activeStep()}
        </Stepper>
      </Container>
      <div className={styles.cancelOrder}>Cancel Order</div>
    </div>
  );
};

export default CustomerPayments;
