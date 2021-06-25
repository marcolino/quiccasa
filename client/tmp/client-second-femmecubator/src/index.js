
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
//import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Header from './Header';

ReactDOM.render(
  <React.StrictMode>
{/*
    <Router>
      <App />
      <Switch>
        <Route path="/about">
          <div>about</div>
        </Route>
        <Route path="/listings">
          <Listings/>
        </Route>
        <Route path="/">
          <div>home</div>
        </Route>
      </Switch>
    </Router>
*/}
   <Router>
   <Header />

      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Listings</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/listings">
            <Listings />
          </Route>
        </Switch>
      </div>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

function Listings() {
  return <h2>Listings</h2>;
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
function sendToAnalytics(metric) {
  const body = JSON.stringify({[metric.name]: metric.value});
  (navigator.sendBeacon && navigator.sendBeacon('/analytics', body)) ||
    fetch('/analytics', {body, method: 'POST', keepalive: true});
}

reportWebVitals(sendToAnalytics);
