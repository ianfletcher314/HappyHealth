import React from "react";
import "./App.css";
import Drawer from "./components/Drawer"
import SignInSide from "./components/SignInSide"
import SearchBar from "./components/SearchBar"

const App = () => {
  return (
    <>
      <Drawer />
      <SignInSide />
      <SearchBar />
    </>
  );
};

export default App;