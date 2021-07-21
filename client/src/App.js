import React, { Component, createContext, useState  } from 'react';
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
import Logout from "./components/Logout";
import DrawerLoggedOut from "./components/DrawerLoggedOut";


export const UserContext = createContext({
  loggedIn: false
})

function  App () {

  const [user, setUser] = useState({
    loggedIn: false,
  })
  

return(
  
    <Router>
      <UserContext.Provider value={{user, setUser}}>
      <div>

      {(user.loggedIn ) ? <Drawer /> : <DrawerLoggedOut/>}
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={SignInSide} />
          <Route exact path="/recipes" component={Recipes} />
          <Route exact path="/favorites" component={Favorites} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/logout" component={Logout} />
      </div>
      </UserContext.Provider>
    </Router>
  
)
}
export default App;
