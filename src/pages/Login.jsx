import React, { useContext, useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import AuthContext from "../store/auth.context";
import toast from "react-hot-toast";

const API_KEY = import.meta.env.VITE_API_KEY;

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    emailInputRef.current.focus();
  }, []);

  const submitHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    const url = isLogin
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

      if (!res.ok) {
        throw new Error(data.error?.message || "Authentication failed");
      }

      authCtx.login(data.idToken, data.localId);
      emailInputRef.current.value = "";
      passwordInputRef.current.value = "";

      toast.success(isLogin ? "Sign In Successful!" : "Sign Up Successful!");
      navigate("/");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const changePassword = () => {
    navigate("/changePassword");
  };

  return (
    <>
      <Navbar />
      <div className="container py-5 my-4">
        {/* Header */}
        <div className="text-center mb-5">
          <h1 className="display-4 fw-bold">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h1>
          <p className="text-muted lead">
            {isLogin
              ? "Sign in to continue shopping"
              : "Join us and start shopping today"}
          </p>
          <hr className="w-25 mx-auto" />
        </div>

        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <div className="card shadow-sm border-0 p-4">
              <form onSubmit={submitHandler}>
                {/* Email */}
                <div className="mb-3">
                  <label htmlFor="email" className="form-label fw-semibold">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="you@example.com"
                    ref={emailInputRef}
                    required
                  />
                </div>

                {/* Password */}
                <div className="mb-3">
                  <label htmlFor="password" className="form-label fw-semibold">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="••••••••"
                    ref={passwordInputRef}
                    required
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="btn btn-dark btn-lg w-100"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      {isLogin ? "Signing In..." : "Signing Up..."}
                    </>
                  ) : isLogin ? (
                    "Sign In"
                  ) : (
                    "Create Account"
                  )}
                </button>

                {/* Change Password */}
                <button
                  type="button"
                  className="btn btn-outline-secondary w-100 mt-3"
                  onClick={changePassword}
                >
                  🔑 Change Password
                </button>
              </form>

              {/* Toggle between Login / Signup */}
              <div className="text-center mt-4 pt-3 border-top">
                <span className="text-muted me-2">
                  {isLogin ? "New here?" : "Already have an account?"}
                </span>
                <button
                  type="button"
                  className="btn btn-link p-0 text-decoration-none fw-semibold"
                  onClick={() => setIsLogin((prev) => !prev)}
                >
                  {isLogin ? "Create Account →" : "Sign In →"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
