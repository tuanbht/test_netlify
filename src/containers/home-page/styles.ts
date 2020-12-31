import { makeStyles } from '@material-ui/styles';
import { RobotoMediumFont } from 'styles/FontFamily';

export default makeStyles({
  root: {
    height: '100vh',
    display: 'flex',
  },
  content: {
    width: 'fit-content',
    margin: 'auto',
  },
  title: {
    ...RobotoMediumFont,
    fontSize: 60,
    lineHeight: '80px',
    color: '#707070',
    marginRight: 66,
  },
  logo: {
    width: 250,
  },
});
