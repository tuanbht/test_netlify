import React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import DefaultTheme from './styles';
import { CssBaseline } from '@material-ui/core';
import { BrowserRouter } from 'react-router-dom';
import Router from './configurations/Router';

const App = (): React.ReactElement => {
  return (
    <ThemeProvider theme={DefaultTheme}>
      <CssBaseline />
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
