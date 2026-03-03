import React from 'react'
import Navbar from '../components/Navbar'
import Main from '../components/main'
import Products from '../components/Products'
import { CartProvider } from '../store/cartContext'

const Home = () => {
  return (
    <div>
         
        <Navbar/>
        <Main/>
        <Products/>
    </div>
  )
}

export default Home
