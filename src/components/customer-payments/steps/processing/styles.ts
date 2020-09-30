import { withStyles } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { RobotoMediumFont } from '../../../../styles/FontFamily';
import { Color } from '../../../../styles/Varriables';

const stepper = {
  stepperContainer: {
    '&.MuiStepper-root': {
      padding: 'unset',
    },
  },
  stepContainer: {
    zIndex: 2,
  },
  stepLabel: {
    fontSize: 18,
    lineHeight: '22px',
    color: Color.shuttleGray,

    '&.MuiStepLabel-label': {
      color: Color.shuttleGray,
    },
  },
  stepLabelTimer: {
    color: Color.froly,
  },
  stepLabelLink: {
    display: 'block',
    textDecoration: 'unset',
    color: Color.dodgerBlue,

    '&:hover': {
      textDecoration: 'underline',
    },
  },
};

export const linearConnector = withStyles({
  line: {
    width: 3,
    border: 0,
    backgroundColor: Color.tarawera,
    borderRadius: 1,
    position: 'absolute',
    top: -20,
    height: 70,
  },
  vertical: {
    marginLeft: 15,
    paddingBottom: 25,
    position: 'relative',
    zIndex: 1,
  },
});

export default makeStyles({
  ...stepper,

  titleContainer: {
    marginBottom: 55,
  },
  title: {
    ...RobotoMediumFont,
    fontSize: 24,
    lineHeight: '32px',
    marginBottom: 15,
  },
  subtitle: {
    fontSize: 18,
    lineHeight: '22px',
  },
  processingContainer: {
    marginBottom: 55,
  },
});
