import { makeStyles } from '@material-ui/styles';
import { RobotoBoldFont, RobotoMediumFont } from '../../../../styles/FontFamily';
import { Color } from '../../../../styles/Varriables';

const qrCodeModal = {
  qrCodeModal: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  qrCodeContent: {
    padding: 50,
    outline: 'unset',
  },
  qrCodeLabel: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: 18,
    lineHeight: '22px',
    color: Color.shuttleGray,

    '& .amount': {
      width: 70,
      textOverflow: 'ellipsis',
      overflow: 'hidden',
    },
  },
};

const walletInformation = {
  walletInfo: {
    marginBottom: 30,
  },
  walletAddress: {
    marginTop: 45,
    width: '100%',

    '& $contentInfoText': {
      paddingLeft: 12,
    },
  },
  label: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 12,
  },
  labelName: {
    color: 'black',
    marginLeft: 10,
  },
  labelAmount: {
    marginLeft: 25,
    color: Color.shuttleGray,
  },
  content: {
    display: 'flex',
  },
  contentInfo: {
    '&.MuiOutlinedInput-root': {
      borderRadius: '5px 0 0 5px',
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderRightWidth: 0,
      borderColor: Color.tarawera,
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: Color.tarawera,
      borderRightWidth: 0,
    },
  },
  contentInfoText: {
    color: Color.shuttleGray,
    fontSize: 18,
    lineHeight: '22px',
    textOverflow: 'ellipsis',
    padding: '10px 0 15px 22px',
  },
  contentInfoCryptoName: {
    fontSize: 16,
    lineHeight: '19px',
    color: Color.shuttleGray,
  },
  copyButton: {
    borderRadius: '0 5px 5px 0',
    width: 'auto',
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 'unset',
  },
};

export default makeStyles({
  ...qrCodeModal,
  ...walletInformation,

  title: {
    ...RobotoMediumFont,
    fontSize: 20,
    lineHeight: '26px',
    marginBottom: 25,
  },
  qrCodeButton: {
    backgroundColor: Color.gallery,
    color: Color.shuttleGray,
    textTransform: 'unset',
    padding: '12px 40px',
    fontSize: 18,
    lineHeight: '22px',
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 40,

    '&:hover': {
      backgroundColor: Color.sliver,
    },
  },
  paidButton: {
    ...RobotoBoldFont,
    backgroundColor: Color.froly,
    color: 'white',
    textTransform: 'unset',
    padding: '15px',
    width: '100%',
    fontSize: 14,
    lineHeight: '16px',
    letterSpacing: 0.16,
    marginBottom: 30,

    '&:hover': {
      backgroundColor: Color.brickRed,
    },
  },
});
