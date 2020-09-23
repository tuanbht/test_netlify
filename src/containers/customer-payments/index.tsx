import { Container } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Header, Stepper, Steps } from '../../components/customer-payments';
import Styles from './styles';
import { CRYPTO_CURRENCIES, CryptoCurrencies, STEPS } from '../../constants/CustomerPayments';

const CustomerPayments = (): React.ReactElement => {
  const steps = ['Crypto', 'Price/Wallet', 'Processing', 'Complete'];
  const styles = Styles();

  const [step, setStep] = useState(STEPS.CRYPTO);
  const [crypto, setCrypto] = useState(new CryptoCurrencies());
  const [showCancel, setShowCancel] = useState(true);

  useEffect(() => {
    CRYPTO_CURRENCIES.ETHEREUM.setAmount(0.0065);
    CRYPTO_CURRENCIES.ETHEREUM.setWalletAddress('0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7');
  });

  useEffect(() => {
    if (step === STEPS.PROCESSING) {
      setShowCancel(false);
    }
  }, [step]);

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
      default:
        return <Steps.CryptoCurrency selectedCrypto={selectedCrypto} />;
    }
  };

  return (
    <div className={styles.root}>
      <Header goBack={() => setStep(STEPS.CRYPTO)} showBack={step === STEPS.WALLET} />
      <Container>
        <Stepper stepper={steps} activeStep={step}>
          {activeStep()}
        </Stepper>
      </Container>
      {showCancel && <div className={styles.cancelOrder}>Cancel Order</div>}
    </div>
  );
};

export default CustomerPayments;
