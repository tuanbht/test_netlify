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
          margin: 'auto',
          maxWidth: 380,
          color: Color.tarawera,
          backgroundColor: Color.wildSand,
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
