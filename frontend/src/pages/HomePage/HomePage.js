import React from "react";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import "./HomePage.css";

const HomePage = () => {
  const { user } = useContext(AuthContext);
  return <h1 className="container">Home Page for {user.name}!
  <body>
    <nav class="navbar">
        <div class="max-width">
            <ul class="menu">
                <li><a href="#">Home</a></li>
                <li><a href="#">Profile</a></li>
                <li><a href="#">Friends</a></li>
                <li><a href="#">Posts</a></li>
            </ul>
            <div class="menu-btn">
                <i class="fas fa-bars"></i>
            </div>
        </div>
    </nav>
    </body>
    </h1>;
};

export default HomePage;
