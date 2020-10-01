import React, { useEffect, useState } from 'react';
import { object, func } from 'prop-types';
import { CryptoCurrencies } from '../../../../constants/CustomerPayments';
import CryptoWalletStyles from './styles';
import { Button, Grid, InputAdornment, Modal, OutlinedInput, Paper, useMediaQuery, useTheme } from '@material-ui/core';
import { ButtonStyle } from '../../../../styles/CommonStyle';
import { Color } from '../../../../styles/Varriables';
import classnames from 'classnames';
import QrCode from 'qrcode.react';
import copyText from 'copy-to-clipboard';
import { useDispatch, useSelector } from 'react-redux';
import { RootStateReducer } from '../../../../reducers';
import OrderActions from '../../../../actions/OrderActions';

const CryptoWallet = (props: { crypto: CryptoCurrencies; nextStep: () => void }): React.ReactElement => {
  const { crypto, nextStep } = props;
  const styles = CryptoWalletStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
  const buttonStyle = ButtonStyle({ color: Color.tarawera, isMobile });
  const qrCode = `${crypto.prefix}:${crypto.walletAddress}?amount=${crypto.amount}`;

  const [openQrCode, setOpenQrCode] = useState(false);
  const [isCopiedAmount, setIsCopiedAmount] = useState(false);
  const [isCopiedWallet, setIsCopiedWallet] = useState(false);
  const orderDetails = useSelector((state: RootStateReducer) => state.OrderDetails);
  const { orderId } = useSelector((state: RootStateReducer) => state.Credential);

  const dispatch = useDispatch();

  const markAsPaid = (): void => {
    const updateMarkAsPaid = async () => await dispatch(OrderActions.markAsPaidOrderAction(orderId));
    updateMarkAsPaid().then(() => dispatch(OrderActions.getOrderDetailsAction(orderId)));
    nextStep();
  };

  const copyToClipboard = (type: string, value: string | number) => {
    copyText(String(value));

    if (type === 'amount' && !isCopiedAmount) {
      setIsCopiedAmount(true);
      setIsCopiedWallet(false);
    } else if (type === 'wallet' && !isCopiedWallet) {
      setIsCopiedWallet(true);
      setIsCopiedAmount(false);
    }
  };

  useEffect(() => {
    const updateLabel = setTimeout(() => {
      setIsCopiedWallet(false);
      setIsCopiedAmount(false);
    }, 5000);
    return () => clearTimeout(updateLabel);
  }, [isCopiedAmount, isCopiedWallet]);

  return (
    <div>
      <div className={styles.title}>To make a payment, send {crypto.shortName} to the address below</div>
      <Grid className={styles.walletInfo} container>
        <Grid item>
          <div className={styles.label}>
            <crypto.logo />
            <span className={styles.labelName}>{crypto.fullName} Amount</span>
            <span className={styles.labelAmount}>(${orderDetails.price} USD)</span>
          </div>
          <div className={styles.content}>
            <OutlinedInput
              classes={{
                root: styles.contentInfo,
                input: styles.contentInfoText,
              }}
              value={crypto.amount}
              endAdornment={
                <InputAdornment className={styles.contentInfoCryptoName} position='end'>
                  {crypto.shortName}
                </InputAdornment>
              }
              fullWidth
              readOnly
            />
            <Button
              id='copy-amount'
              className={classnames(buttonStyle.root, styles.copyButton, isCopiedAmount && buttonStyle.focusVisible)}
              onClick={() => copyToClipboard('amount', crypto.amount)}
            >
              {isCopiedAmount ? 'Copied!' : 'Copy'}
            </Button>
          </div>
        </Grid>

        <Grid item className={styles.walletAddress}>
          <div className={styles.label}>
            <crypto.logo />
            <span className={styles.labelName}>{crypto.fullName} Address</span>
          </div>
          <div className={styles.content}>
            <OutlinedInput
              classes={{
                root: styles.contentInfo,
                input: styles.contentInfoText,
              }}
              value={crypto.walletAddress}
              fullWidth
              readOnly
            />
            <Button
              id='copy-wallet'
              className={classnames(buttonStyle.root, styles.copyButton, isCopiedWallet && buttonStyle.focusVisible)}
              onClick={() => copyToClipboard('wallet', crypto.walletAddress)}
            >
              {isCopiedWallet ? 'Copied!' : 'Copy'}
            </Button>
          </div>
        </Grid>
      </Grid>
      <Modal open={openQrCode} onClose={() => setOpenQrCode(false)} className={styles.qrCodeModal}>
        <Paper elevation={3} className={styles.qrCodeContent}>
          <div className={styles.qrCodeLabel}>
            <p className='amount'>{crypto.amount}</p>
            <p className='short-name'>{crypto.shortName}</p>
          </div>
          <QrCode value={qrCode} />
        </Paper>
      </Modal>
      <Button className={styles.qrCodeButton} onClick={() => setOpenQrCode(true)}>
        QR Code
      </Button>
      <Button className={styles.paidButton} onClick={markAsPaid}>
        Mark as Paid
      </Button>
    </div>
  );
};

CryptoWallet.propTypes = {
  crypto: object.isRequired,
  nextStep: func.isRequired,
};

export default CryptoWallet;
