import { makeStyles } from '@material-ui/styles';
import { Color } from '../../styles/Varriables';
import { RobotoBoldFont } from '../../styles/FontFamily';

export default makeStyles({
  root: {
    backgroundColor: Color.wildSand,
    paddingTop: 35,
    minHeight: '100vh',
  },
  cancelOrder: {
    ...RobotoBoldFont,
    color: Color.froly,
    fontSize: 14,
    letterSpacing: 0.16,
    lineHeight: '18px',
    textAlign: 'center',
    marginTop: 42,
    cursor: 'pointer',
    '&:hover': {
      color: Color.brickRed,
    },
  },
});
