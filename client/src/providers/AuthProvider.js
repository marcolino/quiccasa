import React, { useState, createContext } from "react";

const initialState = { authorized: false, user: null };

const AuthContext = createContext(initialState);

const AuthProvider = (props) => {
  const [auth, setAuth] = useState(initialState);

  const authorize = (authorized, user) => {
    setAuth({authorized, user});
  } 

  return (
    <AuthContext.Provider value={{ auth, authorize }}>
      {props.children}
    </AuthContext.Provider>
  )
};

export { AuthProvider, AuthContext };