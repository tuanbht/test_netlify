import { makeStyles } from '@material-ui/styles';
import { RobotoMediumFont } from '../../../../styles/FontFamily';
import { Color } from '../../../../styles/Varriables';

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
  },
  divider: {
    marginTop: 33,
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
    marginBottom: 13,
  },
  iconCrypto: {
    position: 'absolute',
    left: '25px',
  },
});