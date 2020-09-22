import React from 'react';
import ProcessingStyles, { linearConnector } from './styles';
import { Grid, Step, StepConnector, StepIconProps, StepLabel, Stepper } from '@material-ui/core';
import { ReactComponent as IconChecked } from '../../../../assets/images/icons/icon-checked.svg';
import { ReactComponent as IconDefault } from '../../../../assets/images/icons/icon-default.svg';
import { ReactComponent as IconActive } from '../../../../assets/images/icons/icon-loading.svg';
import { buildProcessingSteps } from '../../../../constants/CustomerPayments';

const Processing = (): React.ReactElement => {
  const styles = ProcessingStyles();
  const CustomStepConnector = linearConnector(StepConnector);
  const steps = buildProcessingSteps('2020-09-22T16:20', 'https://staging-paloma-crypto-payment.herokuapp.com/');

  const renderStepIcon = (props: StepIconProps): React.ReactElement => {
    const { active, completed } = props;

    return <div>{active ? <IconActive /> : completed ? <IconChecked /> : <IconDefault />}</div>;
  };

  return (
    <Grid container>
      <Grid item className={styles.titleContainer}>
        <div className={styles.title}>Order #11345</div>
        <div className={styles.subtitle}>Track your progress below!</div>
      </Grid>
      <Grid item className={styles.processingContainer}>
        <Stepper
          activeStep={3}
          orientation="vertical"
          className={styles.stepperContainer}
          connector={<CustomStepConnector />}
        >
          {steps.map((step) => (
            <Step key={step.title} className={styles.stepContainer}>
              <StepLabel
                StepIconComponent={renderStepIcon}
                classes={{
                  label: styles.stepLabel,
                }}
              >
                {step.title}
                {step.timer && <span className={styles.stepLabelTimer}>&nbsp;({step.timer})</span>}
                {step.hyperLink && (
                  <a
                    className={styles.stepLabelLink}
                    href={step.hyperLink.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {step.hyperLink.label}
                  </a>
                )}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </Grid>
    </Grid>
  );
};

export default Processing;
