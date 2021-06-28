import { createMuiTheme, ThemeProvider, Button } from '@material-ui/core';
import amber from '@material-ui/core/colors/amber';
import lime from '@material-ui/core/colors/lime';
//import purple from '@material-ui/core/colors/purple';
//import green from '@material-ui/core/colors/green';
//import Navbar from './Navbar';
import Header from './Header';
import './App.css';

const theme_quiccasa = createMuiTheme({
  palette: {
    primary: {
      main: amber[100]
    },
    secondary: {
      main: lime[100]
    }
  }
});

function App() {
  return (
    <ThemeProvider theme={theme_quiccasa}>
      {/*<Navbar />*/}
      <Header />
      <Button variant="contained" color="primary">
        Primary
      </Button>
      <Button variant="contained" color="secondary">
        Secondary
      </Button>
    </ThemeProvider>
  );
}

export default App;
