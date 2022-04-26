import React from "react";
import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import "./NavBar.css";

const Navbar = () => {
  const { logoutUser, user } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <div className="navBar">
      <ul>
        <li className="brand">
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            <b>SOCIAL MEDIA</b>
          </Link>
        </li>
        <body>
            <nav class="navbar">
                <div class="max-width">
                    <ul class="menu">
                        <li><a href="#">Home</a></li>
                        <li><a href="#">Profile</a></li>
                        <li><a href="#">Friends</a></li>
                        <li><a href="#">Posts</a></li>
                    </ul>
                </div>
            </nav>
         </body>
        <li>
          {user ? (
            <button onClick={logoutUser}>Logout</button>
          ) : (
            <button onClick={() => navigate("/login")}>Login</button>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
