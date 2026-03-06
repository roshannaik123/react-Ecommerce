
import { useContext, useEffect, useState } from "react";
import React from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../store/cartContext";
import AuthContext from "../store/auth.context";
import { useGetAllProductsQuery } from "../store/apiSlice";

const Products = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState([]);
  const {dispatch}=useContext(CartContext);
  const authCtx=useContext(AuthContext);
  const navigate=useNavigate();
  const { data: products = [], isLoading, error } = useGetAllProductsQuery();

useEffect(() => {
  setData(products);
}, [products]);

  useEffect(() => {
    let componentMounted = true;
        if (componentMounted) {
          setFilter(products); 
    };
    return () => {
      componentMounted = false; 
    };
  }, []);

  useEffect(() => {
    setFilter(data);
  }, [data]);

  const filterProduct = (cat) => {
    const updatedList = data.filter((item) => item.category === cat);
    setFilter(updatedList);
  };

  const ShowProducts = () => {
    const addProduct=(product)=>{
      if (!authCtx.isLoggedIn) {
        if (window.confirm("You need to login to add items to cart. Would you like to login now?")) {
          navigate('/login');
        }
        return;
      }
      dispatch({type:"ADDITEM",payload:product})
    }

    return (
      <>
        <div className="buttons text-center py-5">
          <button className="btn btn-outline-dark btn-sm m-2" onClick={() => setFilter(data)}>All</button>
          <button className="btn btn-outline-dark btn-sm m-2" onClick={() => filterProduct("men's clothing")}>Men's Clothing</button>
          <button className="btn btn-outline-dark btn-sm m-2" onClick={() => filterProduct("women's clothing")}>Women's Clothing</button>
          <button className="btn btn-outline-dark btn-sm m-2" onClick={() => filterProduct("jewelery")}>Jewelery</button>
          <button className="btn btn-outline-dark btn-sm m-2" onClick={() => filterProduct("electronics")}>Electronics</button>
        </div>

        <div className="row">
          {filter.map((product) => (
            <div id={product.id} className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4" key={product.id}>
              <div className="card text-center h-100">
                <img className="card-img-top p-3" src={product.image} alt={product.title} height={300} />
                <div className="card-body">
                  <h5 className="card-title">{product.title.substring(0, 12)}...</h5>
                  <p className="card-text">{product.description.substring(0, 90)}...</p>
                </div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item lead">$ {product.price}</li>
                </ul>
                <div className="card-body">
                  <Link to={`/product/${product.id}`} className="btn btn-dark m-1">Buy Now</Link>
                  <button className="btn btn-dark m-1" onClick={() => {
                    toast.success("Added to cart");
                     addProduct(product); 
                  }}>
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  };

  return (
    <>
      <div className="container my-3 py-3">
        <div className="row">
          <div className="col-12">
            <h2 className="display-5 text-center">Latest Products</h2>
            <hr />
          </div>
        </div>
        <ShowProducts />
      </div>
    </>
  );
};

export default Products;
