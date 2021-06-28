import React, { useState } from "react";

const {Provider, Consumer} = React.createContext();

const AuthProvider = (props) => {
  const [auth, setAuth] = useState({authorized: false});

  const authorize = (how) => {
    setAuth({authorized: how});
  }

  return (
    <Provider value={{auth, authorize}}>
      {props.children}
    </Provider>
  )
}

export {AuthProvider, Consumer as AuthConsumer};