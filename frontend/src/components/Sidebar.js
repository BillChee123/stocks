import React from "react";
import { Route, Link } from "react-router-dom";

export const Sidebar = () => {

  return (
    <div>
      <nav class="navbar">
        <ul class="navbar-nav">
          <li class="nav-item">
            <Link to="#" class="nav-link">
              <span class="link-text">Cats</span>
            </Link>
          </li>
          <li class="nav-item">
            <Link to="#" class="nav-link">
              <span class="link-text">Alien</span>
            </Link>
          </li>
          <li class="nav-item">
            <Link to="#" class="nav-link">
              <span class="link-text">Space</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};