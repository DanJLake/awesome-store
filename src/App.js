import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import { auth } from "./firebase";

//Logo
import logo from "./logo.svg";

//SCSS Imports

//Component Imports
import Header from "./components/Header";
import LoginPage from "./components/LoginPage";
import AccountPage from "./components/AccountPage";

function App() {
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        //logged into account
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        //not logged into account
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
    return () => {
      //cleanup
      unsubscribe();
    };
  }, []);

  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Route path={"/login"}>
            <LoginPage />
          </Route>
          <Route path={"/account"}>
            <AccountPage />
          </Route>
          <Route path={"/"}>
            <h1>AS</h1>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
