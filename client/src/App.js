import React from "react";
import "./App.css";
import Drawer from "./components/Drawer"
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./components/Home";
import Shopping from "./components/Shopping";
import Ingredients from "./components/Ingredients";
import SignUp from "./components/SignUp";
import SignInSide from "./components/SignInSide"
import Profile from "./components/Profile"
import Favorites from "./components/Favorites"
import Recipes from "./components/Recipes";

const App = () => {
  document.title = "HappyHealth";
  return (
    <Router>
      <div>
        <Drawer />
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={SignInSide} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/shopping" component={Shopping} />
          <Route exact path="/ingredients" component={Ingredients} />
          <Route exact path="/recipes" component={Recipes} />
          <Route exact path="/favorites" component={Favorites} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/favorites" component={Favorites} />
      </div>
    </Router>
  );
}

export default App;
