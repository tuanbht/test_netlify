import React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import DefaultTheme from './styles';
import { CssBaseline } from '@material-ui/core';
import { Router as BrowserRouter } from 'react-router-dom';
import Router from './configurations/Router';
import { history, store } from './configurations/ReduxStore';
import { Provider } from 'react-redux';

const App = (): React.ReactElement => {
  return (
    <ThemeProvider theme={DefaultTheme}>
      <CssBaseline />
      <BrowserRouter history={history}>
        <Provider store={store}>
          <Router />
        </Provider>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
