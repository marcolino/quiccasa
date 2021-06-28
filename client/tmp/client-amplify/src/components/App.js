import React from "react";
import { BrowserRouter } from "react-router-dom";
import Header from "./Header";
import Body from "./Body";
import Footer from "./Footer";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Body />
      <Footer />
    </BrowserRouter>
  );
}
