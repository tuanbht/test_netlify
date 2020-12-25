import { makeStyles } from '@material-ui/styles';
import { RobotoMediumFont } from './FontFamily';

interface ButtonProps {
  color: string;
  isMobile?: boolean;
  isUppercase?: boolean;
  marginTop?: number;
}
export const ButtonStyle = makeStyles({
  root: {
    ...RobotoMediumFont,
    padding: 12,
    color: 'white',
    textTransform: (props: ButtonProps) => (props.isUppercase ? 'uppercase' : 'unset'),
    lineHeight: '24px',
    width: '100%',
    borderRadius: 10,
    marginTop: (props: ButtonProps) => (props.marginTop ? props.marginTop : 30),
    border: (props: ButtonProps) => `2px solid ${props.color}`,
    backgroundColor: (props: ButtonProps) => props.color,

    '&:hover': {
      backgroundColor: (props: ButtonProps) => (!props.isMobile ? 'white' : props.color),
      color: (props: ButtonProps) => (props.isMobile ? 'white' : props.color),
    },
  },
  focusVisible: {
    backgroundColor: 'white !important',
    color: (props: ButtonProps) => props.color + ' !important',
  },
});
