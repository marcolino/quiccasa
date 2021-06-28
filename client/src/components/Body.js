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

export default function Body() {
	const classes = useStyles();

  useEffect(() => {
    Amplify.configure({
      Auth: {
        region: process.env.REACT_APP_REGION,
        userPoolId: process.env.REACT_APP_USER_POOL_ID,
        userPoolWebClientId: process.env.REACT_APP_USER_POOL_WEB_CLIENT_ID,
      },
    });
  });

  return (  
    <div className={classes.section}>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signup" component={SignUp} />
        <Route path="/signin" component={SignIn} />
        <Route path="/searches" component={Searches} />
        <Route path="/news" component={News} />
        <Route path="/blog" component={Blog} />
        <Route path="/post/:slug" component={Post} />
      </Switch>
    </div>
  );
}
