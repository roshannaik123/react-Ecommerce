import React, { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { CartContext } from "../store/cartContext";
import AuthContext from "../store/auth.context";
const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const navigate = useNavigate(); 
   const authCtx=useContext(AuthContext);
   const submitHandler = async (event) => {
   event.preventDefault();
   const enteredEmail = emailInputRef.current.value;
   const enteredPassword = passwordInputRef.current.value;
   const API_KEY = "AIzaSyDXzKA2kShOg8zSaovnJSeVNaNTly-Eh8k";
    
    let url = isLogin
      ? `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`
      : `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;

    try {
      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json(); 
      authCtx.isLoggedIn=true;
    //   authCtx.login(data.idToken);
      authCtx.login(data.idToken, data.localId); 
       emailInputRef.current.value = "";
    passwordInputRef.current.value = ""; 
       
      if (!res.ok) {
        throw new Error(data.error?.message || "Authentication failed");
      }

      alert(isLogin ? "Sign In Successful!" : "Sign Up Successful!");
      if (isLogin) {
      
        navigate("/"); 
 
       }
    } catch (err) {
      alert(err.message);
    }
  };
const changePassword=()=>{
    navigate("/changePassword");
}
  return (
    <>
      <Navbar  />
      <div className="container my-3 py-3">
        <h1 className="text-center">{isLogin ? "Login" : "Sign Up"}</h1>
        <hr />
        <div className="row my-4 h-100">
          <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
            <form onSubmit={submitHandler}>
              <div className="my-3">
                <label htmlFor="email">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="name@example.com"
                  ref={emailInputRef}
                  required
                />
              </div>
              <div className="my-3">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Password"
                  ref={passwordInputRef}
                  required
                />
              </div>
              
              <div>
                <button className="my-2 mx-auto btn btn-dark" type="submit">
                  {isLogin ? "Login" : "Sign Up"}                  
                </button>
                
                <button className="mx-2 p-1 rounded" onClick={changePassword}>Change Password</button>
                {console.log(authCtx.isLoggedIn)}
              </div>
              <div className="my-3 flex items-center gap-2">
                <span >
                  {isLogin ? "New Here?" : "Already have an account?"}{" "}
                    </span>
                  <button type="button" 
                    className="text-red-500 cursor-pointer btn btn-link"
                    onClick={() => setIsLogin((prev) => !prev)}
                  >
                    {isLogin ? "Register" : "Login"}
                  </button>
            
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
