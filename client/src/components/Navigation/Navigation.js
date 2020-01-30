import React from "react";
import "./styles.css";
import { Link } from "react-router-dom";
import MosaicLogo from "../../assets/mosaicLogo.png";

export const Navigation = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <a
          className="Navigation__MosaicLogo"
          href="http://www.mosaic.ie/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={MosaicLogo} alt="Mosaic" />
        </a>
        <Link className="navbar-brand" to="/">
          Todo App
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item active">
              <Link className="nav-link" to="/">
                Todos
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/create">
                Create Todo
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/user">
                Create User
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
