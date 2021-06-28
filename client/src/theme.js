//import { createMuiTheme } from "@material-ui/core/styles";
import { unstable_createMuiStrictModeTheme as createMuiTheme } from "@material-ui/core/styles"; // TODO: temporary, to solve material-ui drawer "findDOMNode is deprecated in StrictModefindDOMNode is deprecated in StrictMode" warning
import amber from '@material-ui/core/colors/amber';
import lime from '@material-ui/core/colors/lime';
import red from '@material-ui/core/colors/red';

export default createMuiTheme({
  palette: {
    primary: {
      main: amber[100],
    },
    secondary: {
      main: lime[100],
    },
  },
  status: {
    danger: red[700],
  }
});
