import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Route, Switch } from "react-router";
import Amplify from "aws-amplify";
import Home from "./Home";
import SignUp from "./Auth/SignUp";
import SignIn from "./Auth/SignIn";
import Searches from "./Searches";
import News from "./News";
import Blog from "./Blog";
import Post from "./Post";

const useStyles = makeStyles(theme => ({
  section: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'left',
    padding: theme.spacing(2),
  },
}));

export default function Routing() {
	const classes = useStyles();

  useEffect(() => {
    Amplify.configure({
      Auth: {
        oauth: {
          domain: 'sistemisolari.auth.eu-west-1.amazoncognito.com',
          scope: ['phone', 'email', 'profile', 'openid'/*, 'aws.cognito.signin.user.admin'*/],
          redirectSignIn: 'http://localhost:3000/',
          redirectSignOut: 'http://localhost:3000/',
          responseType: 'code'
        },
        region: process.env.REACT_APP_REGION,
        userPoolId: process.env.REACT_APP_USER_POOL_ID,
        userPoolWebClientId: process.env.REACT_APP_USER_POOL_WEB_CLIENT_ID,
      },
    });
  });

  /*
  const HANDLE_DEV_AND_PROD = () => {
    const isLocalhost = Boolean(
      window.location.hostname === 'localhost' ||
        // [::1] is the IPv6 localhost address.
        window.location.hostname === '[::1]' ||
        // 127.0.0.1/8 is considered localhost for IPv4.
        window.location.hostname.match(
          /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
        )
    );
    
    // by default, say it's localhost
    const oauth = {
      domain: 'sistemisolari.auth.eu-west-1.amazoncognito.com',
      scope: ['phone', 'email', 'profile', 'openid'/*, 'aws.cognito.signin.user.admin'* /],
      redirectSignIn: 'http://localhost:3000/',
      redirectSignOut: 'http://localhost:3000/',
      responseType: 'code', // or 'token', note that REFRESH token will only be generated when the responseType is code
    };
    
    // if not, update the URLs
    if (!isLocalhost) {
      oauth.redirectSignIn = 'https://quiccasa.sistemisolari.com/';
      oauth.redirectSignOut = 'https://quiccasa.sistemisolari.com/';
    }
    
    var config = {
      Auth: {
        oauth: oauth,
        region: process.env.REACT_APP_REGION,
        userPoolId: process.env.REACT_APP_USER_POOL_ID,
        userPoolWebClientId: process.env.REACT_APP_USER_POOL_WEB_CLIENT_ID,
      },
    };

    // configure Amplify
    Amplify.configure(config);
  }
  */

  return (
    <section className={classes.section}>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signup" component={SignUp} />
        <Route path="/signin" component={SignIn} />
        <Route path="/searches" component={Searches} />
        <Route path="/news" component={News} />
        <Route path="/blog" component={Blog} />
        <Route path="/post/:slug" component={Post} />
      </Switch>
    </section>
  );
  // <div className={classes.section}>
  // </div>
}
