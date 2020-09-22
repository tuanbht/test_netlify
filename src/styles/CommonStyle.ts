import { makeStyles } from '@material-ui/styles';
import { RobotoMediumFont } from './FontFamily';

interface ButtonProps {
  color: string;
  uppercase?: boolean;
}
export const ButtonStyle = makeStyles({
  root: {
    ...RobotoMediumFont,
    padding: 12,
    color: 'white',
    textTransform: (props: ButtonProps) => (props.uppercase ? 'uppercase' : 'unset'),
    lineHeight: '24px',
    width: '100%',
    borderRadius: 10,
    marginTop: 30,
    border: (props: ButtonProps) => `2px solid ${props.color}`,
    backgroundColor: (props: ButtonProps) => props.color,

    '&:hover': {
      backgroundColor: 'white',
      color: (props: ButtonProps) => props.color,
    },
  },
  focusVisible: {
    backgroundColor: 'white !important',
    color: (props: ButtonProps) => props.color + ' !important',
  },
});
