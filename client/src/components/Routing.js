import React, { useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Route, Switch } from "react-router";
import Amplify from "aws-amplify";
import Home from "./Home";
import SignUp from "./Auth/SignUp";
import SignIn from "./Auth/SignIn";
import SignOut from "./Auth/SignOut";
import Profile from "./Auth/Profile";
import ForgotPassword from "./Auth/ForgotPassword";
import Searches from "./Searches";
import Listings from "./Listings";
import NotFound from "./NotFound";
import { AuthContext } from "../providers/AuthProvider";

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
  const { setAuth } = useContext(AuthContext);

  useEffect(() => {
    console.log("CONFIGURING AMPLIFY");

    const isLocalhost = Boolean(
      window.location.hostname === 'localhost' ||
      // [::1] is the IPv6 localhost address.
      window.location.hostname === '[::1]' ||
      // 127.0.0.1/8 is considered localhost for IPv4.
      window.location.hostname.match(
        /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
      )
    );
  
    const oauth = {
      domain: 'sistemisolari.auth.eu-west-1.amazoncognito.com',
      scope: ['phone', 'email', 'profile', 'openid'/*, 'aws.cognito.signin.user.admin'*/],
      responseType: 'code', // or 'token', note that REFRESH token will only be generated when the responseType is code
    };

    Amplify.configure({
      Auth: {
        oauth: {...oauth,
          redirectSignIn:  isLocalhost ? "http://localhost:3000/" : "https://quiccasa.sistemisolari.com/",
          redirectSignOut:  isLocalhost ? "http://localhost:3000/" : "https://quiccasa.sistemisolari.com/",
        },
        region: process.env.REACT_APP_REGION,
        userPoolId: process.env.REACT_APP_USER_POOL_ID,
        userPoolWebClientId: process.env.REACT_APP_USER_POOL_WEB_CLIENT_ID,
        storage: localStorage,
      },
    });

    Amplify.I18n.setLanguage('it'); // TODO ...

    Amplify.Auth.currentAuthenticatedUser()
    .then(user => {
      console.log('currentAuthenticatedUser:', user);
      setAuth({isAuthenticated: true, user});
    })
    .catch(err => console.log(err));
  
  }, [setAuth]);

  return (
    <section className={classes.section}>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signup" component={SignUp} />
        <Route path="/signin" component={SignIn} />
        <Route path="/profile" component={Profile} />
        <Route path="/signout" component={SignOut} />
        <Route path="/forgot-password" component={ForgotPassword} />
        <Route path="/searches" component={Searches} />
        <Route path="/listings" component={Listings} />
        <Route component={NotFound}/>
      </Switch>
    </section>
  );
}
