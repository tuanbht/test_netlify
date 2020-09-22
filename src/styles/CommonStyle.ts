import { makeStyles } from '@material-ui/styles';
import { RobotoMediumFont } from './FontFamily';

export const ButtonStyle = makeStyles({
  root: {
    ...RobotoMediumFont,
    padding: 12,
    color: 'white',
    textTransform: 'uppercase',
    lineHeight: '24px',
    width: '100%',
    borderRadius: 10,
    marginTop: 30,
    border: (props: { color: string }) => `2px solid ${props.color}`,
    backgroundColor: (props: { color: string }) => props.color,

    '&:hover': {
      backgroundColor: 'white',
      color: (props: { color: string }) => props.color,
    },
  },
  focused: {
    backgroundColor: 'white !important',
    color: (props: { color: string }) => props.color + ' !important',
  },
});
