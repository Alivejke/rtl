import React from "react";
import { Link } from "react-router-dom";

import "./styles.scss";

export default function MainMenu() {
  return (
    <div className="main-menu">
      <ul className="main-menu__list">
        <li className="main-menu__list-item">
          <Link className="main-menu__link" to="/">
            Home
          </Link>
        </li>
      </ul>
    </div>
  );
}
