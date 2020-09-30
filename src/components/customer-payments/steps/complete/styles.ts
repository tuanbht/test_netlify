import { makeStyles } from '@material-ui/styles';
import { RobotoMediumFont } from '../../../../styles/FontFamily';
import { Color } from '../../../../styles/Varriables';

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
  },
  orderName: {
    fontSize: 20,
    lineHeight: '24px',
  },
  amount: {
    ...RobotoMediumFont,
    fontSize: 24,
    lineHeight: '32px',
    textTransform: 'uppercase',
    flexGrow: 1,
    textAlign: 'end',
  },
  messageLayout: {
    padding: '0px 28px',
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
  iconChecked: {
    width: 27,
    height: 27,
    marginRight: 11,

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
    marginTop: 43,
    marginBottom: 173,
  },
});
