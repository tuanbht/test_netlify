import { makeStyles } from '@material-ui/styles';

export default makeStyles({
  root: {
    '&.MuiContainer-root': {
      marginBottom: 10,
      display: 'flex',
      position: 'relative',
    },
  },
  title: {
    fontSize: 20,
    lineHeight: '24px',
    margin: 'auto',
    display: 'flex',
    alignItems: 'center',

    '& span': {
      marginLeft: 8,
    },
  },
  goBack: {
    position: 'absolute',
    marginLeft: 20,
    cursor: 'pointer',
  },
  logo: {
    width: 23,
  },
});
