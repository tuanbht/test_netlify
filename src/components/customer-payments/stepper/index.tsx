import React from 'react';
import { array, number } from 'prop-types';
import { Grid, LinearProgress } from '@material-ui/core';
import StepperStyle, { LinearProgressStyle } from './styles';
import classnames from 'classnames';

interface StepperComponent {
  stepper: Array<string>;
  activeStep: number;
  children: React.ReactElement;
}

const BorderLinearProgress = LinearProgressStyle(LinearProgress);

const Stepper = (props: StepperComponent): React.ReactElement => {
  const { stepper, activeStep } = props;
  const activeStepContent = props.children;
  const stepperStyles = StepperStyle();
  const currentProcess = (100 / stepper.length) * (activeStep + 1);

  return (
    <div className={stepperStyles.root}>
      <Grid container justify="space-between">
        {stepper.map((step: string, index: number) => (
          <Grid key={step} item>
            <span className={classnames(stepperStyles.label, activeStep === index && stepperStyles.activeLabel)}>
              {step}
            </span>
          </Grid>
        ))}
      </Grid>
      <BorderLinearProgress variant="determinate" value={currentProcess} className={stepperStyles.linear} />
      <div className={stepperStyles.activeStep}>{activeStepContent}</div>
    </div>
  );
};

Stepper.propTypes = {
  stepper: array.isRequired,
  activeStep: number.isRequired,
};

export default Stepper;
