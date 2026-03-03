import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { CartContext } from "../store/cartContext";
import AuthContext from "../store/auth.context";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { cart } = useContext(CartContext);
  const { isLoggedIn, logout } = useContext(AuthContext);

  const logoutHandler = () => {
    logout(); // Call logout function to clear authentication
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light py-3 sticky-top">
      <div className="container">
        <NavLink className="navbar-brand fw-bold fs-4 px-2" to="/">
          React Ecommerce
        </NavLink>
        <button
          className="navbar-toggler mx-2"
          type="button"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`} id="navbarSupportedContent">
          <ul className="navbar-nav m-auto my-2 text-center">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/product">
                Products
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/about">
                About
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/contact">
                Contact
              </NavLink>
            </li>
          </ul>
          <div className="buttons text-center">
            {isLoggedIn ? (
              <button onClick={logoutHandler} className="btn btn-outline-dark m-2">
                <i className="fas fa-sign-out-alt mr-1"></i> Logout
              </button>
            ) : (
              <NavLink to="/login" className="btn btn-outline-dark m-2">
                <i className="fas fa-sign-in-alt mr-1"></i> Login
              </NavLink>
            )}
            {/* <NavLink to="/register" className="btn btn-outline-dark m-2">
              <i className="fas fa-user-plus mr-1"></i> Register
            </NavLink> */}
            <NavLink to="/cart" className="btn btn-outline-dark m-2">
              <i className="fas fa-shopping-cart mr-1"></i> {cart.length === 0 ? "Cart" : `Cart (${cart.length})`}
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
