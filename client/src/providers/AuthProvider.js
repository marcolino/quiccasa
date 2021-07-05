import React, { useState, createContext/*, useCallback*/ } from "react";

const initialState = { authorized: false, user: null };

const AuthContext = createContext(initialState);

const AuthProvider = (props) => {
  const [auth, setAuth] = useState(initialState);
  //const setAuthPersistent = useCallback(setAuth, [setAuth]);

  return (
    <AuthContext.Provider value={{ auth, setAuth/*: setAuthPersistent*/ }}>
      {props.children}
    </AuthContext.Provider>
  )
};

export { AuthProvider, AuthContext };
