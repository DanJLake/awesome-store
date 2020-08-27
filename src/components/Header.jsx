import React from "react";
import { Link } from "react-router-dom";
import { useStateValue } from "../StateProvider";
import { auth } from "../firebase";

//SCSS Imports
import "./scss/header.scss";

function Header() {
  const [{ basket, user }] = useStateValue();
  console.log(user);
  return (
    <header>
      <Link to="/">
        <img
          src="https://scontent.flhr3-2.fna.fbcdn.net/v/t31.0-8/11822969_10153600874898953_6149000137288810100_o.jpg?_nc_cat=107&_nc_sid=174925&_nc_ohc=T4cpkIpGvXcAX8uDOgT&_nc_ht=scontent.flhr3-2.fna&oh=7f96a9b436e85b354f032053b3bdf90b&oe=5F6F0B33"
          alt=""
        />
      </Link>
      <nav>
        <ul>
          <li>
            {user ? (
              <Link to="/account">My Account</Link>
            ) : (
              <Link to="/login">Log In / Register</Link>
            )}
          </li>
          <li>
            <Link to="/">Link 2</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
