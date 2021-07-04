import React from "react";
import { BrowserRouter } from "react-router-dom";
import Header from "./Header";
import Routing from "./Routing";
// import Footer from "./Footer";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routing />
      {/* <Footer /> */}
    </BrowserRouter>
  );
}
