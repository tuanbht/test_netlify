import React, { useState } from 'react';
import { object, func } from 'prop-types';
import { CryptoCurrencies } from '../../../../constants/CustomerPayments';
import CryptoWalletStyles from './styles';
import { Button, Grid, InputAdornment, Modal, OutlinedInput, Paper } from '@material-ui/core';
import { ButtonStyle } from '../../../../styles/CommonStyle';
import { Color } from '../../../../styles/Varriables';
import classnames from 'classnames';
import QrCode from 'qrcode.react';

const CryptoWallet = (props: { crypto: CryptoCurrencies; nextStep: () => void }): React.ReactElement => {
  const { crypto, nextStep } = props;
  const styles = CryptoWalletStyles();
  const buttonStyle = ButtonStyle({ color: Color.tarawera });
  const qrCode = `bitcoin:${crypto.walletAddress}?amount=${crypto.amount}`;

  const [openQrCode, setOpenQrCode] = useState(false);

  const markAsPaid = (): void => {
    nextStep();
  };

  return (
    <div>
      <div className={styles.title}>To make a payment, send {crypto.shortName} to the address below</div>
      <Grid className={styles.walletInfo} container>
        <Grid item>
          <div className={styles.label}>
            <crypto.logo />
            <span className={styles.labelName}>{crypto.fullName} Amount</span>
            <span className={styles.labelAmount}>(76.25 USD)</span>
          </div>
          <div className={styles.content}>
            <OutlinedInput
              classes={{
                root: styles.contentInfo,
                input: styles.contentInfoText,
              }}
              value={crypto.amount}
              endAdornment={
                <InputAdornment className={styles.contentInfoCryptoName} position="end">
                  {crypto.shortName}
                </InputAdornment>
              }
              fullWidth
              readOnly
            />
            <Button className={classnames(buttonStyle.root, styles.copyButton)}>Copy</Button>
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
            <Button className={classnames(buttonStyle.root, styles.copyButton)}>Copy</Button>
          </div>
        </Grid>
      </Grid>
      <Modal open={openQrCode} onClose={() => setOpenQrCode(false)} className={styles.qrCodeModal}>
        <Paper elevation={3} className={styles.qrCodeContent}>
          <div className={styles.qrCodeLabel}>
            <p>{crypto.amount}</p>
            <p>{crypto.shortName}</p>
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
