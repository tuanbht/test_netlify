import React, { useEffect } from 'react';
import ProcessingStyles, { linearConnector } from './styles';
import { Grid, Step, StepConnector, StepIconProps, StepLabel, Stepper } from '@material-ui/core';
import { ReactComponent as IconChecked } from '../../../../assets/images/icons/icon-checked.svg';
import { ReactComponent as IconDefault } from '../../../../assets/images/icons/icon-default.svg';
import { ReactComponent as IconActive } from '../../../../assets/images/icons/icon-loading.svg';
import {
  buildProcessingSteps,
  ORDER_STATUS,
  RETRIEVE_ORDER_DETAILS_INTERVAL,
} from '../../../../constants/CustomerPayments';
import { useDispatch, useSelector } from 'react-redux';
import { RootStateReducer } from '../../../../reducers';
import OrderActions from '../../../../actions/OrderActions';

const Processing = (): React.ReactElement => {
  const styles = ProcessingStyles();
  const CustomStepConnector = linearConnector(StepConnector);
  const dispatch = useDispatch();

  const orderDetails = useSelector((state: RootStateReducer) => state.OrderDetails);
  const { orderId } = useSelector((state: RootStateReducer) => state.Credential);

  const renderStepIcon = (props: StepIconProps): React.ReactElement => {
    const { active, completed } = props;

    return <div>{active ? <IconActive /> : completed ? <IconChecked /> : <IconDefault />}</div>;
  };

  useEffect(() => {
    const intervalUpdateStatus = setInterval(() => {
      dispatch(OrderActions.getOrderDetailsAction(orderId));
    }, RETRIEVE_ORDER_DETAILS_INTERVAL);

    return () => clearInterval(intervalUpdateStatus);
  }, [orderId, dispatch]);

  const getActiveStep = (): number => {
    switch (orderDetails.status) {
      case ORDER_STATUS.inProgress:
        return 4;
      case ORDER_STATUS.completed:
        return 5;
      case ORDER_STATUS.delivered:
        return 6;
      default:
        return 3;
    }
  };

  return (
    <Grid container>
      <Grid item className={styles.titleContainer}>
        <div className={styles.title}>Order #{orderDetails.orderNumber}</div>
        <div className={styles.subtitle}>Track your progress below!</div>
      </Grid>
      <Grid item className={styles.processingContainer}>
        <Stepper
          activeStep={getActiveStep()}
          orientation='vertical'
          className={styles.stepperContainer}
          connector={<CustomStepConnector />}
        >
          {buildProcessingSteps(orderDetails.storeName, orderDetails.markAsPaidTime).map((step) => (
            <Step key={step.title} className={styles.stepContainer}>
              <StepLabel
                StepIconComponent={renderStepIcon}
                classes={{
                  label: styles.stepLabel,
                }}
              >
                {step.title}
                &nbsp;
                {step.timer && <span className={styles.stepLabelTimer}>({step.timer})</span>}
                {step.hyperLink && (
                  <a
                    className={styles.stepLabelLink}
                    href={step.hyperLink.link}
                    target='_blank'
                    rel='noopener noreferrer'
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
