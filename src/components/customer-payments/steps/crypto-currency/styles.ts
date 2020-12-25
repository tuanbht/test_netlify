import { makeStyles } from '@material-ui/styles';
import { RobotoMediumFont, RobotoBoldFont } from 'styles/FontFamily';
import { Color } from 'styles/Varriables';

export default makeStyles({
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
    wordBreak: 'break-word',
  },
  divider: {
    marginTop: 33,
    marginLeft: -10,
    marginRight: -10,
    height: 3,
    backgroundColor: Color.wildSand,
  },
  selectCrypto: {
    margin: '72px 0',
  },
  selectTitle: {
    ...RobotoMediumFont,
    textAlign: 'center',
    fontSize: 20,
    lineHeight: '26px',
    marginBottom: 36,
  },
  iconCrypto: {
    position: 'absolute',
    left: '25px',
  },
  disableMessage: {
    ...RobotoBoldFont,
    color: Color.froly,
    fontSize: 14,
    letterSpacing: 0.16,
    lineHeight: '18px',
    textAlign: 'center',
  },
});
