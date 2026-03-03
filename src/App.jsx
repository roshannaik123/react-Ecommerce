import React from 'react';
import Home from './pages/Home';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Product from './pages/Product';
import Products from './pages/Products';
import Cart from './pages/Cart';
import { Toaster } from "react-hot-toast";
import { CartProvider } from './store/cartContext';
import ScrollToTop from './components/ScrollToTop';
import Login from './pages/Login';
import { ChangePassword } from './pages/ChangePassword';
import AuthContext, { AuthContextProvider } from './store/auth.context';
import Checkout from './pages/Checkout';

const App = () => {
  return (
   <AuthContextProvider>
      <CartProvider>
        <ScrollToTop> 
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product" element={<Products/>} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/cart" element={<Cart />}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/changePassword" element={<ChangePassword/>}/>
            <Route path='/checkout' element={<Checkout/>}/>
          </Routes>
        </ScrollToTop>
        <Toaster />
      </CartProvider>
   </AuthContextProvider>

  
  );
};

export default App;