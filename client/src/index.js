import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from '@material-ui/core/CssBaseline';
import { AuthProvider } from "./providers/AuthProvider";
import App from "./components/App";
import reportWebVitals from "./reportWebVitals";
import theme from "./theme";
import "./index.css";

const root = document.getElementById('root');
ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <App />
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>,
  root
);

//console.log('rendered font is', window.getComputedStyle(root, null).getPropertyValue('font-family'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// function sendToAnalytics(metric) {
//   const body = JSON.stringify({[metric.name]: metric.value});
//   (navigator.sendBeacon && navigator.sendBeacon('/analytics', body)) ||
//     fetch('/analytics', {body, method: 'POST', keepalive: true});
// }

// reportWebVitals(sendToAnalytics);
reportWebVitals(console.log);
