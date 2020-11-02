import { makeStyles } from '@material-ui/styles';
import { RobotoMediumFont } from 'styles/FontFamily';
import { Color } from 'styles/Varriables';

export default makeStyles({
  root: {
    padding: 0,
    margin: '25px -25px',
  },
  orderLayout: {
    display: 'flex',
    flexFlow: 'row',
    padding: '20px 28px',
    backgroundColor: Color.lochinvarA32,
  },
  merchantName: {
    ...RobotoMediumFont,
    fontSize: 20,
    lineHeight: '26px',
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  orderName: {
    fontSize: 20,
    lineHeight: '26px',
  },
  price: {
    fontSize: 20,
    lineHeight: '26px',
    opacity: 0.37,
    float: 'right',
    marginBottom: 6,
  },
  amount: {
    fontSize: 20,
    lineHeight: '26px',
    textTransform: 'uppercase',
    float: 'right',

    '&.paid': {
      color: Color.jungleGreen,
    },
    '&.underpaid': {
      color: Color.red,
    },
    '&.overpaid': {
      color: Color.supperNova,
    },
  },
  line: {
    marginTop: 13,
    marginBottom: 0,
    border: `3px solid ${Color.wildSand}`,
  },
  messageLayout: {
    padding: '0px 2px',
  },
  titleMessage: {
    ...RobotoMediumFont,
    fontSize: 24,
    lineHeight: '32px',
    marginTop: 73,
    color: Color.lochinvar,
    display: 'flex',
    alignItems: 'center',
  },
  iconLayout: {
    display: 'flex',
    marginTop: 60,
    marginBottom: 44,
    justifyContent: 'center',
  },
  iconChecked: {
    width: 50,
    height: 50,

    '& .icon-checked-a': {
      fill: Color.lochinvar,
      stroke: Color.lochinvar,
    },
  },
  subMessage1: {
    fontSize: 18,
    lineHeight: '22px',
    marginTop: 23,
  },
  subMessage2: {
    fontSize: 18,
    lineHeight: '22px',
    marginTop: 16,
    marginBottom: 173,
  },
});
