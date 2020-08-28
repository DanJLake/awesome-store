import React, { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { useStateValue } from "../StateProvider";
import { db, auth } from "../firebase";

//SCSS Imports
import "./scss/accountpage.scss";

function AccountPage() {
  const [{ user, dbUser }, dispatch] = useStateValue();
  const [userFirstName, setUserFirstName] = useState();
  const [userLastName, setUserLastName] = useState();
  const [userBirthDate, setUserBirthDate] = useState();

  const login = () => {
    auth.signOut();
  };

  if (!user) {
    return <Redirect to="/" />;
  } else {
    // const getUserValues = () => {
    db.collection("users")
      //.where("email", "==", user.email)
      .doc(user.email)
      .get()
      .then((doc) => {
        const data = doc.data();

        setUserFirstName(data.firstName);
        setUserLastName(data.lastName);
        setUserBirthDate(data.birthDate);
      });
    // };

    return (
      <div className="account-page">
        <h1>My Account</h1>
        <p>
          <strong>Email Address</strong>
          <br />
          {user.email}
        </p>
        <p>
          <strong>Name</strong>
          <br />
          {userFirstName + " " + userLastName}
        </p>
        <p>
          <strong>Birth Date</strong>
          <br />
          {userBirthDate}
        </p>
        <span className="account-page-button-container">
          <button className="edit-details-button">Edit Account Details</button>
          <button onClick={login} className="sign-out-button">
            Sign Out
          </button>
        </span>
      </div>
    );
  }
}

export default AccountPage;
