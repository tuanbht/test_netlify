import { Redirect, Route, Switch } from 'react-router-dom';
import {
  NOT_FOUND_PATH,
  ORDER_CANCELLED_PATH,
  ORDER_EXPIRED_PATH,
  ORDER_PATH,
  ROOT_PATH,
} from '../constants/RouterPaths';
import Notification from '../containers/notification-page';
import { ORDER_CANCELLED_CONTENT, ORDER_EXPIRED_CONTENT, ROOT_PAGE_CONTENT } from '../constants/NotificationContent';
import { CustomerPayments, NotFound } from '../containers';
import React from 'react';

export const Router = (): React.ReactElement => {
  return (
    <Switch>
      <Route exact path={ROOT_PATH} render={() => <Notification content={ROOT_PAGE_CONTENT} />} />
      <Route exact path={ORDER_CANCELLED_PATH} render={() => <Notification content={ORDER_CANCELLED_CONTENT} />} />
      <Route exact path={ORDER_EXPIRED_PATH} render={() => <Notification content={ORDER_EXPIRED_CONTENT} />} />
      <Route exact path={ORDER_PATH} component={CustomerPayments} />
      <Route exact path={NOT_FOUND_PATH} component={NotFound} />
      <Route render={() => <Redirect to={NOT_FOUND_PATH} />} />
    </Switch>
  );
};

export default Router;
