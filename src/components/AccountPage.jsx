import React from "react";
import { Link, Redirect } from "react-router-dom";
import { useStateValue } from "../StateProvider";
import { auth } from "../firebase";

function AccountPage() {
  const [{ user }, dispatch] = useStateValue();
  const login = () => {
    auth.signOut();
  };

  if (!user) {
    return <Redirect to="/" />;
  } else {
    return (
      <div>
        <h1>My Account</h1>
        <button onClick={login}>Sign Out</button>
      </div>
    );
  }
}

export default AccountPage;
