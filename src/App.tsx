import React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import DefaultTheme from './styles';
import { CssBaseline } from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { CustomerPayments, NotFound } from './containers';

const App = (): React.ReactElement => {
  return (
    <ThemeProvider theme={DefaultTheme}>
      <CssBaseline />
      <Router>
        <Switch>
          <Route exact path="/:id/:token" component={CustomerPayments} />
          <Route path="/" component={NotFound} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
};

export default App;
