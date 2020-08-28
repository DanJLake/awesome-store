import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import { auth, db } from "./firebase";

//SCSS Imports

//Component Imports
import Header from "./components/Header";
import LoginPage from "./components/LoginPage";
import AccountPage from "./components/AccountPage";

function App() {
  const [{ user, dbUser }, dispatch] = useStateValue();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        //logged into account
        let dbUser = db
          .collection("users")
          //.where("email", "==", user.email)
          .doc(authUser.email)
          .get()
          .then((doc) => {
            return doc.data();
          });
        dispatch({
          type: "SET_USER",
          user: authUser,
          dbUser,
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
