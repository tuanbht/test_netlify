import { makeStyles } from '@material-ui/styles';
import { Color } from '../../styles/Varriables';
import { RobotoMediumFont } from '../../styles/FontFamily';

export default makeStyles({
  root: {
    backgroundColor: Color.wildSand,
    paddingTop: 35,
    margin: 15,
  },
  content: {
    backgroundColor: 'white',
    border: '1px solid',
    borderColor: Color.gallery,
    borderRadius: 10,
    boxShadow: `0px 3px 6px ${Color.boxShadow}`,
    padding: '28px 17px',
  },
  title: {
    ...RobotoMediumFont,
    fontSize: 24,
    lineHeight: '30px',
    marginTop: 130,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    lineHeight: '22px',
    marginTop: 15,
    marginBottom: 200,
    textAlign: 'left',
  },
  cancelButton: {
    textDecoration: 'none',
  },
});
