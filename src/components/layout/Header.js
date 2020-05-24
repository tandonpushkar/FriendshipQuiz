import React from "react";
import { Link } from "react-router-dom";

const Header = () => (
  <nav
    class="navbar navbar-expand-lg navbar-dark"
    style={{ backgroundColor: "#07192f" }}>
    <Link to="/" class="navbar-brand">
      FriendshipQuiz
    </Link>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation">
      <span class="navbar-toggler-icon" />
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item ">
          <Link to="/" class="nav-link">
            Home
          </Link>
        </li>
        <li class="nav-item">
          <Link to="/quiz" class="nav-link">
            Create quiz
          </Link>
        </li>
        <li class="nav-item">
          <Link to="/about" class="nav-link">
            About
          </Link>
        </li>
      </ul>
    </div>
  </nav>
);

export default Header;

// <nav className="mr-auto">
//   <Link to="/">Home</Link>

//   <Link to="/quiz">Quiz</Link>

//   <Link to="/about">About</Link>
// </nav>
