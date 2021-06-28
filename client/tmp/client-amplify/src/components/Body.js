import React, { useEffect } from "react";
import { Route, Switch } from "react-router";
import Amplify from "aws-amplify";
import Home from "./Home";
import SignUp from "./Auth/SignUp";
import SignIn from "./Auth/SignIn";
import Searches from "./Searches";
import News from "./News";
import Blog from "./Blog";
import Post from "./Post";

export default function Body() {
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
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/signup" component={SignUp} />
      <Route path="/signin" component={SignIn} />
      <Route path="/searches" component={Searches} />
      <Route path="/news" component={News} />
      <Route path="/blog" component={Blog} />
      <Route path="/post/:slug" component={Post} />
    </Switch>
  );
}
