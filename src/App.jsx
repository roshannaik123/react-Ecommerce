import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { ApiProvider } from "@reduxjs/toolkit/query/react";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import { ChangePassword } from "./pages/ChangePassword";
import Checkout from "./pages/Checkout";

import ScrollToTop from "./components/ScrollToTop";
import { CartProvider } from "./store/cartContext";
import { AuthContextProvider } from "./store/auth.context";
import { productsApi } from "./store/apiSlice";

const App = () => {
  return (
    <ApiProvider api={productsApi}>
      <AuthContextProvider>
        <CartProvider>
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product" element={<Products />} />
              <Route path="/product/:id" element={<Product />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/login" element={<Login />} />
              <Route path="/changePassword" element={<ChangePassword />} />
              <Route path="/checkout" element={<Checkout />} />
            </Routes>
            <Toaster />
        </CartProvider>
      </AuthContextProvider>
    </ApiProvider>
  );
};

export default App;