import React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import DefaultTheme from './styles';
import { CssBaseline } from '@material-ui/core';
import CustomerPaymentsPage from './containers/customer-payments';

const App = (): React.ReactElement => {
  return (
    <ThemeProvider theme={DefaultTheme}>
      <CssBaseline />
      <CustomerPaymentsPage />
    </ThemeProvider>
  );
};

export default App;
