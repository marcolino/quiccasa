//import { createMuiTheme } from "@material-ui/core/styles";
import { unstable_createMuiStrictModeTheme as createMuiTheme } from "@material-ui/core/styles"; // TODO: temporary, to solve material-ui drawer "findDOMNode is deprecated in StrictModefindDOMNode is deprecated in StrictMode" warning
import blueGrey from '@material-ui/core/colors/blueGrey';
//import indigo from '@material-ui/core/colors/indigo';
import lime from '@material-ui/core/colors/lime';
import red from '@material-ui/core/colors/red';
//import blue from '@material-ui/core/colors/blue';
import grey from '@material-ui/core/colors/grey';

// import RobotoWoff2 from './assets/fonts/roboto-v27-latin-regular.woff2';
// //import OpenSansTtf from './assets/fonts/OpenSans-Regular.ttf';

// const Roboto = {
// //const OpenSans = {
//   fontFamily: 'Open Sans',
//   fontStyle: 'normal',
//   fontDisplay: 'swap',
//   fontWeight: 400,
//   src: `
//     local('Roboto'),
//     local('Roboto-Regular'),
//     url(${RobotoWoff2}) format('woff2')
//   `,
//   unicodeRange:
//     'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF',
// };
/*
local('Open Sans'),
local('Open Sans Regular'),
url(${OpenSansTtf}) format('ttf')
*/

export default createMuiTheme({
  typography: {
    fontFamily: [
//      'Roboto',
//      'Open Sans',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
  overrides: {
    // MuiCssBaseline: {
    //   '@global': {
    //     '@font-face': [Roboto],
    //   },
    // },
    MuiInputBase: {
      input: {
        '&:-webkit-autofill': {
          transitionDelay: '9999s',
          transitionProperty: 'background-color, color',
        },
      },
    },
  },
  palette: {
    primary: {
      light: blueGrey[100],
      main: blueGrey[200],
      dark: blueGrey[300],
    },
    secondary: {
      light: lime[200],
      main: lime[300],
      dark: lime[400],
    },
    notch: { // TODO: change name, more universal
      light: grey[200],
      main: '#eaedf0',
      dark: grey[800],
    },
    headerBackground: {
      light: blueGrey[100],
      main: blueGrey[200],
      dark: blueGrey[300],
    },
    headerForeground: {
      light: grey[500],
      main: grey[700],
      dark: grey[900],
    },
    facebook: '#1877f2',
    twitter: '#1da1f2',
    google: '#db4437',
  },
  status: {
    danger: red[700],
  }
});
