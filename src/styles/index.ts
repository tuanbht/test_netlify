import { createMuiTheme } from '@material-ui/core';
import { FontFaceList, RobotoRegularFont } from './FontFamily';
import { Color } from './Varriables';

export default createMuiTheme({
  typography: {
    ...RobotoRegularFont,
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '@font-face': FontFaceList,
        body: {
          color: Color.tarawera,
          backgroundColor: Color.wildSand,
        },
        '#mobile-screen': {
          margin: 'auto',
          maxWidth: 380,
        },
        '@keyframes rotating': {
          from: {
            transform: 'rotate(0deg)',
          },
          to: {
            transform: 'rotate(360deg)',
          },
        },
      },
    },
  },
});
