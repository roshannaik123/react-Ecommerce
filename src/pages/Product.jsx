import React, { useEffect, useState, useContext } from "react";
import Skeleton from '@mui/material/Skeleton';
import { Link, useParams, useNavigate } from "react-router-dom";
import Marquee from "react-fast-marquee";
import Navbar from "../components/Navbar";
import { CartContext } from "../store/cartContext";
import AuthContext from "../store/auth.context";

const Product = () => {
  const {  dispatch } = useContext(CartContext);
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [error, setError] = useState(null);

  const addProduct = (product) => {
    console.log(authCtx);
    console.log("button is Clicked");
    if (!authCtx.isLoggedIn) {
      if (window.confirm("You need to login to add items to cart. Would you like to login now?")) {
        navigate('/login');
      }
      return;
    }
    dispatch({ type: "ADDITEM", payload: product });
  };

  useEffect(() => {
    const controller=new AbortController();
    const getProduct = async () => {
      setLoading(true);
      setLoading2(true);
      setError(null);

      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`,{
          signal:controller.signal,
        });
        if (!response.ok) {
          throw new Error('Failed to fetch product');
        }
        const data = await response.json();
        setProduct(data);
        setLoading(false);

        const response2 = await fetch(`https://fakestoreapi.com/products/category/${data.category}`,{
                    signal:controller.signal,

        });
        if (!response2.ok) {
          throw new Error('Failed to fetch similar products');
        }
        const data2 = await response2.json();
        setSimilarProducts(data2);
        setLoading2(false);
      } catch (error) {
         if (error.name === "AbortError") {
    // Ignore abort errors
    return;
  }
        console.error("Error fetching product data:", error);
        setError(error.message);
        setLoading(false);
        setLoading2(false);
      }
    };

    getProduct();
    return ()=> controller.abort();
  }, [id]);

  const Loading = () => (
    <div className="container my-5 py-2">
      <div className="row">
        <div className="col-md-6 py-3">
          <Skeleton height={400} width={400} />
        </div>
        <div className="col-md-6 py-5">
          <Skeleton height={30} width={250} />
          <Skeleton height={90} />
          <Skeleton height={40} width={70} />
          <Skeleton height={50} width={110} />
          <Skeleton height={120} />
          <Skeleton height={40} width={110} inline={true} />
          <Skeleton className="mx-3" height={40} width={110} />
        </div>
      </div>
    </div>
  );

  const ShowProduct = () => (
    <>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <div className="container my-5 py-2">
        <div className="row">
          <div className="col-md-6 col-sm-12 py-3">
            <img 
              className="img-fluid" 
              src={product.image} 
              alt={product.title} 
              width="400px" 
              height="400px" 
              style={{ objectFit: 'contain' }}
            />
          </div>
          <div className="col-md-6 py-5">
            <h4 className="text-uppercase text-muted">{product.category}</h4>
            <h1 className="display-5">{product.title}</h1>
            <p className="lead">
              {product.rating?.rate} <i className="fa fa-star"></i>
              ({product.rating?.count} reviews)
            </p>
            <h3 className="display-6 my-4">${product.price}</h3>
            <p className="lead">{product.description}</p>
            <button 
              className="btn btn-outline-dark" 
              onClick={() => addProduct(product)}
              disabled={loading}
            >
              {loading ? 'Adding...' : 'Add to Cart'}
            </button>
            <Link to="/cart" className="btn btn-dark mx-3">
              Go to Cart
            </Link>
          </div>
        </div>
      </div>
    </>
  );

  const Loading2 = () => (
    <div className="my-4 py-4">
      <div className="d-flex">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="mx-4">
            <Skeleton height={300} width={250} />
          </div>
        ))}
      </div>
    </div>
  );

  const ShowSimilarProduct = () => (
    <div className="py-4 my-4">
      <div className="d-flex">
        {similarProducts
          .filter(item => item.id !== product.id) // Don't show current product
          .slice(0, 4) // Limit to 4 similar products
          .map((item) => (
            <div key={item.id} className="card mx-4 text-center" style={{ width: '250px' }}>
              <img 
                className="card-img-top p-3" 
                src={item.image} 
                alt="Card" 
                height={200} 
                style={{ objectFit: 'contain' }}
              />
              <div className="card-body">
                <h5 className="card-title">
                  {item.title.length > 15 ? `${item.title.substring(0, 15)}...` : item.title}
                </h5>
                <p className="card-text">${item.price}</p>
              </div>
              <div className="card-body">
                <Link to={`/product/${item.id}`} className="btn btn-dark m-1">
                  Buy Now
                </Link>
                <button 
                  className="btn btn-dark m-1" 
                  onClick={() => addProduct(item)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="row">{loading ? <Loading /> : <ShowProduct />}</div>
        <div className="row my-5 py-5">
          <div className="d-none d-md-block">
            <h2>You may also like</h2>
            <Marquee pauseOnHover={true} pauseOnClick={true} speed={50}>
              {loading2 ? <Loading2 /> : <ShowSimilarProduct />}
            </Marquee>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;