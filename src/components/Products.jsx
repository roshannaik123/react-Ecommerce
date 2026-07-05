import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../store/cartContext";
import AuthContext from "../store/auth.context";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

// ---------- Shimmer (Skeleton) Component ----------
const ShimmerCard = () => (
  <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
    <div className="card text-center h-100 shimmer-card">
      <div className="shimmer-image" style={{ height: 300 }}></div>
      <div className="card-body">
        <div className="shimmer-line shimmer-title"></div>
        <div className="shimmer-line shimmer-text"></div>
        <div
          className="shimmer-line shimmer-text"
          style={{ width: "60%" }}
        ></div>
      </div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">
          <div
            className="shimmer-line"
            style={{ width: "40%", margin: "0 auto" }}
          ></div>
        </li>
      </ul>
      <div className="card-body d-flex justify-content-center gap-2">
        <div className="shimmer-btn"></div>
        <div className="shimmer-btn"></div>
      </div>
    </div>
  </div>
);

const ShimmerLoader = () => (
  <>
    {/* Filter buttons skeleton */}
    <div className="buttons text-center py-5">
      {[...Array(5)].map((_, i) => (
        <span
          key={i}
          className="btn btn-outline-secondary btn-sm m-2 shimmer-btn-filter"
          style={{ width: "100px", display: "inline-block", opacity: 0.4 }}
        >
          &nbsp;
        </span>
      ))}
    </div>

    <div className="row">
      {[...Array(8)].map((_, i) => (
        <ShimmerCard key={i} />
      ))}
    </div>
  </>
);

const Products = () => {
  const { dispatch } = useContext(CartContext);
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    data: products = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["products-data"],
    queryFn: async () => {
      const response = await axios.get("https://fakestoreapi.com/products");
      return response.data;
    },
    staleTime: 30 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      setFilteredProducts(products);
    }
  }, [products]);

  const filterProduct = (category) => {
    if (!products.length) return;
    if (category === "all") {
      setFilteredProducts(products);
    } else {
      const updated = products.filter((item) => item.category === category);
      setFilteredProducts(updated);
    }
  };

  if (isLoading) {
    return (
      <div className="container my-3 py-3">
        <div className="row">
          <div className="col-12">
            <h2 className="display-5 text-center">Latest Products</h2>
            <hr />
          </div>
        </div>
        <ShimmerLoader />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container my-3 py-3 text-center text-danger">
        <h3>Error loading products: {error.message}</h3>
      </div>
    );
  }

  // Render actual products
  const ShowProducts = () => {
    const addProduct = (product) => {
      if (!authCtx.isLoggedIn) {
        if (
          window.confirm(
            "You need to login to add items to cart. Would you like to login now?",
          )
        ) {
          navigate("/login");
        }
        return;
      }
      dispatch({ type: "ADDITEM", payload: product });
    };

    return (
      <>
        <div className="buttons text-center py-5">
          <button
            className="btn btn-outline-dark btn-sm m-2"
            onClick={() => filterProduct("all")}
          >
            All
          </button>
          <button
            className="btn btn-outline-dark btn-sm m-2"
            onClick={() => filterProduct("men's clothing")}
          >
            Men's Clothing
          </button>
          <button
            className="btn btn-outline-dark btn-sm m-2"
            onClick={() => filterProduct("women's clothing")}
          >
            Women's Clothing
          </button>
          <button
            className="btn btn-outline-dark btn-sm m-2"
            onClick={() => filterProduct("jewelery")}
          >
            Jewelery
          </button>
          <button
            className="btn btn-outline-dark btn-sm m-2"
            onClick={() => filterProduct("electronics")}
          >
            Electronics
          </button>
        </div>

        <div className="row">
          {filteredProducts.map((product) => (
            <div
              className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4"
              key={product.id}
            >
              <div className="card text-center h-100">
                <img
                  className="card-img-top p-3"
                  src={product.image}
                  alt={product.title}
                  height={300}
                />
                <div className="card-body">
                  <h5 className="card-title">
                    {product.title.substring(0, 12)}...
                  </h5>
                  <p className="card-text">
                    {product.description.substring(0, 90)}...
                  </p>
                </div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item lead">$ {product.price}</li>
                </ul>
                <div className="card-body">
                  <Link
                    to={`/product/${product.id}`}
                    className="btn btn-dark m-1"
                  >
                    Buy Now
                  </Link>
                  <button
                    className="btn btn-dark m-1"
                    onClick={() => {
                      toast.success("Added to cart");
                      addProduct(product);
                    }}
                  >
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
    <div className="container my-3 py-3">
      <div className="row">
        <div className="col-12">
          <h2 className="display-5 text-center">Latest Products</h2>
          <hr />
        </div>
      </div>
      <ShowProducts />
    </div>
  );
};

export default Products;
