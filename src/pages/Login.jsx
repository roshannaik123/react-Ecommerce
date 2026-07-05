import React, { useContext, useRef, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { CartContext } from "../store/cartContext";
import AuthContext from "../store/auth.context";
const API_KEY = import.meta.env.VITE_API_KEY;

// Custom styles (no Bootstrap)
const styles = {
  pageWrapper: {
    minHeight: "calc(100vh - 80px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
    padding: "2rem 1rem",
  },
  card: {
    maxWidth: "480px",
    width: "100%",
    backgroundColor: "#ffffff",
    borderRadius: "20px",
    boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
    padding: "2.5rem 2rem",
    transition: "transform 0.3s ease",
    animation: "fadeUp 0.6s ease-out",
  },
  title: {
    textAlign: "center",
    fontSize: "2rem",
    fontWeight: "700",
    marginBottom: "0.25rem",
    color: "#1a1a2e",
    letterSpacing: "-0.5px",
  },
  subtitle: {
    textAlign: "center",
    color: "#6c757d",
    fontSize: "0.95rem",
    marginBottom: "2rem",
    borderBottom: "2px solid #e9ecef",
    paddingBottom: "1.25rem",
  },
  formGroup: {
    marginBottom: "1.5rem",
  },
  label: {
    display: "block",
    fontWeight: "600",
    marginBottom: "0.4rem",
    color: "#2d3436",
    fontSize: "0.9rem",
  },
  input: {
    width: "100%",
    padding: "0.75rem 1rem",
    fontSize: "1rem",
    border: "2px solid #e9ecef",
    borderRadius: "12px",
    backgroundColor: "#f8f9fa",
    transition: "all 0.3s ease",
    boxSizing: "border-box",
    outline: "none",
  },
  inputFocus: {
    borderColor: "#6c5ce7",
    backgroundColor: "#ffffff",
    boxShadow: "0 0 0 4px rgba(108, 92, 231, 0.15)",
  },
  btnPrimary: {
    width: "100%",
    padding: "0.85rem",
    fontSize: "1.05rem",
    fontWeight: "600",
    color: "#fff",
    backgroundColor: "#6c5ce7",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    marginTop: "0.5rem",
    position: "relative",
    overflow: "hidden",
  },
  btnPrimaryHover: {
    backgroundColor: "#5a4bd1",
    transform: "translateY(-2px)",
    boxShadow: "0 8px 25px rgba(108, 92, 231, 0.35)",
  },
  btnPrimaryDisabled: {
    opacity: 0.7,
    cursor: "not-allowed",
    transform: "none !important",
  },
  btnChangePassword: {
    display: "block",
    width: "100%",
    padding: "0.6rem",
    backgroundColor: "transparent",
    border: "2px solid #dfe6e9",
    borderRadius: "12px",
    color: "#2d3436",
    fontWeight: "500",
    fontSize: "0.9rem",
    cursor: "pointer",
    transition: "all 0.3s ease",
    marginTop: "0.75rem",
    textAlign: "center",
  },
  btnChangePasswordHover: {
    borderColor: "#6c5ce7",
    color: "#6c5ce7",
    backgroundColor: "#f8f7ff",
  },
  toggleContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "0.5rem",
    marginTop: "1.5rem",
    paddingTop: "1.25rem",
    borderTop: "2px solid #f1f2f6",
  },
  toggleText: {
    color: "#636e72",
    fontSize: "0.95rem",
  },
  toggleLink: {
    color: "#6c5ce7",
    fontWeight: "600",
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: "0.95rem",
    textDecoration: "underline",
    padding: "0",
    transition: "color 0.3s ease",
  },
  toggleLinkHover: {
    color: "#5a4bd1",
  },
  loader: {
    display: "inline-block",
    width: "20px",
    height: "20px",
    border: "3px solid rgba(255,255,255,0.3)",
    borderTop: "3px solid #fff",
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite",
    marginRight: "0.5rem",
    verticalAlign: "middle",
  },
  // keyframes (will be added via style tag)
};

// Inject keyframes for animations
const animationStyles = `
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  // const API_KEY = import.meta.env.VITE_API_KEY;
  const [isLogin, setIsLogin] = useState(true);
  const [inputFocus, setInputFocus] = useState({
    email: false,
    password: false,
  });
  // const API_KEY = "AIzaSyDXzKA2kShOg8zSaovnJSeVNaNTly-Eh8k";

  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    emailInputRef.current.focus();
  }, []);

  const [btnHover, setBtnHover] = useState(false);
  const [changePwHover, setChangePwHover] = useState(false);
  const [toggleHover, setToggleHover] = useState(false);

  const submitHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

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

      if (!res.ok) {
        throw new Error(data.error?.message || "Authentication failed");
      }

      authCtx.login(data.idToken, data.localId);
      emailInputRef.current.value = "";
      passwordInputRef.current.value = "";

      alert(isLogin ? "Sign In Successful!" : "Sign Up Successful!");
      if (isLogin) {
        navigate("/");
      } else {
        setIsLogin(true); // switch to login after signup
      }
    } catch (err) {
      alert(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const changePassword = () => {
    navigate("/changePassword");
  };

  return (
    <>
      <style>{animationStyles}</style>
      <Navbar />
      <div style={styles.pageWrapper}>
        <div style={styles.card}>
          <h1 style={styles.title}>
            {isLogin ? "Welcome Back" : "Create Account"}
          </h1>
          <p style={styles.subtitle}>
            {isLogin
              ? "Sign in to continue shopping"
              : "Join us and start shopping today"}
          </p>

          <form onSubmit={submitHandler}>
            <div style={styles.formGroup}>
              <label style={styles.label} htmlFor="email">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                placeholder="you@example.com"
                ref={emailInputRef}
                required
                style={{
                  ...styles.input,
                  ...(inputFocus.email ? styles.inputFocus : {}),
                }}
                onFocus={() =>
                  setInputFocus((prev) => ({ ...prev, email: true }))
                }
                onBlur={() =>
                  setInputFocus((prev) => ({ ...prev, email: false }))
                }
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label} htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="••••••••"
                ref={passwordInputRef}
                required
                style={{
                  ...styles.input,
                  ...(inputFocus.password ? styles.inputFocus : {}),
                }}
                onFocus={() =>
                  setInputFocus((prev) => ({ ...prev, password: true }))
                }
                onBlur={() =>
                  setInputFocus((prev) => ({ ...prev, password: false }))
                }
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              style={{
                ...styles.btnPrimary,
                ...(btnHover && !isLoading ? styles.btnPrimaryHover : {}),
                ...(isLoading ? styles.btnPrimaryDisabled : {}),
              }}
              onMouseEnter={() => setBtnHover(true)}
              onMouseLeave={() => setBtnHover(false)}
            >
              {isLoading ? (
                <>
                  <span style={styles.loader}></span>
                  {isLogin ? "Signing In..." : "Signing Up..."}
                </>
              ) : isLogin ? (
                "Sign In"
              ) : (
                "Create Account"
              )}
            </button>

            <button
              type="button"
              style={{
                ...styles.btnChangePassword,
                ...(changePwHover ? styles.btnChangePasswordHover : {}),
              }}
              onMouseEnter={() => setChangePwHover(true)}
              onMouseLeave={() => setChangePwHover(false)}
              onClick={changePassword}
            >
              🔑 Change Password
            </button>
          </form>

          <div style={styles.toggleContainer}>
            <span style={styles.toggleText}>
              {isLogin ? "New here?" : "Already have an account?"}
            </span>
            <button
              type="button"
              style={{
                ...styles.toggleLink,
                ...(toggleHover ? styles.toggleLinkHover : {}),
              }}
              onMouseEnter={() => setToggleHover(true)}
              onMouseLeave={() => setToggleHover(false)}
              onClick={() => setIsLogin((prev) => !prev)}
            >
              {isLogin ? "Create Account →" : "Sign In →"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
