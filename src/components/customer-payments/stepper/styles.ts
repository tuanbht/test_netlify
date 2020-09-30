import { makeStyles, withStyles } from '@material-ui/styles';
import { Color } from '../../../styles/Varriables';
import { RobotoBoldFont, RobotoRegularFont } from '../../../styles/FontFamily';

export default makeStyles({
  root: {
    backgroundColor: 'white',
    border: '1px solid',
    borderColor: Color.gallery,
    borderRadius: 10,
    boxShadow: `0px 3px 6px ${Color.boxShadow}`,
    padding: '12px 15px',
  },
  label: {
    ...RobotoRegularFont,
    fontSize: 12,
    lineHeight: '14px',
  },
  activeLabel: {
    ...RobotoBoldFont,
    fontSize: 14,
    lineHeight: '19px',
  },
  linear: {
    marginTop: 13,
  },
  activeStep: {
    marginTop: 55,
    padding: '0 10px',
  },
});

export const LinearProgressStyle = withStyles({
  root: {
    height: 10,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor: Color.alto,
  },
  bar: {
    borderRadius: 5,
    backgroundColor: Color.tarawera,
  },
});
