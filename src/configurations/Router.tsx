import { Route, Switch } from 'react-router-dom';
import { NOT_FOUND_PATH, ORDER_CANCELLED_PATH, ORDER_EXPIRED_PATH, ORDER_PATH } from '../constants/RouterPaths';
import InvalidOrder from '../containers/invalid-order';
import { ORDER_CANCELLED_CONTENT, ORDER_EXPIRED_CONTENT } from '../constants/InvalidOrder';
import { CustomerPayments, NotFound } from '../containers';
import React from 'react';

export const Router = (): React.ReactElement => {
  return (
    <Switch>
      <Route exact path={ORDER_CANCELLED_PATH} render={() => <InvalidOrder content={ORDER_CANCELLED_CONTENT} />} />
      <Route exact path={ORDER_EXPIRED_PATH} render={() => <InvalidOrder content={ORDER_EXPIRED_CONTENT} />} />
      <Route exact path={ORDER_PATH} component={CustomerPayments} />
      <Route path={NOT_FOUND_PATH} component={NotFound} />
    </Switch>
  );
};

export default Router;
